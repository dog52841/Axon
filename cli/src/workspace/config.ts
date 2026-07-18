import { parse, stringify } from "yaml";
import { z } from "zod";

import type { WorkspaceConfig } from "../types";

const workspaceSchema = z.object({
  name: z.string().min(1),
  goal: z.string().min(1),
  stage: z.string().min(1),
  region: z.string().min(1),
  currency: z.string().min(1),
  models: z.record(z.string()),
  mode: z.enum(["safe", "full"]),
});

export function parseWorkspaceConfig(source: string): WorkspaceConfig {
  return workspaceSchema.parse(parse(source));
}

export function serializeWorkspaceConfig(config: WorkspaceConfig): string {
  return stringify(config);
}
