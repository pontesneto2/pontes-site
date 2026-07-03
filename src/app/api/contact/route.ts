import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message, phone, company } = body as {
    name?: string;
    email?: string;
    message?: string;
    phone?: string;
    company?: string;
  };

  // Honeypot field: bots fill hidden fields, humans never see them.
  if (company) {
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
      from: "Portfólio Francisco Pontes <onboarding@resend.dev>",
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

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }
}
