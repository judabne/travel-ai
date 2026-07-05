import { getInterestLabel } from "@/lib/interestHelpers";
import { REGIONS, TRAVEL_STYLES } from "@/lib/constants";
import type { TravelPreferences } from "@/types/travel";

export function formatInterests(preferences: TravelPreferences): string {
  if (preferences.interests.length === 0) {
    return "None selected";
  }

  return preferences.interests.map(getInterestLabel).join(", ");
}

export function formatTravelStyle(preferences: TravelPreferences): string {
  return (
    TRAVEL_STYLES.find((style) => style.id === preferences.travelStyle)?.label ??
    preferences.travelStyle
  );
}

export function formatRegion(preferences: TravelPreferences): string {
  return (
    REGIONS.find((region) => region.id === preferences.region)?.label ??
    preferences.region
  );
}
