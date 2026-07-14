import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { Proposal } from "@/components/trabalhe-comigo/types";
import { checkRateLimit, getClientIp } from "@/lib/proposta/rate-limit.server";
import {
  MAX_POR_JANELA,
  contarPropostasNaJanela,
  registrarLead,
} from "@/lib/proposta/leads.server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[\p{L}][\p{L}\s'’-]{1,}$/u;
const MAX_PDF_BYTES = 4_000_000; // ~4MB de base64

const PORTE_LABEL: Record<Proposal["porte"], string> = {
  pequeno: "Pequeno",
  medio: "Médio",
  grande: "Grande",
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function emailWrapper(innerHtml: string, footerText?: string) {
  return `
    <div style="background-color:#f4f2f8;padding:32px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ece9f5;">
        <div style="height:6px;background-color:#a855f7;background-image:linear-gradient(90deg,#8b5cf6,#d946ef);"></div>
        <div style="padding:32px 28px;">
          ${innerHtml}
        </div>
      </div>
      ${footerText ? `<p style="max-width:560px;margin:16px auto 0;text-align:center;font-size:12px;color:#a1a1aa;">${footerText}</p>` : ""}
    </div>
  `;
}

function row(label: string, value: string) {
  return `<tr><td style="padding:6px 0;color:#8b8594;vertical-align:top;width:130px;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1f2430;">${escapeHtml(value)}</td></tr>`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { numero, proposal, description, nome, email, whatsapp, pdfBase64, company, formLoadedAt, lang } = body as {
    numero?: string;
    proposal?: Proposal;
    description?: string;
    nome?: string;
    email?: string;
    whatsapp?: string;
    pdfBase64?: string;
    company?: string;
    formLoadedAt?: number;
    lang?: string;
  };

  // Honeypot
  if (company) return NextResponse.json({ ok: true });

  // Time-trap
  const elapsedMs = typeof formLoadedAt === "number" ? Date.now() - formLoadedAt : 0;
  if (elapsedMs < 1500) return NextResponse.json({ ok: true });

  if (!nome?.trim() || !NAME_REGEX.test(nome.trim())) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (!email?.trim() || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!proposal || typeof proposal !== "object" || !proposal.tipo || !proposal.porte) {
    return NextResponse.json({ error: "Invalid proposal" }, { status: 400 });
  }
  if (!pdfBase64 || typeof pdfBase64 !== "string" || pdfBase64.length > MAX_PDF_BYTES) {
    return NextResponse.json({ error: "Invalid attachment" }, { status: 400 });
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Limite anti-abuso por e-mail: no máximo MAX_POR_JANELA propostas enviadas na
  // janela móvel. Fail-open — se o banco não estiver configurado, contarPropostasNaJanela
  // retorna 0 e o envio segue normal.
  const jaEnviadas = await contarPropostasNaJanela(email.trim());
  if (jaEnviadas >= MAX_POR_JANELA) {
    return NextResponse.json({ ok: false, reason: "limit_reached" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const propostaNumero = numero?.trim() || "sem-numero";
  const porteTxt = PORTE_LABEL[proposal.porte] ?? proposal.porte;
  const resend = new Resend(apiKey);

  const inner = `
    <h1 style="margin:0 0 4px;font-size:20px;color:#1f2430;">Nova proposta gerada 🎯</h1>
    <p style="margin:0 0 18px;font-size:14px;color:#6b6577;">Proposta <b>${escapeHtml(propostaNumero)}</b> gerada e enviada por um visitante. O PDF está anexado.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${row("Cliente", nome.trim())}
      ${row("E-mail", email.trim())}
      ${whatsapp?.trim() ? row("WhatsApp", whatsapp.trim()) : ""}
      ${row("Tipo", proposal.tipo)}
      ${row("Porte", porteTxt)}
      ${row("Prazo", proposal.prazoEstimado ?? "")}
      ${description?.trim() ? row("Projeto", description.trim().slice(0, 600)) : ""}
    </table>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "Francisco Pontes <contato@fcopts.com.br>",
      to: toEmail,
      replyTo: email.trim(),
      subject: `Proposta ${propostaNumero} · ${nome.trim()} (${proposal.tipo})`,
      html: emailWrapper(inner, "Enviado automaticamente pelo gerador de propostas do fcopts.com.br"),
      attachments: [{ filename: `proposta-${propostaNumero}.pdf`, content: pdfBase64 }],
    });
    if (error) throw new Error(String(error));
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  // Registra o lead só depois do envio confirmado — assim a contagem do limite
  // reflete propostas de fato enviadas. Best-effort: falha aqui não quebra o fluxo.
  await registrarLead({
    numero: propostaNumero,
    email: email.trim(),
    nome: nome.trim(),
    whatsapp: whatsapp?.trim() || undefined,
    proposal,
    descricao: description?.trim() || undefined,
    lang,
    ip,
  });

  // Auto-resposta ao cliente (falha não quebra o fluxo)
  try {
    const isEn = lang === "en";
    const clientInner = isEn
      ? `<h1 style="margin:0 0 8px;font-size:20px;color:#1f2430;">Proposal received ✅</h1><p style="font-size:14px;color:#6b6577;">Hi ${escapeHtml(nome.trim())}, Francisco received your proposal <b>${escapeHtml(propostaNumero)}</b> and will get back to you within 1 business day.</p>`
      : `<h1 style="margin:0 0 8px;font-size:20px;color:#1f2430;">Proposta recebida ✅</h1><p style="font-size:14px;color:#6b6577;">Oi ${escapeHtml(nome.trim())}, o Francisco recebeu sua proposta <b>${escapeHtml(propostaNumero)}</b> e retorna em até 1 dia útil.</p>`;
    await resend.emails.send({
      from: "Francisco Pontes <contato@fcopts.com.br>",
      to: email.trim(),
      subject: isEn ? `Your proposal ${propostaNumero}` : `Sua proposta ${propostaNumero}`,
      html: emailWrapper(clientInner),
      attachments: [{ filename: `proposta-${propostaNumero}.pdf`, content: pdfBase64 }],
    });
  } catch {
    // silencioso
  }

  return NextResponse.json({ ok: true });
}
