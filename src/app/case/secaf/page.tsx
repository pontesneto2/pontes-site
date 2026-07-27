"use client";

import ClickableImage from "@/components/case/ClickableImage";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseCTA from "@/components/case/CaseCTA";
import StandardSiteHeader from "@/components/StandardSiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO — SECAF (SDA Ceará)
   ═══════════════════════════════════════════ */

const heroData = {
  title: {
    pt: "SECAF: Cadastro e Cotações da Agricultura Familiar do Ceará",
    en: "SECAF: Registry and Quotations for Family Farming in Ceará",
  },
  subtitle: {
    pt: "Sistema Estadual de Cadastro de Agricultores Familiares, Empreendedores e Cooperativas",
    en: "State Registry System for Family Farmers, Entrepreneurs and Cooperatives",
  },
  description: {
    pt: "Sistema desenvolvido para a Secretaria do Desenvolvimento Agrário do Ceará (SDA) para cadastrar agricultores familiares, empreendedores individuais e cooperativas, e para operar o fluxo de editais, cotações e propostas que sustenta a Política Estadual de Aquisição de Alimentos da Agricultura Familiar — com mais de 20 mil produtores cadastrados.",
    en: "System built for the State Agrarian Development Secretariat of Ceará (SDA) to register family farmers, individual entrepreneurs and cooperatives, and to run the notice, quotation and proposal flow behind the State Family Farming Food Acquisition Policy — with over 20,000 registered producers.",
  },
  tags: ["Git", "Docker", ".NET", "C#", "PHP", "Angular"],
};

const summaryData: Array<{ label: Bilingual; value: Bilingual }> = [
  { label: { pt: "Tipo de projeto", en: "Project type" }, value: { pt: "Sistema Web + Admin", en: "Web + Admin System" } },
  { label: { pt: "Papel exercido", en: "Role" }, value: { pt: "Analista de Sistemas / Full-Stack", en: "Systems Analyst / Full-Stack" } },
  { label: { pt: "Idealizador", en: "Idealized by" }, value: { pt: "Governo do Ceará (SDA)", en: "Government of Ceará (SDA)" } },
  { label: { pt: "Status", en: "Status" }, value: { pt: "Em produção", en: "In production" } },
  { label: { pt: "Duração", en: "Duration" }, value: { pt: "14 meses de produção", en: "14 months in production" } },
  { label: { pt: "Cobertura", en: "Coverage" }, value: { pt: "20.000+ produtores cadastrados", en: "20,000+ registered producers" } },
];

const challengesData = {
  title: { pt: "Principais Desafios Enfrentados", en: "Key Challenges Faced" },
  intro: {
    pt: "O SECAF precisava sustentar, no mesmo sistema, o cadastro formal de milhares de produtores e cooperativas e o fluxo operacional de cotações que decide, na prática, quem fornece alimentos para os programas do estado.",
    en: "SECAF had to support, in the same system, the formal registration of thousands of producers and cooperatives, and the operational quotation flow that, in practice, decides who supplies food for the state's programs.",
  },
  items: [
    {
      pt: "Modelar um cadastro único para agricultores individuais, empreendedores e cooperativas, cada perfil com regras de validação e documentação próprias",
      en: "Modeling a single registry for individual farmers, entrepreneurs and cooperatives, each profile with its own validation and documentation rules",
    },
    {
      pt: "Estruturar o fluxo edital → abertura de cotação → proposta individual/coletiva mantendo consistência de status e valores por cooperativa",
      en: "Structuring the notice → quotation opening → individual/collective proposal flow while keeping status and amounts consistent per cooperative",
    },
    {
      pt: "Garantir que o cadastro de produtores alimentasse o módulo Ceará Sem Fome sem duplicar dados ou abrir brechas de inconsistência",
      en: "Ensuring the producer registry fed the Ceará Sem Fome module without duplicating data or opening room for inconsistency",
    },
  ] as Bilingual[],
};

