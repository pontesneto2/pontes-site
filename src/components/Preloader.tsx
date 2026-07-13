"use client";

import { useEffect, useState } from "react";

type Variant = "orange" | "purple";

const VARIANTS: Record<Variant, { box: string; bar: string; glow: string }> = {
  // Laranja (detalhe da marca) — usado na /trabalhe-comigo
  orange: {
    box: "from-orange-500 to-amber-400",
    bar: "from-orange-500 to-amber-400",
    glow: "rgba(249,115,22,0.5)",
  },
  // Roxo (primário da marca) — usado na home fcopts.com.br
  purple: {
    box: "from-violet-600 to-fuchsia-500",
    bar: "from-violet-500 to-fuchsia-500",
    glow: "rgba(139,92,246,0.55)",
  },
};

/**
 * Pré-loader de página cheia: wordmark "fcopts_" num quadro em degradê da marca
 * + barra de progresso dinâmica. Sobe até ~90% de forma simulada e completa em
 * 100% quando a página termina de carregar, com fade-out. Respeita
 * prefers-reduced-motion. Variante de cor por página.
 */
export default function Preloader({ variant = "orange" }: { variant?: Variant }) {
  const v = VARIANTS[variant];
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setProgress(100);
      const t = setTimeout(() => setHidden(true), 120);
      return () => clearTimeout(t);
    }

    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + Math.random() * 11 + 4, 90);
      setProgress(current);
    }, 130);

    let fadeTimer: ReturnType<typeof setTimeout>;
    const finish = () => {
      clearInterval(interval);
      setProgress(100);
      fadeTimer = setTimeout(() => setHidden(true), 420);
    };

    let maxTimer: ReturnType<typeof setTimeout>;
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      // Teto curto para não atrasar o conteúdo (LCP): some em no máx. 1,8s.
      maxTimer = setTimeout(finish, 1800);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const t = setTimeout(() => setMounted(false), 500);
    return () => clearTimeout(t);
  }, [hidden]);

  useEffect(() => {
    if (mounted && !hidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted, hidden]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#08080b" }}
    >
      <div
        className={`flex h-28 w-28 items-center justify-center rounded-[26px] bg-gradient-to-br text-[17px] font-bold tracking-tight text-white ${v.box}`}
        style={{ fontFamily: "var(--font-space-grotesk)", boxShadow: `0 0 45px -8px ${v.glow}` }}
      >
        fcopts
        <span className="typewriter-cursor">_</span>
      </div>

      <div className="h-1 w-52 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-[width] duration-200 ease-out ${v.bar}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="font-mono text-[11px] tracking-wide text-zinc-500">{Math.round(progress)}%</div>
    </div>
  );
}
