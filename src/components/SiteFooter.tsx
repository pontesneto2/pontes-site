"use client";

import Link from "next/link";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

export default function SiteFooter() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <footer
      className="py-10 border-t border-white/5 text-center text-[11px] text-zinc-400"
      style={{ backgroundColor: "#141418" }}
    >
      <div>
        {t({ pt: "Feito à mão", en: "Handmade" })} | © 2026 Francisco Pontes
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Creative Commons BY-NC 4.0
        </a>
        <span className="text-zinc-700">·</span>
        <Link href="/privacidade" className="text-zinc-400 hover:text-zinc-200 transition-colors">
          {t({ pt: "Privacidade", en: "Privacy" })}
        </Link>
        <span className="text-zinc-700">·</span>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {t({ pt: "Hospedado na Vercel", en: "Hosted on Vercel" })}
        </a>
        <span className="text-zinc-700">·</span>
        <Link href="/blog" className="text-zinc-400 hover:text-zinc-200 transition-colors">
          {t({ pt: "Conheça meu blog", en: "Check out my blog" })}
        </Link>
      </div>
    </footer>
  );
}
