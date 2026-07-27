"use client";

import ClickableImage from "@/components/case/ClickableImage";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseCTA from "@/components/case/CaseCTA";
import StandardSiteHeader from "@/components/StandardSiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO: IDA — Indicadores de
   Demandas e Ações (SDA Ceará)
   ═══════════════════════════════════════════ */

const heroData = {
  title: {
    pt: "IDA: Business Intelligence para a Gestão Agrária do Ceará",
    en: "IDA: Business Intelligence for Ceará's Agrarian Management",
  },
  subtitle: {
    pt: "Painel de Indicadores de Demandas e Ações da Secretaria do Desenvolvimento Agrário",
    en: "Demand and Action Indicators Dashboard for the State Agrarian Development Secretariat",
  },
  description: {
    pt: "Sistema web desenvolvido para a SDA Ceará para cadastrar, acompanhar e cruzar indicadores de demandas e ações estratégicas dos programas da secretaria, com cobertura dos 184 municípios do estado e um relatório em Power BI, embutido na home, para apresentar os dados já tratados e analisados.",
    en: "Web system built for SDA Ceará to register, track and cross-reference demand and action indicators for the Secretariat's programs, covering all 184 municipalities of the state, with a Power BI report embedded on the home screen to present already treated and analyzed data.",
  },
  tags: ["PHP", "Laravel", "PostgreSQL", "SQL", "Power BI", "Docker", "Git"],
};

const summaryData: Array<{ label: Bilingual; value: Bilingual }> = [
  { label: { pt: "Tipo de projeto", en: "Project type" }, value: { pt: "Sistema Web + Admin", en: "Web + Admin System" } },
  { label: { pt: "Papel exercido", en: "Role" }, value: { pt: "Analista de Sistemas", en: "Systems Analyst" } },
  { label: { pt: "Idealizador", en: "Idealized by" }, value: { pt: "SDA Ceará", en: "SDA Ceará" } },
  { label: { pt: "Status", en: "Status" }, value: { pt: "Em produção", en: "In production" } },
  { label: { pt: "Duração", en: "Duration" }, value: { pt: "6 meses de produção", en: "6 months in production" } },
  { label: { pt: "Cobertura", en: "Coverage" }, value: { pt: "184/184 municípios do CE", en: "184/184 CE municipalities" } },
];

const challengesData = {
  title: { pt: "Principais Desafios Enfrentados", en: "Key Challenges Faced" },
  intro: {
    pt: "O IDA precisava transformar planilhas e registros dispersos de demandas e ações em um painel único, confiável para os 184 municípios do Ceará e simples o bastante para gestores tomarem decisões sem depender de exportações manuais.",
    en: "IDA needed to turn scattered spreadsheets and demand/action records into a single, reliable dashboard covering all 184 municipalities of Ceará — simple enough for managers to make decisions without relying on manual exports.",
  },
  items: [
    {
      pt: "Consolidar indicadores heterogêneos (beneficiários, valores, cisternas, entidades) em um modelo de dados único",
      en: "Consolidating heterogeneous indicators (beneficiaries, amounts, cisterns, entities) into a single data model",
    },
    {
      pt: "Cruzar dados por município, ano e tipo de indicador com performance aceitável em consultas agregadas",
      en: "Cross-referencing data by municipality, year and indicator type with acceptable performance on aggregate queries",
    },
    {
      pt: "Manter cadastro e movimentação de dados auditáveis, sem comprometer a leitura em tempo real do painel de BI",
      en: "Keeping data registration and movement auditable without compromising real-time reads on the BI dashboard",
    },
  ] as Bilingual[],
};

const kpisData: Array<{ text: Bilingual }> = [
  { text: { pt: "184/184 municípios do Ceará com indicadores cadastrados", en: "184/184 Ceará municipalities with registered indicators" } },
  { text: { pt: "500+ usuários ativos no sistema", en: "500+ active users in the system" } },
  { text: { pt: "18.403 demandas registradas no histórico do sistema, desde 2015", en: "18,403 demands recorded in the system's history, since 2015" } },
  { text: { pt: "100+ demandas monitoradas por mês", en: "100+ demands tracked per month" } },
  { text: { pt: "99,5% de uptime em produção", en: "99.5% uptime in production" } },
  { text: { pt: "-25% no tempo de resposta a demandas após a virada para o painel de BI", en: "-25% in demand response time after switching to the BI dashboard" } },
  { text: { pt: "Ambiente containerizado com Docker para builds reprodutíveis", en: "Containerized environment with Docker for reproducible builds" } },
];

