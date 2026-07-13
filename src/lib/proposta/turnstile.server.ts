const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 8_000;

/**
 * Verifica o token do Cloudflare Turnstile no servidor, antes de qualquer chamada
 * paga à IA. Retorna true se o desafio foi resolvido por um humano.
 *
 * Se TURNSTILE_SECRET_KEY não estiver configurada (ex.: ambiente local sem setup),
 * faz bypass explícito com aviso — assim o desenvolvimento não trava. Em produção a
 * env deve estar sempre presente para a proteção valer.
 */
export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY ausente — verificação ignorada (bypass de dev).");
    return true;
  }

  if (!token) return false;

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

    if (!res.ok) return false;

    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
