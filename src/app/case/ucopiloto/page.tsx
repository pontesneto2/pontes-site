"use client";

import Image from "next/image";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseCTA from "@/components/case/CaseCTA";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO: Ucopiloto
   ═══════════════════════════════════════════ */

const heroData = {
  title: {
    pt: "Ucopiloto: Conectando Motoristas e Oficinas",
    en: "Ucopiloto: Connecting Drivers and Repair Shops",
  },
  subtitle: {
    pt: "Aplicativo de Gestão Automotiva Inteligente",
    en: "Smart Automotive Management App",
  },
  description: {
    pt: "Aplicativo para conectar motoristas e oficinas de maneira inteligente, simplificando agendamentos, orçamentos e o acompanhamento de serviços automotivos, do zero ao lançamento comercial.",
    en: "App that connects drivers and repair shops intelligently, simplifying bookings, quotes and tracking of automotive services, from scratch to commercial launch.",
  },
  tags: [
    "React Native",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Express.js",
    "NestJS",
    "PostgreSQL",
    "Prisma",
    "Docker",
  ],
};

const summaryData: Array<{ label: Bilingual; value: Bilingual }> = [
  { label: { pt: "Tipo de projeto", en: "Project type" }, value: { pt: "App Mobile + Web", en: "Mobile + Web App" } },
  { label: { pt: "Papel exercido", en: "Role" }, value: { pt: "Full-Stack / DevOps solo", en: "Full-Stack / Solo DevOps" } },
  { label: { pt: "Idealizadora", en: "Idealized by" }, value: { pt: "Click Software House", en: "Click Software House" } },
  { label: { pt: "Status", en: "Status" }, value: { pt: "Em produção", en: "In production" } },
  { label: { pt: "Duração", en: "Duration" }, value: { pt: "5 meses de produção", en: "5 months in production" } },
  { label: { pt: "Plataformas", en: "Platforms" }, value: { pt: "iOS + Android + Web + Admin", en: "iOS + Android + Web + Admin" } },
];

const challengesData = {
  title: { pt: "Principais Desafios Enfrentados", en: "Key Challenges Faced" },
  intro: {
    pt: "Conectar os dois lados de um mercado fragmentado, motoristas e oficinas, exigia mais do que telas bonitas: exigia confiabilidade operacional desde o primeiro agendamento.",
    en: "Connecting the two sides of a fragmented market, drivers and repair shops, required more than good screens: it required operational reliability from the very first booking.",
  },
  items: [
    {
      pt: "Sincronizar agendamentos e orçamentos em tempo real entre app, painel web e admin",
      en: "Syncing bookings and quotes in real time across app, web panel and admin",
    },
    {
      pt: "Garantir uptime alto operando como DevOps solo, sem equipe de infraestrutura dedicada",
      en: "Ensuring high uptime while operating as a solo DevOps, with no dedicated infrastructure team",
    },
    {
      pt: "Reduzir o tempo de agendamento sem sacrificar a integridade dos dados de veículos e serviços",
      en: "Reducing scheduling time without sacrificing the integrity of vehicle and service data",
    },
  ] as Bilingual[],
};

const kpisData: Array<{ text: Bilingual }> = [
  { text: { pt: "200+ usuários ativos em produção", en: "200+ active users in production" } },
  { text: { pt: "99,9% de uptime", en: "99.9% uptime" } },
  { text: { pt: "-35% no tempo de agendamento", en: "-35% in scheduling time" } },
  { text: { pt: "Infraestrutura containerizada com Docker", en: "Containerized infrastructure with Docker" } },
  { text: { pt: "Operação solo de DevOps ponta a ponta", en: "End-to-end solo DevOps operation" } },
];

const stackData = [
  "React Native",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Express.js",
  "NestJS",
  "PostgreSQL",
  "Prisma",
  "Docker",
];

/* ═══════════════════════════════════════════
   ILUSTRAÇÕES (SVG desenhadas à mão para o case)
   ═══════════════════════════════════════════ */

function SketchDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <filter id="ucopiloto-sketch" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" />
      </filter>
    </svg>
  );
}