const stackData = ["PHP", "Laravel", "PostgreSQL", "SQL", "Power BI", "Docker", "Git"];

/* ═══════════════════════════════════════════
   DIAGRAMA DE ARQUITETURA (SVG inline, bilíngue)
   ═══════════════════════════════════════════ */

function ArchitectureDiagram({ lang }: { lang: "pt" | "en" }) {
  const t = (v: Bilingual) => tr(lang, v);
  return (
    <svg viewBox="0 0 820 480" className="w-full h-auto" role="img" aria-label="Diagrama da arquitetura do SDA Indicadores">
      <defs>
        <marker id="sdai-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#8b5cf6" />
        </marker>
        <marker id="sdai-arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#71717a" />
        </marker>
      </defs>

      {/* Pipeline de entrega */}
      <rect x="250" y="8" width="320" height="44" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="410" y="26" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Git → imagem Docker → deploy no ambiente SDA", en: "Git → Docker image → deploy to the SDA environment" })}
      </text>
      <text x="410" y="40" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Versionamento e ambientes isolados (dev/prod)", en: "Versioning and isolated environments (dev/prod)" })}
      </text>
      <line x1="410" y1="52" x2="410" y2="72" stroke="#71717a" strokeWidth="1.4" strokeDasharray="3 3" markerEnd="url(#sdai-arrow-dim)" />

      {/* Fronteira do container Docker */}
      <rect x="200" y="74" width="604" height="330" rx="16" fill="none" stroke="rgba(139,92,246,0.35)" strokeDasharray="5 5" />
      <text x="216" y="68" fontSize="9.5" fill="#a78bfa" letterSpacing="0.08em">AMBIENTE CONTAINERIZADO · DOCKER</text>

      {/* Cliente */}
      <rect x="8" y="180" width="152" height="64" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="84" y="205" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Navegador", en: "Browser" })}
      </text>
      <text x="84" y="221" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Gestores e", en: "Managers and" })}
      </text>
      <text x="84" y="233" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "coordenadores SDA", en: "SDA coordinators" })}
      </text>
      <text x="187" y="203" textAnchor="middle" fontSize="8" fill="#a1a1aa">HTTPS/TLS</text>
      <line x1="160" y1="212" x2="214" y2="212" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#sdai-arrow)" />

      {/* Backend Laravel */}
      <rect x="216" y="168" width="182" height="104" rx="10" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.4)" />
      <text x="307" y="187" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Backend · Laravel/PHP", en: "Backend · Laravel/PHP" })}
      </text>
      <rect x="228" y="196" width="158" height="30" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
      <text x="307" y="215" textAnchor="middle" fontSize="9" fill="#d4d4d8">
        {t({ pt: "Cadastro · movimentação", en: "Registration · tracking" })}
      </text>
      <rect x="228" y="232" width="158" height="30" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
      <text x="307" y="251" textAnchor="middle" fontSize="9" fill="#d4d4d8">
        {t({ pt: "Agregação de indicadores", en: "Indicator aggregation" })}
      </text>
      <line x1="398" y1="210" x2="430" y2="210" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#sdai-arrow)" />

      {/* Camada analítica SQL */}
      <rect x="430" y="178" width="176" height="86" rx="10" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.45)" />
      <text x="518" y="199" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Camada analítica", en: "Analytics layer" })}
      </text>
      <text x="518" y="215" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "consultas SQL diretas", en: "direct SQL queries" })}
      </text>
      <text x="518" y="229" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "tratamento e agregação", en: "treatment and aggregation" })}
      </text>
      <text x="518" y="250" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "alimenta os painéis", en: "feeds the dashboards" })}
      </text>

      {/* Consumidores / BI */}
      <rect x="634" y="150" width="158" height="44" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="713" y="170" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">Power BI</text>
      <text x="713" y="184" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "dashboards executivos", en: "executive dashboards" })}
      </text>
      <rect x="634" y="206" width="158" height="44" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="713" y="226" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Indicadores", en: "Indicators" })}
      </text>
      <text x="713" y="240" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "em tempo real", en: "in real time" })}
      </text>
      <line x1="606" y1="200" x2="634" y2="174" stroke="#8b5cf6" strokeWidth="1.4" markerEnd="url(#sdai-arrow)" />
      <line x1="606" y1="230" x2="634" y2="228" stroke="#8b5cf6" strokeWidth="1.4" markerEnd="url(#sdai-arrow)" />

      {/* Banco de dados */}
      <rect x="336" y="320" width="248" height="68" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="460" y="343" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">PostgreSQL</text>
      <text x="460" y="359" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "demandas · ações estratégicas", en: "demands · strategic actions" })}
      </text>
      <text x="460" y="373" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "movimentações e status", en: "movements and status" })}
      </text>
      <line x1="300" y1="272" x2="372" y2="320" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#sdai-arrow)" />
      <line x1="500" y1="320" x2="518" y2="264" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#sdai-arrow-dim)" />

      {/* Fluxo de dados — pills */}
      <text x="24" y="422" fontSize="8.5" fill="#71717a" letterSpacing="0.08em">
        {t({ pt: "FLUXO DE DADOS — DA DEMANDA AO INDICADOR", en: "DATA FLOW — FROM DEMAND TO INDICATOR" })}
      </text>
      {[
        { x: 24, w: 158, label: t({ pt: "Demanda cadastrada", en: "Demand registered" }) },
        { x: 214, w: 150, label: t({ pt: "Movimentação", en: "Tracking update" }) },
        { x: 396, w: 176, label: t({ pt: "Agregação (SQL)", en: "Aggregation (SQL)" }) },
        { x: 604, w: 192, label: t({ pt: "Indicador no painel", en: "Indicator on dashboard" }) },
      ].map((p, i) => (
        <g key={p.label}>
          <rect x={p.x} y="430" width={p.w} height="36" rx="18" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.3)" />
          <text x={p.x + p.w / 2} y="452" textAnchor="middle" fontSize="9" fill="#d4d4d8">{p.label}</text>
          {i < 3 ? (
            <line x1={p.x + p.w} y1="448" x2={p.x + p.w + 28} y2="448" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#sdai-arrow)" />
          ) : null}
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   FOTO REAL DO PRODUTO (moldura)
   ═══════════════════════════════════════════ */

function ShowcaseHero() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  return (
    <div className="relative mx-auto max-w-5xl px-6 sm:px-8 -mt-4 mb-16">
      <div className="relative overflow-hidden border border-white/10">
        <ClickableImage
          src="/images/capa-id.png"
          alt="Painel de Indicadores de Demandas e Ações (IDA) da SDA Ceará"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[11px] font-medium text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            {t({ pt: "SDA Indicadores · painel", en: "SDA Indicators · dashboard" })}
          </span>
        </div>
      </div>
    </div>
  );
}

function DesktopShot({
  src,
  alt,
  caption,
  aspectRatio = "3/2",
}: {
  src: string;
  alt: string;
  caption: Bilingual;
  aspectRatio?: string;
}) {
  const { lang } = useLanguage();
  return (
    <div className="w-full">
      <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-black/40">
        <ClickableImage src={src} alt={alt} sizes="(max-width: 1024px) 100vw, 700px" aspectRatio={aspectRatio} />
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
          <p>
            {t({
              pt: "O IDA (Indicadores de Demandas e Ações) é o sistema usado pela Secretaria do Desenvolvimento Agrário do Ceará (SDA CE) para registrar e acompanhar as demandas e ações estratégicas dos programas da secretaria — cisternas, benefícios, agricultores atendidos, entidades parceiras, entre outros indicadores — cruzando os dados por município, ano e tipo de ação em todos os 184 municípios do estado.",
              en: "IDA (Demand and Action Indicators) is the system used by the State Agrarian Development Secretariat of Ceará (SDA CE) to register and track demands and strategic actions across the Secretariat's programs — cisterns, benefits, farmers served, partner entities, among other indicators — cross-referencing data by municipality, year and action type across all 184 municipalities of the state.",
            })}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start mt-6">
            <div className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                {t({ pt: "Módulos do sistema", en: "System modules" })}
              </h4>
              <ul className="space-y-2">
                {[
                  { pt: "Cadastro — indicadores, entidades e metadados das ações da secretaria", en: "Registration — indicators, entities and metadata for the Secretariat's actions" },
                  { pt: "Movimentação — lançamento e atualização da execução de cada ação", en: "Movement — logging and updating the execution of each action" },
                  { pt: "Relatórios — extração analítica para prestação de contas", en: "Reports — analytical extraction for accountability" },
                  { pt: "Administração — perfis de acesso e permissões dos usuários da secretaria", en: "Administration — access profiles and permissions for Secretariat users" },
                ].map((item) => (
                  <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>

            <DesktopShot
              src="/images/sda-id-estudo-caso-2.png"
              alt="Grade de consulta de beneficiários no módulo Cadastro"
              caption={{ pt: "Módulo Cadastro: consulta de beneficiários com busca, ordenação e colunas configuráveis", en: "Registration module: beneficiary lookup with search, sorting and configurable columns" }}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
            <DesktopShot
              src="/images/sda-id-estudo-caso-3.png"
              alt="Consulta de demandas no módulo Movimentação, com 18.403 registros"
              caption={{ pt: "Módulo Movimentação: consulta de demandas — 18.403 registros no histórico do sistema", en: "Movement module: demand lookup — 18,403 records in the system's history" }}
            />
            <div>
              <p>
                {t({
                  pt: "A grade de \"Minhas Demandas\", no módulo Movimentação, dá a real dimensão do volume de dados do IDA: mais de 18 mil demandas registradas desde 2015, cada uma com número, ano, município, indicador e unidade associados, filtráveis e pesquisáveis em tempo real.",
                  en: "The \"My Demands\" grid, in the Movement module, gives a sense of IDA's real data volume: over 18,000 demands recorded since 2015, each with a number, year, municipality, indicator and unit, filterable and searchable in real time.",
                })}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p>
              {t({
                pt: "Cada demanda dessas nasce de um formulário estruturado de acompanhamento de ações, com dados do responsável (CPF/CNPJ), do solicitado e do projeto vinculado, e uma seção de dados gerais que exige geolocalização completa — UF, município, distrito, bairro/localidade, latitude, longitude e imagem — além da classificação por tipo de indicador, indicador específico, unidade de medida e público-alvo. É esse nível de granularidade na entrada de dados que sustenta os cruzamentos e agregações exibidos depois no Power BI.",
                en: "Each of these demands starts from a structured action-tracking form, with data about the responsible party (CPF/CNPJ), the request and its linked project, plus a general data section that requires full geolocation — state, municipality, district, neighborhood/locality, latitude, longitude and an image — along with classification by indicator type, specific indicator, unit of measure and target audience. It's this level of granularity at data entry that backs the cross-references and aggregations later shown in Power BI.",
              })}
            </p>
            <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-6">
              <DesktopShot
                src="/images/sda-id-estudo-caso-4.png"
                alt="Formulário de acompanhamento de ações, com dados do responsável, geolocalização e classificação do indicador"
                caption={{ pt: "Módulo Movimentação: formulário de acompanhamento de ações, com geolocalização e classificação do indicador", en: "Movement module: action-tracking form, with geolocation and indicator classification" }}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: { pt: "Painel de Business Intelligence com Power BI", en: "Business Intelligence Dashboard with Power BI" },
      children: (
        <>
          <p>
            {t({
              pt: "Todo o sistema — cadastro, movimentação, relatórios e administração — foi desenvolvido do zero em Laravel, com PostgreSQL como fonte de verdade dos dados. O Power BI entra em um ponto específico e deliberado do fluxo: depois que os dados são tratados e analisados via consultas SQL sobre o banco, um relatório Power BI é publicado e embutido diretamente na home do sistema, funcionando como a camada de visualização executiva sobre os dados já processados pela aplicação.",
              en: "The entire system — registration, movement, reports and administration — was built from scratch in Laravel, with PostgreSQL as the source of truth. Power BI comes in at one specific, deliberate point in the flow: once the data is treated and analyzed through SQL queries against the database, a Power BI report is published and embedded directly on the system's home screen, acting as the executive visualization layer on top of data already processed by the application.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Mapa interativo", en: "Interactive map" },
                desc: { pt: "Visão coroplética dos 184 municípios do Ceará, com filtro e destaque por região.", en: "Choropleth view of Ceará's 184 municipalities, with filtering and per-region highlighting." },
              },
              {
                title: { pt: "Gráficos analíticos", en: "Analytical charts" },
                desc: { pt: "Quantidade por município, por tipo de indicador e por ano, em uma mesma tela.", en: "Quantity by municipality, by indicator type and by year, on a single screen." },
              },
              {
                title: { pt: "Cartões de totais", en: "Total cards" },
                desc: { pt: "Indicadores agregados em destaque no topo do painel para leitura imediata.", en: "Aggregate indicators highlighted at the top of the dashboard for immediate reading." },
              },
            ].map((card) => (
              <div key={card.title.pt} className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5">
                <h4 className="text-sm font-semibold text-white">{t(card.title)}</h4>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{t(card.desc)}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p>
              {t({
                pt: "Além da visão consolidada na home, o próprio relatório Power BI abre uma série histórica completa: cada indicador tem sua própria evolução ano a ano, de 2015 a 2023, permitindo comparar tendências entre programas e identificar quedas ou picos de execução ao longo do tempo sem sair do sistema.",
                en: "Beyond the consolidated home view, the Power BI report itself opens a full historical series: each indicator has its own year-by-year evolution, from 2015 to 2023, making it possible to compare trends between programs and spot drops or spikes in execution over time without leaving the system.",
              })}
            </p>
            <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-6">
              <DesktopShot
                src="/images/sda-id-estudo-caso-1.png"
                alt="Série histórica de indicadores por ano, de 2015 a 2023, no relatório Power BI"
                caption={{ pt: "Relatório Power BI embutido na home: comparativo de indicadores por ano (2015–2023), lado a lado", en: "Power BI report embedded on the home screen: side-by-side indicator comparison by year (2015–2023)" }}
              />
            </div>
          </div>

          <p className="mt-6 text-xs text-zinc-500 italic">
            {t({
              pt: "Alguns valores exibidos nas imagens deste estudo de caso foram ocultados por confidencialidade dos dados da secretaria.",
              en: "Some figures shown in this case study's images were hidden due to the confidentiality of the Secretariat's data.",
            })}
          </p>
        </>
      ),
    },
    {
      title: { pt: "Arquitetura e Stack", en: "Architecture and Stack" },
      children: (
        <>
          <p>
            {t({
              pt: "O backend foi construído em PHP com Laravel, responsável pelas regras de negócio de cadastro, movimentação e agregação dos indicadores, com PostgreSQL como banco de dados e consultas SQL diretas para o tratamento e a análise que alimentam o Power BI. A aplicação roda containerizada com Docker, o que padroniza o ambiente entre desenvolvimento e produção e simplifica o deploy de novas versões.",
              en: "The backend was built in PHP with Laravel, handling the business rules for registering, tracking and aggregating indicators, with PostgreSQL as the database and direct SQL queries for the treatment and analysis that feed Power BI. The application runs containerized with Docker, standardizing the environment between development and production and simplifying deployment of new versions.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Domínio em Laravel", en: "Domain in Laravel" },
                desc: { pt: "As regras de cadastro, movimentação e agregação de demandas e ações vivem no backend Laravel, isoladas da camada de visualização.", en: "The rules for registering, tracking and aggregating demands and actions live in the Laravel backend, isolated from the visualization layer." },
              },
              {
                title: { pt: "Transacional × analítico", en: "Transactional vs analytical" },
                desc: { pt: "As consultas SQL de tratamento e agregação são separadas das regras transacionais, para que a análise não pese na operação diária.", en: "The SQL treatment and aggregation queries are separated from transactional rules, so analysis doesn't weigh on daily operation." },
              },
              {
                title: { pt: "Power BI como visualização", en: "Power BI as visualization" },
                desc: { pt: "O Power BI consome os dados já tratados e entrega os dashboards executivos — a camada de apresentação não recalcula regra de negócio.", en: "Power BI consumes the already-treated data and delivers the executive dashboards — the presentation layer doesn't recompute business rules." },
              },
              {
                title: { pt: "Indicadores em tempo real", en: "Real-time indicators" },
                desc: { pt: "Cada movimentação de uma demanda reflete no indicador correspondente, dando à secretaria acompanhamento sem espera por consolidação manual.", en: "Every update to a demand reflects in the corresponding indicator, giving the Secretariat tracking without waiting for manual consolidation." },
              },
              {
                title: { pt: "Modelo relacional consistente", en: "Consistent relational model" },
                desc: { pt: "PostgreSQL modela demandas, ações estratégicas e movimentações com integridade referencial, base confiável para a agregação.", en: "PostgreSQL models demands, strategic actions and movements with referential integrity, a reliable base for aggregation." },
              },
              {
                title: { pt: "Ambientes padronizados", en: "Standardized environments" },
                desc: { pt: "Docker isolando dev e produção, versionado via Git — o mesmo padrão de infraestrutura dos demais sistemas da SDA.", en: "Docker isolating dev and production, version-controlled via Git — the same infrastructure pattern as SDA's other systems." },
              },
            ].map((card) => (
              <div key={card.title.pt} className="group rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5 hover:border-violet-500/25 hover:bg-violet-500/[0.03] transition-all duration-300">
                <h4 className="text-sm font-semibold text-white">{t(card.title)}</h4>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{t(card.desc)}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 overflow-x-auto">
            <ArchitectureDiagram lang={lang} />
            <p className="mt-4 text-center text-xs text-zinc-500">
              {t({
                pt: "Arquitetura em alto nível: backend Laravel sobre PostgreSQL, com uma camada analítica em SQL que trata e agrega os dados e alimenta os painéis do Power BI, tudo containerizado.",
                en: "High-level architecture: a Laravel backend over PostgreSQL, with a SQL analytics layer that treats and aggregates the data and feeds the Power BI dashboards, all containerized.",
              })}
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-violet-500/[0.06] border border-violet-500/20 p-6">
            <p className="text-sm text-violet-100 leading-relaxed">
              {lang === "pt" ? (
                <>
                  A separação entre <span className="font-semibold text-violet-50">operação transacional</span> e{" "}
                  <span className="font-semibold text-violet-50">camada analítica</span> é o que permite ao painel
                  responder em tempo real sem travar o cadastro: as regras ficam no Laravel, a agregação pesada vai para
                  o SQL e o Power BI só apresenta — uma decisão que sustenta a redução de{" "}
                  <span className="font-semibold text-violet-50">25% no tempo de resposta a demandas</span>.
                </>
              ) : (
                <>
                  The split between <span className="font-semibold text-violet-50">transactional operation</span> and{" "}
                  <span className="font-semibold text-violet-50">analytical layer</span> is what lets the dashboard
                  respond in real time without stalling data entry: rules stay in Laravel, heavy aggregation goes to
                  SQL and Power BI only presents — a decision that underpins the{" "}
                  <span className="font-semibold text-violet-50">25% reduction in demand response time</span>.
                </>
              )}
            </p>
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
              pt: "O IDA hoje cobre os 184 municípios do Ceará e sustenta um histórico de 18.403 demandas registradas desde 2015, monitorando mais de 100 novas demandas por mês com 99,5% de uptime. A centralização dos indicadores em um único painel reduziu em cerca de 25% o tempo de resposta a demandas, ao substituir o cruzamento manual de planilhas por consultas diretas no sistema.",
              en: "IDA now covers all 184 municipalities of Ceará and sustains a history of 18,403 demands recorded since 2015, tracking over 100 new demands per month with 99.5% uptime. Centralizing indicators into a single dashboard cut demand response time by around 25%, replacing manual spreadsheet cross-referencing with direct queries in the system.",
            })}
          </p>

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "Poucos sistemas dão a um desenvolvedor a chance de trabalhar com dados públicos que cobrem um estado inteiro. Construir o IDA enquanto eu estava na Secretaria do Desenvolvimento Agrário do Ceará significou lidar com uma base de dados genuinamente valiosa para a gestão pública — geolocalizada, histórica e abrangendo os 184 municípios cearenses.",
                en: "Few systems give a developer the chance to work with public data covering an entire state. Building IDA while I was at the State Agrarian Development Secretariat of Ceará meant working with a dataset that's genuinely valuable for public administration — geolocated, historical, and spanning all 184 municipalities of Ceará.",
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

export default function SdaIndicadoresCasePage() {
  const { lang } = useLanguage();
  const sectionsData = useSectionsData(lang);

  return (
    <div className="min-h-screen font-sans relative isolate">
      <div className="relative z-10">
        <StandardSiteHeader />

        {/* ── HERO ── */}
        <CaseHero {...heroData} />

        {/* ── FOTO DE DESTAQUE ── */}
        <ShowcaseHero />

        {/* ── CONTEÚDO ── */}
        <CaseContent
          summary={summaryData}
          intro={{
            pt: "O IDA é o painel de Business Intelligence que a Secretaria do Desenvolvimento Agrário do Ceará usa para cadastrar, cruzar e visualizar indicadores de demandas e ações estratégicas nos 184 municípios do estado, substituindo planilhas dispersas por uma leitura única e em tempo real.",
            en: "IDA is the Business Intelligence dashboard the State Agrarian Development Secretariat of Ceará uses to register, cross-reference and visualize demand and strategic action indicators across the state's 184 municipalities, replacing scattered spreadsheets with a single, real-time view.",
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
