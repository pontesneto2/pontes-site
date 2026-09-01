"use client";

import SiteHeader, { type SearchEntry } from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import HeroComercial from "@/components/trabalhe-comigo/HeroComercial";
import MarqueeIdealizadores from "@/components/trabalhe-comigo/MarqueeIdealizadores";
import OQueEuConstruo from "@/components/trabalhe-comigo/OQueEuConstruo";
import ComoEuTrabalho from "@/components/trabalhe-comigo/ComoEuTrabalho";
import GoogleReviews from "@/components/trabalhe-comigo/GoogleReviews";
import ComoFuncionaInvestimento from "@/components/trabalhe-comigo/ComoFuncionaInvestimento";
import SegurancaJuridica from "@/components/trabalhe-comigo/SegurancaJuridica";
import FaqAccordion from "@/components/trabalhe-comigo/FaqAccordion";
import ContatoSection from "@/components/trabalhe-comigo/ContatoSection";
import FloatingMobileCTA from "@/components/trabalhe-comigo/FloatingMobileCTA";
import Preloader from "@/components/Preloader";
import { FAQ_ITEMS } from "@/components/trabalhe-comigo/faq-data";

const NAV_LINKS = [
  { href: "/trabalhe-comigo#servicos", label: { pt: "Serviços", en: "Services" } },
  { href: "/trabalhe-comigo#investimento", label: { pt: "Investimento", en: "Investment" } },
  { href: "/trabalhe-comigo#contato", label: { pt: "Contato", en: "Contact" } },
];

const IMPACT_STATS: Array<{ value: string; label: Bilingual }> = [
  { value: "30+", label: { pt: "Plataformas entregues", en: "Platforms delivered" } },
  { value: "99.7%", label: { pt: "Uptime\nmédio", en: "Average\nuptime" } },
  { value: "6+", label: { pt: "Anos de\nexperiência", en: "Years of\nexperience" } },
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
        cta={null}
      />
      <HeroComercial />
      <MarqueeIdealizadores />
      <OQueEuConstruo />
      <ComoEuTrabalho />
      <ComoFuncionaInvestimento />
      <SegurancaJuridica />
      <FaqAccordion />
      <GoogleReviews />
      <section
        id="contato"
        className="scroll-mt-20 border-t border-white/10 py-20"
        style={{ backgroundColor: "#101018" }}
      >
        <div className="mx-auto max-w-7xl px-6 xs:px-7 sm:px-8 lg:px-12 2xl:max-w-8xl">
          <div className="mx-auto max-w-2xl">
            <ContatoSection />
          </div>
        </div>
      </section>
      <SiteFooter impactStats={IMPACT_STATS} />
      <FloatingMobileCTA />
    </div>
  );
}
