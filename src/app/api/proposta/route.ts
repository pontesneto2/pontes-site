import { NextRequest, NextResponse } from "next/server";
import type {
  Porte,
  TipoProjeto,
  Existente,
  Urgencia,
  PropostaFallbackReason,
  PropostaResponse,
} from "@/components/trabalhe-comigo/types";
import { HOURLY_RATE, getInvestimento } from "@/lib/proposta/pricing.server";
import { checkRateLimit, getClientIp } from "@/lib/proposta/rate-limit.server";

const MIN_DESCRIPTION_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_FIELD_LENGTH = 300;
const ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";
const REQUEST_TIMEOUT_MS = 12_000;
const WHATSAPP_URL = "https://wa.me/5585981888896";

const VALID_PORTES: Porte[] = ["pequeno", "medio", "grande"];
const VALID_TIPOS: TipoProjeto[] = [
  "sistema_saas",
  "app_mobile",
  "site_landing",
  "api_integracao",
  "migracao",
  "manutencao",
];
const VALID_EXISTENTES: Existente[] = ["do_zero", "continuar", "migracao_existente"];
const VALID_URGENCIAS: Urgencia[] = ["tranquilo", "normal", "urgente"];

const TIPO_LABEL: Record<TipoProjeto, string> = {
  sistema_saas: "Sistema web / SaaS",
  app_mobile: "Aplicativo mobile (iOS/Android)",
  site_landing: "Site ou landing page",
  api_integracao: "API ou integração",
  migracao: "Migração de sistema",
  manutencao: "Manutenção / evolução de sistema existente",
};

const EXISTENTE_LABEL: Record<Existente, string> = {
  do_zero: "Começa do zero",
  continuar: "Continua um sistema que já existe",
  migracao_existente: "Migra um sistema existente para nova stack",
};

const URGENCIA_LABEL: Record<Urgencia, string> = {
  tranquilo: "Sem pressa",
  normal: "Prazo normal",
  urgente: "Urgente",
};

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

Internamente (nunca mencione isso na resposta), a taxa horária de referência é R$${HOURLY_RATE}/hora. Use isso só para calibrar seu raciocínio de porte, nunca para calcular ou mencionar valores em reais na resposta.

A partir da descrição do visitante, produza um escopo comercial PRELIMINAR, realista e conservador, respondendo ${lang === "en" ? "in English" : "em português"}. Responda APENAS com um objeto JSON válido, sem markdown, sem cercas de código, sem texto fora do JSON. Estrutura exata:
{"tipo":"string curta","resumo":"2 frases","stack":["3 a 6 techs reais da stack dele"],"entregaveis":["3 a 5"],"prazoEstimado":"faixa realista de prazo","porte":"pequeno" | "medio" | "grande","pagamentoSugerido":"sugestão (Pacote, Por hora ou Mensal) + 1 frase"}.

Critério de porte e prazo:
- pequeno = site estático ou landing page. Prazo típico: 7 dias úteis.
- medio = sistema web (plataforma, painel, área logada), API/integração, ou manutenção/evolução. Prazo típico: até 60 dias conforme a complexidade.
- grande = SaaS, marketplace, projeto multiplataforma OU aplicativo mobile (iOS/Android). Prazo: conforme o escopo, geralmente vários meses.

Use o campo "Tipo de projeto" do contexto como principal sinal para o porte, ajustando pela complexidade descrita.

REGRA IMPORTANTE: aplicativo mobile e sistema web são escopos DIFERENTES. Se o visitante pede só um sistema web, não inclua app mobile nos entregáveis, e vice-versa. Só trate como multiplataforma (app + web) se ele pedir explicitamente os dois. Um aplicativo mobile, mesmo simples, é porte grande.

NÃO invente valores em reais em nenhum campo. O prazoEstimado deve respeitar as âncoras acima.`;
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

  const { description, tipo, existente, urgencia, orcamento, siteReferencia, company, formLoadedAt, lang } =
    body as {
      description?: string;
      tipo?: string;
      existente?: string;
      urgencia?: string;
      orcamento?: string;
      siteReferencia?: string;
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

  if (
    !VALID_TIPOS.includes(tipo as TipoProjeto) ||
    !VALID_EXISTENTES.includes(existente as Existente) ||
    !VALID_URGENCIAS.includes(urgencia as Urgencia)
  ) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  if ((orcamento && orcamento.length > MAX_FIELD_LENGTH) || (siteReferencia && siteReferencia.length > MAX_FIELD_LENGTH)) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  const tipoProjeto = tipo as TipoProjeto;
  const existenteProjeto = existente as Existente;
  const urgenciaProjeto = urgencia as Urgencia;

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return fallback("rate_limited");
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return fallback("ai_error");
  }

  const isEnglish = lang === "en";
  const contextoLinhas = [
    `Descrição do projeto: ${description.trim()}`,
    `Tipo de projeto: ${TIPO_LABEL[tipoProjeto]}`,
    `Situação: ${EXISTENTE_LABEL[existenteProjeto]}`,
    `Urgência: ${URGENCIA_LABEL[urgenciaProjeto]}`,
  ];
  if (orcamento?.trim()) contextoLinhas.push(`Orçamento informado pelo cliente: ${orcamento.trim()}`);
  if (siteReferencia?.trim()) contextoLinhas.push(`Site de referência: ${siteReferencia.trim()}`);
  const userContent = contextoLinhas.join("\n");

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
        messages: [{ role: "user", content: userContent }],
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
        investimento: getInvestimento(porte, {
          existente: existenteProjeto,
          urgencia: urgenciaProjeto,
        }),
      },
    });
  } catch {
    clearTimeout(timeout);
    return fallback("timeout");
  }
}