/** Protótipo de baixa fidelidade da tela de agendamento: sketch desenhado para este case. */
function LowFiWireframe() {
  return (
    <svg viewBox="0 0 300 560" className="w-full h-auto" role="img" aria-label="Wireframe de baixa fidelidade da tela de agendamento">
      <g style={{ filter: "url(#ucopiloto-sketch)" }} fill="none" stroke="#a8a29e" strokeWidth="1.6" strokeLinecap="round">
        <rect x="8" y="8" width="284" height="544" rx="30" stroke="#d6d3d1" strokeWidth="2" />
        <line x1="40" y1="38" x2="260" y2="38" stroke="#78716c" />
        <rect x="28" y="58" width="130" height="16" rx="3" stroke="#d6d3d1" strokeWidth="1.8" />
        <rect x="28" y="90" width="244" height="36" rx="18" stroke="#d6d3d1" strokeWidth="1.8" />
        <path d="M46 108 l6 6 10 -12" stroke="#78716c" />

        <rect x="28" y="142" width="244" height="96" rx="12" stroke="#d6d3d1" strokeWidth="1.8" />
        <circle cx="56" cy="170" r="14" />
        <line x1="80" y1="164" x2="170" y2="164" stroke="#78716c" />
        <line x1="80" y1="182" x2="220" y2="182" />
        <line x1="46" y1="210" x2="130" y2="210" stroke="#78716c" />
        <rect x="200" y="200" width="56" height="24" rx="12" stroke="#c4b5fd" strokeWidth="2" />

        <rect x="28" y="252" width="244" height="96" rx="12" stroke="#d6d3d1" strokeWidth="1.8" />
        <circle cx="56" cy="280" r="14" />
        <line x1="80" y1="274" x2="160" y2="274" stroke="#78716c" />
        <line x1="80" y1="292" x2="210" y2="292" />
        <line x1="46" y1="320" x2="130" y2="320" stroke="#78716c" />
        <rect x="200" y="310" width="56" height="24" rx="12" stroke="#c4b5fd" strokeWidth="2" />

        <rect x="28" y="378" width="244" height="52" rx="26" stroke="#c4b5fd" strokeWidth="2.2" />
        <line x1="110" y1="404" x2="190" y2="404" stroke="#c4b5fd" strokeWidth="2.2" />

        <line x1="28" y1="486" x2="272" y2="486" stroke="#57534e" />
        <circle cx="80" cy="512" r="11" />
        <circle cx="150" cy="512" r="11" stroke="#c4b5fd" strokeWidth="2" />
        <circle cx="220" cy="512" r="11" />
      </g>
    </svg>
  );
}

