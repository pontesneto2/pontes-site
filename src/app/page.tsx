"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import Hero from "@/components/Hero";
import AnimatedCounter from "@/components/AnimatedCounter";
import CursorGlow from "@/components/CursorGlow";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import SkillsTools, { SKILL_NAMES } from "@/components/SkillsTools";
import SiteHeader, { type SearchEntry } from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Preloader from "@/components/Preloader";
import { useLanguage, tr, LANG_FLAG, type Bilingual } from "@/lib/language-context";
import { getCvUrl } from "@/lib/constants";
import { EXPERIENCE } from "@/lib/experience-data";
import type { BlogPostMeta } from "@/lib/blog";
import {
  Code,
  Mail,
  Github,
  Linkedin,
  Lock,
  Building2,
  Briefcase,
  MapPin,
  FileDown,
  ChevronLeft,
  Clock,
  Smartphone,
  Users,
  Gauge,
  TrendingDown,
  Rocket,
  FileText,
  Monitor,
  Globe,
  RefreshCcw,
  AppWindow,
  Dumbbell,
  Trophy,
  Flag,
  Car as CarIcon,
  BookOpen,
  BrainCircuit,
  Bot,
  Gamepad2,
  Code2,
  Flame,
  Swords,
  TrendingUp,
  Camera,
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
} from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";

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

const categoryBadgeMap: Record<string, { icon: LucideIcon; className: string }> = {
  "Sistema Web+Admin": {
    icon: Monitor,
    className: "bg-blue-500/10 border-blue-400/30 text-blue-300",
  },
  "Web System+Admin": {
    icon: Monitor,
    className: "bg-blue-500/10 border-blue-400/30 text-blue-300",
  },
  "Aplicativo Mobile Nativo": {
    icon: Smartphone,
    className: "bg-emerald-500/10 border-emerald-400/30 text-emerald-300",
  },
  "Native Mobile App": {
    icon: Smartphone,
    className: "bg-emerald-500/10 border-emerald-400/30 text-emerald-300",
  },
  "Aplicativo PWA": {
    icon: AppWindow,
    className: "bg-amber-500/10 border-amber-400/30 text-amber-300",
  },
  "PWA App": {
    icon: AppWindow,
    className: "bg-amber-500/10 border-amber-400/30 text-amber-300",
  },
  "Site Institucional": {
    icon: Globe,
    className: "bg-fuchsia-500/10 border-fuchsia-400/30 text-fuchsia-300",
  },
  "Institutional Website": {
    icon: Globe,
    className: "bg-fuchsia-500/10 border-fuchsia-400/30 text-fuchsia-300",
  },
};

function CategoryPill({ label }: { label: string }) {
  const config = categoryBadgeMap[label];
  const Icon = config?.icon ?? Code;
  const className = config?.className ?? "bg-white/10 border-white/20 text-violet-200";
  return (
    <span
      className={`inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md text-[10px] font-medium border ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

function CategoryBadge({ labels, compact = false }: { labels: string[]; compact?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${compact ? "mb-2" : "mb-4"}`}>
      {labels.map((l) => (
        <CategoryPill key={l} label={l} />
      ))}
    </div>
  );
}

