"use client";

import Image from "next/image";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseCTA from "@/components/case/CaseCTA";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
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
  { label: { pt: "Status", en: "Status" }, value: { pt: "Descontinuado", en: "Discontinued" } },
  { label: { pt: "Ano", en: "Year" }, value: { pt: "2025–2026", en: "2025–2026" } },
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
   ILUSTRAÇÃO: ARQUITETURA
   ═══════════════════════════════════════════ */

function ArchitectureDiagram({ lang }: { lang: "pt" | "en" }) {
  const t = (v: Bilingual) => tr(lang, v);
  return (
    <svg viewBox="0 0 800 420" className="w-full h-auto" role="img" aria-label="Diagrama da arquitetura do iMidooh">
      <defs>
        <marker id="imidooh-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#8b5cf6" />
        </marker>
        <marker id="imidooh-arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#71717a" />
        </marker>
      </defs>

      {/* Clients */}
      <rect x="8" y="92" width="150" height="52" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="83" y="113" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">React Native</text>
      <text x="83" y="128" textAnchor="middle" fontSize="9" fill="#a1a1aa">{t({ pt: "Descoberta de mídia no mapa", en: "Map-based media discovery" })}</text>

      <rect x="8" y="162" width="150" height="52" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="83" y="183" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">Next.js</text>
      <text x="83" y="198" textAnchor="middle" fontSize="9" fill="#a1a1aa">{t({ pt: "Admin: painéis, campanhas, métricas", en: "Admin: panels, campaigns, metrics" })}</text>

      <line x1="158" y1="118" x2="192" y2="152" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#imidooh-arrow)" />
      <line x1="158" y1="188" x2="192" y2="168" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#imidooh-arrow)" />

      {/* Gateway */}
      <rect x="198" y="148" width="130" height="46" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="263" y="167" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "API Gateway", en: "API Gateway" })}
      </text>
      <text x="263" y="181" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Autenticação + tenant_id", en: "Auth + tenant_id" })}
      </text>

      <line x1="328" y1="171" x2="360" y2="171" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#imidooh-arrow)" />

      {/* Docker boundary */}
      <rect x="358" y="70" width="434" height="290" rx="16" fill="none" stroke="rgba(139,92,246,0.35)" strokeDasharray="5 5" />
      <text x="374" y="64" fontSize="9.5" fill="#a78bfa" letterSpacing="0.08em">
        {t({ pt: "DOCKER — DEV · STAGING · PROD", en: "DOCKER — DEV · STAGING · PROD" })}
      </text>

      {/* Service modules row */}
      {[
        {
          x: 374,
          title: t({ pt: "Painéis / Mídia", en: "Panels / Media" }),
          sub: t({ pt: "Localização, disponibilidade, preço", en: "Location, availability, price" }),
        },
        {
          x: 508,
          title: t({ pt: "Campanhas / Reservas", en: "Campaigns / Bookings" }),
          sub: t({ pt: "Agenda, contratação, conflitos", en: "Scheduling, booking, conflicts" }),
        },
        {
          x: 642,
          title: t({ pt: "Métricas / Analytics", en: "Metrics / Analytics" }),
          sub: t({ pt: "Views, audiência, conversão", en: "Views, audience, conversion" }),
        },
      ].map((svc) => (
        <g key={svc.title}>
          <rect x={svc.x} y="100" width="134" height="62" rx="10" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.45)" />
          <text x={svc.x + 67} y="122" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
            {svc.title}
          </text>
          <text x={svc.x + 67} y="138" textAnchor="middle" fontSize="8" fill="#a1a1aa">
            {svc.sub.split(",")[0]},
          </text>
          <text x={svc.x + 67} y="150" textAnchor="middle" fontSize="8" fill="#a1a1aa">
            {svc.sub.split(",").slice(1).join(",").trim()}
          </text>
        </g>
      ))}

      <text x="574" y="182" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Módulos NestJS com fronteiras claras de domínio", en: "NestJS modules with clear domain boundaries" })}
      </text>

      <line x1="574" y1="162" x2="574" y2="214" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#imidooh-arrow)" />

      {/* Multi-tenant boundary */}
      <rect x="382" y="220" width="384" height="52" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(167,139,250,0.3)" strokeDasharray="4 4" />
      <text x="574" y="240" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Isolamento lógico por tenant_id", en: "Logical isolation by tenant_id" })}
      </text>
      <text x="574" y="255" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Preparado para evoluir para schema dedicado por cliente", en: "Ready to evolve into a per-client dedicated schema" })}
      </text>

      <line x1="574" y1="272" x2="574" y2="292" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#imidooh-arrow)" />

      {/* DB */}
      <rect x="474" y="296" width="200" height="52" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="574" y="317" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">PostgreSQL</text>
      <text x="574" y="332" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Modelagem relacional via Prisma", en: "Relational modeling via Prisma" })}
      </text>

      <text x="583" y="390" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Cada camada (gateway, módulos, dados) versionada e implantável de forma independente", en: "Each layer (gateway, modules, data) is versioned and independently deployable" })}
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   FOTOS REAIS DO PRODUTO
   ═══════════════════════════════════════════ */

