import type { Metadata } from "next";

const title = "Francisco Pontes: Full Stack Software Engineer";
const description =
  "Portfolio of Francisco Pontes, Full Stack Software Engineer based in Fortaleza, Brazil. Experience in React, Next.js, Node.js, TypeScript and DevOps, from idea to launch.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/en",
    languages: {
      "pt-BR": "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/en",
    siteName: "Francisco Pontes: Portfolio",
    title,
    description,
    images: [
      {
        url: "/images/img-link-site-fcopts.png",
        width: 1200,
        height: 675,
        alt: title,
      },
    ],
    locale: "en_US",
    alternateLocale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/img-link-site-fcopts.png"],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
