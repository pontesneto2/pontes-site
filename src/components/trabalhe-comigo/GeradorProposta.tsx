"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import {
  Loader2,
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  Smartphone,
  ShoppingCart,
  Rocket,
  Plug,
  Eye,
  RefreshCw,
  Pencil,
  type LucideIcon,
} from "lucide-react";
import { track } from "@vercel/analytics";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { usePropostaPrefill } from "@/lib/proposta/prefill-context";
import SectionHeading from "./SectionHeading";
import { gerarNumeroProposta, porteLabel } from "@/lib/proposta/proposta-doc";
import type { Existente, Proposal, PropostaResponse, TipoProjeto, Urgencia } from "./types";

const PropostaModal = dynamic(() => import("./PropostaModal"), { ssr: false });

const LOADING_STEPS: Bilingual[] = [
  { pt: "Analisando o escopo…", en: "Analyzing the scope…" },
  { pt: "Estimando prazo e porte…", en: "Estimating timeline and size…" },
  { pt: "Montando as fases do projeto…", en: "Building the project phases…" },
  { pt: "Finalizando sua proposta…", en: "Finishing your proposal…" },
];

function LoadingEtapas() {
  const { lang } = useLanguage();
  const [i, setI] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % LOADING_STEPS.length), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-rose-300">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
      {tr(lang, LOADING_STEPS[i])}
    </span>
  );
}

