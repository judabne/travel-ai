import { BREAKDOWN_INTERESTS, INTERESTS } from "@/lib/constants";
import type { Interest, InterestMatch } from "@/types/travel";

export function getInterestLabel(interest: Interest): string {
  return INTERESTS.find((item) => item.id === interest)?.label ?? interest;
}

export function getFixedInterestMatches(
  interestMatch: InterestMatch[]
): InterestMatch[] {
  return interestMatch
    .filter((item) => BREAKDOWN_INTERESTS.includes(item.interest))
    .sort((a, b) => b.score - a.score);
}
