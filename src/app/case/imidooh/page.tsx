"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseCTA from "@/components/case/CaseCTA";
import { CV_URL } from "@/lib/constants";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO — iMidooh
   ═══════════════════════════════════════════ */

const heroData = {
  title: {
    pt: "iMidooh — Gerenciamento de Mídia DOOH",
    en: "iMidooh — DOOH Media Management",
  },
  subtitle: {
    pt: "Plataforma de Gerenciamento de Mídia DOOH",
    en: "DOOH Media Management Platform",
  },
  description: {
    pt: "Construção de uma base SaaS escalável voltada para operações de mídia Digital Out Of Home, com foco em arquitetura sólida, organização modular e preparação para expansão multi-tenant.",
    en: "Building a scalable SaaS foundation for Digital Out Of Home media operations, focused on solid architecture, modular organization, and readiness for multi-tenant expansion.",
  },
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

const summaryData: Array<{ label: Bilingual; value: Bilingual }> = [
  { label: { pt: "Tipo de projeto", en: "Project type" }, value: { pt: "Plataforma SaaS", en: "SaaS Platform" } },
  { label: { pt: "Papel exercido", en: "Role" }, value: { pt: "Full-Stack / Arquitetura", en: "Full-Stack / Architecture" } },
  { label: { pt: "Modelo", en: "Model" }, value: { pt: "B2B2C · White-label ready", en: "B2B2C · White-label ready" } },
  { label: { pt: "Status", en: "Status" }, value: { pt: "Em desenvolvimento", en: "In development" } },
  { label: { pt: "Ano", en: "Year" }, value: { pt: "2024–2025", en: "2024–2025" } },
  { label: { pt: "Plataformas", en: "Platforms" }, value: { pt: "Web + Mobile", en: "Web + Mobile" } },
];

const challengesData = {
  title: { pt: "Principais Desafios Enfrentados", en: "Key Challenges Faced" },
  intro: {
    pt: "A complexidade do iMidooh não estava apenas no código, mas na modelagem de um produto que precisava nascer preparado para crescer.",
    en: "iMidooh's complexity wasn't just in the code, but in modeling a product that needed to be built ready to grow from day one.",
  },
  items: [
    {
      pt: "Estruturar modelo de dados preparado para múltiplos clientes desde o início",
      en: "Designing a data model ready for multiple clients from the very start",
    },
    {
      pt: "Garantir consistência e integridade de dados em campanhas simultâneas distribuídas",
      en: "Ensuring data consistency and integrity across simultaneous, distributed campaigns",
    },
    {
      pt: "Organizar backend modular para futura expansão white-label sem reescrita",
      en: "Organizing a modular backend for future white-label expansion without a rewrite",
    },
  ] as Bilingual[],
};

const kpisData: Array<{ text: Bilingual }> = [
  { text: { pt: "Arquitetura modular", en: "Modular architecture" } },
  { text: { pt: "Banco relacional normalizado", en: "Normalized relational database" } },
  { text: { pt: "Containerização com Docker", en: "Containerization with Docker" } },
  { text: { pt: "Ambientes isolados (dev / staging / prod)", en: "Isolated environments (dev / staging / prod)" } },
  { text: { pt: "Base preparada para multi-tenancy", en: "Foundation ready for multi-tenancy" } },
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

function useSectionsData(lang: "pt" | "en") {
  const t = (v: Bilingual) => tr(lang, v);

  return [
    {
      title: { pt: "Visão Estratégica", en: "Strategic Vision" },
      children: (
        <>
          <p>
            {t({
              pt: "O iMidooh nasceu com o objetivo de estruturar e escalar operações de mídia DOOH (Digital Out Of Home), oferecendo uma plataforma centralizada para gerenciamento de campanhas em painéis de LED distribuídos em múltiplas localidades — com base sólida para evolução SaaS.",
              en: "iMidooh was built to structure and scale DOOH (Digital Out Of Home) media operations, offering a centralized platform for managing campaigns across LED panels distributed in multiple locations — with a solid foundation for SaaS evolution.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
            <div className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                {t({ pt: "O que precisava funcionar desde o dia 1", en: "What needed to work from day one" })}
              </h4>
              <ul className="space-y-2">
                {[
                  { pt: "Atualizar conteúdos remotamente com previsibilidade", en: "Updating content remotely, predictably" },
                  { pt: "Monitorar exibições e estado operacional em tempo real", en: "Monitoring displays and operational status in real time" },
                  { pt: "Consolidar relatórios de performance com confiança", en: "Consolidating performance reports with confidence" },
                ].map((item) => (
                  <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
              <div className="relative h-48 sm:h-56">
                <Image
                  src="/logo-dooh.png"
                  alt={t({ pt: "iMidooh — Gerenciamento de Mídia DOOH", en: "iMidooh — DOOH Media Management" })}
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
      title: { pt: "Contexto e Construção do Produto", en: "Context and Product Construction" },
      children: (
        <>
          <p>
            {t({
              pt: "O desenvolvimento começou com um discovery profundo: fluxos operacionais, perfis de usuários, regras de exibição e limitações do ecossistema físico dos painéis. A estratégia foi evitar improviso e construir uma base modular pronta para escalar.",
              en: "Development began with a deep discovery phase: operational flows, user profiles, display rules, and the physical limitations of the panel ecosystem. The strategy was to avoid improvisation and build a modular foundation ready to scale.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: "API",
                desc: { pt: "Regras de campanhas, painéis, exibição e integridade de dados.", en: "Campaign, panel, display and data integrity rules." },
              },
              {
                title: "Admin (Next.js)",
                desc: { pt: "Gestão operacional, configuração e visão consolidada.", en: "Operational management, configuration and a consolidated view." },
              },
              {
                title: "Mobile (React Native)",
                desc: { pt: "Operação em campo e acompanhamento prático.", en: "Field operations and hands-on tracking." },
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5"
              >
                <h4 className="text-sm font-semibold text-white">{card.title}</h4>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{t(card.desc)}</p>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: { pt: "Arquitetura e Decisões Técnicas", en: "Architecture and Technical Decisions" },
      children: (
        <>
          <p>
            {t({
              pt: "A arquitetura foi desenhada para ser desacoplada, modular e fácil de manter — com decisões que sustentam evolução contínua.",
              en: "The architecture was designed to be decoupled, modular and easy to maintain — with decisions that support continuous evolution.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Dados consistentes", en: "Consistent data" },
                desc: { pt: "PostgreSQL com modelagem relacional para integridade e previsibilidade.", en: "PostgreSQL with relational modeling for integrity and predictability." },
              },
              {
                title: { pt: "Produtividade com segurança", en: "Productivity with safety" },
                desc: { pt: "Prisma para acelerar acesso a dados com camada tipada e estável.", en: "Prisma to speed up data access with a typed, stable layer." },
              },
              {
                title: { pt: "Ambientes padronizados", en: "Standardized environments" },
                desc: { pt: "Docker para previsibilidade e preparação para deploy cloud.", en: "Docker for predictability and cloud deploy readiness." },
              },
            ].map((card) => (
              <div
                key={card.title.pt}
                className="group rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5 hover:border-violet-500/25 hover:bg-violet-500/[0.03] transition-all duration-300"
              >
                <h4 className="text-sm font-semibold text-white">{t(card.title)}</h4>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{t(card.desc)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-violet-500/[0.06] border border-violet-500/20 p-6">
            <p className="text-sm text-violet-100 leading-relaxed">
              {lang === "pt" ? (
                <>
                  O sistema foi estruturado para permitir futura implementação completa
                  de <span className="font-semibold text-violet-50">multi-tenancy</span> e expansão
                  <span className="font-semibold text-violet-50"> white-label</span>.
                </>
              ) : (
                <>
                  The system was structured to allow a future full rollout of{" "}
                  <span className="font-semibold text-violet-50">multi-tenancy</span> and{" "}
                  <span className="font-semibold text-violet-50">white-label</span> expansion.
                </>
              )}
            </p>
          </div>
        </>
      ),
    },
    {
      title: { pt: "Execução e Integração", en: "Execution and Integration" },
      children: (
        <>
          <p>
            {t({
              pt: "A execução cobriu regras de campanhas, controle de exibição e gestão de painéis — com integração clara entre backend, painel administrativo e operação mobile.",
              en: "Execution covered campaign rules, display control and panel management — with clear integration between backend, admin panel and mobile operations.",
            })}
          </p>

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <h4 className="text-sm font-semibold text-white mb-3">
              {t({ pt: "Princípios de implementação", en: "Implementation principles" })}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { pt: "Código organizado e previsível", en: "Organized, predictable code" },
                { pt: "Separação de camadas e responsabilidades", en: "Separation of layers and responsibilities" },
                { pt: "Comunicação evolutiva entre aplicações", en: "Evolvable communication between applications" },
                { pt: "Base pronta para integrações futuras", en: "Foundation ready for future integrations" },
              ].map((item) => (
                <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
        </>
      ),
    },
    {
      title: { pt: "Deploy e Operação", en: "Deploy and Operations" },
      children: (
        <>
          <p>
            {t({
              pt: "A aplicação foi preparada para ambientes distintos (desenvolvimento, staging e produção) com containerização e versionamento estruturado.",
              en: "The application was prepared for distinct environments (development, staging and production) with containerization and structured versioning.",
            })}
          </p>
          <p>{t({ pt: "A infraestrutura foi pensada para garantir:", en: "The infrastructure was designed to ensure:" })}</p>
          <ul className="space-y-2 ml-1">
            {[
              { pt: "Previsibilidade de deploy", en: "Deploy predictability" },
              { pt: "Isolamento de ambientes", en: "Environment isolation" },
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
              pt: "O projeto foi estruturado desde o início considerando observabilidade e crescimento operacional.",
              en: "The project was structured from the start with observability and operational growth in mind.",
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
              pt: "O iMidooh consolidou uma base robusta para centralização da operação de mídia DOOH, reduzindo dependência de processos manuais e preparando o caminho para expansão comercial.",
              en: "iMidooh established a robust foundation for centralizing DOOH media operations, reducing reliance on manual processes and paving the way for commercial expansion.",
            })}
          </p>

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "Além da solução técnica, o projeto consolidou um modelo arquitetural replicável para produtos SaaS — com foco em organização, escalabilidade e manutenção.",
                en: "Beyond the technical solution, the project established a replicable architectural model for SaaS products — focused on organization, scalability and maintainability.",
              })}
            </p>
          </div>
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

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function ImidoohCasePage() {
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
                {navOpen ? <X className="h-5 w-5 text-zinc-200" /> : <Menu className="h-5 w-5 text-zinc-200" />}
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
            pt: "O iMidooh representa a construção de uma base SaaS escalável voltada para operações de mídia DOOH, com foco em arquitetura sólida, organização modular e preparação para expansão multi-tenant.",
            en: "iMidooh represents the construction of a scalable SaaS foundation for DOOH media operations, focused on solid architecture, modular organization and readiness for multi-tenant expansion.",
          }}
          sections={sectionsData}
          challenges={challengesData}
          kpis={kpisData}
          stack={stackData}
        />

        {/* ── CTA ── */}
        <CaseCTA />

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
