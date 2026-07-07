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
│   ├── case/<slug>/      # case studies (imidooh, erp-estrela)
│   ├── privacidade/      # política de privacidade (LGPD)
│   ├── api/contact/      # Route Handler: validação + Resend
│   ├── sitemap.ts        # MetadataRoute.Sitemap
│   └── robots.ts         # MetadataRoute.Robots
├── components/
│   ├── ContactForm.tsx
│   ├── FloatingIcons3D.tsx
│   ├── GithubStats.tsx   # fetch client-side na API pública do GitHub
│   ├── SkillsTools.tsx
│   ├── Testimonials.tsx
│   └── case/             # blocos reutilizados nas páginas de case study
├── data/testimonials.json
└── lib/
    ├── language-context.tsx  # provider de i18n + helper tr()
    ├── constants.ts
    └── fonts.ts
```

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:3000
```

Variáveis de ambiente (`.env.local`):

```bash
RESEND_API_KEY=         # sem isso, a rota /api/contact responde 503
CONTACT_TO_EMAIL=
NEXT_PUBLIC_SITE_URL=   # opcional, default https://fcopts.com.br
```

```bash
npm run build && npm run start   # produção
npm run lint
```

## Deploy

Vercel, preset Next.js (`vercel.json`), runtime Node 20. Variáveis de ambiente configuradas no painel do projeto.
