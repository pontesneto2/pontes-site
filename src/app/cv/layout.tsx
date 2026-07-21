import type { Metadata } from "next";

const title = "Currículo";
const description =
  "Currículo de Francisco Pontes, Engenheiro de Software Full Stack, em português e inglês, para download em PDF ou leitura direto no navegador.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/cv",
  },
  openGraph: {
    type: "website",
    url: "/cv",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
