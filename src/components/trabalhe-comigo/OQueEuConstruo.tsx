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
  Palette,
  type LucideIcon,
} from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

const ITEMS: Array<{ icon: LucideIcon; title: Bilingual; description: Bilingual }> = [
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
  {
    icon: Plug,
    title: { pt: "APIs & integrações", en: "APIs & integrations" },
    description: {
      pt: "Back-ends robustos em Node e NestJS, integrações com terceiros, pagamentos e contratos de API versionados.",
      en: "Robust back-ends in Node and NestJS, third-party integrations, payments and versioned API contracts.",
    },
  },
  {
    icon: Settings,
    title: { pt: "DevOps & infraestrutura", en: "DevOps & infrastructure" },
    description: {
      pt: "CI/CD, deploy automatizado, cloud (Vercel, Railway, AWS) e monitoramento com Grafana e Prometheus.",
      en: "CI/CD, automated deploy, cloud (Vercel, Railway, AWS) and monitoring with Grafana and Prometheus.",
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
    icon: Server,
    title: { pt: "Servidores & cloud", en: "Servers & cloud" },
    description: {
      pt: "Provisionamento, configuração e gestão de servidores. Migro sua hospedagem para uma infra mais estável e barata.",
      en: "Provisioning, configuration and server management. I migrate your hosting to a more stable and affordable infra.",
    },
  },
  {
    icon: Repeat,
    title: { pt: "Transferência de operações", en: "Operations handover" },
    description: {
      pt: "Assumo a operação de um sistema que já existe, com handover documentado, sustentação e continuidade sem dor de cabeça.",
      en: "I take over the operation of an existing system, with documented handover, support and hassle-free continuity.",
    },
  },
  {
    icon: Palette,
    title: { pt: "UX/UI & produto", en: "UX/UI & product" },
    description: {
      pt: "Design de interface, prototipagem e design systems. Quem desenha também entrega o código.",
      en: "Interface design, prototyping and design systems. The person who designs also ships the code.",
    },
  },
];

export default function OQueEuConstruo() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <section id="servicos" className="scroll-mt-20 border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "O que eu construo", en: "What I build" }}
          kicker={{ pt: "Do zero, ou assumindo o que já existe", en: "From scratch, or taking over what already exists" }}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={t(item.title)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/10 text-violet-300">
                <item.icon className="h-[22px] w-[22px]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{t(item.title)}</h3>
              <p className="text-sm text-zinc-400">{t(item.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
