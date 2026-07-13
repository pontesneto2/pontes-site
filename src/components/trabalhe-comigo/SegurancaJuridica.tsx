"use client";

import { FileCheck, ClipboardList, Receipt, Lock, Code2, ShieldCheck, type LucideIcon } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import TcSectionHeader from "./TcSectionHeader";
import Reveal from "./Reveal";

const ITEMS: Array<{ icon: LucideIcon; title: Bilingual; description: Bilingual }> = [
  {
    icon: FileCheck,
    title: { pt: "Contrato de prestação", en: "Service agreement" },
    description: {
      pt: "Serviço, prazos, valores e responsabilidades formalizados antes de começar.",
      en: "Service, timelines, prices and responsibilities formalized before starting.",
    },
  },
  {
    icon: ClipboardList,
    title: { pt: "Escopo documentado", en: "Documented scope" },
    description: {
      pt: "Proposta detalhada, com o que está e o que não está incluído. Sem zona cinzenta.",
      en: "Detailed proposal, with what's included and what isn't. No gray areas.",
    },
  },
  {
    icon: Receipt,
    title: { pt: "Nota fiscal", en: "Invoice" },
    description: {
      pt: "Emissão de NF pra cada pagamento, tudo dentro da legalidade.",
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
    icon: Code2,
    title: { pt: "O código é seu", en: "The code is yours" },
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
    <section className="border-t border-white/10 py-20" style={{ backgroundColor: "#08080b" }}>
      <div className="mx-auto max-w-7xl px-6">
        <TcSectionHeader
          label={{ pt: "Segurança", en: "Security" }}
          title={{ pt: "Você contrata com segurança, do início ao fim", en: "You hire with confidence, from start to finish" }}
          subtitle={{
            pt: "Contrato, escopo, nota fiscal e o código fonte é seu",
            en: "Contract, scope, invoice and the source code is yours",
          }}
        />

        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id="tc-orange-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fb923c" />
              <stop offset="1" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>

        <div className="mx-auto grid max-w-[920px] grid-cols-1 gap-x-12 md:grid-cols-2">
          {ITEMS.map((item, i) => (
            <Reveal key={t(item.title)} delay={i * 0.08} className="flex items-start gap-4 border-b border-white/[0.08] py-5">
              <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full border border-orange-400/25">
                <item.icon className="h-[21px] w-[21px]" strokeWidth={1.75} style={{ stroke: "url(#tc-orange-grad)" }} />
              </span>
              <div>
                <h3 className="text-[16.5px] font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {t(item.title)}
                </h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[#9a9aa7]">{t(item.description)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
