import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { RATE_LIMITS, checkRateLimit, getClientIp } from "./rate-limit.server";

// No CI não há DATABASE_URL, então getSql() é null e checkRateLimit exercita o
// FALLBACK em memória — que é exatamente o comportamento "banco fora ainda limita".
beforeEach(() => {
  vi.stubEnv("DATABASE_URL", "");
  vi.stubEnv("POSTGRES_URL", "");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe("getClientIp", () => {
  it("prefers x-real-ip (edge-set, not client-forgeable) when both headers present", () => {
    const req = new Request("http://x", {
      headers: { "x-real-ip": "9.9.9.9", "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(getClientIp(req)).toBe("9.9.9.9");
  });

  it("falls back to the first x-forwarded-for IP when x-real-ip is absent", () => {
    const req = new Request("http://x", { headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" } });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("returns 'unknown' when no IP header is present", () => {
    expect(getClientIp(new Request("http://x"))).toBe("unknown");
  });
});

describe("checkRateLimit (in-memory fallback, no DB)", () => {
  it("allows up to max requests then blocks the next within the window", async () => {
    const bucket = "test:burst"; // bucket único: o Map é module-level e persiste no arquivo
    const limit = { max: 3, windowSec: 600 };
    for (let i = 0; i < 3; i++) {
      expect(await checkRateLimit(bucket, limit)).toBe(true);
    }
    expect(await checkRateLimit(bucket, limit)).toBe(false);
  });

  it("keeps buckets independent (per endpoint:ip)", async () => {
    const limit = { max: 2, windowSec: 600 };
    expect(await checkRateLimit("test:a", limit)).toBe(true);
    expect(await checkRateLimit("test:a", limit)).toBe(true);
    expect(await checkRateLimit("test:a", limit)).toBe(false); // A esgotado
    expect(await checkRateLimit("test:b", limit)).toBe(true); // B intacto
  });

  it("resets after the window slides", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 14, 12, 0, 0));
    const bucket = "test:window";
    const limit = { max: 2, windowSec: 600 };
    expect(await checkRateLimit(bucket, limit)).toBe(true);
    expect(await checkRateLimit(bucket, limit)).toBe(true);
    expect(await checkRateLimit(bucket, limit)).toBe(false);

    vi.setSystemTime(new Date(2026, 6, 14, 12, 11, 0)); // +11 min > 10-min window
    expect(await checkRateLimit(bucket, limit)).toBe(true);
  });

  it("still throttles with no DATABASE_URL (fallback is not allow-always)", async () => {
    const bucket = "test:nodb";
    const limit = { max: 1, windowSec: 600 };
    expect(await checkRateLimit(bucket, limit)).toBe(true);
    expect(await checkRateLimit(bucket, limit)).toBe(false);
  });
});

describe("RATE_LIMITS config", () => {
  it("defines a limit for each rate-limited endpoint", () => {
    expect(RATE_LIMITS.proposta.max).toBeGreaterThan(0);
    expect(RATE_LIMITS["proposta-send"].windowSec).toBeGreaterThan(0);
    expect(RATE_LIMITS.contact.max).toBeGreaterThan(0);
  });
});
