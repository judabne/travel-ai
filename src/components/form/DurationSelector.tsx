"use client";

import { DURATION_MAX, DURATION_MIN } from "@/lib/constants";

interface DurationSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function DurationSelector({ value, onChange }: DurationSelectorProps) {
  const decrement = () => onChange(Math.max(DURATION_MIN, value - 1));
  const increment = () => onChange(Math.min(DURATION_MAX, value + 1));

  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-slate-700">Duration</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= DURATION_MIN}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Decrease duration"
        >
          −
        </button>
        <span className="min-w-[80px] text-center text-lg font-semibold text-slate-900">
          {value} days
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={value >= DURATION_MAX}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Increase duration"
        >
          +
        </button>
      </div>
    </div>
  );
}
