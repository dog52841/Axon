import chalk from "chalk";

import type { CommandDefinition } from "../cli/commands";
import type { Activity, AgentResult, Workspace } from "../types";

export function renderWelcome(workspace: Workspace): void {
  console.log();
  console.log(
    chalk.bold.cyan("AXON") + chalk.dim("  /  Run your startup. Not your AI."),
  );
  console.log(chalk.dim("─".repeat(64)));
  console.log(
    `${chalk.bold(workspace.config.name)} ${chalk.dim("·")} ${stageLabel(workspace.config.stage)} ${chalk.dim("·")} ${modeLabel(workspace.config.mode)}`,
  );
  console.log(
    chalk.dim(
      "Type / for commands, Tab to complete, or describe what needs to move.",
    ),
  );
  console.log();
}

export function renderResult(result: AgentResult): void {
  console.log(`\n${chalk.cyan("◆")} ${result.headline}\n`);
}

export function renderActivities(activities: Activity[]): void {
  if (activities.length === 0) {
    console.log(chalk.dim("No activity yet."));
    return;
  }
  for (const activity of activities) {
    console.log(
      `${chalk.dim(activity.at.slice(0, 16).replace("T", " "))}  ${activity.message}`,
    );
  }
}

export function renderError(message: string): void {
  console.error(`\n${chalk.red("!")} ${message}\n`);
}

export function renderCommandList(
  commands: readonly CommandDefinition[],
): void {
  const categories = ["Workspace", "Agent", "Memory", "System"] as const;
  const wideTerminal = (process.stdout.columns ?? 80) >= 88;
  console.log();
  for (const category of categories) {
    const entries = commands.filter((command) => command.category === category);
    if (entries.length === 0) continue;
    console.log(chalk.bold(category.toUpperCase()));
    for (const command of entries) {
      if (wideTerminal) {
        console.log(
          `  ${chalk.cyan(command.usage.padEnd(38))}${chalk.dim(command.description)}`,
        );
      } else {
        console.log(`  ${chalk.cyan(command.usage)}`);
        console.log(`    ${chalk.dim(command.description)}`);
      }
    }
    console.log();
  }
  console.log(
    chalk.dim("Tip: type / then press Tab to browse matching commands.\n"),
  );
}

export function renderCommandDetail(command: CommandDefinition): void {
  console.log();
  console.log(`${chalk.bold.cyan(command.usage)}\n${command.description}`);
  if (command.aliases?.length) {
    console.log(
      chalk.dim(
        `Aliases: ${command.aliases.map((alias) => `/${alias}`).join(", ")}`,
      ),
    );
  }
  console.log();
}

export function renderStatus(input: {
  workspace: Workspace;
  activityCount: number;
  pendingApprovals: number;
}): void {
  const { workspace } = input;
  console.log();
  console.log(chalk.bold("WORKSPACE STATUS"));
  console.log(`  Workspace   ${workspace.config.name}`);
  console.log(`  Goal        ${workspace.config.goal}`);
  console.log(`  Stage       ${stageLabel(workspace.config.stage)}`);
  console.log(`  Mode        ${modeLabel(workspace.config.mode)}`);
  console.log(
    `  Model       ${workspace.config.models.planner || chalk.dim("Not configured")}`,
  );
  console.log(
    `  Activity    ${input.activityCount} recorded event${input.activityCount === 1 ? "" : "s"}`,
  );
  console.log(`  Approvals   ${input.pendingApprovals} pending`);
  console.log();
}

export function renderSettings(input: {
  defaultProvider: string;
  defaultModel: string;
  configuredProviders: string[];
  paths: { settings: string; auth: string };
}): void {
  console.log();
  console.log(chalk.bold("AXON SETTINGS"));
  console.log(
    `  Default provider  ${input.defaultProvider || chalk.dim("Not configured")}`,
  );
  console.log(
    `  Default model     ${input.defaultModel || chalk.dim("Not configured")}`,
  );
  console.log(
    `  Provider keys     ${input.configuredProviders.length ? input.configuredProviders.join(", ") : chalk.dim("None configured")}`,
  );
  console.log(`  Settings file     ${chalk.dim(input.paths.settings)}`);
  console.log(
    `  Auth file         ${chalk.dim(input.paths.auth)} ${chalk.dim("(owner-only)")}`,
  );
  console.log();
  console.log(
    chalk.dim(
      "Use /settings provider <name>, /settings model <provider/model>, or /settings key set <provider>.",
    ),
  );
  console.log();
}

export function renderStreamStart(): void {
  console.log();
  console.log(`${chalk.cyan("◆")} ${chalk.dim("Axon is working")}`);
  process.stdout.write(`${chalk.cyan("│")} `);
}

export function renderStreamEnd(): void {
  console.log();
  console.log(chalk.cyan("◆") + chalk.dim(" Response complete"));
  console.log();
}

export function renderInputStatus(input: {
  workspace: Workspace;
  defaultModel: string;
}): void {
  const model = input.workspace.config.models.planner || input.defaultModel;
  const status = [
    model ? `model: ${model}` : "model: not configured",
    input.workspace.config.mode === "safe" ? "safe" : "full access",
    `workspace: ${input.workspace.config.name}`,
  ].join(chalk.dim("  ·  "));
  process.stdout.write(`\n${chalk.dim(status)}\x1b[1A\r\x1b[2C`);
}

function modeLabel(mode: Workspace["config"]["mode"]): string {
  return mode === "safe" ? chalk.green("SAFE") : chalk.yellow("FULL ACCESS");
}

function stageLabel(stage: string): string {
  return stage.replace(/_/g, " ");
}
