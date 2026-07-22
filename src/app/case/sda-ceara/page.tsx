"use client";

import Image from "next/image";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseCTA from "@/components/case/CaseCTA";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO: SDA Ceará
   ═══════════════════════════════════════════ */

const heroData = {
  title: {
    pt: "SDA Ceará: Modernizando a Gestão Agrária do Estado",
    en: "SDA Ceará: Modernizing the State's Agrarian Management",
  },
  subtitle: {
    pt: "App + Sistema Web/Admin para a Secretaria do Desenvolvimento Agrário",
    en: "App + Web/Admin System for the State Agrarian Development Secretariat",
  },
  description: {
    pt: "Aplicativo oficial do Governo do Ceará que centraliza os sistemas da Secretaria do Desenvolvimento Agrário (SDA): indicadores de demandas e ações, chamados técnicos, agenda, mensageria e questionários, unificando módulos que antes operavam isolados.",
    en: "Official Government of Ceará app that centralizes the systems of the State Agrarian Development Secretariat (SDA): demand and action indicators, technical tickets, agenda, messaging and surveys, unifying modules that used to run in isolation.",
  },
  tags: ["React Native", "PostgreSQL", ".NET", "C#", "PHP", "Docker", "Kubernetes", "Grafana", "Prometheus"],
};

const summaryData: Array<{ label: Bilingual; value: Bilingual }> = [
  { label: { pt: "Tipo de projeto", en: "Project type" }, value: { pt: "App Mobile + Web/Admin", en: "Mobile + Web/Admin App" } },
  { label: { pt: "Papel exercido", en: "Role" }, value: { pt: "Analista de Sistemas", en: "Systems Analyst" } },
  { label: { pt: "Idealizador", en: "Idealized by" }, value: { pt: "Governo do Ceará / SDA", en: "Government of Ceará / SDA" } },
  { label: { pt: "Status", en: "Status" }, value: { pt: "Em produção", en: "In production" } },
  { label: { pt: "Duração", en: "Duration" }, value: { pt: "1,8 anos de evolução contínua", en: "1.8 years of continuous evolution" } },
  { label: { pt: "Plataformas", en: "Platforms" }, value: { pt: "iOS + Android + Web + Admin", en: "iOS + Android + Web + Admin" } },
];

const challengesData = {
  title: { pt: "Principais Desafios Enfrentados", en: "Key Challenges Faced" },
  intro: {
    pt: "O SDA Ceará já era usado por servidores em produção quando entrei no projeto. Isso mudou completamente a natureza do trabalho: não era construir do zero, era evoluir um sistema em uso sem interromper a operação do Estado.",
    en: "SDA Ceará was already used by government staff in production when I joined the project. That completely changed the nature of the work: it wasn't building from scratch, it was evolving a system in active use without interrupting the State's operation.",
  },
  items: [
    {
      pt: "Migrar backend e frontend por módulos, sem downtime, com 1.000+ usuários ativos",
      en: "Migrating backend and frontend module by module, with zero downtime, serving 1,000+ active users",
    },
    {
      pt: "Sustentar 200+ logins simultâneos com estabilidade em infraestrutura orquestrada",
      en: "Sustaining 200+ concurrent logins with stability on orchestrated infrastructure",
    },
    {
      pt: "Unificar sistemas historicamente isolados (IDA, Questionário, MAPP, Ceará Sem Fome) em um único app",
      en: "Unifying historically siloed systems (IDA, Survey, MAPP, Ceará Sem Fome) into a single app",
    },
  ] as Bilingual[],
};

const kpisData: Array<{ text: Bilingual }> = [
  { text: { pt: "1.000+ usuários ativos em produção", en: "1,000+ active users in production" } },
  { text: { pt: "200+ logins simultâneos suportados", en: "200+ concurrent logins supported" } },
  { text: { pt: "Backend e frontend migrados por módulos, sem parar a operação", en: "Backend and frontend migrated module by module, without stopping operations" } },
  { text: { pt: "Observabilidade com Grafana e Prometheus", en: "Observability with Grafana and Prometheus" } },
  { text: { pt: "Orquestração de containers com Kubernetes", en: "Container orchestration with Kubernetes" } },
];

