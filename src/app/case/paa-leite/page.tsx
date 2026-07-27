"use client";

import ClickableImage from "@/components/case/ClickableImage";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseCTA from "@/components/case/CaseCTA";
import StandardSiteHeader from "@/components/StandardSiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO — PAA-Leite (SDA Ceará)
   ═══════════════════════════════════════════ */

const heroData = {
  title: {
    pt: "PAA-Leite: Gestão Operacional do Programa do Leite no Ceará",
    en: "PAA-Leite: Operational Management for Ceará's Milk Program",
  },
  subtitle: {
    pt: "Programa de Aquisição de Alimentos — Incentivo à Produção e ao Consumo de Leite",
    en: "Food Acquisition Program — Incentive for Milk Production and Consumption",
  },
  description: {
    pt: "Sistema desenvolvido para a Secretaria do Desenvolvimento Agrário do Ceará (SDA) para operar o PAA-Leite: valida a documentação dos produtores familiares, cadastra os beneficiários, monitora tanques e entregas de leite por laticínio e gera os relatórios que sustentam o pagamento aos produtores e a distribuição gratuita do leite às famílias em situação de vulnerabilidade.",
    en: "System built for the State Agrarian Development Secretariat of Ceará (SDA) to run PAA-Leite: it validates family-farming producers' documentation, registers beneficiaries, monitors dairy tanks and milk deliveries per plant, and generates the reports behind both producer payment and the free milk distribution to vulnerable families.",
  },
  tags: ["Git", ".NET", "C#", "Angular", "PHP", "Docker", "Scriptcase"],
};

const summaryData: Array<{ label: Bilingual; value: Bilingual }> = [
  { label: { pt: "Tipo de projeto", en: "Project type" }, value: { pt: "Sistema Web + Admin", en: "Web + Admin System" } },
  { label: { pt: "Papel exercido", en: "Role" }, value: { pt: "Analista de Sistemas / Full-Stack", en: "Systems Analyst / Full-Stack" } },
  { label: { pt: "Idealizador", en: "Idealized by" }, value: { pt: "Secretaria do Desenvolvimento Agrário do Ceará (SDA)", en: "Ceará State Agrarian Development Secretariat (SDA)" } },
  { label: { pt: "Status", en: "Status" }, value: { pt: "Em produção", en: "In production" } },
  { label: { pt: "Duração", en: "Duration" }, value: { pt: "9 meses de produção", en: "9 months in production" } },
  { label: { pt: "Cobertura", en: "Coverage" }, value: { pt: "5.000+ registros de entrega por quinzena", en: "5,000+ delivery records per cycle" } },
];

const challengesData = {
  title: { pt: "Principais Desafios Enfrentados", en: "Key Challenges Faced" },
  intro: {
    pt: "O PAA-Leite conecta duas pontas de uma política pública no mesmo sistema: a formalização do produtor familiar e a entrega diária de leite que sustenta o pagamento de quem produz e a alimentação de quem recebe.",
    en: "PAA-Leite connects two ends of a public policy in the same system: the family-farming producer's formal registration and the daily milk delivery behind both the producer's payment and the beneficiary's food supply.",
  },
  items: [
    {
      pt: "Validar o produtor a partir da DAP (Declaração de Aptidão ao Pronaf) e dos dados da Adagri antes de liberar seu vínculo com um laticínio, sem duplicar cadastros já existentes nos demais sistemas da SDA",
      en: "Validating the producer against the DAP (Family Farming Aptitude Declaration) and Adagri data before releasing their link to a dairy plant, without duplicating registrations that already exist in SDA's other systems",
    },
    {
      pt: "Rastrear a cadeia produtor → laticínio → tanque → quinzena mantendo a situação de pagamento (Gerado Pagamento, Cancela Quinzena) sempre consistente com o volume efetivamente entregue",
      en: "Tracking the producer → dairy plant → tank → fortnightly-cycle chain while keeping payment status (Payment Generated, Cancel Cycle) always consistent with the volume actually delivered",
    },
    {
      pt: "Manter o cadastro de beneficiários (famílias que recebem o leite) e o de produtores (quem fornece) no mesmo sistema, com regras de documentação e validação distintas para cada perfil",
      en: "Keeping the beneficiary registry (families receiving the milk) and the producer registry (who supplies it) in the same system, each with its own documentation and validation rules",
    },
  ] as Bilingual[],
};

