"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import SkillsTools, { SKILL_NAMES } from "@/components/SkillsTools";
import GithubStats from "@/components/GithubStats";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { CV_URL } from "@/lib/constants";
import {
  Code,
  Mail,
  Github,
  Linkedin,
  Menu,
  Lock,
  X,
  Folder,
  Building2,
  Monitor,
  Globe,
  Briefcase,
  FileDown,
  Search,
  ChevronLeft,
  Clock,
  Smartphone,
  Users,
  Gauge,
  TrendingDown,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiPhp,
  SiLaravel,
  SiDotnet,
  SiSharp,
  SiSpringboot,
  SiMongodb,
  SiGrafana,
  SiWordpress,
  SiAngular,
  SiGit,
  SiJira,
  SiGithub,
  SiTailwindcss,
  SiBootstrap,
  SiPrometheus,
  SiSymfony,
  SiFigma,
  SiVercel,
} from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa6";
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

function SearchBox({
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
  GitHub: SiGithub,
  Grafana: SiGrafana,
  TailwindCSS: SiTailwindcss,
  MongoDB: SiMongodb,
  JS: SiJavascript,
  "Java Spring Boot": SiSpringboot,
  WordPress: SiWordpress,
  Bootstrap: SiBootstrap,
  Prometheus: SiPrometheus,
  Symfony: SiSymfony,
  Figma: SiFigma,
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerBlurred, setHeaderBlurred] = useState(false);
  const moreProjectsScrollRef = useRef<HTMLDivElement>(null);
  const [moreProjectsScrollProgress, setMoreProjectsScrollProgress] = useState(0);
  const [moreProjectsThumbWidth, setMoreProjectsThumbWidth] = useState(33);
  const [moreProjectsCurrentIndex, setMoreProjectsCurrentIndex] = useState(0);

  const updateMoreProjectsScrollProgress = () => {
    const el = moreProjectsScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setMoreProjectsScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    setMoreProjectsThumbWidth(Math.min(100, (el.clientWidth / el.scrollWidth) * 100));

    const firstCard = el.children[0] as HTMLElement | undefined;
    if (firstCard) {
      const gap = 16;
      const cardStep = firstCard.offsetWidth + gap;
      const index = Math.round(el.scrollLeft / cardStep);
      setMoreProjectsCurrentIndex(Math.max(0, Math.min(moreProjectsSlotCount - 1, index)));
    }
  };

  useEffect(() => {
    updateMoreProjectsScrollProgress();
    window.addEventListener("resize", updateMoreProjectsScrollProgress);
    return () => window.removeEventListener("resize", updateMoreProjectsScrollProgress);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 10) {
        setHeaderBlurred(false);
      } else if (currentY > lastY) {
        setHeaderBlurred(true);
      } else if (currentY < lastY) {
        setHeaderBlurred(false);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-search-box]")) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

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

  const staggerSequential = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isMobile ? 0.16 : 0.18,
        delayChildren: 0.05,
      },
    },
  };

  const fadeInItem = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  const fadeInHeading = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  const FEATURED_PROJECT_BG = "bg-gradient-to-br from-violet-950/40 via-black/60 to-black/90";

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
    highlights?: Array<{ icon: LucideIcon; value: Bilingual }>;
    impact?: Array<{ icon: LucideIcon; value: Bilingual; label: Bilingual }>;
    bgClass: string;
    scrimClass?: string;
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
      ctaLabel: { pt: "Visite o website comercial", en: "Visit commercial website" },
      blurb: {
        pt: "Aplicativo para conectar motoristas e oficinas de maneira inteligente, simplificando agendamentos, orçamentos e o acompanhamento de serviços automotivos. Idealizadora: Click Software House.",
        en: "App that connects drivers and repair shops intelligently, simplifying bookings, quotes and tracking of automotive services. Idealized by: Click Software House.",
      },
      category: { pt: "Aplicativo Mobile + Sistemas Web", en: "Mobile App + Web Systems" },
      thumb: "/img-card-meoocarro.png",
      bgClass: FEATURED_PROJECT_BG,
      highlights: [
        { icon: Clock, value: { pt: "5 meses de produção", en: "5 months in production" } },
        { icon: Briefcase, value: { pt: "DevOps solo", en: "Solo DevOps" } },
        { icon: Smartphone, value: { pt: "iOS + Android + Web + Admin", en: "iOS + Android + Web + Admin" } },
        { icon: Building2, value: { pt: "Idealizadora: Click SF", en: "Idealized by: Click SF" } },
      ],
      impact: [
        { icon: Users, value: { pt: "200+", en: "200+" }, label: { pt: "Usuários ativos", en: "Active users" } },
        { icon: Gauge, value: { pt: "99,9%", en: "99.9%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: TrendingDown, value: { pt: "-35%", en: "-35%" }, label: { pt: "Tempo de agendamento", en: "Scheduling time" } },
      ],
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
      category: { pt: "Aplicativo Mobile + Sistemas Web", en: "Mobile App + Web Systems" },
      thumb: "/logo-dooh.png",
      bgClass: FEATURED_PROJECT_BG,
      highlights: [
        { icon: Clock, value: { pt: "6 meses", en: "6 months" } },
        { icon: Smartphone, value: { pt: "iOS + Android + Web + Admin", en: "iOS + Android + Web + Admin" } },
        { icon: Building2, value: { pt: "Idealizadora: Click SF", en: "Idealized by: Click SF" } },
      ],
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
      bgClass: FEATURED_PROJECT_BG,
      highlights: [
        { icon: Clock, value: { pt: "1,2 anos de produção", en: "1.2 years in production" } },
        { icon: Users, value: { pt: "Equipe: 4 → 3 devs", en: "Team: 4 → 3 devs" } },
        { icon: Smartphone, value: { pt: "PWA + Sistemas Web", en: "PWA + Web Systems" } },
      ],
      impact: [
        { icon: Users, value: { pt: "2.350+", en: "2,350+" }, label: { pt: "Usuários ativos", en: "Active users" } },
        { icon: Gauge, value: { pt: "99,9%", en: "99.9%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: TrendingDown, value: { pt: "-40%", en: "-40%" }, label: { pt: "Manutenção semanal", en: "Weekly maintenance" } },
        { icon: Rocket, value: { pt: "-2 meses", en: "-2 months" }, label: { pt: "MVP antes do prazo", en: "MVP ahead of schedule" } },
      ],
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
      title: "Website Instituto Agropolos",
      org: "Instituto Agropolos do Ceará",
      description: {
        pt: "Site institucional do instituto, com apresentação de projetos e informações institucionais.",
        en: "Institutional website for the institute, presenting projects and institutional information.",
      },
      tags: ["WordPress", "PHP", "Symfony", "Figma"],
      cta: { type: "link", url: "https://institutoagropolos.org.br/" },
    },
    {
      title: "Sistema SIGMA",
      org: "Instituto Agropolos do Ceará",
      description: {
        pt: "Sistema de gestão institucional para controle de processos administrativos e indicadores internos.",
        en: "Institutional management system for administrative processes and internal indicators.",
      },
      tags: [".NET", "C#", "Angular", "MongoDB", "Docker", "Git", "TypeScript"],
      cta: { type: "link", url: "http://sigapp.institutoagropolos.org.br/login" },
    },
    {
      title: "Sistema Especial Fazenda Chapéu",
      org: "SDA Ceará",
      description: {
        pt: "Sistema de regularização de matrícula de imóveis cedidos para a população do estado do Ceará.",
        en: "System for regularizing land title records granted to the population of Ceará state.",
      },
      tags: ["Scriptcase", "PHP", "JS", "Java Spring Boot", "PostgreSQL", "Docker", "Git"],
      cta: { type: "link", url: "https://www.idace.ce.gov.br/" },
    },
    {
      title: "Sistema de Indicadores de Demandas e Ações",
      org: "SDA Ceará",
      description: {
        pt: "Painel de acompanhamento de demandas e ações estratégicas da secretaria, com indicadores em tempo real.",
        en: "Dashboard to track the department's demands and strategic actions, with real-time indicators.",
      },
      tags: ["PHP", "Laravel", "PostgreSQL", "Docker", "Git"],
      cta: { type: "link", url: "https://www.com3brasil.com.br/v9/app/demanda/login/" },
    },
    {
      title: "Website Instituto Anjos",
      org: "Anjos Digitais",
      description: {
        pt: "Site institucional para divulgação de projetos sociais e captação de apoiadores.",
        en: "Institutional website to promote social projects and attract supporters.",
      },
      tags: ["WordPress", "PHP", "JS", "Bootstrap", "Docker", "Git"],
      cta: { type: "link", url: "https://anjosdigitais.org/" },
    },
    {
      title: "Website UJVP CE",
      org: "União dos Jovens do Vicente Pinzon",
      description: {
        pt: "Site institucional da organização social, com apresentação da entidade e canais de contato.",
        en: "Institutional website for the nonprofit organization, with an overview and contact channels.",
      },
      tags: ["WordPress", "PHP", "Docker", "Git"],
      cta: { type: "link", url: "https://ujvp.org.br/" },
    },
    {
      title: "Integra - Projeto São José IV",
      org: "Governo do Estado do Ceará",
      description: {
        pt: "Sistema de gestão do Projeto São José IV, com monitoramento de indicadores via Grafana e Prometheus.",
        en: "Management system for the São José IV Project, with indicator monitoring via Grafana and Prometheus.",
      },
      tags: ["Git", "Docker", ".NET", "C#", "Angular", "Prometheus", "Grafana"],
      cta: { type: "link", url: "https://integrapsj.sda.ce.gov.br/login" },
    },
    {
      title: "FEDAF - Fundo Est. de Desenv. Agric.",
      org: "Governo do Estado do Ceará",
      description: {
        pt: "Sistema de gestão do Fundo Estadual de Desenvolvimento da Agricultura Familiar.",
        en: "Management system for the State Fund for Family Agriculture Development.",
      },
      tags: ["Git", "Docker", "PHP", "Laravel", "Angular", "Scriptcase"],
      cta: { type: "link", url: "https://sistemas2.sda.ce.gov.br/scriptcase/app/fedaf/login/" },
    },
    {
      title: "SECAF - Sis. Estadual de cad. da Agric. Famil.",
      org: "Governo do Estado do Ceará",
      description: {
        pt: "Sistema estadual de cadastro de produtores da agricultura familiar.",
        en: "State-level registry system for family farming producers.",
      },
      tags: ["Git", "Docker", ".NET", "C#", "PHP"],
      cta: { type: "link", url: "https://sistemas2.sda.ce.gov.br/scriptcase/app/secaf/login/" },
    },
    {
      title: "Website SDA Ceará",
      org: "Governo do Estado do Ceará",
      description: {
        pt: "Site institucional da Secretaria do Desenvolvimento Agrário do Ceará, no qual atuei apenas com manutenção.",
        en: "Institutional website for the Ceará State Agrarian Development Department, on which I worked on maintenance only.",
      },
      tags: ["WordPress", "PHP"],
      cta: { type: "link", url: "https://www.sda.ce.gov.br/" },
    },
    {
      title: "Website Silva & Duarte Advogados",
      org: "Silva & Duarte Advocacia",
      description: {
        pt: "Site institucional do escritório de advocacia, com apresentação das áreas de atuação e canais de contato.",
        en: "Institutional website for the law firm, presenting its practice areas and contact channels.",
      },
      tags: ["GitHub", "Git", "TypeScript", "JS", "TailwindCSS"],
      cta: { type: "link", url: "https://www.silvaeduarteadvogados.com/" },
    },
    {
      title: "Sistema Diário de Obras",
      org: "Alfa Construções e Locações",
      description: {
        pt: "Diário de obras digital para registrar atividades, ocorrências e o avanço físico da construção.",
        en: "Digital construction logbook to record activities, incidents and physical progress.",
      },
      tags: ["NodeJS", "ExpressJS", "Prisma", "PostgreSQL", "Docker", "Git", "TailwindCSS", "TypeScript"],
      cta: { type: "private" },
    },
  ];

  const moreProjectsSlotCount = 12;

  const experience: Array<{
    company: string;
    startRole?: Bilingual;
    role: Bilingual;
    period: string;
    remote?: boolean;
    languages?: string;
  }> = [
    {
      company: "Star Capital",
      role: {
        pt: "Engenheiro de Software | Gerenciamento de Projeto",
        en: "Software Engineer | Project Management",
      },
      period: "06/2025-07/2026",
    },
    {
      company: "FlixBus Tickets 🇮🇪",
      role: { pt: "Sênior Desenvolvedor Full Stack", en: "Senior Full Stack Developer" },
      period: "2024–2025",
      remote: true,
      languages: "PT/EN",
    },
    {
      company: "FedEX Services 🇵🇹",
      role: { pt: "Sênior Desenvolvedor Full Stack", en: "Senior Full Stack Developer" },
      period: "2024–2025",
      remote: true,
      languages: "PT/EN",
    },
    {
      company: "Instituto Anjos Digitais",
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
      role: {
        pt: "Analista de Sistemas Jr",
        en: "Jr Systems Analyst",
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

  const renderProjectCta = (project: (typeof featuredProjects)[number]) => {
    const ctaClass =
      "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold w-fit transition-all duration-200";
    const solidClass =
      "bg-white text-violet-700 hover:bg-zinc-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20";

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
        <Link href={project.caseStudy} className={`${ctaClass} ${solidClass}`}>
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
          className={`${ctaClass} ${solidClass}`}
        >
          {project.ctaLabel ? t(project.ctaLabel) : t({ pt: "Visite o website", en: "Visit website" })}
        </a>
      );
    }

    return (
      <a
        href="mailto:pontesneto2@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20acesso%20ao%20projeto"
        className={`${ctaClass} ${solidClass}`}
      >
        <Lock className="h-3.5 w-3.5" />
        {t({ pt: "Solicitar acesso", en: "Request access" })}
      </a>
    );
  };

  const navLinks = [
    { href: "#intro", label: { pt: "Sobre", en: "About" } },
    { href: "#skills-tools", label: { pt: "Skills & Tools", en: "Skills & Tools" } },
    { href: "#projects", label: { pt: "Projetos", en: "Projects" } },
    { href: "#experience", label: { pt: "Trajetória", en: "Journey" } },
    { href: "#about", label: { pt: "Contato", en: "Contact" } },
  ];

  const searchIndex: Array<{ label: string; href: string; group: Bilingual }> = [
    ...navLinks.map((link) => ({
      label: t(link.label),
      href: link.href,
      group: { pt: "Seção", en: "Section" },
    })),
    ...featuredProjects.map((p) => ({
      label: p.title,
      href: "#projects",
      group: { pt: "Projeto", en: "Project" },
    })),
    ...moreProjectsGrid.map((p) => ({
      label: p.title,
      href: "#projects",
      group: { pt: "Projeto", en: "Project" },
    })),
    ...SKILL_NAMES.map((name) => ({
      label: name,
      href: "#skills-tools",
      group: { pt: "Skill", en: "Skill" },
    })),
  ];

  const searchResults =
    searchQuery.trim().length > 0
      ? searchIndex
          .filter((entry) =>
            entry.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
          )
          .slice(0, 7)
      : [];

  const handleSearchSelect = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans relative isolate">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t({ pt: "Pular para o conteúdo", en: "Skip to content" })}
      </a>
      <FloatingIcons3D />

      <div className="relative z-10">
        {/* NAV */}
        <header
          className={`sticky top-0 z-50 border-b transition-all duration-300 ${
            headerBlurred
              ? "border-white/10 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/30"
              : "border-white/5 bg-black/80"
          }`}
        >
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 md:py-0 md:h-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="flex items-center gap-2 sm:gap-3"
              >
                {/* Logo */}
                <Image
                  src="/images/FCO.png"
                  alt="FCOPTS — Francisco Pontes"
                  width={2500}
                  height={544}
                  priority
                  className="h-9 sm:h-10 w-auto"
                />
              </motion.div>
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
                className="hidden md:flex items-center gap-8 text-sm"
              >
                <div className="flex items-center gap-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="hover:text-white/90 text-zinc-300"
                    >
                      {t(link.label)}
                    </a>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <LanguageSwitch lang={lang} setLang={setLang} />
                  <a
                    href={CV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-700/20"
                  >
                    {t({ pt: "Baixar CV", en: "Download CV" })}
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
              </motion.nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
                className="flex items-center gap-2 md:hidden"
              >
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
                  {navOpen ? (
                    <X className="h-5 w-5 text-zinc-200" />
                  ) : (
                    <Menu className="h-5 w-5 text-zinc-200" />
                  )}
                </button>
              </motion.div>
            </div>
          </div>
          {navOpen && (
            <div
              id="mobile-nav"
              className="md:hidden border-t border-white/5 bg-[#141418]"
            >
              <div className="mx-auto max-w-7xl px-3 py-4 flex flex-col gap-2">
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center rounded-xl px-3 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium shadow-lg shadow-fuchsia-700/20"
                  onClick={() => setNavOpen(false)}
                >
                  {t({ pt: "Baixar CV", en: "Download CV" })}
                </a>
                {navLinks.map((i) => (
                  <a
                    key={i.href}
                    href={i.href}
                    className="text-zinc-200 text-sm rounded-xl px-3 py-3 hover:bg-gradient-to-r hover:from-violet-600/20 hover:to-fuchsia-500/20 transition-all"
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
                className="mb-6 whitespace-normal sm:whitespace-nowrap text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight md:tracking-wide"
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
            className="relative py-14 border-t border-white/5"
          >
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportSettings}
                transition={{ duration: 0.7, ease: easeOut }}
                className="text-white text-base sm:text-lg leading-relaxed"
              >
                {t({
                  pt: "Graduado em Análise e Desenvolvimento de Sistemas pela Universidade Farias Brito, em Fortaleza. Pós Graduado em Engenharia de Software com ênfase em Devops*. Especializado em Desenvolvimento Full Stack pela Digital College. Especializado em UX/UI e design de Produtos Digitais pela EBAC*.",
                  en: "Bachelor's degree in Systems Analysis and Development from Universidade Farias Brito, in Fortaleza. Postgraduate in Software Engineering with an emphasis on DevOps*. Specialized in Full Stack Development from Digital College. Specialized in UX/UI and Digital Product Design from EBAC*.",
                })}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportSettings}
                transition={{ duration: 0.7, ease: easeOut, delay: 0.05 }}
                className="mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed"
              >
                {t({
                  pt: "Hoje, meu foco é liderar tecnicamente produtos digitais de ponta a ponta — da arquitetura ao deploy — combinando desenvolvimento Full Stack, DevOps e uma visão de produto orientada a resultado.",
                  en: "Today, my focus is leading digital products end-to-end from a technical standpoint — from architecture to deploy — combining Full Stack development, DevOps and a results-driven product mindset.",
                })}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportSettings}
                transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="https://github.com/pontesneto2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 border border-white/30 text-white text-sm font-medium hover:bg-white/5 hover:border-white/50 transition-all duration-300"
                >
                  {t({ pt: "Confira meu Github", en: "Check out my GitHub" })}
                  <Github className="h-4 w-4 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/fcopts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-violet-300 text-sm font-medium hover:text-violet-200 transition-colors"
                >
                  {t({ pt: "Visite-me no LinkedIn", en: "Visit me on LinkedIn" })}
                  <Linkedin className="h-4 w-4 text-violet-300 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </div>
          </section>

          {/* SOBRE - Tecnologia, Engenharia & Design */}
          <section
            id="tech-engineering-design"
            className="relative py-14"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="relative rounded-3xl border-2 border-white/15 bg-black/70 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
                <div className="relative grid md:grid-cols-2 gap-6 items-stretch">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <motion.h2
                      variants={fadeInHeading}
                      initial="hidden"
                      whileInView="show"
                      viewport={viewportSettings}
                      className="text-[2.1rem] sm:text-[2.6rem] md:text-[3.30rem] font-black leading-tight text-white"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      <span className="lg:whitespace-nowrap">
                        {t({ pt: "Tecnologia,", en: "Technology," })}{" "}
                        <br className="lg:hidden" />
                        {t({ pt: "Engenharia", en: "Engineering" })}
                      </span>
                      <br />
                      <span className="text-violet-300">&amp;</span>{" "}
                      {t({ pt: "Design", en: "Design" })}
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={viewportSettings}
                      transition={{ duration: 0.7, ease: easeOut }}
                      className="mt-12 space-y-4 text-zinc-300 text-[15px] sm:text-[16px] leading-relaxed"
                    >
                      <p>
                        {t({
                          pt: "Atuo como Engenheiro de Software e tenho mais de 6 anos de experiência em desenvolvimento Web/Mobile, DevOps e entusiasta de operações UX/UI. Tenho perfil multidisciplinar e atuo na construção de soluções digitais de ponta a ponta.",
                          en: "I'm a Software Engineer with over 6 years of experience in Web/Mobile development, DevOps, and I'm an enthusiast of UX/UI operations. I have a multidisciplinary profile and work on building end-to-end digital solutions.",
                        })}
                      </p>
                      <p>
                        {t({
                          pt: "Ao longo da minha trajetória, participei de projetos em sistemas legado para o setor público, setor privado e iniciativas internacionais, passando por empresas como Star Capital, Instituto Anjos Digitais, Secretaria do Desenvolvimento Agrário do Ceará, Instituto Agropolos do Ceará, Com3 Brasil, Grupo Laredo, White Martins Gases do Ar e experiências internacionais. Essa vivência me permitiu atuar em produtos digitais de diferentes complexidades*.",
                          en: "Throughout my career, I've worked on legacy system projects for the public sector, private sector and international initiatives, passing through companies such as Star Capital, Instituto Anjos Digitais, Secretaria do Desenvolvimento Agrário do Ceará, Instituto Agropolos do Ceará, Com3 Brasil, Grupo Laredo, White Martins Gases do Ar, and international experiences. That journey let me work on digital products of different complexities*.",
                        })}{" "}
                        <span className="italic text-violet-300">
                          {t({
                            pt: "Uso, automatizo e me especializo cada vez mais em Inteligência Artificial mas ainda sou da geração old school que codificava na mão consultando o stackoverflow*, rs.",
                            en: "I use, automate and keep specializing in Artificial Intelligence — but the old-school generation that used to hand-code while checking StackOverflow* is still alive, ha.",
                          })}
                        </span>
                      </p>
                    </motion.div>

                    <motion.a
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={viewportSettings}
                      transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
                      href={CV_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-8 self-start w-[40%] min-w-fit flex items-center justify-center gap-2 rounded-full px-6 py-2.5 border border-violet-400/50 text-violet-300 text-sm font-medium hover:bg-violet-500/10 hover:border-violet-400/70 transition-all duration-300"
                    >
                      {t({ pt: "Veja o currículo completo", en: "See the full résumé" })}
                      <FileDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    </motion.a>
                  </div>

                  <div className="relative aspect-square md:aspect-auto md:min-h-full">
                    <Image
                      src="/images/img-site-pn.webp"
                      alt="Francisco Pontes — código e engenharia"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain md:object-cover object-center md:object-left"
                    />
                  </div>
                </div>

                <div className="relative px-8 pt-8 pb-8 md:px-12 md:pt-0 md:pb-12">
                  <GithubStats />
                </div>
              </div>
            </div>
          </section>

          <SkillsTools />

          {/* PROJETOS EM DESTAQUE - REDESENHADO */}
          <section
            id="projects"
            className="relative py-14 bg-zinc-900/40 overflow-x-hidden"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="text-center mb-12">
                <motion.h2
                  variants={fadeInHeading}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportSettings}
                  className="text-[2.1rem] sm:text-[2.6rem] md:text-[3.30rem] font-black text-white"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t({ pt: "Projetos em Destaque", en: "Featured Projects" })}
                </motion.h2>
                <p className="mt-2 text-[10px] font-light uppercase tracking-[0.2em] text-zinc-500">
                  {t({
                    pt: "Portfolio de Francisco Pontes — Engenheiro de Software Full Stack",
                    en: "Francisco Pontes' Portfolio — Full Stack Software Engineer",
                  })}
                </p>
              </div>

              {/* Cards de projetos principais - hero + grid */}
              <motion.div
                variants={staggerList}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
                className="mb-8 space-y-8"
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
                      <div className={`relative flex flex-col justify-center p-8 md:p-10 overflow-hidden ${heroProject.bgClass}`}>
                        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
                        <div className="relative">
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
                          {heroProject.highlights && (
                            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                              {heroProject.highlights.map((h, i) => {
                                const Icon = h.icon;
                                return (
                                  <div
                                    key={i}
                                    className="flex items-center gap-1.5 text-xs text-zinc-200"
                                  >
                                    <Icon className="h-3.5 w-3.5 text-violet-300" />
                                    <span>{t(h.value)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {heroProject.impact && (
                            <div
                              className={`mt-5 pt-5 border-t border-white/10 grid gap-4 ${
                                heroProject.impact.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
                              }`}
                            >
                              {heroProject.impact.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                  <div key={i} className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-base font-semibold text-white">
                                      <Icon className="h-3.5 w-3.5 text-violet-300" />
                                      {t(stat.value)}
                                    </div>
                                    <span className="text-[11px] text-zinc-400 leading-tight">
                                      {t(stat.label)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          <div className="mt-5 flex flex-wrap gap-2">
                            {heroProject.tags.map((tag) => (
                              <ProjectTagIcon key={tag} tag={tag} />
                            ))}
                          </div>
                          <div className="mt-7">{heroCta}</div>
                        </div>
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
                        <div className={`relative flex-1 flex flex-col p-8 overflow-hidden ${project.bgClass}`}>
                          <div
                            className={`absolute inset-0 pointer-events-none ${
                              project.scrimClass ?? "bg-gradient-to-t from-black/20 via-transparent to-white/5"
                            }`}
                          />
                          <div className="relative flex-1 flex flex-col">
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
                            {project.highlights && (
                              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                                {project.highlights.map((h, i) => {
                                  const Icon = h.icon;
                                  return (
                                    <div
                                      key={i}
                                      className="flex items-center gap-1.5 text-xs text-zinc-200"
                                    >
                                      <Icon className="h-3.5 w-3.5 text-violet-300" />
                                      <span>{t(h.value)}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {project.impact && (
                              <div
                                className={`mt-5 pt-5 border-t border-white/10 grid gap-4 ${
                                  project.impact.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
                                }`}
                              >
                                {project.impact.map((stat, i) => {
                                  const Icon = stat.icon;
                                  return (
                                    <div key={i} className="flex flex-col gap-1">
                                      <div className="flex items-center gap-1.5 text-base font-semibold text-white">
                                        <Icon className="h-3.5 w-3.5 text-violet-300" />
                                        {t(stat.value)}
                                      </div>
                                      <span className="text-[11px] text-zinc-400 leading-tight">
                                        {t(stat.label)}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            <div className="mt-5 flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <ProjectTagIcon key={tag} tag={tag} />
                              ))}
                            </div>
                            <div className="mt-auto pt-7">{cta}</div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </motion.div>

              {/* Mais projetos - carrossel com scroll nativo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportSettings}
                transition={{ duration: 0.7, ease: easeOut }}
                className="mb-3"
              >
                <h3
                  className="text-xl font-bold text-white flex items-center gap-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t({ pt: "Outros projetos", en: "Other projects" })}
                  <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent tabular-nums">
                    {moreProjectsCurrentIndex + 1}/{moreProjectsSlotCount}
                  </span>
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportSettings}
                transition={{ duration: 0.7, ease: easeOut }}
                className="relative mb-20"
              >
                <div
                  ref={moreProjectsScrollRef}
                  onScroll={updateMoreProjectsScrollProgress}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-1 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {Array.from({ length: moreProjectsSlotCount }).map((_, index) => {
                      const project = moreProjectsGrid[index];

                      if (!project) {
                        return (
                          <div
                            key={index}
                            className="snap-start shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]"
                          >
                            <div className="relative flex h-full flex-col items-center text-center gap-3 overflow-hidden rounded-2xl border border-white/30 bg-white/[0.18] backdrop-blur-2xl backdrop-saturate-150 p-5 shadow-lg shadow-black/20">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent pointer-events-none" />
                              <div className="relative h-11 w-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                <Folder className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="relative text-sm font-semibold text-white">
                                {t({ pt: `Projeto ${index + 1}`, en: `Project ${index + 1}` })}
                              </h3>
                              <span className="relative mt-auto inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-zinc-300 cursor-not-allowed">
                                {t({ pt: "Em breve", en: "Coming soon" })}
                              </span>
                            </div>
                          </div>
                        );
                      }

                      const CardIcon = project.title.startsWith("Website") ? Globe : Monitor;

                      return (
                        <div
                          key={project.title}
                          className="snap-start shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]"
                        >
                          <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/30 bg-white/[0.18] backdrop-blur-2xl backdrop-saturate-150 p-5 shadow-lg shadow-black/20 hover:border-white/40 hover:bg-white/[0.24] hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent pointer-events-none" />
                            <div className="relative flex items-center gap-3">
                              <div className="h-11 w-11 shrink-0 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                <CardIcon className="h-5 w-5 text-white" />
                              </div>
                              <div className="min-w-0 text-left">
                                <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">
                                  {project.title}
                                </h3>
                                <p className="text-[11px] text-zinc-200 font-medium leading-snug flex items-center gap-1 mt-0.5">
                                  <Building2 className="h-3 w-3 shrink-0" />
                                  <span className="truncate">{project.org}</span>
                                </p>
                              </div>
                            </div>
                            <p className="relative text-xs text-zinc-300 leading-relaxed line-clamp-2 text-left">
                              {t(project.description)}
                            </p>
                            {project.tags.length > 0 && (
                              <div className="relative flex flex-wrap items-center gap-1 max-h-[52px] overflow-hidden">
                                {project.tags.map((tag) => (
                                  <ProjectTagIcon key={tag} tag={tag} size="sm" />
                                ))}
                              </div>
                            )}
                            <div className="relative mt-auto pt-1">
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
                                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-violet-700 hover:bg-zinc-100 transition-all duration-200"
                                >
                                  {t({ pt: "Visite", en: "Visit" })}
                                </a>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-zinc-400 cursor-not-allowed">
                                  {t({ pt: "Em breve", en: "Coming soon" })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="mt-4 mx-auto h-1.5 w-full max-w-xs rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-[margin-left] duration-150"
                    style={{
                      width: `${moreProjectsThumbWidth}%`,
                      marginLeft: `${moreProjectsScrollProgress * (100 - moreProjectsThumbWidth)}%`,
                    }}
                  />
                </div>
              </motion.div>

            </div>
          </section>

          {/* TRAJETÓRIA PROFISSIONAL - Discreto e Elegante */}
          <section id="experience" className="relative py-14">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <motion.h2
                variants={fadeInHeading}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
                className="text-[2.1rem] sm:text-[2.6rem] md:text-[3.30rem] font-black text-white mb-12 text-center"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t({ pt: "Trajetória Profissional", en: "Professional Journey" })}
              </motion.h2>
              <motion.div
                variants={staggerSequential}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12"
              >
                {experience.map((exp, index) => {
                  const isCurrent = index === 0;
                  return (
                  <motion.div
                    key={exp.company}
                    variants={fadeInItem}
                    className="relative"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {isCurrent ? (
                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75 animate-ping" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-400" />
                        </span>
                      ) : (
                        <ChevronLeft className="h-3.5 w-3.5 text-violet-400/50 shrink-0 rotate-90 md:rotate-0" />
                      )}
                      <div
                        className={`h-px flex-1 bg-gradient-to-l ${
                          isCurrent ? "from-violet-400/70" : "from-violet-400/30"
                        } to-transparent`}
                      />
                    </div>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4 className="font-semibold text-sm text-white flex-1 min-w-0 break-words">
                        {exp.company}
                      </h4>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[8px] text-violet-400 bg-violet-500/10 px-1.5 py-[2px] rounded border border-violet-500/20 whitespace-nowrap font-semibold">
                          {exp.period}
                        </span>
                        {exp.remote ? (
                          <span className="text-[8px] text-fuchsia-300 bg-fuchsia-500/10 px-1.5 py-[2px] rounded border border-fuchsia-500/20 whitespace-nowrap font-semibold">
                            {t({ pt: "Remoto", en: "Remote" })}
                          </span>
                        ) : null}
                        {exp.languages ? (
                          <span className="text-[8px] text-zinc-300 bg-white/5 px-1.5 py-[2px] rounded border border-white/10 whitespace-nowrap font-semibold">
                            {exp.languages}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <p className="text-xs text-violet-300 leading-relaxed">
                      <Briefcase className="inline h-3 w-3 -mt-0.5 mr-1" />
                      {t(exp.role)}
                    </p>
                    {exp.startRole ? (
                      <div className="text-[10px] text-zinc-400 mt-2 flex items-center gap-2">
                        <span className="truncate">
                          {t({ pt: "Cargo Inicial", en: "Starting Role" })}: {t(exp.startRole)}
                        </span>
                      </div>
                    ) : null}
                  </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          <Testimonials />

          {/* LINKEDIN - Compartilhando o dia a dia */}
          <section className="relative py-10">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportSettings}
                transition={{ duration: 0.7, ease: easeOut }}
                className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-black/60 via-[#0d1b2a]/70 to-black/60 backdrop-blur-xl shadow-2xl overflow-hidden p-8 md:p-12"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/5 via-transparent to-violet-500/5 pointer-events-none" />

                <div className="relative grid md:grid-cols-[1.05fr_1.35fr] gap-10 items-center">
                  <div>
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-[#0A66C2]">
                      <Linkedin className="h-5 w-5 text-white" />
                    </span>
                    <h3
                      className="mt-3 text-2xl md:text-3xl font-bold text-white"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {t({ pt: "Meu dia a dia no LinkedIn", en: "My day-to-day on LinkedIn" })}
                    </h3>
                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                      {t({
                        pt: "Compartilho bastidores, aprendizados e bastante conteúdo sobre Engenharia de Software, Desenvolvimento, Arquitetura e muito mais... Vamos nos conectar!",
                        en: "I share behind-the-scenes moments, learnings and lots of content about Software Engineering, Development, Architecture and much more... Let's connect!",
                      })}
                    </p>
                    <a
                      href="https://www.linkedin.com/in/fcopts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold w-fit bg-white text-[#0A66C2] hover:bg-zinc-100 hover:scale-[1.03] transition-all duration-200"
                    >
                      <Linkedin className="h-4 w-4" />
                      {t({ pt: "Me siga no LinkedIn", en: "Follow me on LinkedIn" })}
                    </a>
                  </div>

                  <a
                    href="https://www.linkedin.com/posts/fcopts_softwareengineering-devops-mobiledevelopment-activity-7465484728440078336-7OyY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/20 p-5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <Image
                          src="/pontes-institucional.png"
                          alt="Francisco Pontes"
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">Francisco Pontes</p>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {t({ pt: "Sr Software Engineer | Mobile Dev · 1 m", en: "Sr Software Engineer | Mobile Dev · 1 mo" })}
                        </p>
                      </div>
                      <Linkedin className="h-5 w-5 text-[#4a9eea] ml-auto shrink-0" />
                    </div>
                    <p className="mt-4 text-sm text-zinc-300 leading-relaxed line-clamp-3">
                      {t({
                        pt: "Tem uma parte da engenharia de software que quase nunca aparece no print final: os testes que falharam, os debugs de madrugada, as decisões de arquitetura discutidas e refeitas várias vezes antes de chegar no resultado que todo mundo vê pronto...",
                        en: "There's a part of software engineering that almost never shows up in the final screenshot: the failed tests, the late-night debugging, the architecture decisions discussed and reworked many times before reaching the result everyone sees finished...",
                      })}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#4a9eea] group-hover:text-[#6bb3f0] transition-colors">
                      {t({ pt: "Ver publicação completa", en: "View full post" })}
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SOBRE MIM - Card Unificado Criativo */}
          <section
            id="about"
            className="relative py-14"
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <div className="relative">
                <div className="relative z-10 grid md:grid-cols-2 gap-10 p-8 md:p-12 items-center">
                  {/* Coluna da imagem */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-[360px] aspect-square">
                      <div className="relative w-full h-full rounded-full p-[16px] bg-gradient-to-br from-fuchsia-500 via-purple-600 to-violet-800 shadow-[0_0_40px_rgba(147,51,234,0.3)]">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
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

                      {/* Emojis de hobbies seguindo a curva da borda, balançando juntos ao longo da linha */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {[
                          { emoji: "🦍", angle: 0 },
                          { emoji: "🏋️", angle: 18 },
                          { emoji: "🏃", angle: 36 },
                          { emoji: "⚽", angle: 54 },
                          { emoji: "🏁", angle: 72 },
                          { emoji: "🚗", angle: 90 },
                          { emoji: "📱", angle: 108 },
                          { emoji: "📚", angle: 126 },
                          { emoji: "🧠", angle: 144 },
                          { emoji: "🚀", angle: 162 },
                          { emoji: "🤖", angle: 180 },
                          { emoji: "👾", angle: 198 },
                          { emoji: "💪🏼", angle: 216 },
                          { emoji: "👨🏻‍💻", angle: 234 },
                          { emoji: "🔥", angle: 252 },
                          { emoji: "🥋", angle: 270 },
                          { emoji: "🏋🏻", angle: 288 },
                          { emoji: "📈", angle: 306 },
                          { emoji: "📸", angle: 324 },
                          { emoji: "🏇🏻", angle: 342 },
                        ].map(({ emoji, angle }, index) => {
                          const rad = (angle * Math.PI) / 180;
                          const x = (50 + 52 * Math.cos(rad)).toFixed(4);
                          const y = (50 + 52 * Math.sin(rad)).toFixed(4);
                          return (
                            <motion.span
                              key={emoji}
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                              }}
                              className="absolute"
                              initial={{ opacity: 0, scale: 2.4, x: "-50%", y: "-50%" }}
                              whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                              viewport={viewportSettings}
                              transition={{
                                duration: 0.7,
                                ease: easeOut,
                                delay: index * 0.12,
                              }}
                            >
                              <motion.span
                                animate={{ rotate: [0, -5, 0, 5, 0] }}
                                whileHover={{ scale: 1.35 }}
                                transition={{
                                  duration: 10,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="flex items-center justify-center text-4xl drop-shadow-lg cursor-pointer"
                              >
                                {emoji}
                              </motion.span>
                            </motion.span>
                          );
                        })}
                      </motion.div>
                    </div>
                  </div>

                  {/* Coluna do formulário */}
                  <div className="flex flex-col justify-center">
                    <motion.h2
                      variants={fadeInHeading}
                      initial="hidden"
                      whileInView="show"
                      viewport={viewportSettings}
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {t({ pt: "Oi, vamos conversar?", en: "Get in touch" })}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={viewportSettings}
                      transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
                      className="mt-0.5 mb-6 text-sm text-zinc-400"
                    >
                      {t({
                        pt: "Se você tem um projeto em mente ou quer discutir oportunidades, ficarei feliz em bater um papo. Estou aberto a novos desafios!",
                        en: "If you have a project in mind or want to discuss opportunities, I'd be happy to chat. I'm open to new challenges!",
                      })}
                    </motion.p>
                    <ContactForm />
                  </div>
                </div>

                {/* Links sociais e currículo */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportSettings}
                  transition={{ duration: 0.7, ease: easeOut }}
                  className="relative z-10 flex flex-wrap items-center justify-center gap-4 px-8 md:px-12 pb-8 md:pb-12"
                >
                  <a
                    href="https://github.com/pontesneto2"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="h-11 w-11 rounded-full bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-400/40 flex items-center justify-center text-zinc-300 hover:text-fuchsia-300 transition-all"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/fcopts"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="h-11 w-11 rounded-full bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-400/40 flex items-center justify-center text-zinc-300 hover:text-fuchsia-300 transition-all"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:pontesneto2@gmail.com"
                    aria-label="E-mail"
                    className="h-11 w-11 rounded-full bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-400/40 flex items-center justify-center text-zinc-300 hover:text-fuchsia-300 transition-all"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/5585981888896"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="h-11 w-11 rounded-full bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-400/40 flex items-center justify-center text-zinc-300 hover:text-fuchsia-300 transition-all"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                  </a>
                  <a
                    href={CV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t({ pt: "Baixar currículo", en: "Download résumé" })}
                    className="h-11 w-11 rounded-full bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-400/40 flex items-center justify-center text-zinc-300 hover:text-fuchsia-300 transition-all"
                  >
                    <FileDown className="h-5 w-5" />
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

        </main>

        <footer className="py-10 border-t border-white/5 text-center text-[11px] text-zinc-400">
          <div>
            {t({ pt: "Feito à mão", en: "Handmade" })} | © 2026 Francisco Pontes
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-200 transition-colors"
            >
              Creative Commons BY-NC 4.0
            </a>
            <span className="text-zinc-700">·</span>
            <Link href="/privacidade" className="hover:text-zinc-200 transition-colors">
              {t({ pt: "Privacidade", en: "Privacy" })}
            </Link>
            <span className="text-zinc-700">·</span>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <SiVercel className="h-2.5 w-2.5" />
              {t({ pt: "Hospedado na Vercel", en: "Hosted on Vercel" })}
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
