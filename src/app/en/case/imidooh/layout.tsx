import type { Metadata } from "next";

const title = "Case Study: iMidooh";
const description =
  "Building a scalable SaaS foundation for Digital Out Of Home media operations, focused on solid architecture, modular organization, and readiness for multi-tenant expansion.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/case/imidooh",
    languages: {
      "pt-BR": "/case/imidooh",
      en: "/en/case/imidooh",
      "x-default": "/case/imidooh",
    },
  },
  openGraph: {
    type: "article",
    url: "/en/case/imidooh",
    title,
    description,
    locale: "en_US",
    alternateLocale: "pt_BR",
    images: [
      {
        url: "/logo-dooh.png",
        width: 1200,
        height: 630,
        alt: "iMidooh: DOOH media management",
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

export default function EnCaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
