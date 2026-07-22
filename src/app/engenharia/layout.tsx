import type { Metadata } from "next";

const title = "Engenharia deste site";
const description =
  "Como o próprio fcopts.com.br é construído: stack, CI/CD, decisões técnicas e score de performance medido ao vivo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/engenharia",
  },
  openGraph: {
    type: "article",
    url: "/engenharia",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function EngenhariaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
