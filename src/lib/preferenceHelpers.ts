import { getInterestLabel } from "@/lib/interestHelpers";
import { REGIONS, TRAVEL_STYLES } from "@/lib/constants";
import type { TravelPreferences } from "@/types/travel";

export function formatInterests(
  preferences: TravelPreferences,
  isEmpty = false
): string {
  if (isEmpty || preferences.interests.length === 0) {
    return "—";
  }

  return preferences.interests.map(getInterestLabel).join(", ");
}

export function formatBudget(
  preferences: TravelPreferences,
  isEmpty = false
): string {
  if (isEmpty) {
    return "—";
  }

  return `$${preferences.budget.toLocaleString()}`;
}

export function formatDuration(
  preferences: TravelPreferences,
  isEmpty = false
): string {
  if (isEmpty) {
    return "—";
  }

  return `${preferences.duration} days`;
}

export function formatTravelStyle(
  preferences: TravelPreferences,
  isEmpty = false
): string {
  if (isEmpty) {
    return "—";
  }

  return (
    TRAVEL_STYLES.find((style) => style.id === preferences.travelStyle)?.label ??
    preferences.travelStyle
  );
}

export function formatRegion(
  preferences: TravelPreferences,
  isEmpty = false
): string {
  if (isEmpty) {
    return "—";
  }

  return (
    REGIONS.find((region) => region.id === preferences.region)?.label ??
    preferences.region
  );
}
