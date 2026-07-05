import { countryProfiles } from "@/lib/server/mockData";
import type {
  CountryResult,
  Interest,
  InterestMatch,
  RecommendRequest,
  RecommendResponse,
  Region,
} from "@/types/travel";

export type { RecommendRequest, RecommendResponse };

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function computeBudgetScore(estimatedCost: number, budget: number): number {
  const ratio = estimatedCost / budget;

  if (ratio <= 0.75) return 95;
  if (ratio <= 0.9) return 88;
  if (ratio <= 1.0) return 80;
  if (ratio <= 1.15) return 65;
  return 45;
}

function computeInterestScore(
  interestMatch: InterestMatch[],
  selectedInterests: Interest[]
): number {
  if (selectedInterests.length === 0) {
    return 0;
  }

  const scores = interestMatch
    .filter((match) => selectedInterests.includes(match.interest))
    .map((match) => match.score);

  if (scores.length === 0) {
    return 50;
  }

  return Math.round(
    scores.reduce((total, score) => total + score, 0) / scores.length
  );
}

function adjustTravelEase(baseScore: number, duration: number): number {
  if (duration <= 7) {
    return clampScore(baseScore - 5);
  }

  if (duration >= 14) {
    return clampScore(baseScore + 3);
  }

  return baseScore;
}

function filterByRegion(
  profiles: typeof countryProfiles,
  region: Region
): typeof countryProfiles {
  if (region === "any") {
    return profiles;
  }

  return profiles.filter((profile) => profile.regions.includes(region));
}

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
  const travelEase = adjustTravelEase(
    profile.baseTravelEase,
    preferences.duration
  );
  const weather = profile.baseExperience;
  const overall = clampScore(
    (budget + interest + travelEase + weather) / 4
  );

  return {
    country: profile.country,
    flag: profile.flag,
    scores: {
      overall,
      budget,
      interest,
      travelEase,
      weather,
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
  const filtered = filterByRegion(countryProfiles, preferences.region);
  const results = filtered
    .map((profile) => scoreCountry(profile, preferences))
    .sort((a, b) => b.scores.overall - a.scores.overall);

  return {
    results,
    insight: getTopInsight(results),
  };
}
