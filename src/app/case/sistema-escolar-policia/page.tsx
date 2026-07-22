"use client";

import Image from "next/image";
import CaseHero from "@/components/case/CaseHero";
import CaseContent from "@/components/case/CaseContent";
import CaseCTA from "@/components/case/CaseCTA";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

/* ═══════════════════════════════════════════
   DADOS DO ESTUDO DE CASO: Sistema Escolar 2º CPM-CHMJ
   ═══════════════════════════════════════════ */

const heroData = {
  title: {
    pt: "2º CPM-CHMJ: Gestão Acadêmica em Nuvem para um Colégio da Polícia Militar",
    en: "2nd CPM-CHMJ: Cloud-Based Academic Management for a Military Police School",
  },
  subtitle: {
    pt: "Sistema COM3 + Portal Aluno Online (SEDUC) + Ambiente EAD",
    en: "COM3 System + Aluno Online Portal (SEDUC) + EAD Environment",
  },
  description: {
    pt: "Sistema de gestão escolar do 2º Colégio da Polícia Militar Coronel Hervano Macêdo Júnior, desenvolvido enquanto atuei na Com3 Brasil. O Sistema COM3 cuida da gestão acadêmica e administrativa (boletim, comportamento, DAE), integrado ao portal Aluno Online da SEDUC e a um ambiente EAD próprio, com backend hospedado em nuvem AWS.",
    en: "School management system for the 2nd Military Police School Coronel Hervano Macêdo Júnior, built while I worked at Com3 Brasil. The COM3 System handles academic and administrative management (report cards, behavior, DAE), integrated with SEDUC's Aluno Online portal and a dedicated EAD environment, with a backend hosted on AWS cloud infrastructure.",
  },
  tags: ["PHP", "Laravel", "C#", ".NET", "Angular", "PostgreSQL", "Docker", "Git", "Jira", "Grafana"],
};

