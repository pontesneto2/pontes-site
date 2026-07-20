"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Typewriter from "@/components/blog/Typewriter";
import { useLanguage, tr } from "@/lib/language-context";

interface BlogHeroProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
}

export default function BlogHero({ title, description, date, tags, readingMinutes }: BlogHeroProps) {
  const { lang } = useLanguage();
  const formattedDate = new Date(date).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden pt-10 pb-10 md:pt-12 md:pb-12">
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
      <div className="mx-auto max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400"
        >
          {tr(lang, { pt: "Blog", en: "Blog" })}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-mono text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15]"
        >
          <Typewriter className="text-white" text={title} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-400"
        >
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {readingMinutes} min {lang === "pt" ? "de leitura" : "read"}
          </span>
        </motion.div>

        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-3 py-1 text-[11px] font-medium text-violet-300"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>
      </div>
    </section>
  );
}
