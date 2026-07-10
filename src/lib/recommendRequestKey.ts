import { normalizeOptionalCountryField } from "@/lib/countryFieldHelpers";
import type { Interest, Region } from "@/types/travel";

export interface RecommendRequestKeyInput {
  interests: Interest[];
  budget: number;
  duration: number;
  regions: Region[];
  currentCountry?: string;
  nationality?: string;
  prioritizeVisaFriendlyDestinations?: boolean;
}

export function buildRecommendRequestPayload(
  input: RecommendRequestKeyInput
): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    interests: [...input.interests].sort(),
    budget: input.budget,
    duration: input.duration,
    regions: [...input.regions].sort(),
  };

  const currentCountry = normalizeOptionalCountryField(input.currentCountry);
  const nationality = normalizeOptionalCountryField(input.nationality);

  if (currentCountry) {
    payload.currentCountry = currentCountry;
  }

  if (nationality) {
    payload.nationality = nationality;
  }

  if (input.prioritizeVisaFriendlyDestinations) {
    payload.prioritizeVisaFriendlyDestinations = true;
  }

  return payload;
}

export function buildRecommendRequestKey(
  input: RecommendRequestKeyInput
): string {
  return JSON.stringify(buildRecommendRequestPayload(input));
}