/** Diagrama detalhado da arquitetura: CI/CD -> reverse proxy -> containers Docker (API, banco, jobs) -> observabilidade. */
function ArchitectureDiagram({ lang }: { lang: "pt" | "en" }) {
  const t = (v: Bilingual) => tr(lang, v);
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="Diagrama detalhado da arquitetura do Ucopiloto">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#8b5cf6" />
        </marker>
        <marker id="arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#71717a" />
        </marker>
      </defs>

      {/* CI/CD */}
      <rect x="430" y="8" width="340" height="42" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="600" y="26" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Deploy automatizado — build de imagem Docker", en: "Automated deploy — Docker image build" })}
      </text>
      <text x="600" y="40" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Rolling restart do stack, sem downtime perceptível", en: "Rolling restart of the stack, no noticeable downtime" })}
      </text>
      <line x1="600" y1="50" x2="600" y2="74" stroke="#71717a" strokeWidth="1.4" strokeDasharray="3 3" markerEnd="url(#arrow-dim)" />

      {/* Clients */}
      <rect x="8" y="94" width="150" height="52" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="83" y="115" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">React Native</text>
      <text x="83" y="130" textAnchor="middle" fontSize="9" fill="#a1a1aa">{t({ pt: "App do motorista", en: "Driver app" })}</text>

      <rect x="8" y="164" width="150" height="52" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="83" y="185" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">Next.js</text>
      <text x="83" y="200" textAnchor="middle" fontSize="9" fill="#a1a1aa">{t({ pt: "Painel da oficina + admin", en: "Shop + admin panel" })}</text>

      <line x1="158" y1="120" x2="192" y2="160" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#arrow)" />
      <line x1="158" y1="190" x2="192" y2="170" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#arrow)" />

      {/* Reverse proxy */}
      <rect x="198" y="150" width="130" height="46" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="263" y="169" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Reverse Proxy", en: "Reverse Proxy" })}
      </text>
      <text x="263" y="183" textAnchor="middle" fontSize="9" fill="#a1a1aa">TLS + routing</text>

      <line x1="328" y1="173" x2="360" y2="173" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#arrow)" />

      {/* Docker host boundary */}
      <rect x="358" y="76" width="434" height="368" rx="16" fill="none" stroke="rgba(139,92,246,0.35)" strokeDasharray="5 5" />
      <text x="374" y="70" fontSize="9.5" fill="#a78bfa" letterSpacing="0.08em">
        {t({ pt: "DOCKER — TODOS OS SERVIÇOS EM CONTAINERS", en: "DOCKER — ALL SERVICES IN CONTAINERS" })}
      </text>

      {/* API */}
      <rect x="374" y="150" width="180" height="66" rx="10" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.45)" />
      <text x="464" y="172" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "API (Node · Express · Nest)", en: "API (Node · Express · Nest)" })}
      </text>
      <text x="464" y="187" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Módulos: Agendamento · Orçamento", en: "Modules: Booking · Quoting" })}
      </text>
      <text x="464" y="200" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Veículos · Histórico · Notificações", en: "Vehicles · History · Notifications" })}
      </text>

      <text x="464" y="234" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "healthcheck + restart automático em falha", en: "healthcheck + automatic restart on failure" })}
      </text>

      <line x1="464" y1="216" x2="464" y2="228" stroke="#71717a" strokeWidth="1.2" strokeDasharray="2 2" />

      <line x1="554" y1="183" x2="588" y2="183" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#arrow)" />

      {/* DB */}
      <rect x="592" y="150" width="180" height="66" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="682" y="172" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">PostgreSQL</text>
      <text x="682" y="187" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Modelagem relacional via Prisma", en: "Relational modeling via Prisma" })}
      </text>
      <text x="682" y="200" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Backups automatizados e testados", en: "Automated, tested backups" })}
      </text>

      {/* Jobs / background */}
      <rect x="374" y="252" width="180" height="56" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="464" y="272" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Jobs assíncronos", en: "Background jobs" })}
      </text>
      <text x="464" y="286" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Notificações e rotinas de backup agendadas", en: "Notifications and scheduled backup routines" })}
      </text>

      <line x1="464" y1="216" x2="464" y2="252" stroke="#71717a" strokeWidth="1.2" strokeDasharray="2 2" markerEnd="url(#arrow-dim)" />

      {/* Observability */}
      <rect x="592" y="252" width="180" height="56" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="682" y="272" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Logs + alertas básicos", en: "Logs + basic alerting" })}
      </text>
      <text x="682" y="286" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Observabilidade mínima viável, mantida solo", en: "Minimum viable observability, run solo" })}
      </text>

      <line x1="682" y1="216" x2="682" y2="252" stroke="#71717a" strokeWidth="1.2" strokeDasharray="2 2" markerEnd="url(#arrow-dim)" />

      <text x="583" y="336" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Cada container isolado, com restart policy independente — um serviço não derruba os demais", en: "Each container is isolated, with its own restart policy — one service failing doesn't take down the others" })}
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   FOTOS REAIS DO PRODUTO (molduras)
   ═══════════════════════════════════════════ */

function ShowcaseHero() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 sm:px-8 -mt-4 mb-16">
      <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(88,28,155,0.45)]">
        <div className="relative aspect-[16/9]">
          <Image
            src="/images/estudo-de-caso-ucopiloto.png"
            alt="Painel do prestador e app do motorista do Ucopiloto"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function PosterShot() {
  return (
    <div className="relative w-full max-w-[280px] mx-auto lg:mx-0 lg:ml-auto" style={{ transform: "rotate(2deg)" }}>
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
        <div className="relative aspect-[941/1672]">
          <Image
            src="/images/estudo-de-caso-ucopiloto-5-mkt.png"
            alt="Peça de divulgação do Ucopiloto"
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white text-violet-700 text-[11px] font-semibold px-3 py-2 shadow-xl">
        Luiz Mendez · Ucopiloto
      </div>
    </div>
  );
}

