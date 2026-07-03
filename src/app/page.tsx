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
  Folder,
  Building2,
} from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiVuedotjs,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiGithubactions,
  SiGitlab,
  SiPhp,
  SiLaravel,
  SiDotnet,
  SiSharp,
  SiPython,
  SiSpringboot,
  SiMongodb,
  SiMysql,
  SiKubernetes,
  SiNginx,
  SiPrometheus,
  SiGrafana,
  SiGooglecloud,
  SiDigitalocean,
  SiGraphql,
  SiWordpress,
  SiAngular,
  SiGit,
  SiJira,
  SiTailwindcss,
  SiBootstrap,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbBrandAzure } from "react-icons/tb";
import type { IconType } from "react-icons";

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

const projectTagIconMap: Record<string, IconType> = {
  "React Native": SiReact,
  TypeScript: SiTypescript,
  NextJS: SiNextdotjs,
  NodeJS: SiNodedotjs,
  ExpressJS: SiExpress,
  NestJS: SiNestjs,
  PostgreSQL: SiPostgresql,
  Prisma: SiPrisma,
  Docker: SiDocker,
  PHP: SiPhp,
  Laravel: SiLaravel,
  "C#": SiSharp,
  ".NET": SiDotnet,
  Angular: SiAngular,
  Git: SiGit,
  Jira: SiJira,
  Grafana: SiGrafana,
  TailwindCSS: SiTailwindcss,
  MongoDB: SiMongodb,
  JS: SiJavascript,
  "Java Spring Boot": SiSpringboot,
  WordPress: SiWordpress,
  Bootstrap: SiBootstrap,
};

function ProjectTagIcon({
  tag,
  size = "md",
}: {
  tag: string;
  size?: "sm" | "md";
}) {
  const Icon = projectTagIconMap[tag] ?? Code;
  const boxClass = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <span
      title={tag}
      className={`inline-flex items-center justify-center ${boxClass} text-zinc-400 hover:text-white hover:scale-110 transition-all duration-200`}
    >
      <Icon className={iconClass} />
    </span>
  );
}

