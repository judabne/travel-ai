"use client";

import { INTERESTS, MAX_SELECTED_INTERESTS } from "@/lib/constants";
import type { Interest } from "@/types/travel";

interface InterestSelectorProps {
  selected: Interest[];
  onToggle: (interest: Interest) => void;
}

interface InterestPillProps {
  label: string;
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

function InterestPill({
  label,
  isSelected,
  disabled = false,
  onClick,
}: InterestPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isSelected}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        isSelected
          ? "border-blue-600 bg-blue-600 text-white"
          : disabled
            ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

export function InterestSelector({ selected, onToggle }: InterestSelectorProps) {
  const isAtLimit = selected.length >= MAX_SELECTED_INTERESTS;

  const selectedInterests = selected
    .map((id) => INTERESTS.find((interest) => interest.id === id))
    .filter((interest) => interest !== undefined);

  const unselectedInterests = INTERESTS.filter(
    (interest) => !selected.includes(interest.id)
  );

  return (
    <div className="grid grid-rows-[auto_auto] gap-4">
      <div className="flex min-h-[42px] flex-wrap items-center gap-3">
        {selectedInterests.map(({ id, label }) => (
          <InterestPill
            key={id}
            label={label}
            isSelected
            onClick={() => onToggle(id)}
          />
        ))}
        {isAtLimit && (
          <span className="text-xs text-slate-400">
            Max {MAX_SELECTED_INTERESTS} selected
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {unselectedInterests.map(({ id, label }) => (
          <InterestPill
            key={id}
            label={label}
            isSelected={false}
            disabled={isAtLimit}
            onClick={() => onToggle(id)}
          />
        ))}
      </div>
    </div>
  );
}
