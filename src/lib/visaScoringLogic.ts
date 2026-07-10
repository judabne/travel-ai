export const REQUIREMENT_SCORES: Record<string, number> = {
  "visa free": 100,
  eta: 95,
  "e-visa": 90,
  "visa on arrival": 85,
  "visa required": 75,
  "no admission": 20,
};

export function scoreRequirement(
  requirement: string | undefined,
  duration: number
): number {
  if (!requirement) {
    return 50;
  }

  const trimmed = requirement.trim();

  if (/^-?\d+$/.test(trimmed)) {
    const days = Number(trimmed);

    if (days === -1 || days >= duration) {
      return 100;
    }

    return 85;
  }

  return REQUIREMENT_SCORES[trimmed.toLowerCase()] ?? 50;
}

export function formatVisaRequirementText(
  nationality: string,
  requirement: string | undefined
): string {
  if (!requirement) {
    return `Check embassy visa rules for ${nationality} nationals.`;
  }

  const trimmed = requirement.trim();
  const lower = trimmed.toLowerCase();

  if (/^-?\d+$/.test(trimmed)) {
    const days = Number(trimmed);

    if (days === -1) {
      return `Domestic travel for ${nationality} nationals.`;
    }

    return `Visa-free for ${nationality} nationals for up to ${days} days.`;
  }

  switch (lower) {
    case "visa free":
      return `Visa-free entry for ${nationality} nationals.`;
    case "eta":
      return `Electronic travel authorization required for ${nationality} nationals.`;
    case "e-visa":
      return `E-visa required before travel for ${nationality} nationals.`;
    case "visa on arrival":
      return `Visa on arrival for ${nationality} nationals.`;
    case "visa required":
      return `Visa required in advance for ${nationality} nationals.`;
    case "no admission":
      return `Entry restricted for ${nationality} nationals.`;
    default:
      return `Check embassy visa rules for ${nationality} nationals.`;
  }
}

export function averageVisaScoreForDestination(
  pairLookup: Record<string, string>,
  destination: string,
  duration: number
): number {
  const scores: number[] = [];

  for (const [key, requirement] of Object.entries(pairLookup)) {
    const destinationKey = key.split("|")[1];

    if (destinationKey === destination) {
      scores.push(scoreRequirement(requirement, duration));
    }
  }

  if (scores.length === 0) {
    return 50;
  }

  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}
