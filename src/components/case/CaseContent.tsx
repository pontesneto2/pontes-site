"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  Box,
  Braces,
  Code,
  Database,
  MonitorSmartphone,
  Palette,
  Server,
} from "lucide-react";

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

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
  kpisVariant?: "bullets" | "grid";
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
  kpisVariant = "bullets",
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
        {kpisVariant === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {kpis.map((kpi) => (
              <div
                key={kpi.text}
                className="group rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5 hover:border-violet-500/30 hover:bg-violet-500/[0.04] transition-all duration-300"
              >
                <p className="text-sm text-zinc-300 leading-relaxed group-hover:text-zinc-200 transition-colors">
                  {kpi.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {kpis.map((kpi) => (
              <li key={kpi.text} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                <span className="text-[15px] sm:text-base text-zinc-300 leading-relaxed">
                  {kpi.text}
                </span>
              </li>
            ))}
          </ul>
        )}
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
              className="inline-flex items-center gap-2 text-[11px] pl-2.5 pr-3 py-1.5 rounded-full bg-white/[0.05] text-zinc-100 border border-white/[0.10] font-semibold hover:bg-white/[0.07] hover:border-violet-500/25 transition-colors"
            >
              <TechGlyph tag={tech} />
              {tech}
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
