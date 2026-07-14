import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { RATE_LIMITS, checkRateLimit, getClientIp } from "@/lib/proposta/rate-limit.server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[\p{L}][\p{L}\s'’-]{1,}$/u;
const MIN_MESSAGE_LENGTH = 20;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const toHtmlLines = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

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

// Top row of the auto-reply: site address (orients the reader) + a "received" status pill.
function emailHeaderRow(statusLabel: string) {
  return `
    <table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 20px;">
      <tr>
        <td style="font-size:12px;letter-spacing:.04em;color:#a855f7;font-weight:700;vertical-align:middle;">fcopts.com.br</td>
        <td style="text-align:right;vertical-align:middle;"><span style="display:inline-block;background-color:#f3e8ff;color:#a855f7;font-size:11px;font-weight:700;letter-spacing:.02em;padding:5px 12px;border-radius:999px;">&#10003; ${statusLabel}</span></td>
      </tr>
    </table>
  `;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message, phone, company, lang, formLoadedAt, origem } = body as {
    name?: string;
    email?: string;
    message?: string;
    phone?: string;
    company?: string;
    lang?: string;
    formLoadedAt?: number;
    origem?: string;
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
    !EMAIL_REGEX.test(email.trim()) ||
    !NAME_REGEX.test(name.trim())
  ) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  if (message.trim().length < MIN_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message too short" }, { status: 400 });
  }

  if (phone?.trim()) {
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }
  }

  if (
    name.length > 200 ||
    email.length > 200 ||
    message.length > 5000 ||
    (phone && phone.length > 40)
  ) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  // Rate-limit durável por IP: o formulário dispara 2 e-mails por envio.
  const ip = getClientIp(request);
  if (!(await checkRateLimit(`contact:${ip}`, RATE_LIMITS.contact))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
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

  try {
    const internalHtml = emailWrapper(`
      <p style="margin:0 0 18px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#a855f7;font-weight:700;">Novo contato pelo site</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#3f3f46;">
        <tr>
          <td style="padding:6px 0;color:#8b8594;width:90px;vertical-align:top;">Nome</td>
          <td style="padding:6px 0;">${escapeHtml(name.trim())}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#8b8594;vertical-align:top;">E-mail</td>
          <td style="padding:6px 0;"><a href="mailto:${escapeHtml(email.trim())}" style="color:#a855f7;text-decoration:none;">${escapeHtml(email.trim())}</a></td>
        </tr>
        ${
          phone?.trim()
            ? `<tr><td style="padding:6px 0;color:#8b8594;vertical-align:top;">Telefone</td><td style="padding:6px 0;"><a href="https://wa.me/${phone.replace(/\D/g, "")}" style="color:#a855f7;text-decoration:none;">${escapeHtml(phone.trim())}</a></td></tr>`
            : ""
        }
        ${
          origem?.trim()
            ? `<tr><td style="padding:6px 0;color:#8b8594;vertical-align:top;">Origem</td><td style="padding:6px 0;">${escapeHtml(origem.trim())}</td></tr>`
            : ""
        }
      </table>
      <p style="margin:22px 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#8b8594;font-weight:700;">Mensagem</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#18181b;">${toHtmlLines(message.trim())}</p>
      <div style="margin:28px 0 0;">
        <a href="mailto:${escapeHtml(email.trim())}" style="display:inline-block;background-color:#a855f7;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:10px;">Responder para ${escapeHtml(name.trim())}</a>
      </div>
    `);

    const { error } = await resend.emails.send({
      from: "Portfólio Francisco Pontes <contato@fcopts.com.br>",
      to: toEmail,
      replyTo: email.trim(),
      subject: `Novo contato pelo site: ${name.trim()}`,
      html: internalHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    try {
      const autoReplyHtml = isEnglish
        ? emailWrapper(
            `
              ${emailHeaderRow("Received")}
              <h1 style="margin:0 0 16px;font-size:21px;line-height:1.3;color:#18181b;">I received your message.</h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#3f3f46;">Thanks for writing through my portfolio! I'll read it carefully and get back to you soon, at the email you used here.</p>
              <div style="background-color:#faf9fc;border:1px solid #ece9f5;border-radius:12px;padding:16px 18px;margin:0 0 24px;">
                <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#8b8594;font-weight:700;">Your message</p>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#3f3f46;">${toHtmlLines(message.trim())}</p>
              </div>
              <p style="margin:0 0 4px;font-size:14px;color:#3f3f46;">Other ways to reach me:</p>
              <p style="margin:0 0 20px;font-size:14px;color:#3f3f46;">Email: <a href="mailto:contato@fcopts.com.br" style="color:#a855f7;text-decoration:none;">contato@fcopts.com.br</a><br />WhatsApp: <a href="https://wa.me/5585981888896" style="color:#a855f7;text-decoration:none;">+55 85 98188-8896</a></p>
              <p style="margin:0;padding-top:20px;border-top:1px solid #ece9f5;font-size:14px;color:#3f3f46;">Talk soon,<br /><strong>Francisco Pontes</strong></p>
            `,
            "You're receiving this email because you sent a message on fcopts.com.br"
          )
        : emailWrapper(
            `
              ${emailHeaderRow("Recebido")}
              <h1 style="margin:0 0 16px;font-size:21px;line-height:1.3;color:#18181b;">Recebi sua mensagem.</h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#3f3f46;">Obrigado por escrever pelo meu portfólio! Vou ler com atenção e te respondo em breve, no e-mail que você usou aqui.</p>
              <div style="background-color:#faf9fc;border:1px solid #ece9f5;border-radius:12px;padding:16px 18px;margin:0 0 24px;">
                <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#8b8594;font-weight:700;">Sua mensagem</p>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#3f3f46;">${toHtmlLines(message.trim())}</p>
              </div>
              <p style="margin:0 0 4px;font-size:14px;color:#3f3f46;">Outras formas de falar comigo:</p>
              <p style="margin:0 0 20px;font-size:14px;color:#3f3f46;">E-mail: <a href="mailto:contato@fcopts.com.br" style="color:#a855f7;text-decoration:none;">contato@fcopts.com.br</a><br />WhatsApp: <a href="https://wa.me/5585981888896" style="color:#a855f7;text-decoration:none;">+55 85 98188-8896</a></p>
              <p style="margin:0;padding-top:20px;border-top:1px solid #ece9f5;font-size:14px;color:#3f3f46;">Até já,<br /><strong>Francisco Pontes</strong></p>
            `,
            "Você recebeu este e-mail porque enviou uma mensagem em fcopts.com.br"
          );

      await resend.emails.send({
        from: "Site Francisco Pontes <contato@fcopts.com.br>",
        to: email.trim(),
        subject: isEnglish
          ? `Thanks for reaching out, ${name.trim()}!`
          : `Obrigado pelo contato, ${name.trim()}!`,
        html: autoReplyHtml,
      });
    } catch (autoReplyError) {
      console.error("Resend auto-reply error:", autoReplyError);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }
}
