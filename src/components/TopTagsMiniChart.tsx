"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Item = {
  tag: string;
  count: number;
};

function formatCount(count: number) {
  return `${count} ${count === 1 ? "projeto" : "projetos"}`;
}

export default function TopTagsMiniChart({
  items,
  isMobile,
}: {
  items: Item[];
  isMobile: boolean;
}) {
  const safeItems = items.slice(0, 5);
  const maxCount = useMemo(
    () => Math.max(1, ...safeItems.map((i) => i.count)),
    [safeItems],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const points = useMemo(() => {
    const n = Math.max(1, safeItems.length);
    const width = 100;
    const height = 44;
    const padX = 6;
    const padY = 6;

    return safeItems.map((item, index) => {
      const x = n === 1 ? width / 2 : padX + (index / (n - 1)) * (width - padX * 2);
      const pct = Math.max(0, Math.min(1, item.count / maxCount));
      const y = padY + (1 - pct) * (height - padY * 2);
      return { x, y, item };
    });
  }, [safeItems, maxCount]);

  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(" ");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const bottom = 44 - 6;
    const start = points[0];
    const end = points[points.length - 1];
    return `${linePath} L${end.x.toFixed(2)},${bottom.toFixed(2)} L${start.x.toFixed(2)},${bottom.toFixed(2)} Z`;
  }, [points, linePath]);

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-4 shadow-[0_16px_60px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-zinc-200">Top 5 (stack)</div>
          <div className="text-[11px] text-zinc-500">
            {isMobile ? "Toque nos pontos" : "Passe o mouse nos pontos"}
          </div>
        </div>
        <div className="text-[10px] text-zinc-500">Sutil</div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
        <svg
          viewBox="0 0 100 44"
          className="h-12 w-full text-violet-300/80"
          role="img"
          aria-label="Distribuição das tecnologias mais recorrentes"
        >
          <defs>
            <linearGradient id="sparkArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#sparkArea)" />

          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
          />

          {points.map((p, index) => {
            const isActive = activeIndex === index;
            return (
              <g key={p.item.tag}>
                <motion.circle
                  initial={{ r: 0 }}
                  whileInView={{ r: 3.2 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  cx={p.x}
                  cy={p.y}
                  r={3.2}
                  className={isActive ? "text-violet-200" : "text-violet-300/80"}
                  fill="currentColor"
                  onMouseEnter={() => {
                    if (!isMobile) setActiveIndex(index);
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) setActiveIndex(null);
                  }}
                  onClick={() =>
                    setActiveIndex((prev) => (prev === index ? null : index))
                  }
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.item.tag}: ${formatCount(p.item.count)}`}
                />

                <circle
                  cx={p.x}
                  cy={p.y}
                  r={7}
                  fill="transparent"
                  onMouseEnter={() => {
                    if (!isMobile) setActiveIndex(index);
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) setActiveIndex(null);
                  }}
                  onClick={() =>
                    setActiveIndex((prev) => (prev === index ? null : index))
                  }
                />
              </g>
            );
          })}
        </svg>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          {safeItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={item.tag}
                type="button"
                className={`text-[10px] font-semibold tracking-tight transition-colors ${
                  isActive
                    ? "text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() =>
                  setActiveIndex((prev) => (prev === index ? null : index))
                }
                onMouseEnter={() => {
                  if (!isMobile) setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  if (!isMobile) setActiveIndex(null);
                }}
              >
                {item.tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 text-[10px] text-zinc-500">
        {activeIndex === null
          ? "Tecnologias mais recorrentes no portfólio."
          : `${safeItems[activeIndex]?.tag} fez parte da stack em ${formatCount(
              safeItems[activeIndex]?.count ?? 0,
            )}.`}
      </div>
    </div>
  );
}
