"use client";

import { CountryCard } from "@/components/dashboard/CountryCard";
import type { CountryResult } from "@/types/travel";

interface CountrySelectorProps {
  results: CountryResult[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function CountrySelector({
  results,
  selectedIndex,
  onSelect,
}: CountrySelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {results.map((country, index) => (
        <CountryCard
          key={country.country}
          country={country}
          isSelected={selectedIndex === index}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
