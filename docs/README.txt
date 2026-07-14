AXON API — PROJECT STATUS, WORKFLOW, AND PLAN

AXON API is a developer-first, BYOK agent runtime API.

Positioning

Build production AI agents without building the infrastructure.
Bring your own model.

AXON is infrastructure around a developer's model provider. It does not sell
or own model intelligence. The API owns the operational concerns required to
run agents reliably: tenancy, credentials, workspaces, sessions, runs, logs,
approvals, memory, tools, usage, and webhooks.

Product boundary

Clients and SDKs are consumers of the REST API.

TypeScript SDK   Python SDK   Go SDK   Rust SDK   Dashboard   CLI
       \             |           |        |          |         /
                        AXON REST API
                              |
                         Agent Runtime
                              |
                 BYOK Providers + Tools + Storage

No UI may contain runtime business logic. A CLI, dashboard, SDK, or future
desktop app must call the same API.

Current implementation

Location: api/
Language: Go
HTTP: net/http (Go 1.22 route patterns)
Validation: Go types and explicit request validation
Logging: standard library log
Contract: api/openapi.yaml (OpenAPI 3.1.2)

Implemented API capabilities

- GET /health
- POST /v1/organizations (bootstrap-token protected)
- GET /v1/workspaces (cursor pagination)
- POST /v1/workspaces
- POST /v1/agents
- POST /v1/agents/{id}/run
- POST /v1/agents/{id}/pause
- POST /v1/agents/{id}/resume
- GET /v1/agents/{id}/logs

Implemented API conventions

- Bearer authentication with one-time axon_ API keys
- API keys are stored hashed in the current adapter
- Every protected request is organization-scoped
- Agent access is checked against the caller's workspace ownership
- X-Axon-Request-Id is returned on every response
- Errors use a stable JSON envelope: type, code, message, request_id
- POST requests support Idempotency-Key replay
- Replayed responses include Idempotent-Replayed: true
- JSON request bodies are size-limited and unknown fields are rejected for
  agent creation
- The server binds to 127.0.0.1:4318 by default and shuts down gracefully

Current status: development foundation only

The current agent and platform stores are in-memory adapters. Restarting the
server loses all data. They are intentionally behind interfaces so PostgreSQL
adapters can replace them without changing HTTP handlers or application
services.

Not implemented yet

- PostgreSQL persistence and migrations
- Redis cache, queues, or workers
- Durable/background runs
- Provider registry and encrypted BYOK provider secrets
- Sessions, messages, memory, file storage, tools, approvals API, webhooks,
  usage tracking, rate limits, organization member roles, API key revocation,
  SDKs, dashboard, and CLI

Engineering workflow

1. Start with the OpenAPI contract. Change it with the handler and test in the
   same change.
2. Keep handlers thin. Authentication, tenancy, validation, and idempotency
   belong at the HTTP boundary. Lifecycle rules belong in application services.
3. Every resource is organization-scoped. Never authorize an ID without
   checking its workspace and organization ownership.
4. Treat all POST requests as retryable. Preserve idempotency behavior while
   moving from in-memory storage to PostgreSQL.
5. Add interfaces only at real infrastructure boundaries: databases, queues,
   provider clients, object storage, and webhook delivery.
6. Do not add a UI, SDK, marketplace, Grid, browser execution, or cloud worker
   before the REST contract for the underlying runtime feature is stable.
7. Every change requires gofmt, go test ./..., and go vet ./....

Delivery plan

Phase 1 — API platform (current)

- Complete organizations, API keys, workspaces, request IDs, errors,
  idempotency, pagination, and OpenAPI coverage.
- Replace in-memory stores with PostgreSQL before any external release.

Phase 2 — BYOK provider layer

- Provider-neutral interfaces for chat, streaming, tools, and embeddings.
- Begin with OpenAI-compatible, Anthropic, and Ollama adapters.
- Encrypt provider credentials at rest and ensure they never appear in logs.

Phase 3 — durable runtime

- Agents, sessions, runs, logs, and memory in PostgreSQL.
- Redis/BullMQ-equivalent queue infrastructure selected for Go.
- Run states: queued, running, waiting, completed, failed, cancelled.
- Durable retries, cancellation, limits, and usage accounting.

Phase 4 — production execution primitives

- Tool registry, permission policies, approvals, files, secrets, and webhooks.
- S3-compatible object storage.
- Webhook delivery with signing, retries, and event logs.

Phase 5 — developer distribution

- Publish OpenAPI-backed TypeScript, Python, Go, and Rust SDKs.
- Mintlify documentation.
- Dashboard and CLI only as API clients.

Security requirements before production

- PostgreSQL-backed persistence with migrations and transactional idempotency.
- Encrypted provider secrets and API key rotation/revocation.
- Authentication, organization roles, rate limits, audit logs, and webhook
  signing.
- No plaintext credentials in logs, errors, OpenAPI examples, or telemetry.

Run locally

cd api
AXON_BOOTSTRAP_TOKEN=local-dev go run ./cmd/axon-api

Validate

cd api
GOCACHE=/tmp/axon-go-build go test ./...
GOCACHE=/tmp/axon-go-build go vet ./...

The decision filter

Does this remove infrastructure work from developers?

If not, do not build it.
