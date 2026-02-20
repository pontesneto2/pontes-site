"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/* ── sub‑components ── */

interface SummaryItem {
  label: string;
  value: string;
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

interface BulletSectionProps {
  title: string;
  intro?: string;
  items: string[];
}

interface KpiCard {
  text: string;
}

interface CaseContentProps {
  summary: SummaryItem[];
  intro: string;
  sections: SectionProps[];
  challenges: BulletSectionProps;
  kpis: KpiCard[];
  stack: string[];
}

/* ── section wrapper ── */
function Section({ title, children }: SectionProps) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-16"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{title}</h3>
      <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-6" />
      <div className="text-[15px] sm:text-base text-zinc-400 leading-[1.85] space-y-4">
        {children}
      </div>
    </motion.section>
  );
}

export default function CaseContent({
  summary,
  intro,
  sections,
  challenges,
  kpis,
  stack,
}: CaseContentProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 sm:px-8 py-12 md:py-16">
      {/* ── Resumo Executivo ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-14 grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {summary.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4"
          >
            <span className="block text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-1">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-zinc-200">
              {item.value}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Introdução curta ── */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-14 text-base sm:text-lg text-zinc-400 leading-relaxed border-l-2 border-violet-500/40 pl-5 italic"
      >
        {intro}
      </motion.p>

      {/* ── Seções narrativas ── */}
      {sections.map((sec) => (
        <Section key={sec.title} title={sec.title}>
          {sec.children}
        </Section>
      ))}

      {/* ── Principais Desafios ── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          {challenges.title}
        </h3>
        <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-6" />
        {challenges.intro && (
          <p className="text-[15px] sm:text-base text-zinc-400 leading-[1.85] mb-5">
            {challenges.intro}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {challenges.items.map((item, idx) => (
            <div
              key={item}
              className="group rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5 hover:border-violet-500/30 hover:bg-violet-500/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-xl bg-violet-500/15 border border-violet-500/25 text-violet-200 text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  Desafio
                </span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed group-hover:text-zinc-200 transition-colors">
                {item}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── KPIs Técnicos ── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Indicadores Técnicos Estruturais
        </h3>
        <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {kpis.map((kpi) => (
            <div
              key={kpi.text}
              className="group rounded-xl bg-white/[0.025] border border-white/[0.06] px-5 py-4 hover:border-violet-500/30 hover:bg-violet-500/[0.04] transition-all duration-300"
            >
              <span className="text-sm text-zinc-300 group-hover:text-violet-200 transition-colors">
                {kpi.text}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Stack Utilizada ── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-10"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Stack Utilizada
        </h3>
        <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-6" />
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3.5 py-1.5 rounded-full bg-zinc-800/60 text-zinc-300 border border-zinc-700/50 font-medium hover:border-violet-500/30 hover:text-violet-200 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