const EXAMPLES: Array<{ chip: Bilingual; text: Bilingual; icon: LucideIcon }> = [
  {
    chip: { pt: "Sistema de gestão", en: "Management system" },
    icon: LayoutDashboard,
    text: {
      pt: "Um sistema web de gestão com cadastros, painel administrativo, relatórios e controle de acesso por perfil.",
      en: "A web management system with records, an admin panel, reports and role-based access control.",
    },
  },
  {
    chip: { pt: "App mobile", en: "Mobile app" },
    icon: Smartphone,
    text: {
      pt: "Um aplicativo mobile para iOS e Android, com login, notificações e área do usuário.",
      en: "A mobile app for iOS and Android, with login, notifications and a user area.",
    },
  },
  {
    chip: { pt: "E-commerce", en: "E-commerce" },
    icon: ShoppingCart,
    text: {
      pt: "Uma loja virtual com catálogo de produtos, carrinho, pagamento online e painel de pedidos.",
      en: "An online store with product catalog, cart, online checkout and an orders dashboard.",
    },
  },
  {
    chip: { pt: "Landing page", en: "Landing page" },
    icon: Rocket,
    text: {
      pt: "Uma landing page de alta conversão para captar contatos, integrada ao meu CRM.",
      en: "A high-conversion landing page to capture contacts, integrated with my CRM.",
    },
  },
  {
    chip: { pt: "API / integração", en: "API / integration" },
    icon: Plug,
    text: {
      pt: "Uma API para integrar meus sistemas e automatizar processos entre ferramentas.",
      en: "An API to integrate my systems and automate processes between tools.",
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
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  step?: number;
}) {
  const filled = value !== "";
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-zinc-400">
        {step !== undefined && (
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
              filled ? "bg-rose-500 text-white" : "bg-white/10 text-zinc-400"
            }`}
          >
            {filled ? "✓" : step}
          </span>
        )}
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full appearance-none rounded-xl border bg-white/[0.03] px-4 py-3 pr-9 text-sm text-white transition-colors hover:border-white/30 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-500/25 ${
            filled ? "border-rose-400/40" : "border-white/15"
          }`}
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
  const { request } = usePropostaPrefill();

  const [description, setDescription] = useState("");
  const [tipo, setTipo] = useState("");
  const [existente, setExistente] = useState("");
  const [urgencia, setUrgencia] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [siteReferencia, setSiteReferencia] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [numero, setNumero] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const formLoadedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const fieldsReady =
    tipo !== "" && existente !== "" && urgencia !== "" && description.trim().length >= 20;
  // Sem site key configurada (ex.: dev), o captcha não bloqueia — espelha o bypass do servidor.
  const captchaReady = !turnstileSiteKey || turnstileToken !== "";
  const canGenerate = fieldsReady && captchaReady;

  // Prefill vindo da seção de Serviços: a seleção alimenta a descrição e os
  // campos de tipo/ponto de partida, então o usuário só refina e gera.
  useEffect(() => {
    if (!request) return;
    setDescription(request.payload.description);
    if (request.payload.tipo) setTipo(request.payload.tipo);
    if (request.payload.existente) setExistente(request.payload.existente);
    // O resultado anterior deixa de valer com o novo escopo.
    setStatus("idle");
  }, [request?.nonce]); // eslint-disable-line react-hooks/exhaustive-deps

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
          turnstileToken,
        }),
      });

      const data: PropostaResponse = await res.json();

      if (data.ok) {
        setProposal(data.proposal);
        setNumero(gerarNumeroProposta());
        setStatus("success");
        setModalOpen(true);
        track("trabalhe_comigo_proposta_gerada", { porte: data.proposal.porte });
      } else {
        setStatus("fallback");
        track("trabalhe_comigo_proposta_fallback", { reason: data.fallback.reason });
      }
    } catch {
      setStatus("fallback");
      track("trabalhe_comigo_proposta_fallback", { reason: "network_error" });
    } finally {
      // Token do Turnstile é de uso único: reseta para a próxima geração.
      setTurnstileToken("");
      turnstileRef.current?.reset();
    }
  }

  return (
    <section id="proposta" className="scroll-mt-20 border-t border-white/10 py-20" style={{ backgroundColor: "#101018" }}>
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          title={{ pt: "Monte sua proposta com nossa IA", en: "Build your proposal with our AI" }}
          kicker={{ pt: "Escopo e estimativa na hora", en: "Scope and estimate on the spot" }}
        />

        <div className="overflow-hidden rounded-3xl border border-rose-400/35 bg-gradient-to-b from-rose-500/[0.08] to-transparent">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/25 px-5 py-3.5 font-mono text-xs text-zinc-400">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-500 shadow-[0_0_8px] shadow-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
            <span className="ml-1.5">~/fcopts/gerador-de-proposta</span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/30 to-amber-500/20 ring-1 ring-rose-400/30">
                <Sparkles className="h-5 w-5 text-rose-300" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {t({ pt: "O que você precisa construir?", en: "What do you need to build?" })}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm text-zinc-400">
                  {t({
                    pt: "Quanto mais detalhe você der (tipo de produto, funcionalidades, público), melhor a estimativa. É uma faixa de referência, não uma cotação fechada.",
                    en: "The more detail you give (product type, features, audience), the better the estimate. It's a reference range, not a closed quote.",
                  })}
                </p>
              </div>
            </div>

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
              <SelectField step={1} label={t({ pt: "Tipo de projeto", en: "Project type" })} value={tipo} onChange={setTipo}>
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
                step={2}
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
                step={3}
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

            <div className="mt-6">
              <span className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-zinc-400">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
                    description.trim().length >= 20 ? "bg-rose-500 text-white" : "bg-white/10 text-zinc-400"
                  }`}
                >
                  {description.trim().length >= 20 ? "✓" : 4}
                </span>
                {t({ pt: "Descreva seu projeto", en: "Describe your project" })}
              </span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={t({
                  pt: "Ex.: Preciso de um app de delivery com painel do lojista, pagamento no cartão e rastreamento do pedido em tempo real...",
                  en: "E.g.: I need a delivery app with a merchant dashboard, card payment and real-time order tracking...",
                })}
                className={`min-h-[110px] w-full resize-y rounded-2xl border bg-white/[0.03] p-4 text-[15.5px] text-white placeholder:text-zinc-500 transition-colors hover:border-white/30 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-500/25 ${
                  description.trim().length >= 20 ? "border-rose-400/40" : "border-white/15"
                }`}
              />
              {description.length > 0 && description.trim().length < 20 && (
                <span className="mt-1.5 block text-right font-mono text-[11px] text-amber-400/80">
                  {t({
                    pt: `Faltam ${20 - description.trim().length} caracteres`,
                    en: `${20 - description.trim().length} characters to go`,
                  })}
                </span>
              )}
            </div>

            <div className="mt-4">
              <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                {t({ pt: "Sem ideias? Comece por um exemplo →", en: "No ideas? Start from an example →" })}
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {EXAMPLES.map((example) => {
                  const Icon = example.icon;
                  return (
                    <button
                      key={t(example.chip)}
                      type="button"
                      onClick={() => setDescription(t(example.text))}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-rose-400/25 bg-gradient-to-b from-rose-500/[0.12] to-rose-500/[0.04] px-3 py-1.5 font-mono text-[11px] text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-rose-400/60 hover:from-rose-500/25 hover:to-amber-500/10 hover:text-white hover:shadow-md hover:shadow-rose-500/20"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500/20 text-rose-300 transition-colors group-hover:bg-amber-500/30 group-hover:text-amber-200">
                        <Icon className="h-2.5 w-2.5" />
                      </span>
                      {t(example.chip)}
                    </button>
                  );
                })}
              </div>
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
                  className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors hover:border-white/30 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-500/25"
                />
              </label>
            </div>

            {turnstileSiteKey && (
              <div className="mt-6">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={turnstileSiteKey}
                  options={{ theme: "dark", size: "flexible", language: lang }}
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken("")}
                  onError={() => setTurnstileToken("")}
                />
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={status === "loading" || !canGenerate}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:brightness-100"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {t({ pt: "Gerar proposta", en: "Generate proposal" })}
                {status !== "loading" && (
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                )}
              </button>
              {status === "loading" && <LoadingEtapas />}
              {!fieldsReady && status !== "loading" && (
                <span className="text-xs text-zinc-500">
                  {t({
                    pt: "Selecione os 3 campos e descreva seu projeto para gerar",
                    en: "Fill the 3 fields and describe your project to generate",
                  })}
                </span>
              )}
              {fieldsReady && !captchaReady && status !== "loading" && (
                <span className="text-xs text-zinc-500">
                  {t({
                    pt: "Confirme que você não é um robô para gerar",
                    en: "Confirm you're not a robot to generate",
                  })}
                </span>
              )}
            </div>

            <p className="mt-5 font-mono text-[11px] text-zinc-500">
              {t({
                pt: "* Estimativa preliminar gerada por IA. Os valores são uma faixa de referência, não uma cotação fechada. Cada projeto vira uma proposta personalizada depois de eu entender o contexto.",
                en: "* Preliminary AI-generated estimate. The figures are a reference range, not a closed quote. Every project becomes a personalized proposal once I understand the context.",
              })}
            </p>

            {status === "success" && proposal && (
              <div className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-500/[0.06] p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">
                      {t({ pt: "Sua proposta está pronta!", en: "Your proposal is ready!" })}{" "}
                      <span className="font-mono text-xs text-rose-300">{numero}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-zinc-400">
                      {proposal.tipo} · {t({ pt: "porte", en: "size" })} {porteLabel(proposal.porte, lang)} ·{" "}
                      {proposal.prazoEstimado}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(true);
                      track("trabalhe_comigo_proposta_modal_aberto", { porte: proposal.porte });
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-rose-700 transition-all hover:scale-[1.03]"
                  >
                    <Eye className="h-4 w-4" />
                    {t({ pt: "Ver proposta completa", en: "View full proposal" })}
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t({ pt: "Gerar de novo", en: "Generate again" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                    {t({ pt: "Ajustar", en: "Adjust" })}
                  </button>
                </div>
              </div>
            )}

            {proposal && numero && (
              <PropostaModal
                key={numero}
                proposal={proposal}
                description={description.trim()}
                numero={numero}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
              />
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
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-rose-700 transition-all hover:scale-[1.03]"
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
