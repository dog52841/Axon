package provider

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"
)

const defaultOpenAICompatibleBaseURL = "https://api.openai.com"

type OpenAICompatibleConfig struct {
	BaseURL    string
	APIKey     string
	HTTPClient *http.Client
}

type OpenAICompatibleClient struct {
	baseURL    string
	apiKey     string
	httpClient *http.Client
}

func NewOpenAICompatible(config OpenAICompatibleConfig) (*OpenAICompatibleClient, error) {
	if strings.TrimSpace(config.APIKey) == "" {
		return nil, errors.New("provider API key is required")
	}
	baseURL := strings.TrimRight(strings.TrimSpace(config.BaseURL), "/")
	if baseURL == "" {
		baseURL = defaultOpenAICompatibleBaseURL
	}
	if !strings.HasPrefix(baseURL, "https://") && !strings.HasPrefix(baseURL, "http://") {
		return nil, errors.New("provider base URL must use HTTP or HTTPS")
	}
	client := config.HTTPClient
	if client == nil {
		client = http.DefaultClient
	}
	return &OpenAICompatibleClient{baseURL: baseURL, apiKey: config.APIKey, httpClient: client}, nil
}

func (c *OpenAICompatibleClient) Chat(ctx context.Context, input ChatRequest) (ChatResponse, error) {
	if strings.TrimSpace(input.Model) == "" {
		return ChatResponse{}, errors.New("provider model is required")
	}
	if len(input.Messages) == 0 {
		return ChatResponse{}, errors.New("at least one provider message is required")
	}
	payload, err := json.Marshal(openAIChatRequest{Model: input.Model, Messages: input.Messages, Tools: openAITools(input.Tools), MaxTokens: input.MaxTokens})
	if err != nil {
		return ChatResponse{}, fmt.Errorf("encode provider request: %w", err)
	}
	request, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL+"/v1/chat/completions", bytes.NewReader(payload))
	if err != nil {
		return ChatResponse{}, fmt.Errorf("create provider request: %w", err)
	}
	request.Header.Set("Authorization", "Bearer "+c.apiKey)
	request.Header.Set("Content-Type", "application/json")
	if input.RequestID != "" {
		request.Header.Set("X-Client-Request-Id", input.RequestID)
	}
	response, err := c.httpClient.Do(request)
	if err != nil {
		return ChatResponse{}, fmt.Errorf("send provider request: %w", err)
	}
	defer response.Body.Close()
	body, err := io.ReadAll(io.LimitReader(response.Body, 4<<20))
	if err != nil {
		return ChatResponse{}, fmt.Errorf("read provider response: %w", err)
	}
	if response.StatusCode < http.StatusOK || response.StatusCode >= http.StatusMultipleChoices {
		return ChatResponse{}, &HTTPError{StatusCode: response.StatusCode}
	}
	var decoded openAIChatResponse
	if err := json.Unmarshal(body, &decoded); err != nil {
		return ChatResponse{}, fmt.Errorf("decode provider response: %w", err)
	}
	if len(decoded.Choices) == 0 {
		return ChatResponse{}, errors.New("provider response contained no choices")
	}
	choice := decoded.Choices[0]
	return ChatResponse{
		ID:           decoded.ID,
		Model:        decoded.Model,
		Message:      Message{Role: RoleAssistant, Content: choice.Message.Content},
		ToolCalls:    fromOpenAIToolCalls(choice.Message.ToolCalls),
		FinishReason: choice.FinishReason,
		Usage:        Usage{InputTokens: decoded.Usage.PromptTokens, OutputTokens: decoded.Usage.CompletionTokens, TotalTokens: decoded.Usage.TotalTokens},
	}, nil
}

type HTTPError struct{ StatusCode int }

func (e *HTTPError) Error() string { return fmt.Sprintf("provider returned HTTP %d", e.StatusCode) }

type openAIChatRequest struct {
	Model     string       `json:"model"`
	Messages  []Message    `json:"messages"`
	Tools     []openAITool `json:"tools,omitempty"`
	MaxTokens int          `json:"max_tokens,omitempty"`
}

type openAITool struct {
	Type     string `json:"type"`
	Function Tool   `json:"function"`
}

func openAITools(tools []Tool) []openAITool {
	result := make([]openAITool, 0, len(tools))
	for _, tool := range tools {
		result = append(result, openAITool{Type: "function", Function: tool})
	}
	return result
}

type openAIToolCall struct {
	ID       string `json:"id"`
	Function struct {
		Name      string `json:"name"`
		Arguments string `json:"arguments"`
	} `json:"function"`
}

func fromOpenAIToolCalls(calls []openAIToolCall) []ToolCall {
	result := make([]ToolCall, 0, len(calls))
	for _, call := range calls {
		result = append(result, ToolCall{ID: call.ID, Name: call.Function.Name, Arguments: call.Function.Arguments})
	}
	return result
}

type openAIChatResponse struct {
	ID      string `json:"id"`
	Model   string `json:"model"`
	Choices []struct {
		Message struct {
			Content   string           `json:"content"`
			ToolCalls []openAIToolCall `json:"tool_calls"`
		} `json:"message"`
		FinishReason string `json:"finish_reason"`
	} `json:"choices"`
	Usage struct {
		PromptTokens     int `json:"prompt_tokens"`
		CompletionTokens int `json:"completion_tokens"`
		TotalTokens      int `json:"total_tokens"`
	} `json:"usage"`
}
