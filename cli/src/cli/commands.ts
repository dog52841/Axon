export interface CommandDefinition {
  name: string;
  usage: string;
  description: string;
  category: "Workspace" | "Agent" | "Memory" | "System";
  aliases?: string[];
}

export const commands: readonly CommandDefinition[] = [
  {
    name: "help",
    usage: "/help [command]",
    description: "Show commands or detailed command help",
    category: "System",
  },
  {
    name: "workspace",
    usage: "/workspace new|switch|list [name]",
    description: "Create, switch, or list workspaces",
    category: "Workspace",
    aliases: ["new", "open"],
  },
  {
    name: "init",
    usage: "/init",
    description: "Show the workspace setup checklist",
    category: "Workspace",
  },
  {
    name: "model",
    usage: "/model <provider/model>",
    description: "Choose the planner model for this workspace",
    category: "Agent",
  },
  {
    name: "provider",
    usage: "/provider <name>",
    description: "Choose the active model provider",
    category: "Agent",
  },
  {
    name: "settings",
    usage: "/settings [provider|model|key|path]",
    description: "Configure Axon defaults and provider credentials",
    category: "System",
  },
  {
    name: "providers",
    usage: "/providers",
    description: "Inspect the selected provider",
    category: "Agent",
  },
  {
    name: "models",
    usage: "/models",
    description: "Inspect the selected planner model",
    category: "Agent",
  },
  {
    name: "tools",
    usage: "/tools",
    description: "Inspect connected execution tools",
    category: "Agent",
  },
  {
    name: "run",
    usage: "/run <loop>",
    description: "Inspect or run an available workflow",
    category: "Agent",
  },
  {
    name: "history",
    usage: "/history [limit]",
    description: "Review the workspace activity timeline",
    category: "Memory",
  },
  {
    name: "memory",
    usage: "/memory search <query>",
    description: "Search remembered workspace activity",
    category: "Memory",
  },
  {
    name: "context",
    usage: "/context",
    description: "Inspect the context available to Axon",
    category: "Memory",
  },
  {
    name: "tasks",
    usage: "/tasks",
    description: "Review pending approvals",
    category: "Memory",
  },
  {
    name: "approve",
    usage: "/approve <id>",
    description: "Approve a pending consequential action",
    category: "Memory",
  },
  {
    name: "deny",
    usage: "/deny <id>",
    description: "Deny a pending consequential action",
    category: "Memory",
  },
  {
    name: "status",
    usage: "/status",
    description: "Show the current workspace operating state",
    category: "System",
  },
  {
    name: "doctor",
    usage: "/doctor",
    description: "Check local workspace readiness",
    category: "System",
  },
  {
    name: "safe",
    usage: "/safe",
    description: "Require approval for consequential actions",
    category: "System",
  },
  {
    name: "yolo",
    usage: "/yolo",
    description: "Enable Full Access after confirmation",
    category: "System",
  },
  {
    name: "clear",
    usage: "/clear",
    description: "Clear the current transcript",
    category: "System",
  },
  {
    name: "exit",
    usage: "/exit",
    description: "Close the current Axon session",
    category: "System",
  },
];

export function findCommand(name: string): CommandDefinition | undefined {
  const normalized = name.toLowerCase();
  return commands.find(
    (command) =>
      command.name === normalized || command.aliases?.includes(normalized),
  );
}

export function completeCommand(input: string): string[] {
  const normalized = input.toLowerCase().replace(/^\//, "");
  return commands
    .flatMap((command) => [command.name, ...(command.aliases ?? [])])
    .filter((name) => name.startsWith(normalized))
    .map((name) => `/${name}`)
    .sort();
}
