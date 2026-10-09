import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// ── Content-Security-Policy ──────────────────────────────────────────────────
// Montada por diretiva pra facilitar auditoria. Entra em modo Report-Only (ver
// securityHeaders abaixo): o browser só REPORTA violações no console, sem bloquear.
// Quando o console estiver limpo em produção, troque a key do header para
// "Content-Security-Policy" (sem -Report-Only) pra passar a IMPOR.
const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
  "frame-ancestors": ["'self'"], // anti-clickjacking moderno (par do X-Frame-Options)
  "form-action": ["'self'"],
  // 'unsafe-inline': o Next 15 (App Router) injeta scripts inline de bootstrap/
  //   hidratação sem nonce (não há middleware que gere nonce) — obrigatório.
  // 'wasm-unsafe-eval': o @react-pdf/renderer compila o yoga-layout (WebAssembly)
  //   no browser ao gerar a proposta em PDF; sem isto "Baixar/Enviar proposta" quebra.
  // dev: 'unsafe-eval' pro React Refresh (HMR).
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'wasm-unsafe-eval'",
    "https://platform.linkedin.com", // badge de perfil do LinkedIn (rodapé)
    ...(isDev ? ["'unsafe-eval'", "https://va.vercel-scripts.com"] : []),
  ],
  // 'unsafe-inline': <style> inline do Next + atributos style do framer-motion.
  "style-src": ["'self'", "'unsafe-inline'"],
  // data:: SVG de ruído (globals.css) e QR code (toDataURL). blob:: object URLs.
  // thum.io/jsdelivr batem com images.remotePatterns (inclusão defensiva).
  // licdn: imagens do badge de perfil do LinkedIn.
  "img-src": ["'self'", "data:", "blob:", "https://image.thum.io", "https://cdn.jsdelivr.net", "https://media.licdn.com", "https://static.licdn.com"],
  "font-src": ["'self'", "data:"], // next/font self-hospeda as fontes (same-origin)
  // googleapis: fetch client-side do PageSpeed em /engenharia. Resto é same-origin.
  // dev: ws: pro websocket de HMR.
  "connect-src": [
    "'self'",
    "https://www.googleapis.com",
    ...(isDev ? ["ws:", "https://va.vercel-scripts.com"] : []),
  ],
  "frame-src": ["'self'", "https://www.linkedin.com"], // iframe do badge do LinkedIn
  "worker-src": ["'self'", "blob:"],
  "media-src": ["'self'"],
  "manifest-src": ["'self'"],
  "upgrade-insecure-requests": [],
};

const contentSecurityPolicy = Object.entries(cspDirectives)
  .map(([directive, values]) => (values.length ? `${directive} ${values.join(" ")}` : directive))
  .join("; ");

const securityHeaders = [
  // HSTS: força HTTPS por 2 anos. (Sem 'preload' por ora — adicionar só depois de
  // garantir que todo subdomínio é HTTPS-only e submeter em hstspreload.org.)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" }, // fallback legado do frame-ancestors
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nega recursos que o site não usa (superset do pedido, custo zero).
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()",
  },
  // Report-Only primeiro. Trocar a key pra "Content-Security-Policy" quando limpo.
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["src"],
    ignoreDuringBuilds: true,
  },
  images: {
    // AVIF antes de WebP: mesma qualidade percebida com payload menor,
    // reduzindo o peso de imagem que pesa em LCP.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.thum.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/devicon/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "pontes-portfolio.vercel.app" }],
        destination: "https://fcopts.com.br/:path*",
        permanent: true,
      },
      {
        source: "/work-with-me",
        destination: "/trabalhe-comigo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
