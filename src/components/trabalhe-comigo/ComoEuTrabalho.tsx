"use client";

import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import TcSectionHeader from "./TcSectionHeader";

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
    <section
      id="como-trabalho"
      className="scroll-mt-20 border-y border-white/10 py-20"
      style={{ backgroundColor: "#08080b" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <TcSectionHeader
          label={{ pt: "Como funciona", en: "How it works" }}
          title={{
            pt: "Da escolha da tecnologia à entrega, tudo no papel",
            en: "From choosing the tech to delivery, all on paper",
          }}
          subtitle={{
            pt: "Você escolhe a stack, ou eu escolho a melhor pra você. A tecnologia trabalha a favor do seu produto, nunca o contrário.",
            en: "You choose the stack, or I choose the best one for you. Technology works in favor of your product, never the other way around.",
          }}
        />

        {/* Timeline horizontal */}
        <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative mx-auto min-w-[860px]">
            {/* Linha contínua ligando os nós das pontas */}
            <div
              aria-hidden="true"
              className="absolute left-[8.33%] right-[8.33%] top-[23px] h-px -translate-y-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-55"
            />
            <ol className="relative flex">
              {STEPS.map((step, index) => (
                <li key={t(step.title)} className="flex flex-1 flex-col items-center px-2 text-center">
                  <span
                    className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-bold text-white shadow-[0_8px_22px_-6px_rgba(147,51,234,0.55)]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-4 text-[17px] font-semibold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t(step.title)}
                  </h3>
                  <p className="mt-1.5 max-w-[180px] text-[13.5px] leading-relaxed text-[#9a9aa7]">
                    {t(step.description)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
