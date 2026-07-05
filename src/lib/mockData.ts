import type { CountryResult } from "@/types/travel";

export const mockCountryResults: CountryResult[] = [
  {
    country: "Georgia",
    flag: "🇬🇪",
    scores: {
      overall: 92,
      budget: 95,
      interest: 90,
      travelEase: 85,
      weather: 78,
    },
    summary:
      "Georgia is ideal for budget travelers who prioritize hiking and culture. Strong value for short trips.",
    estimatedCost: 1650,
    interestMatch: [
      { interest: "hiking", score: 95 },
      { interest: "food", score: 82 },
      { interest: "culture", score: 78 },
      { interest: "nature", score: 88 },
      { interest: "beaches", score: 55 },
      { interest: "nightlife", score: 60 },
      { interest: "photography", score: 80 },
      { interest: "wildlife", score: 72 },
      { interest: "history", score: 85 },
      { interest: "adventure", score: 90 },
      { interest: "wellness", score: 58 },
      { interest: "shopping", score: 50 },
    ],
  },
  {
    country: "Turkey",
    flag: "🇹🇷",
    scores: {
      overall: 88,
      budget: 90,
      interest: 85,
      travelEase: 82,
      weather: 80,
    },
    summary:
      "Turkey blends rich history with affordable dining and coastal escapes. Great for mixed interest trips.",
    estimatedCost: 1780,
    interestMatch: [
      { interest: "food", score: 97 },
      { interest: "culture", score: 88 },
      { interest: "hiking", score: 75 },
      { interest: "beaches", score: 85 },
      { interest: "nightlife", score: 70 },
      { interest: "nature", score: 72 },
      { interest: "photography", score: 84 },
      { interest: "wildlife", score: 68 },
      { interest: "history", score: 96 },
      { interest: "adventure", score: 78 },
      { interest: "wellness", score: 74 },
      { interest: "shopping", score: 82 },
    ],
  },
  {
    country: "Portugal",
    flag: "🇵🇹",
    scores: {
      overall: 85,
      budget: 72,
      interest: 88,
      travelEase: 90,
      weather: 86,
    },
    summary:
      "Portugal excels in food, culture, and coastal scenery. Higher cost but excellent travel infrastructure.",
    estimatedCost: 2450,
    interestMatch: [
      { interest: "beaches", score: 95 },
      { interest: "culture", score: 92 },
      { interest: "food", score: 90 },
      { interest: "nightlife", score: 78 },
      { interest: "nature", score: 70 },
      { interest: "hiking", score: 50 },
      { interest: "photography", score: 91 },
      { interest: "wildlife", score: 62 },
      { interest: "history", score: 89 },
      { interest: "adventure", score: 68 },
      { interest: "wellness", score: 83 },
      { interest: "shopping", score: 76 },
    ],
  },
  {
    country: "Vietnam",
    flag: "🇻🇳",
    scores: {
      overall: 83,
      budget: 92,
      interest: 82,
      travelEase: 70,
      weather: 75,
    },
    summary:
      "Vietnam delivers exceptional value for food and nature lovers. Longer flights but low daily costs.",
    estimatedCost: 1420,
    interestMatch: [
      { interest: "food", score: 94 },
      { interest: "nature", score: 90 },
      { interest: "culture", score: 85 },
      { interest: "beaches", score: 80 },
      { interest: "hiking", score: 72 },
      { interest: "nightlife", score: 65 },
      { interest: "photography", score: 88 },
      { interest: "wildlife", score: 86 },
      { interest: "history", score: 82 },
      { interest: "adventure", score: 87 },
      { interest: "wellness", score: 70 },
      { interest: "shopping", score: 68 },
    ],
  },
];

export function getTopInsight(results: CountryResult[]): string {
  if (results.length === 0) {
    return "No matches found. Try adjusting your filters.";
  }

  const top = [...results].sort((a, b) => b.scores.overall - a.scores.overall)[0];
  return `${top.country} offers the best overall balance of cost and experience for your trip.`;
}
