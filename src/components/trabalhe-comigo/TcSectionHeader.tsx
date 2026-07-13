"use client";

import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/**
 * Cabeçalho de seção centralizado (padrão rosa→âmbar):
 * quadradinho de degradê + rótulo mono roxo, título grande e subtítulo cinza.
 */
export default function TcSectionHeader({
  label,
  title,
  subtitle,
}: {
  label: Bilingual;
  title: Bilingual;
  subtitle?: Bilingual;
}) {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-[3px] bg-gradient-to-br from-rose-500 to-amber-500" />
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#9a7cff]">
          {t(label)}
        </span>
      </div>
      <h2
        className="text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-tight tracking-tight text-white"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {t(title)}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-relaxed text-[#a2a2b0]">
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}
