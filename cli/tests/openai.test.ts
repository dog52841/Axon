import { afterEach, describe, expect, test } from "vitest";

import { streamOpenAIResponse } from "../src/providers/openai";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env.OPENAI_BASE_URL = undefined;
});

describe("streamOpenAIResponse", () => {
  test("streams OpenAI text delta events", async () => {
    process.env.OPENAI_BASE_URL = "https://mock.openai.test/v1";
    globalThis.fetch = (async (input, init) => {
      expect(input).toBe("https://mock.openai.test/v1/responses");
      expect(new Headers(init?.headers).get("Authorization")).toBe(
        "Bearer test-key",
      );
      return new Response(
        'data: {"type":"response.output_text.delta","delta":"Hello"}\n\ndata: {"type":"response.output_text.delta","delta":" world"}\n\n',
        { status: 200 },
      );
    }) as typeof fetch;
    let output = "";
    await streamOpenAIResponse({
      apiKey: "test-key",
      model: "gpt-test",
      requestID: "req_test",
      instructions: "Be concise.",
      input: "Hello",
      onText: (delta) => {
        output += delta;
      },
    });
    expect(output).toBe("Hello world");
  });

  test("does not expose provider error bodies", async () => {
    globalThis.fetch = (async () =>
      new Response('{"error":{"message":"secret detail"}}', {
        status: 401,
      })) as unknown as typeof fetch;
    await expect(
      streamOpenAIResponse({
        apiKey: "test-key",
        model: "gpt-test",
        requestID: "req_test",
        instructions: "Be concise.",
        input: "Hello",
        onText: () => undefined,
      }),
    ).rejects.toThrow("OpenAI request failed (401).");
  });
});
