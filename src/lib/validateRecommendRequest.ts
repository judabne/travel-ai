import {
  BUDGET_MAX,
  BUDGET_MIN,
  DURATION_MAX,
  DURATION_MIN,
  INTERESTS,
  MAX_SELECTED_INTERESTS,
  REGIONS,
} from "@/lib/constants";
import type { Interest, RecommendRequest, Region } from "@/types/travel";

const VALID_INTERESTS = new Set<Interest>(INTERESTS.map((item) => item.id));
const VALID_REGIONS = new Set<Region>(REGIONS.map((item) => item.id));

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

  if (
    typeof request.region !== "string" ||
    !VALID_REGIONS.has(request.region as Region)
  ) {
    return null;
  }

  return {
    interests: request.interests,
    budget: request.budget,
    duration: request.duration,
    region: request.region as Region,
  };
}
