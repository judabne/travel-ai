import type { InterestMatch } from "@/types/travel";
import { getScoreColor } from "@/lib/chartHelpers";
import { getInterestLabel } from "@/lib/interestHelpers";

interface InterestMatchBarProps {
  match: InterestMatch;
}

export function InterestMatchBar({ match }: InterestMatchBarProps) {
  const label = getInterestLabel(match.interest);
  const color = getScoreColor(match.score);

  return (
    <div className="flex items-center gap-4">
      <span className="w-20 shrink-0 text-sm text-slate-600">{label}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full"
          style={{ width: `${match.score}%`, backgroundColor: color }}
        />
      </div>
      <span
        className="w-8 shrink-0 text-right text-sm font-medium"
        style={{ color }}
      >
        {match.score}
      </span>
    </div>
  );
}
