"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") {
      setLangState(stored);
      return;
    }
    const browserLang = window.navigator.language.toLowerCase();
    if (!browserLang.startsWith("pt")) setLangState("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: (next: Lang) => {
        window.localStorage.setItem(STORAGE_KEY, next);
        setLangState(next);
      },
      toggleLang: () =>
        setLangState((prev) => {
          const next = prev === "pt" ? "en" : "pt";
          window.localStorage.setItem(STORAGE_KEY, next);
          return next;
        }),
    }),
    [lang]
  );

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
