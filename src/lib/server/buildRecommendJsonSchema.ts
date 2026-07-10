import type { RecommendRequest } from "@/types/travel";

const scoreSchema = {
  type: "integer",
  minimum: 0,
  maximum: 100,
} as const;

export function buildRecommendJsonSchema(request: RecommendRequest) {
  const interestIds = [...request.interests];

  const interestMatchItemSchema = {
    type: "object",
    properties: {
      interest: {
        type: "string",
        enum: interestIds,
      },
      score: scoreSchema,
    },
    required: ["interest", "score"],
    additionalProperties: false,
  } as const;

  const countrySchema = {
    type: "object",
    properties: {
      country: { type: "string" },
      flag: { type: "string" },
      summary: { type: "string" },
      estimatedCost: { type: "number" },
      visitorSatisfactionScore: scoreSchema,
      infrastructureScore: scoreSchema,
      interestMatch: {
        type: "array",
        items: interestMatchItemSchema,
        minItems: interestIds.length,
        maxItems: interestIds.length,
      },
    },
    required: [
      "country",
      "flag",
      "summary",
      "estimatedCost",
      "visitorSatisfactionScore",
      "infrastructureScore",
      "interestMatch",
    ],
    additionalProperties: false,
  } as const;

  return {
    type: "object",
    properties: {
      insight: { type: "string" },
      countries: {
        type: "array",
        items: countrySchema,
        minItems: 4,
        maxItems: 4,
      },
    },
    required: ["insight", "countries"],
    additionalProperties: false,
  } as const;
}
