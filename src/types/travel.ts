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
  | "wellness"
  | "shopping"
  | "sports"
  | "cars";

export type Region =
  | "europe"
  | "asia"
  | "americas"
  | "africa"
  | "oceania";

export interface TravelPreferences {
  interests: Interest[];
  budget: number;
  duration: number;
  regions: Region[];
  currentCountry?: string;
  nationality?: string;
  prioritizeVisaFriendlyDestinations?: boolean;
}

export interface CountryScores {
  overall: number;
  budget: number;
  interest: number;
  travelEase: number;
  visitorSatisfaction: number;
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
  visaRequirements?: string;
}

export interface RecommendRequest {
  interests: Interest[];
  budget: number;
  duration: number;
  regions: Region[];
  currentCountry?: string;
  nationality?: string;
  prioritizeVisaFriendlyDestinations?: boolean;
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
