"use client";

import { REGIONS } from "@/lib/constants";
import type { Region } from "@/types/travel";

interface RegionSelectorProps {
  selected: Region[];
  onToggle: (region: Region) => void;
}

export function RegionSelector({ selected, onToggle }: RegionSelectorProps) {
  return (
    <div>
      <span className="mb-4 block text-sm font-medium text-slate-700">
        Region <span className="font-normal text-slate-400">(optional)</span>
      </span>
      <div className="flex flex-wrap gap-3">
        {REGIONS.map(({ id, label }) => {
          const isSelected = selected.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggle(id)}
              aria-pressed={isSelected}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
