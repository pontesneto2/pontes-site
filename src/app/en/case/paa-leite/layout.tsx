import type { Metadata } from "next";
import CaseJsonLd from "@/components/case/CaseJsonLd";

const title = "Case Study: PAA-Leite — Ceará's Milk Program (SDA Ceará)";
const description =
  "Operational management system for PAA-Leite at the Ceará State Agrarian Development Secretariat: producer validation, beneficiary registration, and dairy tank and delivery monitoring.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/case/paa-leite",
    languages: {
      "pt-BR": "/case/paa-leite",
      en: "/en/case/paa-leite",
      "x-default": "/case/paa-leite",
    },
  },
  openGraph: {
    type: "article",
    url: "/en/case/paa-leite",
    title,
    description,
    locale: "en_US",
    alternateLocale: "pt_BR",
    images: [
      {
        url: "/images/capa-paa-leite.png",
        width: 1200,
        height: 630,
        alt: "PAA-Leite — Food Acquisition Program, Milk modality system",
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
