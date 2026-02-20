"use client";

import { motion } from "framer-motion";

interface CaseHeroProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export default function CaseHero({
  title,
  subtitle,
  description,
  tags,
}: CaseHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-indigo-950/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_50%_0%,rgba(124,58,237,0.25),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400"
        >
          Estudo de Caso
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200">
            {title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-lg sm:text-xl text-zinc-400 font-light"
        >
          {subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 text-sm sm:text-base text-zinc-500 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Stack tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
