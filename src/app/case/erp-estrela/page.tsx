"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseLearnings from "@/components/case/CaseLearnings";
import CaseCTA from "@/components/case/CaseCTA";
import { CV_URL } from "@/lib/constants";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO — ERP ESTRELA
   ═══════════════════════════════════════════ */

const heroData = {
  title: {
    pt: "ERP Estrela — Sistema Financeiro Corporativo",
    en: "ERP Estrela — Corporate Financial System",
  },
  subtitle: {
    pt: "Sistema Financeiro Corporativo",
    en: "Corporate Financial System",
  },
  description: {
    pt: "O ERP Estrela foi concebido como uma solução web para estruturar e padronizar rotinas financeiras corporativas, centralizando fluxo de caixa, controle de despesas, relatórios gerenciais e visibilidade estratégica para tomada de decisão.",
    en: "ERP Estrela was designed as a web solution to structure and standardize corporate financial routines, centralizing cash flow, expense control, management reports and strategic visibility for decision-making.",
  },
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

const summaryData: Array<{ label: Bilingual; value: Bilingual }> = [
  { label: { pt: "Tipo", en: "Type" }, value: { pt: "Sistema Web", en: "Web System" } },
  { label: { pt: "Papel", en: "Role" }, value: { pt: "Arquitetura & Full-Stack", en: "Architecture & Full-Stack" } },
  { label: { pt: "Modelo", en: "Model" }, value: { pt: "Corporativo Interno", en: "Internal Corporate" } },
  { label: { pt: "Status", en: "Status" }, value: { pt: "Em evolução", en: "Evolving" } },
];

const challengesData = {
  title: { pt: "Principais Desafios Enfrentados", en: "Key Challenges Faced" },
  items: [
    { pt: "Modelar corretamente regras financeiras sem comprometer performance", en: "Correctly modeling financial rules without compromising performance" },
    { pt: "Garantir integridade transacional em movimentações", en: "Ensuring transactional integrity across financial movements" },
    { pt: "Estruturar relatórios com base em dados consistentes", en: "Structuring reports on top of consistent data" },
    { pt: "Criar base sustentável para futuras integrações", en: "Creating a sustainable foundation for future integrations" },
  ] as Bilingual[],
};

const kpisData: Array<{ text: Bilingual }> = [
  { text: { pt: "Arquitetura modular organizada", en: "Well-organized modular architecture" } },
  { text: { pt: "Banco relacional normalizado", en: "Normalized relational database" } },
  { text: { pt: "Separação clara de regras de negócio", en: "Clear separation of business rules" } },
  { text: { pt: "Containerização com Docker", en: "Containerization with Docker" } },
  { text: { pt: "Ambientes isolados (dev/staging/prod)", en: "Isolated environments (dev/staging/prod)" } },
  { text: { pt: "Base preparada para expansão funcional", en: "Foundation ready for functional expansion" } },
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

const learningsData: Bilingual[] = [
  { pt: "Modelagem Financeira", en: "Financial Modeling" },
  { pt: "Integridade Transacional", en: "Transactional Integrity" },
  { pt: "Arquitetura Modular", en: "Modular Architecture" },
  { pt: "Organização Backend Node.js", en: "Node.js Backend Organization" },
  { pt: "Modelagem Relacional Avançada", en: "Advanced Relational Modeling" },
  { pt: "Estruturação de ERP", en: "ERP Structuring" },
  { pt: "Separação de Responsabilidades", en: "Separation of Concerns" },
  { pt: "Deploy Estruturado", en: "Structured Deployment" },
  { pt: "Containerização", en: "Containerization" },
  { pt: "Sistemas Corporativos", en: "Corporate Systems" },
];

function useSectionsData(lang: "pt" | "en") {
  const t = (v: Bilingual) => tr(lang, v);

  return [
    {
      title: { pt: "Visão Estratégica", en: "Strategic Vision" },
      children: (
        <>
          <p>
            {t({
              pt: "O ERP Estrela foi concebido como uma solução web para estruturar e padronizar rotinas financeiras corporativas, centralizando fluxo de caixa, controle de despesas, relatórios gerenciais e visibilidade estratégica para tomada de decisão.",
              en: "ERP Estrela was designed as a web solution to structure and standardize corporate financial routines, centralizing cash flow, expense control, management reports and strategic visibility for decision-making.",
            })}
          </p>
          <p>
            {t({
              pt: "O projeto nasceu da necessidade de transformar processos financeiros descentralizados e pouco rastreáveis em um sistema organizado, previsível e preparado para crescimento empresarial.",
              en: "The project was born from the need to turn decentralized, hard-to-trace financial processes into an organized, predictable system ready for business growth.",
            })}
          </p>
        </>
      ),
    },
    {
      title: { pt: "Contexto e Construção do Produto", en: "Context and Product Construction" },
      children: (
        <>
          <p>
            {t({
              pt: "O cenário inicial envolvia operações financeiras realizadas de forma fragmentada, com controles paralelos e baixa integração entre setores. A ausência de padronização dificultava a análise estratégica e aumentava riscos operacionais.",
              en: "The initial scenario involved financial operations carried out in a fragmented way, with parallel controls and low integration between departments. The lack of standardization made strategic analysis harder and increased operational risk.",
            })}
          </p>
          <p>
            {t({
              pt: "O processo iniciou com levantamento detalhado das rotinas financeiras, identificação dos pontos críticos e mapeamento de fluxos reais do negócio.",
              en: "The process began with a detailed survey of financial routines, identifying critical points and mapping the business's real workflows.",
            })}
          </p>
          <p>
            {t({
              pt: "A estratégia adotada foi construir um sistema modular, com modelagem relacional consistente e separação clara entre regras de negócio, persistência e interface.",
              en: "The strategy adopted was to build a modular system, with consistent relational modeling and a clear separation between business rules, persistence and interface.",
            })}
          </p>
          <p>
            {t({
              pt: "O foco não foi apenas desenvolver funcionalidades, mas estruturar uma base sólida para evolução contínua.",
              en: "The focus wasn't just on building features, but on structuring a solid foundation for continuous evolution.",
            })}
          </p>
        </>
      ),
    },
    {
      title: { pt: "Arquitetura e Decisões Técnicas", en: "Architecture and Technical Decisions" },
      children: (
        <>
          <p>{t({ pt: "A arquitetura foi projetada priorizando:", en: "The architecture was designed prioritizing:" })}</p>
          <ul className="space-y-2 ml-1">
            {[
              { pt: "Clareza estrutural", en: "Structural clarity" },
              { pt: "Integridade de dados", en: "Data integrity" },
              { pt: "Escalabilidade futura", en: "Future scalability" },
              { pt: "Facilidade de manutenção", en: "Ease of maintenance" },
            ].map((item) => (
              <li key={item.pt} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                {t(item)}
              </li>
            ))}
          </ul>
          <p>
            {t({
              pt: "A modelagem com PostgreSQL garantiu consistência financeira e rastreabilidade de movimentações.",
              en: "Modeling with PostgreSQL ensured financial consistency and traceability of movements.",
            })}
          </p>
          <p>
            {t({
              pt: "O uso de Prisma trouxe segurança na camada de acesso ao banco, enquanto a aplicação backend estruturada com Node.js e Express garantiu organização modular.",
              en: "Using Prisma brought safety to the database access layer, while the backend application, structured with Node.js and Express, ensured modular organization.",
            })}
          </p>
          <p>
            {t({
              pt: "O frontend em Next.js com TypeScript proporcionou tipagem segura e maior previsibilidade na evolução do sistema.",
              en: "The Next.js frontend with TypeScript provided safe typing and greater predictability as the system evolved.",
            })}
          </p>
          <p>
            {t({
              pt: "A aplicação foi containerizada com Docker, garantindo padronização de ambientes e preparação para deploy estruturado.",
              en: "The application was containerized with Docker, ensuring environment standardization and readiness for structured deployment.",
            })}
          </p>
        </>
      ),
    },
    {
      title: { pt: "Execução e Organização do Desenvolvimento", en: "Execution and Development Organization" },
      children: (
        <>
          <p>
            {t({
              pt: "O desenvolvimento foi conduzido de forma incremental, estruturando inicialmente:",
              en: "Development was carried out incrementally, initially structuring:",
            })}
          </p>
          <ul className="space-y-2 ml-1">
            {[
              { pt: "Controle de fluxo de caixa", en: "Cash flow control" },
              { pt: "Cadastro de contas e categorias", en: "Account and category registration" },
              { pt: "Lançamentos financeiros", en: "Financial entries" },
              { pt: "Consolidação de relatórios", en: "Report consolidation" },
              { pt: "Estrutura para dashboards gerenciais", en: "Foundation for management dashboards" },
            ].map((item) => (
              <li key={item.pt} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                {t(item)}
              </li>
            ))}
          </ul>
          <p>
            {t({
              pt: "A organização do código seguiu princípios de separação de camadas e responsabilidade única, garantindo clareza e sustentabilidade técnica.",
              en: "Code organization followed principles of layer separation and single responsibility, ensuring clarity and technical sustainability.",
            })}
          </p>
        </>
      ),
    },
    {
      title: { pt: "Deploy e Preparação Operacional", en: "Deploy and Operational Readiness" },
      children: (
        <>
          <p>
            {t({
              pt: "Desde o início, o projeto foi preparado para ambientes distintos (dev, staging e produção), utilizando containerização e controle de versões.",
              en: "From the start, the project was prepared for distinct environments (dev, staging and production), using containerization and version control.",
            })}
          </p>
          <p>{t({ pt: "A estrutura permite:", en: "The structure allows for:" })}</p>
          <ul className="space-y-2 ml-1">
            {[
              { pt: "Isolamento de ambientes", en: "Environment isolation" },
              { pt: "Previsibilidade de deploy", en: "Deploy predictability" },
              { pt: "Evolução controlada", en: "Controlled evolution" },
              { pt: "Base preparada para expansão futura", en: "Foundation ready for future expansion" },
            ].map((item) => (
              <li key={item.pt} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                {t(item)}
              </li>
            ))}
          </ul>
          <p>
            {t({
              pt: "O sistema foi pensado para suportar crescimento empresarial sem necessidade de reestruturações drásticas.",
              en: "The system was designed to support business growth without the need for drastic restructuring.",
            })}
          </p>
        </>
      ),
    },
    {
      title: { pt: "Impacto do Projeto", en: "Project Impact" },
      children: (
        <>
          <p>
            {t({
              pt: "O ERP Estrela estruturou rotinas financeiras que antes eram descentralizadas, trazendo maior previsibilidade, organização e segurança operacional.",
              en: "ERP Estrela structured financial routines that were previously decentralized, bringing greater predictability, organization and operational safety.",
            })}
          </p>
          <p>
            {t({
              pt: "Além da entrega funcional, o projeto consolidou um modelo arquitetural replicável para sistemas corporativos.",
              en: "Beyond the functional delivery, the project established a replicable architectural model for corporate systems.",
            })}
          </p>
        </>
      ),
    },
  ];
}

const navLinks = [
  { href: "/#skills-tools", label: { pt: "Serviços", en: "Services" } },
  { href: "/#projects", label: { pt: "Portfólio", en: "Portfolio" } },
  { href: "/#skills-tools", label: { pt: "Stack", en: "Stack" } },
  { href: "/#intro", label: { pt: "Sobre", en: "About" } },
  { href: "/#about", label: { pt: "Contato", en: "Contact" } },
];

export default function ErpEstrelaCasePage() {
  const [navOpen, setNavOpen] = useState(false);
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const sectionsData = useSectionsData(lang);

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
                  <span className="text-[10px] text-zinc-400 tracking-wide -mt-0.5">
                    {t({ pt: "Engenheiro de Software | UX Ops", en: "Software Engineer | UX Ops" })}
                  </span>
                </div>
              </Link>

              <nav className="hidden md:flex items-center gap-8 text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label.pt}`}
                    href={link.href}
                    className="hover:text-white/90 text-zinc-300"
                  >
                    {t(link.label)}
                  </Link>
                ))}
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-700/20"
                >
                  {t({ pt: "Baixar CV", en: "Download CV" })}
                </a>
              </nav>

              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/25 hover:bg-black/35 p-2.5 transition-colors"
                onClick={() => setNavOpen(!navOpen)}
                aria-expanded={navOpen}
                aria-controls="mobile-nav-case"
              >
                <span className="sr-only">{t({ pt: "Abrir menu", en: "Open menu" })}</span>
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
                {navLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label.pt}-mobile`}
                    href={link.href}
                    className="text-zinc-200 rounded-xl px-3 py-3 hover:bg-white/5 transition-colors"
                    onClick={() => setNavOpen(false)}
                  >
                    {t(link.label)}
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
          intro={{
            pt: "O ERP Estrela foi concebido como uma solução web para estruturar e padronizar rotinas financeiras corporativas, centralizando fluxo de caixa, controle de despesas, relatórios gerenciais e visibilidade estratégica para tomada de decisão.",
            en: "ERP Estrela was designed as a web solution to structure and standardize corporate financial routines, centralizing cash flow, expense control, management reports and strategic visibility for decision-making.",
          }}
          sections={sectionsData}
          challenges={challengesData}
          kpis={kpisData}
          kpisVariant="grid"
          stack={stackData}
        />

        {/* ── LEARNINGS ── */}
        <CaseLearnings items={learningsData} />

        {/* ── CTA ── */}
        <CaseCTA
          description={{
            pt: "Se você busca estruturar ou modernizar sistemas internos com base sólida e escalável, vamos conversar.",
            en: "If you're looking to structure or modernize internal systems on a solid, scalable foundation, let's talk.",
          }}
        />

        {/* ── FOOTER ── */}
        <footer className="py-10 border-t border-white/5 text-center text-[11px] text-zinc-400">
          <div>© 2026 Francisco Pontes</div>
          <div>{t({ pt: "Todos os Direitos Reservados", en: "All Rights Reserved" })}</div>
          <div className="text-[10px] font-normal text-zinc-300">
            pontesneto2@gmail.com
          </div>
        </footer>
      </div>
    </div>
  );
}
