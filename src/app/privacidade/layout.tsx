import type { Metadata } from "next";

const title = "Política de Privacidade — Francisco Pontes";
const description =
  "Política de privacidade do site pessoal de Francisco Pontes, em conformidade com a LGPD (Lei nº 13.709/2018).";

export const metadata: Metadata = {
  // `absolute` evita que o template "%s — Francisco Pontes" do layout raiz
  // duplique o sufixo (o título já o inclui).
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/privacidade",
  },
  openGraph: {
    type: "website",
    url: "/privacidade",
    title,
    description,
    images: [
      {
        url: "/images/img-link-site-fcopts.png",
        width: 1200,
        height: 675,
        alt: "Francisco Pontes — Engenheiro de Software Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/img-link-site-fcopts.png"],
  },
};

export default function PrivacidadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
