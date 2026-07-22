import { NextResponse } from "next/server";

// Placeholder numbers until real Vercel + Railway API calls are wired up (configured stays false).
export async function GET() {
  return NextResponse.json(
    {
      configured: false,
      deploysLast30d: 47,
      uptimePct: 99.98,
      avgBuildTimeSec: 22,
    },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
