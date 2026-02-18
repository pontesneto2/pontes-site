# Pontes — Portfolio

Site/portfólio pessoal do Francisco Pontes, construído com Next.js (App Router) e foco em performance, layout responsivo e animações suaves. Reúne seções de serviços, portfólio (sistemas e websites), stack, sobre e contato.

## Stack

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animações)
- **Lucide React** (ícones)

## O que tem aqui

- **Landing page completa** (hero, navegação, seções e CTAs)
- **Portfólio** com abas (ex.: “sistemas” e “websites”) e lista de projetos
- **Animações e micro-interações** com Framer Motion
- **Background decorativo** com ícones flutuantes (componente 3D/float)
- **SEO básico** via `metadata` do Next (title/description)

## Pré-requisitos

- **Node.js**: 20.x
- **npm**: 10.x

(Conforme `engines` do `package.json`.)

## Rodando localmente

Instalar dependências:

```bash
npm install
```

Ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse: http://localhost:3000

Build e produção:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

## Estrutura (resumo)

- `src/app/layout.tsx` — layout raiz e `metadata`
- `src/app/page.tsx` — página principal (conteúdo do portfólio, listas, seções)
- `src/components/FloatingIcons3D.tsx` — ícones flutuantes/animações de fundo
- `src/app/globals.css` — estilos globais + Tailwind
- `public/` — imagens e assets (thumbs/logos usados nos cards)

## Personalização rápida

- **Textos, listas e links do portfólio**: edite os arrays e seções em `src/app/page.tsx`
- **Título/descrição do site (SEO)**: ajuste o `metadata` em `src/app/layout.tsx`
- **Efeito de fundo (ícones flutuantes)**: ajuste em `src/components/FloatingIcons3D.tsx`
- **Imagens**: adicione/atualize em `public/` e referencie na página

## Imagens remotas

O Next está configurado para permitir imagens remotas de `image.thum.io` (ver `next.config.ts`).
Se você usar outra origem externa, adicione um novo `remotePatterns`.

## Deploy

Funciona bem na **Vercel** (Next.js).

Passos comuns:

- Conectar o repositório na Vercel
- Build command: `npm run build`
- Runtime: Node 20

## Contato

- Atualize os links de contato (GitHub/LinkedIn/e-mail) diretamente na página principal em `src/app/page.tsx`.
