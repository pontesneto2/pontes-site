"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Code2, Activity } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SpotlightCard from "@/components/SpotlightCard";

type Metrics = {
  configured: boolean;
  successRatePct: number;
  totalDeployments: number;
  avgBuildTimeSec: number | null;
  fastestBuildSec: number | null;
  deploysPerWeek: number;
  lastProductionDeployAt: number | null;
  stableSinceDays: number | null;
};

type ProjectInfo = {
  projectKey: string;
  label: string;
  framework: string | null;
  nodeVersion: string | null;
  domains: string[];
};

type VitalMetric = "LCP" | "CLS" | "INP" | "FCP" | "TTFB";
type VitalSummaryItem = {
  metric: VitalMetric;
  p75: number;
  sampleCount: number;
  rating: "good" | "needs-improvement" | "poor" | null;
};

const POLL_MS = 60_000;

async function safeJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const RATING_STYLES: Record<string, string> = {
  good: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "needs-improvement": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  poor: "text-red-400 bg-red-400/10 border-red-400/20",
};

const VITAL_UNITS: Record<VitalMetric, string> = { LCP: "s", CLS: "", INP: "ms", FCP: "s", TTFB: "ms" };

function formatVitalValue(metric: VitalMetric, p75: number): string {
  if (metric === "CLS") return p75.toFixed(2);
  if (metric === "LCP" || metric === "FCP") return (p75 / 1000).toFixed(2);
  return Math.round(p75).toString();
}

export default function EngineeringDashboard() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [vitals, setVitals] = useState<VitalSummaryItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const [metricsData, projectsData, vitalsData] = await Promise.all([
        safeJson<Metrics>("/api/vercel/metrics"),
        safeJson<{ configured: boolean; projects: ProjectInfo[] }>("/api/vercel/projects"),
        safeJson<{ summary: VitalSummaryItem[] }>("/api/vitals"),
      ]);
      if (cancelled) return;
      if (metricsData) setMetrics(metricsData);
      if (projectsData) setProjects(projectsData.projects);
      if (vitalsData) setVitals(vitalsData.summary);
    };

    load();
    const interval = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!metrics || !metrics.configured) return null;

  const domains = Array.from(new Set(projects.flatMap((p) => p.domains)));
  const stacks = Array.from(
    new Set(projects.map((p) => p.framework).filter((f): f is string => Boolean(f)))
  );

  return (
    <section id="engineering" className="relative py-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.1rem] sm:text-[2.6rem] md:text-[3.30rem] font-black text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t({ pt: "Engenharia em produção", en: "Engineering in production" })}
          </motion.h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto">
            {t({
              pt: "Dados reais, pipeline de deploy, performance e infra.",
              en: "Real data — deploy pipeline, performance and infra.",
            })}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <SpotlightCard className="card-surface-2 relative rounded-3xl backdrop-blur-xl p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />

            {/* Core Web Vitals */}
            {vitals.some((v) => v.sampleCount > 0) && (
              <div className="relative">
                <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2 mb-4">
                  <Activity className="h-4 w-4 text-violet-300" />
                  {t({ pt: "Core Web Vitals (p75, 7 dias)", en: "Core Web Vitals (p75, 7d)" })}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {vitals.map((v) => (
                    <div
                      key={v.metric}
                      className="p-3 rounded-2xl border border-white/10 bg-white/[0.03] text-center"
                    >
                      <div className="text-[11px] font-semibold text-zinc-400">{v.metric}</div>
                      <div
                        className="text-lg font-black text-white tabular-nums mt-1"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {v.sampleCount ? `${formatVitalValue(v.metric, v.p75)}${VITAL_UNITS[v.metric]}` : "—"}
                      </div>
                      {v.rating && (
                        <span
                          className={`mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${RATING_STYLES[v.rating]}`}
                        >
                          {v.rating === "good"
                            ? t({ pt: "bom", en: "good" })
                            : v.rating === "needs-improvement"
                              ? t({ pt: "razoável", en: "needs work" })
                              : t({ pt: "ruim", en: "poor" })}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack + domains */}
            {(stacks.length > 0 || domains.length > 0) && (
              <div className="relative mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                {stacks.map((stack) => (
                  <span
                    key={stack}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300"
                  >
                    <Code2 className="h-3 w-3 text-violet-300" />
                    {stack}
                  </span>
                ))}
                {domains.map((domain) => (
                  <span
                    key={domain}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300"
                  >
                    <Globe className="h-3 w-3 text-fuchsia-300" />
                    {domain}
                  </span>
                ))}
              </div>
            )}
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
