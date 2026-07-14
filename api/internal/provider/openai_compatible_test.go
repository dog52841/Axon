package provider

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestOpenAICompatibleChat(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/v1/chat/completions" || r.Method != http.MethodPost {
			t.Fatalf("unexpected request: %s %s", r.Method, r.URL.Path)
		}
		if r.Header.Get("Authorization") != "Bearer provider-secret" {
			t.Fatal("missing provider authorization")
		}
		if r.Header.Get("X-Client-Request-Id") != "req_123" {
			t.Fatal("missing request correlation ID")
		}
		var request openAIChatRequest
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			t.Fatal(err)
		}
		if request.Model != "example-model" || len(request.Tools) != 1 {
			t.Fatalf("unexpected request: %#v", request)
		}
		_, _ = w.Write([]byte(`{"id":"chat_1","model":"example-model","choices":[{"message":{"content":"done","tool_calls":[{"id":"call_1","type":"function","function":{"name":"lookup","arguments":"{}"}}]},"finish_reason":"tool_calls"}],"usage":{"prompt_tokens":10,"completion_tokens":3,"total_tokens":13}}`))
	}))
	defer server.Close()
	client, err := NewOpenAICompatible(OpenAICompatibleConfig{BaseURL: server.URL, APIKey: "provider-secret"})
	if err != nil {
		t.Fatal(err)
	}
	response, err := client.Chat(context.Background(), ChatRequest{
		Model:     "example-model",
		RequestID: "req_123",
		Messages:  []Message{{Role: RoleUser, Content: "hello"}},
		Tools:     []Tool{{Name: "lookup", Parameters: map[string]any{"type": "object"}}},
	})
	if err != nil {
		t.Fatal(err)
	}
	if response.Message.Content != "done" || response.FinishReason != "tool_calls" || response.Usage.TotalTokens != 13 || len(response.ToolCalls) != 1 {
		t.Fatalf("unexpected response: %#v", response)
	}
}

func TestOpenAICompatibleDoesNotExposeProviderErrorBody(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusUnauthorized)
		_, _ = w.Write([]byte(`{"error":{"message":"provider secret detail"}}`))
	}))
	defer server.Close()
	client, err := NewOpenAICompatible(OpenAICompatibleConfig{BaseURL: server.URL, APIKey: "provider-secret"})
	if err != nil {
		t.Fatal(err)
	}
	_, err = client.Chat(context.Background(), ChatRequest{Model: "example-model", Messages: []Message{{Role: RoleUser, Content: "hello"}}})
	var providerError *HTTPError
	if !errors.As(err, &providerError) || providerError.StatusCode != http.StatusUnauthorized {
		t.Fatalf("unexpected provider error: %v", err)
	}
	if err.Error() == "provider secret detail" {
		t.Fatal("provider response body leaked")
	}
}
