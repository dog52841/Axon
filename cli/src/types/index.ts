export type ExecutionMode = "safe" | "full";

export interface WorkspaceConfig {
  name: string;
  goal: string;
  stage: string;
  region: string;
  currency: string;
  models: Record<string, string>;
  mode: ExecutionMode;
}

export interface Workspace {
  config: WorkspaceConfig;
  path: string;
}

export interface Activity {
  at: string;
  kind: string;
  message: string;
}

export interface AgentResult {
  headline: string;
  activities: Activity[];
  streamed?: boolean;
}
