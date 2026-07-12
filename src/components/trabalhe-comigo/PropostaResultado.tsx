"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage, tr, type Lang } from "@/lib/language-context";
import type { Investimento, Proposal } from "./types";

const PORTE_LABEL: Record<Proposal["porte"], { pt: string; en: string }> = {
  pequeno: { pt: "Pequeno", en: "Small" },
  medio: { pt: "Médio", en: "Medium" },
  grande: { pt: "Grande", en: "Large" },
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function investimentoTexto(investimento: Investimento, lang: Lang) {
  if (investimento.modelo === "faixa" && investimento.max !== null) {
    return `${formatBRL(investimento.min)} – ${formatBRL(investimento.max)}`;
  }
  return lang === "pt"
    ? `A partir de ${formatBRL(investimento.min)}`
    : `From ${formatBRL(investimento.min)}`;
}

export default function PropostaResultado({ proposal, description }: { proposal: Proposal; description: string }) {
  const { lang } = useLanguage();

  const whatsappMessage = encodeURIComponent(
    `Olá Francisco! Gerei uma proposta no seu site:\n\n• Tipo: ${proposal.tipo}\n• Porte: ${PORTE_LABEL[proposal.porte][lang]}\n• Prazo estimado: ${proposal.prazoEstimado}\n• Stack: ${proposal.stack.join(", ")}\n\nMeu projeto: ${description}`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-6 overflow-hidden rounded-2xl border border-white/15 bg-black/30"
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 px-6 py-4">
        <span className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {proposal.tipo}
        </span>
        <span className="rounded-full border border-violet-400/35 bg-violet-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-violet-200">
          {tr(lang, { pt: "Porte ", en: "Size " })}
          {PORTE_LABEL[proposal.porte][lang]}
        </span>
      </div>

      <div className="p-6">
        <p className="mb-5 text-[15px] text-zinc-400">{proposal.resumo}</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-zinc-400">
              {tr(lang, { pt: "Stack sugerida", en: "Suggested stack" })}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {proposal.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/20 px-2.5 py-1 font-mono text-[11.5px] text-white">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-zinc-400">
              {tr(lang, { pt: "Entregáveis", en: "Deliverables" })}
            </div>
            <ul className="flex flex-col gap-1.5">
              {proposal.entregaveis.map((item) => (
                <li key={item} className="relative pl-4 text-sm text-white">
                  <span className="absolute left-0 text-fuchsia-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-zinc-400">
              {tr(lang, { pt: "Prazo estimado", en: "Estimated timeline" })}
            </div>
            <div className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {proposal.prazoEstimado}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-zinc-400">
              {tr(lang, { pt: "Faixa de referência", en: "Reference range" })}
            </div>
            <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent">
              {investimentoTexto(proposal.investimento, lang)}
            </div>
            {proposal.investimento.horaBRL !== null && (
              <div className="mt-1 font-mono text-[11px] text-zinc-400">
                {tr(lang, { pt: "ou ", en: "or " })}
                {formatBRL(proposal.investimento.horaBRL)}
                {tr(lang, { pt: "/h", en: "/h" })}
              </div>
            )}
            <div className="mt-1.5 font-mono text-[11px] text-zinc-400">{proposal.pagamentoSugerido}</div>
          </div>
        </div>

        <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-[12.5px] text-zinc-400">
          {tr(lang, {
            pt: "Esses valores são uma faixa de referência, não uma cotação fechada. Cada projeto vira uma proposta personalizada depois de eu entender o contexto.",
            en: "These figures are a reference range, not a closed quote. Every project becomes a personalized proposal once I understand the context.",
          })}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-white/10 p-6">
        <a
          href={`https://wa.me/5585981888896?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-all hover:scale-[1.03]"
        >
          <MessageCircle className="h-4 w-4" />
          {tr(lang, { pt: "Enviar essa proposta pro Francisco", en: "Send this proposal to Francisco" })}
        </a>
        <a
          href="#contato"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5"
        >
          {tr(lang, { pt: "Preencher o formulário", en: "Fill out the form" })}
        </a>
      </div>
    </motion.div>
  );
}
