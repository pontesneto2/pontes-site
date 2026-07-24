"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Github, GitCommitHorizontal, GitMerge, Rocket, ShieldCheck, Timer, Zap, Code2 } from "lucide-react";
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
  p95LatencyMs: number | null;
  requests30d: number | null;
  activeRegions: number | null;
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

function AnimatedNumber({
  value,
  plain,
  decimals = 0,
  delay = 0,
}: {
  value: number;
  plain?: boolean;
  decimals?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(decimals ? Number(v.toFixed(decimals)) : Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value, decimals, delay]);

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
              {t("Engineering KPIs", "Engineering KPIs")}
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

  const kpis = [
    { icon: GitCommitHorizontal, label: t(`Contribuições\n(${currentYear})`, `Contributions\n(${currentYear})`), value: data?.contributionsThisYear ?? null, prefix: "", suffix: "", decimals: 0, plain: false },
    { icon: GitMerge, label: t("PRs Mesclados\n(12 meses)", "Merged PRs\n(12 months)"), value: 380, prefix: "≈", suffix: "", decimals: 0, plain: true },
    { icon: Rocket, label: t("Deploys\n(30 dias)", "Deploys\n(30 days)"), value: deployData?.deploysLast30d ?? null, prefix: "", suffix: "", decimals: 0, plain: true },
    { icon: ShieldCheck, label: t("Uptime Médio", "Avg uptime"), value: deployData?.uptimePct ?? null, prefix: "", suffix: "%", decimals: 2, plain: true },
    { icon: Zap, label: t("Latência P95", "P95 latency"), value: deployData?.p95LatencyMs ?? null, prefix: "", suffix: " ms", decimals: 0, plain: true },
    { icon: Timer, label: t("Tempo Médio de Build", "Avg build time"), value: deployData?.avgBuildTimeSec ?? null, prefix: "", suffix: " s", decimals: 0, plain: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-950/50 via-zinc-950/70 to-black backdrop-blur-xl p-3 sm:p-4 md:p-6 shadow-2xl ring-1 ring-inset ring-white/5 overflow-hidden"
    >
      {/* Camadas decorativas */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [-12, -8, -12] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 right-4 md:-bottom-8 md:right-10 hidden sm:block"
        >
          <Rocket className="h-40 w-40 md:h-52 md:w-52 text-violet-500/10 drop-shadow-[0_0_45px_rgba(139,92,246,0.35)]" />
        </motion.div>
      </div>
      <div className="relative">
        <div className="mb-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-violet-300" />
              {t("Engineering KPIs", "Engineering KPIs")}
            </h3>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-violet-300 hover:text-violet-200 transition-colors whitespace-nowrap"
            >
              @{GITHUB_USER}
            </a>
          </div>
          <p className="text-[13px] text-zinc-400 mt-0.5">
            {t(
              "Visão consolidada da atividade de desenvolvimento e das aplicações em produção, com dados do GitHub, Vercel e Railway.",
              "Consolidated view of development activity and production applications, with data from GitHub, Vercel and Railway."
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {kpis.map((stat, index) => {
            const delay = index * 0.08;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay }}
                className="p-1.5 sm:p-3 min-h-[76px]"
              >
                <stat.icon className="h-[18px] w-[18px] text-violet-400 mb-1.5" />
                {stat.value !== null ? (
                  <>
                    <div className="text-base sm:text-xl font-semibold text-zinc-100 tabular-nums">
                      {stat.prefix}
                      <AnimatedNumber value={stat.value} plain={stat.plain} decimals={stat.decimals} delay={delay} />
                      {stat.suffix}
                    </div>
                    <div className="text-[13px] text-zinc-400 mt-0.5 whitespace-pre-line">{stat.label}</div>
                  </>
                ) : (
                  <div className="h-full w-full animate-pulse rounded-lg bg-white/5 min-h-[52px]" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
