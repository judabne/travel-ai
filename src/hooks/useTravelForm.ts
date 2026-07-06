"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  arePreferencesEqual,
  getStoredPreferences,
  setStoredPreferences,
} from "@/lib/recommendCache";
import { safeSessionStorageGet } from "@/lib/safeSessionStorage";
import { DEFAULT_PREFERENCES, MAX_SELECTED_INTERESTS, STORAGE_KEY } from "@/lib/constants";
import type { Interest, Region, TravelPreferences } from "@/types/travel";

export interface PreferencesState {
  isHydrated: boolean;
  preferences: TravelPreferences;
  hasStored: boolean;
  hasValidSelections: boolean;
}

const SERVER_PREFERENCES_STATE: PreferencesState = {
  isHydrated: false,
  preferences: DEFAULT_PREFERENCES,
  hasStored: false,
  hasValidSelections: false,
};

let cachedRaw: string | null | undefined;
let cachedState: PreferencesState = SERVER_PREFERENCES_STATE;

function readClientPreferencesState(): PreferencesState {
  const raw = safeSessionStorageGet(STORAGE_KEY);

  if (raw === cachedRaw) {
    return cachedState;
  }

  cachedRaw = raw;

  if (!raw) {
    cachedState = {
      isHydrated: true,
      preferences: DEFAULT_PREFERENCES,
      hasStored: false,
      hasValidSelections: false,
    };
    return cachedState;
  }

  try {
    const preferences = JSON.parse(raw) as TravelPreferences;
    cachedState = {
      isHydrated: true,
      preferences,
      hasStored: true,
      hasValidSelections: preferences.interests.length > 0,
    };
  } catch {
    cachedState = {
      isHydrated: true,
      preferences: DEFAULT_PREFERENCES,
      hasStored: false,
      hasValidSelections: false,
    };
  }

  return cachedState;
}

const preferenceListeners = new Set<() => void>();

export function invalidatePreferencesCache(): void {
  cachedRaw = undefined;
  preferenceListeners.forEach((listener) => listener());
}

function subscribeToPreferences(onStoreChange: () => void) {
  preferenceListeners.add(onStoreChange);

  const handleChange = () => {
    invalidatePreferencesCache();
    onStoreChange();
  };

  window.addEventListener("storage", handleChange);
  return () => {
    preferenceListeners.delete(onStoreChange);
    window.removeEventListener("storage", handleChange);
  };
}

export function usePreferencesState(): PreferencesState {
  return useSyncExternalStore(
    subscribeToPreferences,
    readClientPreferencesState,
    () => SERVER_PREFERENCES_STATE
  );
}

export function useStoredPreferences(): TravelPreferences {
  return usePreferencesState().preferences;
}

export function useHasStoredPreferences(): boolean {
  return usePreferencesState().hasStored;
}

export function useHasValidSelections(): boolean {
  const { isHydrated, hasValidSelections } = usePreferencesState();
  return isHydrated && hasValidSelections;
}

export function useTravelForm(initialPreferences: TravelPreferences) {
  const router = useRouter();
  const [preferences, setPreferences] = useState(initialPreferences);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const toggleInterest = useCallback((interest: Interest) => {
    setPreferences((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return {
          ...prev,
          interests: prev.interests.filter((item) => item !== interest),
        };
      }

      if (prev.interests.length >= MAX_SELECTED_INTERESTS) {
        return prev;
      }

      return {
        ...prev,
        interests: [...prev.interests, interest],
      };
    });
  }, []);

  const setBudget = useCallback((budget: number) => {
    setPreferences((prev) => ({ ...prev, budget }));
  }, []);

  const setDuration = useCallback((duration: number) => {
    setPreferences((prev) => ({ ...prev, duration }));
  }, []);

  const toggleRegion = useCallback((region: Region) => {
    setPreferences((prev) => {
      const exists = prev.regions.includes(region);
      return {
        ...prev,
        regions: exists
          ? prev.regions.filter((item) => item !== region)
          : [...prev.regions, region],
      };
    });
  }, []);

  const submit = useCallback(() => {
    if (preferences.interests.length === 0 || isNavigating) {
      return;
    }

    const storedPreferences = getStoredPreferences();
    const preferencesUnchanged =
      storedPreferences !== null &&
      arePreferencesEqual(preferences, storedPreferences);

    if (!preferencesUnchanged && !setStoredPreferences(preferences)) {
      setSubmitError(
        "Could not save your preferences. Check browser storage settings."
      );
      return;
    }

    invalidatePreferencesCache();
    setSubmitError(null);
    setIsNavigating(true);
    router.push("/results");
  }, [preferences, router, isNavigating]);

  return {
    preferences,
    toggleInterest,
    setBudget,
    setDuration,
    toggleRegion,
    submit,
    isNavigating,
    submitError,
  };
}
