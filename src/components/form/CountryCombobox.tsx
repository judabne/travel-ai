"use client";

import {
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { COUNTRIES } from "@/lib/countries";

interface CountryComboboxProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function findCountryMatch(query: string): string | undefined {
  const trimmed = query.trim();
  if (!trimmed) {
    return undefined;
  }

  return COUNTRIES.find(
    (country) => country.toLowerCase() === trimmed.toLowerCase()
  );
}

export function CountryCombobox({
  id,
  label,
  value,
  onChange,
}: CountryComboboxProps) {
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputValue = isEditing ? query : value;

  const filteredCountries = useMemo(() => {
    const normalizedQuery = inputValue.trim().toLowerCase();
    if (!normalizedQuery) {
      return COUNTRIES;
    }

    return COUNTRIES.filter((country) =>
      country.toLowerCase().includes(normalizedQuery)
    );
  }, [inputValue]);

  const hasValue = value.length > 0;

  const closeList = () => {
    setIsOpen(false);
    setActiveIndex(-1);
    setIsEditing(false);
  };

  const commitValue = (nextValue: string) => {
    onChange(nextValue);
    setQuery(nextValue);
    closeList();
  };

  const clearValue = () => {
    onChange("");
    setQuery("");
    closeList();
    inputRef.current?.focus();
  };

  const openList = () => {
    setQuery(value);
    setIsEditing(true);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const commitQuery = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      commitValue("");
      return;
    }

    const match = findCountryMatch(trimmed);
    if (match) {
      commitValue(match);
      return;
    }

    setQuery(value);
    setIsEditing(false);
    closeList();
  };

  const handleBlur = () => {
    window.setTimeout(commitQuery, 150);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        openList();
        return;
      }

      setActiveIndex((index) =>
        index < filteredCountries.length - 1 ? index + 1 : 0
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        openList();
        return;
      }

      setActiveIndex((index) =>
        index > 0 ? index - 1 : filteredCountries.length - 1
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (isOpen && activeIndex >= 0 && filteredCountries[activeIndex]) {
        commitValue(filteredCountries[activeIndex]);
        return;
      }

      commitQuery();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setQuery(value);
      setIsEditing(false);
      closeList();
      return;
    }
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}{" "}
        <span className="font-normal text-slate-400">(optional)</span>
      </label>
      <div className="app-combobox">
        <div className="app-select-wrapper">
          <input
            ref={inputRef}
            id={id}
            type="text"
            role="combobox"
            value={inputValue}
            placeholder="Select a country"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-activedescendant={
              activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
            }
            onChange={(event) => {
              setQuery(event.target.value);
              setIsEditing(true);
              setIsOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={openList}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`app-select ${hasValue ? "app-select--with-clear" : ""}`}
          />
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
                  clearValue();
                }}
                aria-label={`Clear ${label.toLowerCase()}`}
                className="app-select-clear"
              >
                ×
              </button>
            )}
            <button
              type="button"
              aria-label={`Show ${label.toLowerCase()} options`}
              className="app-select-toggle"
              onPointerDown={(event) => {
                event.preventDefault();
              }}
              onClick={() => {
                if (isOpen) {
                  setQuery(value);
                  setIsEditing(false);
                  closeList();
                  return;
                }

                inputRef.current?.focus();
                openList();
              }}
            >
              <span className="app-select-chevron" aria-hidden="true" />
            </button>
          </div>
        </div>

        {isOpen && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="app-combobox-list"
          >
            {filteredCountries.length === 0 ? (
              <li className="app-combobox-empty">No matching countries</li>
            ) : (
              filteredCountries.map((country, index) => (
                <li
                  key={country}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={country === value}
                  className={`app-combobox-option${
                    index === activeIndex ? " app-combobox-option--active" : ""
                  }`}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() => commitValue(country)}
                >
                  {country}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
