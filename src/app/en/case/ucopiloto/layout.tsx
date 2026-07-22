import type { Metadata } from "next";

const title = "Case Study: Ucopiloto";
const description =
  "App that connects drivers and repair shops intelligently, from scratch to commercial launch: lean architecture, solo DevOps operation, and 99.9% production uptime.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/case/ucopiloto",
    languages: {
      "pt-BR": "/case/ucopiloto",
      en: "/en/case/ucopiloto",
      "x-default": "/case/ucopiloto",
    },
  },
  openGraph: {
    type: "article",
    url: "/en/case/ucopiloto",
    title,
    description,
    locale: "en_US",
    alternateLocale: "pt_BR",
    images: [
      {
        url: "/images/estudo-de-caso-ucopiloto.png",
        width: 1920,
        height: 1080,
        alt: "Ucopiloto: provider dashboard and driver app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/estudo-de-caso-ucopiloto.png"],
  },
};

export default function EnCaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
