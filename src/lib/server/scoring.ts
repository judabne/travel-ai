import type { Interest, InterestMatch } from "@/types/travel";

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function computeBudgetScore(
  estimatedCost: number,
  budget: number
): number {
  const ratio = estimatedCost / budget;

  if (ratio <= 0.75) return 95;
  if (ratio <= 0.9) return 88;
  if (ratio <= 1.0) return 80;
  if (ratio <= 1.15) return 65;
  return 45;
}

export function computeInterestScore(
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

export function computeTravelEase(
  visaScore: number,
  infrastructureScore: number
): number {
  return clampScore(visaScore * 0.6 + infrastructureScore * 0.4);
}

export function computeOverallScore(
  budgetScore: number,
  interestScore: number,
  travelEase: number,
  experienceScore: number
): number {
  return clampScore(
    budgetScore * 0.25 +
      interestScore * 0.35 +
      travelEase * 0.25 +
      experienceScore * 0.15
  );
}
