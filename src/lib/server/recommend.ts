import { countryProfiles } from "@/lib/server/mockData";
import {
  computeBudgetScore,
  computeInterestScore,
  computeOverallScore,
  computeTravelEase,
} from "@/lib/server/scoring";
import type {
  CountryResult,
  Interest,
  InterestMatch,
  RecommendRequest,
  RecommendResponse,
} from "@/types/travel";

export type { RecommendRequest, RecommendResponse };

function buildInterestMatch(
  interestMatch: InterestMatch[],
  selectedInterests: Interest[]
): InterestMatch[] {
  return interestMatch
    .filter((match) => selectedInterests.includes(match.interest))
    .sort((a, b) => b.score - a.score);
}

function scoreCountry(
  profile: (typeof countryProfiles)[number],
  preferences: RecommendRequest
): CountryResult {
  const budget = computeBudgetScore(profile.estimatedCost, preferences.budget);
  const interest = computeInterestScore(
    profile.interestMatch,
    preferences.interests
  );
  const travelEase = computeTravelEase(
    profile.visaScore,
    profile.infrastructureScore
  );
  const experience = profile.experienceScore;
  const overall = computeOverallScore(budget, interest, travelEase, experience);

  return {
    country: profile.country,
    flag: profile.flag,
    scores: {
      overall,
      budget,
      interest,
      travelEase,
      experience,
    },
    summary: profile.summary,
    estimatedCost: profile.estimatedCost,
    interestMatch: buildInterestMatch(
      profile.interestMatch,
      preferences.interests
    ),
  };
}

export function getTopInsight(results: CountryResult[]): string {
  if (results.length === 0) {
    return "No matches found. Try adjusting your filters.";
  }

  const top = [...results].sort(
    (a, b) => b.scores.overall - a.scores.overall
  )[0];

  return `${top.country} offers the best overall balance of cost and experience for your trip.`;
}

export function getRecommendations(
  preferences: RecommendRequest
): RecommendResponse {
  const results = countryProfiles
    .map((profile) => scoreCountry(profile, preferences))
    .sort((a, b) => b.scores.overall - a.scores.overall);

  return {
    results,
    insight: getTopInsight(results),
  };
}
