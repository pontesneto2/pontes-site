"use client";

import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { track } from "@vercel/analytics";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";
import PropostaResultado from "./PropostaResultado";
import type { Proposal, PropostaResponse } from "./types";

const EXAMPLES: Array<{ chip: Bilingual; text: Bilingual }> = [
  {
    chip: { pt: "Sistema de gestão", en: "Management system" },
    text: {
      pt: "Um sistema web de gestão para minha clínica, com agenda, prontuário e cobrança recorrente.",
      en: "A web management system for my clinic, with scheduling, medical records and recurring billing.",
    },
  },
  {
    chip: { pt: "App marketplace", en: "Marketplace app" },
    text: {
      pt: "Um aplicativo iOS e Android de marketplace conectando prestadores e clientes, com pagamento integrado.",
      en: "An iOS and Android marketplace app connecting providers and clients, with integrated payment.",
    },
  },
  {
    chip: { pt: "Landing + CRM", en: "Landing + CRM" },
    text: {
      pt: "Uma landing page de alta conversão para captar leads da minha consultoria, integrada ao meu CRM.",
      en: "A high-conversion landing page to capture leads for my consulting business, integrated with my CRM.",
    },
  },
  {
    chip: { pt: "API de integração", en: "Integration API" },
    text: {
      pt: "Uma API para integrar meu e-commerce com a transportadora e emitir etiquetas automaticamente.",
      en: "An API to integrate my e-commerce with the carrier and automatically issue shipping labels.",
    },
  },
];

type Status = "idle" | "loading" | "success" | "fallback";

export default function GeradorProposta() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const formLoadedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleGenerate() {
    if (description.trim().length < 20) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/proposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          company: honeypotRef.current?.value ?? "",
          formLoadedAt: formLoadedAt.current,
          lang,
        }),
      });

      const data: PropostaResponse = await res.json();

      if (data.ok) {
        setProposal(data.proposal);
        setStatus("success");
        track("trabalhe_comigo_proposta_gerada", { porte: data.proposal.porte });
      } else {
        setStatus("fallback");
        track("trabalhe_comigo_proposta_fallback", { reason: data.fallback.reason });
      }
    } catch {
      setStatus("fallback");
      track("trabalhe_comigo_proposta_fallback", { reason: "network_error" });
    }
  }

  return (
    <section id="proposta" className="scroll-mt-20 border-t border-white/10 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          title={{ pt: "Monte sua proposta com IA", en: "Build your proposal with AI" }}
          kicker={{ pt: "Escopo e estimativa na hora", en: "Scope and estimate on the spot" }}
        />

        <div className="overflow-hidden rounded-3xl border border-violet-400/35 bg-gradient-to-b from-violet-500/[0.08] to-transparent">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/25 px-5 py-3.5 font-mono text-xs text-zinc-400">
            <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
            <span className="ml-1.5">~/fcopts/gerador-de-proposta</span>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="max-w-sm text-xl font-semibold text-white">
              {t({ pt: "O que você precisa construir?", en: "What do you need to build?" })}
            </h3>
            <p className="mt-2.5 max-w-xl text-sm text-zinc-400">
              {t({
                pt: "Quanto mais detalhe (tipo de produto, funcionalidades, público), melhor a estimativa.",
                en: "The more detail (product type, features, audience), the better the estimate.",
              })}
            </p>

            <input
              ref={honeypotRef}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={t({
                pt: "Ex.: Preciso de um app de delivery com painel do lojista, pagamento no cartão e rastreamento do pedido em tempo real...",
                en: "E.g.: I need a delivery app with a merchant dashboard, card payment and real-time order tracking...",
              })}
              className="mt-6 min-h-[110px] w-full resize-y rounded-2xl border border-white/20 bg-black/30 p-4 text-[15.5px] text-white placeholder:text-zinc-500 focus:border-violet-400/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {EXAMPLES.map((example) => (
                <button
                  key={t(example.chip)}
                  type="button"
                  onClick={() => setDescription(t(example.text))}
                  className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
                >
                  {t(example.chip)}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={status === "loading" || description.trim().length < 20}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-all hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {t({ pt: "Gerar proposta", en: "Generate proposal" })}
                {status !== "loading" && <span aria-hidden="true">→</span>}
              </button>
            </div>

            <p className="mt-5 font-mono text-[11px] text-zinc-500">
              {t({
                pt: "* Estimativa preliminar gerada por IA. Os valores são uma faixa de referência, não uma cotação fechada. Cada projeto vira uma proposta personalizada depois de eu entender o contexto.",
                en: "* Preliminary AI-generated estimate. The figures are a reference range, not a closed quote. Every project becomes a personalized proposal once I understand the context.",
              })}
            </p>

            {status === "success" && proposal && (
              <PropostaResultado proposal={proposal} description={description.trim()} />
            )}

            {status === "fallback" && (
              <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-6">
                <p className="text-[15px] text-zinc-400">
                  {t({
                    pt: "Não consegui gerar a proposta automática agora. Sem problema, me chama direto no WhatsApp que eu monto seu escopo pessoalmente.",
                    en: "I couldn't generate the automatic proposal right now. No problem, message me directly on WhatsApp and I'll put your scope together myself.",
                  })}
                </p>
                <a
                  href="https://wa.me/5585981888896"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-all hover:scale-[1.03]"
                >
                  {t({ pt: "Falar no WhatsApp", en: "Chat on WhatsApp" })}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
