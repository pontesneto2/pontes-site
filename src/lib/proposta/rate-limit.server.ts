const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

/**
 * Rate limit em memória, best-effort: funções serverless da Vercel não garantem
 * a mesma instância entre invocações (cold starts, múltiplas regions), então este
 * Map reseta a qualquer momento. Não é proteção real de produção contra abuso,
 * apenas uma camada extra além do honeypot e do time-trap.
 */
const hits = new Map<string, number[]>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(ip, timestamps);
    return false;
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return true;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}
