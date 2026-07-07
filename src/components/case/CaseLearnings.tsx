"use client";

import { motion } from "framer-motion";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

interface CaseLearningsProps {
  items: Bilingual[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const chip = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export default function CaseLearnings({ items }: CaseLearningsProps) {
  const { lang } = useLanguage();

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="mx-auto max-w-3xl px-6 pb-16"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
        {tr(lang, { pt: "O que este projeto me ensinou", en: "What this project taught me" })}
      </h3>
      <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-8" />

      <motion.div variants={container} className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <motion.span
            key={item.pt}
            variants={chip}
            className="text-[13px] px-4 py-2 rounded-xl bg-violet-500/[0.08] text-violet-200 border border-violet-500/20 font-medium hover:bg-violet-500/[0.15] hover:scale-[1.04] hover:border-violet-400/40 transition-all duration-200 cursor-default"
          >
            {tr(lang, item)}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}
