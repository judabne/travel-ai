"use client";

import { SectionCard } from "@/components/layout/SectionCard";
import { BudgetSlider } from "@/components/form/BudgetSlider";
import { DurationSelector } from "@/components/form/DurationSelector";
import { InterestSelector } from "@/components/form/InterestSelector";
import { RegionSelector } from "@/components/form/RegionSelector";
import { TravelStyleSelector } from "@/components/form/TravelStyleSelector";
import { useTravelForm } from "@/hooks/useTravelForm";

export function TravelForm() {
  const {
    preferences,
    toggleInterest,
    setBudget,
    setDuration,
    setTravelStyle,
    setRegion,
    submit,
    isNavigating,
    submitError,
  } = useTravelForm();

  const canSubmit = preferences.interests.length > 0 && !isNavigating;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="space-y-8"
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
        <TravelStyleSelector
          value={preferences.travelStyle}
          onChange={setTravelStyle}
        />
      </SectionCard>

      <SectionCard>
        <RegionSelector value={preferences.region} onChange={setRegion} />
      </SectionCard>

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
