"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Github, Star, Activity, Calendar } from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";

const GITHUB_USER = "pontesneto2";

type GithubUser = {
  public_repos: number;
  created_at: string;
};

type GithubRepo = {
  stargazers_count: number;
  fork: boolean;
};

type Stats = {
  publicRepos: number;
  totalStars: number;
  yearsActive: number;
  totalContributions: number;
};

async function fetchGithubData(): Promise<Stats | null> {
  const headers = { Accept: "application/vnd.github+json" };

  const [userRes, reposRes, contribRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers }
    ),
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=all`),
  ]);

  if (!userRes.ok || !reposRes.ok) return null;

  const user = (await userRes.json()) as GithubUser;
  const repos = (await reposRes.json()) as GithubRepo[];
  const ownRepos = repos.filter((r) => !r.fork);
  const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

  const yearsActive =
    new Date().getFullYear() - new Date(user.created_at).getFullYear();

  let totalContributions = 0;
  if (contribRes.ok) {
    const contribData = (await contribRes.json()) as {
      total?: Record<string, number>;
    };
    totalContributions = Object.values(contribData.total ?? {}).reduce(
      (a, b) => a + b,
      0
    );
  }

  return {
    publicRepos: user.public_repos,
    totalStars,
    yearsActive,
    totalContributions,
  };
}

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return <span ref={ref}>{display.toLocaleString("pt-BR")}</span>;
}

export default function GithubStats() {
  const { lang } = useLanguage();
  const t = (pt: string, en: string) => tr(lang, { pt, en });
  const [data, setData] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchGithubData()
      .then((result) => {
        if (!cancelled) {
          if (result) setData(result);
          else setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return null;

  const stats = data
    ? [
        { icon: Activity, label: t("Contribuições totais", "Total contributions"), value: data.totalContributions },
        { icon: Calendar, label: t("Anos no GitHub", "Years on GitHub"), value: data.yearsActive },
        { icon: Github, label: t("Repositórios públicos", "Public repos"), value: data.publicRepos },
        { icon: Star, label: t("Stars recebidas", "Stars earned"), value: data.totalStars },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-6 md:p-8 shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Github className="h-5 w-5 text-violet-300" />
              {t("GitHub ao vivo", "GitHub live")}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {t(
                "Dados reais, atualizados direto da API do GitHub.",
                "Real data, fetched live from the GitHub API."
              )}
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-violet-300 hover:text-violet-200 transition-colors whitespace-nowrap"
          >
            @{GITHUB_USER}
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(data ? stats : Array.from({ length: 4 })).map((stat, index) => (
            <div
              key={stat ? (stat as { label: string }).label : index}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4 min-h-[92px]"
            >
              {stat ? (
                <>
                  {(() => {
                    const Icon = (stat as { icon: typeof Github }).icon;
                    return <Icon className="h-4 w-4 text-violet-400 mb-2" />;
                  })()}
                  <div className="text-2xl font-semibold text-zinc-100 tabular-nums">
                    <AnimatedNumber value={(stat as { value: number }).value} />
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    {(stat as { label: string }).label}
                  </div>
                </>
              ) : (
                <div className="h-full w-full animate-pulse rounded-lg bg-white/5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
