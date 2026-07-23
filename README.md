# fcopts.com.br

Portfólio construído em Next.js (App Router), sem CMS e sem libs de i18n/UI de terceiros — as decisões de arquitetura abaixo priorizam performance percebida, SEO técnico e um formulário de contato que funciona de verdade (nada de `mailto:`).

🔗 [fcopts.com.br](https://fcopts.com.br)

## Decisões técnicas

**i18n sem biblioteca.** PT/EN implementado com um `LanguageProvider` próprio (`src/lib/language-context.tsx`): detecta o idioma do navegador no primeiro acesso, persiste a escolha em `localStorage` e expõe um helper `tr(lang, { pt, en })` tipado. Evita o overhead de `next-intl`/`i18next` para um caso de uso que não precisa de rotas por idioma nem de arquivos de tradução externos.

**Canonicalização de domínio.** Redirect 308 em `next.config.ts` de `pontes-portfolio.vercel.app` para `fcopts.com.br`, para não competir com o próprio domínio da Vercel por SEO/backlinks.

**SEO técnico completo.** `metadata` tipado no layout raiz (OpenGraph + Twitter cards), `sitemap.ts` e `robots.ts` gerados via Route Handlers do App Router (`MetadataRoute`), com `metadataBase` configurável por env var — sem depender de arquivos estáticos `.xml`/`.txt`.

**Formulário de contato com backend real.** Route Handler em `src/app/api/contact/route.ts` que valida payload, aplica honeypot anti-spam (campo oculto — bots preenchem, humanos não), envia via Resend e dispara um segundo e-mail de auto-resposta pro remetente. Sem `RESEND_API_KEY`/`CONTACT_TO_EMAIL` configuradas, a rota falha com 503 de forma explícita em vez de falhar silenciosamente.

**Estatísticas do GitHub ao vivo.** `GithubStats.tsx` consome a API pública do GitHub no client (conta, estrelas somadas dos repositórios, contribuições do ano) — sem backend próprio nem cache, aceitando o trade-off de depender do rate limit não-autenticado da API.

**Fontes e imagens otimizadas.** `next/font/google` para self-host de fontes (Space Grotesk, JetBrains Mono) sem layout shift; `next/image` com `remotePatterns` restritos a origens específicas (thum.io para screenshots ao vivo de projetos, jsDelivr/devicon para ícones de stack).

**Animações orientadas a viewport.** Framer Motion com `whileInView` em vez de animar tudo no mount — cada seção só anima quando entra na tela, reduzindo trabalho de layout/paint no carregamento inicial.

**Landing comercial com gerador de proposta por IA.** A página `/trabalhe-comigo` (redirect 308 de `/work-with-me`) tem um gerador de proposta: o Route Handler `src/app/api/proposta/route.ts` valida um captcha Cloudflare Turnstile, aplica rate limit e honeypot, chama a Anthropic API (`claude-haiku-4-5`) e devolve uma proposta estruturada com preço/prazo determinísticos (`src/lib/proposta/pricing.server.ts`) — com fallback pro WhatsApp se algo falhar. A proposta gerada vira PDF (`@react-pdf/renderer` + QR code) e pode ser enviada por e-mail via `src/app/api/proposta-send/route.ts`.

**Avaliações reais do Google, curadas manualmente.** `trabalhe-comigo/GoogleReviews.tsx` (seção "O que dizem no Google", na landing comercial) lê `src/data/google-reviews.json` (nota geral, total de avaliações e a lista curada), no mesmo espírito de `testimonials.json`. A Google Places API foi avaliada e descartada: qualquer API do Google Maps Platform exige conta de faturamento (cartão) vinculada ao projeto mesmo dentro da cota gratuita, e a Business Profile API (que dispensa cartão) exige OAuth como dono do perfil + aprovação manual do Google para acesso a reviews — inviável para atualização simples. Com `reviews: []`, a seção fica oculta (sem dado fake).

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | Next.js 15 (App Router, Turbopack) | SSR/SSG híbrido, Route Handlers para API e metadata, build rápido |
| Linguagem | TypeScript | tipagem no `Bilingual`, nos payloads da API e nos dados de case study |
| Estilo | Tailwind CSS | consistência de design tokens sem CSS-in-JS |
| Animação | Framer Motion | `whileInView`/`viewport` para animações performáticas |
| E-mail | Resend | API simples, sem SMTP próprio |
| Deploy/Analytics | Vercel + `@vercel/analytics` | integração nativa com Next.js |

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        # metadata, fontes, LanguageProvider
│   ├── page.tsx          # hero, seções, carrossel de projetos
│   ├── trabalhe-comigo/  # landing comercial + gerador de proposta por IA
│   ├── case/<slug>/      # case studies (ucopiloto, imidooh)
│   ├── privacidade/      # política de privacidade (LGPD)
│   ├── api/
│   │   ├── contact/      # Route Handler: validação + Resend
│   │   ├── github-stats/ # proxy cacheado da API pública do GitHub
│   │   ├── proposta/     # Turnstile + rate limit + Anthropic → proposta
│   │   └── proposta-send/# envia o PDF da proposta por e-mail (Resend)
│   ├── sitemap.ts        # MetadataRoute.Sitemap
│   └── robots.ts         # MetadataRoute.Robots
├── components/
│   ├── Hero.tsx, SiteHeader.tsx, SiteFooter.tsx, Preloader.tsx
│   ├── ContactForm.tsx
│   ├── GithubStats.tsx   # estatísticas do GitHub (via /api/github-stats)
│   ├── SkillsTools.tsx
│   ├── Testimonials.tsx
│   ├── case/             # blocos reutilizados nas páginas de case study
│   └── trabalhe-comigo/  # seções da landing + gerador/PDF de proposta
│       └── GoogleReviews.tsx # avaliações reais do Google (curadas em data/google-reviews.json)
├── data/testimonials.json, google-reviews.json
└── lib/
    ├── language-context.tsx  # provider de i18n + helper tr()
    ├── constants.ts
    ├── fonts.ts
    └── proposta/             # pricing, rate limit e Turnstile (server-side)
```

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:3000
```

Variáveis de ambiente (`.env.local`):

```bash
RESEND_API_KEY=                  # sem isso, /api/contact e /api/proposta-send respondem 503
CONTACT_TO_EMAIL=                # destino dos e-mails do formulário/proposta
GITHUB_TOKEN=                    # opcional, eleva o rate limit de /api/github-stats
ANTHROPIC_API_KEY=               # gerador de proposta por IA; sem isso, cai no fallback
NEXT_PUBLIC_SITE_URL=            # opcional, default https://fcopts.com.br
# Cloudflare Turnstile (anti-spam do gerador de proposta).
# Chaves de teste "always pass" para dev:
#   site 1x00000000000000000000AA / secret 1x0000000000000000000000000000000AA
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

```bash
npm run build && npm run start   # produção
npm run lint
```

## Deploy

Vercel, preset Next.js (`vercel.json`), runtime Node 20. Variáveis de ambiente configuradas no painel do projeto.
