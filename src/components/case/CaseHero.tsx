"use client";

import { motion } from "framer-motion";
import TechIcon from "@/components/case/TechIcon";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

interface CaseHeroProps {
  title: Bilingual;
  subtitle: Bilingual;
  description: Bilingual;
  tags: string[];
}

export default function CaseHero({
  title,
  subtitle,
  description,
  tags,
}: CaseHeroProps) {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-indigo-950/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_50%_0%,rgba(124,58,237,0.25),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400"
        >
          {tr(lang, { pt: "Estudo de Caso", en: "Case Study" })}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200">
            {tr(lang, title)}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3 text-lg sm:text-xl text-zinc-200 font-medium"
        >
          {tr(lang, subtitle)}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 text-sm sm:text-base text-zinc-400 max-w-3xl mx-auto leading-relaxed"
        >
          {tr(lang, description)}
        </motion.p>

        {/* Stack — somente ícones, sem legenda/fundo, com nome no hover */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-1"
        >
          {tags.map((tag) => (
            <TechIcon key={tag} tag={tag} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
