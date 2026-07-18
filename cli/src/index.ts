#!/usr/bin/env bun

import { parseCLI } from "./cli/commands";
import { Prompt } from "./repl/prompt";
import { WorkspaceManager } from "./workspace/manager";

const options = parseCLI(process.argv);
const manager = new WorkspaceManager();
const workspace = await manager.ensure(options.workspace);
await new Prompt(workspace, manager).start();