const summaryData: Array<{ label: Bilingual; value: Bilingual }> = [
  { label: { pt: "Tipo de projeto", en: "Project type" }, value: { pt: "Sistema Web+Admin / PWA", en: "Web+Admin System / PWA" } },
  { label: { pt: "Papel exercido", en: "Role" }, value: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" } },
  { label: { pt: "Vínculo", en: "Affiliation" }, value: { pt: "Período na Com3 Brasil", en: "Time at Com3 Brasil" } },
  { label: { pt: "Idealizadora", en: "Idealized by" }, value: { pt: "Com3 Brasil", en: "Com3 Brasil" } },
  { label: { pt: "Status", en: "Status" }, value: { pt: "Em produção", en: "In production" } },
  { label: { pt: "Duração", en: "Duration" }, value: { pt: "1,2 anos de produção", en: "1.2 years in production" } },
];

const challengesData = {
  title: { pt: "Principais Desafios Enfrentados", en: "Key Challenges Faced" },
  intro: {
    pt: "Um sistema escolar usado diariamente por pais, alunos, professores e a administração do colégio não pode falhar em datas críticas como fechamento de boletim. Isso trouxe desafios concretos de estabilidade, segurança e continuidade de equipe.",
    en: "A school system used daily by parents, students, teachers and the school's administration cannot fail on critical dates like report card closing. That brought concrete challenges around stability, security and team continuity.",
  },
  items: [
    {
      pt: "Manter estabilidade do sistema com a equipe reduzida de 4 para 3 desenvolvedores no meio do projeto",
      en: "Keeping the system stable after the team shrank from 4 to 3 developers mid-project",
    },
    {
      pt: "Garantir segurança de dados acadêmicos sensíveis (notas, comportamento, dados de menores) em nuvem",
      en: "Ensuring the security of sensitive academic data (grades, behavior, minors' data) in the cloud",
    },
    {
      pt: "Integrar múltiplos canais — Sistema COM3, portal Aluno Online da SEDUC e ambiente EAD — sob uma identidade única",
      en: "Integrating multiple channels — the COM3 System, SEDUC's Aluno Online portal and the EAD environment — under a single identity",
    },
  ] as Bilingual[],
};

const kpisData: Array<{ text: Bilingual }> = [
  { text: { pt: "2.350+ usuários ativos entre pais, alunos e equipe do colégio", en: "2,350+ active users among parents, students and school staff" } },
  { text: { pt: "99,9% de uptime em período letivo", en: "99.9% uptime during the school year" } },
  { text: { pt: "-40% de manutenção corretiva semanal após reestruturação do backend", en: "-40% weekly corrective maintenance after backend restructuring" } },
  { text: { pt: "MVP entregue 2 meses antes do prazo previsto", en: "MVP delivered 2 months ahead of schedule" } },
  { text: { pt: "Backend em nuvem AWS, com observabilidade via Grafana", en: "AWS cloud backend, with observability via Grafana" } },
];

const stackData = ["PHP", "Laravel", "C#", ".NET", "Angular", "PostgreSQL", "Docker", "Git", "Jira", "Grafana"];

/* ═══════════════════════════════════════════
   ILUSTRAÇÃO: ARQUITETURA EM NUVEM (AWS)
   ═══════════════════════════════════════════ */

function ArchitectureDiagram({ lang }: { lang: "pt" | "en" }) {
  const t = (v: Bilingual) => tr(lang, v);
  return (
    <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="Diagrama da arquitetura em nuvem AWS do Sistema Escolar 2º CPM-CHMJ">
      <defs>
        <marker id="esc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#8b5cf6" />
        </marker>
        <marker id="esc-arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#71717a" />
        </marker>
      </defs>

      {/* Clients */}
      <rect x="8" y="96" width="150" height="66" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="83" y="122" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Pais e Alunos", en: "Parents and Students" })}
      </text>
      <text x="83" y="138" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Boletim, comportamento, EAD", en: "Report card, behavior, EAD" })}
      </text>
      <text x="83" y="152" textAnchor="middle" fontSize="9" fill="#a1a1aa">PWA</text>

      <rect x="8" y="180" width="150" height="56" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="83" y="202" textAnchor="middle" fontSize="11" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Colégio (Admin)", en: "School (Admin)" })}
      </text>
      <text x="83" y="218" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Gestão acadêmica COM3", en: "COM3 academic management" })}
      </text>

      <line x1="158" y1="130" x2="192" y2="160" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#esc-arrow)" />
      <line x1="158" y1="205" x2="192" y2="175" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#esc-arrow)" />

      {/* AWS boundary */}
      <rect x="198" y="40" width="594" height="366" rx="16" fill="none" stroke="rgba(255,153,0,0.35)" strokeDasharray="5 5" />
      <text x="214" y="34" fontSize="9.5" fill="#fbbf24" letterSpacing="0.08em">AWS CLOUD</text>

      {/* ALB / HTTPS */}
      <rect x="228" y="140" width="150" height="52" rx="10" fill="rgba(255,153,0,0.08)" stroke="rgba(255,153,0,0.4)" />
      <text x="303" y="161" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Load Balancer (HTTPS/TLS)", en: "Load Balancer (HTTPS/TLS)" })}
      </text>
      <text x="303" y="176" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Roteia por domínio/serviço", en: "Routes by domain/service" })}
      </text>

      <line x1="378" y1="166" x2="410" y2="166" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#esc-arrow)" />

      {/* Services row */}
      {[
        { x: 410, title: "COM3 — PHP/Laravel", sub: t({ pt: "Boletim, comportamento, DAE", en: "Report card, behavior, DAE" }) },
        { x: 560, title: "API — C# / .NET", sub: t({ pt: "Regras acadêmicas e integrações", en: "Academic rules and integrations" }) },
      ].map((svc) => (
        <g key={svc.title}>
          <rect x={svc.x} y="128" width="140" height="66" rx="10" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.45)" />
          <text x={svc.x + 70} y="152" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
            {svc.title}
          </text>
          <text x={svc.x + 70} y="168" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
            {svc.sub}
          </text>
          <text x={svc.x + 70} y="182" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
            {t({ pt: "Containers Docker", en: "Docker containers" })}
          </text>
        </g>
      ))}

      <line x1="480" y1="194" x2="480" y2="222" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#esc-arrow)" />

      {/* Frontend / Angular admin */}
      <rect x="228" y="222" width="150" height="52" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="303" y="243" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Painel Admin — Angular", en: "Admin Panel — Angular" })}
      </text>
      <text x="303" y="258" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Perfis: colégio, SEDUC, professores", en: "Roles: school, SEDUC, teachers" })}
      </text>
      <line x1="303" y1="222" x2="303" y2="194" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#esc-arrow-dim)" />

      {/* Database tier */}
      <rect x="410" y="222" width="140" height="56" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="480" y="244" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "PostgreSQL (RDS)", en: "PostgreSQL (RDS)" })}
      </text>
      <text x="480" y="259" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Backups automáticos", en: "Automated backups" })}
      </text>

      <line x1="550" y1="250" x2="578" y2="250" stroke="#8b5cf6" strokeWidth="1.6" markerEnd="url(#esc-arrow)" />

      <rect x="584" y="222" width="140" height="56" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="654" y="244" textAnchor="middle" fontSize="10.5" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Storage — EAD/Arquivos", en: "Storage — EAD/Files" })}
      </text>
      <text x="654" y="259" textAnchor="middle" fontSize="9" fill="#a1a1aa">
        {t({ pt: "Conteúdo do ambiente EAD", en: "EAD environment content" })}
      </text>

      <line x1="303" y1="274" x2="303" y2="300" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#esc-arrow-dim)" />
      <line x1="480" y1="278" x2="420" y2="300" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#esc-arrow-dim)" />

      {/* Observability + security */}
      <rect x="228" y="304" width="180" height="60" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="318" y="326" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">Grafana</text>
      <text x="318" y="341" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Monitoramento de saúde do sistema", en: "System health monitoring" })}
      </text>
      <text x="318" y="354" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Alertas antes do horário letivo", en: "Alerts ahead of school hours" })}
      </text>

      <rect x="424" y="304" width="180" height="60" rx="10" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.35)" />
      <text x="514" y="326" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Segurança e Acesso", en: "Security and Access" })}
      </text>
      <text x="514" y="341" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Controle de acesso por perfil", en: "Role-based access control" })}
      </text>
      <text x="514" y="354" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "TLS ponta a ponta + backups isolados", en: "End-to-end TLS + isolated backups" })}
      </text>

      <line x1="654" y1="278" x2="654" y2="304" stroke="#71717a" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#esc-arrow-dim)" />
      <rect x="612" y="304" width="140" height="60" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
      <text x="682" y="326" textAnchor="middle" fontSize="10" fill="#e4e4e7" fontWeight="600">
        {t({ pt: "Ambiente EAD", en: "EAD Environment" })}
      </text>
      <text x="682" y="341" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "cpmce.com.br/ead2cpm", en: "cpmce.com.br/ead2cpm" })}
      </text>
      <text x="682" y="354" textAnchor="middle" fontSize="8.5" fill="#a1a1aa">
        {t({ pt: "Acesso independente do colégio", en: "Independent school access" })}
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   FOTO DE DESTAQUE
   ═══════════════════════════════════════════ */

