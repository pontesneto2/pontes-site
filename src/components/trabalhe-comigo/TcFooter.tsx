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
        className="mx-auto flex max-w-[1160px] flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left"
        style={{ paddingLeft: "clamp(20px,5vw,40px)", paddingRight: "clamp(20px,5vw,40px)" }}
      >
        {/* Assinatura */}
        <span className="text-[13.5px] text-[#8c8c9a]">
          {t({ pt: "Feito à mão · © 2026 Francisco Pontes", en: "Handcrafted · © 2026 Francisco Pontes" })}
        </span>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-[18px] sm:justify-start">
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
