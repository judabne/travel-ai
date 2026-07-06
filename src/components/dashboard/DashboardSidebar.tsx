"use client";

import {
  formatBudget,
  formatDuration,
  formatInterests,
  formatRegion,
} from "@/lib/preferenceHelpers";
import { InsightBox } from "@/components/dashboard/InsightBox";
import { SectionCard } from "@/components/layout/SectionCard";
import type { TravelPreferences } from "@/types/travel";

interface DashboardSidebarProps {
  preferences: TravelPreferences;
  insight: string;
  isEmpty: boolean;
  onTweakParameters: () => void;
}

export function DashboardSidebar({
  preferences,
  insight,
  isEmpty,
  onTweakParameters,
}: DashboardSidebarProps) {
  return (
    <div className="min-w-0 space-y-6 lg:sticky lg:top-6 lg:self-start">
      <SectionCard title="Filters">
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-slate-500">Budget</dt>
            <dd className="font-medium text-slate-900">
              {formatBudget(preferences, isEmpty)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Duration</dt>
            <dd className="font-medium text-slate-900">
              {formatDuration(preferences, isEmpty)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Interests</dt>
            <dd className="font-medium text-slate-900">
              {formatInterests(preferences, isEmpty)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Regions</dt>
            <dd className="font-medium text-slate-900">
              {formatRegion(preferences, isEmpty)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onTweakParameters}
          className="mt-6 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Tweak Parameters
        </button>
      </SectionCard>

      {!isEmpty && insight && <InsightBox insight={insight} />}
    </div>
  );
}
