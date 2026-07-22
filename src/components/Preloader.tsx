"use client";

import { useEffect, useState } from "react";
import SpinnerRing from "@/components/SpinnerRing";

/**
 * Pré-loader de página cheia: apenas o anel de loading unificado,
 * sobre um fundo escuro. Some quando a página termina de carregar
 * (com teto curto para não atrasar o conteúdo/LCP). Respeita
 * prefers-reduced-motion.
 */
export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const t = setTimeout(() => setHidden(true), 120);
      return () => clearTimeout(t);
    }

    let fadeTimer: ReturnType<typeof setTimeout>;
    const finish = () => {
      fadeTimer = setTimeout(() => setHidden(true), 200);
    };

    let maxTimer: ReturnType<typeof setTimeout>;
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      maxTimer = setTimeout(finish, 1800);
    }

    return () => {
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
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#08080b" }}
    >
      <SpinnerRing size="lg" />
    </div>
  );
}
