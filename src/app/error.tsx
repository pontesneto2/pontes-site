"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { lang } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0d] text-zinc-200 px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/10">
          <AlertTriangle className="h-7 w-7 text-red-300" />
        </div>
        <h1 className="text-xl font-semibold text-white">
          {tr(lang, { pt: "Algo deu errado", en: "Something went wrong" })}
        </h1>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          {tr(lang, {
            pt: "Um erro inesperado aconteceu ao carregar essa página. Você pode tentar de novo ou voltar para a home.",
            en: "An unexpected error happened while loading this page. You can try again or head back home.",
          })}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-fuchsia-700/20"
          >
            <RotateCcw className="h-4 w-4" />
            {tr(lang, { pt: "Tentar de novo", en: "Try again" })}
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-white/15 text-zinc-200 hover:bg-white/5 text-sm font-medium transition-colors"
          >
            <Home className="h-4 w-4" />
            {tr(lang, { pt: "Voltar para o início", en: "Back to home" })}
          </Link>
        </div>
      </div>
    </main>
  );
}
