import { confirm, isCancel } from "@clack/prompts";
import chalk from "chalk";

import type { ApprovalQueue } from "../approvals/queue";
import type { MemoryStore } from "../memory/sqlite";
import type { Workspace } from "../types";
import { renderActivities } from "../ui/render";
import type { WorkspaceManager } from "../workspace/manager";

export interface SlashContext {
  workspace: Workspace;
  manager: WorkspaceManager;
  memory: MemoryStore;
  approvals: ApprovalQueue;
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
      printHelp();
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
      renderActivities(context.memory.recent());
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
      console.log("No tools are connected yet.");
      return;
    case "context":
      console.log("Context files are not connected yet.");
      return;
    case "memory":
      console.log(
        "Semantic memory is not connected yet. Use /history for local activity.",
      );
      return;
    case "run":
      console.log("No background loops are registered yet.");
      return;
    case "status":
      console.log(
        `${context.workspace.config.name} • ${context.workspace.config.stage} • ${context.workspace.config.mode.toUpperCase()}`,
      );
      console.log(`Goal: ${context.workspace.config.goal}`);
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
  const [operation, name] = args;
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
    console.log(`[${approval.id}] ${approval.description}`);
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

function printHelp(): void {
  console.log(`
${chalk.bold("WORKSPACE")}
  /workspace new <name>       Create a workspace
  /workspace switch <name>    Switch workspace
  /workspace list             List workspaces
  /new <name> | /open <name>  Create or open a workspace
  /init                       Show next setup steps

${chalk.bold("AGENT")}
  /model <provider/model>     Set the planner model
  /provider <name>            Set the planner provider
  /providers | /models         Inspect current provider/model
  /run <loop>                 Show loop status
  /tools                      List connected tools

${chalk.bold("MEMORY & CONTROL")}
  /history                    Show recent activity
  /tasks                      Show approvals awaiting a decision
  /memory search <query>      Search semantic memory
  /context add <file>         Add context (coming next)
  /approve <id> | /deny <id>  Resolve a pending approval
  /safe | /yolo               Change execution mode

${chalk.bold("SYSTEM")}
  /status  /doctor  /clear  /exit
`);
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
