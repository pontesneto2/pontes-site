"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseCTA from "@/components/case/CaseCTA";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO — iMidooh
   ═══════════════════════════════════════════ */

const heroData = {
  title: "iMidooh — Gerenciamento de Mídia DOOH",
  subtitle: "Plataforma de Gerenciamento de Mídia DOOH",
  description:
    "Construção de uma base SaaS escalável voltada para operações de mídia Digital Out Of Home, com foco em arquitetura sólida, organização modular e preparação para expansão multi-tenant.",
  tags: [
    "Docker",
    "React Native",
    "Next.js",
    "Node.js",
    "Express.js",
    "NestJS",
    "PostgreSQL",
    "Prisma",
  ],
};

const summaryData = [
  { label: "Tipo de projeto", value: "Plataforma SaaS" },
  { label: "Papel exercido", value: "Full-Stack / Arquitetura" },
  { label: "Modelo", value: "B2B2C · White-label ready" },
  { label: "Status", value: "Em desenvolvimento" },
  { label: "Ano", value: "2024–2025" },
  { label: "Plataformas", value: "Web + Mobile" },
];

const challengesData = {
  title: "Principais Desafios Enfrentados",
  intro:
    "A complexidade do iMidooh não estava apenas no código, mas na modelagem de um produto que precisava nascer preparado para crescer.",
  items: [
    "Estruturar modelo de dados preparado para múltiplos clientes desde o início",
    "Garantir consistência e integridade de dados em campanhas simultâneas distribuídas",
    "Organizar backend modular para futura expansão white-label sem reescrita",
  ],
};

const kpisData = [
  { text: "Arquitetura modular" },
  { text: "Banco relacional normalizado" },
  { text: "Containerização com Docker" },
  { text: "Ambientes isolados (dev / staging / prod)" },
  { text: "Base preparada para multi-tenancy" },
];

const stackData = [
  "Docker",
  "JavaScript",
  "React Native",
  "Next.js",
  "Node.js",
  "Express.js",
  "NestJS",
  "PostgreSQL",
  "Prisma",
];

/* ═══════════════════════════════════════════
   SEÇÕES NARRATIVAS (JSX)
   ═══════════════════════════════════════════ */

function NarrativeSections() {
  return null; // placeholder — content lives in sectionsData below
}
void NarrativeSections; // suppress unused

