"use client";

import { useEffect, useState } from "react";
import { RESULTS_LOADING_DELAY_MS } from "@/lib/constants";

export function useSimulatedLoad(
  delayMs: number = RESULTS_LOADING_DELAY_MS
): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return isLoading;
}
