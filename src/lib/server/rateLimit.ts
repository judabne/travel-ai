interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitEntry>();

const DEFAULT_MAX_REQUESTS = 10;
const DEFAULT_WINDOW_MS = 60_000;

function getMaxRequests(): number {
  const value = Number(process.env.RECOMMEND_RATE_LIMIT_MAX);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_MAX_REQUESTS;
}

function getWindowMs(): number {
  const value = Number(process.env.RECOMMEND_RATE_LIMIT_WINDOW_MS);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_WINDOW_MS;
}

function pruneExpiredBuckets(now: number): void {
  for (const [key, entry] of buckets) {
    if (now >= entry.resetAt) {
      buckets.delete(key);
    }
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export function checkRecommendRateLimit(request: Request): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const maxRequests = getMaxRequests();
  const windowMs = getWindowMs();
  const key = getClientIp(request);
  const entry = buckets.get(key);

  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    pruneExpiredBuckets(now);
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { allowed: true };
}
