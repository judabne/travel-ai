import type { Interest, Region, TravelPreferences } from "@/types/travel";

export const STORAGE_KEY = "travel-ai-preferences";
export const RESULTS_STORAGE_KEY = "travel-ai-results";
export const RESULTS_HASH_KEY = "travel-ai-results-hash";

export const DEFAULT_PREFERENCES: TravelPreferences = {
  interests: [],
  budget: 2000,
  duration: 10,
  regions: [],
};

export const INTERESTS: { id: Interest; label: string }[] = [
  { id: "hiking", label: "Hiking" },
  { id: "food", label: "Food" },
  { id: "beaches", label: "Beaches" },
  { id: "culture", label: "Culture" },
  { id: "nightlife", label: "Nightlife" },
  { id: "nature", label: "Nature" },
  { id: "photography", label: "Photography" },
  { id: "wildlife", label: "Wildlife" },
  { id: "history", label: "History" },
  { id: "wellness", label: "Wellness" },
  { id: "shopping", label: "Shopping" },
  { id: "sports", label: "Sports" },
  { id: "cars", label: "Cars" },
];

export const REGIONS: { id: Region; label: string }[] = [
  { id: "europe", label: "Europe" },
  { id: "asia", label: "Asia" },
  { id: "americas", label: "Americas" },
  { id: "africa", label: "Africa" },
  { id: "oceania", label: "Oceania" },
];

export const BUDGET_MIN = 500;
export const BUDGET_MAX = 10000;
export const BUDGET_STEP = 100;

export const DURATION_MIN = 3;
export const DURATION_MAX = 30;

export const MAX_SELECTED_INTERESTS = 5;

export const PRIMARY_COLOR = "#2563eb";
export const SCORE_GOOD = "#16a34a";
export const SCORE_BAD = "#dc2626";
export const SCORE_NEUTRAL = "#64748b";
