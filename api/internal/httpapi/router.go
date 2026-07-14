package httpapi

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/axon/api/internal/agent"
	"github.com/axon/api/internal/platform"
)

func NewRouter(service *agent.Service, platformService *platform.Service, bootstrapToken string, logger *log.Logger) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok", "service": "axon-api"})
	})
	mux.HandleFunc("POST /v1/organizations", func(w http.ResponseWriter, r *http.Request) {
		if bootstrapToken == "" || r.Header.Get("X-Axon-Bootstrap-Token") != bootstrapToken {
			writeError(w, http.StatusForbidden, "authentication_error", "bootstrap_not_authorized", "A valid bootstrap token is required")
			return
		}
		var input struct {
			Name string `json:"name"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			writeError(w, http.StatusBadRequest, "invalid_request_error", "invalid_json", "Request body must be valid JSON")
			return
		}
		organization, key, err := platformService.CreateOrganization(r.Context(), input.Name)
		if err != nil {
			writeError(w, http.StatusBadRequest, "invalid_request_error", "invalid_organization", err.Error())
			return
		}
		writeJSON(w, http.StatusCreated, map[string]any{"organization": organization, "api_key": key})
	})
	mux.HandleFunc("GET /v1/workspaces", requireAuth(platformService, func(w http.ResponseWriter, r *http.Request) {
		limit := parseLimit(r.URL.Query().Get("limit"))
		workspaces, next, err := platformService.ListWorkspaces(r.Context(), principalFrom(r.Context()).OrganizationID, limit, r.URL.Query().Get("cursor"))
		if err != nil {
			writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"data": workspaces, "next_cursor": next})
	}))
	mux.HandleFunc("POST /v1/workspaces", requireAuth(platformService, idempotent(platformService, func(w http.ResponseWriter, r *http.Request) {
		var input struct {
			Name string `json:"name"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			writeError(w, http.StatusBadRequest, "invalid_request_error", "invalid_json", "Request body must be valid JSON")
			return
		}
		workspace, err := platformService.CreateWorkspace(r.Context(), principalFrom(r.Context()).OrganizationID, input.Name)
		if err != nil {
			writeError(w, http.StatusBadRequest, "invalid_request_error", "invalid_workspace", err.Error())
			return
		}
		writeJSON(w, http.StatusCreated, workspace)
	})))
	mux.HandleFunc("POST /v1/agents", requireAuth(platformService, idempotent(platformService, func(w http.ResponseWriter, r *http.Request) {
		var input agent.CreateInput
		r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
		decoder := json.NewDecoder(r.Body)
		decoder.DisallowUnknownFields()
		if err := decoder.Decode(&input); err != nil {
			writeError(w, http.StatusBadRequest, "invalid_request_error", "invalid_json", "Request body must be valid JSON")
			return
		}
		if strings.TrimSpace(input.Workspace) == "" || strings.TrimSpace(input.Name) == "" || strings.TrimSpace(input.Goal) == "" {
			writeError(w, http.StatusBadRequest, "invalid_request_error", "missing_required_parameter", "workspace, name, and goal are required")
			return
		}
		if _, err := platformService.Workspace(r.Context(), input.Workspace, principalFrom(r.Context()).OrganizationID); err != nil {
			writeError(w, http.StatusNotFound, "invalid_request_error", "resource_missing", "Workspace not found")
			return
		}
		a, err := service.Create(r.Context(), input)
		if err != nil {
			writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusCreated, a)
	})))
	mux.HandleFunc("POST /v1/agents/{id}/run", requireAuth(platformService, idempotent(platformService, func(w http.ResponseWriter, r *http.Request) {
		if !agentAuthorized(w, r, service, platformService) {
			return
		}
		run, err := service.Run(r.Context(), r.PathValue("id"))
		if err != nil {
			writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusAccepted, run)
	})))
	mux.HandleFunc("POST /v1/agents/{id}/pause", requireAuth(platformService, idempotent(platformService, func(w http.ResponseWriter, r *http.Request) {
		if !agentAuthorized(w, r, service, platformService) {
			return
		}
		a, err := service.Pause(r.Context(), r.PathValue("id"))
		if err != nil {
			writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, a)
	})))
	mux.HandleFunc("POST /v1/agents/{id}/resume", requireAuth(platformService, idempotent(platformService, func(w http.ResponseWriter, r *http.Request) {
		if !agentAuthorized(w, r, service, platformService) {
			return
		}
		a, err := service.Resume(r.Context(), r.PathValue("id"))
		if err != nil {
			writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, a)
	})))
	mux.HandleFunc("GET /v1/agents/{id}/logs", requireAuth(platformService, func(w http.ResponseWriter, r *http.Request) {
		if !agentAuthorized(w, r, service, platformService) {
			return
		}
		logs, err := service.Logs(r.Context(), r.PathValue("id"))
		if err != nil {
			writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"data": logs})
	}))
	return middleware(logger, mux)
}

func parseLimit(value string) int {
	if value == "" {
		return 20
	}
	limit, err := strconv.Atoi(value)
	if err != nil || limit < 1 {
		return 20
	}
	if limit > 100 {
		return 100
	}
	return limit
}
func agentAuthorized(w http.ResponseWriter, r *http.Request, agents *agent.Service, workspaces *platform.Service) bool {
	stored, err := agents.Get(r.Context(), r.PathValue("id"))
	if err != nil {
		writeServiceError(w, err)
		return false
	}
	if _, err = workspaces.Workspace(r.Context(), stored.Workspace, principalFrom(r.Context()).OrganizationID); err != nil {
		writeError(w, http.StatusNotFound, "invalid_request_error", "resource_missing", "Agent not found")
		return false
	}
	return true
}
func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}
func writeError(w http.ResponseWriter, status int, kind, code, message string) {
	writeJSON(w, status, map[string]any{"error": map[string]string{"type": kind, "code": code, "message": message, "request_id": w.Header().Get("X-Request-Id")}})
}
func writeServiceError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, agent.ErrNotFound):
		writeError(w, http.StatusNotFound, "invalid_request_error", "resource_missing", "Agent not found")
	case errors.Is(err, agent.ErrPaused):
		writeError(w, http.StatusConflict, "invalid_state_error", "agent_paused", "Agent is paused")
	default:
		writeError(w, http.StatusInternalServerError, "api_error", "internal_error", "An unexpected error occurred")
	}
}
