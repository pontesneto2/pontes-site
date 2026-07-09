"use client";

import { Search } from "lucide-react";
import type { Bilingual } from "@/lib/language-context";

export default function SearchBox({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  searchResults,
  onSelect,
  t,
  align = "right",
}: {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: Array<{ label: string; href: string; group: Bilingual }>;
  onSelect: (href: string) => void;
  t: (v: Bilingual) => string;
  align?: "left" | "right";
}) {
  return (
    <div className="relative" data-search-box>
      <button
        type="button"
        onClick={() => setSearchOpen(!searchOpen)}
        aria-expanded={searchOpen}
        aria-label={t({ pt: "Buscar", en: "Search" })}
        className="inline-flex items-center justify-center p-1.5 text-zinc-300 hover:text-white transition-colors"
      >
        <Search className="h-[18px] w-[18px]" />
      </button>
      {searchOpen && (
        <div
          className={`absolute top-full mt-2 ${
            align === "right" ? "right-0" : "left-0"
          } w-64 rounded-xl border border-white/10 bg-[#141418] shadow-2xl p-2 z-50`}
        >
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t({ pt: "Buscar no site...", en: "Search the site..." })}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-violet-400/50"
          />
          {searchQuery.trim().length > 0 && (
            <div className="mt-2 max-h-64 overflow-y-auto flex flex-col gap-0.5">
              {searchResults.length > 0 ? (
                searchResults.map((r, i) => (
                  <button
                    key={`${r.href}-${r.label}-${i}`}
                    type="button"
                    onClick={() => onSelect(r.href)}
                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-200 hover:bg-white/5 transition-colors"
                  >
                    <span className="truncate">{r.label}</span>
                    <span className="text-[10px] uppercase tracking-wide text-zinc-500 shrink-0">
                      {t(r.group)}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-xs text-zinc-500">
                  {t({ pt: "Nada encontrado", en: "No results" })}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
