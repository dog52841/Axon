export type Input =
  | { kind: "slash"; command: string; args: string[] }
  | { kind: "request"; value: string };

export function parseInput(value: string): Input | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!trimmed.startsWith("/")) return { kind: "request", value: trimmed };
  const [command = "", ...args] = trimmed.slice(1).trim().split(/\s+/);
  return { kind: "slash", command: command.toLowerCase(), args };
}
