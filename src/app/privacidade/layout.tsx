import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — Francisco Pontes",
  description:
    "Política de privacidade do site pessoal de Francisco Pontes, em conformidade com a LGPD (Lei nº 13.709/2018).",
  alternates: {
    canonical: "/privacidade",
  },
};

export default function PrivacidadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
