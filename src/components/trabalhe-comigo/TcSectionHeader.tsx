"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/**
 * Cabeçalho de seção centralizado (padrão rosa→âmbar):
 * quadradinho de degradê + rótulo mono roxo, título grande com efeito
 * máquina de escrever + cursor piscando, e subtítulo cinza opcional.
 */
export default function TcSectionHeader({
  label,
  title,
  subtitle,
}: {
  label: Bilingual;
  title: Bilingual;
  subtitle?: Bilingual;
}) {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const full = t(title);
  const [count, setCount] = useState(0);
  const done = count >= full.length;

  useEffect(() => {
    setCount(0);
  }, [lang]);

  useEffect(() => {
    if (!inView || done) return;
    const timer = setTimeout(() => setCount((c) => c + 1), 45);
    return () => clearTimeout(timer);
  }, [inView, count, done]);

  return (
    <div className="mx-auto mb-12 max-w-6xl px-4 text-center">
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-[3px] bg-gradient-to-br from-orange-500 to-amber-400" />
        <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-transparent">
          {t(label)}
        </span>
      </div>
      <h2
        ref={ref}
        className="text-[clamp(1.55rem,3.4vw,2.4rem)] font-bold leading-tight tracking-tight text-white lg:whitespace-nowrap"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {/* Texto real no DOM para SEO e leitores de tela (renderizado no servidor) */}
        <span className="sr-only">{full}</span>
        {/* Animação de máquina de escrever, apenas visual */}
        <span aria-hidden="true">
          {full.slice(0, count)}
          <span className={done ? "typewriter-cursor" : ""} style={{ color: "#fb923c" }}>
            _
          </span>
        </span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-[#a2a2b0]">
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}
