"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import TcSectionHeader from "./TcSectionHeader";
import Reveal from "./Reveal";
import { scrollToId } from "./scroll";

function FlameGradient({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="flame-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <path
        d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
        fill="url(#flame-orange)"
        stroke="url(#flame-orange)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PRECO_DE = "R$ 1.500";
const PRECO_POR = "R$ 800";
const PRECO_PARCELA = "10x de R$ 80";

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

  // Entrada coreografada do card de preço: risca o valor antigo e revela o novo.
  const priceRef = useRef<HTMLDivElement>(null);
  const priceInView = useInView(priceRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const show = priceInView || !!reduce;
  const d = (n: number) => (reduce ? 0 : n); // atrasos zerados em reduced-motion

  return (
    <section id="investimento" className="scroll-mt-20 border-t border-white/10 py-20" style={{ backgroundColor: "#101018" }}>
      <div className="mx-auto max-w-7xl px-6">
        <TcSectionHeader
          label={{ pt: "Investimento", en: "Investment" }}
          title={{ pt: "Como funciona o investimento", en: "How the investment works" }}
          subtitle={{ pt: "Transparente, sem letra miúda", en: "Transparent, no fine print" }}
        />

        {/* Hero de preço */}
        <motion.div
          ref={priceRef}
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mx-auto overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-700 via-fuchsia-700 to-purple-800 p-6 text-center shadow-[0_14px_44px_-22px_rgba(147,51,234,0.4)] sm:p-9 lg:max-w-[60%]"
        >
          {/* Etiqueta diagonal */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-62px] top-[30px] w-[240px] rotate-45 bg-orange-400 py-1.5 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-orange-950 shadow-lg"
          >
            {t({ pt: "Oferta por tempo limitado", en: "Limited time offer" })}
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-300/50 bg-fuchsia-400/15 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-fuchsia-50 shadow-[0_0_14px_-6px_rgba(251,191,36,0.4)]">
            <FlameGradient className="h-3.5 w-3.5 drop-shadow-[0_0_6px_rgba(251,146,60,0.8)]" />
            {t({ pt: "Condição de lançamento", en: "Launch pricing" })}
          </span>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: d(0.2) }}
            className="mt-5 text-sm text-violet-100"
          >
            {t({ pt: "Tire seu projeto do papel a partir de", en: "Get your project off the ground from" })}
          </motion.p>
          <div className="mt-2 flex items-end justify-center gap-3">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: d(0.45) }}
              className="relative text-lg font-medium text-white/50"
            >
              {PRECO_DE}
              {/* Risco que anima cruzando o valor antigo */}
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                animate={show ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.35, delay: d(0.95), ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
                className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-white/80"
              />
            </motion.span>
            {/* Novo valor: entra com "pop" de mola + brilho — a surpresa */}
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.55 }}
              animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.55 }}
              transition={{ type: "spring", stiffness: 320, damping: 14, delay: d(1.2) }}
              className="text-4xl font-extrabold leading-none text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.4)] sm:text-5xl"
            >
              {PRECO_POR}
            </motion.span>
          </div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: d(1.45) }}
            className="mt-2.5 font-mono text-[13px] text-violet-100"
          >
            {t({ pt: "ou em até ", en: "or up to " })}
            {PRECO_PARCELA}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: d(1.6) }}
            className="mx-auto mt-5 max-w-md text-[13px] leading-relaxed text-violet-100/80"
          >
            {t({
              pt: "Valor de entrada. O valor exato depende do escopo, monte sua proposta com IA e receba a estimativa do seu projeto na hora.",
              en: "Entry price. The exact value depends on scope, build your proposal with AI and get your project's estimate on the spot.",
            })}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: d(1.75) }}
            className="mt-7 inline-block"
          >
            <a
              href="#proposta"
              onClick={scrollToId("proposta")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-violet-700 shadow-lg shadow-black/20 transition-all hover:scale-[1.02] hover:bg-violet-50"
            >
              {t({ pt: "Montar minha proposta", en: "Build my proposal" })}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Modelos de contratação */}
        <Reveal className="mb-3.5 mt-10 text-center font-mono text-[11px] uppercase tracking-wide text-violet-300">
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
                <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-orange-950 shadow-[0_0_20px_-2px_rgba(245,158,11,0.9)] ring-1 ring-white/40">
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
                className={`mt-1 font-mono text-[11px] ${
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
