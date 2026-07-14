import { describe, it, expect, vi, afterEach } from "vitest";
import { checkRateLimit, getClientIp } from "./rate-limit.server";

afterEach(() => {
  vi.useRealTimers();
});

describe("getClientIp", () => {
  it("takes the first IP from x-forwarded-for", () => {
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip", () => {
    const req = new Request("http://x", { headers: { "x-real-ip": "9.9.9.9" } });
    expect(getClientIp(req)).toBe("9.9.9.9");
  });

  it("returns 'unknown' when no IP header is present", () => {
    expect(getClientIp(new Request("http://x"))).toBe("unknown");
  });
});

describe("checkRateLimit", () => {
  it("allows up to 5 requests then blocks the 6th within the window", () => {
    const ip = "rl-test-burst"; // unique IP to avoid cross-test state in the module Map
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip)).toBe(true);
    }
    expect(checkRateLimit(ip)).toBe(false);
  });

  it("resets after the 10-minute window slides", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 13, 12, 0, 0));
    const ip = "rl-test-window";
    for (let i = 0; i < 5; i++) checkRateLimit(ip);
    expect(checkRateLimit(ip)).toBe(false);

    vi.setSystemTime(new Date(2026, 6, 13, 12, 11, 0)); // +11 min, past the 10-min window
    expect(checkRateLimit(ip)).toBe(true);
  });
});
