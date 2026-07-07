import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message, phone, company, lang, formLoadedAt } = body as {
    name?: string;
    email?: string;
    message?: string;
    phone?: string;
    company?: string;
    lang?: string;
    formLoadedAt?: number;
  };
  const isEnglish = lang === "en";

  // Honeypot field: bots fill hidden fields, humans never see them.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  // Time-trap: bots tend to submit within milliseconds of loading the page.
  const elapsedMs = typeof formLoadedAt === "number" ? Date.now() - formLoadedAt : 0;
  if (elapsedMs < 1500) {
    return NextResponse.json({ ok: true });
  }

  if (
    !name?.trim() ||
    !email?.trim() ||
    !message?.trim() ||
    !EMAIL_REGEX.test(email.trim())
  ) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  if (
    name.length > 200 ||
    email.length > 200 ||
    message.length > 5000 ||
    (phone && phone.length > 40)
  ) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Contact form is not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  try {
    const { error } = await resend.emails.send({
      from: "Portfólio Francisco Pontes <contato@fcopts.com.br>",
      to: toEmail,
      replyTo: email.trim(),
      subject: `Novo contato pelo site: ${name.trim()}`,
      html: `
        <p><strong>Nome:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email.trim())}</p>
        ${phone?.trim() ? `<p><strong>Telefone:</strong> ${escapeHtml(phone.trim())}</p>` : ""}
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    try {
      await resend.emails.send({
        from: "Francisco Pontes <contato@fcopts.com.br>",
        to: email.trim(),
        subject: isEnglish
          ? "I received your message — Francisco Pontes"
          : "Recebi sua mensagem — Francisco Pontes",
        html: isEnglish
          ? `
            <p>Hi ${escapeHtml(name.trim())},</p>
            <p>I received your message through the contact form on my portfolio. Thanks for reaching out!</p>
            <p><strong>This is an automated email and isn't monitored — please don't reply to it.</strong></p>
            <p>I'll review your message and get back to you as soon as possible, directly at the email you provided or by phone/WhatsApp if you prefer:</p>
            <p>Email: contato@fcopts.com.br<br />WhatsApp: +55 85 98188-8896</p>
            <p>Your message:</p>
            <p><em>${escapeHtml(message.trim()).replace(/\n/g, "<br />")}</em></p>
            <p>Thanks again,<br />Francisco Pontes</p>
          `
          : `
            <p>Olá ${escapeHtml(name.trim())},</p>
            <p>Recebi sua mensagem através do formulário de contato no meu portfólio. Obrigado por entrar em contato!</p>
            <p><strong>Este é um e-mail automático e não é monitorado — por favor, não responda a ele.</strong></p>
            <p>Vou analisar sua mensagem e retornar o contato o quanto antes, diretamente pelo e-mail que você informou ou por telefone/WhatsApp, se preferir:</p>
            <p>E-mail: contato@fcopts.com.br<br />WhatsApp: +55 85 98188-8896</p>
            <p>Sua mensagem:</p>
            <p><em>${escapeHtml(message.trim()).replace(/\n/g, "<br />")}</em></p>
            <p>Obrigado novamente,<br />Francisco Pontes</p>
          `,
      });
    } catch (autoReplyError) {
      console.error("Resend auto-reply error:", autoReplyError);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }
}
