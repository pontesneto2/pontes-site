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
  Send,
  Loader2,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  CalendarClock,
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

type SendStatus = "idle" | "sending" | "sent" | "error";

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
  const [showLead, setShowLead] = useState(false);
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
  const canSend = nameValid && emailValid && consent && sendStatus !== "sending";

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

  function pdfDoc(nomeCliente?: string) {
    return (
      <PropostaPdf
        proposal={proposal}
        numero={numero}
        dataEmissao={dataEmissaoFmt}
        validade={validadeFmt}
        lang={lang}
        qrDataUrl={qrDataUrl}
        nomeCliente={nomeCliente}
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

  async function handleSend() {
    if (!canSend) return;
    setSendStatus("sending");
    try {
      const blob = await pdf(pdfDoc(nome.trim())).toBlob();
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
      if (!res.ok) throw new Error("failed");
      setSendStatus("sent");
      track("trabalhe_comigo_proposta_enviada", { porte: proposal.porte });
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
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={L.documento}
        >
          <motion.div
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white text-zinc-800 shadow-2xl"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t("Fechar", "Close")}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/5 text-zinc-500 transition-colors hover:bg-zinc-900/10 hover:text-zinc-800"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Documento com scroll */}
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-6 py-7 sm:px-9 sm:py-9">
              {/* Cabeçalho */}
              <div className="flex items-start justify-between gap-4">
                <Image src={BRAND.logoUrl} alt="FCOPTS" width={2500} height={544} className="h-6 w-auto" />
                <div className="text-right">
                  <div className="text-sm font-bold text-zinc-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {L.documento}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500">
                    {L.numero}: {numero}
                  </div>
                </div>
              </div>
              <div className="mt-3 h-[3px] rounded bg-gradient-to-r from-violet-600 to-fuchsia-500" />

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {L.emissao}: {dataEmissaoFmt}
                </span>
                <span>
                  {L.validade}: <b className="text-zinc-700">{validadeFmt}</b>
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
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
                <div className="space-y-2">
                  {proposal.fases.map((f, i) => (
                    <div key={i} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-zinc-900">{f.titulo}</span>
                        <span className="shrink-0 font-mono text-[11px] text-violet-700">{f.prazo}</span>
                      </div>
                      <p className="mt-0.5 text-[13px] text-zinc-500">{f.descricao}</p>
                    </div>
                  ))}
                </div>
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
                  <div className="mt-1 font-mono text-[11px] text-zinc-500">{proposal.pagamentoSugerido}</div>
                </div>
              </div>

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

            {/* Barra de ações */}
            <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-5 sm:px-9">
              {sendStatus === "sent" ? (
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                    {t("Proposta enviada para o Francisco!", "Proposal sent to Francisco!")}
                  </p>
                  <p className="mt-1 text-[13px] text-zinc-500">
                    {t(
                      "Ele recebeu o PDF por e-mail e responde em até 1 dia útil. Se quiser, avise no WhatsApp:",
                      "He received the PDF by email and replies within 1 business day. If you want, ping him on WhatsApp:"
                    )}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
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
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {t("Avisar no WhatsApp", "Ping on WhatsApp")}
                    </a>
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={downloading}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700 disabled:opacity-50"
                    >
                      {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                      {t("Baixar PDF", "Download PDF")}
                    </button>
                  </div>
                </div>
              ) : showLead ? (
                <div>
                  <p className="text-sm font-semibold text-zinc-800">
                    {t("Pra onde envio a proposta e como o Francisco te retorna?", "Where do I send the proposal and how should Francisco reach you?")}
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
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <input
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder={t("Seu nome", "Your name")}
                      className="rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder={t("Seu e-mail", "Your email")}
                      className="rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none"
                    />
                    <input
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder={t("WhatsApp (opcional)", "WhatsApp (optional)")}
                      className="rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none sm:col-span-2"
                    />
                  </div>
                  <label className="mt-3 flex items-start gap-2 text-[12px] text-zinc-500">
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
                  {sendStatus === "error" && (
                    <p className="mt-2 text-[12px] text-red-500">
                      {t("Não consegui enviar agora. Tente de novo ou fale no WhatsApp.", "Couldn't send it now. Try again or reach out on WhatsApp.")}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={handleSend}
                      disabled={!canSend}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {sendStatus === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {t("Enviar proposta para o Francisco", "Send proposal to Francisco")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLead(false)}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-800"
                    >
                      {t("Voltar", "Back")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowLead(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
                  >
                    <Send className="h-4 w-4" />
                    {t("Enviar proposta para o Francisco", "Send proposal to Francisco")}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700 disabled:opacity-50"
                  >
                    {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    {t("Baixar PDF", "Download PDF")}
                  </button>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {t("Estimativa preliminar por IA", "Preliminary AI estimate")}
                  </span>
                </div>
              )}
            </div>
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
