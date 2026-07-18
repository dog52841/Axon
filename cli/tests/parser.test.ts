import { describe, expect, test } from "vitest";

import { parseInput } from "../src/repl/parser";

describe("parseInput", () => {
  test("parses slash commands", () => {
    expect(parseInput("/workspace new Voice SaaS")).toEqual({
      kind: "slash",
      command: "workspace",
      args: ["new", "Voice", "SaaS"],
    });
  });

  test("passes requests through", () => {
    expect(parseInput("Find 10 prospects")).toEqual({
      kind: "request",
      value: "Find 10 prospects",
    });
  });
});
