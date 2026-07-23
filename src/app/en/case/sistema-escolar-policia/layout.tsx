import type { Metadata } from "next";

const title = "Case Study: 2nd CPM-CHMJ School System";
const description =
  "COM3 academic management system for the 2nd Military Police School Coronel Hervano Macêdo Júnior, with an AWS cloud backend, SEDUC's Aluno Online portal and an integrated EAD environment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/case/sistema-escolar-policia",
    languages: {
      "pt-BR": "/case/sistema-escolar-policia",
      en: "/en/case/sistema-escolar-policia",
      "x-default": "/case/sistema-escolar-policia",
    },
  },
  openGraph: {
    type: "article",
    url: "/en/case/sistema-escolar-policia",
    title,
    description,
    locale: "en_US",
    alternateLocale: "pt_BR",
    images: [
      {
        url: "/images/capa-sistema-policia.png",
        width: 1920,
        height: 1080,
        alt: "2nd Military Police School Coronel Hervano Macêdo Júnior school system",
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

export default function EnCaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
