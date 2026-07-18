import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";

import { WorkspaceManager } from "../src/workspace/manager";

let root = "";
afterEach(async () => {
  if (root) await rm(root, { recursive: true, force: true });
  root = "";
});

describe("WorkspaceManager", () => {
  test("creates and reopens an isolated workspace", async () => {
    root = await mkdtemp(join(tmpdir(), "axon-"));
    const manager = new WorkspaceManager(root);
    const workspace = await manager.ensure("Voice SaaS");
    workspace.config.goal = "Get first customers";
    await manager.save(workspace);
    await expect(manager.list()).resolves.toEqual(["voice-saas"]);
    await expect(manager.open("voice-saas")).resolves.toMatchObject({
      config: { goal: "Get first customers" },
    });
  });
});
