"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LanguageSwitch from "@/components/LanguageSwitch";
import SearchBox from "@/components/SearchBox";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { CV_URL } from "@/lib/constants";

export type SearchEntry = { label: string; href: string; group: Bilingual };

export const DEFAULT_NAV_LINKS = [
  { href: "/", label: { pt: "Início", en: "Home" } },
  { href: "/#intro", label: { pt: "Sobre", en: "About" } },
  { href: "/#skills-tools", label: { pt: "Skills & Tools", en: "Skills & Tools" } },
  { href: "/#projects", label: { pt: "Projetos", en: "Projects" } },
  { href: "/#experience", label: { pt: "Trajetória", en: "Journey" } },
  { href: "/#about", label: { pt: "Contato", en: "Contact" } },
];

function goTo(href: string) {
  if (href.startsWith("/#") && window.location.pathname === "/") {
    document.querySelector(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = href;
  }
}

const DEFAULT_CTA = {
  label: { pt: "Baixar CV", en: "Download CV" } as Bilingual,
  href: CV_URL,
};

export default function SiteHeader({
  navLinks = DEFAULT_NAV_LINKS,
  searchIndex = [],
  cta = DEFAULT_CTA,
  secondaryCta,
  ctaBadge,
}: {
  navLinks?: Array<{ href: string; label: Bilingual }>;
  searchIndex?: SearchEntry[];
  cta?: { label: Bilingual; href: string };
  secondaryCta?: { label: Bilingual; href: string };
  ctaBadge?: Bilingual;
}) {
  const { lang, setLang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const ctaIsExternal = cta.href.startsWith("http");
  const secondaryIsExternal = secondaryCta?.href.startsWith("http") ?? false;

  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerBlurred, setHeaderBlurred] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 10) setHeaderBlurred(false);
      else if (currentY > lastY) setHeaderBlurred(true);
      else if (currentY < lastY) setHeaderBlurred(false);
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-search-box]")) setSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const searchResults =
    searchQuery.trim().length > 0
      ? searchIndex
          .filter((entry) => entry.label.toLowerCase().includes(searchQuery.trim().toLowerCase()))
          .slice(0, 7)
      : [];

  const handleSearchSelect = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    goTo(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        headerBlurred
          ? "border-white/10 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/30"
          : "border-white/5 bg-black/80"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 md:py-0 md:h-16">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/images/FCO.png"
              alt="FCOPTS — Francisco Pontes"
              width={2500}
              height={544}
              priority
              className="h-9 sm:h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white/90 text-zinc-300">
                  {t(link.label)}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitch lang={lang} setLang={setLang} />
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  {...(secondaryIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="px-3 py-1.5 rounded-xl border border-white/20 text-zinc-200 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {t(secondaryCta.label)}
                </a>
              )}
              <a
                href={cta.href}
                {...(ctaIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="relative px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-700/20"
              >
                {t(cta.label)}
                {ctaBadge && (
                  <span className="absolute -right-2.5 -top-2 rotate-12 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-zinc-950 shadow-md shadow-black/30">
                    {t(ctaBadge)}
                  </span>
                )}
              </a>
              <SearchBox
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                onSelect={handleSearchSelect}
                t={t}
                align="right"
              />
            </div>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitch lang={lang} setLang={setLang} compact />
            <SearchBox
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              onSelect={handleSearchSelect}
              t={t}
              align="right"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/25 hover:bg-black/35 p-2.5 transition-colors"
              onClick={() => setNavOpen(!navOpen)}
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
            >
              <span className="sr-only">{t({ pt: "Abrir menu", en: "Open menu" })}</span>
              {navOpen ? <X className="h-5 w-5 text-zinc-200" /> : <Menu className="h-5 w-5 text-zinc-200" />}
            </button>
          </div>
        </div>
      </div>

      {navOpen && (
        <div id="mobile-nav" className="md:hidden border-t border-white/5 bg-[#141418]">
          <div className="mx-auto max-w-7xl px-3 py-4 flex flex-col gap-2">
            <a
              href={cta.href}
              {...(ctaIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="relative text-center rounded-xl px-3 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium shadow-lg shadow-fuchsia-700/20"
              onClick={() => setNavOpen(false)}
            >
              {t(cta.label)}
              {ctaBadge && (
                <span className="absolute -top-2 right-3 rotate-12 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-zinc-950 shadow-md shadow-black/30">
                  {t(ctaBadge)}
                </span>
              )}
            </a>
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                {...(secondaryIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-center rounded-xl px-3 py-3 border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors"
                onClick={() => setNavOpen(false)}
              >
                {t(secondaryCta.label)}
              </a>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-200 text-sm rounded-xl px-3 py-3 hover:bg-gradient-to-r hover:from-violet-600/20 hover:to-fuchsia-500/20 transition-all"
                onClick={() => setNavOpen(false)}
              >
                {t(link.label)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
