import type { MemoryStore } from "../memory/sqlite";
import type { AgentResult, Workspace } from "../types";

export class Agent {
  constructor(
    private readonly workspace: Workspace,
    private readonly memory: MemoryStore,
  ) {}

  async run(input: string): Promise<AgentResult> {
    const activity = {
      at: new Date().toISOString(),
      kind: "request.received",
      message: input,
    };
    this.memory.append(activity);
    const configuredModel = this.workspace.config.models.planner;
    if (!configuredModel) {
      return {
        headline:
          "No planner model is configured. Set one with /model <provider/model>.",
        activities: [activity],
      };
    }
    return {
      headline: `Planner ${configuredModel} is configured, but provider execution is not connected yet. No action was taken.`,
      activities: [activity],
    };
  }
}
