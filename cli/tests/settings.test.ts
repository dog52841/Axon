import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";

import { SettingsStore } from "../src/config/settings";

let root = "";

afterEach(async () => {
  if (root) await rm(root, { recursive: true, force: true });
  root = "";
});

describe("SettingsStore", () => {
  test("keeps provider credentials separate from non-secret settings", async () => {
    root = await mkdtemp(join(tmpdir(), "axon-settings-"));
    const settings = new SettingsStore(root);

    await settings.update({
      defaultProvider: "openai",
      defaultModel: "openai/gpt-5",
    });
    await settings.setApiKey("openai", "test-key");

    expect(await settings.read()).toMatchObject({
      defaultProvider: "openai",
      defaultModel: "openai/gpt-5",
    });
    expect(await settings.apiKey("openai")).toBe("test-key");
    expect(await settings.configuredProviders()).toEqual(["openai"]);

    const paths = settings.paths();
    await expect(readFile(paths.settings, "utf8")).resolves.not.toContain(
      "test-key",
    );
    expect((await stat(paths.auth)).mode & 0o777).toBe(0o600);
  });

  test("removes a stored provider key", async () => {
    root = await mkdtemp(join(tmpdir(), "axon-settings-"));
    const settings = new SettingsStore(root);
    await settings.setApiKey("openai", "test-key");

    await expect(settings.clearApiKey("openai")).resolves.toBe(true);
    await expect(settings.apiKey("openai")).resolves.toBeUndefined();
  });
});