function ShowcaseHero() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 sm:px-8 -mt-4 mb-16">
      <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(88,28,155,0.45)]">
        <div className="relative aspect-[16/9]">
          <Image
            src="/images/capa-sistema-policia.png"
            alt="Portal de sistemas do 2º CPM-CHMJ (Com3 Brasil)"
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
              pt: "O Sistema Escolar do 2º Colégio da Polícia Militar Coronel Hervano Macêdo Júnior (2º CPM-CHMJ) é o sistema COM3 usado pelo colégio para a gestão acadêmica e administrativa: acompanhamento de boletim, selos de comportamento e emissão de DAE para pagamento de mensalidades. O sistema é complementado pelo portal Aluno Online da SEDUC, que dá visibilidade ao acompanhamento escolar, e por um ambiente EAD próprio da instituição.",
              en: "The school system of the 2nd Military Police School Coronel Hervano Macêdo Júnior (2nd CPM-CHMJ) is the COM3 system used by the school for academic and administrative management: report card tracking, behavior badges, and DAE issuance for tuition payments. The system is complemented by SEDUC's Aluno Online portal, which gives visibility into student progress, and by the school's own EAD environment.",
            })}
          </p>

          <div className="mt-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6">
            <h4 className="text-sm font-semibold text-white mb-3">
              {t({ pt: "Módulos do portal de sistemas", en: "Modules on the systems portal" })}
            </h4>
            <ul className="space-y-2">
              {[
                { pt: "Principal — acesso central a todos os sistemas do colégio", en: "Main — central access to all of the school's systems" },
                { pt: "Boletim Escolar Online — acompanhamento de notas por pais e alunos", en: "Online Report Card — grade tracking for parents and students" },
                { pt: "DAE — geração de guias para pagamento das mensalidades", en: "DAE — generating payment slips for tuition" },
                { pt: "Comportamento — visualização dos selos disciplinares", en: "Behavior — viewing disciplinary badges" },
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
      title: { pt: "Múltiplos Canais de Acesso", en: "Multiple Access Channels" },
      children: (
        <>
          <p>
            {t({
              pt: "O ecossistema do 2º CPM-CHMJ é composto por três frentes que precisam conversar entre si sem se confundir para o usuário final: o portal de Sistemas (Com3 Brasil), o portal do Aluno — que mostra a interação entre colégio, pais e alunos — e o Ambiente Virtual de Aprendizagem (EAD).",
              en: "The 2nd CPM-CHMJ ecosystem is made up of three fronts that need to talk to each other without confusing the end user: the Systems portal (Com3 Brasil), the Student portal — which shows the interaction between school, parents and students — and the Virtual Learning Environment (EAD).",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Boletim e Comportamento", en: "Report Card and Behavior" },
                desc: { pt: "Plataforma Sistemas CPMCE — Com3 Brasil, para verificar notas e selos disciplinares.", en: "Sistemas CPMCE — Com3 Brasil platform, to check grades and disciplinary badges." },
                href: "https://com3brasil.com.br/cpmce/sistemas/",
              },
              {
                title: { pt: "Portal do Aluno", en: "Student Portal" },
                desc: { pt: "Mostra a interação entre colégio, pais e alunos em um só lugar.", en: "Shows the interaction between school, parents and students in one place." },
                href: "https://www.com3brasil.com.br/v9/app/cpmce/login/",
              },
              {
                title: { pt: "Ambiente Virtual (EAD)", en: "Virtual Environment (EAD)" },
                desc: { pt: "Plataforma EAD própria da instituição, acessível pelo link EAD 2º CPM-CHMJ.", en: "The institution's own EAD platform, accessible via the EAD 2nd CPM-CHMJ link." },
                href: "https://cpmce.com.br/ead2cpm/",
              },
            ].map((card) => (
              <a
                key={card.title.pt}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl bg-white/[0.025] border border-white/[0.06] p-5 hover:border-violet-500/25 hover:bg-violet-500/[0.03] transition-all duration-300"
              >
                <h4 className="text-sm font-semibold text-white">{t(card.title)}</h4>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{t(card.desc)}</p>
              </a>
            ))}
          </div>
        </>
      ),
    },
    {
      title: { pt: "Arquitetura e Segurança em Nuvem (AWS)", en: "Cloud Architecture and Security (AWS)" },
      children: (
        <>
          <p>
            {t({
              pt: "Por lidar com dados acadêmicos e disciplinares de menores de idade, o backend do sistema foi hospedado em infraestrutura AWS, priorizando robustez e segurança: serviços containerizados atrás de um load balancer com TLS, banco de dados PostgreSQL gerenciado com backups automáticos, e armazenamento isolado para o conteúdo do ambiente EAD.",
              en: "Since it handles academic and disciplinary data of minors, the system's backend was hosted on AWS infrastructure, prioritizing robustness and security: containerized services behind a TLS-terminated load balancer, a managed PostgreSQL database with automated backups, and isolated storage for the EAD environment's content.",
            })}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                title: { pt: "Containers isolados por serviço", en: "Per-service isolated containers" },
                desc: { pt: "COM3 (PHP/Laravel) e a API acadêmica (C#/.NET) rodam em containers Docker separados, permitindo atualizar um sem afetar o outro.", en: "COM3 (PHP/Laravel) and the academic API (C#/.NET) run in separate Docker containers, so one can be updated without affecting the other." },
              },
              {
                title: { pt: "Controle de acesso por perfil", en: "Role-based access control" },
                desc: { pt: "Colégio, SEDUC, professores, pais e alunos enxergam apenas o que é pertinente ao seu papel no sistema.", en: "The school, SEDUC, teachers, parents and students only see what's relevant to their role in the system." },
              },
              {
                title: { pt: "Backups e continuidade", en: "Backups and continuity" },
                desc: { pt: "Backups automáticos do banco de dados protegem informações críticas de boletim e comportamento contra perda.", en: "Automated database backups protect critical report card and behavior data against loss." },
              },
              {
                title: { pt: "Tráfego criptografado", en: "Encrypted traffic" },
                desc: { pt: "TLS de ponta a ponta entre clientes (PWA/Web) e o load balancer, protegendo dados sensíveis em trânsito.", en: "End-to-end TLS between clients (PWA/Web) and the load balancer, protecting sensitive data in transit." },
              },
              {
                title: { pt: "Observabilidade com Grafana", en: "Observability with Grafana" },
                desc: { pt: "Dashboards acompanham a saúde do sistema, com alertas antes que um problema afete o horário letivo.", en: "Dashboards track system health, with alerts firing before an issue affects school hours." },
              },
              {
                title: { pt: "Rastreabilidade de entregas", en: "Delivery traceability" },
                desc: { pt: "Versionamento com Git e gestão de tarefas no Jira, dando rastreabilidade a cada mudança em produção.", en: "Versioning with Git and task management in Jira, giving traceability to every change shipped to production." },
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
                  O resultado é um backend pensado para <span className="font-semibold text-violet-50">robustez e segurança</span>: serviços
                  containerizados e isolados por domínio, banco de dados gerenciado com backup automático, tráfego
                  sempre criptografado e observabilidade contínua sobre um sistema usado diariamente por pais,
                  alunos e a administração do colégio.
                </>
              ) : (
                <>
                  The result is a backend built for <span className="font-semibold text-violet-50">robustness and security</span>: containerized
                  services isolated by domain, a managed database with automated backup, always-encrypted traffic,
                  and continuous observability over a system used daily by parents, students and the school&apos;s
                  administration.
                </>
              )}
            </p>
          </div>
        </>
      ),
    },
    {
      title: { pt: "Continuidade com Equipe Reduzida", en: "Continuity with a Smaller Team" },
      children: (
        <>
          <p>
            {t({
              pt: "Durante o projeto, a equipe foi reduzida de 4 para 3 desenvolvedores, sem que isso interrompesse a operação do sistema para o colégio. A reestruturação de processos e a padronização das entregas via Jira e Git ajudaram a reduzir em 40% a manutenção corretiva semanal, liberando espaço para evoluir o produto mesmo com menos gente na equipe.",
              en: "During the project, the team shrank from 4 to 3 developers without interrupting the system's operation for the school. Restructuring processes and standardizing delivery through Jira and Git helped cut weekly corrective maintenance by 40%, freeing up room to keep evolving the product even with fewer people on the team.",
            })}
          </p>

          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "O MVP do portal de sistemas foi entregue 2 meses antes do prazo previsto, o que deu margem para estabilizar os módulos de boletim e DAE antes dos períodos críticos de fechamento de nota do colégio.",
                en: "The systems portal MVP was delivered 2 months ahead of schedule, which gave room to stabilize the report card and DAE modules before the school's critical grade-closing periods.",
              })}
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
              pt: "O Sistema Escolar do 2º CPM-CHMJ sustenta hoje mais de 2.350 usuários ativos entre pais, alunos e equipe do colégio, com 99,9% de uptime durante o período letivo. A infraestrutura em nuvem AWS e a integração entre COM3, Aluno Online (SEDUC) e o ambiente EAD deram ao colégio um ecossistema digital único para gestão acadêmica, comportamental e financeira.",
              en: "The 2nd CPM-CHMJ school system now sustains over 2,350 active users among parents, students and school staff, with 99.9% uptime during the school year. AWS cloud infrastructure and the integration between COM3, Aluno Online (SEDUC) and the EAD environment gave the school a single digital ecosystem for academic, behavioral and financial management.",
            })}
          </p>
        </>
      ),
    },
    {
      title: { pt: "Vínculo e Direitos", en: "Affiliation and Rights" },
      children: (
        <>
          <div className="mt-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t({
                pt: "Este sistema foi desenvolvido durante o período em que atuei como desenvolvedor na Com3 Brasil, empresa idealizadora e proprietária do produto. Todos os direitos sobre o projeto, incluindo marca, código-fonte e demais materiais, são reservados à Com3 Brasil e ao 2º Colégio da Polícia Militar Coronel Hervano Macêdo Júnior. Este estudo de caso tem finalidade exclusivamente demonstrativa do trabalho técnico realizado.",
                en: "This system was built during the period I worked as a developer at Com3 Brasil, the company that conceived and owns the product. All rights to the project, including brand, source code and other materials, are reserved to Com3 Brasil and the 2nd Military Police School Coronel Hervano Macêdo Júnior. This case study is presented solely to demonstrate the technical work performed.",
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

export default function SistemaEscolarPoliciaCasePage() {
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
            pt: "O Sistema Escolar do 2º CPM-CHMJ integra gestão acadêmica, comportamental e financeira em um único ecossistema — Sistema COM3, portal Aluno Online da SEDUC e ambiente EAD — com backend robusto e seguro hospedado em nuvem AWS.",
            en: "The 2nd CPM-CHMJ school system integrates academic, behavioral and financial management into a single ecosystem — the COM3 System, SEDUC's Aluno Online portal and an EAD environment — backed by a robust, secure AWS cloud backend.",
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
