import type { RecommendResponse, TravelPreferences } from "@/types/travel";
import { getRecommendRequestKey } from "@/lib/recommendCache";

const inFlightRequests = new Map<string, Promise<RecommendResponse>>();

export async function fetchRecommendations(
  preferences: TravelPreferences
): Promise<RecommendResponse> {
  const requestKey = getRecommendRequestKey(preferences);
  const existing = inFlightRequests.get(requestKey);

  if (existing) {
    return existing;
  }

  const request = (async () => {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        interests: preferences.interests,
        budget: preferences.budget,
        duration: preferences.duration,
        regions: preferences.regions,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        typeof error.error === "string"
          ? error.error
          : "Failed to fetch recommendations."
      );
    }

    return response.json() as Promise<RecommendResponse>;
  })();

  inFlightRequests.set(requestKey, request);

  try {
    return await request;
  } finally {
    inFlightRequests.delete(requestKey);
  }
}
