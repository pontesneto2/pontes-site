import { getSql, type Sql } from "./db.server";

/**
 * Rate limit por bucket (ex.: `endpoint:ip`), DURÁVEL no Neon/Postgres.
 *
 * Substitui o antigo limitador só-em-memória (que resetava a cada cold start e não
 * valia entre regiões da Vercel). Agora a contagem persiste e vale de verdade entre
 * invocações serverless.
 *
 * PRINCÍPIO: nunca derruba o funil. Sem banco (CI/dev) ou em falha do banco, cai no
 * limitador em memória — "infra fora → throttle por instância", não "passa tudo".
 */

export type RateLimit = { max: number; windowSec: number };

// Limites por endpoint (ajustáveis). Bucket = `${endpoint}:${ip}` → orçamentos
// independentes por rota.
export const RATE_LIMITS = {
  proposta: { max: 6, windowSec: 600 }, // chamada de IA paga — o mais caro
  "proposta-send": { max: 5, windowSec: 600 }, // e-mail + DB (o limite 2/30d por e-mail continua)
  contact: { max: 3, windowSec: 600 }, // dispara 2 e-mails por envio
} as const satisfies Record<string, RateLimit>;

// --- Fallback em memória (best-effort, por instância quente) -----------------
// Usado quando não há banco: garante que uma queda do Postgres não deixe os
// endpoints pagos totalmente abertos. É também o caminho exercitado no CI (sem DB).
const hits = new Map<string, number[]>();

function checkInMemory(bucket: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (hits.get(bucket) ?? []).filter((t) => now - t < windowMs);
  if (timestamps.length >= max) {
    hits.set(bucket, timestamps);
    return false;
  }
  timestamps.push(now);
  hits.set(bucket, timestamps);
  return true;
}

// --- Camada durável (Neon) ---------------------------------------------------
let schemaReady: Promise<void> | null = null;
function ensureSchema(sql: Sql): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS rate_limit_events (
          id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          bucket     text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS idx_rate_limit_bucket_created
        ON rate_limit_events (bucket, created_at DESC)
      `;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

/**
 * Retorna true se o pedido pode seguir (sob o limite), false se deve ser barrado.
 *
 * Caminho durável: um único statement atômico que (1) poda as linhas fora da janela
 * do bucket, (2) conta as de dentro e (3) insere condicionalmente se ainda houver
 * espaço — devolvendo se inseriu. Uma ida ao banco. prune (created_at < since) e
 * count (created_at >= since) tocam faixas disjuntas, então não interferem entre si.
 */
export async function checkRateLimit(bucket: string, { max, windowSec }: RateLimit): Promise<boolean> {
  const sql = getSql();
  if (!sql) return checkInMemory(bucket, max, windowSec * 1000);

  try {
    await ensureSchema(sql);
    const rows = (await sql`
      WITH win AS (
        SELECT now() - make_interval(secs => ${windowSec}) AS since
      ),
      pruned AS (
        DELETE FROM rate_limit_events
        WHERE bucket = ${bucket} AND created_at < (SELECT since FROM win)
      ),
      cnt AS (
        SELECT count(*)::int AS n
        FROM rate_limit_events
        WHERE bucket = ${bucket} AND created_at >= (SELECT since FROM win)
      ),
      ins AS (
        INSERT INTO rate_limit_events (bucket)
        SELECT ${bucket} WHERE (SELECT n FROM cnt) < ${max}
        RETURNING 1
      )
      SELECT EXISTS (SELECT 1 FROM ins) AS allowed
    `) as Array<{ allowed: boolean }>;
    return rows[0]?.allowed ?? true;
  } catch (err) {
    console.error("[rate-limit] falha na verificação durável — usando fallback em memória:", err);
    return checkInMemory(bucket, max, windowSec * 1000);
  }
}

/**
 * IP do cliente. Prefere x-real-ip (setado pela edge da Vercel, não forjável pelo
 * cliente) antes do x-forwarded-for, cujo primeiro token um bot poderia rotacionar
 * para driblar o contador por-IP.
 */
export function getClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  return "unknown";
}
