import type { Metadata } from "next";
import CaseJsonLd from "@/components/case/CaseJsonLd";

const title = "Estudo de Caso: PAA-Leite — Programa do Leite (SDA Ceará)";
const description =
  "Sistema de gestão operacional do PAA-Leite para a Secretaria do Desenvolvimento Agrário do Ceará: validação de produtores, cadastro de beneficiários e monitoramento de tanques e entregas de leite por laticínio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/paa-leite",
    languages: {
      "pt-BR": "/case/paa-leite",
      en: "/en/case/paa-leite",
      "x-default": "/case/paa-leite",
    },
  },
  openGraph: {
    type: "article",
    url: "/case/paa-leite",
    title,
    description,
    locale: "pt_BR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/capa-paa-leite.png",
        width: 1200,
        height: 630,
        alt: "PAA-Leite — Sistema do Programa de Aquisição de Alimentos, modalidade Leite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/capa-paa-leite.png"],
  },
};

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CaseJsonLd
        slug="paa-leite"
        headline={title}
        description={description}
        image="/images/capa-paa-leite.png"
        datePublished="2026-07-27"
        dateModified="2026-07-27"
      />
      {children}
    </>
  );
}
