"use client";

import { SectionCard } from "@/components/layout/SectionCard";
import { BudgetSlider } from "@/components/form/BudgetSlider";
import { DurationSelector } from "@/components/form/DurationSelector";
import { InterestSelector } from "@/components/form/InterestSelector";
import { RegionSelector } from "@/components/form/RegionSelector";
import { TravelContextFields } from "@/components/form/TravelContextFields";
import { TravelFormSkeleton } from "@/components/form/TravelFormSkeleton";
import { DEFAULT_PREFERENCES } from "@/lib/constants";
import { getRecommendRequestKey } from "@/lib/recommendCache";
import { usePreferencesState, useTravelForm } from "@/hooks/useTravelForm";
import type { TravelPreferences } from "@/types/travel";

function TravelFormContent({
  initialPreferences,
}: {
  initialPreferences: TravelPreferences;
}) {
  const {
    preferences,
    toggleInterest,
    setBudget,
    setDuration,
    toggleRegion,
    setCurrentCountry,
    setNationality,
    setPrioritizeVisaFriendlyDestinations,
    submit,
    isNavigating,
    submitError,
  } = useTravelForm(initialPreferences);

  const canSubmit = preferences.interests.length > 0 && !isNavigating;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="space-y-4 md:space-y-8"
    >
      <SectionCard title="Interests">
        <InterestSelector
          selected={preferences.interests}
          onToggle={toggleInterest}
        />
      </SectionCard>

      <SectionCard>
        <BudgetSlider value={preferences.budget} onChange={setBudget} />
      </SectionCard>

      <SectionCard>
        <DurationSelector
          value={preferences.duration}
          onChange={setDuration}
        />
      </SectionCard>

      <SectionCard>
        <RegionSelector
          selected={preferences.regions}
          onToggle={toggleRegion}
        />
      </SectionCard>

      <TravelContextFields
        currentCountry={preferences.currentCountry}
        nationality={preferences.nationality}
        prioritizeVisaFriendlyDestinations={
          preferences.prioritizeVisaFriendlyDestinations
        }
        onCurrentCountryChange={setCurrentCountry}
        onNationalityChange={setNationality}
        onPrioritizeVisaFriendlyDestinationsChange={
          setPrioritizeVisaFriendlyDestinations
        }
      />

      <div className="flex flex-col items-center gap-3 pt-4">
        {submitError && (
          <p className="text-sm text-red-600">{submitError}</p>
        )}
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
        >
          Generate Matches
        </button>
      </div>
    </form>
  );
}

export function TravelForm() {
  const { isHydrated, preferences: storedPreferences, hasStored } =
    usePreferencesState();

  if (!isHydrated) {
    return <TravelFormSkeleton />;
  }

  const initialPreferences = hasStored
    ? storedPreferences
    : DEFAULT_PREFERENCES;

  return (
    <TravelFormContent
      key={
        hasStored
          ? getRecommendRequestKey(initialPreferences)
          : "default"
      }
      initialPreferences={initialPreferences}
    />
  );
}