const stackData = ["React Native", "PostgreSQL", ".NET", "C#", "PHP", "Docker", "Kubernetes", "Grafana", "Prometheus"];

/* ═══════════════════════════════════════════
   ILUSTRAÇÃO: ARQUITETURA
   ═══════════════════════════════════════════ */

function ArchitectureDiagram({ lang }: { lang: "pt" | "en" }) {
  const t = (v: Bilingual) => tr(lang, v);
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="Diagrama detalhado da arquitetura do SDA Ceará">
      <defs>
        <marker id="sda-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#8b5cf6" />
        </marker>
        <marker id="sda-arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#71717a" />
        </marker>
      </defs>

      {/* CI/CD pipeline */}
      <rect x="430" y="8" width="340" height="42" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="600" y="26" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "CI/CD — build de imagem Docker", en: "CI/CD — Docker image build" })}
      </text>
      <text x="600" y="40" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Push no registry e rollout gradual no cluster", en: "Registry push and gradual cluster rollout" })}
      </text>
      <line x1="600" y1="50" x2="600" y2="74" stroke="#71717a" strokeWidth="1.4" strokeDasharray="3 3" markerEnd="url(#sda-arrow-dim)" />

      {/* Client */}
      <rect x="8" y="112" width="150" height="56" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="83" y="134" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">React Native + Web</text>
      <text x="83" y="150" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Servidores em todo o Ceará", en: "Staff across all of Ceará" })}
      </text>

      <line x1="158" y1="140" x2="192" y2="140" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#sda-arrow)" />

      {/* Ingress / Load balancer (outside cluster) */}
      <rect x="198" y="118" width="130" height="44" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="263" y="136" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Load Balancer", en: "Load Balancer" })}
      </text>
      <text x="263" y="150" textAnchor="middle" fontSize="9" fill="#a1a1aa">TLS</text>

      <line x1="328" y1="140" x2="358" y2="140" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#sda-arrow)" />

      {/* Kubernetes boundary */}
      <rect x="356" y="76" width="436" height="374" rx="16" fill="none" stroke="rgba(139,92,246,0.35)" strokeDasharray="5 5" />
      <text x="372" y="70" fontSize="9.5" fill="#a78bfa" letterSpacing="0.08em">KUBERNETES CLUSTER</text>

      {/* Ingress controller inside cluster */}
      <rect x="372" y="112" width="150" height="46" rx="10" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.45)" />
      <text x="447" y="132" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Ingress Controller", en: "Ingress Controller" })}
      </text>
      <text x="447" y="146" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Roteia por módulo/domínio", en: "Routes per module/domain" })}
      </text>

      <line x1="447" y1="158" x2="447" y2="182" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#sda-arrow)" />

      {/* Service replicas row */}
      {[
        {
          x: 372,
          title: "IDA — .NET",
          sub: t({ pt: "3 réplicas · HPA 2–6", en: "3 replicas · HPA 2–6" }),
        },
        {
          x: 508,
          title: t({ pt: "Atividades / MAPP — C#", en: "Activities / MAPP — C#" }),
          sub: t({ pt: "2 réplicas · HPA 2–4", en: "2 replicas · HPA 2–4" }),
        },
        {
          x: 644,
          title: t({ pt: "Questionário — PHP", en: "Survey — PHP" }),
          sub: t({ pt: "2 réplicas (legado)", en: "2 replicas (legacy)" }),
        },
      ].map((svc) => (
        <g key={svc.title}>
          {/* stacked "replica" shadow rects to convey horizontal scaling */}
          <rect x={svc.x + 6} y="196" width="120" height="60" rx="9" fill="rgba(139,92,246,0.05)" stroke="rgba(139,92,246,0.2)" />
          <rect x={svc.x + 3} y="192" width="120" height="60" rx="9" fill="rgba(139,92,246,0.07)" stroke="rgba(139,92,246,0.28)" />
          <rect x={svc.x} y="188" width="120" height="60" rx="9" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.45)" />
          <text x={svc.x + 60} y="210" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
            {svc.title}
          </text>
          <text x={svc.x + 60} y="226" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
            {svc.sub}
          </text>
        </g>
      ))}

      <text x="574" y="278" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "HPA reequilibra réplicas por CPU/memória em picos de acesso estadual", en: "HPA rebalances replicas by CPU/memory during statewide traffic spikes" })}
      </text>

      <line x1="574" y1="248" x2="574" y2="300" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#sda-arrow)" />

      {/* Database tier */}
      <rect x="450" y="300" width="140" height="56" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="520" y="322" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "PostgreSQL — Primário", en: "PostgreSQL — Primary" })}
      </text>
      <text x="520" y="337" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Leitura e escrita", en: "Read and write" })}
      </text>

      <line x1="590" y1="328" x2="618" y2="328" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#sda-arrow)" />

      <rect x="624" y="300" width="140" height="56" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="694" y="322" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "PostgreSQL — Réplica", en: "PostgreSQL — Replica" })}
      </text>
      <text x="694" y="337" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Réplica de leitura e backups", en: "Read replica and backups" })}
      </text>

      {/* Observability tier */}
      <line x1="447" y1="248" x2="410" y2="382" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#sda-arrow-dim)" />
      <line x1="574" y1="248" x2="474" y2="382" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#sda-arrow-dim)" />
      <line x1="704" y1="248" x2="538" y2="382" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#sda-arrow-dim)" />

      <rect x="372" y="386" width="130" height="52" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="437" y="406" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">Prometheus</text>
      <text x="437" y="420" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Coleta métricas dos pods", en: "Scrapes pod metrics" })}
      </text>

      <line x1="502" y1="412" x2="514" y2="412" stroke="#71717a" strokeWidth="1.2" markerEnd="url(#sda-arrow-dim)" />

      <rect x="518" y="386" width="122" height="52" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="579" y="406" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">Grafana</text>
      <text x="579" y="420" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Dashboards operacionais", en: "Operational dashboards" })}
      </text>

      <line x1="640" y1="412" x2="652" y2="412" stroke="#71717a" strokeWidth="1.2" markerEnd="url(#sda-arrow-dim)" />

      <rect x="656" y="386" width="130" height="52" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="721" y="406" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">Alertmanager</text>
      <text x="721" y="420" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Alertas de incidentes", en: "Incident alerts" })}
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
            src="/images/capa-sda-app.png"
            alt="Aplicativo SDA Ceará em uso"
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

