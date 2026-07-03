import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/lib/language-context";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fcopts.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Francisco Pontes - Engenheiro de Software",
    template: "%s — Francisco Pontes",
  },
  description: "Do esboço ao deploy: design, engenharia e impacto real.",
  applicationName: "Portfólio — Francisco Pontes",
  authors: [{ name: "Francisco Pontes" }],
  creator: "Francisco Pontes",
  publisher: "Francisco Pontes",
  keywords: [
    "Francisco Pontes",
    "Portfólio",
    "Engenheiro de Software",
    "Desenvolvedor Full Stack",
    "Next.js",
    "React",
    "TypeScript",
    "UX",
    "DevOps",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Francisco Pontes — Portfólio",
    title: "Francisco Pontes — Portfólio",
    description: "Do esboço ao deploy: design, engenharia e impacto real.",
    images: [
      {
        url: "/pontes.jpg",
        width: 1200,
        height: 630,
        alt: "Francisco Pontes — Portfólio",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francisco Pontes — Portfólio",
    description: "Do esboço ao deploy: design, engenharia e impacto real.",
    images: ["/pontes.jpg"],
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
  themeColor: "#141418",
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
    "Engenheiro de Software especializado em desenvolvimento Web/Mobile, DevOps e UX/UI.",
  email: "mailto:pontesneto2@gmail.com",
  sameAs: [
    "https://github.com/pontesneto2",
    "https://www.linkedin.com/in/fcopts",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Grupo Star Financeira",
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
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen overflow-x-hidden text-zinc-200 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(124,58,237,0.34),transparent_62%),radial-gradient(1100px_600px_at_100%_10%,rgba(168,85,247,0.24),transparent_62%),radial-gradient(900px_500px_at_0%_25%,rgba(217,70,239,0.12),transparent_60%),linear-gradient(180deg,#151519,#141418)]">
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
