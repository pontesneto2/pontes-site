"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseLearnings from "@/components/case/CaseLearnings";
import CaseCTA from "@/components/case/CaseCTA";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO — ERP ESTRELA
   ═══════════════════════════════════════════ */

const heroData = {
  title: "ERP Estrela — Sistema Financeiro Corporativo",
  subtitle: "Sistema Financeiro Corporativo",
  description:
    "O ERP Estrela foi concebido como uma solução web para estruturar e padronizar rotinas financeiras corporativas, centralizando fluxo de caixa, controle de despesas, relatórios gerenciais e visibilidade estratégica para tomada de decisão.",
  tags: [
    "Node.js",
    "Express.js",
    "Prisma",
    "PostgreSQL",
    "Docker",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
};

const summaryData = [
  { label: "Tipo", value: "Sistema Web" },
  { label: "Papel", value: "Arquitetura & Full-Stack" },
  { label: "Modelo", value: "Corporativo Interno" },
  { label: "Status", value: "Em evolução" },
];

const challengesData = {
  title: "Principais Desafios Enfrentados",
  items: [
    "Modelar corretamente regras financeiras sem comprometer performance",
    "Garantir integridade transacional em movimentações",
    "Estruturar relatórios com base em dados consistentes",
    "Criar base sustentável para futuras integrações",
  ],
};

const kpisData = [
  { text: "Arquitetura modular organizada" },
  { text: "Banco relacional normalizado" },
  { text: "Separação clara de regras de negócio" },
  { text: "Containerização com Docker" },
  { text: "Ambientes isolados (dev/staging/prod)" },
  { text: "Base preparada para expansão funcional" },
];

const stackData = [
  "Node.js",
  "Express.js",
  "Prisma",
  "PostgreSQL",
  "Docker",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
];

const learningsData = [
  "Modelagem Financeira",
  "Integridade Transacional",
  "Arquitetura Modular",
  "Organização Backend Node.js",
  "Modelagem Relacional Avançada",
  "Estruturação de ERP",
  "Separação de Responsabilidades",
  "Deploy Estruturado",
  "Containerização",
  "Sistemas Corporativos",
];

const sectionsData = [
  {
    title: "Visão Estratégica",
    children: (
      <>
        <p>
          O ERP Estrela foi concebido como uma solução web para estruturar e padronizar rotinas financeiras corporativas, centralizando fluxo de caixa, controle de despesas, relatórios gerenciais e visibilidade estratégica para tomada de decisão.
        </p>
        <p>
          O projeto nasceu da necessidade de transformar processos financeiros descentralizados e pouco rastreáveis em um sistema organizado, previsível e preparado para crescimento empresarial.
        </p>
      </>
    ),
  },
  {
    title: "Contexto e Construção do Produto",
    children: (
      <>
        <p>
          O cenário inicial envolvia operações financeiras realizadas de forma fragmentada, com controles paralelos e baixa integração entre setores. A ausência de padronização dificultava a análise estratégica e aumentava riscos operacionais.
        </p>
        <p>
          O processo iniciou com levantamento detalhado das rotinas financeiras, identificação dos pontos críticos e mapeamento de fluxos reais do negócio.
        </p>
        <p>
          A estratégia adotada foi construir um sistema modular, com modelagem relacional consistente e separação clara entre regras de negócio, persistência e interface.
        </p>
        <p>
          O foco não foi apenas desenvolver funcionalidades, mas estruturar uma base sólida para evolução contínua.
        </p>
      </>
    ),
  },
  {
    title: "Arquitetura e Decisões Técnicas",
    children: (
      <>
        <p>
          A arquitetura foi projetada priorizando:
        </p>
        <ul className="space-y-2 ml-1">
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Clareza estrutural
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Integridade de dados
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
          A modelagem com PostgreSQL garantiu consistência financeira e rastreabilidade de movimentações.
        </p>
        <p>
          O uso de Prisma trouxe segurança na camada de acesso ao banco, enquanto a aplicação backend estruturada com Node.js e Express garantiu organização modular.
        </p>
        <p>
          O frontend em Next.js com TypeScript proporcionou tipagem segura e maior previsibilidade na evolução do sistema.
        </p>
        <p>
          A aplicação foi containerizada com Docker, garantindo padronização de ambientes e preparação para deploy estruturado.
        </p>
      </>
    ),
  },
  {
    title: "Execução e Organização do Desenvolvimento",
    children: (
      <>
        <p>
          O desenvolvimento foi conduzido de forma incremental, estruturando inicialmente:
        </p>
        <ul className="space-y-2 ml-1">
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Controle de fluxo de caixa
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Cadastro de contas e categorias
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Lançamentos financeiros
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Consolidação de relatórios
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Estrutura para dashboards gerenciais
          </li>
        </ul>
        <p>
          A organização do código seguiu princípios de separação de camadas e responsabilidade única, garantindo clareza e sustentabilidade técnica.
        </p>
      </>
    ),
  },
  {
    title: "Deploy e Preparação Operacional",
    children: (
      <>
        <p>
          Desde o início, o projeto foi preparado para ambientes distintos (dev, staging e produção), utilizando containerização e controle de versões.
        </p>
        <p>
          A estrutura permite:
        </p>
        <ul className="space-y-2 ml-1">
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Isolamento de ambientes
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Previsibilidade de deploy
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Evolução controlada
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            Base preparada para expansão futura
          </li>
        </ul>
        <p>
          O sistema foi pensado para suportar crescimento empresarial sem necessidade de reestruturações drásticas.
        </p>
      </>
    ),
  },
  {
    title: "Impacto do Projeto",
    children: (
      <>
        <p>
          O ERP Estrela estruturou rotinas financeiras que antes eram descentralizadas, trazendo maior previsibilidade, organização e segurança operacional.
        </p>
        <p>
          Além da entrega funcional, o projeto consolidou um modelo arquitetural replicável para sistemas corporativos.
        </p>
      </>
    ),
  },
];

export default function ErpEstrelaCasePage() {
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
                {navOpen ? (
                  <X className="h-5 w-5 text-zinc-200" />
                ) : (
                  <Menu className="h-5 w-5 text-zinc-200" />
                )}
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
          intro="O ERP Estrela foi concebido como uma solução web para estruturar e padronizar rotinas financeiras corporativas, centralizando fluxo de caixa, controle de despesas, relatórios gerenciais e visibilidade estratégica para tomada de decisão."
          sections={sectionsData}
          challenges={challengesData}
          kpis={kpisData}
          kpisVariant="grid"
          stack={stackData}
        />

        {/* ── LEARNINGS ── */}
        <CaseLearnings items={learningsData} />

        {/* ── CTA ── */}
        <CaseCTA description="Se você busca estruturar ou modernizar sistemas internos com base sólida e escalável, vamos conversar." />

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
