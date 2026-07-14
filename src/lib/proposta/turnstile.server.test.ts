import { describe, it, expect, vi, afterEach } from "vitest";
import { verifyTurnstile } from "./turnstile.server";

const SECRET = "0x_test_secret";

function mockFetchOnce(response: { ok: boolean; body?: unknown }) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: response.ok,
    json: async () => response.body ?? {},
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("verifyTurnstile — fail-open policy", () => {
  it("allows (dev bypass) when no secret is configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    await expect(verifyTurnstile("any-token", "1.2.3.4")).resolves.toBe(true);
  });

  it("allows when no token is present (widget unavailable)", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    await expect(verifyTurnstile(undefined, "1.2.3.4")).resolves.toBe(true);
  });

  it("allows a token Cloudflare confirms as valid", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    const fetchMock = mockFetchOnce({ ok: true, body: { success: true } });
    await expect(verifyTurnstile("good-token", "1.2.3.4")).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("blocks a token Cloudflare explicitly rejects (forged token)", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    mockFetchOnce({ ok: true, body: { success: false } });
    await expect(verifyTurnstile("bad-token", "1.2.3.4")).resolves.toBe(false);
  });

  it("allows when siteverify returns a non-ok HTTP status (infra failure)", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    mockFetchOnce({ ok: false });
    await expect(verifyTurnstile("some-token", "1.2.3.4")).resolves.toBe(true);
  });

  it("allows when the verification request throws (network/timeout)", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    await expect(verifyTurnstile("some-token", "1.2.3.4")).resolves.toBe(true);
  });
});
