"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export type Lang = "pt" | "en";

export const LANG_FLAG: Record<Lang, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
};

type LanguageContextValue = {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "fcopts-lang";

function isEnRoute(pathname: string | null) {
  return pathname === "/en" || (pathname?.startsWith("/en/") ?? false);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const routeLocked = isEnRoute(pathname);

  const [lang, setLangState] = useState<Lang>(routeLocked ? "en" : "pt");

  useEffect(() => {
    if (routeLocked) {
      setLangState("en");
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") {
      setLangState(stored);
      return;
    }
    const browserLang = window.navigator.language.toLowerCase();
    if (!browserLang.startsWith("pt")) setLangState("en");
  }, [routeLocked]);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    // "/" and "/en" are real SSR'd pages in each language: switching there
    // navigates instead of just flipping client state, so search engines
    // and share links land on indexable, language-correct URLs.
    const setLang = (next: Lang) => {
      if (next === lang) return;
      if (pathname === "/" && next === "en") {
        router.push("/en");
        return;
      }
      if (pathname === "/en" && next === "pt") {
        router.push("/");
        return;
      }
      window.localStorage.setItem(STORAGE_KEY, next);
      setLangState(next);
    };

    return {
      lang,
      setLang,
      toggleLang: () => setLang(lang === "pt" ? "en" : "pt"),
    };
  }, [lang, pathname, router]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export type Bilingual = { pt: string; en: string };

export function tr(lang: Lang, value: Bilingual) {
  return lang === "pt" ? value.pt : value.en;
}
