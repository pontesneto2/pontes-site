import { getSql, type Sql } from "@/lib/proposta/db.server";

/**
 * Agregação de Core Web Vitals reportados pelo próprio site (WebVitalsReporter,
 * via `useReportWebVitals` do Next.js). Mesma filosofia do rate-limit durável:
 * persiste no Neon quando há DATABASE_URL, cai em amostragem por-instância
 * (best-effort, reseta a cada cold start) quando não há — nunca derruba a rota.
 */

export const VITAL_METRICS = ["LCP", "CLS", "INP", "FCP", "TTFB"] as const;
export type VitalMetric = (typeof VITAL_METRICS)[number];

export type VitalRating = "good" | "needs-improvement" | "poor";

// Thresholds oficiais do Google (web.dev/articles/vitals) — LCP/FCP/TTFB em ms,
// CLS é unitless, INP em ms.
const THRESHOLDS: Record<VitalMetric, { good: number; needsImprovement: number }> = {
  LCP: { good: 2500, needsImprovement: 4000 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  INP: { good: 200, needsImprovement: 500 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

export function rateVital(metric: VitalMetric, value: number): VitalRating {
  const t = THRESHOLDS[metric];
  if (value <= t.good) return "good";
  if (value <= t.needsImprovement) return "needs-improvement";
  return "poor";
}

export type VitalsSummary = Array<{
  metric: VitalMetric;
  p75: number;
  sampleCount: number;
  rating: VitalRating | null;
}>;

// --- Fallback em memória (best-effort, por instância quente) -----------------
const MAX_SAMPLES_IN_MEMORY = 200;
const memorySamples = new Map<VitalMetric, number[]>();

function recordInMemory(metric: VitalMetric, value: number): void {
  const samples = memorySamples.get(metric) ?? [];
  samples.push(value);
  if (samples.length > MAX_SAMPLES_IN_MEMORY) samples.shift();
  memorySamples.set(metric, samples);
}

function percentile75(sortedAsc: number[]): number {
  if (!sortedAsc.length) return 0;
  const idx = Math.min(sortedAsc.length - 1, Math.floor(0.75 * sortedAsc.length));
  return sortedAsc[idx];
}

function summarizeInMemory(): VitalsSummary {
  return VITAL_METRICS.map((metric) => {
    const samples = [...(memorySamples.get(metric) ?? [])].sort((a, b) => a - b);
    const p75 = percentile75(samples);
    return {
      metric,
      p75,
      sampleCount: samples.length,
      rating: samples.length ? rateVital(metric, p75) : null,
    };
  });
}

// --- Camada durável (Neon) ---------------------------------------------------
let schemaReady: Promise<void> | null = null;
function ensureSchema(sql: Sql): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS web_vitals_events (
          id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          metric     text NOT NULL,
          value      double precision NOT NULL,
          path       text,
          created_at timestamptz NOT NULL DEFAULT now()
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS idx_web_vitals_metric_created
        ON web_vitals_events (metric, created_at DESC)
      `;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

export async function recordVital(metric: VitalMetric, value: number, path: string | null): Promise<void> {
  const sql = getSql();
  if (!sql) {
    recordInMemory(metric, value);
    return;
  }

  try {
    await ensureSchema(sql);
    await sql`INSERT INTO web_vitals_events (metric, value, path) VALUES (${metric}, ${value}, ${path})`;
  } catch (err) {
    console.error("[vitals] falha ao persistir — usando fallback em memória:", err);
    recordInMemory(metric, value);
  }
}

export async function getVitalsSummary(): Promise<VitalsSummary> {
  const sql = getSql();
  if (!sql) return summarizeInMemory();

  try {
    await ensureSchema(sql);
    const rows = (await sql`
      SELECT
        metric,
        percentile_cont(0.75) WITHIN GROUP (ORDER BY value) AS p75,
        count(*)::int AS sample_count
      FROM web_vitals_events
      WHERE created_at > now() - interval '7 days'
      GROUP BY metric
    `) as Array<{ metric: string; p75: number; sample_count: number }>;

    const byMetric = new Map(rows.map((r) => [r.metric, r]));
    return VITAL_METRICS.map((metric) => {
      const row = byMetric.get(metric);
      const p75 = row?.p75 ?? 0;
      const sampleCount = row?.sample_count ?? 0;
      return { metric, p75, sampleCount, rating: sampleCount ? rateVital(metric, p75) : null };
    });
  } catch (err) {
    console.error("[vitals] falha ao ler resumo durável — usando fallback em memória:", err);
    return summarizeInMemory();
  }
}
