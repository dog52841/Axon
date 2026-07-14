package httpapi_test

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/axon/api/internal/agent"
	"github.com/axon/api/internal/httpapi"
	"github.com/axon/api/internal/platform"
)

func TestAgentLifecycle(t *testing.T) {
	service := agent.NewService(agent.NewMemoryStore())
	platformService := platform.NewService(platform.NewMemoryStore())
	organization, key, err := platformService.CreateOrganization(context.Background(), "Acme")
	if err != nil {
		t.Fatal(err)
	}
	workspace, err := platformService.CreateWorkspace(context.Background(), organization.ID, "Production")
	if err != nil {
		t.Fatal(err)
	}
	handler := httpapi.NewRouter(service, platformService, "bootstrap", log.Default())
	created := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPost, "/v1/agents", bytes.NewBufferString(`{"workspace":"`+workspace.ID+`","name":"outreach","goal":"get replies"}`))
	request.Header.Set("Authorization", "Bearer "+key)
	handler.ServeHTTP(created, request)
	if created.Code != http.StatusCreated {
		t.Fatalf("got %d", created.Code)
	}
	var value agent.Agent
	if err := json.NewDecoder(strings.NewReader(created.Body.String())).Decode(&value); err != nil {
		t.Fatal(err)
	}
	req, _ := http.NewRequestWithContext(context.Background(), http.MethodPost, "/v1/agents/"+value.ID+"/run", nil)
	req.Header.Set("Authorization", "Bearer "+key)
	run := httptest.NewRecorder()
	handler.ServeHTTP(run, req)
	if run.Code != http.StatusAccepted {
		t.Fatalf("got %d", run.Code)
	}
}

func TestErrorsIncludeRequestID(t *testing.T) {
	platformService := platform.NewService(platform.NewMemoryStore())
	organization, key, err := platformService.CreateOrganization(context.Background(), "Acme")
	if err != nil {
		t.Fatal(err)
	}
	if _, err := platformService.CreateWorkspace(context.Background(), organization.ID, "Production"); err != nil {
		t.Fatal(err)
	}
	handler := httpapi.NewRouter(agent.NewService(agent.NewMemoryStore()), platformService, "bootstrap", log.Default())
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPost, "/v1/agents", bytes.NewBufferString(`{}`))
	request.Header.Set("X-Request-Id", "req_from_client")
	request.Header.Set("Authorization", "Bearer "+key)
	handler.ServeHTTP(response, request)
	if response.Code != http.StatusBadRequest {
		t.Fatalf("got %d", response.Code)
	}
	if response.Header().Get("X-Request-Id") != "req_from_client" {
		t.Fatal("missing request ID")
	}
	if !strings.Contains(response.Body.String(), "req_from_client") {
		t.Fatal("error body is missing request ID")
	}
}

func TestIdempotencyReplaysTheOriginalResponse(t *testing.T) {
	platformService := platform.NewService(platform.NewMemoryStore())
	_, key, err := platformService.CreateOrganization(context.Background(), "Acme")
	if err != nil {
		t.Fatal(err)
	}
	handler := httpapi.NewRouter(agent.NewService(agent.NewMemoryStore()), platformService, "bootstrap", log.Default())
	request := func() *httptest.ResponseRecorder {
		response := httptest.NewRecorder()
		input := httptest.NewRequest(http.MethodPost, "/v1/workspaces", bytes.NewBufferString(`{"name":"Production"}`))
		input.Header.Set("Authorization", "Bearer "+key)
		input.Header.Set("Idempotency-Key", "workspace-create-1")
		handler.ServeHTTP(response, input)
		return response
	}
	first, second := request(), request()
	if first.Code != http.StatusCreated || second.Code != http.StatusCreated {
		t.Fatalf("got %d and %d", first.Code, second.Code)
	}
	if first.Body.String() != second.Body.String() {
		t.Fatal("idempotent request produced a different response")
	}
	if second.Header().Get("Idempotent-Replayed") != "true" {
		t.Fatal("response was not marked as replayed")
	}
}
