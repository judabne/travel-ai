"use client";

import { TRAVEL_STYLES } from "@/lib/constants";
import type { TravelStyle } from "@/types/travel";

interface TravelStyleSelectorProps {
  value: TravelStyle;
  onChange: (value: TravelStyle) => void;
}

export function TravelStyleSelector({
  value,
  onChange,
}: TravelStyleSelectorProps) {
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-slate-700">Travel Style</span>
      <div className="flex flex-wrap gap-4">
        {TRAVEL_STYLES.map(({ id, label }) => (
          <label
            key={id}
            className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
          >
            <input
              type="radio"
              name="travelStyle"
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
