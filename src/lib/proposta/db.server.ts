import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Cliente Neon/Postgres compartilhado (Vercel Postgres). Fonte única de conexão
 * para os módulos server-side que persistem dados (leads, rate-limit durável).
 *
 * PRINCÍPIO: nada aqui pode derrubar o funil. Sem string de conexão (ex.: CI, dev
 * sem setup, ou banco fora) `getSql()` retorna null, e cada consumidor degrada em
 * fail-open / fallback — nunca lança.
 */

export type Sql = NeonQueryFunction<false, false>;

// Vercel injeta DATABASE_URL na integração Neon; POSTGRES_URL é o nome do SDK
// @vercel/postgres. Aceitamos ambos para não depender de um nome específico.
function getConnectionString(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || undefined;
}

let cachedSql: Sql | null = null;

export function getSql(): Sql | null {
  if (cachedSql) return cachedSql;
  const connectionString = getConnectionString();
  if (!connectionString) return null; // sem URL → null em toda chamada (CI/dev safe)
  cachedSql = neon(connectionString);
  return cachedSql;
}
