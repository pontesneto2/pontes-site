import type { Metadata } from "next";

const title = "Para recrutadores";
const description =
  "Resumo direto para recrutadores: disponibilidade, modelo de trabalho, stack principal, senioridade e contato de Francisco Pontes, Engenheiro de Software Full Stack.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/recrutadores",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/recrutadores",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RecrutadoresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
