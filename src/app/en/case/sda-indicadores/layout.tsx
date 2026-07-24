import type { Metadata } from "next";
import CaseJsonLd from "@/components/case/CaseJsonLd";

const title = "Case Study: IDA — Demand and Action Indicators (SDA Ceará)";
const description =
  "Business Intelligence dashboard for the State Agrarian Development Secretariat of Ceará: registering, tracking and visualizing demand and action indicators across the state's 184 municipalities.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/case/sda-indicadores",
    languages: {
      "pt-BR": "/case/sda-indicadores",
      en: "/en/case/sda-indicadores",
      "x-default": "/case/sda-indicadores",
    },
  },
  openGraph: {
    type: "article",
    url: "/en/case/sda-indicadores",
    title,
    description,
    locale: "en_US",
    alternateLocale: "pt_BR",
    images: [
      {
        url: "/images/capa-id.png",
        width: 3840,
        height: 2160,
        alt: "IDA: Demand and Action Indicators dashboard for SDA Ceará",
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
