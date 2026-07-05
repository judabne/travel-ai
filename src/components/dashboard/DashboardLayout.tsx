"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScoreChart } from "@/components/charts/ScoreChart";
import { CountryDrawer } from "@/components/dashboard/CountryDrawer";
import { CountrySelector } from "@/components/dashboard/CountrySelector";
import { DashboardEmptyState } from "@/components/dashboard/DashboardEmptyState";
import { DashboardErrorState } from "@/components/dashboard/DashboardErrorState";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { InterestMatchBreakdown } from "@/components/dashboard/InterestMatchBreakdown";
import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/layout/SectionCard";
import { TwoColumnLayout } from "@/components/layout/TwoColumnLayout";
import { useRecommendations } from "@/hooks/useRecommendations";
import { usePreferencesState } from "@/hooks/useTravelForm";

const METRIC_CHARTS = [
  { metric: "budget" as const, title: "Budget Fit vs User Budget" },
  { metric: "interest" as const, title: "Interest Compatibility Score" },
  { metric: "travelEase" as const, title: "Travel Ease Score" },
  { metric: "experience" as const, title: "Experience Quality Score" },
];

export function DashboardLayout() {
  const router = useRouter();
  const { isHydrated, preferences, hasStored, hasValidSelections } =
    usePreferencesState();
  const { results, insight, isLoading, error, retry } = useRecommendations();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showEmptyState = isHydrated && !hasValidSelections;
  const isEmptySidebar = !hasStored;

  const selectedCountry =
    selectedIndex !== null ? results[selectedIndex] : null;

  const handleCountryClick = (index: number) => {
    setSelectedIndex(index);
    setIsDrawerOpen(true);
  };

  const handleRerun = () => {
    router.push("/");
  };

  return (
    <AppShell
      title="Your Travel Matches Dashboard"
      subtitle="Compare destinations across budget, interests, and travel ease"
    >
      {!isHydrated ? (
        <DashboardSkeleton />
      ) : showEmptyState ? (
        <TwoColumnLayout
          sidebar={
            <DashboardSidebar
              preferences={preferences}
              insight=""
              isEmpty={isEmptySidebar}
              onRerun={handleRerun}
            />
          }
        >
          <DashboardEmptyState />
        </TwoColumnLayout>
      ) : isLoading ? (
        <DashboardSkeleton />
      ) : error ? (
        <TwoColumnLayout
          sidebar={
            <DashboardSidebar
              preferences={preferences}
              insight=""
              isEmpty={false}
              onRerun={handleRerun}
            />
          }
        >
          <DashboardErrorState message={error} onRetry={retry} />
        </TwoColumnLayout>
      ) : (
        <>
          <SectionCard title="Selected Countries" className="mb-8">
            <CountrySelector
              results={results}
              selectedIndex={selectedIndex}
              onSelect={handleCountryClick}
            />
          </SectionCard>

          <TwoColumnLayout
            sidebar={
              <DashboardSidebar
                preferences={preferences}
                insight={insight}
                isEmpty={false}
                onRerun={handleRerun}
              />
            }
          >
            <div className="space-y-6">
              <SectionCard>
                <ScoreChart
                  results={results}
                  metric="overall"
                  title="Overall Match Score"
                  highlight
                  onCountryClick={handleCountryClick}
                />
              </SectionCard>

              <div className="grid min-w-0 gap-6 md:grid-cols-2">
                {METRIC_CHARTS.map(({ metric, title }) => (
                  <SectionCard key={metric} className="min-w-0">
                    <ScoreChart
                      results={results}
                      metric={metric}
                      title={title}
                      onCountryClick={handleCountryClick}
                    />
                  </SectionCard>
                ))}
              </div>

              <InterestMatchBreakdown results={results} />
            </div>
          </TwoColumnLayout>

          <CountryDrawer
            country={selectedCountry}
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />
        </>
      )}
    </AppShell>
  );
}
