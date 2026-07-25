import type { SettingsStore } from "../config/settings";
import type { MemoryStore } from "../memory/sqlite";
import { streamOpenAIResponse } from "../providers/openai";
import type { AgentResult, Workspace } from "../types";

export class Agent {
  constructor(
    private readonly workspace: Workspace,
    private readonly memory: MemoryStore,
    private readonly settings: SettingsStore,
  ) {}

  async run(
    input: string,
    onText?: (delta: string) => void,
  ): Promise<AgentResult> {
    const activity = this.persist(input);
    const settings = await this.settings.read();
    const plan = this.plan(settings.defaultModel);
    if (!plan || !onText) return this.summarize(plan, activity);
    const [provider, model] = parseModel(
      plan,
      this.workspace.config.models.provider || settings.defaultProvider,
    );
    if (provider !== "openai") return this.summarize(plan, activity);
    const apiKey = await this.settings.apiKey(provider);
    if (!apiKey) {
      return {
        headline:
          "No OpenAI API key is configured. Run /settings key set openai to connect this workspace.",
        activities: [activity],
      };
    }
    await streamOpenAIResponse({
      apiKey,
      model,
      requestID: crypto.randomUUID(),
      instructions: systemInstructions(this.workspace),
      input,
      onText,
    });
    this.memory.append({
      at: new Date().toISOString(),
      kind: "response.completed",
      message: "OpenAI response completed",
    });
    return { headline: "Completed.", activities: [activity], streamed: true };
  }

  private persist(input: string) {
    const activity = {
      at: new Date().toISOString(),
      kind: "request.received",
      message: input,
    };
    this.memory.append(activity);
    return activity;
  }

  private plan(defaultModel: string): string | null {
    return this.workspace.config.models.planner || defaultModel || null;
  }

  private summarize(
    plan: string | null,
    activity: AgentResult["activities"][number],
  ): AgentResult {
    if (!plan) {
      return {
        headline:
          "No planner model is configured. Set one with /model <provider/model>.",
        activities: [activity],
      };
    }
    return {
      headline: `Planner ${plan} is configured, but provider execution is not connected yet. No action was taken.`,
      activities: [activity],
    };
  }
}

function parseModel(
  value: string,
  selectedProvider?: string,
): [string, string] {
  const separator = value.indexOf("/");
  if (separator === -1) return [selectedProvider || "", value];
  return [value.slice(0, separator), value.slice(separator + 1)];
}

function systemInstructions(workspace: Workspace): string {
  return [
    "You are Axon, an execution-first startup co-founder.",
    `Workspace: ${workspace.config.name}.`,
    `Goal: ${workspace.config.goal}.`,
    "Give concise, concrete next actions. Do not claim to have taken an action unless a tool result confirms it.",
    workspace.config.mode === "safe"
      ? "Safe mode is active. Surface irreversible, financial, legal, security, and ambiguous actions for approval."
      : "Full Access is active, but still state consequential actions clearly.",
  ].join("\n");
}
