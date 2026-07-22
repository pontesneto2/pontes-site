import type { Metadata } from "next";

const title = "Hire a senior software engineer";
const description =
  "Custom systems, websites and apps, from idea to launch. Senior full stack engineer, remote (PT/EN), with a contract, fixed scope, and your code delivered.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/trabalhe-comigo",
    languages: {
      "pt-BR": "/trabalhe-comigo",
      en: "/en/trabalhe-comigo",
      "x-default": "/trabalhe-comigo",
    },
  },
  openGraph: {
    type: "website",
    url: "/en/trabalhe-comigo",
    siteName: "Francisco Pontes",
    locale: "en_US",
    alternateLocale: "pt_BR",
    title,
    description,
    images: [
      {
        url: "/images/capa-img-link-public.png",
        width: 1920,
        height: 1080,
        alt: "Francisco Pontes: Hire me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/capa-img-link-public.png"],
  },
};

export default function EnTrabalheComigoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
