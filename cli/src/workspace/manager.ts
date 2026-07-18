import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

import type { Workspace, WorkspaceConfig } from "../types";
import { parseWorkspaceConfig, serializeWorkspaceConfig } from "./config";

export class WorkspaceManager {
  readonly root: string;

  constructor(root = process.env.AXON_HOME ?? join(homedir(), ".axon")) {
    this.root = root;
  }

  async create(name: string): Promise<Workspace> {
    const normalized = normalizeName(name);
    const path = this.pathFor(normalized);
    await mkdir(join(this.root, "workspaces"), { recursive: true });
    await mkdir(path, { recursive: false });
    const config: WorkspaceConfig = {
      name: normalized,
      goal: "Define your startup goal",
      stage: "pre_revenue",
      region: "IN",
      currency: "INR",
      models: { planner: "" },
      mode: "safe",
    };
    await this.save({ config, path });
    return { config, path };
  }

  async open(name: string): Promise<Workspace> {
    const path = this.pathFor(normalizeName(name));
    const source = await readFile(join(path, "workspace.yaml"), "utf8");
    return { config: parseWorkspaceConfig(source), path };
  }

  async ensure(name: string): Promise<Workspace> {
    try {
      return await this.open(name);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      await mkdir(join(this.root, "workspaces"), { recursive: true });
      return this.create(name);
    }
  }

  async list(): Promise<string[]> {
    try {
      const entries = await readdir(join(this.root, "workspaces"), {
        withFileTypes: true,
      });
      return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    }
  }

  async save(workspace: Workspace): Promise<void> {
    await mkdir(workspace.path, { recursive: true });
    await writeFile(
      join(workspace.path, "workspace.yaml"),
      serializeWorkspaceConfig(workspace.config),
      "utf8",
    );
  }

  async remove(name: string): Promise<void> {
    await rm(this.pathFor(normalizeName(name)), {
      recursive: true,
      force: false,
    });
  }

  private pathFor(name: string): string {
    return join(this.root, "workspaces", name);
  }
}

function normalizeName(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!normalized)
    throw new Error("Workspace name must contain a letter or number");
  return normalized;
}
