import { NextRequest, NextResponse } from "next/server";
import type { Porte, PropostaFallbackReason, PropostaResponse } from "@/components/trabalhe-comigo/types";
import { HOURLY_RATES, getFaixaInvestimento } from "@/lib/proposta/pricing.server";
import { checkRateLimit, getClientIp } from "@/lib/proposta/rate-limit.server";

const MIN_DESCRIPTION_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 2000;
const ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";
const REQUEST_TIMEOUT_MS = 12_000;
const WHATSAPP_URL = "https://wa.me/5585981888896";

const VALID_PORTES: Porte[] = ["pequeno", "medio", "grande"];

type AiProposalShape = {
  tipo?: string;
  resumo?: string;
  stack?: string[];
  entregaveis?: string[];
  prazoEstimado?: string;
  porte?: string;
  pagamentoSugerido?: string;
};

function buildSystemPrompt(lang: "pt" | "en") {
  return `Você é o assistente comercial de Francisco Pontes, engenheiro de software full stack sênior, freelance e remoto (PT/EN). Stack: TypeScript, React, Next.js, React Native/Expo, Node.js, NestJS, Express, PostgreSQL, Prisma, Sequelize, Redis, Docker, CI/CD, Vercel, Railway, AWS.

Internamente (nunca mencione isso na resposta), projetos são precificados a partir de R$${HOURLY_RATES.padrao}/hora como taxa padrão. Use isso só para calibrar seu raciocínio de porte, nunca para calcular ou mencionar valores em reais na resposta.

A partir da descrição do visitante, produza um escopo comercial PRELIMINAR, realista e conservador, respondendo ${lang === "en" ? "in English" : "em português"}. Responda APENAS com um objeto JSON válido, sem markdown, sem cercas de código, sem texto fora do JSON. Estrutura exata:
{"tipo":"string curta","resumo":"2 frases","stack":["3 a 6 techs reais da stack dele"],"entregaveis":["3 a 5"],"prazoEstimado":"faixa realista, ex: 8 a 12 semanas","porte":"pequeno" | "medio" | "grande","pagamentoSugerido":"sugestão (Pacote, Por hora ou Mensal) + 1 frase"}.

Critério de porte: pequeno = site/landing ou app simples; medio = sistema web ou app com várias features; grande = SaaS/marketplace/multi-plataforma. NÃO invente valores em reais em nenhum campo.`;
}

function isValidAiProposal(value: unknown): value is Required<AiProposalShape> {
  if (!value || typeof value !== "object") return false;
  const v = value as AiProposalShape;
  return (
    typeof v.tipo === "string" &&
    typeof v.resumo === "string" &&
    Array.isArray(v.stack) &&
    v.stack.every((s) => typeof s === "string") &&
    Array.isArray(v.entregaveis) &&
    v.entregaveis.every((e) => typeof e === "string") &&
    typeof v.prazoEstimado === "string" &&
    typeof v.porte === "string" &&
    VALID_PORTES.includes(v.porte as Porte) &&
    typeof v.pagamentoSugerido === "string"
  );
}

function fallback(reason: PropostaFallbackReason) {
  return NextResponse.json<PropostaResponse>({
    ok: false,
    fallback: { reason, whatsappUrl: WHATSAPP_URL },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { description, company, formLoadedAt, lang } = body as {
    description?: string;
    company?: string;
    formLoadedAt?: number;
    lang?: string;
  };

  // Honeypot: bots preenchem campos ocultos, humanos nunca veem.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  // Time-trap: bots costumam submeter poucos ms após carregar a página.
  const elapsedMs = typeof formLoadedAt === "number" ? Date.now() - formLoadedAt : 0;
  if (elapsedMs < 1500) {
    return NextResponse.json({ ok: true });
  }

  if (
    !description?.trim() ||
    description.trim().length < MIN_DESCRIPTION_LENGTH ||
    description.length > MAX_DESCRIPTION_LENGTH
  ) {
    return NextResponse.json({ error: "Invalid description" }, { status: 400 });
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return fallback("rate_limited");
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return fallback("ai_error");
  }

  const isEnglish = lang === "en";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1000,
        system: buildSystemPrompt(isEnglish ? "en" : "pt"),
        messages: [{ role: "user", content: description.trim() }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return fallback("ai_error");
    }

    const data = await response.json();
    const text: string = (data.content ?? [])
      .filter((block: { type: string }) => block.type === "text")
      .map((block: { text: string }) => block.text)
      .join("")
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return fallback("invalid_response");
    }

    if (!isValidAiProposal(parsed)) {
      return fallback("invalid_response");
    }

    const porte = parsed.porte as Porte;

    return NextResponse.json<PropostaResponse>({
      ok: true,
      proposal: {
        tipo: parsed.tipo,
        resumo: parsed.resumo,
        stack: parsed.stack,
        entregaveis: parsed.entregaveis,
        prazoEstimado: parsed.prazoEstimado,
        porte,
        pagamentoSugerido: parsed.pagamentoSugerido,
        faixaInvestimento: getFaixaInvestimento(porte),
      },
    });
  } catch {
    clearTimeout(timeout);
    return fallback("timeout");
  }
}
