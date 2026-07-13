"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Flame, ArrowRight } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";
import { scrollToId } from "./scroll";

/* [[VERIFICAR: valores sugeridos com base em mercado — ajuste os reais]] */
const PRECO_DE = "R$ 2.900";
const PRECO_POR = "R$ 1.900";
const PRECO_PARCELA = "12x de R$ 190";

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
    <section id="investimento" className="scroll-mt-20 border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "Como funciona o investimento", en: "How the investment works" }}
          kicker={{ pt: "Transparente, sem letra miúda", en: "Transparent, no fine print" }}
        />

        {/* Hero de preço */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-violet-400/40 bg-gradient-to-b from-violet-500/[0.14] to-transparent p-8 text-center shadow-[0_0_60px_-15px_rgba(168,85,247,0.5)] sm:p-10"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-amber-300">
            <Flame className="h-3.5 w-3.5" />
            {t({ pt: "Condição de lançamento", en: "Launch pricing" })}
          </span>

          <p className="mt-5 text-sm text-zinc-400">
            {t({ pt: "Tire seu projeto do papel a partir de", en: "Get your project off the ground from" })}
          </p>
          <div className="mt-2 flex items-end justify-center gap-3">
            <span className="text-lg font-medium text-zinc-500 line-through">{PRECO_DE}</span>
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-5xl font-extrabold leading-none text-transparent sm:text-6xl">
              {PRECO_POR}
            </span>
          </div>
          <p className="mt-2.5 font-mono text-[13px] text-zinc-400">
            {t({ pt: "ou em até ", en: "or up to " })}
            {PRECO_PARCELA}
          </p>

          <p className="mx-auto mt-5 max-w-md text-[13px] leading-relaxed text-zinc-500">
            {t({
              pt: "Valor de entrada. O valor exato depende do escopo, monte sua proposta com IA e receba a estimativa do seu projeto na hora.",
              en: "Entry price. The exact value depends on scope, build your proposal with AI and get your project's estimate on the spot.",
            })}
          </p>

          <a
            href="#proposta"
            onClick={scrollToId("proposta")}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.03] hover:brightness-110"
          >
            {t({ pt: "Montar minha proposta", en: "Build my proposal" })}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Modelos de orçamento */}
        <div className="mb-3.5 mt-10 text-center font-mono text-[11px] uppercase tracking-wide text-violet-300">
          {t({ pt: "Modelos de orçamento", en: "Budget models" })}
        </div>
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
              <ul className="mt-4 flex flex-col gap-2.5">
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

        {/* Risco */}
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
      </div>
    </section>
  );
}
