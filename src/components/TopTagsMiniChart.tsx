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
  const chartHeight = 44;
  const chartPadY = 10;

  const safeItems = useMemo(() => {
    return [...items]
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
      .slice(0, 5);
  }, [items]);
  const maxCount = useMemo(
    () => Math.max(1, ...safeItems.map((i) => i.count)),
    [safeItems],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const bars = useMemo(() => {
    const n = Math.max(1, safeItems.length);
    const width = 100;
    const height = chartHeight;
    const padX = isMobile ? 12 : 6;
    const padY = chartPadY;
    const bottom = height - padY;

    const availableW = width - padX * 2;
    const segmentW = n === 1 ? availableW : availableW / n;
    const barW = Math.max(6, segmentW * (isMobile ? 0.62 : 0.54));

    return safeItems.map((item, index) => {
      const centerX = padX + segmentW * (index + 0.5);
      const x = centerX - barW / 2;
      const pct = Math.max(0, Math.min(1, item.count / maxCount));
      const y = padY + (1 - pct) * (height - padY * 2);
      const h = Math.max(0, bottom - y);
      return { x, y, h, w: barW, item };
    });
  }, [safeItems, maxCount, isMobile, chartHeight, chartPadY]);

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-4 shadow-[0_16px_60px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-zinc-200">Top 5</div>
          <div className="text-[11px] text-zinc-500">
            {isMobile ? "Toque nas barras" : "Passe o mouse nas barras"}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white/5 p-3 shadow-[0_14px_50px_rgba(0,0,0,0.35)]">
        <div className="w-full md:max-w-xl mx-auto">
          <div className="relative aspect-[100/22]">
            <svg
              viewBox="0 0 100 44"
              className="h-full w-full text-violet-200/55"
              role="img"
              aria-label="Distribuição das tecnologias mais recorrentes"
            >
              <line
                x1={isMobile ? 12 : 6}
                y1={chartHeight - chartPadY}
                x2={isMobile ? 88 : 94}
                y2={chartHeight - chartPadY}
                stroke="currentColor"
                strokeWidth={1}
                opacity={0.35}
              />

              {bars.map((b, index) => {
                const isActive = activeIndex === index;
                return (
                  <g key={b.item.tag}>
                    <motion.rect
                      initial={{ y: chartHeight - chartPadY, height: 0, opacity: 0 }}
                      whileInView={{ y: b.y, height: b.h, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1],
                        delay: index * (isMobile ? 0.06 : 0.05),
                      }}
                      x={b.x}
                      width={b.w}
                      rx={2.5}
                      fill="currentColor"
                      opacity={isActive ? 0.85 : 0.55}
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
                      aria-label={`${b.item.tag}: ${formatCount(b.item.count)}`}
                    />

                    <rect
                      x={b.x - 2}
                      y={0}
                      width={b.w + 4}
                      height={chartHeight}
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
          </div>

          <div className="mt-3 grid grid-cols-5 gap-1.5 sm:gap-2">
            {safeItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.button
                  key={`${item.tag}-tag`}
                  type="button"
                  className={`min-w-0 w-full text-center rounded-full border px-1.5 sm:px-2 py-1 text-[9px] sm:text-[10px] font-semibold tracking-tight truncate transition-colors ${
                    isActive
                      ? "bg-black/65 border-white/20 text-zinc-100 shadow-[0_12px_30px_rgba(168,85,247,0.14)]"
                      : "bg-black/40 border-white/10 text-zinc-300"
                  }`}
                  animate={{ scale: isActive ? 1.04 : 1 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  title={`${item.tag}: ${formatCount(item.count)}`}
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
                </motion.button>
              );
            })}
          </div>
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
