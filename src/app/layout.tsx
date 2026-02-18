import type { Metadata } from "next";
import "./globals.css";
import RobotSidekick from "@/components/RobotSidekick";

export const metadata: Metadata = {
  title: "Pontes — Portfolio",
  description: "Do esboço ao deploy: design, engenharia e impacto real.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen text-zinc-200 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(124,58,237,0.34),transparent_62%),radial-gradient(1100px_600px_at_100%_10%,rgba(168,85,247,0.24),transparent_62%),radial-gradient(900px_500px_at_0%_25%,rgba(217,70,239,0.12),transparent_60%),linear-gradient(180deg,#151519,#141418)]">
        <RobotSidekick />
        {children}
      </body>
    </html>
  );
}
