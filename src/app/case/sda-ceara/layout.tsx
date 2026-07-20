import type { Metadata } from "next";

const title = "Estudo de Caso: SDA Ceará";
const description =
  "App + Web + Admin para a Secretaria do Desenvolvimento Agrário do Ceará: migração modular de um sistema legado para produção, com 1.000+ usuários ativos e 200+ logins simultâneos orquestrados em Kubernetes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/sda-ceara",
  },
  openGraph: {
    type: "article",
    url: "/case/sda-ceara",
    title,
    description,
    images: [
      {
        url: "/images/capa-sda-app.png",
        width: 1920,
        height: 1080,
        alt: "SDA Ceará: aplicativo de gestão agrária do Governo do Estado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/capa-sda-app.png"],
  },
};

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
