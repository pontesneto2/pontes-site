"use client";

import { ShieldCheck } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

const PLANS: Array<{
  featured?: boolean;
  flag?: Bilingual;
  name: Bilingual;
  price: Bilingual;
  priceSuffix: Bilingual;
  note: Bilingual;
  items: Bilingual[];
}> = [
  {
    featured: true,
    flag: { pt: "MAIS ESCOLHIDO", en: "MOST CHOSEN" },
    name: { pt: "Pacote por projeto", en: "Project package" },
    price: { pt: "Orçamento", en: "Quote" },
    priceSuffix: { pt: "fechado", en: "fixed" },
    note: { pt: "definido na proposta", en: "defined in the proposal" },
    items: [
      { pt: "Escopo e valor fechados no contrato", en: "Fixed scope and price in the contract" },
      { pt: "50% no início · 50% na entrega", en: "50% upfront · 50% on delivery" },
      { pt: "Prazo definido e previsível", en: "Fixed and predictable timeline" },
      { pt: "Você recebe a solução pronta pra usar", en: "You receive a ready-to-use solution" },
    ],
  },
  {
    name: { pt: "Por hora", en: "Hourly" },
    price: { pt: "Sob", en: "By" },
    priceSuffix: { pt: "conversa", en: "quote" },
    note: { pt: "conforme o volume de horas", en: "based on the volume of hours" },
    items: [
      { pt: "Ideal para ajustes e consultoria", en: "Ideal for tweaks and consulting" },
      { pt: "Escopo aberto ou evolutivo", en: "Open or evolving scope" },
      { pt: "Valor melhora quanto maior a dedicação", en: "Better rates with more dedication" },
      { pt: "Sem compromisso de longo prazo", en: "No long-term commitment" },
    ],
  },
  {
    name: { pt: "Mensal / evolução", en: "Monthly / retainer" },
    price: { pt: "Sob", en: "By" },
    priceSuffix: { pt: "conversa", en: "quote" },
    note: { pt: "parceria contínua", en: "ongoing partnership" },
    items: [
      { pt: "Evolução contínua do produto", en: "Continuous product evolution" },
      { pt: "Prioridade no atendimento", en: "Priority support" },
      { pt: "Manutenção e novas features", en: "Maintenance and new features" },
      { pt: "Parceria de longo prazo", en: "Long-term partnership" },
    ],
  },
];

export default function ComoFuncionaInvestimento() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <section id="investimento" className="scroll-mt-20 border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "Como funciona o investimento", en: "How the investment works" }}
          kicker={{ pt: "Transparente, sem letra miúda", en: "Transparent, no fine print" }}
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={t(plan.name)}
              className={`relative rounded-2xl border p-7 ${
                plan.featured
                  ? "border-violet-400/35 bg-gradient-to-b from-violet-500/10 to-transparent"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {plan.flag && (
                <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2.5 py-1 font-mono text-[10px] font-semibold text-zinc-950">
                  {t(plan.flag)}
                </span>
              )}
              <div className="font-mono text-xs uppercase tracking-wide text-zinc-400">{t(plan.name)}</div>
              <div className="mt-3.5 text-3xl font-bold text-white">
                {t(plan.price)}{" "}
                <small className="font-mono text-sm font-normal text-zinc-400">{t(plan.priceSuffix)}</small>
              </div>
              <div className="mt-1 font-mono text-[11px] text-violet-300">{t(plan.note)}</div>
              <ul className="mt-4.5 flex flex-col gap-2.5">
                {plan.items.map((item) => (
                  <li key={t(item)} className="relative pl-4 text-sm text-zinc-400">
                    <span className="absolute left-0 text-fuchsia-400">•</span>
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-violet-400/35 bg-gradient-to-r from-violet-500/10 to-transparent p-5 sm:flex-row">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/10 text-violet-300">
            <ShieldCheck className="h-[22px] w-[22px]" />
          </div>
          <p className="text-center text-sm text-zinc-400 sm:text-left">
            <b className="text-white">{t({ pt: "O risco é meu, não seu.", en: "The risk is mine, not yours." })}</b>{" "}
            {t({
              pt: "Você paga 50% para começar e só solta a outra metade quando a solução está entregue e funcionando.",
              en: "You pay 50% to start and only release the rest when the solution is delivered and working.",
            })}
          </p>
        </div>

        <p className="mt-4 font-mono text-xs text-zinc-500">
          {t({
            pt: "Quer uma estimativa agora? Use o gerador de proposta com IA.",
            en: "Want an estimate now? Use the AI proposal generator.",
          })}
        </p>
      </div>
    </section>
  );
}
