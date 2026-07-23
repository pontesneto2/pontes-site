import type { Metadata } from "next";
import CaseJsonLd from "@/components/case/CaseJsonLd";

const title = "Estudo de Caso: Sistema Escolar 2º CPM-CHMJ";
const description =
  "Sistema COM3 de gestão acadêmica para o 2º Colégio da Polícia Militar Coronel Hervano Macêdo Júnior, com backend em nuvem AWS, portal Aluno Online da SEDUC e ambiente EAD integrado.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/sistema-escolar-policia",
    languages: {
      "pt-BR": "/case/sistema-escolar-policia",
      en: "/en/case/sistema-escolar-policia",
      "x-default": "/case/sistema-escolar-policia",
    },
  },
  openGraph: {
    type: "article",
    url: "/case/sistema-escolar-policia",
    title,
    description,
    locale: "pt_BR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/sistema-escolar-policia-redesign-hero.png",
        width: 1920,
        height: 1080,
        alt: "Sistema Escolar do 2º Colégio da Polícia Militar Coronel Hervano Macêdo Júnior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/sistema-escolar-policia-redesign-hero.png"],
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
        slug="sistema-escolar-policia"
        headline={title}
        description={description}
        image="/images/sistema-escolar-policia-redesign-hero.png"
        datePublished="2026-07-22"
        dateModified="2026-07-22"
      />
      {children}
    </>
  );
}
