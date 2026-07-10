import { getInterestLabel } from "@/lib/interestHelpers";
import { REGIONS } from "@/lib/constants";
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

export function formatRegion(
  preferences: TravelPreferences,
  isEmpty = false
): string {
  if (isEmpty || preferences.regions.length === 0) {
    return "—";
  }

  return preferences.regions
    .map(
      (region) =>
        REGIONS.find((item) => item.id === region)?.label ?? region
    )
    .join(", ");
}

export function formatOptionalField(
  value: string | undefined,
  isEmpty = false
): string {
  if (isEmpty || !value) {
    return "—";
  }

  return value;
}

export function formatPrioritizeVisaFriendlyDestinations(
  preferences: TravelPreferences,
  isEmpty = false
): string {
  if (isEmpty || !preferences.nationality) {
    return "—";
  }

  return preferences.prioritizeVisaFriendlyDestinations ? "Yes" : "No";
}
