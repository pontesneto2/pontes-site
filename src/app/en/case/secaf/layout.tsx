import type { Metadata } from "next";
import CaseJsonLd from "@/components/case/CaseJsonLd";

const title = "Case Study: SECAF — Family Farming Registry (SDA Ceará)";
const description =
  "State registry system for family farmers, entrepreneurs and cooperatives, with a notice, quotation and proposal flow for Ceará's State Family Farming Food Acquisition Policy.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/case/secaf",
    languages: {
      "pt-BR": "/case/secaf",
      en: "/en/case/secaf",
      "x-default": "/case/secaf",
    },
  },
  openGraph: {
    type: "article",
    url: "/en/case/secaf",
    title,
    description,
    locale: "en_US",
    alternateLocale: "pt_BR",
    images: [
      {
        url: "/images/capa-secaff.png",
        width: 1200,
        height: 630,
        alt: "SECAF — State Registry System for Family Farmers",
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