const kpisData: Array<{ text: Bilingual }> = [
  { text: { pt: "9 meses de operação contínua em produção", en: "9 months of continuous production operation" } },
  { text: { pt: "5.000+ registros de entrada de leite rastreados por quinzena", en: "5,000+ milk-delivery records tracked per fortnightly cycle" } },
  { text: { pt: "Validação de produtores integrada à DAP, ao Pronaf e aos dados da Adagri", en: "Producer validation integrated with the DAP, Pronaf and Adagri data" } },
  { text: { pt: "Monitoramento de tanques e estoque por laticínio, com exportação em Excel e PDF", en: "Tank and stock monitoring per dairy plant, with Excel and PDF export" } },
  { text: { pt: "Cadastro dedicado de beneficiários, independente do cadastro de produtores", en: "Dedicated beneficiary registry, independent from the producer registry" } },
  { text: { pt: "Telas de gestão em Scriptcase sobre um núcleo de regras em .NET/C#, containerizado com Docker e versionado via Git", en: "Scriptcase-generated management screens over a .NET/C# rules core, containerized with Docker and version-controlled via Git" } },
];

const stackData = ["Git", ".NET", "C#", "Angular", "PHP", "Docker", "Scriptcase"];

/* ═══════════════════════════════════════════
   DIAGRAMA DE ARQUITETURA (SVG inline, bilíngue)
   ═══════════════════════════════════════════ */

