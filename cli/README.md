# Axon CLI

Run your startup. Not your AI.

Axon is a local-first, BYOK command-line co-founder. It is a full interactive
terminal product: natural language directs work, while slash commands control
the workspace, model, memory, approvals, and runtime.

```sh
cd cli
bun install
bun run dev -- --workspace voice-saas
```

Axon stores each workspace under `~/.axon/workspaces/<name>/`. Use
`AXON_HOME=/path/to/test-root` to isolate local development data.

The current foundation includes the REPL, workspace configuration, local SQLite
activity/approval storage, and core slash commands. Model providers, tools,
semantic memory, and cloud sync are intentionally not connected yet.

Axon owns its configuration under `~/.axon/`:

- `settings.yaml` stores non-secret defaults such as provider and model.
- `auth.yaml` stores provider keys with owner-only file permissions.
- Workspace YAML contains workspace context only; it never stores credentials.

Connect a provider from inside Axon rather than creating an `.env` file.

Inside Axon, begin with:

```text
/help
/settings provider openai
/settings model openai/gpt-5
/settings key set openai
/status
```

Type `/` and press `Tab` to discover commands. Use `/help <command>` for a
focused explanation, `/history` to review activity, and `/memory search <term>`
to find prior workspace events. Exit with `/exit` or `Ctrl+C`.

## Command line

```sh
# Open a workspace
axon --workspace voice-saas

# Set a model for the launch, then open Axon
axon --workspace voice-saas --model openai/gpt-5

# Run a single request without opening an interactive session
axon --workspace voice-saas --prompt "Summarize our next best move"
```

Run `axon --help` for the complete command-line reference. The interactive
session remains the primary product surface.
