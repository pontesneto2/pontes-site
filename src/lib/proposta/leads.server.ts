import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { Proposal } from "@/components/trabalhe-comigo/types";

/**
 * Persistência de leads do gerador de proposta (Vercel Postgres / Neon).
 *
 * Serve a DOIS objetivos com uma única tabela:
 *  1. Limite anti-abuso: no máximo MAX_POR_JANELA propostas ENVIADAS por e-mail
 *     numa janela móvel de JANELA_DIAS.
 *  2. Lista de leads consultável (SELECT no dashboard do Neon / export CSV).
 *
 * PRINCÍPIO: esta camada NUNCA pode derrubar o funil. Se o banco não estiver
 * configurado (env ausente) ou cair, tudo aqui degrada em fail-open — o envio da
 * proposta segue normal, apenas sem contar/registrar. O e-mail ao Francisco
 * continua sendo a fonte de verdade mínima nesse cenário.
 */

export const MAX_POR_JANELA = 2;
export const JANELA_DIAS = 30;

export type LeadRegistro = {
  numero: string;
  email: string;
  nome: string;
  whatsapp?: string;
  proposal: Proposal;
  descricao?: string;
  lang?: string;
  ip?: string;
};

// Vercel injeta DATABASE_URL na integração Neon; POSTGRES_URL é o nome usado pelo
// SDK @vercel/postgres. Aceitamos ambos para não depender de um nome específico.
function getConnectionString(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || undefined;
}

let cachedSql: NeonQueryFunction<false, false> | null = null;
function getSql(): NeonQueryFunction<false, false> | null {
  if (cachedSql) return cachedSql;
  const connectionString = getConnectionString();
  if (!connectionString) return null;
  cachedSql = neon(connectionString);
  return cachedSql;
}

// A criação da tabela roda no máximo uma vez por instância quente e é idempotente
// (IF NOT EXISTS), então múltiplas instâncias serverless convivem sem problema.
let schemaReady: Promise<void> | null = null;
function ensureSchema(sql: NeonQueryFunction<false, false>): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS proposta_leads (
          id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          created_at  timestamptz NOT NULL DEFAULT now(),
          email       text NOT NULL,
          nome        text NOT NULL,
          whatsapp    text,
          numero      text,
          tipo        text,
          porte       text,
          prazo       text,
          descricao   text,
          lang        text,
          ip          text
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS idx_proposta_leads_email_created
        ON proposta_leads (email, created_at DESC)
      `;
    })().catch((err) => {
      // Se falhar, zera para tentar de novo numa próxima invocação.
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

// E-mail é a chave do limite: normaliza p/ minúsculas e sem espaços, assim
// "Fulano@X.com " e "fulano@x.com" contam como o mesmo lead.
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Quantas propostas o e-mail já enviou na janela móvel. Retorna 0 (fail-open) se
 * o banco não estiver configurado ou a consulta falhar — nunca bloqueia por erro
 * de infra.
 */
export async function contarPropostasNaJanela(email: string): Promise<number> {
  const sql = getSql();
  if (!sql) {
    console.warn("[leads] DATABASE_URL ausente — limite ignorado (fail-open).");
    return 0;
  }
  try {
    await ensureSchema(sql);
    const rows = (await sql`
      SELECT count(*)::int AS n
      FROM proposta_leads
      WHERE email = ${normalizeEmail(email)}
        AND created_at > now() - make_interval(days => ${JANELA_DIAS})
    `) as Array<{ n: number }>;
    return rows[0]?.n ?? 0;
  } catch (err) {
    console.error("[leads] falha ao contar propostas — liberando por fail-open:", err);
    return 0;
  }
}

/**
 * Registra o lead após um envio bem-sucedido. Best-effort: uma falha aqui não
 * quebra o fluxo (o e-mail já foi enviado); apenas logamos.
 */
export async function registrarLead(lead: LeadRegistro): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    await ensureSchema(sql);
    await sql`
      INSERT INTO proposta_leads (email, nome, whatsapp, numero, tipo, porte, prazo, descricao, lang, ip)
      VALUES (
        ${normalizeEmail(lead.email)},
        ${lead.nome},
        ${lead.whatsapp ?? null},
        ${lead.numero},
        ${lead.proposal.tipo},
        ${lead.proposal.porte},
        ${lead.proposal.prazoEstimado},
        ${lead.descricao ?? null},
        ${lead.lang ?? null},
        ${lead.ip ?? null}
      )
    `;
  } catch (err) {
    console.error("[leads] falha ao registrar lead (envio já feito):", err);
  }
}
