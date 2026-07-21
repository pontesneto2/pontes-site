import type { Metadata } from "next";
import CaseJsonLd from "@/components/case/CaseJsonLd";

const title = "Estudo de Caso: iMidooh";
const description =
  "Construção de uma plataforma SaaS escalável para gerenciamento de mídia DOOH, com arquitetura modular, containerização Docker e preparação multi-tenant.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/imidooh",
    languages: {
      "pt-BR": "/case/imidooh",
      en: "/en/case/imidooh",
      "x-default": "/case/imidooh",
    },
  },
  openGraph: {
    type: "article",
    url: "/case/imidooh",
    title,
    description,
    images: [
      {
        url: "/logo-dooh.png",
        width: 1200,
        height: 630,
        alt: "iMidooh — Gerenciamento de Mídia DOOH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-dooh.png"],
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
        slug="imidooh"
        headline={title}
        description={description}
        image="/logo-dooh.png"
        datePublished="2026-02-20"
        dateModified="2026-07-20"
      />
      {children}
    </>
  );
}
