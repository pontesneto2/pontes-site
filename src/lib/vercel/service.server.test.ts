import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isVercelConfigured, computeMetrics, getDeployments, type VercelDeployment } from "./service.server";

beforeEach(() => {
  vi.stubEnv("VERCEL_API_TOKEN", "");
  vi.stubEnv("VERCEL_TEAM_ID", "");
  vi.stubEnv("VERCEL_PROJECT_PORTFOLIO", "");
  vi.stubEnv("VERCEL_PROJECT_SITE", "");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("isVercelConfigured", () => {
  it("is false with no env vars set", () => {
    expect(isVercelConfigured()).toBe(false);
  });

  it("is false with a token but no project id", () => {
    vi.stubEnv("VERCEL_API_TOKEN", "tok");
    vi.stubEnv("VERCEL_TEAM_ID", "team_x");
    expect(isVercelConfigured()).toBe(false);
  });

  it("is true with token + teamId + at least one project", () => {
    vi.stubEnv("VERCEL_API_TOKEN", "tok");
    vi.stubEnv("VERCEL_TEAM_ID", "team_x");
    vi.stubEnv("VERCEL_PROJECT_SITE", "prj_x");
    expect(isVercelConfigured()).toBe(true);
  });
});

describe("computeMetrics", () => {
  const dep = (overrides: Partial<VercelDeployment>): VercelDeployment => ({
    uid: Math.random().toString(36),
    readyState: "READY",
    target: "production",
    createdAt: Date.now(),
    ...overrides,
  });

  it("computes success rate as ready/total", () => {
    const deployments = [
      dep({ readyState: "READY" }),
      dep({ readyState: "READY" }),
      dep({ readyState: "ERROR" }),
      dep({ readyState: "ERROR" }),
    ];
    expect(computeMetrics(deployments).successRatePct).toBe(50);
  });

  it("returns zeroed metrics for an empty deployment list", () => {
    const metrics = computeMetrics([]);
    expect(metrics.successRatePct).toBe(0);
    expect(metrics.totalDeployments).toBe(0);
    expect(metrics.avgBuildTimeSec).toBeNull();
    expect(metrics.lastProductionDeployAt).toBeNull();
  });

  it("computes avg/fastest build time only from deployments with valid building/ready timestamps", () => {
    const deployments = [
      dep({ buildingAt: 0, ready: 10_000 }), // 10s
      dep({ buildingAt: 0, ready: 30_000 }), // 30s
      dep({ buildingAt: 0, ready: undefined }), // missing ready — excluded
    ];
    const metrics = computeMetrics(deployments);
    expect(metrics.avgBuildTimeSec).toBe(20);
    expect(metrics.fastestBuildSec).toBe(10);
  });

  it("falls back to total count for deploysPerWeek when timestamps don't span a full week", () => {
    const now = Date.now();
    const deployments = [dep({ createdAt: now }), dep({ createdAt: now })];
    expect(computeMetrics(deployments).deploysPerWeek).toBe(2);
  });

  it("only counts READY production deploys for lastProductionDeployAt/stableSinceDays", () => {
    const now = Date.now();
    const oneDayAgo = now - 86_400_000;
    const deployments = [
      dep({ target: "production", readyState: "ERROR", createdAt: now }),
      dep({ target: "preview", readyState: "READY", createdAt: now }),
      dep({ target: "production", readyState: "READY", createdAt: oneDayAgo }),
    ];
    const metrics = computeMetrics(deployments);
    expect(metrics.lastProductionDeployAt).toBe(oneDayAgo);
    expect(metrics.stableSinceDays).toBe(1);
  });
});

describe("getDeployments (fetch + cache + retry)", () => {
  beforeEach(() => {
    vi.stubEnv("VERCEL_API_TOKEN", "tok");
    vi.stubEnv("VERCEL_TEAM_ID", "team_x");
  });

  it("retries on 429 with backoff and eventually succeeds", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 429 }))
      .mockResolvedValueOnce(new Response(null, { status: 429 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ deployments: [{ uid: "a" }] }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const deployments = await getDeployments("prj_retry_test");
    expect(deployments).toEqual([{ uid: "a" }]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  }, 10_000);

  it("throws immediately on 401 without retrying", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 401 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getDeployments("prj_401_test")).rejects.toThrow(/inválido/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("caches successful responses for repeated calls with the same params", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ deployments: [{ uid: "cached" }] }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await getDeployments("prj_cache_test", 50);
    await getDeployments("prj_cache_test", 50);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
