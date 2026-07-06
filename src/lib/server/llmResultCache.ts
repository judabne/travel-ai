import "server-only";

import { createHash } from "node:crypto";

import type { AiRecommendResponse } from "@/types/ai";
import type { RecommendRequest } from "@/types/travel";

const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_CACHE_ENTRIES = 1000;

interface CacheEntry {
  data: AiRecommendResponse;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

function normalizeRequest(request: RecommendRequest) {
  return {
    interests: [...request.interests].sort(),
    budget: request.budget,
    duration: request.duration,
    regions: [...request.regions].sort(),
  };
}

export function buildLlmCacheKey(request: RecommendRequest): string {
  const payload = JSON.stringify(normalizeRequest(request));

  return createHash("sha256").update(payload).digest("hex");
}

export function getCachedLlmResult(
  key: string
): AiRecommendResponse | null {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function evictOldestEntries(): void {
  while (cache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;

    if (oldestKey === undefined) {
      break;
    }

    cache.delete(oldestKey);
  }
}

export function setCachedLlmResult(
  key: string,
  data: AiRecommendResponse
): void {
  if (cache.has(key)) {
    cache.delete(key);
  }

  cache.set(key, { data, timestamp: Date.now() });
  evictOldestEntries();
}