function PhoneShot({
  src,
  alt,
  caption,
  rotate,
}: {
  src: string;
  alt: string;
  caption: Bilingual;
  rotate: string;
}) {
  const { lang } = useLanguage();
  return (
    <div className="relative w-full max-w-[220px] mx-auto" style={{ transform: `rotate(${rotate})` }}>
      <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
        <div className="relative aspect-[591/1280]">
          <Image src={src} alt={alt} fill sizes="220px" className="object-cover" />
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">{tr(lang, caption)}</p>
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
      title: { pt: "Contexto e Escopo", en: "Context and Scope" },
      children: (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div>
              <p>
                {t({
                  pt: "O SDA Ceará é o aplicativo oficial da Secretaria do Desenvolvimento Agrário do Governo do Ceará, usado por servidores para acompanhar indicadores de demandas e ações (sistema IDA), abrir e controlar chamados técnicos, gerenciar agenda e mensagens, e responder questionários. O app também dá visibilidade a programas vinculados, como o Ceará Sem Fome e o Projeto São José.",
                  en: "SDA Ceará is the official app of the Government of Ceará's State Agrarian Development Secretariat, used by staff to track demand and action indicators (the IDA system), open and manage technical tickets, handle agenda and messaging, and answer surveys. The app also surfaces linked programs, such as Ceará Sem Fome and Projeto São José.",
                })}
              </p>

              <div className="mt-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
                <h4 className="text-sm font-semibold text-white mb-3">
                  {t({ pt: "Módulos centralizados no app", en: "Modules centralized in the app" })}
                </h4>
                <ul className="space-y-2">
                  {[
                    { pt: "Indicadores de Demandas e Ações (IDA), com relatórios e dashboard", en: "Demand and Action Indicators (IDA), with reports and dashboard" },
                    { pt: "Chamados técnicos e burocráticos via Sistema de Atividades", en: "Technical and bureaucratic tickets via the Activity System" },
                    { pt: "Agenda, mensageria com histórico e questionários (SDA)", en: "Agenda, messaging with history, and surveys (SDA)" },
                    { pt: "Filtros cruzados por entidade, projeto, ano e município", en: "Cross filters by entity, project, year and municipality" },
                  ].map((item) => (
                    <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <PhoneShot
              src="/images/sda-estudo-caso-2.jpeg"
              alt="Filtro do módulo Ceará Sem Fome x Projetos"
              caption={{ pt: "Cruzamento de dados: Ceará Sem Fome x Projetos, por região, sexo e CadÚnico", en: "Cross-referencing data: Ceará Sem Fome x Projects, by region, gender and CadÚnico" }}
              rotate="2deg"
            />
          </div>
        </>
      ),
    },
    {
      title: { pt: "Migração e Modernização por Módulos", en: "Module-by-Module Migration and Modernization" },
      children: (
        <>
          <p>
            {t({
              pt: "Como Analista de Sistemas responsável pela evolução do produto, conduzi a migração do backend e frontend por módulos: cada tela do app foi reescrita e validada sem interromper o uso pelos servidores da Secretaria, que já dependiam do sistema no dia a dia.",
              en: "As the Systems Analyst responsible for the product's evolution, I led the backend and frontend migration module by module: each screen was rewritten and validated without interrupting use by the Secretariat's staff, who already depended on the system daily.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "API (.NET / C# / PHP)", en: "API (.NET / C# / PHP)" },
                desc: { pt: "Regras de negócio dos indicadores, chamados e questionários.", en: "Business rules for indicators, tickets and surveys." },
              },
              {
                title: { pt: "Filtros e relatórios", en: "Filters and reports" },
                desc: { pt: "Consultas cruzadas por entidade, projeto, ano e município.", en: "Cross queries by entity, project, year and municipality." },
              },
              {
                title: { pt: "Mobile (React Native)", en: "Mobile (React Native)" },
                desc: { pt: "Experiência unificada dos servidores em campo e escritório.", en: "Unified experience for field and office staff." },
              },
            ].map((card) => (
              <div key={card.title.pt} className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5">
                <h4 className="text-sm font-semibold text-white">{t(card.title)}</h4>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{t(card.desc)}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {t({ pt: "Módulo migrado em produção", en: "Module migrated in production" })}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {t({
                    pt: "O módulo \"Sistemas\" foi reconstruído com filtros dinâmicos por entidade, projeto, ano e município, permitindo que servidores cruzem dados de diferentes iniciativas agrárias sem depender de planilhas externas.",
                    en: "The \"Sistemas\" module was rebuilt with dynamic filters by entity, project, year and municipality, letting staff cross-reference data from different agrarian initiatives without relying on external spreadsheets.",
                  })}
                </p>
              </div>
              <PhoneShot
                src="/images/sda-estudo-caso-1.jpeg"
                alt="Filtro dinâmico por Entidade, Projeto, Ano e Município"
                caption={{ pt: "Módulo Sistemas: filtro dinâmico por entidade, projeto, ano e município", en: "Sistemas module: dynamic filter by entity, project, year and municipality" }}
                rotate="-2deg"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: { pt: "Arquitetura e Infraestrutura", en: "Architecture and Infrastructure" },
      children: (
        <>
          <p>
            {t({
              pt: "O SDA Ceará não é um app de nicho: é usado por servidores de uma Secretaria de Estado, com picos de acesso concentrados em períodos de prestação de contas e acompanhamento de projetos em todos os municípios cearenses. Isso torna a infraestrutura tão crítica quanto o produto em si — a arquitetura foi desenhada para escalar horizontalmente, tolerar falhas de instância e permitir deploys frequentes sem indisponibilidade perceptível.",
              en: "SDA Ceará isn't a niche app: it's used by staff across an entire State Secretariat, with access spikes concentrated around accountability periods and project tracking in every municipality of Ceará. That makes the infrastructure as critical as the product itself — the architecture was designed to scale horizontally, tolerate instance failures and allow frequent deploys without noticeable downtime.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Containers imutáveis", en: "Immutable containers" },
                desc: { pt: "Cada módulo (.NET, C# e PHP legado) empacotado em imagens Docker versionadas, com builds reprodutíveis independentes da máquina do desenvolvedor.", en: "Each module (.NET, C# and legacy PHP) packaged into versioned Docker images, with reproducible builds independent of the developer's machine." },
              },
              {
                title: { pt: "Orquestração e auto-scaling", en: "Orchestration and auto-scaling" },
                desc: { pt: "Kubernetes com múltiplas réplicas por serviço e Horizontal Pod Autoscaler ajustando capacidade conforme CPU/memória nos picos de acesso estadual.", en: "Kubernetes with multiple replicas per service and a Horizontal Pod Autoscaler adjusting capacity by CPU/memory during statewide access spikes." },
              },
              {
                title: { pt: "Resiliência de dados", en: "Data resilience" },
                desc: { pt: "PostgreSQL primário com réplica de leitura, isolando relatórios pesados da carga transacional e servindo de base para backups.", en: "Primary PostgreSQL with a read replica, isolating heavy reporting load from transactional traffic and serving as a backup source." },
              },
              {
                title: { pt: "Rollout gradual", en: "Gradual rollout" },
                desc: { pt: "Pipeline de CI/CD publica novas versões dos módulos por rolling update, permitindo evoluir o sistema em produção sem parar o atendimento aos servidores.", en: "A CI/CD pipeline ships new module versions via rolling update, letting the system evolve in production without stopping service to staff." },
              },
              {
                title: { pt: "Observabilidade fim a fim", en: "End-to-end observability" },
                desc: { pt: "Prometheus coleta métricas de cada pod, Grafana expõe dashboards operacionais e o Alertmanager dispara alertas antes que incidentes cheguem ao usuário final.", en: "Prometheus scrapes metrics from every pod, Grafana exposes operational dashboards, and Alertmanager fires alerts before incidents reach end users." },
              },
              {
                title: { pt: "Isolamento entre módulos", en: "Isolation between modules" },
                desc: { pt: "Cada domínio (IDA, Atividades/MAPP, Questionário) roda como serviço independente, permitindo escalar, atualizar ou reiniciar um módulo sem afetar os demais.", en: "Each domain (IDA, Activities/MAPP, Survey) runs as an independent service, so any module can scale, update or restart without affecting the others." },
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
                  O resultado é uma infraestrutura pensada para <span className="font-semibold text-violet-50">escala estadual</span>:
                  serviços com múltiplas réplicas atrás de um Ingress Controller, banco de dados com réplica de leitura,
                  e uma stack de observabilidade que dá visibilidade de produção antes que um problema afete
                  os servidores da Secretaria em qualquer município do Ceará.
                </>
              ) : (
                <>
                  The result is infrastructure built for <span className="font-semibold text-violet-50">statewide scale</span>:
                  multi-replica services behind an Ingress Controller, a database with a read replica,
                  and an observability stack that gives production visibility before an issue affects
                  Secretariat staff in any municipality of Ceará.
                </>
              )}
            </p>
          </div>
        </>
      ),
    },
    {
      title: { pt: "Integração de Múltiplos Módulos", en: "Integrating Multiple Modules" },
      children: (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
            <PhoneShot
              src="/images/sda-estudo-caso-3.jpeg"
              alt="Listagem do módulo MAPP com Dashboard MAPP"
              caption={{ pt: "MAPP: sistema de acompanhamento com dashboard próprio", en: "MAPP: tracking system with its own dashboard" }}
              rotate="1.5deg"
            />
            <div>
              <p>
                {t({
                  pt: "Além do IDA, o app integra o MAPP (Sistema de Acompanhamento) com seu próprio dashboard, o sistema de Questionários e a mensageria interna. Cada módulo mantém sua lógica de negócio própria, mas compartilha o mesmo shell de navegação e autenticação, reduzindo a curva de aprendizado para os servidores.",
                  en: "Besides IDA, the app integrates MAPP (the tracking system) with its own dashboard, the Survey system and internal messaging. Each module keeps its own business logic but shares the same navigation shell and authentication, reducing the learning curve for staff.",
                })}
              </p>

              <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
                <h4 className="text-sm font-semibold text-white mb-3">
                  {t({ pt: "Princípios de integração", en: "Integration principles" })}
                </h4>
                <ul className="grid grid-cols-1 gap-3">
                  {[
                    { pt: "Autenticação e navegação únicas para todos os módulos", en: "Single authentication and navigation across all modules" },
                    { pt: "Ingress único roteando cada domínio para seu serviço, sem acoplar módulos entre si", en: "A single ingress routes each domain to its own service, without coupling modules together" },
                    { pt: "Cada módulo migrado isoladamente, com rollback simples", en: "Each module migrated in isolation, with a simple rollback path" },
                    { pt: "Filtros e relatórios reutilizáveis entre módulos correlatos", en: "Reusable filters and reports across related modules" },
                    { pt: "Sem interrupção do uso por servidores durante a modernização", en: "No interruption to staff usage during modernization" },
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
        </>
      ),
    },
    {
      title: { pt: "Impacto do Projeto", en: "Project Impact" },
      children: (
        <>
          <p>
            {t({
              pt: "O SDA Ceará hoje sustenta mais de 1.000 usuários ativos e mais de 200 logins simultâneos de servidores em todo o Estado, com backend e frontend totalmente migrados por módulos ao longo de 1,8 anos, sem interromper o trabalho diário da Secretaria do Desenvolvimento Agrário — e com uma infraestrutura em Kubernetes preparada para escalar conforme a demanda estadual cresce.",
              en: "SDA Ceará now sustains over 1,000 active users and 200+ concurrent logins from staff across the State, with backend and frontend fully migrated module by module over 1.8 years, without ever interrupting the Secretariat's daily work — backed by Kubernetes infrastructure ready to scale as statewide demand grows.",
            })}
          </p>

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "O projeto reforça que modernizar sistemas de governo em produção exige tanto rigor técnico quanto disciplina de processo: cada módulo precisa evoluir sem quebrar a confiança de quem já depende dele.",
                en: "The project reinforces that modernizing government systems in production requires both technical rigor and process discipline: every module has to evolve without breaking the trust of the people who already depend on it.",
              })}
            </p>
          </div>
        </>
      ),
    },
    {
      title: { pt: "Trade-offs e o que eu faria diferente", en: "Trade-offs and what I'd do differently" },
      children: (
        <>
          <div className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
            <h4 className="text-sm font-semibold text-white mb-3">
              {t({ pt: "O que optei por não fazer", en: "What I chose not to build" })}
            </h4>
            <ul className="space-y-2">
              {[
                { pt: "Big-bang rewrite: descartei reescrever o sistema legado de uma vez. Com mais de 1.000 usuários já dependendo dele todo dia, migrar módulo por módulo levou mais tempo (1,8 anos), mas nunca interrompeu a operação da Secretaria.", en: "A big-bang rewrite: I ruled out replacing the legacy system all at once. With 1,000+ users already depending on it daily, migrating module by module took longer (1.8 years) but never interrupted the Secretariat's operations." },
                { pt: "Trocar o banco de dados durante a transição: mantive o PostgreSQL como fonte de verdade em vez de migrar de banco no meio do processo, pra não somar risco de dados a um projeto que já era arriscado por natureza.", en: "Swapping the database mid-transition: I kept PostgreSQL as the source of truth instead of migrating databases partway through, to avoid stacking data risk onto a project that was already inherently risky." },
              ].map((item) => (
                <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <h4 className="text-sm font-semibold text-white mb-3">
              {t({ pt: "O que eu faria diferente hoje", en: "What I'd do differently today" })}
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "Introduziria feature flags desde o primeiro módulo migrado, não a partir do meio do projeto. Separar deploy de release teria dado mais margem pra testar cada módulo novo com um grupo pequeno de servidores antes de liberar pros 200+ logins simultâneos do Estado inteiro.",
                en: "I'd introduce feature flags from the first migrated module, not partway through the project. Decoupling deploy from release would have given more room to test each new module with a small group of staff before rolling it out to the state's 200+ concurrent logins.",
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

export default function SdaCearaCasePage() {
  const { lang } = useLanguage();
  const sectionsData = useSectionsData(lang);

  return (
    <div className="min-h-screen font-sans relative isolate">
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
            pt: "O SDA Ceará representa a modernização, módulo por módulo e sem downtime, de um sistema de governo já em uso, unificando indicadores, chamados, agenda e questionários em um único app para os servidores da Secretaria do Desenvolvimento Agrário.",
            en: "SDA Ceará represents the module-by-module, zero-downtime modernization of a government system already in use, unifying indicators, tickets, agenda and surveys into a single app for the State Agrarian Development Secretariat's staff.",
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
