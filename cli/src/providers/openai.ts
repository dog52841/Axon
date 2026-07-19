const defaultBaseURL = "https://api.openai.com/v1";

export interface OpenAIStreamInput {
  apiKey: string;
  model: string;
  requestID: string;
  instructions: string;
  input: string;
  onText(delta: string): void;
}

export async function streamOpenAIResponse(
  input: OpenAIStreamInput,
): Promise<void> {
  const response = await fetch(`${baseURL()}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      "Content-Type": "application/json",
      "X-Client-Request-Id": input.requestID,
    },
    body: JSON.stringify({
      model: input.model,
      instructions: input.instructions,
      input: input.input,
      stream: true,
    }),
  });
  if (!response.ok) {
    throw new Error(`OpenAI request failed (${response.status}).`);
  }
  if (!response.body) {
    throw new Error("OpenAI returned an empty response stream.");
  }
  await readSSE(response.body, (event) => {
    if (
      event.type === "response.output_text.delta" &&
      typeof event.delta === "string"
    ) {
      input.onText(event.delta);
    }
    if (event.type === "error") {
      throw new Error("OpenAI returned a streaming error.");
    }
  });
}

async function readSSE(
  stream: ReadableStream<Uint8Array>,
  onEvent: (event: Record<string, unknown>) => void,
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let pending = "";
  while (true) {
    const { done, value } = await reader.read();
    pending += decoder.decode(value, { stream: !done });
    const frames = pending.split("\n\n");
    pending = frames.pop() ?? "";
    for (const frame of frames) {
      const data = frame
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim())
        .join("\n");
      if (!data || data === "[DONE]") continue;
      try {
        onEvent(JSON.parse(data) as Record<string, unknown>);
      } catch {
        // Ignore malformed non-data SSE frames; valid delta events remain usable.
      }
    }
    if (done) return;
  }
}

function baseURL(): string {
  return (process.env.OPENAI_BASE_URL || defaultBaseURL).replace(/\/$/, "");
}
