import { stdin, stdout } from "node:process";
import readline from "node:readline";
import chalk from "chalk";

import { Agent } from "../agent/loop";
import { ApprovalQueue } from "../approvals/queue";
import { completeCommand } from "../cli/commands";
import { type SlashContext, handleSlash } from "../cli/slash";
import { SettingsStore } from "../config/settings";
import { MemoryStore } from "../memory/sqlite";
import type { Workspace } from "../types";
import {
  renderError,
  renderInputStatus,
  renderResult,
  renderStreamEnd,
  renderStreamStart,
  renderWelcome,
} from "../ui/render";
import type { WorkspaceManager } from "../workspace/manager";
import { parseInput } from "./parser";

export class Prompt {
  private workspace: Workspace;
  private memory: MemoryStore;
  private approvals: ApprovalQueue;
  private agent: Agent;
  private readonly settings: SettingsStore;
  private running = true;

  constructor(
    workspace: Workspace,
    private readonly manager: WorkspaceManager,
  ) {
    this.workspace = workspace;
    this.settings = new SettingsStore(manager.root);
    this.memory = new MemoryStore(workspace);
    this.approvals = new ApprovalQueue(workspace);
    this.agent = new Agent(workspace, this.memory, this.settings);
  }

  async start(): Promise<void> {
    const terminal = readline.createInterface({
      input: stdin,
      output: stdout,
      terminal: true,
      completer: (line: string) => this.complete(line),
    });
    try {
      renderWelcome(this.workspace);
      await this.prompt(terminal);
      for await (const input of terminal) {
        if (!this.running) break;
        await this.handleInput(input);
        if (!this.running) break;
        await this.prompt(terminal);
      }
    } finally {
      this.memory.close();
      this.approvals.close();
      terminal.close();
    }
  }

  private async handleInput(value: string): Promise<void> {
    const input = parseInput(value);
    if (!input) return;
    try {
      if (input.kind === "slash") {
        await handleSlash(input.command, input.args, this.context());
        return;
      }
      let streamed = false;
      const result = await this.agent.run(input.value, (delta) => {
        if (!streamed) {
          streamed = true;
          renderStreamStart();
        }
        stdout.write(delta);
      });
      if (streamed) renderStreamEnd();
      if (!result.streamed) renderResult(result);
    } catch (error) {
      renderError(
        error instanceof Error ? error.message : "Unexpected Axon error",
      );
    }
  }

  private context(): SlashContext {
    return {
      workspace: this.workspace,
      manager: this.manager,
      memory: this.memory,
      approvals: this.approvals,
      settings: this.settings,
      switchWorkspace: async (name) => this.switchWorkspace(name),
      exit: () => {
        this.running = false;
      },
    };
  }

  private async switchWorkspace(name: string): Promise<void> {
    this.memory.close();
    this.approvals.close();
    this.workspace = await this.manager.open(name);
    this.memory = new MemoryStore(this.workspace);
    this.approvals = new ApprovalQueue(this.workspace);
    this.agent = new Agent(this.workspace, this.memory, this.settings);
    console.log(
      `\n${chalk.cyan("◆")} Workspace switched to ${chalk.bold(this.workspace.config.name)}\n`,
    );
  }

  private complete(line: string): [string[], string] {
    const trimmed = line.trimStart();
    if (!trimmed.startsWith("/") || /\s/.test(trimmed)) return [[], line];
    const matches = completeCommand(trimmed);
    return [matches, line];
  }

  private async prompt(terminal: readline.Interface): Promise<void> {
    terminal.setPrompt(chalk.cyan("> "));
    terminal.prompt();
    const settings = await this.settings.read();
    renderInputStatus({
      workspace: this.workspace,
      defaultModel: settings.defaultModel,
    });
  }
}
