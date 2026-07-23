"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { pdf } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { track } from "@vercel/analytics";
import {
  X,
  Download,
  Loader2,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";
import type { Proposal } from "./types";
import PropostaPdf from "./PropostaPdf";
import {
  BRAND,
  VALIDADE_DIAS,
  addDias,
  clausulasLegais,
  docLabels,
  formasPagamento,
  formatBRL,
  formatData,
  investimentoTexto,
  lembreteWhatsappUrl,
  porteLabel,
} from "@/lib/proposta/proposta-doc";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[\p{L}][\p{L}\s'’-]{1,}$/u;

type Props = {
  proposal: Proposal;
  description: string;
  numero: string;
  open: boolean;
  onClose: () => void;
};

type Stage = "lead" | "preview";
type SendStatus = "idle" | "sending" | "error" | "limit";

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function PropostaModal({ proposal, description, numero, open, onClose }: Props) {
  const { lang } = useLanguage();
  const t = (pt: string, en: string) => tr(lang, { pt, en });
  const L = docLabels(lang);

  const emissao = useMemo(() => new Date(), []);
  const validade = useMemo(() => addDias(emissao, VALIDADE_DIAS), [emissao]);
  const dataEmissaoFmt = formatData(emissao, lang);
  const validadeFmt = formatData(validade, lang);

  const [qrDataUrl, setQrDataUrl] = useState<string | undefined>(undefined);
  const [stage, setStage] = useState<Stage>("lead");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [downloading, setDownloading] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formLoadedAt = useRef(Date.now());

  const nameValid = NAME_REGEX.test(nome.trim());
  const emailValid = EMAIL_REGEX.test(email.trim());
  const canSubmit = nameValid && emailValid && consent && sendStatus !== "sending";

  useEffect(() => {
    QRCode.toDataURL(BRAND.whatsappUrl, { margin: 1, width: 120 })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(undefined));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  function pdfDoc() {
    return (
      <PropostaPdf
        proposal={proposal}
        numero={numero}
        dataEmissao={dataEmissaoFmt}
        validade={validadeFmt}
        lang={lang}
        qrDataUrl={qrDataUrl}
      />
    );
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await pdf(pdfDoc()).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `proposta-${numero}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      track("trabalhe_comigo_proposta_pdf_baixado", { porte: proposal.porte });
    } finally {
      setDownloading(false);
    }
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setSendStatus("sending");
    try {
      const blob = await pdf(pdfDoc()).toBlob();
      const pdfBase64 = await blobToBase64(blob);
      const res = await fetch("/api/proposta-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero,
          proposal,
          description,
          nome: nome.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          pdfBase64,
          company: honeypotRef.current?.value ?? "",
          formLoadedAt: formLoadedAt.current,
          lang,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; reason?: string }
        | null;

      if (res.ok && data?.ok) {
        setSendStatus("idle");
        setStage("preview");
        track("trabalhe_comigo_proposta_enviada", { porte: proposal.porte });
        return;
      }

      // Limite de 2 propostas por e-mail em 30 dias: mensagem amigável, não erro.
      if (data?.reason === "limit_reached") {
        setSendStatus("limit");
        track("trabalhe_comigo_proposta_limite", { porte: proposal.porte });
        return;
      }

      throw new Error("failed");
    } catch {
      setSendStatus("error");
    }
  }

  const investLinha = investimentoTexto(proposal.investimento, lang);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={L.documento}
        >
          <motion.div
            className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white text-zinc-800 shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho escuro (logo aparece) */}
            <div className="relative flex-none bg-[#0e0e14] px-6 py-5 sm:px-8">
              <button
                type="button"
                onClick={onClose}
                aria-label={t("Fechar", "Close")}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-start justify-between gap-4 pr-8">
                <Image src={BRAND.logoUrl} alt="FCOPTS" width={2500} height={544} className="h-7 w-auto" />
                <div className="text-right">
                  <div className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {L.documento}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400">
                    {L.numero}: {numero}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500">
                    {L.emissao}: {dataEmissaoFmt} · {L.validade}: {validadeFmt}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[3px] flex-none bg-gradient-to-r from-violet-600 to-fuchsia-500" />

            {stage === "lead" ? (
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-7 sm:px-9">
                <h3 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {t("Sua proposta está pronta! 🎉", "Your proposal is ready! 🎉")}
                </h3>
                <p className="mt-1.5 text-[15px] text-zinc-500">
                  {t(
                    "Preencha seus dados para abrir a proposta e receber o PDF. É rápido, e assim o Francisco já sabe pra quem responder.",
                    "Fill in your details to open the proposal and get the PDF. It's quick, and this way Francisco knows who to reply to."
                  )}
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

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder={t("Seu nome", "Your name")}
                    className="rounded-xl border border-zinc-300 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder={t("Seu melhor e-mail", "Your best email")}
                    className="rounded-xl border border-zinc-300 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                  <input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder={t("WhatsApp (opcional)", "WhatsApp (optional)")}
                    className="rounded-xl border border-zinc-300 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 sm:col-span-2"
                  />
                </div>

                <label className="mt-4 flex items-start gap-2.5 text-[13px] text-zinc-500">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-violet-600"
                  />
                  <span>
                    {t(
                      "Concordo em compartilhar meus dados com o Francisco para retorno sobre esta proposta.",
                      "I agree to share my data with Francisco so he can follow up on this proposal."
                    )}
                  </span>
                </label>

                {sendStatus === "limit" ? (
                  <div className="mt-6 rounded-xl border border-violet-200 bg-violet-50 p-5">
                    <p className="text-[15px] font-semibold text-zinc-900">
                      {t(
                        "Você já enviou 2 propostas nos últimos 30 dias 🙌",
                        "You've already sent 2 proposals in the last 30 days 🙌"
                      )}
                    </p>
                    <p className="mt-1.5 text-[13.5px] text-zinc-600">
                      {t(
                        "Para um novo escopo, me chama direto no WhatsApp que eu monto com você — assim fica mais rápido e pessoal.",
                        "For a new scope, message me directly on WhatsApp and I'll put it together with you — faster and more personal."
                      )}
                    </p>
                    <a
                      href={BRAND.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("trabalhe_comigo_whatsapp_click", { source: "proposta_limite" })}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {t("Falar no WhatsApp", "Chat on WhatsApp")}
                    </a>
                  </div>
                ) : (
                  <>
                    {sendStatus === "error" && (
                      <p className="mt-3 text-[13px] text-red-500">
                        {t(
                          "Não consegui abrir agora. Tente de novo ou fale no WhatsApp.",
                          "Couldn't open it now. Try again or reach out on WhatsApp."
                        )}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {sendStatus === "sending" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                      {t("Abrir minha proposta", "Open my proposal")}
                    </button>
                    <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {t("Seus dados são usados só para este retorno.", "Your data is only used for this follow-up.")}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-7 sm:px-9">
                  <div className="mb-5 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-[13px] font-medium text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    {t("Proposta enviada para o Francisco. Esta é a sua cópia:", "Sent to Francisco. Here is your copy:")}
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {proposal.tipo}
                  </h3>
                  <div className="mt-1 font-mono text-xs text-violet-700">
                    {L.porte}: {porteLabel(proposal.porte, lang)}
                  </div>

                  <Section label={L.resumo}>
                    <p className="text-[15px] leading-relaxed text-zinc-600">{proposal.resumo}</p>
                  </Section>

                  <Section label={L.escopo}>
                    <ul className="space-y-1.5">
                      {proposal.entregaveis.map((e, i) => (
                        <li key={i} className="relative pl-4 text-sm text-zinc-700">
                          <span className="absolute left-0 text-fuchsia-500">•</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  <Section label={L.fases}>
                    <ol className="relative ml-3 border-l border-zinc-200">
                      {proposal.fases.map((f, i) => (
                        <li key={i} className="relative pb-4 pl-6 last:pb-0">
                          <span className="absolute -left-[9px] top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 font-mono text-[10px] font-semibold text-white">
                            {i + 1}
                          </span>
                          <span className="block text-sm font-semibold text-zinc-900">{f.titulo}</span>
                          <p className="mt-0.5 text-[13px] text-zinc-500">{f.descricao}</p>
                        </li>
                      ))}
                    </ol>
                  </Section>

                  <Section label={L.stack}>
                    <div className="flex flex-wrap gap-1.5">
                      {proposal.stack.map((tech, i) => (
                        <span key={i} className="rounded-full border border-zinc-200 px-2.5 py-1 font-mono text-[11.5px] text-zinc-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Section>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-zinc-200 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-wide text-zinc-400">{L.prazo}</div>
                      <div className="mt-1 text-lg font-semibold text-zinc-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {proposal.prazoEstimado}
                      </div>
                    </div>
                    <div className="rounded-xl border border-zinc-200 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-wide text-zinc-400">{L.investimento}</div>
                      <div className="mt-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent">
                        {investLinha}
                      </div>
                      {proposal.investimento.horaBRL !== null && (
                        <div className="mt-0.5 font-mono text-[11px] text-zinc-500">
                          {t("ou", "or")} {formatBRL(proposal.investimento.horaBRL)}/h
                        </div>
                      )}
                    </div>
                  </div>

                  <Section label={L.formasPagamento}>
                    <ul className="space-y-1.5">
                      {formasPagamento(lang).map((p, i) => (
                        <li key={i} className="relative pl-4 text-sm text-zinc-700">
                          <span className="absolute left-0 text-fuchsia-500">•</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  <Section label={L.proponente}>
                    <p className="text-sm font-semibold text-zinc-900">
                      {BRAND.nome} · {BRAND.cargo[lang]}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 font-mono text-[12px] text-zinc-500">
                      <span>{BRAND.email}</span>
                      <span>{BRAND.whatsapp}</span>
                      <span>{BRAND.site}</span>
                      <span>{BRAND.github}</span>
                      <span>{BRAND.linkedin}</span>
                    </div>
                  </Section>

                  <Section label={L.juridico}>
                    <ol className="space-y-1.5">
                      {clausulasLegais(lang).map((c, i) => (
                        <li key={i} className="flex gap-2 text-[12.5px] text-zinc-500">
                          <span className="font-mono font-semibold text-violet-700">{i + 1}.</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ol>
                  </Section>
                </div>

                <div className="flex flex-none flex-wrap items-center gap-2.5 border-t border-zinc-200 bg-zinc-50 px-6 py-4 sm:px-9">
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
                  >
                    {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    {t("Baixar PDF", "Download PDF")}
                  </button>
                  <a
                    href={lembreteWhatsappUrl({
                      numero,
                      tipo: proposal.tipo,
                      porte: proposal.porte,
                      nome: nome.trim(),
                      contato: whatsapp.trim() || email.trim(),
                      lang,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("trabalhe_comigo_whatsapp_click", { source: "proposta_lembrete" })}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("Avisar no WhatsApp", "Ping on WhatsApp")}
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-700">{label}</div>
      {children}
    </div>
  );
}
