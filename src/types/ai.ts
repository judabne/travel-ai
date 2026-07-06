import type { Interest } from "@/types/travel";

export interface AiInterestMatch {
  interest: Interest;
  score: number;
}

export interface AiCountryRecommendation {
  country: string;
  flag: string;
  summary: string;
  estimatedCost: number;
  experienceScore: number;
  visaScore: number;
  infrastructureScore: number;
  interestMatch: AiInterestMatch[];
}

export interface AiRecommendResponse {
  insight: string;
  countries: AiCountryRecommendation[];
}
