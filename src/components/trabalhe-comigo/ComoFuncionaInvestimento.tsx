"use client";

import { ShieldCheck, Globe, LayoutDashboard, Smartphone, Clock, type LucideIcon } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

const REFERENCE_TIERS: Array<{
  icon: LucideIcon;
  porte: Bilingual;
  tipo: Bilingual;
  preco: Bilingual;
  hora?: Bilingual;
  prazo: Bilingual;
}> = [
  {
    icon: Globe,
    porte: { pt: "Pequeno", en: "Small" },
    tipo: { pt: "Site estático ou landing page", en: "Static site or landing page" },
    preco: { pt: "R$ 800 – R$ 1.700", en: "R$ 800 – R$ 1,700" },
    prazo: { pt: "7 dias úteis", en: "7 business days" },
  },
  {
    icon: LayoutDashboard,
    porte: { pt: "Médio", en: "Medium" },
    tipo: { pt: "Sistema web: plataforma, painel, área logada", en: "Web system: platform, dashboard, logged area" },
    preco: { pt: "A partir de R$ 2.000", en: "From R$ 2,000" },
    hora: { pt: "ou R$ 70/h", en: "or R$ 70/h" },
    prazo: { pt: "até 60 dias", en: "up to 60 days" },
  },
  {
    icon: Smartphone,
    porte: { pt: "Grande", en: "Large" },
    tipo: { pt: "App mobile, SaaS, marketplace ou multiplataforma", en: "Mobile app, SaaS, marketplace or multiplatform" },
    preco: { pt: "A partir de R$ 3.000", en: "From R$ 3,000" },
    hora: { pt: "ou R$ 70/h", en: "or R$ 70/h" },
    prazo: { pt: "conforme o escopo", en: "based on scope" },
  },
];

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

        <div className="mb-4">
          <div className="mb-3.5 text-center font-mono text-[11px] uppercase tracking-wide text-violet-300">
            {t({ pt: "Faixas de referência por tipo de projeto", en: "Reference ranges by project type" })}
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {REFERENCE_TIERS.map((tier) => (
              <div key={t(tier.porte)} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/35 bg-violet-500/10 text-violet-300">
                    <tier.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-400">{t(tier.porte)}</span>
                </div>
                <div className="mt-3.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-xl font-bold text-transparent">
                  {t(tier.preco)}
                </div>
                {tier.hora && <div className="mt-0.5 font-mono text-[11px] text-zinc-400">{t(tier.hora)}</div>}
                <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10.5px] text-zinc-300">
                  <Clock className="h-3 w-3" />
                  {t(tier.prazo)}
                </div>
                <p className="mt-3 text-[13px] text-zinc-400">{t(tier.tipo)}</p>
              </div>
            ))}
          </div>
          <div className="mt-3.5 flex flex-col gap-2 sm:flex-row">
            <p className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12.5px] text-zinc-400">
              <b className="text-zinc-200">
                {t({ pt: "App e sistema web são projetos diferentes.", en: "App and web system are different projects." })}
              </b>{" "}
              {t({ pt: "Contratar um não obriga ter o outro.", en: "Hiring one doesn't require the other." })}
            </p>
            <p className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12.5px] text-zinc-400">
              {t({
                pt: "São faixas de referência, não valores fechados. Cada projeto vira uma proposta personalizada.",
                en: "These are reference ranges, not fixed prices. Every project becomes a personalized proposal.",
              })}
            </p>
          </div>
        </div>

        <div className="mb-3.5 mt-8 text-center font-mono text-[11px] uppercase tracking-wide text-violet-300">
          {t({ pt: "Modelos de pagamento", en: "Payment models" })}
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
