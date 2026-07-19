AXON CLI — PROJECT STATUS AND BUILD PLAN

Vision

Run your startup. Not your AI.

Axon is a local-first, BYOK command-line co-founder operating system. The
product is a focused REPL: users enter a request, Axon retrieves the relevant
local context, calls the selected model, streams the response, and only asks
for approval when a future tool would make a consequential change.

Product boundaries

Axon is not an API platform, dashboard, IDE, chatbot, or general agent
framework. It is a CLI product with an execution-first REPL.

The interface is deliberately small:

  axn(workspace) ❯

Slash commands control Axon. Plain text becomes an agent request.

Current stack

- Bun 1.3+
- TypeScript 7, strict mode
- Node readline and Chalk for the REPL
- Clack for consequential-action confirmation
- bun:sqlite for local workspace state
- YAML workspace configuration
- Zod configuration validation
- Vitest and Biome
- Bun --compile for a single executable

Current implementation

Location: cli/

- Per-workspace YAML configuration at ~/.axon/workspaces/<name>/workspace.yaml
- Local history in history.db
- Local approval queue in tasks.db
- Workspace log directory at logs/
- Safe and Full Access modes, with explicit confirmation for Full Access
- Workspace, provider, model, history, task, status, and doctor commands
- Direct OpenAI Responses API streaming through OPENAI_API_KEY
- No credential is stored in YAML, SQLite, logs, or command output

Use it

cd cli
bun install
cp .env.example .env
# add OPENAI_API_KEY to .env
bun run dev -- --workspace voice-saas

Inside Axon:

/init
/model openai/gpt-5.2
/doctor
Explain the three highest-leverage actions for getting our first customer.

Supported commands

- /help
- /init
- /new <name>, /open <name>
- /workspace new|switch|list
- /provider, /providers
- /model, /models
- /history, /tasks
- /approve <id>, /deny <id>
- /status, /doctor
- /safe, /yolo
- /clear, /exit

Engineering rules

1. Keep the REPL fast and quiet. Do not turn it into a dashboard or TUI.
2. Keep the agent as one small flow: retrieve context, plan, execute, summarize,
   persist. Learning remains asynchronous until real evidence justifies it.
3. SQLite is the source of local truth. Do not add vector storage until concrete
   memory retrieval limits require it.
4. Credentials come from the environment first. Keychain support is optional;
   no credential may be persisted in a workspace.
5. Keep tools as small executable modules. Do not introduce registry layers
   until there is more than one real execution path.
6. Every change runs lint, type checks, tests, and a Bun production build.

Near-term delivery order

1. Finish OpenAI streaming UX and persist non-sensitive conversation history.
2. Add Anthropic and OpenAI-compatible local-provider adapters.
3. Add the first safe, read-only tools: file context and web research.
4. Add approval-gated write tools only after their audit trail is durable.
5. Add optional keychain support and distribution CI.

Non-goals for V1

- Dashboard or TUI
- Cloud sync
- Marketplace
- Browser automation
- Billing
- OAuth
- Vector database
- Backend API platform
