import type { Metadata } from "next";

const title = "Privacy Policy: Francisco Pontes";
const description =
  "Privacy policy for Francisco Pontes' personal website, in compliance with Brazil's LGPD (Law No. 13.709/2018).";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/en/privacidade",
    languages: {
      "pt-BR": "/privacidade",
      en: "/en/privacidade",
      "x-default": "/privacidade",
    },
  },
  openGraph: {
    type: "website",
    url: "/en/privacidade",
    title,
    description,
    locale: "en_US",
    alternateLocale: "pt_BR",
    images: [
      {
        url: "/images/img-link-site-fcopts.png",
        width: 1200,
        height: 675,
        alt: "Francisco Pontes: Full Stack Software Engineer",
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

export default function EnPrivacidadeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
