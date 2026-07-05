"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchRecommendations } from "@/lib/api/recommend";
import {
  getCachedRecommendations,
  getRecommendRequestKey,
  setCachedRecommendations,
} from "@/lib/recommendCache";
import {
  useHasValidSelections,
  useStoredPreferences,
} from "@/hooks/useTravelForm";
import type { CountryResult, RecommendResponse } from "@/types/travel";

interface UseRecommendationsResult {
  results: CountryResult[];
  insight: string;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

const EMPTY_RESULT: UseRecommendationsResult = {
  results: [],
  insight: "",
  isLoading: false,
  error: null,
  retry: () => {},
};

interface FetchedRecommendations {
  requestKey: string;
  response: RecommendResponse;
}

export function useRecommendations(): UseRecommendationsResult {
  const hasValidSelections = useHasValidSelections();
  const preferences = useStoredPreferences();
  const requestKey = getRecommendRequestKey(preferences);
  const cached = useMemo(
    () =>
      hasValidSelections ? getCachedRecommendations(preferences) : null,
    [hasValidSelections, preferences]
  );
  const [fetched, setFetched] = useState<FetchedRecommendations | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setError(null);
    setFetched(null);
    setRetryCount((count) => count + 1);
  }, []);

  const data =
    cached ??
    (fetched?.requestKey === requestKey ? fetched.response : null);

  useEffect(() => {
    if (!hasValidSelections || cached) {
      return;
    }

    let isCancelled = false;

    fetchRecommendations(preferences)
      .then((response) => {
        if (!isCancelled) {
          setCachedRecommendations(preferences, response);
          setFetched({ requestKey, response });
          setError(null);
        }
      })
      .catch((loadError) => {
        if (!isCancelled) {
          setFetched(null);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load recommendations."
          );
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [hasValidSelections, cached, preferences, requestKey, retryCount]);

  if (!hasValidSelections) {
    return EMPTY_RESULT;
  }

  return {
    results: data?.results ?? [],
    insight: data?.insight ?? "",
    isLoading: !data && !error,
    error,
    retry,
  };
}
