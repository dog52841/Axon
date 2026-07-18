import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";
import chalk from "chalk";

import { Agent } from "../agent/loop";
import { ApprovalQueue } from "../approvals/queue";
import { type SlashContext, handleSlash } from "../cli/slash";
import { MemoryStore } from "../memory/sqlite";
import type { Workspace } from "../types";
import { renderError, renderResult, renderWelcome } from "../ui/render";
import type { WorkspaceManager } from "../workspace/manager";
import { parseInput } from "./parser";

export class Prompt {
  private workspace: Workspace;
  private memory: MemoryStore;
  private approvals: ApprovalQueue;
  private agent: Agent;
  private running = true;

  constructor(
    workspace: Workspace,
    private readonly manager: WorkspaceManager,
  ) {
    this.workspace = workspace;
    this.memory = new MemoryStore(workspace);
    this.approvals = new ApprovalQueue(workspace);
    this.agent = new Agent(workspace, this.memory);
  }

  async start(): Promise<void> {
    const terminal = readline.createInterface({
      input: stdin,
      output: stdout,
      terminal: true,
    });
    renderWelcome(this.workspace);
    try {
      while (this.running) {
        const input = await terminal.question(
          chalk.green(`axn(${this.workspace.config.name}) ❯ `),
        );
        await this.handleInput(input);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ERR_USE_AFTER_CLOSE")
        throw error;
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
      renderResult(await this.agent.run(input.value));
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
    this.agent = new Agent(this.workspace, this.memory);
    console.log(`Workspace: ${this.workspace.config.name}`);
  }
}
