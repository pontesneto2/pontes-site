"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Github, Star, Activity, Calendar, Rocket, ShieldCheck, Timer } from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";

const GITHUB_USER = "pontesneto2";

type Stats = {
  joinYear: number;
  totalStars: number;
  contributionsThisYear: number;
};

type DeployStats = {
  configured: boolean;
  deploysLast30d: number | null;
  uptimePct: number | null;
  avgBuildTimeSec: number | null;
};

async function fetchGithubData(): Promise<Stats | null> {
  const res = await fetch("/api/github-stats");
  if (!res.ok) return null;
  return (await res.json()) as Stats;
}

async function fetchDeployData(): Promise<DeployStats | null> {
  try {
    const res = await fetch("/api/deploy-stats");
    if (!res.ok) return null;
    return (await res.json()) as DeployStats;
  } catch {
    return null;
  }
}

function AnimatedNumber({ value, plain, decimals = 0 }: { value: number; plain?: boolean; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(decimals ? Number(v.toFixed(decimals)) : Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value, decimals]);

  const formatted = decimals ? display.toFixed(decimals) : display.toString();
  return <span ref={ref}>{plain ? formatted : display.toLocaleString("pt-BR")}</span>;
}

export default function GithubStats() {
  const { lang } = useLanguage();
  const t = (pt: string, en: string) => tr(lang, { pt, en });
  const [data, setData] = useState<Stats | null>(null);
  const [error, setError] = useState(false);
  const [deployData, setDeployData] = useState<DeployStats | null>(null);

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

  useEffect(() => {
    let cancelled = false;
    fetchDeployData().then((result) => {
      if (!cancelled && result) setDeployData(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="relative rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Github className="h-5 w-5 text-violet-300" />
              {t("GitHub ao vivo", "GitHub live")}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {t(
                "Estatísticas indisponíveis no momento — confira o perfil diretamente.",
                "Stats unavailable right now — check the profile directly."
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
      </div>
    );
  }

  const currentYear = new Date().getFullYear();

  const stats = data
    ? [
        { icon: Activity, label: t(`Contribuições ${currentYear}`, `Contributions ${currentYear}`), value: data.contributionsThisYear, plain: false },
        { icon: Star, label: t("Stars recebidas", "Stars earned"), value: data.totalStars, plain: false },
        { icon: Calendar, label: t("GitHub desde", "GitHub since"), value: data.joinYear, plain: true },
      ]
    : [];

  const deployMetrics = [
    { icon: Rocket, label: t("Deploys (30d)", "Deploys (30d)"), value: deployData?.deploysLast30d ?? null, suffix: "", decimals: 0 },
    { icon: ShieldCheck, label: t("Uptime", "Uptime"), value: deployData?.uptimePct ?? null, suffix: "%", decimals: 2 },
    { icon: Timer, label: t("Build médio", "Avg build"), value: deployData?.avgBuildTimeSec ?? null, suffix: "s", decimals: 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden"
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

        <div className="grid grid-cols-3 gap-3">
          {(data ? stats : Array.from({ length: 3 })).map((stat, index) => (
            <div
              key={stat ? (stat as { label: string }).label : index}
              className="p-2 sm:p-4 min-h-[92px]"
            >
              {stat ? (
                <>
                  {(() => {
                    const Icon = (stat as { icon: typeof Github }).icon;
                    return <Icon className="h-4 w-4 text-violet-400 mb-2" />;
                  })()}
                  <div className="text-2xl font-semibold text-zinc-100 tabular-nums">
                    <AnimatedNumber
                      value={(stat as { value: number }).value}
                      plain={(stat as { plain: boolean }).plain}
                    />
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

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Rocket className="h-4 w-4 text-violet-300" />
              {t("Deploy & Infra", "Deploy & Infra")}
            </h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              {deployData?.configured
                ? t("Dados reais da Vercel e Railway.", "Real data from Vercel and Railway.")
                : t("Vercel + Railway — integração em andamento.", "Vercel + Railway — integration in progress.")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {deployMetrics.map((stat) => (
              <div key={stat.label} className="p-2 sm:p-4 min-h-[92px]">
                <stat.icon className="h-4 w-4 text-violet-400 mb-2" />
                {stat.value !== null ? (
                  <>
                    <div className="text-2xl font-semibold text-zinc-100 tabular-nums">
                      <AnimatedNumber value={stat.value} plain decimals={stat.decimals} />
                      {stat.suffix}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{stat.label}</div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-medium text-zinc-600 italic">{t("em breve", "soon")}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{stat.label}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
