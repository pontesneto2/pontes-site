"use client";

import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

export default function SectionHeading({ title, kicker }: { title: Bilingual; kicker: Bilingual }) {
  const { lang } = useLanguage();
  return (
    <div className="mb-12 text-center">
      <h2
        className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {tr(lang, title)}
      </h2>
      <p className="mt-2.5 font-mono text-[10px] font-light uppercase tracking-[0.2em] text-zinc-500">
        {tr(lang, kicker)}
      </p>
    </div>
  );
}
