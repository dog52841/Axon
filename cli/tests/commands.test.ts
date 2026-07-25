import { describe, expect, test } from "vitest";

import { completeCommand, findCommand } from "../src/cli/commands";

describe("command registry", () => {
  test("finds commands through their aliases", () => {
    expect(findCommand("open")).toMatchObject({ name: "workspace" });
  });

  test("returns slash-prefixed completion candidates", () => {
    expect(completeCommand("/wor")).toEqual(["/workspace"]);
  });
});
