import { NextResponse } from "next/server";
import { getAggregatedMetrics } from "@/lib/vercel/service.server";

export async function GET() {
  try {
    const metrics = await getAggregatedMetrics();
    return NextResponse.json(metrics, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("[api/vercel/metrics]", err);
    return NextResponse.json({ configured: false });
  }
}
