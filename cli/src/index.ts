#!/usr/bin/env bun

import { Prompt } from "./repl/prompt";
import { WorkspaceManager } from "./workspace/manager";

const workspaceName = parseWorkspaceArgument(Bun.argv.slice(2));
const manager = new WorkspaceManager();
const workspace = await manager.ensure(workspaceName);
await new Prompt(workspace, manager).start();

function parseWorkspaceArgument(args: string[]): string {
  const index = args.findIndex(
    (value) => value === "--workspace" || value === "-w",
  );
  if (index === -1) return "default";
  const workspace = args[index + 1];
  if (!workspace || workspace.startsWith("-")) {
    throw new Error("Usage: axon --workspace <name>");
  }
  return workspace;
}
