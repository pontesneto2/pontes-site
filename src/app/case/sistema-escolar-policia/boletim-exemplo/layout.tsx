import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exemplo de Boletim — Sistema Escolar 2º CPM-CHMJ",
  description:
    "Protótipo de boletim individual pronto para impressão/PDF, ilustrando o estudo de caso do Sistema Escolar 2º CPM-CHMJ.",
  robots: { index: false, follow: false },
};

export default function BoletimExemploLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
