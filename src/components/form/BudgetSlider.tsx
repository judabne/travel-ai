"use client";

import { BUDGET_MAX, BUDGET_MIN, BUDGET_STEP } from "@/lib/constants";

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Total budget</span>
        <span className="text-lg font-semibold text-blue-600">
          ${value.toLocaleString()}
        </span>
      </div>
      <div className="space-y-3">
        <input
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>${BUDGET_MIN.toLocaleString()}</span>
          <span>${BUDGET_MAX.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
