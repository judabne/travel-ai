import { INTERESTS } from "@/lib/constants";
import type { Interest } from "@/types/travel";

export function getInterestLabel(interest: Interest): string {
  return INTERESTS.find((item) => item.id === interest)?.label ?? interest;
}
