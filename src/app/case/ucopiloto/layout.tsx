import type { Metadata } from "next";

const title = "Estudo de Caso: Ucopiloto";
const description =
  "App que conecta motoristas e oficinas, do zero ao lançamento comercial: arquitetura enxuta, operação solo de DevOps e 99,9% de uptime em produção.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/case/ucopiloto",
  },
  openGraph: {
    type: "article",
    url: "/case/ucopiloto",
    title,
    description,
    images: [
      {
        url: "/images/estudo-de-caso-ucopiloto.png",
        width: 1920,
        height: 1080,
        alt: "Ucopiloto: painel do prestador e app do motorista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/estudo-de-caso-ucopiloto.png"],
  },
};

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
