const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 8_000;

/**
 * Verifica o token do Cloudflare Turnstile no servidor, antes de qualquer chamada
 * paga à IA. Retorna true se o pedido deve seguir.
 *
 * Política FAIL-OPEN: o Turnstile é camada extra sobre honeypot + time-trap +
 * rate-limit. Ele nunca deve derrubar o funil de captação por conta própria.
 * Portanto liberamos o pedido quando o desafio não pôde sequer ser avaliado
 * (widget não carregou, Cloudflare fora, timeout de rede). Só bloqueamos quando
 * há um token e o Cloudflare afirma explicitamente que ele é inválido — o caso de
 * um bot que forjou um token.
 *
 * - Sem TURNSTILE_SECRET_KEY (ex.: dev sem setup): bypass com aviso.
 * - Sem token (widget quebrado/bloqueado/ad-blocker): libera (fail-open).
 * - Token presente + Cloudflare diz success=false: bloqueia.
 * - Erro de infra ao verificar (HTTP não-ok / rede / timeout): libera (fail-open).
 */
export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY ausente — verificação ignorada (bypass de dev).");
    return true;
  }

  // Widget não conseguiu emitir token (Cloudflare fora, domínio fora da allowlist,
  // ad-blocker). Não travamos o humano: as outras defesas do servidor seguem valendo.
  if (!token) {
    console.warn("[turnstile] token ausente — liberando por fail-open (widget indisponível?).");
    return true;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") body.append("remoteip", ip);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: controller.signal,
    });

    // Falha na infra de verificação (não é culpa do usuário): fail-open.
    if (!res.ok) {
      console.warn(`[turnstile] siteverify respondeu ${res.status} — liberando por fail-open.`);
      return true;
    }

    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Rede/timeout ao falar com o Cloudflare: fail-open.
    console.warn("[turnstile] erro de rede na verificação — liberando por fail-open.");
    return true;
  } finally {
    clearTimeout(timeout);
  }
}
