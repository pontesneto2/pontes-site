"use client";

import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

const STEPS: Array<{ title: Bilingual; description: Bilingual }> = [
  {
    title: { pt: "Descoberta", en: "Discovery" },
    description: {
      pt: "Entendo o problema, o objetivo e o que de fato precisa ser construído.",
      en: "I understand the problem, the goal and what actually needs to be built.",
    },
  },
  {
    title: { pt: "Proposta & contrato", en: "Proposal & contract" },
    description: {
      pt: "Escopo fechado, prazo e valor no papel antes de qualquer linha de código.",
      en: "Fixed scope, timeline and price on paper before a single line of code.",
    },
  },
  {
    title: { pt: "Design & esboço", en: "Design & sketch" },
    description: {
      pt: "Protótipo da interface pra você validar a experiência antes de codar.",
      en: "Interface prototype for you to validate the experience before coding.",
    },
  },
  {
    title: { pt: "Desenvolvimento", en: "Development" },
    description: {
      pt: "Código limpo, testado e versionado, com entregas parciais pra acompanhar.",
      en: "Clean, tested and versioned code, with partial deliveries to track progress.",
    },
  },
  {
    title: { pt: "Deploy & entrega", en: "Deploy & delivery" },
    description: {
      pt: "Em produção, validado, com o código transferido pra você.",
      en: "In production, validated, with the code handed over to you.",
    },
  },
  {
    title: { pt: "Suporte", en: "Support" },
    description: {
      pt: "Garantia pós-entrega e evolução contínua conforme sua necessidade.",
      en: "Post-delivery warranty and continuous evolution as needed.",
    },
  },
];

export default function ComoEuTrabalho() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <section id="como-trabalho" className="scroll-mt-20 border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "Como eu trabalho", en: "How I work" }}
          kicker={{ pt: "Processo previsível, escopo no papel", en: "Predictable process, scope on paper" }}
        />
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <div
              key={t(step.title)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text font-mono text-sm tracking-wide text-transparent">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2 mt-3 text-lg font-semibold text-white">{t(step.title)}</h3>
              <p className="text-sm text-zinc-400">{t(step.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
