import { NextResponse } from "next/server";

const GITHUB_USER = "pontesneto2";

type GithubUser = {
  created_at: string;
};

type GithubRepo = {
  stargazers_count: number;
  fork: boolean;
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const currentYear = new Date().getFullYear();

  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=all`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "GitHub API unavailable" }, { status: 502 });
    }

    const user = (await userRes.json()) as GithubUser;
    const repos = (await reposRes.json()) as GithubRepo[];
    const ownRepos = repos.filter((r) => !r.fork);
    const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const joinYear = new Date(user.created_at).getFullYear();

    let contributionsThisYear = 0;
    if (contribRes.ok) {
      const contribData = (await contribRes.json()) as { total?: Record<string, number> };
      contributionsThisYear = contribData.total?.[currentYear] ?? 0;
    }

    return NextResponse.json(
      { joinYear, totalStars, contributionsThisYear },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch {
    return NextResponse.json({ error: "GitHub API unavailable" }, { status: 502 });
  }
}
