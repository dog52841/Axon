import { chmod, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parse, stringify } from "yaml";
import { z } from "zod";

const settingsSchema = z.object({
  version: z.literal(1),
  defaultProvider: z.string(),
  defaultModel: z.string(),
});

const authSchema = z.object({
  version: z.literal(1),
  providers: z.record(z.string(), z.object({ apiKey: z.string().min(1) })),
});

export type AxonSettings = z.infer<typeof settingsSchema>;

interface AuthStore {
  version: 1;
  providers: Record<string, { apiKey: string }>;
}

const defaultSettings: AxonSettings = {
  version: 1,
  defaultProvider: "",
  defaultModel: "",
};

const defaultAuth: AuthStore = {
  version: 1,
  providers: {},
};

export class SettingsStore {
  constructor(private readonly root: string) {}

  async read(): Promise<AxonSettings> {
    return this.readYaml(this.settingsPath, settingsSchema, defaultSettings);
  }

  async update(
    update: Partial<Omit<AxonSettings, "version">>,
  ): Promise<AxonSettings> {
    const settings = { ...(await this.read()), ...update };
    await this.writeYaml(this.settingsPath, settings);
    return settings;
  }

  async apiKey(provider: string): Promise<string | undefined> {
    const auth = await this.readYaml(this.authPath, authSchema, defaultAuth);
    return auth.providers[normalizeProvider(provider)]?.apiKey;
  }

  async setApiKey(provider: string, apiKey: string): Promise<void> {
    const normalized = normalizeProvider(provider);
    if (!apiKey.trim()) throw new Error("API key cannot be empty.");
    const auth = await this.readYaml(this.authPath, authSchema, defaultAuth);
    auth.providers[normalized] = { apiKey: apiKey.trim() };
    await this.writeYaml(this.authPath, auth);
  }

  async clearApiKey(provider: string): Promise<boolean> {
    const normalized = normalizeProvider(provider);
    const auth = await this.readYaml(this.authPath, authSchema, defaultAuth);
    if (!auth.providers[normalized]) return false;
    delete auth.providers[normalized];
    await this.writeYaml(this.authPath, auth);
    return true;
  }

  async configuredProviders(): Promise<string[]> {
    const auth = await this.readYaml(this.authPath, authSchema, defaultAuth);
    return Object.keys(auth.providers).sort();
  }

  paths(): { settings: string; auth: string } {
    return { settings: this.settingsPath, auth: this.authPath };
  }

  private get settingsPath(): string {
    return join(this.root, "settings.yaml");
  }

  private get authPath(): string {
    return join(this.root, "auth.yaml");
  }

  private async readYaml<T>(
    path: string,
    schema: z.ZodType<T>,
    fallback: T,
  ): Promise<T> {
    try {
      return schema.parse(parse(await readFile(path, "utf8")));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT")
        return structuredClone(fallback);
      throw error;
    }
  }

  private async writeYaml(path: string, value: unknown): Promise<void> {
    await mkdir(this.root, { recursive: true, mode: 0o700 });
    await chmod(this.root, 0o700);
    const temporaryPath = `${path}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, stringify(value), {
      encoding: "utf8",
      mode: 0o600,
    });
    await chmod(temporaryPath, 0o600);
    await rename(temporaryPath, path);
  }
}

export function normalizeProvider(provider: string): string {
  const normalized = provider.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9_-]*$/.test(normalized)) {
    throw new Error(
      "Provider names may contain lowercase letters, numbers, hyphens, and underscores.",
    );
  }
  return normalized;
}