function ArchitectureDiagram({ lang }: { lang: "pt" | "en" }) {
  const t = (v: Bilingual) => tr(lang, v);
  return (
    <svg viewBox="0 0 820 480" className="w-full h-auto" role="img" aria-label="Diagrama da arquitetura do PAA-Leite">
      <defs>
        <marker id="paa-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#8b5cf6" />
        </marker>
        <marker id="paa-arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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
      <line x1="410" y1="52" x2="410" y2="72" stroke="#71717a" strokeWidth="1.4" strokeDasharray="3 3" markerEnd="url(#paa-arrow-dim)" />

      {/* Fronteira do container Docker */}
      <rect x="200" y="74" width="604" height="330" rx="16" fill="none" stroke="rgba(139,92,246,0.35)" strokeDasharray="5 5" />
      <text x="216" y="68" fontSize="9.5" fill="#a78bfa" letterSpacing="0.08em">AMBIENTE CONTAINERIZADO · DOCKER</text>

      {/* Cliente */}
      <rect x="8" y="180" width="152" height="64" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="84" y="205" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Navegador", en: "Browser" })}
      </text>
      <text x="84" y="221" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Equipes SDA +", en: "SDA teams +" })}
      </text>
      <text x="84" y="233" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "laticínios parceiros", en: "partner dairy plants" })}
      </text>
      <text x="187" y="203" textAnchor="middle" fontSize="8" fill="#a1a1aa">HTTPS/TLS</text>
      <line x1="160" y1="212" x2="214" y2="212" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#paa-arrow)" />

      {/* Camada web */}
      <rect x="216" y="168" width="182" height="104" rx="10" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.4)" />
      <text x="307" y="187" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Camada Web", en: "Web Layer" })}
      </text>
      <rect x="228" y="196" width="158" height="30" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
      <text x="307" y="215" textAnchor="middle" fontSize="9" fill="#d4d4d8">
        {t({ pt: "Painéis Scriptcase · PHP", en: "Scriptcase panels · PHP" })}
      </text>
      <rect x="228" y="232" width="158" height="30" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
      <text x="307" y="251" textAnchor="middle" fontSize="9" fill="#d4d4d8">
        {t({ pt: "Fluxos Angular · documentos", en: "Angular flows · documents" })}
      </text>
      <line x1="398" y1="210" x2="430" y2="210" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#paa-arrow)" />

      {/* Núcleo de regras */}
      <rect x="430" y="178" width="176" height="86" rx="10" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.45)" />
      <text x="518" y="199" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">.NET / C#</text>
      <text x="518" y="215" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Núcleo de validação", en: "Validation core" })}
      </text>
      <text x="518" y="229" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "produtor · beneficiário", en: "producer · beneficiary" })}
      </text>
      <text x="518" y="250" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "regras por perfil e por quinzena", en: "rules per profile and per cycle" })}
      </text>

      {/* Fontes externas de validação */}
      <rect x="634" y="150" width="158" height="44" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="713" y="170" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">DAP / Pronaf</text>
      <text x="713" y="184" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "aptidão do produtor", en: "producer eligibility" })}
      </text>
      <rect x="634" y="206" width="158" height="44" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="713" y="226" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">Adagri</text>
      <text x="713" y="240" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "dados sanitários", en: "sanitary data" })}
      </text>
      <line x1="606" y1="200" x2="634" y2="174" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#paa-arrow-dim)" />
      <line x1="606" y1="230" x2="634" y2="228" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#paa-arrow-dim)" />

      {/* Banco de dados */}
      <rect x="336" y="320" width="248" height="68" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="460" y="343" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">PostgreSQL</text>
      <text x="460" y="359" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "cadastros · entregas por quinzena", en: "registries · deliveries per cycle" })}
      </text>
      <text x="460" y="373" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "estoque e pagamentos por laticínio", en: "stock and payments per dairy plant" })}
      </text>
      <line x1="300" y1="272" x2="372" y2="320" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#paa-arrow)" />
      <line x1="518" y1="264" x2="500" y2="320" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#paa-arrow)" />

      {/* Fluxo de dados — pills */}
      <text x="24" y="422" fontSize="8.5" fill="#71717a" letterSpacing="0.08em">
        {t({ pt: "FLUXO DE DADOS — DA ORDENHA AO PAGAMENTO", en: "DATA FLOW — FROM MILKING TO PAYMENT" })}
      </text>
      {[
        { x: 24, w: 160, label: t({ pt: "Produtor validado", en: "Validated producer" }) },
        { x: 216, w: 160, label: t({ pt: "Entrega no tanque", en: "Tank delivery" }) },
        { x: 408, w: 176, label: t({ pt: "Fechamento da quinzena", en: "Cycle closing" }) },
        { x: 616, w: 180, label: t({ pt: "Pagamento + distribuição", en: "Payment + distribution" }) },
      ].map((p, i) => (
        <g key={p.label}>
          <rect x={p.x} y="430" width={p.w} height="36" rx="18" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.3)" />
          <text x={p.x + p.w / 2} y="452" textAnchor="middle" fontSize="9" fill="#d4d4d8">{p.label}</text>
          {i < 3 ? (
            <line x1={p.x + p.w} y1="448" x2={p.x + p.w + 30} y2="448" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#paa-arrow)" />
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
          src="/images/capa-paa-leite.png"
          alt="Sistema PAA-Leite — Secretaria do Desenvolvimento Agrário do Ceará"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[11px] font-medium text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            {t({ pt: "PAA-Leite · tela inicial do sistema", en: "PAA-Leite · system home screen" })}
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
              pt: "O PAA Leite (Programa de Aquisição de Alimentos, modalidade Incentivo à Produção e ao Consumo de Leite) é uma política pública que compra leite de pequenos produtores da agricultura familiar e o distribui gratuitamente para famílias em situação de vulnerabilidade social. No Ceará, a operação do programa é conduzida pela Secretaria do Desenvolvimento Agrário (SDA), que precisa sustentar, no mesmo sistema, as duas pontas da política: quem produz o leite e quem o recebe.",
              en: "PAA Leite (Food Acquisition Program, Incentive for Milk Production and Consumption modality) is a public policy that buys milk from small family-farming producers and distributes it for free to families in social vulnerability. In Ceará, the program is operated by the State Agrarian Development Secretariat (SDA), which has to sustain both ends of the policy in the same system: who produces the milk and who receives it.",
            })}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start mt-6">
            <div className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                {t({ pt: "Módulos do sistema", en: "System modules" })}
              </h4>
              <ul className="space-y-2">
                {[
                  { pt: "Administração — cadastro de produtor, beneficiário, laticínio e responsável por entidade", en: "Administration — producer, beneficiary, dairy plant and entity representative registration" },
                  { pt: "Cadastros — vínculos e dados complementares do fluxo do programa", en: "Registrations — links and supporting data for the program's flow" },
                  { pt: "Monitoramento dos Tanques — tanques de resfriamento vinculados a cada laticínio", en: "Tank Monitoring — cooling tanks linked to each dairy plant" },
                  { pt: "Manifestação de Interesse — adesão de novos produtores e laticínios ao programa", en: "Expression of Interest — new producers and dairy plants joining the program" },
                  { pt: "Documentos e Relatórios — exportação em Excel e PDF para prestação de contas", en: "Documents and Reports — Excel and PDF export for accountability" },
                ].map((item) => (
                  <li key={item.pt} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>

            <DesktopShot
              src="/images/paa-leite-estudo-caso-administracao.png"
              alt="Menu de Administração do PAA-Leite, com submódulos de Produtor, Beneficiário, Laticínio e Responsável Entidade"
              caption={{ pt: "Módulo Administração: cadastro de produtor, beneficiário, laticínio e responsável por entidade", en: "Administration module: producer, beneficiary, dairy plant and entity representative registration" }}
            />
          </div>
        </>
      ),
    },
    {
      title: { pt: "Validação de Produtores e Cadastro de Beneficiários", en: "Producer Validation and Beneficiary Registration" },
      children: (
        <>
          <p>
            {t({
              pt: "Nenhum produtor entra no fluxo de pagamento sem passar por validação. A tela Valida Produtor cruza o cadastro com o número da DAP (Declaração de Aptidão ao Pronaf), sua data de validade e a situação junto à Adagri, além de permitir cancelar uma quinzena ou corrigir dados de nota fiscal quando a documentação apresenta inconsistência. É esse cadastro validado — e não uma simples lista de nomes — que autoriza um produtor a entregar leite em um laticínio parceiro.",
              en: "No producer enters the payment flow without validation. The Validate Producer screen cross-checks the registration against the DAP number (Family Farming Aptitude Declaration), its expiry date and the status with Adagri, and also lets staff cancel a fortnightly cycle or fix invoice data when documentation shows an inconsistency. It's this validated registration — not a simple list of names — that authorizes a producer to deliver milk to a partner dairy plant.",
            })}
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
            <DesktopShot
              src="/images/paa-leite-estudo-caso-validacao-produtores.png"
              alt="Grade de Validação de Produtores no PAA-Leite, com município, situação da DAP, tipo Pronaf e status de validação"
              caption={{ pt: "Validação de Produtores: situação da DAP, tipo Pronaf e status de validação por município", en: "Producer Validation: DAP status, Pronaf type and validation status per municipality" }}
            />
            <div>
              <p>
                {t({
                  pt: "Em paralelo ao cadastro do produtor, o sistema mantém um cadastro próprio de beneficiários — as famílias que recebem o leite distribuído pelo programa — com dados civis (RG, título de eleitor, naturalidade) e critério de participação em outros programas sociais, como o Mais Infância Ceará. É um perfil de dados e de regras de validação completamente diferente do produtor, e por isso vive em um módulo de cadastro dedicado, e não como uma variação do cadastro de quem produz.",
                  en: "Alongside the producer registry, the system keeps a separate beneficiary registry — the families who receive the milk distributed by the program — with civil records (ID document, voter registration, place of birth) and eligibility criteria for other social programs, such as Mais Infância Ceará. It's a completely different data and validation profile from the producer's, which is why it lives in its own dedicated registration module rather than as a variation of the producer registry.",
                })}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-6">
            <DesktopShot
              src="/images/paa-leite-estudo-caso-cadastro-beneficiario.png"
              alt="Formulário de Cadastro de Beneficiário no PAA-Leite, com dados civis e documento do beneficiário"
              caption={{ pt: "Cadastro de Beneficiário: dados civis e documento, validados em campos obrigatórios distintos do cadastro de produtor", en: "Beneficiary Registration: civil records and ID document, validated in required fields distinct from the producer registry" }}
            />
          </div>

          <p className="mt-6 text-xs text-zinc-500 italic">
            {t({
              pt: "CPF, RG e outros identificadores exibidos nas imagens deste estudo de caso foram desfocados por privacidade dos produtores e beneficiários do programa.",
              en: "CPF, RG and other identifiers shown in this case study's images were blurred to protect the privacy of the program's producers and beneficiaries.",
            })}
          </p>
        </>
      ),
    },
    {
      title: { pt: "Da Ordenha ao Pagamento: Monitoramento de Entrega e Estoque", en: "From the Farm to Payment: Delivery and Stock Monitoring" },
      children: (
        <>
          <p>
            {t({
              pt: "O núcleo operacional do PAA-Leite roda em ciclos de quinzena: cada produtor validado entrega seu leite em um tanque de resfriamento vinculado a um laticínio parceiro, e o sistema registra essa entrada por tipo (bovino ou caprino), associando-a à quinzena vigente. É esse registro — e não uma estimativa — que muda a situação do produtor para Gerado Pagamento, fechando o ciclo entre produção real e remuneração.",
              en: "PAA-Leite's operational core runs in fortnightly cycles: each validated producer delivers their milk to a cooling tank linked to a partner dairy plant, and the system logs that delivery by type (bovine or goat milk), tying it to the current cycle. It's this record — not an estimate — that moves the producer's status to Payment Generated, closing the loop between actual production and pay.",
            })}
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
            <DesktopShot
              src="/images/paa-leite-estudo-caso-entrada-laticinio.png"
              alt="Consulta da Entrada nos Laticínios pelos Produtores, com produtor, tipo de leite e situação Gerado Pagamento"
              caption={{ pt: "Entrada nos Laticínios: cada entrega vincula produtor, tipo de leite e situação de pagamento à quinzena", en: "Dairy Plant Intake: each delivery links producer, milk type and payment status to the fortnightly cycle" }}
            />
            <div>
              <p>
                {t({
                  pt: "A partir das entradas registradas, o Relatório de Estoque por Laticínio consolida, por planta e por especificação de leite, o volume disponível — a visão que a secretaria usa para acompanhar quais laticínios estão recebendo produção e quais precisam de atenção. É um relatório operacional simples na superfície, mas que só existe porque cada entrada individual foi corretamente vinculada a um produtor validado e a um laticínio cadastrado.",
                  en: "From the recorded intakes, the Stock Report by Dairy Plant consolidates, per plant and per milk specification, the available volume — the view the Secretariat uses to track which plants are receiving production and which need attention. It's a simple operational report on the surface, but one that only exists because every individual intake was correctly linked to a validated producer and a registered dairy plant.",
                })}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-6">
            <DesktopShot
              src="/images/paa-leite-estudo-caso-relatorio-estoque.png"
              alt="Relatório de Estoque por Laticínio, listando laticínios parceiros, produto, especificação e quantidade"
              caption={{ pt: "Relatório de Estoque por Laticínio: volume consolidado por planta e por especificação (bovino/caprino)", en: "Stock Report by Dairy Plant: volume consolidated per plant and specification (bovine/goat)" }}
            />
          </div>
        </>
      ),
    },
    {
      title: { pt: "Arquitetura e Stack", en: "Architecture and Stack" },
      children: (
        <>
          <p>
            {t({
              pt: "O PAA-Leite segue o mesmo padrão de infraestrutura dos demais sistemas da SDA: um núcleo em .NET/C# concentra as regras de validação de produtor e beneficiário, enquanto os painéis operacionais de cadastro, monitoramento de tanques e relatórios são gerados em PHP via Scriptcase, com telas de grade, filtros, ordenação e exportação em Excel e PDF prontas para o uso diário das equipes da secretaria. A camada Angular cobre fluxos mais específicos de manifestação de interesse e documentos. Toda a aplicação roda containerizada com Docker e é versionada via Git.",
              en: "PAA-Leite follows the same infrastructure pattern as SDA's other systems: a .NET/C# core holds the producer and beneficiary validation rules, while the operational panels for registration, tank monitoring and reporting are generated in PHP via Scriptcase, with grid screens, filters, sorting and Excel/PDF export ready for the Secretariat teams' daily use. An Angular layer covers more specific expression-of-interest and document flows. The whole application runs containerized with Docker and is version-controlled via Git.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Núcleo de regras isolado", en: "Isolated rules core" },
                desc: { pt: "As regras de elegibilidade vivem no núcleo .NET/C#, separadas da camada de apresentação — a mesma regra vale por qualquer tela que a consuma.", en: "Eligibility rules live in the .NET/C# core, separate from the presentation layer — the same rule holds across every screen that consumes it." },
              },
              {
                title: { pt: "Validação em duas frentes", en: "Two-front validation" },
                desc: { pt: "Regras de documentação distintas para produtor (DAP, Pronaf, Adagri) e para beneficiário (documento civil e critério social), no mesmo sistema.", en: "Distinct documentation rules for producer (DAP, Pronaf, Adagri) and for beneficiary (civil ID and social criteria), in the same system." },
              },
              {
                title: { pt: "Integração com fontes oficiais", en: "Integration with official sources" },
                desc: { pt: "A aptidão do produtor é conferida contra DAP/Pronaf e Adagri como fonte de verdade — o sistema valida, não recadastra o que já é oficial.", en: "Producer eligibility is checked against DAP/Pronaf and Adagri as the source of truth — the system validates, it doesn't re-register what's already official." },
              },
              {
                title: { pt: "Rastreabilidade por quinzena", en: "Per-cycle traceability" },
                desc: { pt: "Cada entrega herda o vínculo produtor → tanque → laticínio → quinzena antes de virar Gerado Pagamento: sem entrega válida, não há pagamento.", en: "Every delivery inherits the producer → tank → dairy plant → cycle link before it becomes Payment Generated: no valid delivery, no payment." },
              },
              {
                title: { pt: "Painéis operacionais gerados", en: "Generated operational panels" },
                desc: { pt: "Grades em Scriptcase/PHP entregam busca, colunas, ordenação e exportação Excel/PDF sem reescrever CRUD — velocidade de entrega para a operação da secretaria.", en: "Scriptcase/PHP grids deliver search, columns, sorting and Excel/PDF export without rewriting CRUD — delivery speed for the Secretariat's operation." },
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
                pt: "Arquitetura em alto nível: camada web (Scriptcase/PHP + Angular) sobre um núcleo de validação .NET/C#, com fontes oficiais de aptidão e uma base PostgreSQL única, tudo containerizado.",
                en: "High-level architecture: a web layer (Scriptcase/PHP + Angular) over a .NET/C# validation core, with official eligibility sources and a single PostgreSQL base, all containerized.",
              })}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                {t({ pt: "Modelo de dados e rastreabilidade", en: "Data model and traceability" })}
              </h4>
              <p>
                {t({
                  pt: "O modelo gira em torno do laticínio como agregador: cada laticínio parceiro reúne seus tanques, seus funcionários e os produtores que entregam nele. Toda entrada de leite nasce amarrada a essa cadeia, o que permite ao sistema responder, para qualquer pagamento, exatamente de quem veio o leite, em qual tanque, sob responsabilidade de qual laticínio e em qual quinzena — a rastreabilidade que uma política pública de repasse a produtores exige.",
                  en: "The model revolves around the dairy plant as an aggregator: each partner plant gathers its tanks, its staff and the producers who deliver there. Every milk intake is born tied to that chain, letting the system answer, for any payment, exactly whose milk it was, in which tank, under which dairy plant's responsibility and in which cycle — the traceability a public producer-payment policy demands.",
                })}
              </p>
            </div>
            <DesktopShot
              src="/images/paa-leite-estudo-caso-funcionarios-laticinio.png"
              alt="Consulta de Funcionários dos Laticínios no PAA-Leite, vinculando funcionário e laticínio"
              caption={{ pt: "Funcionários dos Laticínios: parte da cadeia laticínio → tanques → funcionários → produtores", en: "Dairy Plant Staff: part of the dairy plant → tanks → staff → producers chain" }}
            />
          </div>

          <div className="mt-8 rounded-2xl bg-violet-500/[0.06] border border-violet-500/20 p-6">
            <p className="text-sm text-violet-100 leading-relaxed">
              {lang === "pt" ? (
                <>
                  Por trás de uma tela simples de &quot;entrada de leite&quot;, o PAA-Leite move{" "}
                  <span className="font-semibold text-violet-50">dinheiro público para produtores reais</span> e{" "}
                  <span className="font-semibold text-violet-50">alimento para famílias reais</span>. Por isso a
                  arquitetura foi pensada com rigor de sistema financeiro: validação antes de pagamento,
                  rastreabilidade ponta a ponta e uma única fonte de verdade para cada dado.
                </>
              ) : (
                <>
                  Behind a simple &quot;milk intake&quot; screen, PAA-Leite moves{" "}
                  <span className="font-semibold text-violet-50">public money to real producers</span> and{" "}
                  <span className="font-semibold text-violet-50">food to real families</span>. That&apos;s why
                  the architecture was designed with the rigor of a financial system: validation before payment,
                  end-to-end traceability and a single source of truth for every piece of data.
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
              pt: "Em 9 meses de produção, o PAA-Leite passou a sustentar mais de 5 mil registros de entrada de leite por quinzena, distribuídos entre dezenas de laticínios parceiros, cada um com produtores, tanques e funcionários próprios cadastrados no sistema. É o sistema que garante que o pagamento a um produtor da agricultura familiar só aconteça quando há, de fato, leite entregue e validado — e que o leite distribuído às famílias beneficiárias tenha origem rastreável, do primeiro cadastro do produtor até o relatório de estoque de cada laticínio.",
              en: "Across 9 months in production, PAA-Leite came to sustain over 5,000 milk-delivery records per fortnightly cycle, spread across dozens of partner dairy plants, each with its own producers, tanks and staff registered in the system. It's the system that guarantees a family-farming producer only gets paid when milk was actually delivered and validated — and that the milk distributed to beneficiary families has traceable origin, from a producer's first registration through to each dairy plant's stock report.",
            })}
          </p>

          <div className="mt-8">
            <h4 className="text-sm font-semibold text-white mb-1">
              {t({ pt: "O programa que o sistema opera, em números", en: "The program the system operates, in numbers" })}
            </h4>
            <p className="text-xs text-zinc-500 mb-4">
              {t({ pt: "Dados públicos do Governo do Ceará (2026).", en: "Public data from the Government of Ceará (2026)." })}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { value: "167", label: { pt: "municípios atendidos", en: "municipalities served" } },
                { value: "250 mil+", label: { pt: "pessoas beneficiadas", en: "people benefited" } },
                { value: "29 mil L/dia", label: { pt: "leite bovino e caprino", en: "bovine and goat milk" } },
                { value: "1.849", label: { pt: "produtores rurais", en: "rural producers" } },
              ].map((stat) => (
                <div key={stat.value} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4">
                  <span className="block text-xl font-bold text-white tabular-nums">{stat.value}</span>
                  <span className="mt-1 block text-[13px] text-zinc-400">{t(stat.label)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "O PAA-Leite tem duas pontas humanas muito concretas: o pequeno produtor que depende da validação correta da sua DAP para receber pelo leite entregue, e a família beneficiária que depende desse mesmo leite chegando até ela. Desenhar as regras de validação, o fluxo de quinzena e os relatórios que sustentam esse ciclo — sem perder rastreabilidade em nenhum ponto entre a ordenha e o pagamento — foi um trabalho que me exigiu o mesmo rigor de qualquer sistema financeiro, ainda que o produto final seja, literalmente, leite.",
                en: "PAA-Leite has two very concrete human ends: the small producer who depends on their DAP being correctly validated to get paid for the milk delivered, and the beneficiary family who depends on that same milk reaching them. Designing the validation rules, the fortnightly-cycle flow and the reports that sustain that loop — without losing traceability anywhere between the milking and the payment — demanded the same rigor as any financial system, even though the end product is, literally, milk.",
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

export default function PaaLeiteCasePage() {
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
            pt: "O PAA-Leite é o sistema que opera, no Ceará, o Programa de Aquisição de Alimentos na modalidade Incentivo à Produção e ao Consumo de Leite: valida produtores da agricultura familiar, cadastra beneficiários e rastreia cada entrega de leite, do tanque do laticínio até o pagamento ao produtor.",
            en: "PAA-Leite is the system that runs, in Ceará, the Food Acquisition Program's Incentive for Milk Production and Consumption modality: it validates family-farming producers, registers beneficiaries and tracks every milk delivery, from the dairy plant's tank through to the producer's payment.",
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
