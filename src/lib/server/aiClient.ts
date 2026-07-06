import "server-only";

import OpenAI from "openai";

import { buildRecommendJsonSchema } from "@/lib/server/buildRecommendJsonSchema";
import { buildRecommendPrompt } from "@/lib/server/prompt";
import { parseAiRecommendResponse } from "@/lib/server/parseAiResponse";
import type { AiRecommendResponse } from "@/types/ai";
import type { RecommendRequest } from "@/types/travel";

const DEFAULT_MODEL = "gpt-4.1-nano";

function getOpenAiClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to .env.local to enable recommendations."
    );
  }

  return new OpenAI({ apiKey });
}

function getRecommendModel(): string {
  return process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;
}

export async function fetchAiRecommendations(
  request: RecommendRequest
): Promise<AiRecommendResponse> {
  const client = getOpenAiClient();
  const prompt = buildRecommendPrompt(request);
  const schema = buildRecommendJsonSchema(request);

  const completion = await client.chat.completions.create({
    model: getRecommendModel(),
    messages: [{ role: "user", content: prompt }],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "travel_recommendations",
        strict: true,
        schema,
      },
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI response was empty.");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("AI response was not valid JSON.");
  }

  const response = parseAiRecommendResponse(parsed, request);

  if (!response) {
    throw new Error(
      "AI response did not match the expected recommendation schema."
    );
  }

  return response;
}
