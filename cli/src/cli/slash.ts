import { confirm, isCancel, password } from "@clack/prompts";
import chalk from "chalk";

import type { ApprovalQueue } from "../approvals/queue";
import type { SettingsStore } from "../config/settings";
import type { MemoryStore } from "../memory/sqlite";
import type { Workspace } from "../types";
import {
  renderActivities,
  renderCommandDetail,
  renderCommandList,
  renderSettings,
  renderStatus,
} from "../ui/render";
import type { WorkspaceManager } from "../workspace/manager";
import { commands, findCommand } from "./commands";

export interface SlashContext {
  workspace: Workspace;
  manager: WorkspaceManager;
  memory: MemoryStore;
  approvals: ApprovalQueue;
  settings: SettingsStore;
  switchWorkspace(name: string): Promise<void>;
  exit(): void;
}

export async function handleSlash(
  command: string,
  args: string[],
  context: SlashContext,
): Promise<void> {
  switch (command) {
    case "help":
      printHelp(args);
      return;
    case "workspace":
      await handleWorkspace(args, context);
      return;
    case "new":
      await handleWorkspace(["new", ...args], context);
      return;
    case "open":
      await handleWorkspace(["switch", ...args], context);
      return;
    case "init":
      printWorkspaceReady(context);
      return;
    case "model":
      await setModel(args, context);
      return;
    case "safe":
      context.workspace.config.mode = "safe";
      await context.manager.save(context.workspace);
      console.log(
        chalk.green(
          "Safe mode enabled. Axon will request approval for consequential actions.",
        ),
      );
      return;
    case "yolo":
      await enableFullAccess(context);
      return;
    case "history":
      renderActivities(context.memory.recent(readLimit(args[0])));
      return;
    case "tasks":
      printTasks(context);
      return;
    case "approve":
    case "deny":
      resolveApproval(command, args, context);
      return;
    case "provider":
      await setProvider(args, context);
      return;
    case "settings":
      await handleSettings(args, context);
      return;
    case "providers":
      console.log(
        context.workspace.config.models.provider
          ? `Selected provider: ${context.workspace.config.models.provider}`
          : "No provider selected. Use /provider <name>.",
      );
      return;
    case "models":
      console.log(
        context.workspace.config.models.planner
          ? `Planner: ${context.workspace.config.models.planner}`
          : "No planner model selected. Use /model <provider/model>.",
      );
      return;
    case "doctor":
      printDoctor(context);
      return;
    case "tools":
      console.log(
        "No execution tools are connected. Axon can plan and persist workspace activity, but it will not claim to act until a tool is installed.",
      );
      return;
    case "context":
      console.log(
        "Axon currently uses the active workspace goal, configuration, and local activity history as context.",
      );
      return;
    case "memory":
      searchMemory(args, context);
      return;
    case "run":
      console.log("No background loops are registered yet.");
      return;
    case "status":
      renderStatus({
        workspace: context.workspace,
        activityCount: context.memory.count(),
        pendingApprovals: context.approvals.pending().length,
      });
      return;
    case "clear":
      console.clear();
      return;
    case "exit":
      context.exit();
      return;
    default:
      console.log(chalk.yellow(`Unknown command: /${command}. Type /help.`));
  }
}

async function handleWorkspace(
  args: string[],
  context: SlashContext,
): Promise<void> {
  const [operation, ...nameParts] = args;
  const name = nameParts.join(" ");
  if (operation === "list") {
    const workspaces = await context.manager.list();
    console.log(
      workspaces.length
        ? workspaces.map((item) => `• ${item}`).join("\n")
        : "No workspaces yet.",
    );
    return;
  }
  if ((operation === "new" || operation === "switch") && name) {
    if (operation === "new") await context.manager.create(name);
    await context.switchWorkspace(name);
    return;
  }
  console.log("Usage: /workspace new <name> | switch <name> | list");
}

async function setModel(args: string[], context: SlashContext): Promise<void> {
  const model = args.join(" ").trim();
  if (!model) {
    console.log("Usage: /model <provider/model>");
    return;
  }
  context.workspace.config.models.planner = model;
  await context.manager.save(context.workspace);
  console.log(`Planner model: ${model}`);
}

async function setProvider(
  args: string[],
  context: SlashContext,
): Promise<void> {
  const provider = args.join(" ").trim();
  if (!provider) {
    console.log("Usage: /provider <name>");
    return;
  }
  context.workspace.config.models.provider = provider;
  await context.manager.save(context.workspace);
  console.log(`Provider: ${provider}`);
}

function resolveApproval(
  command: "approve" | "deny",
  args: string[],
  context: SlashContext,
): void {
  const id = Number(args[0]);
  if (!Number.isSafeInteger(id) || id < 1) {
    console.log(`Usage: /${command} <id>`);
    return;
  }
  const status = command === "approve" ? "approved" : "denied";
  console.log(
    context.approvals.resolve(id, status)
      ? `Approval ${id}: ${status}`
      : `No pending approval ${id}.`,
  );
}

