import type { Metadata } from "next";

const title = "Estudo de Caso — ERP Estrela";
const description =
  "Sistema Financeiro Corporativo para estruturar rotinas financeiras, com arquitetura modular, integridade de dados e preparação para crescimento.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/erp-estrela",
  },
  openGraph: {
    type: "article",
    url: "/case/erp-estrela",
    title,
    description,
    images: [
      {
        url: "/logo-estrela.png",
        width: 1200,
        height: 630,
        alt: "ERP Estrela — Sistema Financeiro Corporativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-estrela.png"],
  },
};

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
