"use client";

import { Plus } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";
import { FAQ_ITEMS } from "./faq-data";

function renderAnswer(text: string) {
  const idx = text.indexOf(".");
  if (idx === -1) return text;
  const first = text.slice(0, idx + 1);
  const rest = text.slice(idx + 1);
  return (
    <>
      <strong className="font-semibold text-violet-200">{first}</strong>
      {rest}
    </>
  );
}

export default function FaqAccordion() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-white/10 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          title={{ pt: "Perguntas frequentes", en: "Frequently asked questions" }}
          kicker={{ pt: "Tudo que você precisa saber antes de conversar", en: "Everything you need to know before we talk" }}
        />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={t(item.question)}
              className={`group cursor-pointer bg-white/[0.04] p-5 ${index !== FAQ_ITEMS.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <summary className="flex list-none items-center justify-between gap-4 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                {t(item.question)}
                <Plus className="h-5 w-5 shrink-0 text-fuchsia-400 transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3.5 max-w-3xl text-sm text-zinc-400">{renderAnswer(t(item.answer))}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
