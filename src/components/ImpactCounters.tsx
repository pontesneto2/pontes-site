"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type CounterItem = {
  label: string;
  value: string;
};

function parseCounterValue(raw: string) {
  const trimmed = raw.trim();
  const suffixMatch = trimmed.match(/[^0-9.]+$/);
  const suffix = suffixMatch ? suffixMatch[0] : "";
  const numericPart = trimmed.replace(/[^0-9.]/g, "");
  const valueNumber = Number(numericPart.replace(/\./g, "")) || 0;
  return { valueNumber, suffix };
}

function formatPtBrInt(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function useTypewriter(text: string, {
  startDelayMs,
  stepMs,
  enabled,
}: {
  startDelayMs: number;
  stepMs: number;
  enabled: boolean;
}) {
  const [visible, setVisible] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setVisible(text);
      return;
    }

    setVisible("");
    let currentIndex = 0;
    let intervalId: number | null = null;
    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        currentIndex += 1;
        setVisible(text.slice(0, currentIndex));
        if (currentIndex >= text.length) {
          if (intervalId) window.clearInterval(intervalId);
          intervalId = null;
        }
      }, stepMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(startTimer);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [enabled, startDelayMs, stepMs, text]);

  return visible;
}

function AnimatedCounter({
  raw,
  start,
  duration,
  active,
}: {
  raw: string;
  start: number;
  duration: number;
  active: boolean;
}) {
  const reducedMotion = useReducedMotion();

  const { valueNumber, suffix } = useMemo(() => parseCounterValue(raw), [raw]);
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(() =>
    reducedMotion ? `${formatPtBrInt(valueNumber)}${suffix}` : "0"
  );

  useMotionValueEvent(value, "change", (latest) => {
    if (reducedMotion) return;
    const rounded = Math.round(latest);
    setDisplay(`${formatPtBrInt(rounded)}${suffix}`);
  });

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setDisplay(`${formatPtBrInt(valueNumber)}${suffix}`);
      return;
    }

    value.set(0);
    const controls = animate(value, valueNumber, {
      duration,
      delay: start,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [active, duration, reducedMotion, start, suffix, value, valueNumber]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-violet-200 to-fuchsia-200">
      {display}
    </span>
  );
}

function CounterCard({
  item,
  index,
}: {
  item: CounterItem;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.65 });

  const baseDelaySec = 0.08 + index * 0.08;
  const label = useTypewriter(item.label, {
    enabled: inView && !reducedMotion,
    startDelayMs: Math.round((baseDelaySec + 0.15) * 1000),
    stepMs: 18,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
      className="rounded-2xl bg-black/30 backdrop-blur-xl px-5 py-4 shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="text-[11px] font-medium tracking-wide text-zinc-500 leading-snug min-h-[2.2em]">
        {label}
      </div>

      <div className="mt-2 text-[28px] sm:text-[30px] font-semibold tabular-nums leading-none">
        <AnimatedCounter
          raw={item.value}
          active={inView}
          start={baseDelaySec}
          duration={0.95}
        />
      </div>
    </motion.div>
  );
}

export default function ImpactCounters({
  className = "",
}: {
  className?: string;
}) {
  const items: CounterItem[] = [
    { value: "12.000+", label: "horas em produção de software" },
    { value: "8+", label: "Soluções SaaS entregues" },
    { value: "150+", label: "Deploys e releases em produção" },
    { value: "4+", label: "Arquiteturas SaaS multi-tenant" },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <CounterCard key={item.label} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