export default function Page() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const [isMobile, setIsMobile] = useState(false);
  const [recentPosts, setRecentPosts] = useState<{ pt: BlogPostMeta[]; en: BlogPostMeta[] } | null>(null);

  useEffect(() => {
    fetch("/api/recent-posts")
      .then((res) => res.json())
      .then(setRecentPosts)
      .catch(() => setRecentPosts({ pt: [], en: [] }));
  }, []);

  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const [featuredScrollProgress, setFeaturedScrollProgress] = useState(0);
  const [featuredThumbWidth, setFeaturedThumbWidth] = useState(50);
  const [featuredCurrentIndex, setFeaturedCurrentIndex] = useState(0);
  const [projectFilter, setProjectFilter] = useState<string | null>(null);

  const updateFeaturedScrollProgress = () => {
    const el = featuredScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setFeaturedScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    setFeaturedThumbWidth(Math.min(100, (el.clientWidth / el.scrollWidth) * 100));

    const firstCard = el.children[0] as HTMLElement | undefined;
    if (firstCard) {
      const gap = 32;
      const cardStep = firstCard.offsetWidth + gap;
      const index = Math.round(el.scrollLeft / cardStep);
      setFeaturedCurrentIndex(Math.max(0, Math.min(visibleSecondaryProjects.length - 1, index)));
    }
  };

  useEffect(() => {
    updateFeaturedScrollProgress();
    window.addEventListener("resize", updateFeaturedScrollProgress);
    return () => window.removeEventListener("resize", updateFeaturedScrollProgress);
    // Só precisa rodar no mount: registra o listener de resize uma vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const FEATURED_PROJECT_BG = "bg-gradient-to-br from-violet-600/60 via-purple-800/55 to-purple-950/65";
  const NEUTRAL_BG = "bg-zinc-700/40";

  const featuredProjects: Array<{
    title: string;
    subtitle: Bilingual;
    tags: string[];
    link: string;
    caseStudy?: string;
    discontinued?: boolean;
    placeholder?: boolean;
    private?: boolean;
    ctaLabel?: Bilingual;
    blurb: Bilingual;
    category: Bilingual[];
    thumb: string;
    highlights?: Array<{ icon: LucideIcon; value: Bilingual }>;
    impact?: Array<{ icon: LucideIcon; value: Bilingual; label: Bilingual }>;
    bgClass: string;
    scrimClass?: string;
    productionBadge?: boolean;
  }> = [
    {
      title: "SDA Ceará - App Mobile",
      subtitle: { pt: "", en: "" },
      tags: ["React Native", "PostgreSQL", ".NET", "C#", "PHP", "Docker", "Kubernetes", "Grafana", "Prometheus"],
      link: "https://apps.apple.com/br/app/sda-cear%C3%A1/id1465592742",
      caseStudy: "/case/sda-ceara",
      ctaLabel: { pt: "Confira nas lojas iOS e Android", en: "Get it on iOS and Android" },
      blurb: {
        pt: "Aplicativo móvel para gerenciamento e acompanhamento dos setores da Secretaria do Desenvolvimento Agrário do Ceará, centralizando processos e indicadores administrativos em um só lugar.",
        en: "Mobile app to manage and track the sectors of Ceará's State Agrarian Development Department, centralizing administrative processes and indicators in one place.",
      },
      category: [{ pt: "Aplicativo Mobile Nativo", en: "Native Mobile App" }, { pt: "Sistema Web+Admin", en: "Web System+Admin" }],
      thumb: "/images/capa-sda-app.png",
      bgClass: FEATURED_PROJECT_BG,
      productionBadge: true,
      highlights: [
        { icon: Smartphone, value: { pt: "Publicado - iOS e Android", en: "Published - iOS and Android" } },
        { icon: Briefcase, value: { pt: "Analista de Sistemas", en: "Systems Analyst" } },
        { icon: Building2, value: { pt: "Idealizador: Governo do Ceará junto com a Secretaria de Desenvolvimento Agrário", en: "Idealized by: Government of Ceará together with the Secretariat of Agrarian Development" } },
      ],
      impact: [
        { icon: Users, value: { pt: "1.000+", en: "1,000+" }, label: { pt: "Usuários ativos", en: "Active users" } },
        { icon: RefreshCcw, value: { pt: "Refeito", en: "Rebuilt" }, label: { pt: "Back e front migrados por módulos", en: "Backend & frontend migrated by module" } },
        { icon: Smartphone, value: { pt: "200+", en: "200+" }, label: { pt: "Logins simultâneos", en: "Concurrent logins" } },
        { icon: Clock, value: { pt: "1,8 anos", en: "1.8 years" }, label: { pt: "Desenvolvimento sem IA", en: "Development without AI" } },
      ],
    },
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
      caseStudy: "/case/ucopiloto",
      ctaLabel: { pt: "Visitar website", en: "Visit website" },
      blurb: {
        pt: "Aplicativo para conectar motoristas e oficinas de maneira inteligente, simplificando agendamentos, orçamentos e o acompanhamento de serviços automotivos. Idealizadora: Click Software House.",
        en: "App that connects drivers and repair shops intelligently, simplifying bookings, quotes and tracking of automotive services. Idealized by: Click Software House.",
      },
      category: [{ pt: "Aplicativo Mobile Nativo", en: "Native Mobile App" }, { pt: "Sistema Web+Admin", en: "Web System+Admin" }],
      thumb: "/images/capa-ucopiloto.png",
      bgClass: NEUTRAL_BG,
      productionBadge: true,
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
      title: "2º Colégio da Polícia Militar Coronel Hervano Macêdo Júnior (2º CPM-CHMJ)",
      subtitle: { pt: "", en: "" },
      tags: ["PHP", "Laravel", "C#", ".NET", "Angular", "PostgreSQL", "Docker", "Git", "Jira", "Grafana"],
      link: "https://com3brasil.com.br/cpmce/sistemas/",
      caseStudy: "/case/sistema-escolar-policia",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Sistema de gestão escolar para o 2º Colégio da Polícia Militar, com acesso controlado por perfil para acompanhamento acadêmico e administrativo. Sistema COM3 para a gestão acadêmica e o portal Aluno Online da SEDUC para o acompanhamento escolar.",
        en: "School management system for the 2nd Military Police School, with role-based access for academic and administrative tracking. COM3 system for academic management and the SEDUC Aluno Online portal for tracking student progress.",
      },
      category: [{ pt: "Sistema Web+Admin", en: "Web System+Admin" }, { pt: "Aplicativo PWA", en: "PWA App" }],
      thumb: "/images/capa-sistema-policia.png",
      bgClass: NEUTRAL_BG,
      productionBadge: true,
      highlights: [
        { icon: Clock, value: { pt: "1,2 anos de produção", en: "1.2 years in production" } },
        { icon: Users, value: { pt: "Equipe: 4 → 3 devs", en: "Team: 4 → 3 devs" } },
        { icon: Smartphone, value: { pt: "PWA + Sistemas Web", en: "PWA + Web Systems" } },
        { icon: Building2, value: { pt: "Idealizadora: Com3 Brasil", en: "Idealized by: Com3 Brasil" } },
        { icon: Briefcase, value: { pt: "Vínculo: desenvolvido no período em que atuei na Com3 Brasil", en: "Affiliation: built during my time working at Com3 Brasil" } },
      ],
      impact: [
        { icon: Users, value: { pt: "2.350+", en: "2,350+" }, label: { pt: "Usuários ativos", en: "Active users" } },
        { icon: Gauge, value: { pt: "99,9%", en: "99.9%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: TrendingDown, value: { pt: "-40%", en: "-40%" }, label: { pt: "Manutenção semanal", en: "Weekly maintenance" } },
        { icon: Rocket, value: { pt: "-2 meses", en: "-2 months" }, label: { pt: "MVP antes do prazo", en: "MVP ahead of schedule" } },
      ],
    },
    {
      title: "Fitvo App Mobile",
      subtitle: { pt: "", en: "" },
      tags: ["React Native", "PostgreSQL", "NodeJS", "Docker"],
      link: "",
      placeholder: true,
      blurb: {
        pt: "Ecossistema mobile para educadores físicos, personal trainers, nutricionistas e nutrólogos esportivos, além de clínicas e academias, reunindo agendamentos, planos de treino e acompanhamento de alunos em um único app.",
        en: "Mobile ecosystem for physical educators, personal trainers, sports nutritionists and doctors, as well as clinics and gyms, bringing scheduling, training plans and student tracking together in a single app.",
      },
      category: [{ pt: "Aplicativo Mobile Nativo", en: "Native Mobile App" }, { pt: "Sistema Web+Admin", en: "Web System+Admin" }],
      thumb: "/images/capa-fitvo.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "Projeto em desenvolvimento", en: "Project in development" } },
        { icon: Briefcase, value: { pt: "Engenheiro de Software Senior", en: "Senior Software Engineer" } },
      ],
    },
    {
      title: "Sistema FEDAF - Fundo Estadual de Desenvolvimento da Agricultura",
      subtitle: { pt: "", en: "" },
      tags: ["Git", "Docker", "PHP", "Laravel", "Angular", "Scriptcase"],
      link: "https://sistemas2.sda.ce.gov.br/scriptcase/app/fedaf/login/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Sistema de gestão do Fundo Estadual de Desenvolvimento da Agricultura Familiar.",
        en: "Management system for the State Fund for Family Agriculture Development.",
      },
      category: [{ pt: "Sistema Web+Admin", en: "Web System+Admin" }],
      thumb: "/images/capa-fedaf.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "13 meses de produção", en: "13 months in production" } },
        { icon: Briefcase, value: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" } },
        { icon: Building2, value: { pt: "Idealizador: Governo do Ceará", en: "Idealized by: Government of Ceará" } },
      ],
      impact: [
        { icon: Users, value: { pt: "15.000+", en: "15,000+" }, label: { pt: "Produtores cadastrados", en: "Registered producers" } },
        { icon: Gauge, value: { pt: "99,6%", en: "99.6%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: Rocket, value: { pt: "-35%", en: "-35%" }, label: { pt: "Tempo de análise de processos", en: "Process review time" } },
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
      category: [{ pt: "Aplicativo Mobile Nativo", en: "Native Mobile App" }, { pt: "Sistema Web+Admin", en: "Web System+Admin" }],
      thumb: "/images/capa-imidooh.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "6 meses", en: "6 months" } },
        { icon: Smartphone, value: { pt: "iOS + Android + Web + Admin", en: "iOS + Android + Web + Admin" } },
        { icon: Building2, value: { pt: "Idealizadora: Click SF", en: "Idealized by: Click SF" } },
      ],
    },
    {
      title: "Sistema SECAF - Sistema Estadual de Cadastro de Agricultores Familiares",
      subtitle: { pt: "", en: "" },
      tags: ["Git", "Docker", ".NET", "C#", "PHP"],
      link: "https://sistemas2.sda.ce.gov.br/scriptcase/app/secaf/login/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Sistema estadual de cadastro de produtores da agricultura familiar.",
        en: "State-level registry system for family farming producers.",
      },
      category: [{ pt: "Sistema Web+Admin", en: "Web System+Admin" }, { pt: "Aplicativo PWA", en: "PWA App" }],
      thumb: "/images/capa-secaf.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "14 meses de produção", en: "14 months in production" } },
        { icon: Briefcase, value: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" } },
        { icon: Building2, value: { pt: "Idealizador: Governo do Ceará", en: "Idealized by: Government of Ceará" } },
      ],
      impact: [
        { icon: Users, value: { pt: "20.000+", en: "20,000+" }, label: { pt: "Produtores cadastrados", en: "Registered producers" } },
        { icon: Gauge, value: { pt: "99,6%", en: "99.6%" }, label: { pt: "Uptime", en: "Uptime" } },
      ],
    },
    {
      title: "Sistema Integrado de Gestão - SIG (Instituto Agropolos)",
      subtitle: { pt: "", en: "" },
      tags: [".NET", "C#", "Angular", "MongoDB", "Docker", "Git", "TypeScript"],
      link: "http://sigapp.institutoagropolos.org.br/login",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Sistema de gestão institucional para controle de processos administrativos e indicadores internos.",
        en: "Institutional management system for administrative processes and internal indicators.",
      },
      category: [{ pt: "Sistema Web+Admin", en: "Web System+Admin" }, { pt: "Aplicativo PWA", en: "PWA App" }],
      thumb: "/images/capa-sigma.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "12 meses de produção", en: "12 months in production" } },
        { icon: Users, value: { pt: "Equipe: 4 devs", en: "Team: 4 devs" } },
        { icon: Building2, value: { pt: "Idealizador: Instituto Agropolos", en: "Idealized by: Instituto Agropolos" } },
      ],
      impact: [
        { icon: Users, value: { pt: "10.000+", en: "10,000+" }, label: { pt: "Usuários ativos", en: "Active users" } },
        { icon: Gauge, value: { pt: "99,7%", en: "99.7%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: TrendingDown, value: { pt: "-30%", en: "-30%" }, label: { pt: "Tempo de processos administrativos", en: "Administrative process time" } },
      ],
    },
    {
      title: "Sistema Especial Fazenda Chapéu - IDACE",
      subtitle: { pt: "", en: "" },
      tags: ["Scriptcase", "PHP", "JS", "Java Spring Boot", "PostgreSQL", "Docker", "Git"],
      link: "https://www.idace.ce.gov.br/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Sistema de regularização de matrícula de imóveis cedidos para a população do estado do Ceará.",
        en: "System for regularizing land title records granted to the population of Ceará state.",
      },
      category: [{ pt: "Sistema Web+Admin", en: "Web System+Admin" }],
      thumb: "/images/capa-idace.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "14 meses de produção", en: "14 months in production" } },
        { icon: Briefcase, value: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" } },
        { icon: Building2, value: { pt: "Idealizador: SDA Ceará", en: "Idealized by: SDA Ceará" } },
      ],
      impact: [
        { icon: Users, value: { pt: "5.000+", en: "5,000+" }, label: { pt: "Imóveis regularizados", en: "Regularized properties" } },
        { icon: Gauge, value: { pt: "99,6%", en: "99.6%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: TrendingDown, value: { pt: "-45%", en: "-45%" }, label: { pt: "Tempo de regularização", en: "Regularization time" } },
      ],
    },
    {
      title: "Sistema de Indicadores de Demandas e Ações - SDA CE",
      subtitle: { pt: "", en: "" },
      tags: ["PHP", "Laravel", "PostgreSQL", "Docker", "Git"],
      link: "https://www.com3brasil.com.br/v9/app/demanda/login/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Painel de acompanhamento de demandas e ações estratégicas da secretaria, com indicadores em tempo real.",
        en: "Dashboard to track the department's demands and strategic actions, with real-time indicators.",
      },
      category: [{ pt: "Sistema Web+Admin", en: "Web System+Admin" }, { pt: "Aplicativo PWA", en: "PWA App" }],
      thumb: "/images/capa-indicadores.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "6 meses de produção", en: "6 months in production" } },
        { icon: Briefcase, value: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" } },
        { icon: Building2, value: { pt: "Idealizador: SDA Ceará", en: "Idealized by: SDA Ceará" } },
      ],
      impact: [
        { icon: Users, value: { pt: "100+", en: "100+" }, label: { pt: "Demandas monitoradas/mês", en: "Demands tracked/month" } },
        { icon: Gauge, value: { pt: "99,5%", en: "99.5%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: Rocket, value: { pt: "-25%", en: "-25%" }, label: { pt: "Tempo de resposta a demandas", en: "Demand response time" } },
      ],
    },
    {
      title: "Sistema Integra - Projeto São José IV",
      subtitle: { pt: "", en: "" },
      tags: ["Git", "Docker", ".NET", "C#", "Angular", "Prometheus", "Grafana"],
      link: "https://integrapsj.sda.ce.gov.br/login",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Sistema de gestão do Projeto São José IV, com monitoramento de indicadores via Grafana e Prometheus.",
        en: "Management system for the São José IV Project, with indicator monitoring via Grafana and Prometheus.",
      },
      category: [{ pt: "Sistema Web+Admin", en: "Web System+Admin" }, { pt: "Aplicativo PWA", en: "PWA App" }],
      thumb: "/images/capa-psjiv.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "1 ano de produção", en: "1 year in production" } },
        { icon: Briefcase, value: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" } },
        { icon: Building2, value: { pt: "Idealizador: Governo do Ceará", en: "Idealized by: Government of Ceará" } },
      ],
      impact: [
        { icon: Users, value: { pt: "9.000+", en: "9,000+" }, label: { pt: "Usuários ativos", en: "Active users" } },
        { icon: Gauge, value: { pt: "99,7%", en: "99.7%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: TrendingDown, value: { pt: "-30%", en: "-30%" }, label: { pt: "Tempo de coleta de indicadores", en: "Indicator collection time" } },
      ],
    },
    {
      title: "Sistema Diário de Obras - ALPHA",
      subtitle: { pt: "", en: "" },
      tags: ["NodeJS", "ExpressJS", "Prisma", "PostgreSQL", "Docker", "Git", "TailwindCSS", "TypeScript"],
      link: "",
      private: true,
      blurb: {
        pt: "Diário de obras digital para registrar atividades, ocorrências e o avanço físico da construção.",
        en: "Digital construction logbook to record activities, incidents and physical progress.",
      },
      category: [{ pt: "Sistema Web+Admin", en: "Web System+Admin" }, { pt: "Aplicativo PWA", en: "PWA App" }],
      thumb: "/images/capa-diario.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "4 meses de produção", en: "4 months in production" } },
        { icon: Briefcase, value: { pt: "Full Stack solo", en: "Solo Full Stack" } },
        { icon: Building2, value: { pt: "Idealizador: Alfa Construções", en: "Idealized by: Alfa Construções" } },
      ],
      impact: [
        { icon: Users, value: { pt: "12+", en: "12+" }, label: { pt: "Obras monitoradas", en: "Monitored construction sites" } },
        { icon: Gauge, value: { pt: "99,4%", en: "99.4%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: TrendingDown, value: { pt: "-20%", en: "-20%" }, label: { pt: "Tempo de registro diário", en: "Daily log time" } },
      ],
    },
    {
      title: "Website Instituto Anjos Digitais",
      subtitle: { pt: "", en: "" },
      tags: ["WordPress", "PHP", "JS", "Bootstrap", "Docker", "Git"],
      link: "https://anjosdigitais.org/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Site institucional para divulgação de projetos sociais e captação de apoiadores.",
        en: "Institutional website to promote social projects and attract supporters.",
      },
      category: [{ pt: "Site Institucional", en: "Institutional Website" }],
      thumb: "/images/capa-anjos.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "2 meses de desenvolvimento", en: "2 months of development" } },
        { icon: Briefcase, value: { pt: "Frontend solo", en: "Solo frontend" } },
        { icon: Building2, value: { pt: "Idealizador: Anjos Digitais", en: "Idealized by: Anjos Digitais" } },
      ],
      impact: [
        { icon: Gauge, value: { pt: "99,9%", en: "99.9%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: Users, value: { pt: "800+", en: "800+" }, label: { pt: "Visitas mensais", en: "Monthly visits" } },
        { icon: Rocket, value: { pt: "+15%", en: "+15%" }, label: { pt: "Captação de apoiadores", en: "Supporter sign-ups" } },
      ],
    },
    {
      title: "Website Instituto Agropolos do Ceará",
      subtitle: { pt: "", en: "" },
      tags: ["WordPress", "PHP", "Symfony", "Figma"],
      link: "https://institutoagropolos.org.br/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Site institucional do instituto, com apresentação de projetos e informações institucionais.",
        en: "Institutional website for the institute, presenting projects and institutional information.",
      },
      category: [{ pt: "Site Institucional", en: "Institutional Website" }],
      thumb: "/images/capa-agropolos.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "2 meses de desenvolvimento", en: "2 months of development" } },
        { icon: Briefcase, value: { pt: "Frontend + CMS solo", en: "Solo frontend + CMS" } },
        { icon: Building2, value: { pt: "Idealizador: Instituto Agropolos", en: "Idealized by: Instituto Agropolos" } },
      ],
      impact: [
        { icon: Gauge, value: { pt: "99,8%", en: "99.8%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: Users, value: { pt: "3.000+", en: "3,000+" }, label: { pt: "Visitas mensais", en: "Monthly visits" } },
        { icon: Rocket, value: { pt: "Projeto dinâmico", en: "Dynamic project" }, label: { pt: "Substitui site estático", en: "Replaces static site" } },
      ],
    },
    {
      title: "Website UJVP CE",
      subtitle: { pt: "", en: "" },
      tags: ["WordPress", "PHP", "Docker", "Git"],
      link: "https://ujvp.org.br/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Site institucional da organização social, com apresentação da entidade e canais de contato.",
        en: "Institutional website for the nonprofit organization, with an overview and contact channels.",
      },
      category: [{ pt: "Site Institucional", en: "Institutional Website" }],
      thumb: "/images/capa-site-ujvp.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "1 mês de desenvolvimento", en: "1 month of development" } },
        { icon: Briefcase, value: { pt: "Frontend solo", en: "Solo frontend" } },
        { icon: Building2, value: { pt: "Idealizador: UJVP CE", en: "Idealized by: UJVP CE" } },
      ],
      impact: [
        { icon: Gauge, value: { pt: "99,9%", en: "99.9%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: Users, value: { pt: "300+", en: "300+" }, label: { pt: "Visitas mensais", en: "Monthly visits" } },
      ],
    },
    {
      title: "Website SDA CE",
      subtitle: { pt: "", en: "" },
      tags: ["WordPress", "PHP"],
      link: "https://www.sda.ce.gov.br/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Site institucional da Secretaria do Desenvolvimento Agrário do Ceará, no qual atuei apenas com manutenção.",
        en: "Institutional website for the Ceará State Agrarian Development Department, on which I worked on maintenance only.",
      },
      category: [{ pt: "Site Institucional", en: "Institutional Website" }],
      thumb: "/images/capa-site-sda-ceara.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "Manutenção contínua", en: "Ongoing maintenance" } },
        { icon: Briefcase, value: { pt: "Manutenção e suporte", en: "Maintenance & support" } },
        { icon: Building2, value: { pt: "Idealizador: Governo do Ceará", en: "Idealized by: Government of Ceará" } },
      ],
      impact: [
        { icon: Gauge, value: { pt: "99,5%", en: "99.5%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: Users, value: { pt: "10.000+", en: "10,000+" }, label: { pt: "Visitas mensais", en: "Monthly visits" } },
      ],
    },
    {
      title: "Website Silva & Duarte Advogados",
      subtitle: { pt: "", en: "" },
      tags: ["GitHub", "Git", "TypeScript", "JS", "TailwindCSS"],
      link: "https://www.silvaeduarteadvogados.com/",
      ctaLabel: { pt: "Visite", en: "Visit" },
      blurb: {
        pt: "Site institucional do escritório de advocacia, com apresentação das áreas de atuação e canais de contato.",
        en: "Institutional website for the law firm, presenting its practice areas and contact channels.",
      },
      category: [{ pt: "Site Institucional", en: "Institutional Website" }],
      thumb: "/images/capa-silva-duarte.png",
      bgClass: NEUTRAL_BG,
      highlights: [
        { icon: Clock, value: { pt: "1 mês de desenvolvimento", en: "1 month of development" } },
        { icon: Briefcase, value: { pt: "Full Stack solo", en: "Solo Full Stack" } },
        { icon: Building2, value: { pt: "Idealizador: Silva & Duarte", en: "Idealized by: Silva & Duarte" } },
      ],
      impact: [
        { icon: Gauge, value: { pt: "99,9%", en: "99.9%" }, label: { pt: "Uptime", en: "Uptime" } },
        { icon: Users, value: { pt: "100+", en: "100+" }, label: { pt: "Visitas mensais", en: "Monthly visits" } },
      ],
    },
  ];

  // Agregados derivados dos números reais já publicados por projeto acima
  // (nada inventado aqui: soma o que já está em cada card de impacto).
  let systemsInProduction = 0;
  let totalPeopleImpacted = 0;
  let uptimeSum = 0;
  let uptimeCount = 0;
  for (const project of featuredProjects) {
    if (project.discontinued) continue;
    systemsInProduction++;
    for (const imp of project.impact ?? []) {
      if (imp.label.pt === "Usuários ativos" || imp.label.pt === "Visitas mensais") {
        const n = parseInt(imp.value.pt.replace(/[^\d]/g, ""), 10);
        if (!Number.isNaN(n)) totalPeopleImpacted += n;
      }
      if (imp.label.pt === "Uptime") {
        const n = parseFloat(imp.value.pt.replace("%", "").replace(",", "."));
        if (!Number.isNaN(n)) {
          uptimeSum += n;
          uptimeCount++;
        }
      }
    }
  }
  const averageUptime = uptimeCount > 0 ? (uptimeSum / uptimeCount).toFixed(1) : null;
  const formattedPeopleImpacted = totalPeopleImpacted.toLocaleString(lang === "pt" ? "pt-BR" : "en-US");

  const impactStats: Array<{ value: string; label: Bilingual }> = [
    { value: `${systemsInProduction}+`, label: { pt: "Sistemas em produção", en: "Systems in production" } },
    { value: `${formattedPeopleImpacted}+`, label: { pt: "Pessoas impactadas", en: "People impacted" } },
    ...(averageUptime ? [{ value: `${averageUptime}%`, label: { pt: "Uptime médio", en: "Average uptime" } }] : []),
    { value: "6+", label: { pt: "Anos entregando em produção", en: "Years shipping to production" } },
  ];

  const secondaryProjects = featuredProjects.slice(1);

  const projectFilters: Array<{ key: string; label: Bilingual }> = [];
  const seenFilterKeys = new Set<string>();
  for (const project of secondaryProjects) {
    for (const cat of project.category) {
      if (!seenFilterKeys.has(cat.pt)) {
        seenFilterKeys.add(cat.pt);
        projectFilters.push({ key: cat.pt, label: cat });
      }
    }
  }
  if (secondaryProjects.some((p) => p.discontinued)) {
    projectFilters.push({ key: "Descontinuado", label: { pt: "Descontinuado", en: "Discontinued" } });
  }
  if (secondaryProjects.some((p) => p.private)) {
    projectFilters.push({ key: "Privado", label: { pt: "Privado", en: "Private" } });
  }

  const matchesProjectFilter = (project: (typeof featuredProjects)[number], filter: string | null) => {
    if (!filter) return true;
    if (filter === "Descontinuado") return !!project.discontinued;
    if (filter === "Privado") return !!project.private;
    return project.category.some((cat) => cat.pt === filter);
  };

  const visibleSecondaryProjects = secondaryProjects.filter((p) => matchesProjectFilter(p, projectFilter));

  const experience = EXPERIENCE;

  const handleSpotlightMove = (event: MouseEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  const renderProjectCta = (project: (typeof featuredProjects)[number]) => {
    const ctaClass =
      "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold w-fit transition-all duration-200";
    const solidClass =
      "bg-white text-violet-700 hover:bg-zinc-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20";
    const outlineClass =
      "border border-white/35 text-white hover:bg-white hover:text-violet-700 hover:border-white hover:scale-[1.03]";

    const caseStudyButton = project.caseStudy ? (
      <Link
        href={project.caseStudy}
        onClick={() => track("case_study_click", { project: project.title })}
        className={`${ctaClass} ${project.link ? outlineClass : solidClass}`}
      >
        {t({ pt: "Ver estudo de caso", en: "View case study" })}
        <FileText className="h-3.5 w-3.5" />
      </Link>
    ) : null;

    if (project.discontinued) {
      return (
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`${ctaClass} bg-white/10 text-zinc-400 cursor-not-allowed`}
            aria-disabled="true"
          >
            <Lock className="h-3.5 w-3.5" />
            {t({ pt: "Descontinuado", en: "Discontinued" })}
          </span>
          {caseStudyButton}
        </div>
      );
    }

    if (project.private) {
      return (
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`${ctaClass} bg-white/10 text-zinc-400 cursor-not-allowed`}
            aria-disabled="true"
          >
            <Lock className="h-3.5 w-3.5" />
            {t({ pt: "Privado", en: "Private" })}
          </span>
          {caseStudyButton}
        </div>
      );
    }

    if (project.placeholder) {
      return (
        <span
          className={`${ctaClass} bg-white/10 text-zinc-400 cursor-not-allowed`}
          aria-disabled="true"
        >
          <Lock className="h-3.5 w-3.5" />
          {t({ pt: "Em breve", en: "Coming soon" })}
        </span>
      );
    }

    if (project.link && caseStudyButton) {
      return (
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaClass} ${solidClass}`}
          >
            {project.ctaLabel ? t(project.ctaLabel) : t({ pt: "Visite o website", en: "Visit website" })}
          </a>
          {caseStudyButton}
        </div>
      );
    }

    if (caseStudyButton) {
      return caseStudyButton;
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
        href="mailto:contato@fcopts.com.br?subject=Solicita%C3%A7%C3%A3o%20de%20acesso%20ao%20projeto"
        className={`${ctaClass} ${solidClass}`}
      >
        <Lock className="h-3.5 w-3.5" />
        {t({ pt: "Solicitar acesso", en: "Request access" })}
      </a>
    );
  };

  const navLinks = [
    { href: "/#intro", label: { pt: "Sobre", en: "About" } },
    { href: "/#projects", label: { pt: "Projetos", en: "Projects" } },
    { href: "/#about", label: { pt: "Contato", en: "Contact" } },
    { href: "/blog", label: { pt: "Blog", en: "Blog" } },
  ];

  const searchSections = [
    { href: "/", label: { pt: "Início", en: "Home" } },
    { href: "/#intro", label: { pt: "Sobre", en: "About" } },
    { href: "/#skills-tools", label: { pt: "Skills & Tools", en: "Skills & Tools" } },
    { href: "/#projects", label: { pt: "Projetos", en: "Projects" } },
    { href: "/#experience", label: { pt: "Trajetória", en: "Journey" } },
    { href: "/#about", label: { pt: "Contato", en: "Contact" } },
  ];

  const searchIndex: SearchEntry[] = [
    ...searchSections.map((link) => ({
      label: t(link.label),
      href: link.href,
      group: { pt: "Seção", en: "Section" },
    })),
    ...featuredProjects.map((p) => ({
      label: p.title,
      href: "/#projects",
      group: { pt: "Projeto", en: "Project" },
    })),
    ...SKILL_NAMES.map((name) => ({
      label: name,
      href: "/#skills-tools",
      group: { pt: "Skill", en: "Skill" },
    })),
  ];

  return (
    <div className="min-h-screen font-sans relative isolate">
      <Preloader variant="purple" />
      <CursorGlow />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t({ pt: "Pular para o conteúdo", en: "Skip to content" })}
      </a>

      <div className="relative z-10">
        {/* NAV */}
        <SiteHeader
          navLinks={navLinks}
          searchIndex={searchIndex}
          cta={{ label: { pt: "Peça um orçamento", en: "Get a quote" }, href: "/trabalhe-comigo" }}
          secondaryCta={{ label: { pt: "Para recrutadores", en: "For recruiters" }, href: "/recrutadores" }}
          ctaBadge={{ pt: "Novo", en: "New" }}
        />

        <main id="content">
          <Hero />

          {/* FAIXA DE IMPACTO AGREGADO */}
          <section className="border-y border-white/5 bg-white/[0.015] py-8">
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {impactStats.map((stat) => (
                <div key={stat.label.pt}>
                  <div
                    className="text-2xl sm:text-3xl font-bold"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#e879f9" }}
                  >
                    <AnimatedCounter value={stat.value} lang={lang} />
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs text-zinc-400">{t(stat.label)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FAIXA DE CREDIBILIDADE */}
          <section className="border-b border-white/5 py-6">
            <div className="mx-auto max-w-6xl px-6 text-center">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {t({ pt: "Sistemas em produção para", en: "Systems in production for" })}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-zinc-400">
                <span>Governo do Ceará</span>
                <span>FlixBus</span>
                <span>FedEx</span>
                <span>{t({ pt: "Institutos e ONGs", en: "Institutes & NGOs" })}</span>
              </div>
            </div>
          </section>

          {/* SOBRE — bio / formação */}
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
                  pt: "Graduado em Análise e Desenvolvimento de Sistemas pela Universidade Farias Brito, em Fortaleza. Pós Graduado em Engenharia de Software com ênfase em DevOps. Especializado em Desenvolvimento Full Stack pela Digital College. Especializado em UX/UI e design de Produtos Digitais pela EBAC.",
                  en: "Bachelor's degree in Systems Analysis and Development from Universidade Farias Brito, in Fortaleza. Postgraduate in Software Engineering with an emphasis on DevOps. Specialized in Full Stack Development from Digital College. Specialized in UX/UI and Digital Product Design from EBAC.",
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
                      className="mt-12 space-y-4 text-zinc-300 text-[17px] sm:text-[16px] leading-relaxed"
                    >
                      <p>
                        {t({
                          pt: "Atuo como Engenheiro de Software e tenho mais de 6 anos de experiência em desenvolvimento Web/Mobile, DevOps e sou entusiasta de operações UX/UI. Tenho perfil multidisciplinar e atuo na construção de soluções digitais de ponta a ponta.",
                          en: "I work as a Software Engineer with over 6 years of experience in Web/Mobile development, DevOps, and I'm an enthusiast of UX/UI operations. I have a multidisciplinary profile and work on building end-to-end digital solutions.",
                        })}
                      </p>
                      <p>
                        {t({
                          pt: "Ao longo da minha trajetória, participei de projetos em sistemas legado para o setor público, construções de soluções digitais do zero no setor privado e experiência internacional. Toda essa trajetória me permitiu atuar em distintos produtos digitais de diferentes complexidades.",
                          en: "Throughout my career, I've worked on legacy system projects in the public sector, built digital solutions from scratch in the private sector, and gained international experience. That journey let me work on distinct digital products of different complexities.",
                        })}{" "}
                        <span className="italic text-violet-300">
                          {t({
                            pt: "Uso, automatizo e me especializo cada vez mais em Inteligência Artificial, mas ainda sou da geração old school que codificava na mão consultando o Stack Overflow. Seja bem-vindo ao meu portfólio.",
                            en: "I use, automate and keep specializing in Artificial Intelligence — but the old-school generation that used to hand-code while checking Stack Overflow is still alive. Welcome to my portfolio.",
                          })}
                        </span>
                      </p>
                    </motion.div>

                    <motion.a
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={viewportSettings}
                      transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
                      href="/cv"
                      onClick={() => track("cv_download", { href: "/cv" })}
                      className="group mt-8 self-start w-[40%] min-w-fit flex items-center justify-center gap-2 rounded-full px-6 py-2.5 bg-white text-violet-700 text-sm font-medium hover:bg-zinc-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
                    >
                      {t({ pt: "Veja o currículo completo", en: "See the full résumé" })}
                      <span aria-hidden="true" className="text-[0.9em] leading-none">
                        {LANG_FLAG[lang]}
                      </span>
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
              </div>
            </div>
          </section>

          <SkillsTools />

          {/* QUEBRA DE PADRÃO — faixa full-bleed diagonal, sem container centralizado */}
          <section className="relative overflow-hidden py-16 sm:py-20">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(115deg, #1a0f2e 0%, #2a1245 45%, #0a0a0d 100%)",
                clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0 100%)",
              }}
            />
            <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-left">
              <motion.p
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportSettings}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-white max-w-2xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t({
                  pt: "Não construo só telas bonitas. Construo sistemas que continuam de pé depois que o deploy termina.",
                  en: "I don't just build pretty screens. I build systems that stay standing after the deploy is done.",
                })}
              </motion.p>
            </div>
          </section>

          {/* PROJETOS EM DESTAQUE - REDESENHADO */}
          <section
            id="projects"
            className="relative py-14 overflow-x-hidden"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
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
                <p className="text-[10px] font-light uppercase tracking-[0.2em] text-zinc-500 md:text-right md:max-w-[220px]">
                  {t({
                    pt: "Portfólio — projetos públicos, visíveis a qualquer pessoa na web",
                    en: "Portfolio — public projects, visible to anyone on the web",
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
                      onMouseMove={handleSpotlightMove}
                      className="spotlight-card card-surface-3 relative group rounded-3xl overflow-hidden grid md:grid-cols-2 items-stretch hover:border-violet-400/25 hover:-translate-y-1 transition-all duration-300"
                    >
                      {heroProject.productionBadge && (
                        <span className="absolute top-3 right-3 z-10 rotate-12 whitespace-nowrap rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-wide text-zinc-950 shadow-sm shadow-black/30 pointer-events-none">
                          {t({ pt: "Em produção", en: "In production" })}
                        </span>
                      )}
                      <div className="relative aspect-video md:aspect-auto min-h-[260px] md:min-h-full bg-[#1a1425] overflow-hidden">
                        {heroProject.thumb ? (
                          <>
                            <Image
                              src={heroProject.thumb}
                              alt={`${t({ pt: "Capa do projeto", en: "Project cover" })}: ${heroProject.title}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              loading="eager"
                              className="object-contain md:object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-950/25 via-black/15 to-black/20 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                          </>
                        ) : (
                          <div className="h-full min-h-[260px] w-full bg-gradient-to-br from-violet-600/35 via-fuchsia-500/20 to-violet-900/40" />
                        )}
                      </div>
                      <div className={`relative flex flex-col justify-center p-5 sm:p-6 md:p-10 overflow-hidden ${heroProject.bgClass}`}>
                        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
                        <div className="relative">
                          <CategoryBadge labels={heroProject.category.map(t)} />
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
                          <div className="mt-5 border-t border-white/5" />
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
                              className={`mt-5 pt-5 border-t border-white/5 grid gap-4 ${
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
                          <div className="mt-5 border-t border-white/5" />
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

                {projectFilters.length > 1 && (
                  <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label={t({ pt: "Filtrar projetos", en: "Filter projects" })}>
                    <button
                      type="button"
                      onClick={() => {
                        setProjectFilter(null);
                        setFeaturedCurrentIndex(0);
                        featuredScrollRef.current?.scrollTo({ left: 0 });
                      }}
                      aria-pressed={projectFilter === null}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        projectFilter === null
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 border-transparent text-white"
                          : "border-white/15 text-zinc-400 hover:text-zinc-200 hover:border-white/25"
                      }`}
                    >
                      {t({ pt: "Todos", en: "All" })}
                    </button>
                    {projectFilters.map((filter) => (
                      <button
                        key={filter.key}
                        type="button"
                        onClick={() => {
                          setProjectFilter((prev) => (prev === filter.key ? null : filter.key));
                          setFeaturedCurrentIndex(0);
                          featuredScrollRef.current?.scrollTo({ left: 0 });
                        }}
                        aria-pressed={projectFilter === filter.key}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          projectFilter === filter.key
                            ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 border-transparent text-white"
                            : "border-white/15 text-zinc-400 hover:text-zinc-200 hover:border-white/25"
                        }`}
                      >
                        {t(filter.label)}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  ref={featuredScrollRef}
                  onScroll={updateFeaturedScrollProgress}
                  className="flex gap-8 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory scroll-smooth pt-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {visibleSecondaryProjects.length === 0 && (
                    <p className="text-sm text-zinc-400 py-6">
                      {t({ pt: "Nenhum projeto nessa categoria.", en: "No projects in this category." })}
                    </p>
                  )}
                  {visibleSecondaryProjects.map((project, index) => {
                    const cta = renderProjectCta(project);

                    return (
                      <motion.article
                        key={project.title}
                        custom={index + 1}
                        variants={fadeUpItem}
                        onMouseMove={handleSpotlightMove}
                        className="spotlight-card card-surface-2 group snap-start shrink-0 w-[88%] sm:w-[calc(50%-1rem)] rounded-3xl overflow-hidden flex flex-col hover:border-violet-400/20 hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="relative aspect-video w-full bg-[#1a1425]">
                          {project.productionBadge && (
                            <span className="absolute top-3 right-3 z-10 rotate-12 whitespace-nowrap rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-wide text-zinc-950 shadow-sm shadow-black/30 pointer-events-none">
                              {t({ pt: "Em produção", en: "In production" })}
                            </span>
                          )}
                          {project.thumb ? (
                            <>
                              <Image
                                src={project.thumb}
                                alt={`${t({ pt: "Capa do projeto", en: "Project cover" })}: ${project.title}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="eager"
                                className="object-cover object-center"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-violet-950/25 via-black/15 to-black/20 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                            </>
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-violet-600/35 via-fuchsia-500/20 to-violet-900/40" />
                          )}
                        </div>
                        <div className={`relative flex-1 flex flex-col p-3 sm:p-3.5 md:p-4 overflow-hidden ${project.bgClass}`}>
                          <div
                            className={`absolute inset-0 pointer-events-none ${
                              project.scrimClass ?? "bg-gradient-to-t from-black/20 via-transparent to-white/5"
                            }`}
                          />
                          <div className="relative flex-1 flex flex-col">
                            <CategoryBadge labels={project.category.map(t)} compact />
                            <h3 className="text-xl font-bold text-white">
                              {project.title}
                            </h3>
                            {t(project.subtitle) && (
                              <span className="inline-block text-xs text-amber-300 font-medium mt-1">
                                {t(project.subtitle)}
                              </span>
                            )}
                            <p className="mt-1.5 text-sm text-zinc-200 leading-relaxed">
                              {t(project.blurb)}
                            </p>
                            <div className="mt-2 border-t border-white/5" />
                            {project.highlights && (
                              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
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
                                className={`mt-2 pt-2 border-t border-white/5 grid gap-3 ${
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
                            <div className="mt-2 border-t border-white/5" />
                            <div className="mt-2 flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <ProjectTagIcon key={tag} tag={tag} />
                              ))}
                            </div>
                            <div className="mt-auto pt-2.5 flex justify-center sm:justify-start">{cta}</div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>

                <div className="mt-3">
                  <div className="mx-auto h-1.5 w-full max-w-xs rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-[margin-left] duration-150"
                      style={{
                        width: `${featuredThumbWidth}%`,
                        marginLeft: `${featuredScrollProgress * (100 - featuredThumbWidth)}%`,
                      }}
                    />
                  </div>
                  <p
                    className="mt-4 text-center text-lg font-semibold leading-none tabular-nums"
                    style={{ fontFamily: "var(--font-space-grotesk)", color: "#e879f9" }}
                  >
                    {featuredCurrentIndex + 1}/{visibleSecondaryProjects.length}
                  </p>
                  <p className="mt-2.5 text-center text-[11.5px] leading-none text-zinc-400">
                    {visibleSecondaryProjects[featuredCurrentIndex]?.title}
                  </p>
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
                    <p className="text-xs text-violet-300 leading-relaxed mt-1">
                      <MapPin className="inline h-3 w-3 -mt-0.5 mr-1" />
                      {exp.location}
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

          {/* BLOG - chamada discreta para os posts recentes */}
          {recentPosts && recentPosts[lang].length > 0 && (
            <section className="relative py-10 border-t border-white/5">
              <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                    {t({ pt: "Do blog", en: "From the blog" })}
                  </h3>
                  <Link
                    href="/blog"
                    className="text-xs font-medium text-violet-300 hover:text-violet-200 transition-colors inline-flex items-center gap-1"
                  >
                    {t({ pt: "Ver todos os posts", en: "See all posts" })}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {recentPosts[lang].map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group rounded-xl border border-white/8 bg-white/[0.015] p-4 hover:border-white/15 hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="mt-1.5 text-[11px] text-zinc-500">
                        {post.readingMinutes} {t({ pt: "min de leitura", en: "min read" })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* NOW - o que estou construindo, estudando e lendo agora */}
          <section className="relative py-10 border-t border-white/5">
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">
                {t({ pt: "Agora", en: "Now" })}
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    label: { pt: "Construindo", en: "Building" },
                    value: {
                      pt: "Melhorias no próprio site: versão em inglês indexável, novos estudos de caso e um assistente com IA sobre o portfólio.",
                      en: "Improvements to this site: an indexable English version, new case studies, and an AI assistant over the portfolio.",
                    },
                  },
                  {
                    label: { pt: "Estudando", en: "Studying" },
                    value: {
                      pt: "Arquitetura de agentes de IA e RAG aplicados a produtos reais, além de práticas de observabilidade em produção.",
                      en: "AI agent architecture and RAG applied to real products, plus production observability practices.",
                    },
                  },
                  {
                    label: { pt: "Lendo", en: "Reading" },
                    value: {
                      pt: "Livros e papers sobre arquitetura de sistemas distribuídos e engenharia de produto.",
                      en: "Books and papers on distributed systems architecture and product engineering.",
                    },
                  },
                ].map((item) => (
                  <div
                    key={item.label.pt}
                    className="rounded-xl border border-white/8 bg-white/[0.015] p-4"
                  >
                    <h4 className="text-xs font-semibold text-violet-300 mb-1.5">{t(item.label)}</h4>
                    <p className="text-[13px] text-zinc-400 leading-relaxed">{t(item.value)}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-zinc-500">
                {t({
                  pt: "Fora do código: escrevendo uma autobiografia, aos poucos, nas horas vagas.",
                  en: "Outside of code: writing an autobiography, slowly, in my spare time.",
                })}
              </p>
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

                      {/* Ícones de hobbies seguindo a curva da borda, balançando juntos ao longo da linha */}
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
                          { Icon: Dumbbell, angle: 0 },
                          { Icon: Trophy, angle: 24 },
                          { Icon: Flag, angle: 48 },
                          { Icon: CarIcon, angle: 72 },
                          { Icon: Smartphone, angle: 96 },
                          { Icon: BookOpen, angle: 120 },
                          { Icon: BrainCircuit, angle: 144 },
                          { Icon: Rocket, angle: 168 },
                          { Icon: Bot, angle: 192 },
                          { Icon: Gamepad2, angle: 216 },
                          { Icon: Code2, angle: 240 },
                          { Icon: Flame, angle: 264 },
                          { Icon: Swords, angle: 288 },
                          { Icon: TrendingUp, angle: 312 },
                          { Icon: Camera, angle: 336 },
                        ].map(({ Icon, angle }, index) => {
                          const rad = (angle * Math.PI) / 180;
                          const x = (50 + 52 * Math.cos(rad)).toFixed(4);
                          const y = (50 + 52 * Math.sin(rad)).toFixed(4);
                          return (
                            <motion.span
                              key={angle}
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
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-200 shadow-lg cursor-pointer"
                              >
                                <Icon className="h-5 w-5" />
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
                      {lang === "pt" ? (
                        <>
                          Ei, esse formulário funciona de verdade viu?{" "}
                          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Vamos conversar!
                          </span>
                        </>
                      ) : (
                        <>
                          Hey, this form actually works.{" "}
                          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Let&apos;s talk!
                          </span>
                        </>
                      )}
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
                    <ContactForm onSuccess={() => track("home_contact_form_submitted")} />
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
                    href="mailto:contato@fcopts.com.br"
                    aria-label="E-mail"
                    onClick={() => track("contact_click", { channel: "email" })}
                    className="h-11 w-11 rounded-full bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-400/40 flex items-center justify-center text-zinc-300 hover:text-fuchsia-300 transition-all"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/5585981888896"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    onClick={() => track("contact_click", { channel: "whatsapp" })}
                    className="h-11 w-11 rounded-full bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-400/40 flex items-center justify-center text-zinc-300 hover:text-fuchsia-300 transition-all"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                  </a>
                  <a
                    href={getCvUrl(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t({ pt: "Baixar currículo", en: "Download résumé" })}
                    onClick={() => track("cv_download", { href: getCvUrl(lang) })}
                    className="h-11 w-11 rounded-full bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-400/40 flex items-center justify-center text-zinc-300 hover:text-fuchsia-300 transition-all"
                  >
                    <FileDown className="h-5 w-5" />
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
