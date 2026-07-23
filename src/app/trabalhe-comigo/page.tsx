"use client";

import SiteHeader, { type SearchEntry } from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr } from "@/lib/language-context";
import { PropostaPrefillProvider } from "@/lib/proposta/prefill-context";
import HeroComercial from "@/components/trabalhe-comigo/HeroComercial";
import MarqueeIdealizadores from "@/components/trabalhe-comigo/MarqueeIdealizadores";
import OQueEuConstruo from "@/components/trabalhe-comigo/OQueEuConstruo";
import ComoEuTrabalho from "@/components/trabalhe-comigo/ComoEuTrabalho";
import GeradorProposta from "@/components/trabalhe-comigo/GeradorProposta";
import CasosReais from "@/components/trabalhe-comigo/CasosReais";
import ComoFuncionaInvestimento from "@/components/trabalhe-comigo/ComoFuncionaInvestimento";
import SegurancaJuridica from "@/components/trabalhe-comigo/SegurancaJuridica";
import FaqAccordion from "@/components/trabalhe-comigo/FaqAccordion";
import ContatoSection from "@/components/trabalhe-comigo/ContatoSection";
import SobreMim from "@/components/trabalhe-comigo/SobreMim";
import FloatingMobileCTA from "@/components/trabalhe-comigo/FloatingMobileCTA";
import Preloader from "@/components/Preloader";
import { FAQ_ITEMS } from "@/components/trabalhe-comigo/faq-data";

const NAV_LINKS = [
  { href: "/trabalhe-comigo#servicos", label: { pt: "Serviços", en: "Services" } },
  { href: "/trabalhe-comigo#casos", label: { pt: "Portfólio", en: "Portfolio" } },
  { href: "/trabalhe-comigo#investimento", label: { pt: "Investimento", en: "Investment" } },
  { href: "/trabalhe-comigo#contato", label: { pt: "Contato", en: "Contact" } },
];

export default function TrabalheComigoPage() {
  const { lang } = useLanguage();
  const t = (v: { pt: string; en: string }) => tr(lang, v);

  const searchIndex: SearchEntry[] = [
    ...NAV_LINKS.map((link) => ({
      label: t(link.label),
      href: link.href,
      group: { pt: "Seção", en: "Section" },
    })),
    ...FAQ_ITEMS.map((item) => ({
      label: t(item.question),
      href: "/trabalhe-comigo#faq",
      group: { pt: "FAQ", en: "FAQ" },
    })),
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Preloader />
      <SiteHeader
        navLinks={NAV_LINKS}
        searchIndex={searchIndex}
        cta={{ label: { pt: "Monte sua proposta", en: "Build my proposal" }, href: "#proposta" }}
      />
      <HeroComercial />
      <MarqueeIdealizadores />
      <PropostaPrefillProvider>
        <OQueEuConstruo />
        <GeradorProposta />
      </PropostaPrefillProvider>
      <ComoEuTrabalho />
      <ComoFuncionaInvestimento />
      <SegurancaJuridica />
      <CasosReais />
      <FaqAccordion />
      <section
        id="contato"
        className="scroll-mt-20 border-t border-white/10 py-20"
        style={{ backgroundColor: "#101018" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SobreMim />
            <ContatoSection />
          </div>
        </div>
      </section>
      <SiteFooter />
      <FloatingMobileCTA />
    </div>
  );
}
