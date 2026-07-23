import { NextResponse } from "next/server";
import { getAllProjectsInfo, isVercelConfigured } from "@/lib/vercel/service.server";

export async function GET() {
  if (!isVercelConfigured()) {
    return NextResponse.json({ configured: false, projects: [] });
  }

  try {
    const projects = await getAllProjectsInfo();
    return NextResponse.json(
      { configured: true, projects },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } }
    );
  } catch (err) {
    console.error("[api/vercel/projects]", err);
    return NextResponse.json({ configured: false, projects: [] });
  }
}
