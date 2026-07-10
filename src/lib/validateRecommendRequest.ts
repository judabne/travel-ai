import {
  BUDGET_MAX,
  BUDGET_MIN,
  DURATION_MAX,
  DURATION_MIN,
  INTERESTS,
  MAX_SELECTED_INTERESTS,
  REGIONS,
} from "@/lib/constants";
import { VALID_COUNTRIES } from "@/lib/countries";
import type { Interest, RecommendRequest, Region } from "@/types/travel";

const VALID_INTERESTS = new Set<Interest>(INTERESTS.map((item) => item.id));
const VALID_REGIONS = new Set<Region>(REGIONS.map((item) => item.id));

function parseOptionalCountryField(
  value: unknown
): string | undefined | null {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  if (!VALID_COUNTRIES.has(trimmed)) {
    return null;
  }

  return trimmed;
}

export function parseRecommendRequest(body: unknown): RecommendRequest | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const request = body as RecommendRequest;

  if (
    !Array.isArray(request.interests) ||
    request.interests.length === 0 ||
    request.interests.length > MAX_SELECTED_INTERESTS
  ) {
    return null;
  }

  if (
    !request.interests.every(
      (interest): interest is Interest =>
        typeof interest === "string" && VALID_INTERESTS.has(interest as Interest)
    )
  ) {
    return null;
  }

  if (
    typeof request.budget !== "number" ||
    !Number.isFinite(request.budget) ||
    request.budget < BUDGET_MIN ||
    request.budget > BUDGET_MAX
  ) {
    return null;
  }

  if (
    typeof request.duration !== "number" ||
    !Number.isInteger(request.duration) ||
    request.duration < DURATION_MIN ||
    request.duration > DURATION_MAX
  ) {
    return null;
  }

  if (!Array.isArray(request.regions)) {
    return null;
  }

  if (
    !request.regions.every(
      (region): region is Region =>
        typeof region === "string" && VALID_REGIONS.has(region as Region)
    )
  ) {
    return null;
  }

  const currentCountry = parseOptionalCountryField(request.currentCountry);
  if (currentCountry === null) {
    return null;
  }

  const nationality = parseOptionalCountryField(request.nationality);
  if (nationality === null) {
    return null;
  }

  const parsed: RecommendRequest = {
    interests: request.interests,
    budget: request.budget,
    duration: request.duration,
    regions: request.regions,
  };

  if (currentCountry) {
    parsed.currentCountry = currentCountry;
  }

  if (nationality) {
    parsed.nationality = nationality;
  }

  if (request.prioritizeVisaFriendlyDestinations !== undefined) {
    if (typeof request.prioritizeVisaFriendlyDestinations !== "boolean") {
      return null;
    }

    if (request.prioritizeVisaFriendlyDestinations) {
      if (!nationality) {
        return null;
      }

      parsed.prioritizeVisaFriendlyDestinations = true;
    }
  }

  return parsed;
}
