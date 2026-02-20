import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estudo de Caso — ERP Estrela",
  description:
    "Sistema Financeiro Corporativo para estruturar rotinas financeiras, com arquitetura modular, integridade de dados e preparação para crescimento.",
};

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
