import { fetchAiRecommendations } from "@/lib/server/aiClient";
import { mapAiResponseToRecommendResponse } from "@/lib/server/mapAiResults";
import type { RecommendRequest, RecommendResponse } from "@/types/travel";

export type { RecommendRequest, RecommendResponse };

export function getTopInsight(results: RecommendResponse["results"]): string {
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
  const aiResponse = await fetchAiRecommendations(preferences);
  const response = mapAiResponseToRecommendResponse(
    aiResponse,
    preferences.interests,
    preferences.budget
  );

  if (!aiResponse.insight.trim()) {
    return {
      ...response,
      insight: getTopInsight(response.results),
    };
  }

  return response;
}
