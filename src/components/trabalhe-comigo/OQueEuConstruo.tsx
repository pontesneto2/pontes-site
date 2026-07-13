"use client";

import {
  LayoutDashboard,
  Smartphone,
  Globe,
  Plug,
  Settings,
  ArrowRightLeft,
  Server,
  Repeat,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

type Servico = { icon: LucideIcon; title: Bilingual; description: Bilingual };

const GROUPS: Array<{ categoria: Bilingual; categoriaIcon: LucideIcon; items: Servico[] }> = [
  {
    categoria: { pt: "Desenvolvimento", en: "Development" },
    categoriaIcon: Code2,
    items: [
      {
        icon: LayoutDashboard,
        title: { pt: "Sistemas web & SaaS", en: "Web & SaaS systems" },
        description: {
          pt: "Plataformas completas, multi-perfil e multi-tenant, com painel administrativo, ACL e observabilidade.",
          en: "Complete platforms, multi-role and multi-tenant, with admin panel, ACL and observability.",
        },
      },
      {
        icon: Smartphone,
        title: { pt: "Aplicativos iOS & Android", en: "iOS & Android apps" },
        description: {
          pt: "Apps com React Native e Expo, incluindo publicação nas lojas e validação em device real.",
          en: "Apps with React Native and Expo, including store publishing and real device validation.",
        },
      },
      {
        icon: Globe,
        title: { pt: "Sites & landing pages", en: "Websites & landing pages" },
        description: {
          pt: "Institucionais e páginas de alta conversão, rápidas, otimizadas para SEO e prontas pra tráfego pago.",
          en: "Corporate sites and high-conversion pages, fast, SEO-optimized and ready for paid traffic.",
        },
      },
    ],
  },
  {
    categoria: { pt: "Back-end & Integrações", en: "Back-end & Integrations" },
    categoriaIcon: Plug,
    items: [
      {
        icon: Plug,
        title: { pt: "APIs & integrações", en: "APIs & integrations" },
        description: {
          pt: "Back-ends robustos em Node e NestJS, integrações com terceiros, pagamentos e contratos de API versionados.",
          en: "Robust back-ends in Node and NestJS, third-party integrations, payments and versioned API contracts.",
        },
      },
      {
        icon: ArrowRightLeft,
        title: { pt: "Migração de sistemas", en: "System migration" },
        description: {
          pt: "Levo seu sistema legado para uma stack moderna, com migração de dados segura e sem perda no caminho.",
          en: "I take your legacy system to a modern stack, with safe data migration and no loss along the way.",
        },
      },
      {
        icon: Repeat,
        title: { pt: "Transferência de operações", en: "Operations handover" },
        description: {
          pt: "Assumo a operação de um sistema que já existe, com handover documentado, sustentação e continuidade.",
          en: "I take over an existing system's operation, with documented handover, support and continuity.",
        },
      },
    ],
  },
  {
    categoria: { pt: "DevOps & Infraestrutura", en: "DevOps & Infrastructure" },
    categoriaIcon: Settings,
    items: [
      {
        icon: Settings,
        title: { pt: "DevOps & infraestrutura", en: "DevOps & infrastructure" },
        description: {
          pt: "CI/CD, deploy automatizado, cloud (Vercel, Railway, AWS) e monitoramento com Grafana e Prometheus.",
          en: "CI/CD, automated deploy, cloud (Vercel, Railway, AWS) and monitoring with Grafana and Prometheus.",
        },
      },
      {
        icon: Server,
        title: { pt: "Servidores & cloud", en: "Servers & cloud" },
        description: {
          pt: "Provisionamento, configuração e gestão de servidores. Migro sua hospedagem para uma infra mais estável e barata.",
          en: "Provisioning, configuration and server management. I migrate your hosting to a more stable, affordable infra.",
        },
      },
    ],
  },
];

export default function OQueEuConstruo() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <section id="servicos" className="scroll-mt-20 border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "Serviços", en: "Services" }}
          kicker={{ pt: "Do zero, ou assumindo o que já existe", en: "From scratch, or taking over what already exists" }}
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {GROUPS.map((group) => (
            <div
              key={t(group.categoria)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/35 bg-violet-500/10 text-violet-300">
                  <group.categoriaIcon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="font-mono text-[11px] uppercase tracking-wide text-violet-300">{t(group.categoria)}</h3>
              </div>
              <div className="flex flex-col divide-y divide-white/5">
                {group.items.map((item) => (
                  <div key={t(item.title)} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-zinc-300">
                      <item.icon className="h-[17px] w-[17px]" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">{t(item.title)}</div>
                      <div className="mt-0.5 text-[13px] leading-snug text-zinc-400">{t(item.description)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
