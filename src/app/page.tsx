"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RobotBuddy from "@/components/RobotBuddy";
import ImpactCounters from "@/components/ImpactCounters";
import GithubStats from "@/components/GithubStats";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import {
  MonitorSmartphone,
  Globe,
  Code,
  Database,
  Box,
  Braces,
  Mail,
  Github,
  Linkedin,
  Menu,
  ExternalLink,
  Lock,
  X,
  Server,
  Cloud,
  Palette,
} from "lucide-react";

const FloatingIcons3D = dynamic(() => import("@/components/FloatingIcons3D"), {
  ssr: false,
});

function LanguageSwitch({
  lang,
  setLang,
  compact = false,
}: {
  lang: "pt" | "en";
  setLang: (lang: "pt" | "en") => void;
  compact?: boolean;
}) {
  const base = compact
    ? "px-2 py-1 text-[11px]"
    : "px-2.5 py-1 text-xs";

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5"
    >
      {(["pt", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={`${base} rounded-md font-bold uppercase tracking-wide transition-colors ${
            lang === option
              ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function TechGlyph({ tag }: { tag: string }) {
  const normalized = tag.trim().toLowerCase();

  const Icon = (() => {
    if (
      normalized.includes("postgres") ||
      normalized.includes("mongo") ||
      normalized.includes("prisma")
    )
      return Database;
    if (normalized.includes("docker")) return Box;
    if (
      normalized === "js" ||
      normalized.includes("javascript") ||
      normalized.includes("typescript") ||
      normalized.includes("scriptcase") ||
      normalized.includes("wordpress")
    )
      return Braces;

    if (normalized.includes("next") || normalized.includes("react"))
      return MonitorSmartphone;
    if (normalized.includes("tailwind") || normalized.includes("ux"))
      return Palette;
    if (normalized.includes("node") || normalized.includes("express"))
      return Server;
    if (normalized.includes("php") || normalized.includes(".net")) return Code;
    return Code;
  })();

  return (
    <span className="inline-flex items-center justify-center h-5 w-5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
}

export default function Page() {
  const { lang, setLang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const [navOpen, setNavOpen] = useState(false);
  const [activePortfolioTab, setActivePortfolioTab] = useState<
    "sistemas" | "websites"
  >("sistemas");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const viewportSettings = {
    once: true,
    amount: isMobile ? 0.28 : 0.2,
    margin: isMobile ? "0px 0px -22% 0px" : "0px 0px -14% 0px",
  } as const;

  const easeOut = [0.16, 1, 0.3, 1] as const;

  const staggerList = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isMobile ? 0.14 : 0.12,
        delayChildren: isMobile ? 0.08 : 0.06,
      },
    },
  };

  const staggerTight = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isMobile ? 0.07 : 0.06,
        delayChildren: isMobile ? 0.06 : 0.05,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: easeOut,
        delay: i * (isMobile ? 0.08 : 0.06),
      },
    }),
  };

  const tagItem = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easeOut },
    },
  };

  const featuredProjects: Array<{
    title: string;
    subtitle: Bilingual;
    tags: string[];
    link: string;
    caseStudy?: string;
    blurb: Bilingual;
    category: Bilingual;
    thumb: string;
  }> = [
    {
      title: "Meoocarro — App",
      subtitle: { pt: "Em desenvolvimento", en: "In development" },
      tags: [
        "React Native",
        "TypeScript",
        "NextJS",
        "NodeJS",
        "ExpressJS",
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "Docker",
      ],
      link: "",
      blurb: {
        pt: "Aplicativo para conectar motoristas e oficinas de maneira inteligente, simplificando agendamentos, orçamentos e o acompanhamento de serviços automotivos.",
        en: "App that connects drivers and repair shops intelligently, simplifying bookings, quotes and tracking of automotive services.",
      },
      category: { pt: "Aplicativo Mobile + Painel Admin", en: "Mobile App + Admin Panel" },
      thumb: "/img-card-meoocarro.png",
    },
    {
      title: "iMidooh — Gerenciamento de Mídia DOOH",
      subtitle: { pt: "", en: "" },
      tags: [
        "React Native",
        "TypeScript",
        "NextJS",
        "NodeJS",
        "ExpressJS",
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "Docker",
      ],
      link: "",
      caseStudy: "/case/imidooh",
      blurb: {
        pt: "Plataforma mobile para operar mídia DOOH em painéis de LED dos mais diversos tipos, com gestão de campanhas, monitoramento em tempo real e relatórios de performance.",
        en: "Mobile platform to operate DOOH media across all kinds of LED panels, with campaign management, real-time monitoring and performance reports.",
      },
      category: { pt: "Aplicativo Mobile + Painel Admin", en: "Mobile App + Admin Panel" },
      thumb: "/logo-dooh.png",
    },
    {
      title: "Sistema Financeiro ERP Estrela",
      subtitle: { pt: "", en: "" },
      tags: [
        "NodeJS",
        "ExpressJS",
        "Prisma",
        "PostgreSQL",
        "Docker",
        "TailwindCSS",
        "NextJS",
        "TypeScript",
      ],
      link: "",
      caseStudy: "/case/erp-estrela",
      blurb: {
        pt: "Sistema web para rotinas financeiras do dia a dia, com padronização de processos, relatórios e visibilidade para decisões mais rápidas e seguras.",
        en: "Web system for day-to-day financial routines, standardizing processes, reporting and giving visibility for faster, safer decisions.",
      },
      category: { pt: "Sistema Web", en: "Web System" },
      thumb: "/logo-estrela.png",
    },
  ];

  const additionalProjects: Array<{
    name: string;
    tech: string[];
    desc: Bilingual;
  }> = [
    {
      name: "Sistema Financeiro ERP Estrela",
      tech: [
        "NodeJS",
        "ExpressJS",
        "Prisma",
        "PostgreSQL",
        "Docker",
        "TailwindCSS",
        "NextJS",
        "TypeScript",
      ],
      desc: { pt: "Grupo Star", en: "Grupo Star" },
    },
    {
      name: "Sistema Escolar",
      tech: ["PHP", "JS", "PostgreSQL", "Scriptcase"],
      desc: {
        pt: "Colégio da Polícia Militar do Ceará",
        en: "Ceará Military Police School",
      },
    },
    {
      name: "Sistema Diário de Obras",
      tech: [
        "NodeJS",
        "ExpressJS",
        "Prisma",
        "PostgreSQL",
        "Docker",
        "TailwindCSS",
        "TypeScript",
      ],
      desc: { pt: "Alfa Construções e Locações", en: "Alfa Construções e Locações" },
    },
    {
      name: "Sistema Especial Fazenda Chapéu",
      tech: ["Scriptcase", "PHP", "JS", "PostgreSQL"],
      desc: {
        pt: "Secretaria de Desenvolvimento Agrário do Ceará",
        en: "Ceará State Department of Agrarian Development",
      },
    },
    {
      name: "Sistema SIGMA",
      tech: [".NET", "C#", "Angular", "MongoDB", "Docker", "TypeScript"],
      desc: {
        pt: "Instituto Agropolos do Ceará",
        en: "Instituto Agropolos do Ceará",
      },
    },
    {
      name: "Inscrições - Letramento Digital",
      tech: ["WordPress", "PHP", "JS", "Bootstrap"],
      desc: { pt: "Anjos Digitais", en: "Anjos Digitais" },
    },
  ];

  const websites: Array<{
    url: string;
    name: string;
    desc: Bilingual;
    discontinued?: boolean;
  }> = [
    {
      url: "https://www.clicksoftwarehouse.com/",
      name: "Click Software House",
      desc: {
        pt: "Site institucional com serviços, posicionamento e contato.",
        en: "Corporate site with services, positioning and contact.",
      },
    },
    {
      url: "https://starcapital.stargrupo.com.br/",
      name: "Star Capital",
      desc: {
        pt: "Institucional da Star Capital com proposta e canais de contato.",
        en: "Star Capital corporate site with value proposition and contact channels.",
      },
    },
    {
      url: "https://www.stargrupo.com.br/",
      name: "Star Grupo",
      desc: {
        pt: "Site corporativo do grupo com visão geral e empresas.",
        en: "Group's corporate site with overview and business units.",
      },
    },
    {
      url: "https://starpesquisas.stargrupo.com.br/",
      name: "Star Pesquisas",
      desc: {
        pt: "Landing de serviços com mensagem direta e CTA claro.",
        en: "Services landing page with a direct message and clear CTA.",
      },
    },
    {
      url: "https://starreciclagem.stargrupo.com.br/",
      name: "Star Reciclagem",
      desc: {
        pt: "Institucional com serviços, áreas de atuação e contato.",
        en: "Corporate site with services, focus areas and contact.",
      },
    },
    {
      url: "https://silvaeduarteadvogados.com/",
      name: "Silva e Duarte Advogados",
      desc: {
        pt: "Institucional jurídico com áreas de atuação e captação.",
        en: "Law firm site with practice areas and lead capture.",
      },
    },
    {
      url: "https://2.0.movimentafilmes.com/",
      name: "Movimenta Filmes",
      desc: {
        pt: "Portfólio de trabalhos com navegação rápida e objetiva.",
        en: "Portfolio site with fast, straightforward navigation.",
      },
    },
    {
      url: "https://anjosdigitais.org",
      name: "Anjos Digitais",
      desc: {
        pt: "Institucional de impacto social com campanhas e chamadas.",
        en: "Social-impact site with campaigns and calls to action.",
      },
    },
    {
      url: "https://ujvp.org.br/",
      name: "União dos Jovens do Vicente Pinzon - UJVP",
      desc: {
        pt: "Site institucional da Organização Social.",
        en: "Institutional site for the nonprofit organization.",
      },
    },
    {
      url: "https://institutoagropolos.org.br",
      name: "Instituto Agropolos",
      desc: {
        pt: "Institucional com conteúdo organizado e acesso rápido.",
        en: "Corporate site with organized content and quick access.",
      },
    },
    {
      url: "https://fastcall.com.br/2.0",
      name: "FastCall 2.0",
      desc: {
        pt: "Página do serviço com proposta clara e conversão.",
        en: "Service page with a clear proposition and conversion focus.",
      },
    },
    {
      url: "https://com3brasil.com.br/wp",
      name: "COM3 Brasil",
      desc: {
        pt: "Institucional da agência com serviços e portfólio.",
        en: "Agency site with services and portfolio.",
      },
    },
    {
      url: "https://www.sda.ce.gov.br",
      name: "SDA Ceará",
      desc: {
        pt: "Portal institucional com notícias, programas e serviços.",
        en: "Government portal with news, programs and services.",
      },
    },
    {
      url: "https://sistemas2.sda.ce.gov.br",
      name: "Sistemas SDA",
      desc: {
        pt: "Hub de acesso aos sistemas e serviços digitais.",
        en: "Access hub for digital systems and services.",
      },
    },
    {
      url: "",
      name: "Programa de Imigração Hey Canadá",
      desc: {
        pt: "Voltado para atrair e prospectar pessoas que querem imigrar para o Canadá. Projeto 100% em inglês.",
        en: "Built to attract and qualify leads interested in immigrating to Canada. Project fully in English.",
      },
      discontinued: true,
    },
  ];

  const experience: Array<{
    company: string;
    startRole?: Bilingual;
    role: Bilingual;
    period: string;
    remote?: boolean;
    languages?: string;
  }> = [
    {
      company: "Grupo Star Financeira",
      role: {
        pt: "Engenheiro de Software | Gerenciamento de Projetos",
        en: "Software Engineer | Project Management",
      },
      period: "2025–presente",
    },
    {
      company: "Terceirizada - FlixBus Tickets (Europa)",
      role: { pt: "Sênior Desenvolvedor Full Stack", en: "Senior Full Stack Developer" },
      period: "2024–2025",
      remote: true,
      languages: "PT/EN",
    },
    {
      company: "Terceirizada - FedEX Services (Portugal)",
      role: { pt: "Sênior Desenvolvedor Full Stack", en: "Senior Full Stack Developer" },
      period: "2024–2025",
      remote: true,
      languages: "PT/EN",
    },
    {
      company: "Instituto Anjos Digitais",
      startRole: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
      role: {
        pt: "Sênior Desenvolvedor Full Stack | Gerenciamento de projetos de Produtos Digitais",
        en: "Senior Full Stack Developer | Digital Product Project Management",
      },
      period: "2023–2024",
      remote: true,
    },
    {
      company: "Secretaria do Desenvolvimento Agrário (CE)",
      startRole: { pt: "Programador Jr", en: "Jr Programmer" },
      role: {
        pt: "Analista de Sistemas Pleno | Product Designer",
        en: "Mid-level Systems Analyst | Product Designer",
      },
      period: "2021–2023",
    },
    {
      company: "Instituto Agropolos do Ceará",
      startRole: { pt: "Programador Jr", en: "Jr Programmer" },
      role: {
        pt: "Analista de Sistemas Pleno | UX/UI Designer",
        en: "Mid-level Systems Analyst | UX/UI Designer",
      },
      period: "2021–2023",
      remote: true,
    },
    {
      company: "Com3 Brasil",
      startRole: { pt: "Programador Jr", en: "Jr Programmer" },
      role: {
        pt: "Programador de Softwares | UX/UI Designer",
        en: "Software Programmer | UX/UI Designer",
      },
      period: "2020–2021",
    },
    {
      company: "Grupo Laredo Atacadista",
      startRole: { pt: "Auxiliar de gerência", en: "Assistant Manager" },
      role: { pt: "Gerente Operacional de Mercado", en: "Store Operations Manager" },
      period: "2017–2020",
    },
    {
      company: "White Martins Gases Industriais e Medicinais",
      startRole: { pt: "Encarregado de Operações", en: "Operations Supervisor" },
      role: {
        pt: "Gerente de Unidade Capital — URC Fortaleza",
        en: "Unit Manager — URC Fortaleza",
      },
      period: "2015–2017",
    },
  ];

  const techTagsFrequency = [...featuredProjects, ...additionalProjects]
    .flatMap((item) => ("tags" in item ? item.tags : item.tech))
    .reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
      return acc;
    }, {});

  const techTagsSorted = Object.entries(techTagsFrequency)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));

  const topTechTags = techTagsSorted.slice(0, 18);
  const top5TechTags = techTagsSorted.slice(0, 5);

  const navLinks = [
    { href: "#projects", label: { pt: "Portfólio", en: "Portfolio" } },
    { href: "#experience", label: { pt: "Experiência", en: "Experience" } },
    { href: "#stack", label: { pt: "Stack", en: "Stack" } },
    { href: "#about", label: { pt: "Sobre", en: "About" } },
    { href: "#contact", label: { pt: "Contato", en: "Contact" } },
  ];

  return (
    <div className="min-h-screen font-sans relative isolate">
      <FloatingIcons3D />

      <div className="relative z-10">
        {/* NAV */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#141418] md:backdrop-blur md:supports-[backdrop-filter]:bg-black/30">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 md:py-0 md:h-16">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Logo com P */}
                <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500 shadow-[0_0_40px_rgba(168,85,247,0.35)] flex items-center justify-center">
                  <span className="text-white font-black text-lg sm:text-xl">
                    FP
                  </span>
                </div>
                {/* Marca FCOPTS */}
                <div className="flex flex-col">
                  <span
                    className="text-lg sm:text-xl font-black tracking-[0.15em] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent"
                    style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                  >
                    FCOPTS
                  </span>
                  <span className="text-[10px] text-zinc-400 tracking-wide -mt-0.5">
                    {t({ pt: "Engenheiro de Software | UX Ops", en: "Software Engineer | UX Ops" })}
                  </span>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8 text-sm">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="hover:text-white/90 text-zinc-300"
                  >
                    {t(link.label)}
                  </a>
                ))}
                <LanguageSwitch lang={lang} setLang={setLang} />
                <a
                  href="https://drive.google.com/file/d/1NGGBTy9kzAPm5Os6we_jaeevsU-_zavX/view?usp=sharing"
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-700/20"
                >
                  {t({ pt: "Baixar CV", en: "Download CV" })}
                </a>
              </nav>
              <div className="flex items-center gap-2 md:hidden">
                <LanguageSwitch lang={lang} setLang={setLang} compact />
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/25 hover:bg-black/35 p-2.5 transition-colors"
                  onClick={() => setNavOpen(!navOpen)}
                  aria-expanded={navOpen}
                  aria-controls="mobile-nav"
                >
                  <span className="sr-only">{t({ pt: "Abrir menu", en: "Open menu" })}</span>
                  {navOpen ? (
                    <X className="h-5 w-5 text-zinc-200" />
                  ) : (
                    <Menu className="h-5 w-5 text-zinc-200" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {navOpen && (
            <div
              id="mobile-nav"
              className="md:hidden border-t border-white/5 bg-[#141418]"
            >
              <div className="mx-auto max-w-7xl px-3 py-4 flex flex-col gap-2">
                {navLinks.map((i) => (
                  <a
                    key={i.href}
                    href={i.href}
                    className="text-zinc-200 rounded-xl px-3 py-3 hover:bg-white/5 transition-colors"
                    onClick={() => setNavOpen(false)}
                  >
                    {t(i.label)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        <main id="content">
          {/* HERO - BANNER TRIUNFAL */}
          <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
            {/* Gradiente de fundo animado */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-950/35 via-black/40 to-black/85" />
            <div className="absolute inset-0 bg-black/25" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              {/* Saudação */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-xl font-light text-zinc-300 mb-2"
              >
                {t({ pt: "Olá, meu nome é", en: "Hi, my name is" })}
              </motion.p>

              {/* Nome - DESTAQUE MÁXIMO */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight md:tracking-wide"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-violet-300">
                  Francisco
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-violet-400">
                  Pontes
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="text-lg sm:text-xl md:text-2xl font-light text-zinc-300 max-w-4xl mx-auto mb-4"
              >
                {lang === "pt" ? (
                  <>
                    Sou{" "}
                    <span className="text-violet-300 font-semibold">
                      engenheiro de software
                    </span>{" "}
                    em Fortaleza, Brasil.
                    <br />
                    Uso código e engenharia para dar vida a{" "}
                    <span className="text-violet-300 font-semibold">
                      novas ideias.
                    </span>
                  </>
                ) : (
                  <>
                    I&apos;m a{" "}
                    <span className="text-violet-300 font-semibold">
                      software engineer
                    </span>{" "}
                    based in Fortaleza, Brazil.
                    <br />
                    I use code and engineering to bring{" "}
                    <span className="text-violet-300 font-semibold">
                      new ideas
                    </span>{" "}
                    to life.
                  </>
                )}
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.95 }}
                className="mt-10 flex items-center justify-center gap-5"
              >
                <a
                  aria-label="GitHub"
                  href="https://github.com/pontesneto2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-zinc-300 hover:text-violet-300 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/in/fcopts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-zinc-300 hover:text-fuchsia-300 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  aria-label="E-mail"
                  href="mailto:pontesneto2@gmail.com"
                  className="group text-zinc-300 hover:text-amber-300 transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </motion.div>
            </div>
            {/* Scroll Indicator - CENTRALIZADO (relativo à seção inteira) */}
            <motion.a
              href="#intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                opacity: { delay: 1.5, duration: 1 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute bottom-8 left-0 right-0 mx-auto w-fit flex flex-col items-center justify-center gap-2 text-zinc-400 hover:text-zinc-300 transition-colors"
              aria-label={t({ pt: "Role para explorar", en: "Scroll to explore" })}
            >
              <span className="text-sm">
                {t({ pt: "Role para explorar", en: "Scroll to explore" })}
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M19 12l-7 7-7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </section>

          {/* SOBRE - placeholder provisório */}
          <section
            id="intro"
            className="relative py-24 border-t border-white/5"
          >
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-white text-base sm:text-lg leading-relaxed">
                {t({
                  pt: "Graduado em Análise e Desenvolvimento de Sistemas pela Universidade Farias Brito, em Fortaleza. Pós Graduado em Engenharia de Software com ênfase em Devops*. Especializado em Desenvolvimento Full Stack pela Digital College. Especializado em UX/UI e design de Produtos Digitais pela EBAC*.",
                  en: "Bachelor's degree in Systems Analysis and Development from Universidade Farias Brito, in Fortaleza. Postgraduate in Software Engineering with an emphasis on DevOps*. Specialized in Full Stack Development from Digital College. Specialized in UX/UI and Digital Product Design from EBAC*.",
                })}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://github.com/pontesneto2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 border border-white/30 text-white text-sm font-medium hover:bg-white/5 hover:border-white/50 transition-all duration-300"
                >
                  {t({ pt: "Visite-me no GitHub", en: "Visit me on GitHub" })}
                </a>
                <a
                  href="https://www.linkedin.com/in/fcopts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-white text-sm font-medium hover:text-zinc-200 transition-colors"
                >
                  {t({ pt: "Visite-me no LinkedIn", en: "Visit me on LinkedIn" })}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                    ›
                  </span>
                </a>
              </div>
            </div>
          </section>

          {/* SOBRE - Tecnologia, Engenharia & Design */}
          <section
            id="tech-engineering-design"
            className="relative py-24 border-t border-white/5"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="relative rounded-3xl bg-black/70 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
                <div className="relative grid md:grid-cols-2 gap-6 items-stretch">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-4xl md:text-3xl lg:text-4xl font-black leading-tight text-white">
                      <span className="md:whitespace-nowrap">
                        {t({ pt: "Tecnologia,", en: "Technology," })}{" "}
                        <br className="md:hidden" />
                        {t({ pt: "Engenharia", en: "Engineering" })}
                      </span>
                      <br />
                      {t({ pt: "& Design", en: "& Design" })}
                    </h2>

                    <div className="mt-6 space-y-4 text-zinc-300 text-[15px] sm:text-base leading-relaxed">
                      <p>
                        {t({
                          pt: "Sou Engenheiro de Software com mais de 6 anos de experiência em desenvolvimento Web/Mobile, DevOps e entusiasta de operações UX/UI. Tenho perfil multidisciplinar e atuo na construção de soluções digitais de ponta a ponta.",
                          en: "I'm a Software Engineer with over 6 years of experience in Web/Mobile development, DevOps, and I'm an enthusiast of UX/UI operations. I have a multidisciplinary profile and work on building end-to-end digital solutions.",
                        })}
                      </p>
                      <p>
                        {t({
                          pt: "Ao longo da minha trajetória, participei de projetos em sistemas legado para o setor público, setor privado e iniciativas internacionais, passando por empresas como Star Capital, Instituto Anjos Digitais, Secretaria do Desenvolvimento Agrário do Ceará, Instituto Agropolos do Ceará, Com3 Brasil, Grupo Laredo, White Martins Gases do Ar e experiências internacionais. Essa vivência me permitiu atuar em produtos digitais de diferentes complexidades*. Uso, automatizo e me especializo cada vez mais em Inteligência Artificial mas geração old school que codificava na mão e consultando o stackoverflow* ainda vive, rs.",
                          en: "Throughout my career, I've worked on legacy system projects for the public sector, private sector and international initiatives, passing through companies such as Star Capital, Instituto Anjos Digitais, Secretaria do Desenvolvimento Agrário do Ceará, Instituto Agropolos do Ceará, Com3 Brasil, Grupo Laredo, White Martins Gases do Ar, and international experiences. That journey let me work on digital products of different complexities*. I use, automate and keep specializing in Artificial Intelligence — but the old-school generation that used to hand-code while checking StackOverflow* is still alive, ha.",
                        })}
                      </p>
                    </div>

                    <a
                      href="https://drive.google.com/file/d/1NGGBTy9kzAPm5Os6we_jaeevsU-_zavX/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 self-start w-[40%] min-w-fit flex items-center justify-center rounded-full px-6 py-2.5 border border-violet-400/50 text-violet-300 text-sm font-medium hover:bg-violet-500/10 hover:border-violet-400/70 transition-all duration-300"
                    >
                      {t({ pt: "Veja o currículo completo", en: "See the full résumé" })}
                    </a>
                  </div>

                  <div className="relative min-h-[320px] md:min-h-full">
                    <Image
                      src="/images/img-site-pn.webp"
                      alt="Francisco Pontes — código e engenharia"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-left"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROJETOS EM DESTAQUE - REDESENHADO */}
          <section
            id="projects"
            className="relative py-24 border-t border-white/5 bg-zinc-900/40 overflow-x-hidden"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                    {t({ pt: "Projetos em Destaque", en: "Featured Projects" })}
                  </span>
                </h2>
              </div>

              {/* Cards de projetos principais - Mais elegantes */}
              <motion.div
                variants={staggerList}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 auto-rows-fr"
              >
                {featuredProjects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    custom={index}
                    variants={fadeUpItem}
                    className="group relative h-full flex flex-col rounded-3xl border border-white/10 bg-black/75 backdrop-blur-xl p-8 hover:bg-black/80 hover:border-violet-500/40 transition-all duration-500 shadow-xl"
                  >
                    {/* Badge de categoria */}
                    <div className="mb-4">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        {t(project.category)}
                      </span>
                    </div>

                    {/* Miniatura do projeto */}
                    <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
                      {project.thumb ? (
                        <Image
                          src={project.thumb}
                          alt={`${t({ pt: "Capa do projeto", en: "Project cover" })}: ${project.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        <div className="h-44 w-full bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
                      )}
                    </div>

                    <h3 className="text-xl font-semibold group-hover:text-violet-300 transition-colors">
                      {project.title}
                    </h3>
                    {t(project.subtitle) && (
                      <span className="inline-block text-xs text-amber-400/80 font-medium mt-1 mb-2">
                        {t(project.subtitle)}
                      </span>
                    )}
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6 mt-2">
                      {t(project.blurb)}
                    </p>

                    {/* Tags estilizadas */}
                    <div className="flex flex-wrap gap-2 mb-7">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:border-violet-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors group-hover:gap-3"
                        >
                          {t({ pt: "Ver projeto", en: "View project" })}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        !project.caseStudy && (
                          <div className="flex flex-col gap-2 mt-2">
                            <div className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400">
                              <Lock className="h-3.5 w-3.5" />
                              {t({ pt: "Projeto Privado", en: "Private Project" })}
                            </div>
                            <a
                              href="mailto:pontesneto2@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20acesso%20ao%20projeto"
                              className="inline-flex items-center gap-2 text-[11px] font-medium text-violet-400 hover:text-violet-300 transition-colors"
                            >
                              <Mail className="h-3 w-3" />
                              {t({ pt: "Solicite acesso via email", en: "Request access via email" })}
                            </a>
                          </div>
                        )
                      )}
                      {project.caseStudy && (
                        <Link
                          href={project.caseStudy}
                          className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold text-violet-300 hover:text-violet-200 transition-colors group/case"
                        >
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-md bg-violet-500/15 border border-violet-500/25">
                            <ExternalLink className="h-3 w-3" />
                          </span>
                          {t({ pt: "Ver estudo de caso", en: "View case study" })}
                          <span className="inline-block transition-transform duration-200 group-hover/case:translate-x-0.5">→</span>
                        </Link>
                      )}
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                    {t({ pt: "Conheça mais projetos", en: "See more projects" })}
                  </span>
                </h2>
              </div>

              {/* Portfólio com Tabs — Sistemas & Websites */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative">
                  {/* Tab headers + Social */}
                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900/60 border border-zinc-800/60 w-fit shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                      <button
                        onClick={() => setActivePortfolioTab("sistemas")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          activePortfolioTab === "sistemas"
                            ? "bg-violet-500/20 text-violet-200 border border-violet-500/30 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                            : "text-zinc-400 hover:text-zinc-200 border border-transparent hover:bg-white/5"
                        }`}
                      >
                        <Code className="h-4 w-4" />
                        {t({ pt: "Sistemas", en: "Systems" })}
                        <span
                          className={`text-[9px] px-1.5 py-[1px] rounded-full ${
                            activePortfolioTab === "sistemas"
                              ? "bg-violet-500/20 text-violet-300"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {additionalProjects.length}
                        </span>
                      </button>
                      <button
                        onClick={() => setActivePortfolioTab("websites")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          activePortfolioTab === "websites"
                            ? "bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/30 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                            : "text-zinc-400 hover:text-zinc-200 border border-transparent hover:bg-white/5"
                        }`}
                      >
                        <Globe className="h-4 w-4" />
                        {t({ pt: "Websites", en: "Websites" })}
                        <span
                          className={`text-[9px] px-1.5 py-[1px] rounded-full ${
                            activePortfolioTab === "websites"
                              ? "bg-fuchsia-500/20 text-fuchsia-300"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {websites.length}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        aria-label="GitHub"
                        href="https://github.com/pontesneto2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-violet-500/30 transition-all"
                      >
                        <Github className="h-4 w-4 text-zinc-300" />
                      </a>
                      <a
                        aria-label="LinkedIn"
                        href="https://www.linkedin.com/in/fcopts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-fuchsia-500/30 transition-all"
                      >
                        <Linkedin className="h-4 w-4 text-zinc-300" />
                      </a>
                      <a
                        aria-label="E-mail"
                        href="mailto:pontesneto2@gmail.com"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-amber-500/30 transition-all"
                      >
                        <Mail className="h-4 w-4 text-zinc-300" />
                      </a>
                    </div>
                  </div>

                  {/* Tab content — Sistemas */}
                  {activePortfolioTab === "sistemas" && (
                    <motion.div
                      key="sistemas"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-7 mt-2">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Code className="h-5 w-5 text-violet-400" />
                            {t({ pt: "Sistemas Web", en: "Web Systems" })}
                          </h3>
                          <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                            <span className="text-violet-400 font-medium">
                              {t({
                                pt: "Desenvolvo sistemas 100% personalizados",
                                en: "I build 100% custom systems",
                              })}
                            </span>{" "}
                            {t({
                              pt: "para a sua necessidade: gestão financeira, fluxo de caixa, diário de obra, estoque, CRM, ERP e muito mais.",
                              en: "for your needs: financial management, cash flow, work logs, inventory, CRM, ERP and much more.",
                            })}
                          </p>
                        </div>
                      </div>
                      <motion.ul
                        variants={staggerList}
                        initial="hidden"
                        animate="show"
                        className="divide-y divide-white/5 border-y border-white/5 lg:divide-y-0 lg:grid lg:grid-cols-2 lg:gap-x-12"
                      >
                        {additionalProjects.map((proj, index) => (
                          <motion.li
                            key={proj.name}
                            variants={fadeUpItem}
                            custom={index}
                            className="group py-5 lg:border-b lg:border-white/5"
                          >
                            <div className="flex items-start gap-4 min-w-0">
                              <div className="shrink-0 mt-0.5">
                                <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-violet-500/25 group-hover:bg-violet-500/10 transition-colors">
                                  <Code className="h-4 w-4 text-violet-300" />
                                </div>
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors truncate">
                                      {proj.name}
                                    </div>
                                    <div className="text-xs text-violet-300 mt-1 leading-relaxed font-medium">
                                      {t(proj.desc)}
                                    </div>
                                  </div>
                                  <div className="shrink-0 mt-0.5">
                                    <div className="inline-flex items-center gap-1.5 text-[10px] text-zinc-400 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
                                      <Lock className="h-3 w-3" />
                                      {t({ pt: "Privado", en: "Private" })}
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-1">
                                  {proj.tech.map((tech) => (
                                    <span
                                      key={tech}
                                      className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.08] px-1.5 py-0.5 text-[8px] font-medium text-zinc-300"
                                    >
                                      <span className="scale-75 origin-left">
                                        <TechGlyph tag={tech} />
                                      </span>
                                      <span className="leading-none">{tech}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )}

                  {/* Tab content — Websites */}
                  {activePortfolioTab === "websites" && (
                    <motion.div
                      key="websites"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-7 mt-2">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Globe className="h-5 w-5 text-fuchsia-400" />
                            {t({ pt: "Websites", en: "Websites" })}
                          </h3>
                          <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                            <span className="text-fuchsia-400 font-medium">
                              {t({
                                pt: "Websites desenhados e desenvolvidos",
                                en: "Websites designed and built",
                              })}
                            </span>{" "}
                            {t({
                              pt: "com foco em clareza, performance e conversão — do conteúdo à experiência.",
                              en: "with a focus on clarity, performance and conversion — from content to experience.",
                            })}
                          </p>
                        </div>
                      </div>

                      <motion.ul
                        variants={staggerList}
                        initial="hidden"
                        animate="show"
                        className="divide-y divide-white/5 border-y border-white/5 lg:divide-y-0 lg:grid lg:grid-cols-2 lg:gap-x-12"
                      >
                        {websites.map((site, index) => {
                          const isDiscontinued = Boolean(site.discontinued);

                          return (
                            <motion.li
                              key={site.url || site.name}
                              variants={fadeUpItem}
                              custom={index}
                              className="py-5 lg:border-b lg:border-white/5"
                            >
                              <div className="flex items-start gap-4 min-w-0">
                                <div className="shrink-0 mt-0.5">
                                  <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Globe className="h-4 w-4 text-fuchsia-300" />
                                  </div>
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      {isDiscontinued ? (
                                        <div className="text-sm font-semibold text-zinc-100 truncate">
                                          {site.name}
                                        </div>
                                      ) : (
                                        <a
                                          href={site.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm font-semibold text-zinc-100 truncate hover:text-fuchsia-200 transition-colors"
                                          aria-label={`${t({ pt: "Abrir", en: "Open" })} ${site.name}`}
                                        >
                                          {site.name}
                                        </a>
                                      )}
                                      <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                                        {t(site.desc)}
                                      </div>
                                    </div>

                                    <div className="shrink-0 mt-0.5">
                                      {isDiscontinued ? (
                                        <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-400 bg-white/5 border border-white/10 rounded-xl px-2 py-1 whitespace-nowrap">
                                          <Lock className="h-3 w-3" />
                                          {t({ pt: "Descontinuado", en: "Discontinued" })}
                                        </span>
                                      ) : (
                                        <a
                                          href={site.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 text-[10px] text-zinc-300 bg-white/5 border border-white/10 rounded-xl px-2 py-1 hover:border-fuchsia-500/25 hover:text-white transition-colors whitespace-nowrap"
                                          aria-label={`${t({ pt: "Abrir", en: "Open" })} ${site.name}`}
                                        >
                                          {t({ pt: "Abrir", en: "Open" })}
                                          <ExternalLink className="h-3 w-3" />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* TRAJETÓRIA PROFISSIONAL - Discreto e Elegante */}
          <section id="experience" className="relative py-24 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                  {t({ pt: "Trajetória Profissional", en: "Professional Journey" })}
                </span>
              </h2>
              <motion.div
                variants={staggerList}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12"
              >
                {experience.map((exp) => (
                  <motion.div
                    key={exp.company}
                    variants={fadeUpItem}
                    className="relative pl-5"
                  >
                    <div className="absolute left-0 top-2 h-full w-px bg-white/10" />
                    <div className="absolute left-[-3px] top-2 h-2 w-2 rounded-full bg-violet-400/60" />
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h4 className="font-semibold text-sm text-white flex-1 min-w-0 break-words">
                        {exp.company}
                      </h4>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[8px] text-violet-400 bg-violet-500/10 px-1.5 py-[2px] rounded border border-violet-500/20 whitespace-nowrap font-semibold">
                          {exp.period}
                        </span>
                        {exp.remote ? (
                          <span className="text-[8px] text-fuchsia-300 bg-fuchsia-500/10 px-1.5 py-[2px] rounded border border-fuchsia-500/20 whitespace-nowrap font-semibold">
                            {t({ pt: "Trabalho remoto", en: "Remote" })}
                          </span>
                        ) : null}
                        {exp.languages ? (
                          <span className="text-[8px] text-zinc-300 bg-white/5 px-1.5 py-[2px] rounded border border-white/10 whitespace-nowrap font-semibold">
                            {exp.languages}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {exp.startRole ? (
                      <div className="text-[10px] text-zinc-400 mb-2 flex items-center gap-2">
                        <span className="truncate">
                          {t({ pt: "Cargo Inicial", en: "Starting Role" })}: {t(exp.startRole)}
                        </span>
                      </div>
                    ) : null}
                    <p className="text-xs text-violet-300 leading-relaxed">
                      {t(exp.role)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* STACK - CRITÉRIOS DE ESCOLHA + NUVEM DE TECNOLOGIAS */}
          <section
            id="stack"
            className="relative py-24 border-t border-white/5"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <h2 className="text-3xl font-bold text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                  {t({ pt: "Stack Preferida", en: "Preferred Stack" })}
                </span>
              </h2>
              <p className="text-sm text-zinc-400 text-center mt-3 max-w-3xl mx-auto leading-relaxed">
                {t({
                  pt: "Não fico preso a uma linguagem — tecnologia é ferramenta. Eu entendo o contexto do produto, levanto requisitos, defino escopo, desenho a arquitetura e escolho a stack mais adequada para o cenário do cliente e do projeto.",
                  en: "I'm not tied to one language — technology is a tool. I understand the product context, gather requirements, define scope, design the architecture and choose the stack that best fits the client and the project.",
                })}
              </p>

              <div className="mt-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="relative rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-6 md:p-8 shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />

                  <div className="relative">
                    {/* Linguagens */}
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Cloud className="h-5 w-5 text-fuchsia-300" />
                            {t({ pt: "Ferramentas mais usadas", en: "Most-used tools" })}
                          </h3>
                          <p className="text-xs text-zinc-400 mt-1">
                            {t({
                              pt: "Baseado nos últimos trabalhos realizados.",
                              en: "Based on recent completed work.",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <motion.ol
                          variants={staggerTight}
                          initial="hidden"
                          whileInView="show"
                          viewport={viewportSettings}
                          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3"
                        >
                          {top5TechTags.map((item, index) => (
                            <motion.li
                              key={item.tag}
                              variants={tagItem}
                              className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-3 overflow-hidden hover:border-violet-500/20 transition-colors"
                            >
                              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
                              <div className="flex items-center justify-between text-[10px] text-zinc-400">
                                <span className="font-semibold">
                                  #{index + 1}
                                </span>
                                <span className="whitespace-nowrap">
                                  {item.count}{" "}
                                  {lang === "pt"
                                    ? item.count === 1
                                      ? "projeto"
                                      : "projetos"
                                    : item.count === 1
                                      ? "project"
                                      : "projects"}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 min-w-0">
                                  <TechGlyph tag={item.tag} />
                                  <div className="min-w-0 text-sm font-semibold text-zinc-100 truncate">
                                    {item.tag}
                                  </div>
                                </div>
                              </div>
                            </motion.li>
                          ))}
                        </motion.ol>

                        <div className="mt-7">
                          <div className="text-[11px] uppercase tracking-wide text-zinc-400 mb-3">
                            {t({ pt: "Top 15 (recente)", en: "Top 15 (recent)" })}
                          </div>
                          <motion.ul
                            variants={staggerTight}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewportSettings}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2"
                          >
                            {topTechTags.slice(0, 15).map((item) => (
                              <motion.li
                                key={item.tag}
                                variants={tagItem}
                                className="flex items-center gap-3 py-1"
                              >
                                <div className="min-w-0 flex items-center gap-2">
                                  <TechGlyph tag={item.tag} />
                                  <span className="min-w-0 truncate text-sm font-semibold text-zinc-200">
                                    {item.tag}
                                  </span>
                                  <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.10] text-zinc-100 font-semibold">
                                    {item.count}x
                                  </span>
                                </div>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>

                        <p className="mt-6 text-xs text-zinc-400 leading-relaxed flex items-start gap-2">
                          <span aria-hidden className="mt-[1px]">
                            💡
                          </span>
                          <span>
                            {t({
                              pt: "E quando o projeto pede algo diferente, eu me adapto à stack do time e do cliente. O foco é entregar valor com qualidade e manutenção saudável.",
                              en: "And when a project calls for something different, I adapt to the team's and client's stack. The focus is delivering value with quality and healthy maintainability.",
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8">
                <GithubStats />
              </div>
            </div>
          </section>

          {/* SOBRE MIM - Card Unificado Criativo */}
          <section
            id="about"
            className="relative py-24 border-t border-white/5"
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <div className="relative rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Gradiente de fundo */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />

                <div className="relative z-10 grid md:grid-cols-5 gap-8 p-8 md:p-12">
                  {/* Coluna da imagem - 2 colunas */}
                  <div className="md:col-span-2 flex items-center">
                    <div className="relative w-full">
                      <div className="mx-auto max-w-[340px] md:max-w-[360px] aspect-square rounded-2xl overflow-hidden border border-violet-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                        <div className="relative w-full h-full">
                          <Image
                            src="/pontes-institucional.png"
                            alt="Francisco Pontes"
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover"
                            priority
                          />
                        </div>
                      </div>
                      {/* Badge flutuante */}
                      <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-xl shadow-xl font-semibold text-[13px]">
                        {t({ pt: "5+ anos de experiência", en: "5+ years of experience" })}
                      </div>
                    </div>
                  </div>

                  {/* Coluna do conteúdo - 3 colunas */}
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-6">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                        {t({ pt: "Sobre mim", en: "About me" })}
                      </span>
                    </h2>

                    <div className="space-y-4 text-[15px] sm:text-base text-zinc-300 leading-relaxed">
                      {lang === "pt" ? (
                        <>
                          <p>
                            Engenheiro de Software com atuação em desenvolvimento{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 font-semibold">
                              Web/Mobile, DevOps e UX/UI
                            </span>
                            , especializado em transformar estratégias de negócio em
                            soluções digitais completas.
                          </p>
                          <p>
                            Atuação no{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 font-semibold">
                              setor público
                            </span>{" "}
                            com sistemas críticos e iniciativas de modernização
                            orientadas à usabilidade. No{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 font-semibold">
                              setor privado
                            </span>
                            , estrutura arquiteturas robustas, automatiza processos,
                            fortalece observabilidade e garante ambientes de
                            produção confiáveis. Possui experiência em{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 font-semibold">
                              projetos internacionais
                            </span>
                            , ampliando a visão técnica, cultural e de mercado na
                            construção de produtos digitais e visão negócio.
                          </p>
                          <div className="pt-2">
                            <div className="text-[11px] font-semibold text-zinc-200 tracking-wide">
                              Formação &amp; Background
                            </div>
                            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                              Profissional formado em Análise e Desenvolvimento de
                              Sistemas, pós-graduado em Engenharia de Software com
                              ênfase em DevOps pela UNIFOR, com especializações em
                              Desenvolvimento Full Stack (Digital College) e UX/UI
                              &amp; Produtos Digitais (EBAC). Vivência internacional
                              com intercâmbio de língua inglesa na Irlanda-UE (nível
                              C1). Une engenharia, design e estratégia de produto
                              para desenvolver soluções.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>
                            Software Engineer working across{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 font-semibold">
                              Web/Mobile development, DevOps and UX/UI
                            </span>
                            , specialized in turning business strategy into complete
                            digital solutions.
                          </p>
                          <p>
                            Experience in the{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 font-semibold">
                              public sector
                            </span>{" "}
                            with critical systems and usability-driven modernization
                            initiatives. In the{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 font-semibold">
                              private sector
                            </span>
                            , building robust architectures, automating processes,
                            strengthening observability and ensuring reliable
                            production environments. Experience with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 font-semibold">
                              international projects
                            </span>
                            , broadening technical, cultural and market perspective
                            in building digital products with a business mindset.
                          </p>
                          <div className="pt-2">
                            <div className="text-[11px] font-semibold text-zinc-200 tracking-wide">
                              Education &amp; Background
                            </div>
                            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                              Degree in Systems Analysis and Development,
                              postgraduate in Software Engineering with a DevOps
                              focus from UNIFOR, with specializations in Full Stack
                              Development (Digital College) and UX/UI &amp; Digital
                              Products (EBAC). International experience through an
                              English-language exchange in Ireland-EU (C1 level).
                              Combines engineering, design and product strategy to
                              build solutions.
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Tags redesenhadas e alinhadas */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      {[
                        { icon: "🎯", label: { pt: "Visão de produto", en: "Product vision" } },
                        { icon: "⚡", label: { pt: "Performance", en: "Performance" } },
                        { icon: "🔧", label: { pt: "Visão de negócio", en: "Business mindset" } },
                        { icon: "🚀", label: { pt: "Impacto real", en: "Real impact" } },
                        { icon: "🧑‍💼", label: { pt: "Gestão", en: "Management" } },
                        { icon: "📦", label: { pt: "Gerência de Produtos", en: "Product Management" } },
                      ].map((item) => (
                        <span
                          key={item.label.en}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-gradient-to-r from-violet-500/12 to-fuchsia-500/12 border border-violet-500/20 text-[10px] font-semibold text-zinc-200 hover:border-violet-500/35 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                        >
                          <span className="text-[11px]">{item.icon}</span>
                          {t(item.label)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <ImpactCounters className="mt-6" />
            </div>
          </section>

          <Testimonials />

          {/* CONTATO - COM ROBÔ */}
          <section
            id="contact"
            className="relative py-24 border-t border-white/5"
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative mx-auto max-w-5xl"
              >
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/6 via-transparent to-fuchsia-500/6" />
                  <div className="relative grid md:grid-cols-12">
                    <div className="md:col-span-7 p-7 sm:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-11 h-11 bg-gradient-to-br from-violet-500/90 to-fuchsia-500/90 rounded-xl flex items-center justify-center">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200">
                            {t({ pt: "Vamos conversar?", en: "Let's talk?" })}
                          </h2>
                          <p className="text-zinc-400 text-sm">
                            {t({ pt: "Estou aberto a novos desafios", en: "Open to new challenges" })}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-zinc-300">
                          {t({
                            pt: "Se você tem um projeto em mente ou quer discutir oportunidades, ficarei feliz em bater um papo.",
                            en: "If you have a project in mind or want to discuss opportunities, I'd be happy to chat.",
                          })}
                        </p>

                        <ContactForm />

                        <p className="text-xs text-zinc-400">
                          {t({ pt: "Ou envie direto para", en: "Or reach out directly at" })}{" "}
                          <a
                            href="mailto:pontesneto2@gmail.com"
                            className="text-violet-300 hover:text-violet-200 transition-colors"
                          >
                            pontesneto2@gmail.com
                          </a>
                        </p>

                        <div className="flex gap-3 pt-4">
                          <motion.a
                            href="https://github.com/pontesneto2"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={
                              isMobile ? undefined : { scale: 1.06, rotate: 2 }
                            }
                            whileTap={{ scale: 0.94 }}
                            className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                          >
                            <Github className="w-5 h-5 text-zinc-400" />
                            <span className="text-sm text-zinc-300">
                              GitHub
                            </span>
                          </motion.a>

                          <motion.a
                            href="https://www.linkedin.com/in/fcopts"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={
                              isMobile ? undefined : { scale: 1.06, rotate: -2 }
                            }
                            whileTap={{ scale: 0.94 }}
                            className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                          >
                            <Linkedin className="w-5 h-5 text-zinc-400" />
                            <span className="text-sm text-zinc-300">
                              LinkedIn
                            </span>
                          </motion.a>
                        </div>

                        <div className="pt-4">
                          <a
                            href="https://drive.google.com/file/d/1NGGBTy9kzAPm5Os6we_jaeevsU-_zavX/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-violet-300 hover:text-violet-200 transition-colors inline-flex items-center gap-2"
                          >
                            {t({ pt: "Ver currículo completo", en: "View full résumé" })}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-white/10 p-7 sm:p-8 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/6 via-transparent to-fuchsia-500/6" />
                      <div className="relative">
                        <RobotBuddy
                          size={220}
                          showBackdrop={false}
                          showParticles={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="py-10 border-t border-white/5 text-center text-[11px] text-zinc-400">
          <div>© 2026 Francisco Pontes</div>
          <div>{t({ pt: "Todos os Direitos Reservados", en: "All Rights Reserved" })}</div>
          <div>pontesneto2@gmail.com</div>
        </footer>
      </div>
    </div>
  );
}
