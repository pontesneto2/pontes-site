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
