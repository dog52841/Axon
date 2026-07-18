import { Command } from "commander";

export function parseCLI(argv: string[]): { workspace: string } {
  const program = new Command()
    .name("axon")
    .description("Run your startup. Not your AI.")
    .option("-w, --workspace <name>", "workspace to open", "default")
    .version("0.1.0")
    .allowUnknownOption(false)
    .parse(argv);
  return program.opts<{ workspace: string }>();
}
