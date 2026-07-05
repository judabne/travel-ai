"use client";

import type { CountryResult } from "@/types/travel";

interface CountryCardProps {
  country: CountryResult;
  isSelected: boolean;
  onClick: () => void;
}

export function CountryCard({ country, isSelected, onClick }: CountryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
        isSelected
          ? "border-blue-600 bg-blue-50 text-blue-700"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span className="text-lg">{country.flag}</span>
      {country.country}
    </button>
  );
}
