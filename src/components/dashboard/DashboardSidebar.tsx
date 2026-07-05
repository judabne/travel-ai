"use client";

import {
  formatInterests,
  formatRegion,
  formatTravelStyle,
} from "@/lib/preferenceHelpers";
import { InsightBox } from "@/components/dashboard/InsightBox";
import { SectionCard } from "@/components/layout/SectionCard";
import type { TravelPreferences } from "@/types/travel";

interface DashboardSidebarProps {
  preferences: TravelPreferences;
  insight: string;
  onRerun: () => void;
}

export function DashboardSidebar({
  preferences,
  insight,
  onRerun,
}: DashboardSidebarProps) {
  return (
    <div className="min-w-0 space-y-6 lg:sticky lg:top-6 lg:self-start">
      <SectionCard title="Filters">
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-slate-500">Budget</dt>
            <dd className="font-medium text-slate-900">
              ${preferences.budget.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Duration</dt>
            <dd className="font-medium text-slate-900">
              {preferences.duration} days
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Interests</dt>
            <dd className="font-medium text-slate-900">
              {formatInterests(preferences)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Travel Style</dt>
            <dd className="font-medium text-slate-900">
              {formatTravelStyle(preferences)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Region</dt>
            <dd className="font-medium text-slate-900">
              {formatRegion(preferences)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onRerun}
          className="mt-6 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Re-run Analysis
        </button>
      </SectionCard>

      <InsightBox insight={insight} />
    </div>
  );
}
