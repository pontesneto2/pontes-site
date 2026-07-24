/**
 * Guard de Origin para rotas POST que recebem formulário.
 *
 * O Next não envia cabeçalhos CORS por padrão, então leituras cross-origin pelo
 * browser já são barradas e nunca sai "Access-Control-Allow-Origin: *". Este guard
 * adiciona a camada que falta: REJEITAR o POST quando o header Origin está presente
 * e não é o nosso — bloqueia POST cross-site dirigido por browser (abuso estilo CSRF
 * de outra origem). É defesa em profundidade sobre o honeypot + time-trap + rate-limit
 * já existentes; um bot fora do browser pode omitir/forjar o Origin, e por isso esses
 * outros controles seguem sendo a defesa principal.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fcopts.com.br";

// Origens confiáveis além da própria origem da requisição (aceita via comparação
// com o header Host, o que cobre produção, previews da Vercel e dev sem enumerar).
const ALLOWED_ORIGINS = new Set<string>([
  siteUrl,
  siteUrl.replace("://", "://www."),
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");

  // Sem Origin: clientes não-browser legítimos. Os bots que o omitem ainda enfrentam
  // honeypot + time-trap + rate-limit, então deixamos passar (senão quebra curl/etc.).
  if (!origin) return true;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false; // Origin malformado → barra.
  }

  // Same-origin real: host do Origin == host da requisição. Cobre qualquer domínio
  // de deploy (fcopts.com.br, *.vercel.app de preview, localhost) sem listar cada um.
  const host = request.headers.get("host");
  if (host && originHost === host) return true;

  return ALLOWED_ORIGINS.has(origin);
}