function PhoneShot() {
  return (
    <div className="relative w-full max-w-[220px] mx-auto" style={{ transform: "rotate(-2deg)" }}>
      <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
        <div className="relative aspect-[1066/2175]">
          <Image
            src="/images/estudo-de-caso-ucopiloto-2.png"
            alt="Tela de dashboard do app do motorista"
            fill
            sizes="220px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function OnboardingShot() {
  return (
    <div className="relative w-full max-w-[260px] mx-auto lg:mx-0" style={{ transform: "rotate(1.5deg)" }}>
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
        <div className="relative aspect-[853/1844]">
          <Image
            src="/images/estudo-de-caso-ucopiloto-4.png"
            alt="Tela de cadastro do motorista"
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>
      <div className="absolute -top-3 -right-3 rounded-full bg-violet-500/15 border border-violet-400/30 text-violet-200 text-[10px] font-semibold px-3 py-1.5 backdrop-blur">
        1/3 · Cadastro
      </div>
    </div>
  );
}

function AppGalleryShot({
  src,
  alt,
  label,
  rotate,
}: {
  src: string;
  alt: string;
  label: Bilingual;
  rotate: string;
}) {
  const { lang } = useLanguage();
  return (
    <div className="relative w-full max-w-[210px] mx-auto" style={{ transform: `rotate(${rotate})` }}>
      <div className="relative rounded-[1.75rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
        <div className="relative aspect-[1320/2868]">
          <Image src={src} alt={alt} fill sizes="210px" className="object-cover" />
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">{tr(lang, label)}</p>
    </div>
  );
}

function ProductGallery() {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
      <AppGalleryShot
        src="/images/ucopiloto-estudo-caso.png"
        alt="Painel inicial do motorista com resumo financeiro do dia"
        label={{ pt: "Painel do motorista: lucro, faturamento e km do dia", en: "Driver dashboard: daily profit, revenue and mileage" }}
        rotate="-1.5deg"
      />
      <AppGalleryShot
        src="/images/ucopiloto-estudo-caso-2.png"
        alt="Menu de ações do veículo ativo"
        label={{ pt: "Gestão do veículo: abastecimento, manutenção e despesas", en: "Vehicle management: fueling, maintenance and expenses" }}
        rotate="1deg"
      />
      <AppGalleryShot
        src="/images/ucopiloto-estudo-de-caso-3.png"
        alt="Mapa com oficinas próximas ao motorista"
        label={{ pt: "Busca de oficinas próximas em tempo real", en: "Real-time nearby repair shop search" }}
        rotate="-1deg"
      />
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
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div>
              <p>
                {t({
                  pt: "O Ucopiloto nasceu para resolver um problema simples de enunciar e difícil de operar bem: encontrar uma oficina de confiança, agendar um serviço e acompanhar tudo sem depender de ligações e planilhas. A proposta da Click Software House era digitalizar essa jornada ponta a ponta.",
                  en: "Ucopiloto was created to solve a problem that's simple to state and hard to operate well: finding a trustworthy repair shop, booking a service and tracking everything without relying on phone calls and spreadsheets. Click Software House's proposal was to digitize that journey end to end.",
                })}
              </p>

              <div className="mt-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
                <h4 className="text-sm font-semibold text-white mb-3">
                  {t({ pt: "O que precisava funcionar desde o dia 1", en: "What needed to work from day one" })}
                </h4>
                <ul className="space-y-2">
                  {[
                    { pt: "Agendar serviços automotivos com poucos toques, do lado do motorista", en: "Booking automotive services in a few taps, from the driver's side" },
                    { pt: "Gerenciar demanda, orçamentos e histórico de veículos, do lado da oficina", en: "Managing demand, quotes and vehicle history, from the repair shop's side" },
                    { pt: "Manter os três produtos (app, web e admin) sempre em sincronia", en: "Keeping all three products (app, web and admin) always in sync" },
                  ].map((item) => (
                    <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <PosterShot />
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
              pt: "Como único engenheiro no projeto, atuei em todas as frentes: modelagem de dados, APIs, aplicativo mobile, painel web, admin e infraestrutura. A estratégia foi tratar agendamento e orçamento como o núcleo transacional do sistema — a parte que não podia falhar — e só então expandir para funcionalidades de suporte, como histórico de veículos e notificações.",
              en: "As the sole engineer on the project, I worked across every front: data modeling, APIs, the mobile app, the web panel, admin and infrastructure. The strategy was to treat booking and quoting as the system's transactional core — the part that couldn't fail — and only then expand into supporting features like vehicle history and notifications.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: "API",
                desc: { pt: "Regras de agendamento, orçamento e histórico de veículos.", en: "Booking, quoting and vehicle history rules." },
              },
              {
                title: "Web + Admin (Next.js)",
                desc: { pt: "Gestão operacional das oficinas e visão consolidada do negócio.", en: "Operational management for repair shops and a consolidated business view." },
              },
              {
                title: "Mobile (React Native)",
                desc: { pt: "Experiência do motorista, do agendamento ao acompanhamento.", en: "The driver's experience, from booking to tracking." },
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5">
                <h4 className="text-sm font-semibold text-white">{card.title}</h4>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{t(card.desc)}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {t({ pt: "Do rascunho ao produto", en: "From sketch to product" })}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div>
                <LowFiWireframe />
                <p className="mt-3 text-center text-xs text-zinc-500">
                  {t({ pt: "Protótipo de baixa fidelidade da tela de agendamento", en: "Low-fidelity prototype of the booking screen" })}
                </p>
              </div>
              <PhoneShot />
            </div>
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
              pt: "Mesmo sem uma equipe de infraestrutura, o Ucopiloto precisava se comportar como um sistema de produção sério: múltiplos serviços, cada um isolado em seu próprio container, com contratos de API estáveis entre app, painel web e admin. A arquitetura foi desenhada para que qualquer parte do sistema pudesse falhar, reiniciar e voltar sozinha, sem intervenção manual.",
              en: "Even without an infrastructure team, Ucopiloto had to behave like a serious production system: multiple services, each isolated in its own container, with stable API contracts across app, web panel and admin. The architecture was designed so that any part of the system could fail, restart and recover on its own, without manual intervention.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Domínio isolado por módulo", en: "Domain isolated by module" },
                desc: { pt: "NestJS organiza a API em módulos (agendamento, orçamento, veículos, notificações), cada um com suas próprias regras e testabilidade.", en: "NestJS organizes the API into modules (booking, quoting, vehicles, notifications), each with its own rules and testability." },
              },
              {
                title: { pt: "Dados consistentes e tipados", en: "Consistent, typed data" },
                desc: { pt: "PostgreSQL com modelagem relacional para agendamentos e orçamentos, acessado via Prisma para reduzir erros de tipo em produção.", en: "PostgreSQL with relational modeling for bookings and quotes, accessed via Prisma to reduce type errors in production." },
              },
              {
                title: { pt: "Containers auto-recuperáveis", en: "Self-healing containers" },
                desc: { pt: "Cada serviço roda em container próprio no Docker, com restart policy e healthcheck: uma falha não derruba o sistema inteiro.", en: "Each service runs in its own Docker container, with a restart policy and healthcheck: one failure doesn't bring down the whole system." },
              },
              {
                title: { pt: "Deploy sem downtime perceptível", en: "No noticeable-downtime deploys" },
                desc: { pt: "Imagens versionadas e deploy automatizado permitem atualizar a API em produção sem interromper agendamentos em andamento.", en: "Versioned images and automated deploys let the API be updated in production without interrupting in-progress bookings." },
              },
              {
                title: { pt: "Contrato único de API", en: "Single API contract" },
                desc: { pt: "App mobile, painel web e admin consomem a mesma API REST, eliminando divergência de regras de negócio entre plataformas.", en: "The mobile app, web panel and admin all consume the same REST API, eliminating business-rule drift between platforms." },
              },
              {
                title: { pt: "Backups e jobs assíncronos", en: "Backups and async jobs" },
                desc: { pt: "Rotinas de backup e tarefas de notificação rodam como jobs separados da API, sem competir por recursos com requisições em tempo real.", en: "Backup routines and notification tasks run as jobs separate from the API, without competing for resources with real-time requests." },
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
                  Toda a stack foi escolhida para que <span className="font-semibold text-violet-50">um único
                  engenheiro</span> conseguisse manter API, banco, jobs e observabilidade em produção — todos
                  containerizados e isolados entre si — com <span className="font-semibold text-violet-50">99,9%
                  de uptime</span>, mesmo sem uma equipe de infraestrutura dedicada.
                </>
              ) : (
                <>
                  The whole stack was chosen so that <span className="font-semibold text-violet-50">a single
                  engineer</span> could keep the API, database, jobs and observability in production — all
                  containerized and isolated from each other — at <span className="font-semibold text-violet-50">99.9%
                  uptime</span>, even without a dedicated infrastructure team.
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
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
            <OnboardingShot />
            <div>
              <p>
                {t({
                  pt: "A execução cobriu o fluxo completo: cadastro de motoristas e oficinas, agendamento, orçamento, acompanhamento do serviço e histórico. O app mobile, o painel web e o admin conversavam sempre com a mesma API.",
                  en: "Execution covered the full flow: driver and repair shop onboarding, booking, quoting, service tracking and history. The mobile app, web panel and admin always talked to the same API.",
                })}
              </p>

              <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
                <h4 className="text-sm font-semibold text-white mb-3">
                  {t({ pt: "Princípios de implementação", en: "Implementation principles" })}
                </h4>
                <ul className="grid grid-cols-1 gap-3">
                  {[
                    { pt: "Um único contrato de API para app, web e admin", en: "A single API contract for app, web and admin" },
                    { pt: "Validações de agendamento centralizadas no backend", en: "Booking validations centralized in the backend" },
                    { pt: "Componentização para reduzir retrabalho entre telas", en: "Componentization to reduce rework across screens" },
                    { pt: "Monitoramento básico desde o primeiro deploy", en: "Basic monitoring from the very first deploy" },
                  ].map((item) => (
                    <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {t({ pt: "Telas reais em produção", en: "Real screens in production" })}
              </span>
            </div>
            <ProductGallery />
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
              pt: "Como responsável único por DevOps, containerizei toda a aplicação com Docker: API, banco de dados, jobs assíncronos e reverse proxy rodam como serviços independentes, cada um com sua própria política de restart e healthcheck. Isso garante ambientes reprodutíveis e simplifica deploys e rollbacks, sem depender de acesso manual ao servidor em cada atualização.",
              en: "As the sole DevOps owner, I containerized the whole application with Docker: the API, database, background jobs and reverse proxy run as independent services, each with its own restart policy and healthcheck. That guarantees reproducible environments and simplifies deploys and rollbacks, without relying on manual server access for every update.",
            })}
          </p>
          <p>{t({ pt: "A operação solo exigiu disciplina em:", en: "Solo operation required discipline around:" })}</p>
          <ul className="space-y-2 ml-1">
            {[
              { pt: "Automação de deploy para reduzir erro humano e permitir rollback em minutos", en: "Deploy automation to reduce human error and allow rollback in minutes" },
              { pt: "Healthcheck e restart automático por container, isolando falhas por serviço", en: "Per-container healthcheck and automatic restart, isolating failures by service" },
              { pt: "Observabilidade mínima viável desde o início: logs estruturados e alertas básicos", en: "Minimum viable observability from the start: structured logs and basic alerting" },
              { pt: "Rotinas de backup do PostgreSQL testadas e agendadas como jobs próprios", en: "PostgreSQL backup routines tested and scheduled as their own jobs" },
              { pt: "Documentação enxuta para acelerar decisões futuras sem depender de memória", en: "Lean documentation to speed up future decisions without relying on memory" },
            ].map((item) => (
              <li key={item.pt} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                {t(item)}
              </li>
            ))}
          </ul>
          <p>
            {t({
              pt: "Esse cuidado se traduziu em 99,9% de uptime mesmo sem uma equipe de infraestrutura dedicada — a robustez do sistema vem da isolação entre serviços e da automação, não do tamanho do time.",
              en: "That care translated into 99.9% uptime even without a dedicated infrastructure team — the system's robustness comes from service isolation and automation, not team size.",
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
              pt: "O Ucopiloto consolidou uma base confiável para conectar motoristas e oficinas, com mais de 200 usuários ativos, 99,9% de uptime e uma redução de 35% no tempo de agendamento em relação ao processo manual anterior.",
              en: "Ucopiloto established a reliable foundation to connect drivers and repair shops, with over 200 active users, 99.9% uptime and a 35% reduction in scheduling time compared to the previous manual process.",
            })}
          </p>

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "Além do resultado técnico, o projeto validou que um único engenheiro, com as escolhas certas de arquitetura, pode sustentar um produto multiplataforma em produção com qualidade e estabilidade.",
                en: "Beyond the technical result, the project validated that a single engineer, with the right architectural choices, can sustain a multi-platform product in production with quality and stability.",
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

export default function UcopilotoCasePage() {
  const { lang } = useLanguage();
  const sectionsData = useSectionsData(lang);

  return (
    <div className="min-h-screen font-sans relative isolate">
      <SketchDefs />
      <div className="relative z-10">
        <SiteHeader />

        {/* ── HERO ── */}
        <CaseHero {...heroData} />

        {/* ── FOTO DE DESTAQUE ── */}
        <ShowcaseHero />

        {/* ── CONTEÚDO ── */}
        <CaseContent
          summary={summaryData}
          intro={{
            pt: "O Ucopiloto representa a construção, do zero ao lançamento comercial, de um app que conecta motoristas e oficinas, operado ponta a ponta por um único engenheiro, do produto à infraestrutura.",
            en: "Ucopiloto represents the construction, from scratch to commercial launch, of an app connecting drivers and repair shops, operated end to end by a single engineer, from product to infrastructure.",
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
