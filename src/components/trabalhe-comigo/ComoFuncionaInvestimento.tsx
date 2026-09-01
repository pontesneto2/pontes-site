"use client";

import { Star } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import TcSectionHeader from "./TcSectionHeader";
import Reveal from "./Reveal";

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
    name: { pt: "Orçamento fixo", en: "Fixed budget" },
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
    name: { pt: "Orçamento por hora", en: "Hourly budget" },
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
    name: { pt: "Orçamento mensal / evolução", en: "Monthly budget / retainer" },
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
    <section id="investimento" className="scroll-mt-20 border-t border-white/10 py-20" style={{ backgroundColor: "#101018" }}>
      <div className="mx-auto max-w-7xl px-6">
        <TcSectionHeader
          label={{ pt: "Investimento", en: "Investment" }}
          title={{ pt: "Como funciona o investimento", en: "How the investment works" }}
          subtitle={{ pt: "Transparente, sem letra miúda", en: "Transparent, no fine print" }}
        />

        {/* Modelos de contratação */}
        <Reveal className="mb-3.5 mt-10 text-center font-mono text-[13px] uppercase tracking-wide text-violet-300">
          {t({ pt: "Modelos de contratação", en: "Engagement models" })}
        </Reveal>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={t(plan.name)} delay={i * 0.08}>
            <div
              className={`relative rounded-2xl border p-7 transition-transform duration-200 hover:scale-[1.02] ${
                plan.featured
                  ? "border-violet-400/50 bg-gradient-to-br from-violet-700 via-purple-800 to-purple-950 shadow-[0_14px_44px_-26px_rgba(147,51,234,0.45)] ring-1 ring-inset ring-white/10"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {plan.flag && (
                <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-1 font-mono text-[13px] font-bold uppercase tracking-wide text-orange-950 shadow-[0_0_20px_-2px_rgba(245,158,11,0.9)] ring-1 ring-white/40">
                  <Star className="h-3 w-3 fill-orange-950 text-orange-950" />
                  {t(plan.flag)}
                </span>
              )}
              <div
                className={`font-mono text-xs uppercase tracking-wide ${
                  plan.featured ? "text-violet-200" : "text-zinc-400"
                }`}
              >
                {t(plan.name)}
              </div>
              <div className="mt-3.5 text-3xl font-bold text-white">
                {t(plan.price)}{" "}
                <small
                  className={`font-mono text-sm font-normal ${
                    plan.featured ? "text-violet-200/80" : "text-zinc-400"
                  }`}
                >
                  {t(plan.priceSuffix)}
                </small>
              </div>
              <div
                className={`mt-1 font-mono text-[13px] ${
                  plan.featured ? "text-violet-200" : "text-violet-300"
                }`}
              >
                {t(plan.note)}
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {plan.items.map((item) => (
                  <li
                    key={t(item)}
                    className={`relative pl-4 text-sm ${
                      plan.featured ? "text-violet-50" : "text-zinc-400"
                    }`}
                  >
                    <span className={`absolute left-0 ${plan.featured ? "text-fuchsia-300" : "text-fuchsia-400"}`}>
                      •
                    </span>
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
