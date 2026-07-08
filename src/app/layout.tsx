import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/lib/language-context";
import { spaceGrotesk, jetbrainsMono } from "@/lib/fonts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fcopts.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Francisco Pontes — Engenheiro de Software Full Stack",
    template: "%s — Francisco Pontes",
  },
  description:
    "Portfólio de Francisco Pontes, Engenheiro de Software Full Stack em Fortaleza. Experiência em React, Next.js, Node.js, TypeScript e DevOps — do esboço ao deploy.",
  applicationName: "Portfólio — Francisco Pontes",
  authors: [{ name: "Francisco Pontes" }],
  creator: "Francisco Pontes",
  publisher: "Francisco Pontes",
  keywords: [
    "Francisco Pontes",
    "Portfólio",
    "Engenheiro de Software",
    "Desenvolvedor Full Stack",
    "Software Engineer",
    "Full Stack Developer",
    "Fortaleza",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "UX/UI",
    "DevOps",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Francisco Pontes — Portfólio",
    title: "Francisco Pontes — Engenheiro de Software Full Stack",
    description:
      "Portfólio de Francisco Pontes, Engenheiro de Software Full Stack em Fortaleza. Experiência em React, Next.js, Node.js, TypeScript e DevOps — do esboço ao deploy.",
    images: [
      {
        url: "/images/img-link-site-fcopts.png",
        width: 1200,
        height: 675,
        alt: "Francisco Pontes — Engenheiro de Software Full Stack",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francisco Pontes — Engenheiro de Software Full Stack",
    description:
      "Portfólio de Francisco Pontes, Engenheiro de Software Full Stack em Fortaleza. Experiência em React, Next.js, Node.js, TypeScript e DevOps — do esboço ao deploy.",
    images: ["/images/img-link-site-fcopts.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0d",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Francisco Pontes",
  alternateName: "FCOPTS",
  url: siteUrl,
  image: `${siteUrl}/pontes.jpg`,
  jobTitle: "Engenheiro de Software",
  description:
    "Engenheiro de Software Full Stack em Fortaleza, especializado em React, Next.js, Node.js, TypeScript, DevOps e UX/UI.",
  email: "mailto:contato@fcopts.com.br",
  sameAs: [
    "https://github.com/pontesneto2",
    "https://www.linkedin.com/in/fcopts",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Star Capital",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "React Native",
    "DevOps",
    "UX/UI Design",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="overflow-x-clip">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`min-h-screen overflow-x-clip text-zinc-200 bg-[#0a0a0d] ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
