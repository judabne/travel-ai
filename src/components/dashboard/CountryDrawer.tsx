"use client";

import { getScoreColor } from "@/lib/chartHelpers";
import type { CountryResult } from "@/types/travel";

interface CountryDrawerProps {
  country: CountryResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CountryDrawer({ country, isOpen, onClose }: CountryDrawerProps) {
  if (!isOpen || !country) {
    return null;
  }

  const scoreItems = [
    { label: "Budget", value: country.scores.budget },
    { label: "Interests", value: country.scores.interest },
    { label: "Travel Ease", value: country.scores.travelEase },
    { label: "Visitor Satisfaction", value: country.scores.visitorSatisfaction },
  ];
  const overallScore = country.scores.overall;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-xl"
        role="dialog"
        aria-label={`${country.country} details`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            {country.flag} {country.country} — Detailed Breakdown
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="hidden shrink-0 rounded-lg px-3 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 md:inline-flex"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold uppercase tracking-wide text-slate-500">
                Score
              </h3>
              <span
                className="text-base font-semibold"
                style={{ color: getScoreColor(overallScore) }}
              >
                {overallScore}/100
              </span>
            </div>
            <ul className="space-y-3">
              {scoreItems.map(({ label, value }) => (
                <li
                  key={label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-600">{label}</span>
                  <span
                    className="font-semibold"
                    style={{ color: getScoreColor(value) }}
                  >
                    {value}/100
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="mb-3 text-base font-semibold uppercase tracking-wide text-slate-500">
              AI Summary
            </h3>
            <p className="text-sm leading-relaxed text-slate-700">
              {country.summary}
            </p>
          </section>

          <p className="text-xs text-slate-400">
            Estimated trip cost: ${country.estimatedCost.toLocaleString()}
          </p>
        </div>

        <div className="border-t border-slate-200 px-6 py-5 md:hidden">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </aside>
    </>
  );
}
