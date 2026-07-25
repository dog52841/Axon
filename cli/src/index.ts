#!/usr/bin/env bun

import { Command } from "commander";

import { Agent } from "./agent/loop";
import { SettingsStore } from "./config/settings";
import { MemoryStore } from "./memory/sqlite";
import { Prompt } from "./repl/prompt";
import {
  renderError,
  renderResult,
  renderStreamEnd,
  renderStreamStart,
} from "./ui/render";
import { WorkspaceManager } from "./workspace/manager";

interface LaunchOptions {
  workspace: string;
  model?: string;
  safe?: boolean;
  full?: boolean;
  prompt?: string;
}

async function main(): Promise<void> {
  const program = new Command()
    .name("axon")
    .description("Your execution-first AI startup co-founder")
    .version("0.1.0")
    .showHelpAfterError()
    .option("-w, --workspace <name>", "Open a workspace", "default")
    .option(
      "-m, --model <provider/model>",
      "Set the planner model for this launch",
    )
    .option("--safe", "Start in Safe mode")
    .option("--full", "Start in Full Access mode")
    .option(
      "-p, --prompt <request>",
      "Run one request without opening an interactive session",
    )
    .addHelpText(
      "after",
      "\nInteractive sessions support /help and Tab completion. Plain language directs work; slash commands control Axon.",
    )
    .action(async (options: LaunchOptions) => launch(options));

  await program.parseAsync();
}

async function launch(options: LaunchOptions): Promise<void> {
  if (options.safe && options.full) {
    throw new Error("Use either --safe or --full, not both.");
  }
  const manager = new WorkspaceManager();
  const workspace = await manager.ensure(options.workspace);
  const settings = new SettingsStore(manager.root);
  if (options.model) workspace.config.models.planner = options.model;
  if (options.safe) workspace.config.mode = "safe";
  if (options.full) workspace.config.mode = "full";
  if (options.model || options.safe || options.full)
    await manager.save(workspace);

  if (!options.prompt) {
    await new Prompt(workspace, manager).start();
    return;
  }

  const memory = new MemoryStore(workspace);
  try {
    const agent = new Agent(workspace, memory, settings);
    let streamed = false;
    const result = await agent.run(options.prompt, (delta) => {
      if (!streamed) {
        streamed = true;
        renderStreamStart();
      }
      process.stdout.write(delta);
    });
    if (streamed) renderStreamEnd();
    if (!result.streamed) renderResult(result);
  } finally {
    memory.close();
  }
}

main().catch((error: unknown) => {
  renderError(error instanceof Error ? error.message : "Unexpected Axon error");
  process.exitCode = 1;
});
