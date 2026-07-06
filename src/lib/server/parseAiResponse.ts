import { INTERESTS } from "@/lib/constants";
import type { AiCountryRecommendation, AiRecommendResponse } from "@/types/ai";
import type { Interest, RecommendRequest } from "@/types/travel";

const VALID_INTERESTS = new Set<Interest>(INTERESTS.map((item) => item.id));
const EXPECTED_COUNTRY_COUNT = 4;

function isValidScore(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= 100
  );
}

function parseInterestMatch(
  value: unknown,
  selectedInterests: Interest[]
): AiCountryRecommendation["interestMatch"] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const selectedSet = new Set(selectedInterests);
  const matches: AiCountryRecommendation["interestMatch"] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") {
      return null;
    }

    const match = item as { interest?: unknown; score?: unknown };

    if (
      typeof match.interest !== "string" ||
      !VALID_INTERESTS.has(match.interest as Interest) ||
      !selectedSet.has(match.interest as Interest) ||
      !isValidScore(match.score)
    ) {
      return null;
    }

    matches.push({
      interest: match.interest as Interest,
      score: match.score,
    });
  }

  if (matches.length !== selectedInterests.length) {
    return null;
  }

  const matchedInterests = new Set(matches.map((match) => match.interest));
  if (matchedInterests.size !== selectedInterests.length) {
    return null;
  }

  return matches;
}

function parseAiCountry(
  value: unknown,
  selectedInterests: Interest[]
): AiCountryRecommendation | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const country = value as AiCountryRecommendation;

  if (
    typeof country.country !== "string" ||
    typeof country.flag !== "string" ||
    typeof country.summary !== "string" ||
    typeof country.estimatedCost !== "number" ||
    !Number.isFinite(country.estimatedCost) ||
    !isValidScore(country.visitorSatisfactionScore) ||
    !isValidScore(country.visaScore) ||
    !isValidScore(country.infrastructureScore)
  ) {
    return null;
  }

  const interestMatch = parseInterestMatch(country.interestMatch, selectedInterests);
  if (!interestMatch) {
    return null;
  }

  return {
    country: country.country,
    flag: country.flag,
    summary: country.summary,
    estimatedCost: country.estimatedCost,
    visitorSatisfactionScore: country.visitorSatisfactionScore,
    visaScore: country.visaScore,
    infrastructureScore: country.infrastructureScore,
    interestMatch,
  };
}

export function parseAiRecommendResponse(
  body: unknown,
  request: RecommendRequest
): AiRecommendResponse | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const response = body as AiRecommendResponse;

  if (typeof response.insight !== "string" || !Array.isArray(response.countries)) {
    return null;
  }

  if (response.countries.length !== EXPECTED_COUNTRY_COUNT) {
    return null;
  }

  const countries: AiCountryRecommendation[] = [];

  for (const country of response.countries) {
    const parsed = parseAiCountry(country, request.interests);
    if (!parsed) {
      return null;
    }
    countries.push(parsed);
  }

  return {
    insight: response.insight,
    countries,
  };
}
