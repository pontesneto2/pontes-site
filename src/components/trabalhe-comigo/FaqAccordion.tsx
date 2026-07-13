"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import TcSectionHeader from "./TcSectionHeader";
import { FAQ_ITEMS } from "./faq-data";

function renderAnswer(text: string) {
  const idx = text.indexOf(".");
  if (idx === -1) return text;
  const first = text.slice(0, idx + 1);
  const rest = text.slice(idx + 1);
  return (
    <>
      <strong className="font-semibold text-[#e3e3ea]">{first}</strong>
      {rest}
    </>
  );
}

export default function FaqAccordion() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-white/10 py-20" style={{ backgroundColor: "#08080b" }}>
      <div className="mx-auto max-w-7xl px-6">
        <TcSectionHeader
          label={{ pt: "FAQ", en: "FAQ" }}
          title={{ pt: "Tudo que você precisa saber antes de conversar", en: "Everything you need to know before we talk" }}
        />

        <div className="mx-auto max-w-[820px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.015]">
          {FAQ_ITEMS.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={t(item.question)}
                className={index !== FAQ_ITEMS.length - 1 ? "border-b border-white/[0.07]" : ""}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left transition-colors hover:bg-white/[0.03]"
                >
                  <span className="text-[16.5px] font-medium text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {t(item.question)}
                  </span>
                  <ChevronDown
                    className="h-5 w-5 flex-none transition-transform duration-200"
                    style={{ color: "#c9a6ff", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                {open && (
                  <p className="animate-fade-up max-w-[640px] px-5 pb-5 text-[15px] leading-relaxed text-[#b3b3c0]">
                    {renderAnswer(t(item.answer))}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
