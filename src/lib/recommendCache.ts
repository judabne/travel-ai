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
    travelStyle: preferences.travelStyle,
    region: preferences.region,
  });
}

export function getStoredPreferences(): TravelPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = safeSessionStorageGet(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as TravelPreferences;
  } catch {
    return null;
  }
}

export function arePreferencesEqual(
  left: TravelPreferences,
  right: TravelPreferences
): boolean {
  if (
    left.budget !== right.budget ||
    left.duration !== right.duration ||
    left.travelStyle !== right.travelStyle ||
    left.region !== right.region ||
    left.interests.length !== right.interests.length
  ) {
    return false;
  }

  const leftInterests = [...left.interests].sort();
  const rightInterests = [...right.interests].sort();

  return leftInterests.every(
    (interest, index) => interest === rightInterests[index]
  );
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
