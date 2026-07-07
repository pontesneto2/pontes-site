"use client";

import { motion } from "framer-motion";
import {
  Box,
  Braces,
  Code,
  Database,
  MonitorSmartphone,
  Palette,
  Server,
} from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

interface CaseHeroProps {
  title: Bilingual;
  subtitle: Bilingual;
  description: Bilingual;
  tags: string[];
}

function TechGlyph({ tag }: { tag: string }) {
  const normalized = tag.trim().toLowerCase();

  const Icon = (() => {
    if (
      normalized.includes("postgres") ||
      normalized.includes("postgre") ||
      normalized.includes("mongo") ||
      normalized.includes("prisma")
    )
      return Database;

    if (normalized.includes("docker")) return Box;

    if (
      normalized === "js" ||
      normalized.includes("javascript") ||
      normalized.includes("typescript")
    )
      return Braces;

    if (normalized.includes("next") || normalized.includes("react"))
      return MonitorSmartphone;

    if (normalized.includes("tailwind") || normalized.includes("ux"))
      return Palette;

    if (normalized.includes("node") || normalized.includes("express") || normalized.includes("nest"))
      return Server;

    return Code;
  })();

  return (
    <span className="inline-flex items-center justify-center h-5 w-5 rounded-md bg-white/[0.06] border border-white/[0.10] text-zinc-100">
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
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

        {/* Stack tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 text-[11px] pl-2.5 pr-3 py-1.5 rounded-full bg-white/[0.05] text-zinc-100 border border-white/[0.10] font-semibold hover:bg-white/[0.07] hover:border-violet-500/25 transition-colors"
            >
              <TechGlyph tag={tag} />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
