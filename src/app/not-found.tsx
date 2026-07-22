"use client";

import Link from "next/link";
import { Compass, Home } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr } from "@/lib/language-context";

export default function NotFound() {
  const { lang } = useLanguage();

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] flex items-center justify-center bg-[#0a0a0d] text-zinc-200 px-6">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/25 bg-violet-500/10">
            <Compass className="h-7 w-7 text-violet-300" />
          </div>
          <div
            className="text-6xl font-bold"
            style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#e879f9" }}
          >
            404
          </div>
          <h1 className="mt-3 text-xl font-semibold text-white">
            {tr(lang, { pt: "Essa rota não existe", en: "This route doesn't exist" })}
          </h1>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            {tr(lang, {
              pt: "A página que você procura foi movida, renomeada ou nunca existiu. Volte para a home ou confira os projetos.",
              en: "The page you're looking for was moved, renamed, or never existed. Head back home or check out the projects.",
            })}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-fuchsia-700/20"
            >
              <Home className="h-4 w-4" />
              {tr(lang, { pt: "Voltar para o início", en: "Back to home" })}
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-white/15 text-zinc-200 hover:bg-white/5 text-sm font-medium transition-colors"
            >
              {tr(lang, { pt: "Ver o blog", en: "See the blog" })}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
