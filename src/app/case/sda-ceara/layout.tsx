import type { Metadata } from "next";
import CaseJsonLd from "@/components/case/CaseJsonLd";

const title = "SDA Ceará — Estudo de Caso de Engenharia Mobile";
const description =
  "Estudo de caso de engenharia por Francisco Pontes, desenvolvedor mobile: evolução do app oficial da Secretaria do Desenvolvimento Agrário do Ceará (SDA) — migração modular de um sistema legado para produção, com 1.000+ usuários ativos e 200+ logins simultâneos orquestrados em Kubernetes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/sda-ceara",
    languages: {
      "pt-BR": "/case/sda-ceara",
      en: "/en/case/sda-ceara",
      "x-default": "/case/sda-ceara",
    },
  },
  openGraph: {
    type: "article",
    url: "/case/sda-ceara",
    title,
    description,
    locale: "pt_BR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/capa-sda-app-v2.png",
        width: 1920,
        height: 1080,
        alt: "Estudo de caso de engenharia mobile de Francisco Pontes: app SDA Ceará (Governo do Estado)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/capa-sda-app-v2.png"],
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
        slug="sda-ceara"
        headline={title}
        description={description}
        image="/images/capa-sda-app-v2.png"
        datePublished="2026-07-20"
        dateModified="2026-07-20"
      />
      {children}
    </>
  );
}
