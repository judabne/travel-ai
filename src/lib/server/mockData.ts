import type { InterestMatch } from "@/types/travel";

export interface CountryProfile {
  country: string;
  flag: string;
  estimatedCost: number;
  summary: string;
  visaScore: number;
  infrastructureScore: number;
  experienceScore: number;
  interestMatch: InterestMatch[];
}

export const countryProfiles: CountryProfile[] = [
  {
    country: "Georgia",
    flag: "🇬🇪",
    estimatedCost: 1650,
    summary:
      "Georgia is ideal for budget travelers who prioritize hiking and culture. Strong value for short trips.",
    visaScore: 88,
    infrastructureScore: 80,
    experienceScore: 78,
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
      { interest: "sports", score: 90 },
      { interest: "wellness", score: 58 },
      { interest: "shopping", score: 50 },
    ],
  },
  {
    country: "Turkey",
    flag: "🇹🇷",
    estimatedCost: 1780,
    summary:
      "Turkey blends rich history with affordable dining and coastal escapes. Great for mixed interest trips.",
    visaScore: 80,
    infrastructureScore: 85,
    experienceScore: 80,
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
      { interest: "sports", score: 78 },
      { interest: "wellness", score: 74 },
      { interest: "shopping", score: 82 },
    ],
  },
  {
    country: "Portugal",
    flag: "🇵🇹",
    estimatedCost: 2450,
    summary:
      "Portugal excels in food, culture, and coastal scenery. Higher cost but excellent travel infrastructure.",
    visaScore: 92,
    infrastructureScore: 87,
    experienceScore: 86,
    interestMatch: [
      { interest: "beaches", score: 95 },
      { interest: "culture", score: 92 },
      { interest: "food", score: 90 },
      { interest: "nightlife", score: 78 },
      { interest: "nature", score: 70 },
      { interest: "hiking", score: 65 },
      { interest: "photography", score: 91 },
      { interest: "wildlife", score: 62 },
      { interest: "history", score: 89 },
      { interest: "sports", score: 68 },
      { interest: "wellness", score: 83 },
      { interest: "shopping", score: 76 },
    ],
  },
  {
    country: "Vietnam",
    flag: "🇻🇳",
    estimatedCost: 1420,
    summary:
      "Vietnam delivers exceptional value for food and nature lovers. Longer flights but low daily costs.",
    visaScore: 65,
    infrastructureScore: 78,
    experienceScore: 75,
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
      { interest: "sports", score: 87 },
      { interest: "wellness", score: 70 },
      { interest: "shopping", score: 68 },
    ],
  },
];
