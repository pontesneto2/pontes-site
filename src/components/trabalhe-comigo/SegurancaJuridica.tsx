"use client";

import { FileText, Receipt, ShieldCheck, Lock, FileCode, type LucideIcon } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

const ITEMS: Array<{ icon: LucideIcon; title: Bilingual; description: Bilingual }> = [
  {
    icon: FileText,
    title: { pt: "Contrato de prestação", en: "Service agreement" },
    description: {
      pt: "Serviço, prazos, valores e responsabilidades formalizados antes de começar.",
      en: "Service, timelines, prices and responsibilities formalized before starting.",
    },
  },
  {
    icon: FileCode,
    title: { pt: "Escopo documentado", en: "Documented scope" },
    description: {
      pt: "Proposta comercial detalhada, com o que está e o que não está incluído, sem zona cinzenta.",
      en: "Detailed commercial proposal, with what's included and what isn't, no gray areas.",
    },
  },
  {
    icon: Receipt,
    title: { pt: "Nota fiscal", en: "Invoice" },
    description: {
      pt: "Emissão de NF pra cada pagamento, com tudo dentro da legalidade.",
      en: "Invoice issued for every payment, fully within the law.",
    },
  },
  {
    icon: Lock,
    title: { pt: "Conformidade LGPD", en: "LGPD compliance" },
    description: {
      pt: "Tratamento de dados dentro da lei, com atenção a privacidade e segurança.",
      en: "Data handling within the law, with attention to privacy and security.",
    },
  },
  {
    icon: FileCode,
    title: { pt: "Código é seu", en: "The code is yours" },
    description: {
      pt: "Propriedade intelectual transferida na entrega. O que você paga, você leva.",
      en: "Intellectual property transferred upon delivery. What you pay for, you own.",
    },
  },
  {
    icon: ShieldCheck,
    title: { pt: "Garantia & suporte", en: "Warranty & support" },
    description: {
      pt: "Período de garantia pós-entrega para correções, com suporte combinado em contrato.",
      en: "Post-delivery warranty period for fixes, with support agreed in the contract.",
    },
  },
];

export default function SegurancaJuridica() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <section className="border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "Segurança jurídica pra você", en: "Legal security for you" }}
          kicker={{ pt: "Contrato, escopo e código na entrega", en: "Contract, scope and code on delivery" }}
        />
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={t(item.title)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/10 text-violet-300">
                <item.icon className="h-[22px] w-[22px]" />
              </div>
              <h3 className="mb-1.5 mt-3 text-base font-semibold text-white">{t(item.title)}</h3>
              <p className="text-[13.5px] text-zinc-400">{t(item.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
