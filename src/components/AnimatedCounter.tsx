"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Extrai valor numérico + sufixo (%, +) de strings já formatadas como "16+", "36.750+", "99.7%". */
function parseStatValue(raw: string) {
  const suffixMatch = raw.match(/[%+]$/);
  const suffix = suffixMatch ? suffixMatch[0] : "";
  const numPart = suffix ? raw.slice(0, -suffix.length) : raw;

  if (suffix === "%") {
    const target = parseFloat(numPart.replace(",", "."));
    const decimals = /[.,]/.test(numPart) ? 1 : 0;
    return { target: Number.isNaN(target) ? null : target, decimals, suffix };
  }

  const target = parseInt(numPart.replace(/[.,]/g, ""), 10);
  return { target: Number.isNaN(target) ? null : target, decimals: 0, suffix };
}

const EASE_OUT_QUAD = (t: number) => t * (2 - t);

export default function AnimatedCounter({
  value,
  lang,
  duration = 1200,
}: {
  value: string;
  lang: "pt" | "en";
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState<string | null>(null);

  const parsed = parseStatValue(value);

  useEffect(() => {
    if (!inView || parsed.target === null) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const current = parsed.target! * EASE_OUT_QUAD(progress);
      const formatted =
        parsed.decimals > 0
          ? current.toFixed(parsed.decimals)
          : Math.round(current).toLocaleString(lang === "pt" ? "pt-BR" : "en-US");
      setDisplay(`${formatted}${parsed.suffix}`);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, value]);

  return <span ref={ref}>{display ?? (parsed.target === null ? value : "0")}</span>;
}
