import { fetchAiRecommendations } from "@/lib/server/aiClient";
import {
  buildLlmCacheKey,
  getCachedLlmResult,
  setCachedLlmResult,
} from "@/lib/server/llmResultCache";
import { mapAiResponseToRecommendResponse } from "@/lib/server/mapAiResults";
import type { RecommendRequest, RecommendResponse } from "@/types/travel";

function getTopInsight(results: RecommendResponse["results"]): string {
  if (results.length === 0) {
    return "No matches found. Try adjusting your filters.";
  }

  const top = [...results].sort(
    (a, b) => b.scores.overall - a.scores.overall
  )[0];

  return `${top.country} offers the best overall balance of cost and visitor satisfaction for your trip.`;
}

export async function getRecommendations(
  preferences: RecommendRequest
): Promise<RecommendResponse> {
  const cacheKey = buildLlmCacheKey(preferences);
  const cachedAiResponse = getCachedLlmResult(cacheKey);

  const aiResponse =
    cachedAiResponse ?? (await fetchAiRecommendations(preferences));

  if (!cachedAiResponse) {
    setCachedLlmResult(cacheKey, aiResponse);
  }

  const response = mapAiResponseToRecommendResponse(
    aiResponse,
    preferences.interests,
    preferences.budget,
    preferences.duration,
    preferences.nationality
  );

  if (!aiResponse.insight.trim()) {
    return {
      ...response,
      insight: getTopInsight(response.results),
    };
  }

  return response;
}
