"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { scrollToId } from "./scroll";
import HeroVisual from "./HeroVisual";

function TypedHeadline({ prefix, suffix }: { prefix: string; suffix: string }) {
  const full = prefix + suffix;
  const [count, setCount] = useState(0);
  const done = count >= full.length;

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => setCount((c) => c + 1), 45);
    return () => clearTimeout(timer);
  }, [count, done]);

  const shownPrefix = prefix.slice(0, Math.min(count, prefix.length));
  const shownSuffix = count > prefix.length ? suffix.slice(0, count - prefix.length) : "";

  return (
    <>
      {shownPrefix}
      <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
        {shownSuffix}
      </span>
      <span className={done ? "typewriter-cursor" : ""} style={{ color: "#e879f9" }}>
        _
      </span>
    </>
  );
}

export default function HeroComercial() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <header className="pt-20 sm:pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 font-mono text-xs text-emerald-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {t({ pt: "Disponível para novos projetos · Remoto", en: "Available for new projects · Remote" })}
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            <TypedHeadline
              key={lang}
              prefix={t({ pt: "Software sob medida, ", en: "Custom software, " })}
              suffix={t({ pt: "da ideia ao lançamento", en: "from idea to launch" })}
            />
          </h1>

          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            {t({
              pt: "Olá, pode me chamar de Francisco. Sistemas, sites, aplicativos e outras soluções digitais construídos por um ",
              en: "Hi, you can call me Francisco. Systems, websites, apps and other digital solutions built by a ",
            })}
            <b className="text-zinc-200">{t({ pt: "Engenheiro de Software", en: "Software Engineer" })}</b>
            {t({
              pt: ". Trabalho com a governança de quem já colocou dezenas de produtos em produção para o governo, fintechs e startups. Entrega rápida, sem terceirização e sem enrolação. Monte sua proposta.",
              en: ". I work with the governance of someone who has already shipped dozens of products to production for government, fintechs and startups. Fast delivery, no outsourcing, no runaround. Build your proposal.",
            })}
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <a
              href="#proposta"
              onClick={(event) => {
                track("trabalhe_comigo_cta_proposta", { source: "hero" });
                scrollToId("proposta")(event);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-all hover:scale-[1.03] hover:bg-zinc-100 hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)]"
            >
              {t({ pt: "Montar minha proposta agora", en: "Build my proposal now" })}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mt-4 lg:mt-0"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