const sectionsData = [
  {
    title: "Visão Estratégica",
    children: (
      <>
        <p>
          O iMidooh nasceu com o objetivo de estruturar e escalar operações de
          mídia DOOH (Digital Out Of Home), oferecendo uma plataforma
          centralizada para gerenciamento de campanhas em painéis de LED
          distribuídos em múltiplas localidades — com base sólida para evolução
          SaaS.
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          <div className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
            <h4 className="text-sm font-semibold text-white mb-3">
              O que precisava funcionar desde o dia 1
            </h4>
            <ul className="space-y-2">
              {[
                "Atualizar conteúdos remotamente com previsibilidade",
                "Monitorar exibições e estado operacional em tempo real",
                "Consolidar relatórios de performance com confiança",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="relative h-48 sm:h-56">
              <Image
                src="/logo-dooh.png"
                alt="iMidooh — Gerenciamento de Mídia DOOH"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Contexto e Construção do Produto",
    children: (
      <>
        <p>
          O desenvolvimento começou com um discovery profundo: fluxos
          operacionais, perfis de usuários, regras de exibição e limitações do
          ecossistema físico dos painéis. A estratégia foi evitar improviso e
          construir uma base modular pronta para escalar.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: "API",
              desc: "Regras de campanhas, painéis, exibição e integridade de dados.",
            },
            {
              title: "Admin (Next.js)",
              desc: "Gestão operacional, configuração e visão consolidada.",
            },
            {
              title: "Mobile (React Native)",
              desc: "Operação em campo e acompanhamento prático.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5"
            >
              <h4 className="text-sm font-semibold text-white">{card.title}</h4>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    title: "Arquitetura e Decisões Técnicas",
    children: (
      <>
        <p>
          A arquitetura foi desenhada para ser desacoplada, modular e fácil de
          manter — com decisões que sustentam evolução contínua.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: "Dados consistentes",
              desc: "PostgreSQL com modelagem relacional para integridade e previsibilidade.",
            },
            {
              title: "Produtividade com segurança",
              desc: "Prisma para acelerar acesso a dados com camada tipada e estável.",
            },
            {
              title: "Ambientes padronizados",
              desc: "Docker para previsibilidade e preparação para deploy cloud.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5 hover:border-violet-500/25 hover:bg-violet-500/[0.03] transition-all duration-300"
            >
              <h4 className="text-sm font-semibold text-white">{card.title}</h4>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-violet-500/[0.06] border border-violet-500/20 p-6">
          <p className="text-sm text-violet-100 leading-relaxed">
            O sistema foi estruturado para permitir futura implementação completa
            de <span className="font-semibold text-violet-50">multi-tenancy</span> e expansão
            <span className="font-semibold text-violet-50"> white-label</span>.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Execução e Integração",
    children: (
      <>
        <p>
          A execução cobriu regras de campanhas, controle de exibição e gestão de
          painéis — com integração clara entre backend, painel administrativo e
          operação mobile.
        </p>

        <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
          <h4 className="text-sm font-semibold text-white mb-3">
            Princípios de implementação
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Código organizado e previsível",
              "Separação de camadas e responsabilidades",
              "Comunicação evolutiva entre aplicações",
              "Base pronta para integrações futuras",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </>
    ),
  },
  {
    title: "Deploy e Operação",
    children: (
      <>
        <p>
          A aplicação foi preparada para ambientes distintos (desenvolvimento,
          staging e produção) com containerização e versionamento estruturado.
        </p>
        <p>A infraestrutura foi pensada para garantir:</p>
        <ul className="space-y-2 ml-1">
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Previsibilidade de deploy
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Isolamento de ambientes
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Escalabilidade futura
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Facilidade de manutenção
          </li>
        </ul>
        <p>
          O projeto foi estruturado desde o início considerando observabilidade e
          crescimento operacional.
        </p>
      </>
    ),
  },
  {
    title: "Impacto do Projeto",
    children: (
      <>
        <p>
          O iMidooh consolidou uma base robusta para centralização da operação de
          mídia DOOH, reduzindo dependência de processos manuais e preparando o
          caminho para expansão comercial.
        </p>

        <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            Além da solução técnica, o projeto consolidou um modelo arquitetural
            replicável para produtos SaaS — com foco em organização, escalabilidade
            e manutenção.
          </p>
        </div>
      </>
    ),
  },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function ImidoohCasePage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans relative isolate">
      <div className="relative z-10">
        {/* ── NAV ── */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#141418] md:backdrop-blur md:supports-[backdrop-filter]:bg-black/30">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 md:py-0 md:h-16">
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500 shadow-[0_0_40px_rgba(168,85,247,0.35)] flex items-center justify-center">
                  <span className="text-white font-black text-lg sm:text-xl">FP</span>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-lg sm:text-xl font-black tracking-[0.15em] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent"
                    style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                  >
                    FCOPTS
                  </span>
                  <span className="text-[10px] text-zinc-500 tracking-wide -mt-0.5">
                    Engenheiro de Software | UX Ops
                  </span>
                </div>
              </Link>

              <nav className="hidden md:flex items-center gap-8 text-sm">
                <Link href="/#services" className="hover:text-white/90 text-zinc-300">
                  Serviços
                </Link>
                <Link href="/#projects" className="hover:text-white/90 text-zinc-300">
                  Portfólio
                </Link>
                <Link href="/#stack" className="hover:text-white/90 text-zinc-300">
                  Stack
                </Link>
                <Link href="/#about" className="hover:text-white/90 text-zinc-300">
                  Sobre
                </Link>
                <Link href="/#contact" className="hover:text-white/90 text-zinc-300">
                  Contato
                </Link>
                <a
                  href="https://drive.google.com/file/d/1NGGBTy9kzAPm5Os6we_jaeevsU-_zavX/view?usp=sharing"
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-700/20"
                >
                  Baixar CV
                </a>
              </nav>

              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/25 hover:bg-black/35 p-2.5 transition-colors"
                onClick={() => setNavOpen(!navOpen)}
                aria-expanded={navOpen}
                aria-controls="mobile-nav-case"
              >
                <span className="sr-only">Abrir menu</span>
                {navOpen ? <X className="h-5 w-5 text-zinc-200" /> : <Menu className="h-5 w-5 text-zinc-200" />}
              </button>
            </div>
          </div>

          {navOpen && (
            <div id="mobile-nav-case" className="md:hidden border-t border-white/5 bg-[#141418]">
              <div className="mx-auto max-w-7xl px-3 py-4 flex flex-col gap-2">
                {[
                  { href: "/#services", label: "Serviços" },
                  { href: "/#projects", label: "Portfólio" },
                  { href: "/#stack", label: "Stack" },
                  { href: "/#about", label: "Sobre" },
                  { href: "/#contact", label: "Contato" },
                ].map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="text-zinc-200 rounded-xl px-3 py-3 hover:bg-white/5 transition-colors"
                    onClick={() => setNavOpen(false)}
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* ── HERO ── */}
        <CaseHero {...heroData} />

        {/* ── CONTEÚDO ── */}
        <CaseContent
          summary={summaryData}
          intro="O iMidooh representa a construção de uma base SaaS escalável voltada para operações de mídia DOOH, com foco em arquitetura sólida, organização modular e preparação para expansão multi-tenant."
          sections={sectionsData}
          challenges={challengesData}
          kpis={kpisData}
          stack={stackData}
        />

        {/* ── CTA ── */}
        <CaseCTA />

        {/* ── FOOTER ── */}
        <footer className="py-10 border-t border-white/5 text-center text-[11px] text-zinc-500">
          <div>© 2026 Francisco Pontes</div>
          <div>Todos os Direitos Reservados</div>
          <div className="text-[10px] font-normal text-zinc-300">
            pontesneto2@gmail.com
          </div>
        </footer>
      </div>
    </div>
  );
}
