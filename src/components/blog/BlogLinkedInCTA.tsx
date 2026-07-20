"use client";

import { Linkedin, ArrowUpRight } from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";

export default function BlogLinkedInCTA({ href }: { href: string }) {
  const { lang } = useLanguage();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mt-12 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a66c2]/15 via-violet-500/[0.06] to-transparent p-6 sm:p-7 hover:border-[#0a66c2]/40 transition-colors duration-300"
    >
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#0a66c2]/10 blur-3xl" />

      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0a66c2]/15 border border-[#0a66c2]/30">
        <Linkedin className="h-6 w-6 text-[#4a9eff]" />
      </div>

      <div className="relative flex-1 text-center sm:text-left">
        <p className="text-base font-bold text-white">
          {tr(lang, { pt: "Veja essa publicação no LinkedIn", en: "See this post on LinkedIn" })}
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          {tr(lang, {
            pt: "Confira os comentários e a discussão original da comunidade.",
            en: "Check out the comments and the original discussion from the community.",
          })}
        </p>
      </div>

      <div className="relative inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-4 py-2 text-sm font-semibold text-white group-hover:bg-[#0b74d4] transition-colors">
        {tr(lang, { pt: "Abrir no LinkedIn", en: "Open on LinkedIn" })}
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </a>
  );
}
