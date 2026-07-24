import type { Metadata } from "next";
import CaseJsonLd from "@/components/case/CaseJsonLd";

const title = "Estudo de Caso: IDA — Indicadores de Demandas e Ações (SDA Ceará)";
const description =
  "Painel de Business Intelligence para a Secretaria do Desenvolvimento Agrário do Ceará: cadastro, movimentação e visualização de indicadores de demandas e ações nos 184 municípios do estado.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/sda-indicadores",
    languages: {
      "pt-BR": "/case/sda-indicadores",
      en: "/en/case/sda-indicadores",
      "x-default": "/case/sda-indicadores",
    },
  },
  openGraph: {
    type: "article",
    url: "/case/sda-indicadores",
    title,
    description,
    locale: "pt_BR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/capa-id.png",
        width: 3840,
        height: 2160,
        alt: "IDA: painel de Indicadores de Demandas e Ações da SDA Ceará",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/capa-id.png"],
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
        slug="sda-indicadores"
        headline={title}
        description={description}
        image="/images/capa-id.png"
        datePublished="2026-07-24"
        dateModified="2026-07-24"
      />
      {children}
    </>
  );
}
