"use client";

import {
  LayoutDashboard,
  Smartphone,
  Globe,
  Workflow,
  RefreshCw,
  Wrench,
  Server,
  type LucideIcon,
} from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

const SERVICES: Array<{ icon: LucideIcon; title: Bilingual; description: Bilingual }> = [
  {
    icon: LayoutDashboard,
    title: { pt: "Sistemas sob medida - SaaS, ERP, CRM e Dashboards", en: "Custom systems - SaaS, ERP, CRM and dashboards" },
    description: {
      pt: "Plataformas completas que organizam sua operação e crescem junto com o seu negócio.",
      en: "Complete platforms that organize your operation and grow with your business.",
    },
  },
  {
    icon: Smartphone,
    title: { pt: "Aplicativos para iOS e Android", en: "Apps for iOS and Android" },
    description: {
      pt: "Apps nativos, rápidos e publicados nas lojas, pra sua marca ir no bolso do cliente.",
      en: "Fast native apps, published on the stores, to put your brand in your customer's pocket.",
    },
  },
  {
    icon: Globe,
    title: { pt: "Sites e landing pages que convertem", en: "Websites and landing pages that convert" },
    description: {
      pt: "Páginas rápidas, otimizadas pro Google e feitas pra transformar visitante em cliente.",
      en: "Fast pages, optimized for Google and built to turn visitors into customers.",
    },
  },
  {
    icon: Workflow,
    title: { pt: "Integrações e automações", en: "Integrations and automations" },
    description: {
      pt: "Conecto seus sistemas, meios de pagamento e ferramentas pra automatizar o trabalho e economizar seu tempo.",
      en: "I connect your systems, payment methods and tools to automate work and save your time.",
    },
  },
  {
    icon: RefreshCw,
    title: { pt: "Modernização de sistemas", en: "System modernization" },
    description: {
      pt: "Levo seu sistema antigo pra uma versão moderna, rápida e segura, sem perder nenhum dado.",
      en: "I take your old system to a modern, fast and secure version, without losing any data.",
    },
  },
  {
    icon: Wrench,
    title: { pt: "Assumo e mantenho seu sistema", en: "I take over and maintain your system" },
    description: {
      pt: "Já tem algo rodando? Assumo a operação com tudo documentado e mantenho funcionando, sem dor de cabeça.",
      en: "Already have something running? I take over the operation with everything documented and keep it working, hassle-free.",
    },
  },
  {
    icon: Server,
    title: { pt: "Seu produto sempre no ar", en: "Your product always online" },
    description: {
      pt: "Hospedagem e infraestrutura estável, 100% monitorada e pagando somente o que consome.",
      en: "Stable, fully monitored infrastructure, paying only for what you use.",
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
          title={{ pt: "Serviços", en: "Services" }}
          kicker={{
            pt: "Do esboço ao no ar, sob medida pro seu negócio",
            en: "From sketch to launch, tailored to your business",
          }}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={t(service.title)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-white/[0.07]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/10 text-violet-300">
                <service.icon className="h-[22px] w-[22px]" />
              </div>
              <h3 className="text-lg font-semibold leading-snug text-white">{t(service.title)}</h3>
              <p className="mt-2 text-sm leading-snug text-zinc-400">{t(service.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
