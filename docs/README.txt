AXON API — VISION, WORKFLOW, AND DELIVERY PLAN

Vision

AXON is infrastructure for AI agents.

Build production AI agents without building the infrastructure.
Bring your own model.

Developers supply the model and its credentials. AXON supplies the durable,
operational layer around it: agent lifecycle, workspaces, runs, logs,
permissions, approvals, tools, secrets, memory, usage, events, and execution.
AXON does not sell model intelligence or force a provider.

Product Boundary

TypeScript SDK   Python SDK   Go SDK   Rust SDK   Dashboard
       \             |           |        |          /
                        AXON REST API
                              |
                         Agent Runtime
                              |
                 BYOK Providers + Tools + Storage

Every client is an API client. Runtime business logic belongs behind the REST
API, never in an SDK or dashboard.

Core Resources

Organization

The top-level ownership and security boundary. API keys, workspaces, and every
resource belong to exactly one organization. V1 treats this as a lightweight
namespace, not a team-management product.

Workspace

An isolated collection of an organization's agents and their operational data.

Agent

A persistent configuration for an AI worker: its goal, model/provider choice,
tool permissions, and execution policy.

Run

One execution of an agent. Runs move through queued, running, waiting,
completed, failed, or cancelled states.

Session

Scoped conversational or task state used by an agent. Sessions are not a UI
concept and do not require a chat product.

Memory

Persistent information selected for future agent context. Only relevant memory
is assembled for a run; complete histories are never blindly injected.

Tool

A callable capability available to an agent, such as a business API, browser,
database, or MCP server.

Provider

An AI model backend. AXON exposes one Unified Provider API while adapters own
provider-specific behavior.

Secret

An encrypted credential that a provider or tool can use without exposing its
plaintext value to a run, log, or client response.

Architecture

Clients and generated SDKs
            |
         REST API
            |
     Application services
            |
       Agent runtime
            |
Unified Provider API + tools + storage

Everything below the REST API is AXON. Everything above it is optional.

API Principles

- REST-first and resource-oriented under /v1.
- API changes are additive within a major version. Breaking changes require a
  new major path such as /v2.
- Deprecations remain available for at least 12 months, with migration guidance.
- Every request receives X-Request-Id. Errors use one stable JSON envelope.
- Mutating requests accept Idempotency-Key. PostgreSQL commits a resource
  mutation and its replay response in the same transaction.
- List endpoints use cursor pagination from their first release.
- Every authenticated request is organization-scoped. IDs are never authorized
  without checking their workspace and organization ownership.
- Rate-limit headers and usage records are part of the public API contract
  before a hosted production launch.
- Significant lifecycle changes emit durable events. Initial event names will
  include run.started, run.completed, run.failed, and approval.requested.

Current Implementation

Location: api/
Language: Go 1.22
HTTP: net/http (Go 1.22 route patterns)
Database target: PostgreSQL, accessed through pgx
Validation: explicit Go request types and validation
Logging: standard library log
Contract: api/openapi.yaml (OpenAPI 3.1.2)

Implemented endpoints

- GET /health
- POST /v1/organizations (bootstrap-token protected)
- GET /v1/workspaces (cursor pagination)
- POST /v1/workspaces
- POST /v1/agents
- POST /v1/agents/{id}/run
- POST /v1/agents/{id}/pause
- POST /v1/agents/{id}/resume
- GET /v1/agents/{id}/logs

Implemented conventions

- Bearer authentication with one-time axon_ API keys
- API keys stored as hashes by the current adapter
- Organization-scoped workspace and agent authorization
- X-Request-Id on every response
- Stable error envelope: type, code, message, request_id
- Idempotency-Key response replay for POST requests
- JSON body limits and strict unknown-field rejection for agent creation
- Localhost-only default bind and graceful shutdown

Current Status

This is a development foundation, not an external production release. The API
now requires PostgreSQL and uses durable adapters for organizations, API keys,
workspaces, agents, runs, logs, and idempotency keys. Migrations are versioned
in api/migrations and applied with golang-migrate. PostgreSQL integration tests
and API-key lifecycle endpoints remain before public release.

Security Model

- API keys are one-time values; only their hashes are persisted.
- Secrets will be encrypted at rest and omitted from logs, errors, OpenAPI
  examples, and telemetry.
- Authorization always flows through organization and workspace ownership.
- Production requires key rotation/revocation, rate limiting, audit logs,
  webhook signing, and durable idempotency before public release.

Engineering Principles

1. Start with the OpenAPI contract. Change the handler and test in the same
   change.
2. Keep handlers thin. HTTP owns validation, authentication, tenancy, and
   idempotency; services own lifecycle rules.
3. Add interfaces only at real infrastructure boundaries: databases, queues,
   provider clients, object storage, and webhook delivery.
4. Prefer small packages, explicit data flow, and readable Go over framework
   abstractions.
5. Every change runs gofmt, go test ./..., and go vet ./....

Roadmap

Phase 1 — Reliable API platform (now)

- PostgreSQL integration tests for organizations, workspaces, agents, runs,
  logs, and idempotency keys.
- API-key lifecycle, agent listing, complete OpenAPI coverage, rate-limit
  contract, and baseline usage records.

Phase 2 — BYOK execution

- Unified Provider API for chat, streaming, tool calls, and embeddings.
- An internal OpenAI-compatible chat adapter supports bearer authentication,
  tool calls, usage normalization, and request correlation. It is not exposed
  until provider registration and encrypted secrets exist.
- Add Anthropic and Ollama adapters through the same provider contract.
- Encrypted provider credentials; no credentials in logs.

Phase 3 — Durable runtime

- Sessions, durable/background runs, retry policy, cancellation, and limits.
- Queue infrastructure appropriate for Go.
- Usage accounting and durable lifecycle events.

Phase 4 — Production primitives

- Tool registry, permission policies, approvals, files, secrets, webhooks, and
  S3-compatible object storage.

Phase 5 — Developer distribution

- Generated TypeScript, Python, Go, and Rust SDKs.
- Excellent OpenAPI and Mintlify documentation.
- Dashboard as an API client.

Future: The Grid

The Grid is a separate, opt-in shared intelligence service. It may publish
aggregate, non-personal benchmarks such as agency pricing, SaaS pricing,
framework popularity, deployment statistics, and business patterns.

The Grid must never store personal data, customer data, API keys, secrets,
private source code, or private run content. It is not required for AXON's V1
runtime and may not weaken tenant isolation or consent.

Non-goals

AXON is not:

- an LLM
- an IDE
- a chatbot
- an AI wrapper
- another LangChain

AXON is infrastructure.

Run Locally

cd api
DATABASE_URL=postgres://axon:axon@127.0.0.1:5432/axon?sslmode=disable go run ./cmd/axon-migrate
DATABASE_URL=postgres://axon:axon@127.0.0.1:5432/axon?sslmode=disable AXON_BOOTSTRAP_TOKEN=local-dev go run ./cmd/axon-api

Validate

cd api
GOCACHE=/tmp/axon-go-build go test ./...
GOCACHE=/tmp/axon-go-build go vet ./...

PostgreSQL integration tests are opt-in and require a disposable database:

cd api
AXON_TEST_DATABASE_URL=postgres://axon:axon@127.0.0.1:5432/axon_test?sslmode=disable go test ./internal/postgres

The Decision Filter

Does this remove infrastructure work from developers?

If not, it does not belong in AXON.
