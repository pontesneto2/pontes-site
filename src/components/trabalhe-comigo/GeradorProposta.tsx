"use client";

import { useRef, useState, type ReactNode } from "react";
import { Loader2, ChevronDown } from "lucide-react";
import { track } from "@vercel/analytics";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";
import PropostaResultado from "./PropostaResultado";
import type { Existente, Proposal, PropostaResponse, TipoProjeto, Urgencia } from "./types";

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

const TIPO_OPTIONS: Array<{ value: TipoProjeto; label: Bilingual }> = [
  { value: "sistema_saas", label: { pt: "Sistema web / SaaS", en: "Web system / SaaS" } },
  { value: "app_mobile", label: { pt: "Aplicativo mobile (iOS/Android)", en: "Mobile app (iOS/Android)" } },
  { value: "site_landing", label: { pt: "Site ou landing page", en: "Website or landing page" } },
  { value: "api_integracao", label: { pt: "API ou integração", en: "API or integration" } },
  { value: "migracao", label: { pt: "Migração de sistema", en: "System migration" } },
  { value: "manutencao", label: { pt: "Manutenção / evolução", en: "Maintenance / evolution" } },
];

const EXISTENTE_OPTIONS: Array<{ value: Existente; label: Bilingual }> = [
  { value: "do_zero", label: { pt: "Começar do zero", en: "Start from scratch" } },
  { value: "continuar", label: { pt: "Continuar um sistema que já existe", en: "Continue an existing system" } },
  { value: "migracao_existente", label: { pt: "Migrar um sistema existente", en: "Migrate an existing system" } },
];

const URGENCIA_OPTIONS: Array<{ value: Urgencia; label: Bilingual }> = [
  { value: "tranquilo", label: { pt: "Tranquilo, sem pressa", en: "Relaxed, no rush" } },
  { value: "normal", label: { pt: "Prazo normal", en: "Normal timeline" } },
  { value: "urgente", label: { pt: "É urgente", en: "It's urgent" } },
];

const ORCAMENTO_OPTIONS: Array<{ value: string; label: Bilingual }> = [
  { value: "", label: { pt: "Prefiro não informar", en: "Prefer not to say" } },
  { value: "Até R$ 2.000", label: { pt: "Até R$ 2.000", en: "Up to R$ 2,000" } },
  { value: "R$ 2.000 a 5.000", label: { pt: "R$ 2.000 a 5.000", en: "R$ 2,000 to 5,000" } },
  { value: "R$ 5.000 a 15.000", label: { pt: "R$ 5.000 a 15.000", en: "R$ 5,000 to 15,000" } },
  { value: "Acima de R$ 15.000", label: { pt: "Acima de R$ 15.000", en: "Above R$ 15,000" } },
];

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-zinc-400">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-white/20 bg-black/30 px-4 py-3 pr-9 text-sm text-white focus:border-violet-400/40 focus:outline-none"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
      </div>
    </label>
  );
}

type Status = "idle" | "loading" | "success" | "fallback";

export default function GeradorProposta() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const [description, setDescription] = useState("");
  const [tipo, setTipo] = useState("");
  const [existente, setExistente] = useState("");
  const [urgencia, setUrgencia] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [siteReferencia, setSiteReferencia] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const formLoadedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  const canGenerate =
    tipo !== "" && existente !== "" && urgencia !== "" && description.trim().length >= 20;

  async function handleGenerate() {
    if (!canGenerate) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/proposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          tipo,
          existente,
          urgencia,
          orcamento,
          siteReferencia: siteReferencia.trim(),
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
          title={{ pt: "Monte sua proposta com nossa IA", en: "Build your proposal with our AI" }}
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

            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              <SelectField label={t({ pt: "Tipo de projeto", en: "Project type" })} value={tipo} onChange={setTipo}>
                <option value="" disabled className="bg-zinc-900">
                  {t({ pt: "Selecione...", en: "Select..." })}
                </option>
                {TIPO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-zinc-900">
                    {t(option.label)}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label={t({ pt: "Ponto de partida", en: "Starting point" })}
                value={existente}
                onChange={setExistente}
              >
                <option value="" disabled className="bg-zinc-900">
                  {t({ pt: "Selecione...", en: "Select..." })}
                </option>
                {EXISTENTE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-zinc-900">
                    {t(option.label)}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label={t({ pt: "Prazo / urgência", en: "Timeline / urgency" })}
                value={urgencia}
                onChange={setUrgencia}
              >
                <option value="" disabled className="bg-zinc-900">
                  {t({ pt: "Selecione...", en: "Select..." })}
                </option>
                {URGENCIA_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-zinc-900">
                    {t(option.label)}
                  </option>
                ))}
              </SelectField>
            </div>

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

            <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <SelectField
                label={t({ pt: "Orçamento disponível (opcional)", en: "Available budget (optional)" })}
                value={orcamento}
                onChange={setOrcamento}
              >
                {ORCAMENTO_OPTIONS.map((option) => (
                  <option key={option.value || "none"} value={option.value} className="bg-zinc-900">
                    {t(option.label)}
                  </option>
                ))}
              </SelectField>

              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-zinc-400">
                  {t({ pt: "Site de referência (opcional)", en: "Reference site (optional)" })}
                </span>
                <input
                  type="url"
                  value={siteReferencia}
                  onChange={(event) => setSiteReferencia(event.target.value)}
                  placeholder={t({ pt: "https://um-site-que-te-inspira.com", en: "https://a-site-you-like.com" })}
                  className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400/40 focus:outline-none"
                />
              </label>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={status === "loading" || !canGenerate}
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
