"use client";

import SiteHeader, { type SearchEntry } from "@/components/SiteHeader";
import { SKILL_NAMES } from "@/components/SkillsTools";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

// Menu superior padrão da home, compartilhado por todas as páginas que não
// definem um header próprio (case studies, blog, cv, engenharia, 404, ...).
// A home (page.tsx) e as páginas /trabalhe-comigo e /recrutadores continuam
// passando props próprias ao SiteHeader por terem CTAs/links específicos.
const NAV_LINKS: Array<{ href: string; label: Bilingual }> = [
  { href: "/#intro", label: { pt: "Sobre", en: "About" } },
  { href: "/#projects", label: { pt: "Projetos", en: "Projects" } },
  { href: "/#about", label: { pt: "Contato", en: "Contact" } },
  { href: "/blog", label: { pt: "Blog", en: "Blog" } },
];

const SEARCH_SECTIONS: Array<{ href: string; label: Bilingual }> = [
  { href: "/", label: { pt: "Início", en: "Home" } },
  { href: "/#intro", label: { pt: "Sobre", en: "About" } },
  { href: "/#skills-tools", label: { pt: "Skills & Tools", en: "Skills & Tools" } },
  { href: "/#projects", label: { pt: "Projetos", en: "Projects" } },
  { href: "/#experience", label: { pt: "Trajetória", en: "Journey" } },
  { href: "/#about", label: { pt: "Contato", en: "Contact" } },
];

export default function StandardSiteHeader() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const searchIndex: SearchEntry[] = [
    ...SEARCH_SECTIONS.map((link) => ({
      label: t(link.label),
      href: link.href,
      group: { pt: "Seção", en: "Section" } as Bilingual,
    })),
    ...SKILL_NAMES.map((name) => ({
      label: name,
      href: "/#skills-tools",
      group: { pt: "Skill", en: "Skill" } as Bilingual,
    })),
  ];

  return (
    <SiteHeader
      navLinks={NAV_LINKS}
      searchIndex={searchIndex}
      cta={{ label: { pt: "Peça um orçamento", en: "Get a quote" }, href: "/trabalhe-comigo" }}
      secondaryCta={{ label: { pt: "Para recrutadores", en: "For recruiters" }, href: "/recrutadores" }}
      ctaBadge={{ pt: "Novo", en: "New" }}
    />
  );
}
