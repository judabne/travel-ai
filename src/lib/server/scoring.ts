function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function computeBudgetScore(
  estimatedCost: number,
  budget: number
): number {
  const ratio = estimatedCost / budget;

  if (ratio <= 1.0) return 100;
  if (ratio <= 1.1) return 90;
  if (ratio <= 1.2) return 80;
  if (ratio <= 1.3) return 60;
  if (ratio <= 1.4) return 50;
  return 45;
}

export function computeInterestScore(
  interestMatch: { score: number }[]
): number {
  if (interestMatch.length === 0) {
    return 0;
  }

  const total = interestMatch.reduce((sum, match) => sum + match.score, 0);
  return clampScore(total / interestMatch.length);
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
  visitorSatisfactionScore: number
): number {
  return clampScore(
    budgetScore * 0.25 +
      interestScore * 0.35 +
      travelEase * 0.25 +
      visitorSatisfactionScore * 0.15
  );
}
