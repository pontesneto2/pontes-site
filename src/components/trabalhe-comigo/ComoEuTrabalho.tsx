"use client";

import { Layers } from "lucide-react";
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
    <section
      id="como-trabalho"
      className="scroll-mt-20 border-y border-white/10 bg-white/[0.02] py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "Como eu trabalho", en: "How I work" }}
          kicker={{
            pt: "Da escolha da tecnologia à entrega, tudo no papel",
            en: "From choosing the tech to delivery, all on paper",
          }}
        />

        {/* Callout destacado: escolha da stack */}
        <div className="mb-8 flex items-start gap-5 rounded-2xl border border-violet-400/35 bg-gradient-to-b from-violet-500/12 to-transparent p-6 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)]">
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/10 text-violet-300">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              {t({
                pt: "Você escolhe a stack, ou eu escolho a melhor pra você.",
                en: "You choose the stack, or I choose the best one for you.",
              })}
            </h3>
            <p className="max-w-3xl text-sm text-zinc-400">
              {t({
                pt: "Se o seu projeto já exige uma tecnologia específica, eu me adapto a ela sem problema. Se não exige, eu escolho a melhor engenharia para o caso, pensando em performance, manutenção, prazo e custo. A tecnologia trabalha a favor do seu produto, nunca o contrário.",
                en: "If your project already requires a specific technology, I adapt to it without issue. If it doesn't, I pick the best engineering for the case, considering performance, maintenance, timeline and cost. Technology works in favor of your product, never the other way around.",
              })}
            </p>
          </div>
        </div>

        {/* Passos do processo - linha do tempo horizontal */}
        <ol className="grid grid-cols-2 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === STEPS.length - 1;
            return (
              <li key={t(step.title)} className="flex flex-col">
                {/* Nó + linha conectora horizontal */}
                <div className="flex items-center">
                  <span
                    aria-hidden="true"
                    className={`h-px flex-1 ${isFirst ? "opacity-0" : "bg-gradient-to-l from-violet-500/50 to-fuchsia-500/20"}`}
                  />
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-gradient-to-b from-violet-500/15 to-transparent font-mono text-sm font-semibold text-violet-300 shadow-[0_0_20px_-6px_rgba(139,92,246,0.6)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-px flex-1 ${isLast ? "opacity-0" : "bg-gradient-to-r from-violet-500/50 to-fuchsia-500/20"}`}
                  />
                </div>

                {/* Conteúdo */}
                <div className="mt-4 px-3 text-center">
                  <h3 className="text-base font-semibold text-white">{t(step.title)}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">{t(step.description)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
