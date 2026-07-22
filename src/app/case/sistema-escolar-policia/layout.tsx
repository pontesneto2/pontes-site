import type { Metadata } from "next";

const title = "Estudo de Caso: Sistema Escolar 2º CPM-CHMJ";
const description =
  "Sistema COM3 de gestão acadêmica para o 2º Colégio da Polícia Militar Coronel Hervano Macêdo Júnior, com backend em nuvem AWS, portal Aluno Online da SEDUC e ambiente EAD integrado.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/sistema-escolar-policia",
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
        url: "/images/capa-sistema-policia.png",
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
    images: ["/images/capa-sistema-policia.png"],
  },
};

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
