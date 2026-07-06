import {
  computeBudgetScore,
  computeInterestScore,
  computeOverallScore,
  computeTravelEase,
} from "@/lib/server/scoring";
import type { AiCountryRecommendation, AiRecommendResponse } from "@/types/ai";
import type { CountryResult, Interest, RecommendResponse } from "@/types/travel";

function mapAiCountry(
  country: AiCountryRecommendation,
  selectedInterests: Interest[],
  budget: number
): CountryResult {
  const budgetScore = computeBudgetScore(country.estimatedCost, budget);
  const interestMatch = country.interestMatch
    .filter((match) => selectedInterests.includes(match.interest))
    .sort((a, b) => b.score - a.score);
  const interest = computeInterestScore(interestMatch);
  const travelEase = computeTravelEase(
    country.visaScore,
    country.infrastructureScore
  );
  const experience = country.experienceScore;
  const overall = computeOverallScore(
    budgetScore,
    interest,
    travelEase,
    experience
  );

  return {
    country: country.country,
    flag: country.flag,
    scores: {
      overall,
      budget: budgetScore,
      interest,
      travelEase,
      experience,
    },
    summary: country.summary,
    estimatedCost: country.estimatedCost,
    interestMatch,
  };
}

export function mapAiResponseToRecommendResponse(
  response: AiRecommendResponse,
  selectedInterests: Interest[],
  budget: number
): RecommendResponse {
  const results = response.countries
    .map((country) => mapAiCountry(country, selectedInterests, budget))
    .sort((a, b) => b.scores.overall - a.scores.overall);

  return {
    results,
    insight: response.insight,
  };
}
