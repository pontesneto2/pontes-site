import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pontes — Portfolio",
  description: "Do esboço ao deploy: design, engenharia e impacto real.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen text-zinc-200 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(124,58,237,0.32),transparent_60%),radial-gradient(1000px_500px_at_100%_10%,rgba(168,85,247,0.22),transparent_60%),linear-gradient(180deg,#0a0a0b,#0a0a0b)]">
        {children}
      </body>
    </html>
  );
}
