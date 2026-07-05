import {
  RESULTS_HASH_KEY,
  RESULTS_STORAGE_KEY,
  STORAGE_KEY,
} from "@/lib/constants";
import {
  safeSessionStorageGet,
  safeSessionStorageSet,
} from "@/lib/safeSessionStorage";
import type { RecommendResponse, TravelPreferences } from "@/types/travel";

export function getRecommendRequestKey(
  preferences: TravelPreferences
): string {
  return JSON.stringify({
    interests: [...preferences.interests].sort(),
    budget: preferences.budget,
    duration: preferences.duration,
    region: preferences.region,
  });
}

export function getCachedRecommendations(
  preferences: TravelPreferences
): RecommendResponse | null {
  if (typeof window === "undefined") {
    return null;
  }

  const requestKey = getRecommendRequestKey(preferences);
  const storedHash = safeSessionStorageGet(RESULTS_HASH_KEY);

  if (storedHash !== requestKey) {
    return null;
  }

  const stored = safeSessionStorageGet(RESULTS_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as RecommendResponse;
  } catch {
    return null;
  }
}

export function setStoredPreferences(
  preferences: TravelPreferences
): boolean {
  return safeSessionStorageSet(STORAGE_KEY, JSON.stringify(preferences));
}

export function setCachedRecommendations(
  preferences: TravelPreferences,
  response: RecommendResponse
): boolean {
  const requestKey = getRecommendRequestKey(preferences);

  return (
    safeSessionStorageSet(STORAGE_KEY, JSON.stringify(preferences)) &&
    safeSessionStorageSet(RESULTS_HASH_KEY, requestKey) &&
    safeSessionStorageSet(RESULTS_STORAGE_KEY, JSON.stringify(response))
  );
}
