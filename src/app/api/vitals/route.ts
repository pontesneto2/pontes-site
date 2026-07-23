import { NextResponse } from "next/server";
import { recordVital, getVitalsSummary, VITAL_METRICS, type VitalMetric } from "@/lib/vitals.server";
import { checkRateLimit, getClientIp } from "@/lib/proposta/rate-limit.server";

// Teto de sanidade — CLS é unitless (sempre bem abaixo disso) e os demais são ms.
const VALUE_MAX = 60_000;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const allowed = await checkRateLimit(`vitals:${ip}`, { max: 60, windowSec: 60 });
  if (!allowed) return NextResponse.json({ ok: false }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { metric, value, path } = (body ?? {}) as { metric?: string; value?: number; path?: string };
  if (
    typeof metric !== "string" ||
    !VITAL_METRICS.includes(metric as VitalMetric) ||
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > VALUE_MAX
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await recordVital(metric as VitalMetric, value, typeof path === "string" ? path.slice(0, 200) : null);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const summary = await getVitalsSummary();
  return NextResponse.json(
    { summary },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } }
  );
}
