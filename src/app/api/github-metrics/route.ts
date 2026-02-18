import { NextResponse } from "next/server";

type Metrics = {
  username: string;
  followers: number | null;
  publicRepos: number | null;
  totalStars: number | null;
  fetchedAt: string;
};

async function fetchJson<T>(url: string, token?: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "pontes-site",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 60 * 60 * 6 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub request failed (${res.status}): ${text || url}`);
  }

  return (await res.json()) as T;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username =
    url.searchParams.get("user") ||
    process.env.GITHUB_USERNAME ||
    "pontesneto2";

  const token = process.env.GITHUB_TOKEN;

  try {
    const user = await fetchJson<{
      followers: number;
      public_repos: number;
    }>(`https://api.github.com/users/${encodeURIComponent(username)}`, token);

    const repos = await fetchJson<
      Array<{
        stargazers_count: number;
        fork: boolean;
        private?: boolean;
      }>
    >(
      `https://api.github.com/users/${encodeURIComponent(
        username,
      )}/repos?per_page=100&sort=updated`,
      token,
    );

    const totalStars = repos
      .filter((r) => !r.fork)
      .reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    const payload: Metrics = {
      username,
      followers: user.followers ?? null,
      publicRepos: user.public_repos ?? null,
      totalStars: Number.isFinite(totalStars) ? totalStars : null,
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { ok: true, metrics: payload },
      {
        headers: {
          "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      {
        ok: false,
        error: message,
        metrics: {
          username,
          followers: null,
          publicRepos: null,
          totalStars: null,
          fetchedAt: new Date().toISOString(),
        } satisfies Metrics,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
        },
      },
    );
  }
}
