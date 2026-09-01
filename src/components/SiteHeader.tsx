"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
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
  // cta={null} esconde o botão do header nesta página; omitir cai no padrão (Baixar CV).
  cta?: { label: Bilingual; href: string } | null;
  secondaryCta?: { label: Bilingual; href: string };
  ctaBadge?: Bilingual;
}) {
  const { lang, setLang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const pathname = usePathname();
  const isEn = pathname === "/en" || (pathname?.startsWith("/en/") ?? false);
  const effectiveCta = cta === null ? null : cta ?? { label: DEFAULT_CTA_LABEL, href: getCvUrl(lang) };
  const ctaIsExternal = effectiveCta?.href.startsWith("http") ?? false;
  const secondaryIsExternal = secondaryCta?.href.startsWith("http") ?? false;
  const ctaFlag = effectiveCta && isCvUrl(effectiveCta.href) ? LANG_FLAG[lang] : null;
  const secondaryCtaFlag = secondaryCta && isCvUrl(secondaryCta.href) ? LANG_FLAG[lang] : null;

  // "Início" sempre presente e sempre leva à home; evita duplicar caso já venha nos navLinks.
  const desktopNavLinks = navLinks.some((l) => l.href === "/")
    ? navLinks
    : [{ href: "/", label: { pt: "Início", en: "Home" } as Bilingual }, ...navLinks];

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
          ? "border-white/10 bg-[#0a0a0d]/95 backdrop-blur-xl shadow-lg shadow-black/30"
          : "border-white/5 bg-black/80"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-0 md:h-16">
          <Link href={withLocale("/", isEn)} className="flex items-center gap-2 sm:gap-3 py-2 sm:py-0">
            <Image
              src="/images/FCO.png"
              alt="FCOPTS — Francisco Pontes"
              width={2500}
              height={544}
              priority
              className="h-6 sm:h-10 w-auto"
            />
          </Link>

          {/* Navegação inline — apenas desktop; telas menores usam o hamburger. */}
          <nav className="hidden lg:flex items-center gap-1">
            {desktopNavLinks.map((link) => {
              const href = withLocale(link.href, isEn);
              const active =
                link.href === "/" ? pathname === "/" || pathname === "/en" : pathname === href;
              return (
                <Link
                  key={link.href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {t(link.label)}
                  <span
                    className={`pointer-events-none absolute inset-x-3 -bottom-px h-px origin-left rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                {...(secondaryIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => trackCtaClick(secondaryCta.href)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-violet-400/40 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20 hover:border-violet-400/60 hover:text-white transition-colors text-sm"
              >
                {t(secondaryCta.label)}
                {secondaryCtaFlag && (
                  <span className="text-[0.85em] leading-none">{secondaryCtaFlag}</span>
                )}
              </a>
            )}
            {effectiveCta && (
            <MagneticButton strength={0.3} className="hidden sm:inline-flex">
              <a
                href={effectiveCta.href}
                {...(ctaIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => trackCtaClick(effectiveCta.href)}
                className="relative inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap px-2.5 py-1.5 sm:px-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-700/20 text-xs sm:text-sm"
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
            )}
            <div className="hidden sm:flex items-center gap-2.5">
              <LanguageSwitch lang={lang} setLang={setLang} compact />
            </div>
            <div className="sm:hidden">
              <LanguageSwitch lang={lang} setLang={setLang} size="sm" />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/25 hover:bg-black/35 p-[11px] transition-colors"
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
        className={`overflow-y-auto overflow-x-hidden border-t border-white/5 bg-[#131316] backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out ${
          navOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="mb-3">
            <SearchBox
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              onSelect={handleSearchSelect}
              t={t}
              align="left"
              variant="full"
            />
          </div>
          <ul className="grid sm:grid-cols-2 sm:gap-x-10 divide-y divide-white/5 sm:divide-y-0">
            {navLinks.map((link, i) => {
              const href = withLocale(link.href, isEn);
              const active = pathname === href;
              return (
                <li key={link.href} className="sm:border-b sm:border-white/5">
                  <Link
                    href={href}
                    onClick={() => setNavOpen(false)}
                    className={`group -mx-3 flex items-center gap-3 rounded-xl px-3 py-3.5 sm:py-4 transition-colors ${
                      active ? "bg-white/[0.06]" : "hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="font-mono text-[11px] tabular-nums text-violet-400 transition-colors group-hover:text-violet-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg sm:text-xl font-medium tracking-tight text-white">
                      {t(link.label)}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-violet-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300" />
                  </Link>
                </li>
              );
            })}
          </ul>

          {effectiveCta && (
          <a
            href={effectiveCta.href}
            {...(ctaIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => {
              trackCtaClick(effectiveCta.href);
              setNavOpen(false);
            }}
            className="relative sm:hidden mt-4 flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-sm text-white"
          >
            {t(effectiveCta.label)}
            {ctaFlag && <span className="text-[0.85em] leading-none">{ctaFlag}</span>}
            {ctaBadge && (
              <span className="absolute -right-2 -top-1.5 rotate-12 rounded-full bg-amber-400 px-1 py-px text-[8px] font-bold uppercase leading-none tracking-wide text-zinc-950 shadow-sm shadow-black/30">
                {t(ctaBadge)}
              </span>
            )}
          </a>
          )}
        </nav>
      </div>
    </header>
  );
}