function printTasks(context: SlashContext): void {
  const pending = context.approvals.pending();
  if (pending.length === 0) {
    console.log("No pending approvals.");
    return;
  }
  for (const approval of pending) {
    console.log(
      `${chalk.yellow(`[${approval.id}]`)} ${approval.description} ${chalk.dim(`· ${approval.createdAt.slice(0, 16).replace("T", " ")}`)}`,
    );
  }
}

function printWorkspaceReady(context: SlashContext): void {
  console.log(`Workspace ${context.workspace.config.name} is ready.`);
  console.log(`Goal: ${context.workspace.config.goal}`);
  console.log(
    "Next: /provider <name>, /model <provider/model>, then describe a task.",
  );
}

function printDoctor(context: SlashContext): void {
  const { config, path } = context.workspace;
  console.log(`${chalk.green("✓")} workspace: ${path}`);
  console.log(
    `${config.models.planner ? chalk.green("✓") : chalk.yellow("!")} planner model: ${config.models.planner || "not configured"}`,
  );
  console.log(
    `${config.models.provider ? chalk.green("✓") : chalk.yellow("!")} provider: ${config.models.provider || "not configured"}`,
  );
  console.log(`${chalk.green("✓")} local storage: history.db, tasks.db, logs/`);
}

function printHelp(args: string[]): void {
  const name = args[0]?.replace(/^\//, "");
  if (!name) {
    renderCommandList(commands);
    return;
  }
  const command = findCommand(name);
  if (!command) {
    console.log(
      chalk.yellow(`No command named /${name}. Type /help to browse commands.`),
    );
    return;
  }
  renderCommandDetail(command);
}

async function enableFullAccess(context: SlashContext): Promise<void> {
  const result = await confirm({
    message:
      "Enable Full Access? Consequential actions may execute without approval.",
    initialValue: false,
  });
  if (isCancel(result) || !result) {
    console.log(chalk.dim("Full Access was not enabled."));
    return;
  }
  context.workspace.config.mode = "full";
  await context.manager.save(context.workspace);
  console.log(chalk.yellow("Full Access enabled for this workspace."));
}

async function handleSettings(
  args: string[],
  context: SlashContext,
): Promise<void> {
  const [operation, ...rest] = args;
  if (!operation) {
    const settings = await context.settings.read();
    const configuredProviders = await context.settings.configuredProviders();
    renderSettings({
      ...settings,
      configuredProviders,
      paths: context.settings.paths(),
    });
    return;
  }
  if (operation === "path") {
    const paths = context.settings.paths();
    console.log(`Settings: ${paths.settings}`);
    console.log(`Auth: ${paths.auth} (owner-only)`);
    return;
  }
  if (operation === "provider") {
    const provider = rest.join(" ");
    if (!provider) {
      console.log("Usage: /settings provider <name>");
      return;
    }
    await context.settings.update({ defaultProvider: provider });
    console.log(`Default provider: ${provider}`);
    return;
  }
  if (operation === "model") {
    const model = rest.join(" ");
    if (!model) {
      console.log("Usage: /settings model <provider/model>");
      return;
    }
    await context.settings.update({ defaultModel: model });
    console.log(`Default model: ${model}`);
    return;
  }
  if (operation === "key") {
    await handleApiKey(rest, context);
    return;
  }
  console.log(
    "Usage: /settings [provider <name>|model <provider/model>|key set|clear <provider>|path]",
  );
}

async function handleApiKey(
  args: string[],
  context: SlashContext,
): Promise<void> {
  const [operation, provider] = args;
  if (operation === "set" && provider) {
    const value = await password({
      message: `API key for ${provider}`,
      validate: (input) =>
        input.trim() ? undefined : "An API key is required.",
    });
    if (isCancel(value)) {
      console.log(chalk.dim("API key setup cancelled."));
      return;
    }
    await context.settings.setApiKey(provider, value);
    console.log(
      chalk.green(`Stored ${provider} credentials in Axon local auth.`),
    );
    return;
  }
  if (operation === "clear" && provider) {
    const confirmed = await confirm({
      message: `Remove ${provider} credentials from Axon local auth?`,
      initialValue: false,
    });
    if (isCancel(confirmed) || !confirmed) {
      console.log(chalk.dim("API key was not removed."));
      return;
    }
    console.log(
      (await context.settings.clearApiKey(provider))
        ? `Removed ${provider} credentials.`
        : `No ${provider} credentials were configured.`,
    );
    return;
  }
  const providers = await context.settings.configuredProviders();
  console.log(
    providers.length
      ? `Configured provider keys: ${providers.join(", ")}`
      : "No provider keys configured. Use /settings key set <provider>.",
  );
}

function searchMemory(args: string[], context: SlashContext): void {
  const [operation, ...queryParts] = args;
  if (operation !== "search" || queryParts.length === 0) {
    console.log("Usage: /memory search <query>");
    return;
  }
  const activities = context.memory.search(queryParts.join(" "));
  if (activities.length === 0) {
    console.log(chalk.dim("No matching workspace activity."));
    return;
  }
  renderActivities(activities);
}

function readLimit(value: string | undefined): number {
  if (!value) return 20;
  const limit = Number(value);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
    throw new Error("History limit must be an integer between 1 and 100.");
  }
  return limit;
}
