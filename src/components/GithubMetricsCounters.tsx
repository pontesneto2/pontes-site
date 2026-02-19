"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Metrics = {
  username: string;
  followers: number | null;
  publicRepos: number | null;
  totalStars: number | null;
  fetchedAt: string;
};

type ApiResponse =
  | { ok: true; metrics: Metrics }
  | { ok: false; error: string; metrics: Metrics };

function formatNumber(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("pt-BR").format(value);
}

function useInViewOnce<T extends Element>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );

    obs.observe(element);
    return () => obs.disconnect();
  }, [isInView, threshold]);

  return { ref, isInView };
}

function animateCount(
  from: number,
  to: number,
  durationMs: number,
  onUpdate: (v: number) => void,
  onDone?: () => void,
) {
  const start = performance.now();
  const delta = to - from;

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = from + delta * eased;
    onUpdate(value);
    if (t < 1) requestAnimationFrame(tick);
    else onDone?.();
  };

  requestAnimationFrame(tick);
}

export default function GithubMetricsCounters({
  username = "pontesneto2",
  className = "",
}: {
  username?: string;
  className?: string;
}) {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>(0.35);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  const [repos, setRepos] = useState<number | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView || loading || metrics) return;

    let cancelled = false;
    setLoading(true);

    fetch(`/api/github-metrics?user=${encodeURIComponent(username)}`)
      .then((r) => r.json() as Promise<ApiResponse>)
      .then((data) => {
        if (cancelled) return;
        if (!data.ok) setError(data.error);
        setMetrics(data.metrics);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Erro ao buscar métricas");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isInView, loading, metrics, username]);

  const targets = useMemo(() => {
    return {
      repos: metrics?.publicRepos ?? null,
      followers: metrics?.followers ?? null,
      stars: metrics?.totalStars ?? null,
    };
  }, [metrics]);

  useEffect(() => {
    if (!metrics) return;

    const duration = 1100;

    if (targets.repos !== null) {
      animateCount(0, targets.repos, duration, (v) => setRepos(Math.round(v)));
    } else {
      setRepos(null);
    }

    if (targets.followers !== null) {
      animateCount(0, targets.followers, duration, (v) =>
        setFollowers(Math.round(v)),
      );
    } else {
      setFollowers(null);
    }

    if (targets.stars !== null) {
      animateCount(0, targets.stars, duration, (v) => setStars(Math.round(v)));
    } else {
      setStars(null);
    }
  }, [metrics, targets.followers, targets.repos, targets.stars]);

  const items = [
    {
      label: "Repositórios",
      value: repos,
    },
    {
      label: "Stars",
      value: stars,
    },
    {
      label: "Seguidores",
      value: followers,
    },
  ] as const;

  return (
    <div ref={ref} className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl px-4 py-4 shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="text-[10px] uppercase tracking-wide text-zinc-500">
              {item.label}
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-violet-200 to-fuchsia-200">
                {loading && metrics === null ? "…" : formatNumber(item.value)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {error ? (
        <div className="mt-2 text-[10px] text-zinc-500">
          Métricas indisponíveis no momento.
        </div>
      ) : null}
    </div>
  );
}
