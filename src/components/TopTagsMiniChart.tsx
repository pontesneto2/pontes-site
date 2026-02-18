"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Item = {
  tag: string;
  count: number;
};

const colorTokens = [
  {
    dot: "bg-violet-400",
    track: "bg-violet-500/10",
    fill: "from-violet-400 to-violet-300",
    glow: "shadow-[0_0_40px_rgba(168,85,247,0.18)]",
  },
  {
    dot: "bg-fuchsia-400",
    track: "bg-fuchsia-500/10",
    fill: "from-fuchsia-400 to-fuchsia-300",
    glow: "shadow-[0_0_40px_rgba(217,70,239,0.16)]",
  },
  {
    dot: "bg-amber-400",
    track: "bg-amber-500/10",
    fill: "from-amber-400 to-amber-300",
    glow: "shadow-[0_0_40px_rgba(251,191,36,0.12)]",
  },
  {
    dot: "bg-violet-300",
    track: "bg-violet-500/10",
    fill: "from-violet-300 to-violet-200",
    glow: "shadow-[0_0_40px_rgba(196,181,253,0.14)]",
  },
  {
    dot: "bg-fuchsia-300",
    track: "bg-fuchsia-500/10",
    fill: "from-fuchsia-300 to-fuchsia-200",
    glow: "shadow-[0_0_40px_rgba(244,114,182,0.14)]",
  },
] as const;

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

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-4 shadow-[0_16px_60px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-zinc-200">
            Top 5 (mais citadas)
          </div>
          <div className="text-[11px] text-zinc-500">
            Toque para ver detalhes
          </div>
        </div>
        <div className="text-[10px] text-zinc-500">Interativo</div>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2 items-end">
        {safeItems.map((item, index) => {
          const color = colorTokens[index % colorTokens.length];
          const heightPct = Math.max(0.18, item.count / maxCount);
          const isActive = activeIndex === index;

          return (
            <button
              key={item.tag}
              type="button"
              className="group relative text-left focus:outline-none"
              onClick={() =>
                setActiveIndex((prev) => (prev === index ? null : index))
              }
              onMouseEnter={() => {
                if (!isMobile) setActiveIndex(index);
              }}
              onMouseLeave={() => {
                if (!isMobile) setActiveIndex(null);
              }}
              aria-label={`${item.tag}: ${item.count}`}
            >
              <div
                className={`relative h-24 w-full rounded-xl ${color.track} border border-white/10 overflow-hidden`}
              >
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${Math.round(heightPct * 100)}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-x-1 bottom-1 rounded-lg bg-gradient-to-b ${color.fill} ${color.glow}`}
                />

                <motion.div
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-2 px-2 py-1 rounded-lg bg-black/70 border border-white/10 text-[10px] text-zinc-200"
                >
                  {item.count}
                </motion.div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${color.dot}`} />
                <span className="text-[10px] text-zinc-300 font-semibold truncate">
                  {item.tag}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-[10px] text-zinc-500">
        {activeIndex === null
          ? "Passe o mouse (desktop) ou toque (mobile)."
          : `${safeItems[activeIndex]?.tag} aparece ${safeItems[activeIndex]?.count}x.`}
      </div>
    </div>
  );
}