export default function Page() {
  const { lang, setLang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const [navOpen, setNavOpen] = useState(false);
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
    discontinued?: boolean;
    placeholder?: boolean;
    ctaLabel?: Bilingual;
    blurb: Bilingual;
    category: Bilingual;
    thumb: string;
  }> = [
    {
      title: "Ucopiloto - App",
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
      link: "https://www.ucopiloto.com.br/",
      blurb: {
        pt: "Aplicativo para conectar motoristas e oficinas de maneira inteligente, simplificando agendamentos, orçamentos e o acompanhamento de serviços automotivos.",
        en: "App that connects drivers and repair shops intelligently, simplifying bookings, quotes and tracking of automotive services.",
      },
      category: { pt: "Aplicativo Mobile + Painel Admin", en: "Mobile App + Admin Panel" },
      thumb: "/img-card-meoocarro.png",
    },
    {
      title: "iMidooh - App",
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
      discontinued: true,
      blurb: {
        pt: "Plataforma mobile para operar mídia Digital Out Of Home em recursos visuais dos mais diversos tipos.",
        en: "Mobile platform to operate Digital Out Of Home media across all kinds of visual resources.",
      },
      category: { pt: "Aplicativo Mobile + Painel Admin", en: "Mobile App + Admin Panel" },
      thumb: "/logo-dooh.png",
    },
    {
      title: "Sistema Escolar do 2º Colégio da Polícia Militar",
      subtitle: { pt: "", en: "" },
      tags: ["PHP", "Laravel", "C#", ".NET", "Angular", "PostgreSQL", "Docker", "Git", "Jira", "Grafana"],
      link: "https://www.com3brasil.com.br/v9/app/cpmce/login/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Sistema de gestão escolar para o 2º Colégio da Polícia Militar, com acesso controlado por perfil para acompanhamento acadêmico e administrativo.",
        en: "School management system for the 2nd Military Police School, with role-based access for academic and administrative tracking.",
      },
      category: { pt: "Sistema Web", en: "Web System" },
      thumb: "/images/img-sist-pol.jpeg",
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

  const moreProjectsGrid: Array<{
    title: string;
    org: string;
    description: Bilingual;
    tags: string[];
    cta: { type: "private" } | { type: "link"; url: string } | { type: "soon" };
  }> = [
    {
      title: "Sistema Diário de Obras",
      org: "Alfa Construções e Locações",
      description: {
        pt: "Diário de obras digital para registrar atividades, ocorrências e o avanço físico da construção.",
        en: "Digital construction logbook to record activities, incidents and physical progress.",
      },
      tags: ["NodeJS", "ExpressJS", "Prisma", "PostgreSQL", "Docker", "TailwindCSS", "TypeScript"],
      cta: { type: "private" },
    },
    {
      title: "Sistema SIGMA",
      org: "Instituto Agropolos do Ceará",
      description: {
        pt: "Sistema de gestão institucional para controle de processos administrativos e indicadores internos.",
        en: "Institutional management system for administrative processes and internal indicators.",
      },
      tags: [".NET", "C#", "Angular", "MongoDB", "Docker", "TypeScript"],
      cta: { type: "link", url: "http://sigapp.institutoagropolos.org.br/login" },
    },
    {
      title: "Sistema Especial Fazenda Chapéu",
      org: "SDA Ceará",
      description: {
        pt: "Sistema de regularização de matrícula de imóveis cedidos para a população do estado do Ceará.",
        en: "System for regularizing land title records granted to the population of Ceará state.",
      },
      tags: ["Scriptcase", "PHP", "JS", "Java Spring Boot"],
      cta: { type: "link", url: "https://www.idace.ce.gov.br/" },
    },
    {
      title: "Sistema de Indicadores de Demandas e Ações",
      org: "SDA Ceará",
      description: {
        pt: "Painel de acompanhamento de demandas e ações estratégicas da secretaria, com indicadores em tempo real.",
        en: "Dashboard to track the department's demands and strategic actions, with real-time indicators.",
      },
      tags: ["PHP", "Laravel", "PostgreSQL", "Docker"],
      cta: { type: "link", url: "https://www.com3brasil.com.br/v9/app/demanda/login/" },
    },
    {
      title: "Website Instituto Anjos",
      org: "Anjos Digitais",
      description: {
        pt: "Site institucional para divulgação de projetos sociais e captação de apoiadores.",
        en: "Institutional website to promote social projects and attract supporters.",
      },
      tags: ["WordPress", "PHP", "JS", "Bootstrap"],
      cta: { type: "link", url: "https://anjosdigitais.org/" },
    },
    {
      title: "Website UJVP CE",
      org: "União dos Jovens do Vicente Pinzon",
      description: {
        pt: "Site institucional da organização social, com apresentação da entidade e canais de contato.",
        en: "Institutional website for the nonprofit organization, with an overview and contact channels.",
      },
      tags: ["WordPress", "PHP"],
      cta: { type: "link", url: "https://ujvp.org.br/" },
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

  const skillsGroups = [
    [
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React Native", Icon: SiReact },
      { name: "Vue.js", Icon: SiVuedotjs },
    ],
    [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "NestJS", Icon: SiNestjs },
      { name: "Express", Icon: SiExpress },
      { name: "PHP", Icon: SiPhp },
      { name: "Laravel", Icon: SiLaravel },
      { name: ".NET", Icon: SiDotnet },
      { name: "C#", Icon: SiSharp },
      { name: "Python", Icon: SiPython },
      { name: "Spring Boot", Icon: SiSpringboot },
      { name: "GraphQL", Icon: SiGraphql },
    ],
    [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Prisma", Icon: SiPrisma },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "MySQL", Icon: SiMysql },
      { name: "WordPress", Icon: SiWordpress },
      { name: "Azure", Icon: TbBrandAzure },
    ],
    [
      { name: "Docker", Icon: SiDocker },
      { name: "GitHub Actions", Icon: SiGithubactions },
      { name: "GitLab CI", Icon: SiGitlab },
      { name: "AWS", Icon: FaAws },
      { name: "Kubernetes", Icon: SiKubernetes },
      { name: "Nginx", Icon: SiNginx },
      { name: "Prometheus", Icon: SiPrometheus },
      { name: "Grafana", Icon: SiGrafana },
      { name: "GCP", Icon: SiGooglecloud },
      { name: "DigitalOcean", Icon: SiDigitalocean },
    ],
  ];

  const renderProjectCta = (project: (typeof featuredProjects)[number]) => {
    const ctaClass =
      "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold w-fit transition-all duration-200";

    if (project.discontinued) {
      return (
        <span
          className={`${ctaClass} bg-white/10 text-zinc-400 cursor-not-allowed`}
          aria-disabled="true"
        >
          <Lock className="h-3.5 w-3.5" />
          {t({ pt: "Descontinuado", en: "Discontinued" })}
        </span>
      );
    }

    if (project.placeholder) {
      return (
        <span
          className={`${ctaClass} bg-white/10 text-zinc-400 cursor-not-allowed`}
          aria-disabled="true"
        >
          {t({ pt: "Em breve", en: "Coming soon" })}
        </span>
      );
    }

    if (project.caseStudy) {
      return (
        <Link
          href={project.caseStudy}
          className={`${ctaClass} bg-white text-violet-700 hover:bg-zinc-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20`}
        >
          {t({ pt: "Saiba mais", en: "Learn more" })}
        </Link>
      );
    }

    if (project.link) {
      return (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${ctaClass} bg-white text-violet-700 hover:bg-zinc-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20`}
        >
          {project.ctaLabel ? t(project.ctaLabel) : t({ pt: "Visite o website", en: "Visit website" })}
        </a>
      );
    }

    return (
      <a
        href="mailto:pontesneto2@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20acesso%20ao%20projeto"
        className={`${ctaClass} bg-white text-violet-700 hover:bg-zinc-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20`}
      >
        <Lock className="h-3.5 w-3.5" />
        {t({ pt: "Solicitar acesso", en: "Request access" })}
      </a>
    );
  };

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
                {/* Logo */}
                <Image
                  src="/images/FCO.png"
                  alt="FCOPTS — Francisco Pontes"
                  width={2500}
                  height={544}
                  priority
                  className="h-9 sm:h-10 w-auto"
                />
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
                  className="group inline-flex items-center gap-1 text-violet-300 text-sm font-medium hover:text-violet-200 transition-colors"
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
            className="relative py-24"
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
                      <span className="text-violet-300">&amp;</span>{" "}
                      {t({ pt: "Design", en: "Design" })}
                    </h2>

                    <div className="mt-6 space-y-4 text-zinc-300 text-[15px] sm:text-base leading-relaxed">
                      <p>
                        {t({
                          pt: "Atuo como Engenheiro de Software e tenho mais de 6 anos de experiência em desenvolvimento Web/Mobile, DevOps e entusiasta de operações UX/UI. Tenho perfil multidisciplinar e atuo na construção de soluções digitais de ponta a ponta.",
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

          {/* SKILLS & TOOLS */}
          <section id="skills-tools" className="relative py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Skills &amp; Tools
              </h2>

              <div className="mt-14 space-y-10">
                {skillsGroups.map((group, groupIndex) => (
                  <motion.div
                    key={groupIndex}
                    variants={staggerTight}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportSettings}
                    className="flex flex-wrap items-start justify-center gap-x-8 gap-y-8"
                  >
                    {group.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={tagItem}
                        className="group flex flex-col items-center gap-2 w-16"
                      >
                        <skill.Icon
                          title={skill.name}
                          className="h-8 w-8 md:h-10 md:w-10 text-zinc-400 group-hover:text-white transition-colors duration-300"
                        />
                        <span className="text-[10px] text-zinc-400 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </div>

              <p className="mt-12 text-xs text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                {t({
                  pt: "+ Docker Compose, Scriptcase, Figma, Adobe XD, Design Systems integrado, Prototipagem, Usabilidade, Acessibilidade, LGPD, Power BI, Scrum/Kanban Ágil",
                  en: "+ Docker Compose, Scriptcase, Figma, Adobe XD, Integrated Design Systems, Prototyping, Usability, Accessibility, LGPD (Brazilian GDPR), Power BI, Agile Scrum/Kanban",
                })}
              </p>
            </div>
          </section>

          {/* PROJETOS EM DESTAQUE - REDESENHADO */}
          <section
            id="projects"
            className="relative py-24 bg-zinc-900/40 overflow-x-hidden"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  {t({ pt: "Projetos em Destaque", en: "Featured Projects" })}
                </h2>
              </div>

              {/* Cards de projetos principais - hero + grid */}
              <motion.div
                variants={staggerList}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
                className="mb-20 space-y-8"
              >
                {(() => {
                  const heroProject = featuredProjects[0];
                  const heroCta = renderProjectCta(heroProject);

                  return (
                    <motion.article
                      custom={0}
                      variants={fadeUpItem}
                      className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl grid md:grid-cols-2 items-stretch hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative min-h-[260px] md:min-h-full">
                        {heroProject.thumb ? (
                          <Image
                            src={heroProject.thumb}
                            alt={`${t({ pt: "Capa do projeto", en: "Project cover" })}: ${heroProject.title}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                          />
                        ) : (
                          <div className="h-full min-h-[260px] w-full bg-gradient-to-br from-violet-500/20 via-transparent to-fuchsia-500/20" />
                        )}
                      </div>
                      <div className="relative flex flex-col justify-center p-8 md:p-10 bg-gradient-to-br from-violet-900/70 via-fuchsia-900/40 to-violet-950/80">
                        <span className="inline-block w-fit px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/10 text-violet-200 border border-white/20 mb-4">
                          {t(heroProject.category)}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {heroProject.title}
                        </h3>
                        {t(heroProject.subtitle) && (
                          <span className="inline-block text-xs text-amber-300 font-medium mt-1">
                            {t(heroProject.subtitle)}
                          </span>
                        )}
                        <p className="mt-4 text-sm md:text-base text-zinc-200 leading-relaxed">
                          {t(heroProject.blurb)}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {heroProject.tags.map((tag) => (
                            <ProjectTagIcon key={tag} tag={tag} />
                          ))}
                        </div>
                        <div className="mt-7">{heroCta}</div>
                      </div>
                    </motion.article>
                  );
                })()}

                <div className="grid md:grid-cols-2 gap-8">
                  {featuredProjects.slice(1).map((project, index) => {
                    const cta = renderProjectCta(project);

                    return (
                      <motion.article
                        key={project.title}
                        custom={index + 1}
                        variants={fadeUpItem}
                        className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="relative h-56 w-full">
                          {project.thumb ? (
                            <Image
                              src={project.thumb}
                              alt={`${t({ pt: "Capa do projeto", en: "Project cover" })}: ${project.title}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover object-center"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-violet-500/20 via-transparent to-fuchsia-500/20" />
                          )}
                        </div>
                        <div className="relative flex-1 flex flex-col p-8 bg-gradient-to-br from-violet-900/70 via-fuchsia-900/40 to-violet-950/80">
                          <span className="inline-block w-fit px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/10 text-violet-200 border border-white/20 mb-4">
                            {t(project.category)}
                          </span>
                          <h3 className="text-xl font-bold text-white">
                            {project.title}
                          </h3>
                          {t(project.subtitle) && (
                            <span className="inline-block text-xs text-amber-300 font-medium mt-1">
                              {t(project.subtitle)}
                            </span>
                          )}
                          <p className="mt-4 text-sm text-zinc-200 leading-relaxed">
                            {t(project.blurb)}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <ProjectTagIcon key={tag} tag={tag} />
                            ))}
                          </div>
                          <div className="mt-auto pt-7">{cta}</div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </motion.div>

              {/* Mais projetos - grid compacto de 6 */}
              <motion.div
                variants={staggerTight}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
              >
                {Array.from({ length: 6 }).map((_, index) => {
                  const project = moreProjectsGrid[index];

                  if (!project) {
                    return (
                      <motion.div
                        key={index}
                        variants={tagItem}
                        className="flex flex-col items-center text-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
                      >
                        <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                          <Folder className="h-5 w-5 text-violet-300" />
                        </div>
                        <h3 className="text-sm font-semibold text-white">
                          {t({ pt: `Projeto ${index + 1}`, en: `Project ${index + 1}` })}
                        </h3>
                        <span className="mt-auto inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-zinc-400 cursor-not-allowed">
                          {t({ pt: "Em breve", en: "Coming soon" })}
                        </span>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={project.title}
                      variants={tagItem}
                      className="flex flex-col items-center text-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <Folder className="h-5 w-5 text-violet-300" />
                      </div>
                      <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 w-full">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-violet-300 font-medium w-full leading-snug">
                        <Building2 className="inline h-3 w-3 -mt-0.5 mr-1" />
                        {project.org}
                      </p>
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-1">
                          {project.tags.map((tag) => (
                            <ProjectTagIcon key={tag} tag={tag} size="sm" />
                          ))}
                        </div>
                      )}
                      <div className="mt-auto">
                        {project.cta.type === "private" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-zinc-400 cursor-not-allowed">
                            <Lock className="h-3 w-3" />
                            {t({ pt: "Privado", en: "Private" })}
                          </span>
                        ) : project.cta.type === "link" ? (
                          <a
                            href={project.cta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/5 hover:border-white/30 transition-all duration-200"
                          >
                            {t({ pt: "Visite", en: "Visit" })}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-zinc-400 cursor-not-allowed">
                            {t({ pt: "Em breve", en: "Coming soon" })}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
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
