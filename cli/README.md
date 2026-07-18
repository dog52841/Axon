# Axon CLI

Run your startup. Not your AI.

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

Inside Axon, begin with:

```text
/help
/model openai/gpt-5
/status
```

Exit with `/exit` or `Ctrl+C`.
