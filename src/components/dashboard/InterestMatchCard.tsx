import { InterestMatchBar } from "@/components/dashboard/InterestMatchBar";
import type { CountryResult } from "@/types/travel";

interface InterestMatchCardProps {
  country: CountryResult;
}

export function InterestMatchCard({ country }: InterestMatchCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-base font-semibold text-slate-900">
        {country.flag} {country.country}
      </h3>
      <div className="space-y-4">
        {country.interestMatch.map((match) => (
          <InterestMatchBar key={match.interest} match={match} />
        ))}
      </div>
    </div>
  );
}
