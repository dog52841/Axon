import chalk from "chalk";

import type { Activity, AgentResult, Workspace } from "../types";

export function renderWelcome(workspace: Workspace): void {
  console.log(
    chalk.bold("\nAXON") + chalk.dim("  Run your startup. Not your AI."),
  );
  console.log(
    chalk.dim(
      `Workspace: ${workspace.config.name}  ·  ${workspace.config.mode.toUpperCase()}`,
    ),
  );
  console.log(chalk.dim("─".repeat(56)));
  console.log(
    chalk.dim("Type /help for control. Plain text becomes a request.\n"),
  );
}

export function renderResult(result: AgentResult): void {
  console.log(`\n${chalk.cyan("→")} ${result.headline}\n`);
}

export function renderActivities(activities: Activity[]): void {
  if (activities.length === 0) {
    console.log(chalk.dim("No activity yet."));
    return;
  }
  for (const activity of activities) {
    console.log(`${chalk.dim(activity.at.slice(11, 16))}  ${activity.message}`);
  }
}

export function renderError(message: string): void {
  console.error(`${chalk.red("!")} ${message}`);
}