const kpisData: Array<{ text: Bilingual }> = [
  { text: { pt: "20.000+ produtores cadastrados no sistema", en: "20,000+ producers registered in the system" } },
  { text: { pt: "99,6% de uptime em produção", en: "99.6% uptime in production" } },
  { text: { pt: "14 meses de operação contínua em produção", en: "14 months of continuous production operation" } },
  { text: { pt: "Fluxo completo de cotação: edital, abertura, proposta individual e coletiva", en: "Full quotation flow: notice, opening, individual and collective proposal" } },
  { text: { pt: "Integração direta com o programa Ceará Sem Fome", en: "Direct integration with the Ceará Sem Fome program" } },
  { text: { pt: "Ambiente containerizado com Docker, versionado via Git", en: "Containerized environment with Docker, version-controlled via Git" } },
];

const stackData = [".NET", "C#", "PHP", "Angular", "Docker", "Git"];

/* ═══════════════════════════════════════════
   DIAGRAMA DE ARQUITETURA (SVG inline, bilíngue)
   ═══════════════════════════════════════════ */

function ArchitectureDiagram({ lang }: { lang: "pt" | "en" }) {
  const t = (v: Bilingual) => tr(lang, v);
  return (
    <svg viewBox="0 0 820 480" className="w-full h-auto" role="img" aria-label="Diagrama da arquitetura do SECAF">
      <defs>
        <marker id="secaf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#8b5cf6" />
        </marker>
        <marker id="secaf-arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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
      <line x1="410" y1="52" x2="410" y2="72" stroke="#71717a" strokeWidth="1.4" strokeDasharray="3 3" markerEnd="url(#secaf-arrow-dim)" />

      {/* Fronteira do container Docker */}
      <rect x="200" y="74" width="604" height="330" rx="16" fill="none" stroke="rgba(139,92,246,0.35)" strokeDasharray="5 5" />
      <text x="216" y="68" fontSize="9.5" fill="#a78bfa" letterSpacing="0.08em">AMBIENTE CONTAINERIZADO · DOCKER</text>

      {/* Cliente */}
      <rect x="8" y="180" width="152" height="64" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="84" y="205" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Navegador", en: "Browser" })}
      </text>
      <text x="84" y="221" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Equipes SDA (Codece)", en: "SDA teams (Codece)" })}
      </text>
      <text x="84" y="233" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "+ cooperativas", en: "+ cooperatives" })}
      </text>
      <text x="187" y="203" textAnchor="middle" fontSize="8" fill="#a1a1aa">HTTPS/TLS</text>
      <line x1="160" y1="212" x2="214" y2="212" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#secaf-arrow)" />

      {/* Camada web */}
      <rect x="216" y="168" width="182" height="104" rx="10" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.4)" />
      <text x="307" y="187" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Painéis · PHP + Angular", en: "Panels · PHP + Angular" })}
      </text>
      <rect x="228" y="196" width="158" height="30" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
      <text x="307" y="215" textAnchor="middle" fontSize="9" fill="#d4d4d8">
        {t({ pt: "Editais · Cotações", en: "Notices · Quotations" })}
      </text>
      <rect x="228" y="232" width="158" height="30" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
      <text x="307" y="251" textAnchor="middle" fontSize="9" fill="#d4d4d8">
        {t({ pt: "Propostas ind./coletiva", en: "Individual/collective proposals" })}
      </text>
      <line x1="398" y1="210" x2="430" y2="210" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#secaf-arrow)" />

      {/* Núcleo de regras */}
      <rect x="430" y="178" width="176" height="86" rx="10" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.45)" />
      <text x="518" y="199" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">.NET / C#</text>
      <text x="518" y="215" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Cadastro validado", en: "Validated registry" })}
      </text>
      <text x="518" y="229" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "agricultor · cooperativa", en: "farmer · cooperative" })}
      </text>
      <text x="518" y="250" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "elegibilidade por CNPJ/CPF", en: "eligibility by CNPJ/CPF" })}
      </text>

      {/* Integrações / consumidores */}
      <rect x="634" y="150" width="158" height="44" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="713" y="170" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">Ceará Sem Fome</text>
      <text x="713" y="184" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "consome o cadastro", en: "consumes the registry" })}
      </text>
      <rect x="634" y="206" width="158" height="44" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="713" y="226" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Compra Institucional", en: "Institutional Purchase" })}
      </text>
      <text x="713" y="240" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "mín. 30% p/ agric. familiar", en: "min. 30% for family farming" })}
      </text>
      <line x1="606" y1="200" x2="634" y2="174" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#secaf-arrow-dim)" />
      <line x1="606" y1="230" x2="634" y2="228" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#secaf-arrow-dim)" />

      {/* Banco de dados */}
      <rect x="336" y="320" width="248" height="68" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="460" y="343" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">PostgreSQL</text>
      <text x="460" y="359" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "cadastros · cotações · propostas", en: "registries · quotations · proposals" })}
      </text>
      <text x="460" y="373" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "status e valores por entidade", en: "status and amounts per entity" })}
      </text>
      <line x1="300" y1="272" x2="372" y2="320" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#secaf-arrow)" />
      <line x1="518" y1="264" x2="500" y2="320" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#secaf-arrow)" />

      {/* Fluxo de dados — pills */}
      <text x="24" y="422" fontSize="8.5" fill="#71717a" letterSpacing="0.08em">
        {t({ pt: "FLUXO DE DADOS — DO CADASTRO À PROPOSTA VENCEDORA", en: "DATA FLOW — FROM REGISTRATION TO WINNING PROPOSAL" })}
      </text>
      {[
        { x: 24, w: 158, label: t({ pt: "Cadastro validado", en: "Validated registry" }) },
        { x: 214, w: 150, label: t({ pt: "Edital / cotação", en: "Notice / quotation" }) },
        { x: 396, w: 186, label: t({ pt: "Proposta (ind./coletiva)", en: "Proposal (ind./collective)" }) },
        { x: 614, w: 182, label: t({ pt: "Julgamento → fornecimento", en: "Judging → supply" }) },
      ].map((p, i) => (
        <g key={p.label}>
          <rect x={p.x} y="430" width={p.w} height="36" rx="18" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.3)" />
          <text x={p.x + p.w / 2} y="452" textAnchor="middle" fontSize="9" fill="#d4d4d8">{p.label}</text>
          {i < 3 ? (
            <line x1={p.x + p.w} y1="448" x2={p.x + p.w + 28} y2="448" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#secaf-arrow)" />
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
          src="/images/capa-secaff.png"
          alt="Sistema SECAF — Secretaria do Desenvolvimento Agrário do Ceará"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[11px] font-medium text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            {t({ pt: "SECAF · sistema de cadastro", en: "SECAF · registry system" })}
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
      title: { pt: "Contexto e Propósito", en: "Context and Purpose" },
      children: (
        <>
          <p>
            {t({
              pt: "O SECAF (Sistema Estadual de Cadastro de Agricultores Familiares, Empreendedores Individuais e Empreendimentos Representativos) é o cadastro oficial que a Secretaria do Desenvolvimento Agrário do Ceará (SDA) usa, via Coordenadoria de Desenvolvimento Territorial, Cooperativismo, Comercialização e Economia Solidária (Codece), para formalizar a origem dos produtos da agricultura familiar cearense. É o instrumento de base da Política Estadual de Aquisição de Alimentos da Agricultura Familiar, regida pela Lei nº 15.910/2015, e o cadastro que alimenta programas de compra institucional de alimentos, como o Ceará Sem Fome.",
              en: "SECAF (State Registry System for Family Farmers, Individual Entrepreneurs and Representative Enterprises) is the official registry the State Agrarian Development Secretariat of Ceará (SDA) uses, through the Territorial Development, Cooperativism, Commercialization and Solidarity Economy Coordination (Codece), to formalize the origin of Ceará's family-farming products. It's the base instrument of the State Family Farming Food Acquisition Policy, governed by State Law 15,910/2015, and the registry that feeds institutional food-purchase programs such as Ceará Sem Fome.",
            })}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start mt-6">
            <div className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                {t({ pt: "Módulos do sistema", en: "System modules" })}
              </h4>
              <ul className="space-y-2">
                {[
                  { pt: "Cadastros — agricultores individuais, empreendedores e cooperativas/associações", en: "Registrations — individual farmers, entrepreneurs and cooperatives/associations" },
                  { pt: "Projeto de Venda — vínculo do produtor com editais e cotações abertas", en: "Sales Project — linking the producer to open notices and quotations" },
                  { pt: "Ceará Sem Fome — módulo de compra institucional de alimentos", en: "Ceará Sem Fome — institutional food-purchase module" },
                  { pt: "Central das Cooperativas — visão consolidada por entidade e unidade gerenciadora", en: "Cooperative Hub — consolidated view by entity and managing unit" },
                  { pt: "Relatórios e Mensagens — acompanhamento e comunicação com produtores e cooperativas", en: "Reports and Messages — tracking and communication with producers and cooperatives" },
                ].map((item) => (
                  <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>

            <DesktopShot
              src="/images/secaf-estudo-caso-listagem.png"
              alt="Grade de Abertura de Cotação no SECAF, com listagem, colunas e ações configuráveis"
              caption={{ pt: "Módulo de Cotações: listagem de cotações abertas, com busca, colunas e exportação", en: "Quotations module: open quotations listing, with search, columns and export" }}
            />
          </div>
        </>
      ),
    },
    {
      title: { pt: "Fluxo de Cotação e Propostas", en: "Quotation and Proposal Flow" },
      children: (
        <>
          <p>
            {t({
              pt: "O núcleo operacional do SECAF é o fluxo que liga uma demanda de compra a uma entrega real de alimentos. Um edital abre uma cotação vinculada a uma unidade demandante, com cronograma de entrega definido. A partir daí, produtores e cooperativas cadastrados respondem com uma Proposta Individual ou uma Proposta Coletiva — esta última agrupando os lances de várias entidades sob a mesma cotação e unidade gerenciadora, cada uma com CNPJ, valor proposto e situação (Enviado, Em Aberto, Reprovado) rastreados individualmente.",
              en: "SECAF's operational core is the flow that connects a purchase demand to an actual food delivery. A notice opens a quotation linked to a demanding unit, with a defined delivery schedule. From there, registered producers and cooperatives respond with an Individual Proposal or a Collective Proposal — the latter grouping bids from several entities under the same quotation and managing unit, each with a CNPJ, proposed amount and status (Sent, Open, Rejected) tracked individually.",
            })}
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
            <DesktopShot
              src="/images/secaf-estudo-caso-cotacao.png"
              alt="Detalhe de uma cotação individual no módulo Abertura de Cotação do SECAF"
              caption={{ pt: "Abertura de Cotação: unidade demandante, prazos e cronograma de entrega de uma cotação", en: "Quotation Opening: demanding unit, deadlines and delivery schedule for a quotation" }}
            />
            <div>
              <p>
                {t({
                  pt: "Cada cotação carrega os dados que definem a janela de fornecimento — unidade demandante, data inicial e final, cronograma de entrega e município — e é a partir dela que o restante do fluxo se organiza, incluindo o histórico de propostas recebidas e a situação de cada uma.",
                  en: "Each quotation carries the data that defines the supply window — demanding unit, start and end dates, delivery schedule and municipality — and it's from there that the rest of the flow is organized, including the history of proposals received and each one's status.",
                })}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p>
              {t({
                pt: "Na Proposta Coletiva, o sistema agrupa as propostas por cotação e por unidade gerenciadora — normalmente uma associação ou instituto que representa um conjunto de cooperativas — deixando visível, lado a lado, o valor proposto e a situação de cada entidade participante. É esse agrupamento que dá à secretaria a visão gerencial de quantas cooperativas estão disputando cada cotação e em que estágio cada proposta está.",
                en: "In the Collective Proposal, the system groups proposals by quotation and by managing unit — usually an association or institute representing a group of cooperatives — showing, side by side, the proposed amount and status of each participating entity. This grouping is what gives the Secretariat the management view of how many cooperatives are competing for each quotation and what stage each proposal is at.",
              })}
            </p>
            <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-6">
              <DesktopShot
                src="/images/secaf-estudo-caso-propostas.png"
                alt="Grade de Proposta Coletiva agrupada por cotação e unidade gerenciadora, com valor e situação de cada entidade"
                caption={{ pt: "Proposta Coletiva: propostas agrupadas por cotação e unidade gerenciadora, com valor e situação por entidade", en: "Collective Proposal: proposals grouped by quotation and managing unit, with amount and status per entity" }}
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
              pt: "O SECAF combina duas frentes: um núcleo em .NET/C# responsável pelo cadastro de produtores e cooperativas e pelas regras de negócio de validação (documentação, CNPJ/CPF, elegibilidade por perfil), e um conjunto de painéis operacionais em PHP e Angular para o fluxo de editais, cotações e propostas usado no dia a dia pelas equipes da secretaria e pelas cooperativas. A aplicação roda containerizada com Docker e é versionada via Git, seguindo o mesmo padrão de infraestrutura usado nos demais sistemas da SDA.",
              en: "SECAF combines two fronts: a .NET/C# core handling producer and cooperative registration along with validation business rules (documentation, CNPJ/CPF, per-profile eligibility), and a set of operational panels in PHP and Angular for the notice, quotation and proposal flow used day-to-day by the Secretariat's teams and by the cooperatives. The application runs containerized with Docker and is version-controlled via Git, following the same infrastructure pattern used across SDA's other systems.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Núcleo de regras isolado", en: "Isolated rules core" },
                desc: { pt: "O cadastro e a validação vivem no núcleo .NET/C#, separados dos painéis PHP de operação — a regra de elegibilidade é a mesma para qualquer tela.", en: "Registration and validation live in the .NET/C# core, separate from the PHP operational panels — the eligibility rule is the same across every screen." },
              },
              {
                title: { pt: "Cadastro validado por perfil", en: "Registry validated per profile" },
                desc: { pt: "Documentação e elegibilidade distintas para agricultor individual, empreendedor e cooperativa, cada uma com suas exigências de CNPJ/CPF.", en: "Distinct documentation and eligibility for individual farmer, entrepreneur and cooperative, each with its own CNPJ/CPF requirements." },
              },
              {
                title: { pt: "Fluxo edital → cotação → proposta", en: "Notice → quotation → proposal flow" },
                desc: { pt: "Uma máquina de estados mantém a consistência entre edital, abertura de cotação e proposta, sem valores órfãos entre as etapas.", en: "A state machine keeps notice, quotation opening and proposal consistent, with no orphan amounts between steps." },
              },
              {
                title: { pt: "Integridade de propostas", en: "Proposal integrity" },
                desc: { pt: "Valor e situação de cada proposta rastreados por entidade (CNPJ), evitando divergência entre a cotação e o que cada cooperativa propôs.", en: "Amount and status of each proposal tracked per entity (CNPJ), avoiding divergence between the quotation and what each cooperative proposed." },
              },
              {
                title: { pt: "Cadastro como fonte única", en: "Registry as single source" },
                desc: { pt: "O mesmo cadastro alimenta o módulo Ceará Sem Fome e a Compra Institucional, sem duplicar produtores nem abrir brecha de inconsistência.", en: "The same registry feeds the Ceará Sem Fome module and Institutional Purchase, without duplicating producers or opening room for inconsistency." },
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
                pt: "Arquitetura em alto nível: painéis PHP de editais/cotações/propostas sobre um núcleo de cadastro .NET/C#, com o cadastro alimentando a Compra Institucional e o Ceará Sem Fome, tudo containerizado.",
                en: "High-level architecture: PHP notice/quotation/proposal panels over a .NET/C# registry core, with the registry feeding Institutional Purchase and Ceará Sem Fome, all containerized.",
              })}
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-violet-500/[0.06] border border-violet-500/20 p-6">
            <p className="text-sm text-violet-100 leading-relaxed">
              {lang === "pt" ? (
                <>
                  O SECAF é a base da <span className="font-semibold text-violet-50">Política Estadual de Aquisição de
                  Alimentos da Agricultura Familiar</span> (Lei nº 15.910/2015), que obriga ao menos{" "}
                  <span className="font-semibold text-violet-50">30% das compras públicas de alimentos</span> a virem da
                  agricultura familiar. Cada cadastro e cada proposta no sistema decide, na prática, quem fornece
                  alimento ao estado — por isso a validação de origem e a integridade das propostas foram tratadas com
                  rigor de processo de compra pública.
                </>
              ) : (
                <>
                  SECAF is the backbone of the <span className="font-semibold text-violet-50">State Family Farming Food
                  Acquisition Policy</span> (Law 15,910/2015), which requires at least{" "}
                  <span className="font-semibold text-violet-50">30% of public food purchases</span> to come from family
                  farming. Every registration and proposal in the system decides, in practice, who supplies food to the
                  state — which is why origin validation and proposal integrity were handled with the rigor of a public
                  procurement process.
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
              pt: "O SECAF hoje sustenta mais de 20 mil produtores cadastrados e o fluxo de cotações que decide, na prática, quais cooperativas fornecem alimentos para os programas da secretaria, com 99,6% de uptime em 14 meses de produção. É o cadastro que garante a rastreabilidade de origem exigida pela Política Estadual de Aquisição de Alimentos da Agricultura Familiar, do primeiro cadastro do produtor até a proposta vencedora de uma cotação.",
              en: "SECAF today sustains over 20,000 registered producers and the quotation flow that decides, in practice, which cooperatives supply food for the Secretariat's programs, with 99.6% uptime across 14 months in production. It's the registry that guarantees the origin traceability required by the State Family Farming Food Acquisition Policy, from a producer's first registration through to a quotation's winning proposal.",
            })}
          </p>

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "O SECAF me colocou em contato direto com a ponta final de uma política pública: cada cadastro e cada proposta no sistema representa um produtor ou uma cooperativa tentando vender sua produção para o estado. Manter esse fluxo — do cadastro validado até a abertura e o julgamento de cada cotação — estável e confiável para 20 mil produtores foi um dos trabalhos que mais exigiu rigor de mim como desenvolvedor sênior, entre cadastro, regras de negócio e a operação diária das equipes da secretaria.",
                en: "SECAF put me in direct contact with the last mile of a public policy: every registration and every proposal in the system represents a producer or cooperative trying to sell their production to the state. Keeping that flow — from validated registration through to the opening and judgment of each quotation — stable and reliable for 20,000 producers was one of the projects that most demanded rigor from me as a senior developer, across registration, business rules and the Secretariat teams' daily operation.",
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

export default function SecafCasePage() {
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
            pt: "O SECAF é o cadastro estadual que formaliza produtores, empreendedores e cooperativas da agricultura familiar do Ceará e opera o fluxo de editais, cotações e propostas que sustenta a Política Estadual de Aquisição de Alimentos da Agricultura Familiar, com mais de 20 mil produtores cadastrados.",
            en: "SECAF is the state registry that formalizes producers, entrepreneurs and cooperatives in Ceará's family farming sector and runs the notice, quotation and proposal flow behind the State Family Farming Food Acquisition Policy, with over 20,000 registered producers.",
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
