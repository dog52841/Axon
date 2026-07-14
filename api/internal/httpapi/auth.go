package httpapi

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"io"
	"net/http"
	"strings"

	"github.com/axon/api/internal/platform"
)

type principalKey struct{}

func requireAuth(service *platform.Service, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		parts := strings.Fields(r.Header.Get("Authorization"))
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			writeError(w, http.StatusUnauthorized, "authentication_error", "missing_api_key", "Provide a Bearer API key")
			return
		}
		principal, err := service.Authenticate(r.Context(), parts[1])
		if err != nil {
			writeError(w, http.StatusUnauthorized, "authentication_error", "invalid_api_key", "API key is invalid")
			return
		}
		next(w, r.WithContext(context.WithValue(r.Context(), principalKey{}, principal)))
	}
}

func principalFrom(ctx context.Context) platform.Principal {
	return ctx.Value(principalKey{}).(platform.Principal)
}

func idempotent(service *platform.Service, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		key := r.Header.Get("Idempotency-Key")
		if key == "" {
			next(w, r)
			return
		}
		if len(key) > 255 {
			writeError(w, http.StatusBadRequest, "invalid_request_error", "idempotency_key_too_long", "Idempotency-Key must be 255 characters or fewer")
			return
		}
		body, err := io.ReadAll(http.MaxBytesReader(w, r.Body, 1<<20))
		if err != nil {
			writeError(w, http.StatusBadRequest, "invalid_request_error", "request_too_large", "Request body is too large")
			return
		}
		_ = r.Body.Close()
		fingerprint := fingerprint(r.Method, r.URL.Path, body)
		principal := principalFrom(r.Context())
		var replay platform.Replay
		var replayed bool
		var captured *captureWriter
		err = service.WithinTransaction(r.Context(), func(ctx context.Context) error {
			var found bool
			replay, found, err = service.ClaimReplay(ctx, principal.OrganizationID, key, fingerprint)
			if err != nil || found {
				replayed = found
				return err
			}
			captured = newCaptureWriter()
			request := r.WithContext(ctx)
			request.Body = io.NopCloser(bytes.NewReader(body))
			next(captured, request)
			return service.StoreReplay(ctx, principal.OrganizationID, key, fingerprint, captured.status, captured.body.Bytes(), captured.Header().Get("Content-Type"))
		})
		if errors.Is(err, platform.ErrIdempotencyConflict) {
			writeError(w, http.StatusConflict, "idempotency_error", "idempotency_key_in_use", "Idempotency-Key was already used with a different request")
			return
		}
		if errors.Is(err, platform.ErrIdempotencyInProgress) {
			w.Header().Set("Retry-After", "1")
			writeError(w, http.StatusConflict, "idempotency_error", "idempotency_in_progress", "An identical request is still in progress; retry shortly")
			return
		}
		if err != nil {
			writeError(w, http.StatusInternalServerError, "api_error", "internal_error", "An unexpected error occurred")
			return
		}
		if replayed {
			w.Header().Set("Content-Type", replay.ContentType)
			w.Header().Set("Idempotent-Replayed", "true")
			w.WriteHeader(replay.Status)
			_, _ = w.Write(replay.Body)
			return
		}
		copyCapturedResponse(w, captured)
	}
}

type captureWriter struct {
	header  http.Header
	status  int
	written bool
	body    bytes.Buffer
}

func newCaptureWriter() *captureWriter {
	return &captureWriter{header: make(http.Header), status: http.StatusOK}
}
func (w *captureWriter) Header() http.Header { return w.header }
func (w *captureWriter) WriteHeader(status int) {
	if w.written {
		return
	}
	w.status = status
	w.written = true
}
func (w *captureWriter) Write(value []byte) (int, error) {
	if !w.written {
		w.WriteHeader(http.StatusOK)
	}
	return w.body.Write(value)
}
func copyCapturedResponse(destination http.ResponseWriter, source *captureWriter) {
	for key, values := range source.Header() {
		for _, value := range values {
			destination.Header().Add(key, value)
		}
	}
	destination.WriteHeader(source.status)
	_, _ = destination.Write(source.body.Bytes())
}
func fingerprint(method, path string, body []byte) string {
	sum := sha256.Sum256(append(append([]byte(method+" "+path+"\n"), body...), 0))
	return hex.EncodeToString(sum[:])
}
