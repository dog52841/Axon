package httpapi

import (
	"crypto/rand"
	"encoding/hex"
	"log"
	"net/http"
	"time"
)

func middleware(logger *log.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := r.Header.Get("X-Request-Id")
		if requestID == "" {
			requestID = newRequestID()
		}
		w.Header().Set("X-Request-Id", requestID)
		w.Header().Set("X-Axon-Version", "2026-07-14")
		started := time.Now()
		defer func() {
			if recovered := recover(); recovered != nil {
				logger.Printf("panic request_id=%s value=%v", requestID, recovered)
				writeError(w, http.StatusInternalServerError, "api_error", "internal_error", "An unexpected error occurred")
			}
			logger.Printf("request id=%s method=%s path=%s duration=%s", requestID, r.Method, r.URL.Path, time.Since(started).Round(time.Millisecond))
		}()
		next.ServeHTTP(w, r)
	})
}

func newRequestID() string {
	b := make([]byte, 8)
	_, _ = rand.Read(b)
	return "req_" + hex.EncodeToString(b)
}
