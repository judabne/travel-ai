"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_PREFERENCES, MAX_SELECTED_INTERESTS, STORAGE_KEY } from "@/lib/constants";
import type { Interest, Region, TravelPreferences, TravelStyle } from "@/types/travel";

function getServerPreferences(): TravelPreferences {
  return DEFAULT_PREFERENCES;
}

let cachedRaw: string | null | undefined;
let cachedPreferences: TravelPreferences = DEFAULT_PREFERENCES;

function getClientPreferences(): TravelPreferences {
  const raw = sessionStorage.getItem(STORAGE_KEY);

  if (raw === cachedRaw) {
    return cachedPreferences;
  }

  cachedRaw = raw;

  if (!raw) {
    cachedPreferences = DEFAULT_PREFERENCES;
    return cachedPreferences;
  }

  try {
    cachedPreferences = JSON.parse(raw) as TravelPreferences;
  } catch {
    cachedPreferences = DEFAULT_PREFERENCES;
  }

  return cachedPreferences;
}

function subscribeToPreferences(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export function useStoredPreferences(): TravelPreferences {
  return useSyncExternalStore(
    subscribeToPreferences,
    getClientPreferences,
    getServerPreferences
  );
}

export function useTravelForm() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<TravelPreferences>(
    DEFAULT_PREFERENCES
  );

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

  const setTravelStyle = useCallback((travelStyle: TravelStyle) => {
    setPreferences((prev) => ({ ...prev, travelStyle }));
  }, []);

  const setRegion = useCallback((region: Region) => {
    setPreferences((prev) => ({ ...prev, region }));
  }, []);

  const submit = useCallback(() => {
    if (preferences.interests.length === 0) {
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    router.push("/results");
  }, [preferences, router]);

  return {
    preferences,
    toggleInterest,
    setBudget,
    setDuration,
    setTravelStyle,
    setRegion,
    submit,
  };
}
