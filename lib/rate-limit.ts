type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

const buckets = new Map<string, Bucket>();

export function consumeRateLimit({ key, limit, windowMs }: RateLimitOptions) {
  if (shouldBypassRateLimit(key)) {
    const resetAt = Date.now() + windowMs;

    return {
      allowed: true,
      limit,
      remaining: limit,
      resetAt,
    };
  }

  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const next = { count: 1, resetAt: now + windowMs };
    buckets.set(key, next);
    cleanupBuckets(now);

    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetAt: next.resetAt,
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  buckets.set(key, current);

  return {
    allowed: true,
    limit,
    remaining: limit - current.count,
    resetAt: current.resetAt,
  };
}

export function rateLimitHeaders(result: ReturnType<typeof consumeRateLimit>) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
}

function cleanupBuckets(now: number) {
  if (buckets.size < 500) {
    return;
  }

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

function shouldBypassRateLimit(key: string) {
  if (process.env.NODE_ENV === "production") {
    return false;
  }

  return (
    key.includes(":local") ||
    key.includes("127.0.0.1") ||
    key.includes("::1") ||
    key.includes("localhost")
  );
}
