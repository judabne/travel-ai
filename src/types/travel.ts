export type Interest =
  | "hiking"
  | "food"
  | "beaches"
  | "culture"
  | "nightlife"
  | "nature"
  | "photography"
  | "wildlife"
  | "history"
  | "adventure"
  | "wellness"
  | "shopping";

export type TravelStyle = "budget" | "balanced" | "comfort" | "luxury";

export type Region =
  | "any"
  | "europe"
  | "asia"
  | "americas"
  | "africa"
  | "oceania";

export interface TravelPreferences {
  interests: Interest[];
  budget: number;
  duration: number;
  travelStyle: TravelStyle;
  region: Region;
}

export interface CountryScores {
  overall: number;
  budget: number;
  interest: number;
  travelEase: number;
  experience: number;
}

export interface InterestMatch {
  interest: Interest;
  score: number;
}

export interface CountryResult {
  country: string;
  flag: string;
  scores: CountryScores;
  summary: string;
  estimatedCost: number;
  interestMatch: InterestMatch[];
}

export interface RecommendRequest {
  interests: Interest[];
  budget: number;
  duration: number;
  region: Region;
}

export interface RecommendResponse {
  results: CountryResult[];
  insight: string;
}

export interface ScoreChartData {
  labels: string[];
  values: number[];
}

export type ScoreMetric = keyof CountryScores;
