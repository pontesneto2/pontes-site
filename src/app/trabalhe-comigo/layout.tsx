import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/components/trabalhe-comigo/faq-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fcopts.com.br";

const title = "Contrate um engenheiro de software sênior";
const description =
  "Sistemas, sites e aplicativos sob medida, do esboço ao deploy. Engenheiro full stack sênior, remoto (PT/EN), com contrato, escopo fechado e código seu na entrega.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/trabalhe-comigo",
  },
  openGraph: {
    type: "website",
    url: "/trabalhe-comigo",
    title: "Software sob medida, do esboço ao deploy | Francisco Pontes",
    description:
      "Sistemas, sites e apps construídos por um engenheiro full stack sênior. Proposta na hora com IA, contrato e código seu na entrega.",
    images: [
      {
        url: "/images/img-link-site-fcopts.png",
        width: 1200,
        height: 675,
        alt: "Francisco Pontes — Trabalhe comigo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software sob medida, do esboço ao deploy | Francisco Pontes",
    description,
    images: ["/images/img-link-site-fcopts.png"],
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Francisco Pontes | Desenvolvimento de Software Sob Medida",
  description:
    "Sistemas web, aplicativos mobile e sites sob medida. Engenheiro full stack sênior, remoto.",
  url: `${siteUrl}/trabalhe-comigo`,
  image: `${siteUrl}/pontes-institucional.png`,
  email: "contato@fcopts.com.br",
  areaServed: "Remoto (Brasil e exterior)",
  availableLanguage: ["pt-BR", "en"],
  provider: {
    "@type": "Person",
    name: "Francisco Pontes",
    jobTitle: "Engenheiro de Software Full Stack Sênior",
    url: siteUrl,
  },
  sameAs: ["https://github.com/pontesneto2", "https://www.linkedin.com/in/fcopts"],
};

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question.pt,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer.pt,
    },
  })),
};

export default function TrabalheComigoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      {children}
    </>
  );
}