function DeviceShot({
  src,
  alt,
  caption,
  rotate,
  maxWidth = 230,
}: {
  src: string;
  alt: string;
  caption: Bilingual;
  rotate: string;
  maxWidth?: number;
}) {
  const { lang } = useLanguage();
  return (
    <div className="relative mx-auto" style={{ transform: `rotate(${rotate})`, maxWidth: `${maxWidth}px` }}>
      <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl shadow-black/60">
        <div className="relative aspect-[2160/3840]">
          <Image src={src} alt={alt} fill sizes={`${maxWidth}px`} className="object-contain" />
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">{tr(lang, caption)}</p>
    </div>
  );
}

function ShowcaseHero() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 sm:px-8 -mt-4 mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
        <DeviceShot
          src="/images/imidooh-estudo-caso-mapa.png"
          alt="Mapa de descoberta de painéis DOOH do iMidooh"
          caption={{ pt: "Descoberta de mídia por mapa, com filtros de oferta e fluxo", en: "Map-based media discovery, with offer and traffic filters" }}
          rotate="-1.5deg"
          maxWidth={260}
        />
        <DeviceShot
          src="/images/imidooh-estudo-caso-detalhe-painel.png"
          alt="Detalhe de um painel disponível para contratação no iMidooh"
          caption={{ pt: "Ficha do painel: preço, disponibilidade e especificações técnicas", en: "Panel record: price, availability and technical specs" }}
          rotate="1.5deg"
          maxWidth={260}
        />
      </div>
    </div>
  );
}

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
              pt: "A arquitetura foi desenhada para ser desacoplada, modular e fácil de manter — com módulos de domínio bem definidos (painéis/mídia, campanhas/reservas, métricas) por trás de um único gateway, e um modelo de dados preparado para múltiplos clientes desde a primeira migração.",
              en: "The architecture was designed to be decoupled, modular and easy to maintain — with well-defined domain modules (panels/media, campaigns/bookings, metrics) behind a single gateway, and a data model ready for multiple clients from the very first migration.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Dados consistentes", en: "Consistent data" },
                desc: { pt: "PostgreSQL com modelagem relacional para painéis, campanhas, reservas e métricas de performance.", en: "PostgreSQL with relational modeling for panels, campaigns, bookings and performance metrics." },
              },
              {
                title: { pt: "Produtividade com segurança", en: "Productivity with safety" },
                desc: { pt: "Prisma para acelerar acesso a dados com camada tipada e estável entre API e módulos.", en: "Prisma to speed up data access with a typed, stable layer across the API and its modules." },
              },
              {
                title: { pt: "Ambientes padronizados", en: "Standardized environments" },
                desc: { pt: "Docker isolando dev, staging e produção, com paridade de configuração entre eles.", en: "Docker isolating dev, staging and production, with configuration parity between them." },
              },
              {
                title: { pt: "Módulos por domínio", en: "Domain-driven modules" },
                desc: { pt: "NestJS organiza painéis, campanhas/reservas e métricas como módulos independentes, testáveis isoladamente.", en: "NestJS organizes panels, campaigns/bookings and metrics as independent, individually testable modules." },
              },
              {
                title: { pt: "Isolamento lógico por tenant", en: "Logical tenant isolation" },
                desc: { pt: "Cada registro carrega tenant_id desde o desenho inicial, evitando retrabalho para separar clientes no futuro.", en: "Every record carries a tenant_id from the initial design, avoiding rework to separate clients later on." },
              },
              {
                title: { pt: "Camadas independentes", en: "Independently deployable layers" },
                desc: { pt: "Gateway, módulos de API e banco de dados versionados e implantáveis em separado.", en: "Gateway, API modules and database are versioned and deployable separately." },
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

          <div className="mt-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 overflow-x-auto">
            <ArchitectureDiagram lang={lang} />
          </div>

          <div className="mt-6 rounded-2xl bg-violet-500/[0.06] border border-violet-500/20 p-6">
            <p className="text-sm text-violet-100 leading-relaxed">
              {lang === "pt" ? (
                <>
                  O sistema foi estruturado para permitir futura implementação completa
                  de <span className="font-semibold text-violet-50">multi-tenancy</span> e expansão{" "}
                  <span className="font-semibold text-violet-50">white-label</span>, sem exigir uma reescrita
                  do modelo de dados ou dos módulos de domínio já implementados.
                </>
              ) : (
                <>
                  The system was structured to allow a future full rollout of{" "}
                  <span className="font-semibold text-violet-50">multi-tenancy</span> and{" "}
                  <span className="font-semibold text-violet-50">white-label</span> expansion, without requiring
                  a rewrite of the data model or the domain modules already implemented.
                </>
              )}
            </p>
          </div>
        </>
      ),
    },
    {
      title: { pt: "Modelo de Dados e Métricas de Performance", en: "Data Model and Performance Metrics" },
      children: (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div>
              <p>
                {t({
                  pt: "Cada painel de mídia carrega dados operacionais (localização, resolução, disponibilidade por dia da semana, preço) e dados de performance (visualizações por dia, audiência única, taxa de conversão e avaliação), com a demografia da audiência quebrada por faixa etária. Esse modelo permitia que o cliente decidisse contratar com base em dado real, não em estimativa comercial.",
                  en: "Each media panel carries operational data (location, resolution, weekly availability, price) and performance data (daily views, unique audience, conversion rate and rating), with audience demographics broken down by age range. This model let clients decide whether to book based on real data, not a sales estimate.",
                })}
              </p>

              <div className="mt-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
                <h4 className="text-sm font-semibold text-white mb-3">
                  {t({ pt: "Entidades centrais do modelo de dados", en: "Core entities in the data model" })}
                </h4>
                <ul className="space-y-2">
                  {[
                    { pt: "Painel/Mídia: localização, resolução, preço e janelas de disponibilidade", en: "Panel/Media: location, resolution, price and availability windows" },
                    { pt: "Campanha/Reserva: período contratado, status e conflito de agenda", en: "Campaign/Booking: contracted period, status and schedule conflicts" },
                    { pt: "Métrica de performance: views/dia, audiência única, conversão, avaliação", en: "Performance metric: views/day, unique audience, conversion, rating" },
                    { pt: "Demografia da audiência: distribuição por faixa etária", en: "Audience demographics: breakdown by age range" },
                  ].map((item) => (
                    <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DeviceShot
              src="/images/imidooh-estudo-caso-metricas.png"
              alt="Tela de métricas e demografia de audiência de um painel DOOH"
              caption={{ pt: "Métricas por painel: visualizações, audiência, conversão e demografia", en: "Per-panel metrics: views, audience, conversion and demographics" }}
              rotate="1deg"
            />
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
                { pt: "Verificação de conflito de agenda antes de confirmar reserva", en: "Schedule-conflict checks before confirming a booking" },
                { pt: "Descoberta de mídia por geolocalização, com filtros de oferta e fluxo", en: "Geolocation-based media discovery, with offer and traffic filters" },
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

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "O projeto foi descontinuado antes da fase comercial, mas chegou até um ponto de maturidade técnica claro: modelo de dados pronto para múltiplos clientes, módulos de domínio isolados, métricas reais de performance por painel e uma infraestrutura containerizada em três ambientes. É esse ponto de parada — não uma versão incompleta — que este estudo de caso documenta.",
                en: "The project was discontinued before its commercial phase, but it reached a clear point of technical maturity: a data model ready for multiple clients, isolated domain modules, real per-panel performance metrics, and containerized infrastructure across three environments. That stopping point — not an unfinished version — is what this case study documents.",
              })}
            </p>
          </div>
        </>
      ),
    },
    {
      title: { pt: "Direitos e Propriedade", en: "Rights and Ownership" },
      children: (
        <>
          <div className="mt-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "O iMidooh é um produto idealizado e de propriedade da Click Software House. Todos os direitos sobre o projeto, incluindo marca, código-fonte, design e demais materiais, são reservados à Click Software House. Este estudo de caso tem finalidade exclusivamente demonstrativa do trabalho técnico realizado, sendo vedada a reprodução, cópia ou reutilização do projeto sem autorização prévia da empresa idealizadora.",
                en: "iMidooh is a product conceived and owned by Click Software House. All rights to the project, including brand, source code, design and other materials, are reserved to Click Software House. This case study is presented solely to demonstrate the technical work performed, and any reproduction, copying or reuse of the project without prior authorization from the originating company is prohibited.",
              })}
            </p>
          </div>
        </>
      ),
    },
  ];
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function ImidoohCasePage() {
  const { lang } = useLanguage();
  const sectionsData = useSectionsData(lang);

  return (
    <div className="min-h-screen font-sans relative isolate">
      <div className="relative z-10">
        <SiteHeader />

        {/* ── HERO ── */}
        <CaseHero {...heroData} />

        {/* ── FOTOS DE DESTAQUE ── */}
        <ShowcaseHero />

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

        <SiteFooter />
      </div>
    </div>
  );
}
