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
  const hasValue = value.length > 0;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}{" "}
        <span className="font-normal text-slate-400">(optional)</span>
      </label>
      <div className="app-select-wrapper">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`app-select ${hasValue ? "app-select--with-clear" : ""}`}
        >
          <option value="">Select a country</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <div className="app-select-actions">
          {hasValue && (
            <button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onChange("");
              }}
              aria-label={`Clear ${label.toLowerCase()}`}
              className="app-select-clear"
            >
              ×
            </button>
          )}
          <span className="app-select-chevron" aria-hidden="true" />
        </div>
      </div>
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
