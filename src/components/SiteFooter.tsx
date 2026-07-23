"use client";

import Link from "next/link";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import AnimatedCounter from "./AnimatedCounter";

export default function SiteFooter({
  impactStats,
}: {
  impactStats?: Array<{ value: string; label: Bilingual }>;
}) {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <footer
      className="py-10 border-t border-white/5 text-[11px] text-zinc-400"
      style={{ backgroundColor: "#0a0a0d" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div className="text-center lg:text-left">
          <div>
            © 2026 Francisco Pontes
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 lg:justify-start">
            <Link href="/privacidade" className="text-zinc-400 hover:text-zinc-200 transition-colors">
              {t({ pt: "Privacidade", en: "Privacy" })}
            </Link>
            <span className="text-zinc-700">·</span>
            <Link href="/blog" className="text-zinc-400 hover:text-zinc-200 transition-colors">
              {t({ pt: "Conheça meu blog", en: "Check out my blog" })}
            </Link>
          </div>
        </div>

        {impactStats && impactStats.length > 0 && (
          <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-3 sm:gap-x-8">
            {impactStats.map((stat) => (
              <div key={stat.label.pt} className="text-center">
                <div
                  className="text-lg font-bold text-fuchsia-400"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  <AnimatedCounter value={stat.value} lang={lang} />
                </div>
                <div className="mt-0.5 max-w-[100px] mx-auto whitespace-pre-line text-[9px] uppercase tracking-wide text-zinc-500">
                  {t(stat.label)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
