"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/lib/experience-data";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

const BATCH_SIZE = 3;
const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ExperienceTimeline() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const hasMore = visibleCount < EXPERIENCE.length;

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute left-[9px] top-4 bottom-4 w-px bg-gradient-to-b from-violet-400/50 via-violet-400/15 to-transparent" />

      <div className="space-y-4">
        {EXPERIENCE.map((exp, index) => {
          const isLatest = index === 0;
          const isOpen = openIndex === index;
          const hasExtras = Boolean(exp.remote || exp.languages || exp.contractType);

          return (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easeOut, delay: (index % BATCH_SIZE) * 0.12 }}
              className={`relative pl-8 ${index >= visibleCount ? "hidden" : ""}`}
            >
              <span className="absolute left-0 top-5 flex h-[19px] w-[19px] items-center justify-center">
                {isLatest ? (
                  <>
                    <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-400" />
                  </>
                ) : (
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full border transition-colors duration-300 ${
                      isOpen ? "bg-violet-400 border-violet-400" : "bg-transparent border-violet-400/50"
                    }`}
                  />
                )}
              </span>

              <div
                className={`rounded-2xl border bg-white/[0.03] transition-colors duration-300 ${
                  isOpen ? "border-violet-500/40 bg-violet-500/[0.04]" : "border-white/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-2 sm:gap-3 px-4 py-3.5 sm:px-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-sm text-white truncate">{exp.company}</span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-violet-300/80">
                      <span className="inline-flex items-center gap-1 truncate">
                        <Briefcase className="h-3 w-3 shrink-0" />
                        <span className="truncate">{t(exp.role)}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 truncate">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{exp.location}</span>
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span className="text-[13px] text-violet-300 bg-violet-500/10 px-2 py-1 rounded-full border border-violet-500/20 font-semibold whitespace-nowrap">
                      {exp.period}
                    </span>
                    {isLatest ? (
                      <span className="hidden xs:inline text-[13px] text-violet-200 bg-violet-500/15 px-2 py-1 rounded-full border border-violet-500/25 font-semibold whitespace-nowrap">
                        {t({ pt: "Mais recente", en: "Most recent" })}
                      </span>
                    ) : null}
                    <ChevronDown
                      className={`h-4 w-4 text-violet-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-white/[0.06]">
                        {exp.startRole ? (
                          <p className="text-[13px] text-zinc-400">
                            {t({ pt: "Cargo Inicial", en: "Starting Role" })}: {t(exp.startRole)}
                          </p>
                        ) : null}
                        {hasExtras ? (
                          <div className="flex flex-wrap items-center gap-1.5 mt-3">
                            {exp.remote ? (
                              <span className="text-[13px] text-fuchsia-300 bg-fuchsia-500/10 px-2 py-1 rounded-full border border-fuchsia-500/20 font-semibold">
                                {t({ pt: "Remoto", en: "Remote" })}
                              </span>
                            ) : null}
                            {exp.languages ? (
                              <span className="text-[13px] text-zinc-300 bg-white/5 px-2 py-1 rounded-full border border-white/10 font-semibold">
                                {exp.languages}
                              </span>
                            ) : null}
                            {exp.contractType ? (
                              <span className="text-[13px] text-zinc-300 bg-white/5 px-2 py-1 rounded-full border border-white/10 font-semibold">
                                {t(exp.contractType)}
                              </span>
                            ) : null}
                          </div>
                        ) : null}
                        {exp.description ? (
                          <p className="text-[13px] text-zinc-400 leading-relaxed mt-3 pt-3 border-t border-white/[0.06]">
                            {t(exp.description)}
                          </p>
                        ) : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {hasMore ? (
        <div className="mt-6 flex justify-center pl-8">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => Math.min(c + BATCH_SIZE, EXPERIENCE.length))}
            className="min-h-[44px] px-4 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
          >
            {t({ pt: "Ver mais experiências", en: "Show more experience" })}
          </button>
        </div>
      ) : null}
    </div>
  );
}
