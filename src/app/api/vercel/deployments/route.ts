import { NextResponse } from "next/server";
import { getAllDeployments, isVercelConfigured } from "@/lib/vercel/service.server";

const TIMELINE_LIMIT = 15;

export async function GET() {
  if (!isVercelConfigured()) {
    return NextResponse.json({ configured: false, deployments: [] });
  }

  try {
    const deployments = (await getAllDeployments(100)).slice(0, TIMELINE_LIMIT).map((d) => ({
      id: d.uid,
      project: d.projectLabel,
      state: d.readyState ?? d.state ?? "UNKNOWN",
      target: d.target ?? "preview",
      branch: d.meta?.githubCommitRef ?? null,
      commitMessage: d.meta?.githubCommitMessage?.split("\n")[0]?.trim() || null,
      authorName: d.meta?.githubCommitAuthorName ?? null,
      createdAt: d.createdAt ?? null,
      url: d.url ?? null,
    }));

    return NextResponse.json(
      { configured: true, deployments },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  } catch (err) {
    console.error("[api/vercel/deployments]", err);
    return NextResponse.json({ configured: false, deployments: [] });
  }
}
