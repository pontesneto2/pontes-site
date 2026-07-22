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
        url: "/images/img-link-site-fcopts.png",
        width: 1200,
        height: 675,
        alt: "Francisco Pontes: Hire me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/img-link-site-fcopts.png"],
  },
};

export default function EnTrabalheComigoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
