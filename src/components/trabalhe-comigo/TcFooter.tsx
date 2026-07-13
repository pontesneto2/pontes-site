"use client";

import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { scrollToId } from "./scroll";

export default function TcFooter() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const linkClass = "text-[13px] text-[#8c8c9a] transition-colors hover:text-white";

  return (
    <footer className="border-t border-white/[0.06]" style={{ backgroundColor: "#08080b" }}>
      <div
        className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4 py-8"
        style={{ paddingLeft: "clamp(20px,5vw,40px)", paddingRight: "clamp(20px,5vw,40px)" }}
      >
        {/* Assinatura */}
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 text-[13px] font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            F
          </span>
          <span className="text-[13.5px] text-[#8c8c9a]">
            {t({ pt: "Feito à mão · © 2026 Francisco Pontes", en: "Handcrafted · © 2026 Francisco Pontes" })}
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-[18px]">
          <a href="https://fcopts.com.br/privacidade" target="_blank" rel="noopener noreferrer" className={linkClass}>
            {t({ pt: "Privacidade", en: "Privacy" })}
          </a>
          <a href="#proposta" onClick={scrollToId("proposta")} className={linkClass}>
            {t({ pt: "Montar proposta", en: "Build a proposal" })}
          </a>
          <a href="https://wa.me/5585981888896" target="_blank" rel="noopener noreferrer" className={linkClass}>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
