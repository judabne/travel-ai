import {
  computeBudgetScore,
  computeInterestScore,
  computeOverallScore,
  computeTravelEase,
} from "@/lib/server/scoring";
import { getVisaAssessment } from "@/lib/server/visaScoring";
import type { AiCountryRecommendation, AiRecommendResponse } from "@/types/ai";
import type { CountryResult, Interest, RecommendResponse } from "@/types/travel";

function mapAiCountry(
  country: AiCountryRecommendation,
  selectedInterests: Interest[],
  budget: number,
  duration: number,
  nationality?: string
): CountryResult {
  const budgetScore = computeBudgetScore(country.estimatedCost, budget);
  const interestMatch = country.interestMatch
    .filter((match) => selectedInterests.includes(match.interest))
    .sort((a, b) => b.score - a.score);
  const interest = computeInterestScore(interestMatch);
  const { visaScore, visaRequirements } = getVisaAssessment(
    country.country,
    duration,
    nationality
  );
  const travelEase = computeTravelEase(
    visaScore,
    country.infrastructureScore
  );
  const visitorSatisfaction = country.visitorSatisfactionScore;
  const overall = computeOverallScore(
    budgetScore,
    interest,
    travelEase,
    visitorSatisfaction
  );

  return {
    country: country.country,
    flag: country.flag,
    scores: {
      overall,
      budget: budgetScore,
      interest,
      travelEase,
      visitorSatisfaction,
    },
    summary: country.summary,
    estimatedCost: country.estimatedCost,
    interestMatch,
    ...(visaRequirements ? { visaRequirements } : {}),
  };
}

export function mapAiResponseToRecommendResponse(
  response: AiRecommendResponse,
  selectedInterests: Interest[],
  budget: number,
  duration: number,
  nationality?: string
): RecommendResponse {
  const results = response.countries
    .map((country) =>
      mapAiCountry(country, selectedInterests, budget, duration, nationality)
    )
    .sort((a, b) => b.scores.overall - a.scores.overall);

  return {
    results,
    insight: response.insight,
  };
}
