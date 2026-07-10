"use client";

import { COUNTRIES } from "@/lib/countries";
import { SectionCard } from "@/components/layout/SectionCard";

interface TravelContextFieldsProps {
  currentCountry?: string;
  nationality?: string;
  prioritizeVisaFriendlyDestinations?: boolean;
  onCurrentCountryChange: (value: string) => void;
  onNationalityChange: (value: string) => void;
  onPrioritizeVisaFriendlyDestinationsChange: (value: boolean) => void;
}

function CountrySelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}{" "}
        <span className="font-normal text-slate-400">(optional)</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="">Select a country</option>
        {COUNTRIES.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
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
        <CountrySelect
          id="current-country"
          label="Current country"
          value={currentCountry ?? ""}
          onChange={onCurrentCountryChange}
        />
      </SectionCard>

      <SectionCard>
        <CountrySelect
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
