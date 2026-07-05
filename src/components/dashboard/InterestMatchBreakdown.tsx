import { InterestMatchCard } from "@/components/dashboard/InterestMatchCard";
import { SectionCard } from "@/components/layout/SectionCard";
import type { CountryResult } from "@/types/travel";

interface InterestMatchBreakdownProps {
  results: CountryResult[];
}

export function InterestMatchBreakdown({ results }: InterestMatchBreakdownProps) {
  return (
    <SectionCard>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Interest Match Breakdown
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          See how each destination aligns with your interests
        </p>
      </div>

      <div className="grid min-w-0 gap-6 md:grid-cols-2">
        {results.map((country) => (
          <InterestMatchCard key={country.country} country={country} />
        ))}
      </div>
    </SectionCard>
  );
}
