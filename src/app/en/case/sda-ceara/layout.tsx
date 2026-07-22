import type { Metadata } from "next";

const title = "Case Study: SDA Ceará";
const description =
  "App + Web + Admin for the Ceará State Agrarian Development Secretariat: modular migration of a legacy system to production, with 1,000+ active users and 200+ concurrent logins orchestrated on Kubernetes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/case/sda-ceara",
    languages: {
      "pt-BR": "/case/sda-ceara",
      en: "/en/case/sda-ceara",
      "x-default": "/case/sda-ceara",
    },
  },
  openGraph: {
    type: "article",
    url: "/en/case/sda-ceara",
    title,
    description,
    locale: "en_US",
    alternateLocale: "pt_BR",
    images: [
      {
        url: "/images/capa-sda-app.png",
        width: 1920,
        height: 1080,
        alt: "SDA Ceará: State Government agrarian management app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/capa-sda-app.png"],
  },
};

export default function EnCaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
