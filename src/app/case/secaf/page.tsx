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
  tags: ["Git", "Docker", ".NET", "C#", "PHP"],
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

const stackData = [".NET", "C#", "PHP", "Docker", "Git"];

/* ═══════════════════════════════════════════
   FOTO REAL DO PRODUTO (moldura)
   ═══════════════════════════════════════════ */

function ShowcaseHero() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 sm:px-8 -mt-4 mb-16">
      <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(88,28,155,0.45)]">
        <ClickableImage
          src="/images/capa-secaff.png"
          alt="Sistema SECAF — Secretaria do Desenvolvimento Agrário do Ceará"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
              pt: "O SECAF combina duas frentes: um núcleo em .NET/C# responsável pelo cadastro de produtores e cooperativas e pelas regras de negócio de validação (documentação, CNPJ/CPF, elegibilidade por perfil), e um conjunto de painéis operacionais em PHP para o fluxo de editais, cotações e propostas usado no dia a dia pelas equipes da secretaria e pelas cooperativas. A aplicação roda containerizada com Docker e é versionada via Git, seguindo o mesmo padrão de infraestrutura usado nos demais sistemas da SDA.",
              en: "SECAF combines two fronts: a .NET/C# core handling producer and cooperative registration along with validation business rules (documentation, CNPJ/CPF, per-profile eligibility), and a set of operational panels in PHP for the notice, quotation and proposal flow used day-to-day by the Secretariat's teams and by the cooperatives. The application runs containerized with Docker and is version-controlled via Git, following the same infrastructure pattern used across SDA's other systems.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Cadastro validado", en: "Validated registry" },
                desc: { pt: "Regras de documentação e elegibilidade distintas por perfil: agricultor individual, empreendedor e cooperativa.", en: "Distinct documentation and eligibility rules per profile: individual farmer, entrepreneur and cooperative." },
              },
              {
                title: { pt: "Integridade de propostas", en: "Proposal integrity" },
                desc: { pt: "Valor e situação de cada proposta rastreados por entidade, evitando divergência entre cotação e proposta.", en: "Amount and status of each proposal tracked per entity, avoiding divergence between quotation and proposal." },
              },
              {
                title: { pt: "Ambientes padronizados", en: "Standardized environments" },
                desc: { pt: "Docker isolando ambientes de desenvolvimento e produção, com deploy versionado via Git.", en: "Docker isolating development and production environments, with deploys version-controlled via Git." },
              },
            ].map((card) => (
              <div key={card.title.pt} className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5">
                <h4 className="text-sm font-semibold text-white">{t(card.title)}</h4>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{t(card.desc)}</p>
              </div>
            ))}
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
