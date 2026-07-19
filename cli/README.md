# Axon CLI

Run your startup. Not your AI.

```sh
cd cli
bun install
cp .env.example .env
bun run dev -- --workspace voice-saas
```

Axon stores each workspace under `~/.axon/workspaces/<name>/`. Use
`AXON_HOME=/path/to/test-root` to isolate local development data.

The current foundation includes the REPL, workspace configuration, local SQLite
activity/approval storage, and core slash commands. Model providers, tools,
semantic memory, and cloud sync are intentionally not connected yet.

For streamed OpenAI responses, set `OPENAI_API_KEY` in `.env`; Bun loads it
automatically for development and compiled CLI runs. Keep `.env` local.

Inside Axon, begin with:

```text
/help
/model openai/gpt-5
/status
```

Exit with `/exit` or `Ctrl+C`.
