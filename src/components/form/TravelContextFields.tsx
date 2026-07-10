"use client";

import { CountryCombobox } from "@/components/form/CountryCombobox";
import { SectionCard } from "@/components/layout/SectionCard";

interface TravelContextFieldsProps {
  currentCountry?: string;
  nationality?: string;
  prioritizeVisaFriendlyDestinations?: boolean;
  onCurrentCountryChange: (value: string) => void;
  onNationalityChange: (value: string) => void;
  onPrioritizeVisaFriendlyDestinationsChange: (value: boolean) => void;
}

export function TravelContextFields({
  currentCountry,
  nationality,
  prioritizeVisaFriendlyDestinations,
  onCurrentCountryChange,
  onNationalityChange,
  onPrioritizeVisaFriendlyDestinationsChange,
}: TravelContextFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SectionCard>
        <CountryCombobox
          id="current-country"
          label="Current country"
          value={currentCountry ?? ""}
          onChange={onCurrentCountryChange}
        />
      </SectionCard>

      <SectionCard>
        <CountryCombobox
          id="nationality"
          label="Nationality"
          value={nationality ?? ""}
          onChange={onNationalityChange}
        />
        <label
          htmlFor="prioritize-visa-friendly"
          className={`mt-4 flex items-start gap-2.5 text-sm ${
            nationality ? "text-slate-700" : "text-slate-400"
          }`}
        >
          <input
            id="prioritize-visa-friendly"
            type="checkbox"
            checked={prioritizeVisaFriendlyDestinations ?? false}
            disabled={!nationality}
            onChange={(event) =>
              onPrioritizeVisaFriendlyDestinationsChange(event.target.checked)
            }
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
          Prioritize visa-friendly destinations
        </label>
      </SectionCard>
    </div>
  );
}
