"use client";

import { REGIONS } from "@/lib/constants";
import type { Region } from "@/types/travel";

interface RegionSelectorProps {
  value: Region;
  onChange: (value: Region) => void;
}

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
  return (
    <div className="space-y-3">
      <label htmlFor="region" className="text-sm font-medium text-slate-700">
        Region
      </label>
      <select
        id="region"
        value={value}
        onChange={(event) => onChange(event.target.value as Region)}
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {REGIONS.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
