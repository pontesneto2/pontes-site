import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estudo de Caso — iMidooh",
  description:
    "Construção de uma plataforma SaaS escalável para gerenciamento de mídia DOOH, com arquitetura modular, containerização Docker e preparação multi-tenant.",
};

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
