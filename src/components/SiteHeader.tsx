"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { track } from "@vercel/analytics";
import LanguageSwitch from "@/components/LanguageSwitch";
import SearchBox from "@/components/SearchBox";
import MagneticButton from "@/components/MagneticButton";
import { useLanguage, tr, LANG_FLAG, type Bilingual } from "@/lib/language-context";
import { getCvUrl, CV_URL_PT, CV_URL_EN } from "@/lib/constants";

const isCvUrl = (href: string) => href === CV_URL_PT || href === CV_URL_EN;

export type SearchEntry = { label: string; href: string; group: Bilingual };

export const DEFAULT_NAV_LINKS = [
  { href: "/", label: { pt: "Início", en: "Home" } },
  { href: "/#intro", label: { pt: "Sobre", en: "About" } },
  { href: "/#skills-tools", label: { pt: "Skills & Tools", en: "Skills & Tools" } },
  { href: "/#projects", label: { pt: "Projetos", en: "Projects" } },
  { href: "/#experience", label: { pt: "Trajetória", en: "Journey" } },
  { href: "/blog", label: { pt: "Blog", en: "Blog" } },
  { href: "/#about", label: { pt: "Contato", en: "Contact" } },
];

function trackCtaClick(href: string) {
  if (isCvUrl(href)) track("cv_download", { href });
}

// "/" and "/#..." are the only routes that exist in both locales today:
// on /en, point them at the SSR'd English home page instead of the
// Portuguese one. Other links (e.g. /blog) aren't localized yet.
function withLocale(href: string, isEn: boolean) {
  if (!isEn) return href;
  if (href === "/") return "/en";
  if (href.startsWith("/#")) return `/en${href}`;
  return href;
}

function goTo(href: string) {
  if (href.startsWith("/#") && window.location.pathname === "/") {
    document.querySelector(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = href;
  }
}

const DEFAULT_CTA_LABEL: Bilingual = { pt: "Baixar CV", en: "Download CV" };

export default function SiteHeader({
  navLinks = DEFAULT_NAV_LINKS,
  searchIndex = [],
  cta,
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
  const pathname = usePathname();
  const isEn = pathname === "/en" || (pathname?.startsWith("/en/") ?? false);
  const effectiveCta = cta ?? { label: DEFAULT_CTA_LABEL, href: getCvUrl(lang) };
  const ctaIsExternal = effectiveCta.href.startsWith("http");
  const secondaryIsExternal = secondaryCta?.href.startsWith("http") ?? false;
  const ctaFlag = isCvUrl(effectiveCta.href) ? LANG_FLAG[lang] : null;
  const secondaryCtaFlag = secondaryCta && isCvUrl(secondaryCta.href) ? LANG_FLAG[lang] : null;

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
          <Link href={withLocale("/", isEn)} className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/images/FCO.png"
              alt="FCOPTS — Francisco Pontes"
              width={2500}
              height={544}
              priority
              className="h-9 sm:h-10 w-auto"
            />
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <LanguageSwitch lang={lang} setLang={setLang} compact />
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                {...(secondaryIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => trackCtaClick(secondaryCta.href)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 text-zinc-200 hover:bg-white/5 hover:text-white transition-colors text-sm"
              >
                {t(secondaryCta.label)}
                {secondaryCtaFlag && (
                  <span className="text-[0.85em] leading-none">{secondaryCtaFlag}</span>
                )}
              </a>
            )}
            <MagneticButton strength={0.3}>
              <a
                href={effectiveCta.href}
                {...(ctaIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => trackCtaClick(effectiveCta.href)}
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-700/20 text-sm"
              >
                {t(effectiveCta.label)}
                {ctaFlag && <span className="text-[0.85em] leading-none">{ctaFlag}</span>}
                {ctaBadge && (
                  <span className="absolute -right-2 -top-1.5 rotate-12 rounded-full bg-amber-400 px-1 py-px text-[8px] font-bold uppercase leading-none tracking-wide text-zinc-950 shadow-sm shadow-black/30">
                    {t(ctaBadge)}
                  </span>
                )}
              </a>
            </MagneticButton>
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
              aria-controls="site-nav-menu"
            >
              <span className="sr-only">{t({ pt: "Abrir menu", en: "Open menu" })}</span>
              {navOpen ? <X className="h-5 w-5 text-zinc-200" /> : <Menu className="h-5 w-5 text-zinc-200" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="site-nav-menu"
        className={`overflow-hidden border-t border-white/5 bg-[#141418] transition-[max-height,opacity] duration-300 ease-out ${
          navOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-3 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={withLocale(link.href, isEn)}
              className="text-zinc-200 text-sm rounded-xl px-3 py-3 hover:bg-gradient-to-r hover:from-violet-600/20 hover:to-fuchsia-500/20 transition-all"
              onClick={() => setNavOpen(false)}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
