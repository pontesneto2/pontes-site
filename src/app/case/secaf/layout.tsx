import type { Metadata } from "next";
import CaseJsonLd from "@/components/case/CaseJsonLd";

const title = "Estudo de Caso: SECAF — Cadastro da Agricultura Familiar (SDA Ceará)";
const description =
  "Sistema estadual de cadastro de agricultores familiares, empreendedores e cooperativas, com fluxo de editais, cotações e propostas para a Política Estadual de Aquisição de Alimentos da Agricultura Familiar do Ceará.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/secaf",
    languages: {
      "pt-BR": "/case/secaf",
      en: "/en/case/secaf",
      "x-default": "/case/secaf",
    },
  },
  openGraph: {
    type: "article",
    url: "/case/secaf",
    title,
    description,
    locale: "pt_BR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/capa-secaff.png",
        width: 1200,
        height: 630,
        alt: "SECAF — Sistema Estadual de Cadastro de Agricultores Familiares",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/capa-secaff.png"],
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
        slug="secaf"
        headline={title}
        description={description}
        image="/images/capa-secaff.png"
        datePublished="2026-07-24"
        dateModified="2026-07-24"
      />
      {children}
    </>
  );
}
