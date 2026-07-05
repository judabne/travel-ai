"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScoreChart } from "@/components/charts/ScoreChart";
import { CountryDrawer } from "@/components/dashboard/CountryDrawer";
import { CountrySelector } from "@/components/dashboard/CountrySelector";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { InterestMatchBreakdown } from "@/components/dashboard/InterestMatchBreakdown";
import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/layout/SectionCard";
import { TwoColumnLayout } from "@/components/layout/TwoColumnLayout";
import { getTopInsight, mockCountryResults } from "@/lib/mockData";
import { useSimulatedLoad } from "@/hooks/useSimulatedLoad";
import { useStoredPreferences } from "@/hooks/useTravelForm";

const METRIC_CHARTS = [
  { metric: "budget" as const, title: "Budget Fit vs User Budget" },
  { metric: "interest" as const, title: "Interest Compatibility Score" },
  { metric: "travelEase" as const, title: "Travel Ease Score" },
  { metric: "weather" as const, title: "Experience Quality Score" },
];

export function DashboardLayout() {
  const router = useRouter();
  const isLoading = useSimulatedLoad();
  const preferences = useStoredPreferences();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const results = mockCountryResults;
  const insight = getTopInsight(results);
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
      {isLoading ? (
        <DashboardSkeleton />
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
