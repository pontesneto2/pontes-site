"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  MapPin,
  Briefcase,
  Clock,
  Code2,
  Github,
  Linkedin,
  GraduationCap,
  Languages,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Check,
  Quote,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import SiteHeader, { type SearchEntry } from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { CV_URL_PT, CV_URL_EN } from "@/lib/constants";
import { SKILL_NAMES } from "@/components/SkillsTools";
import testimonials from "@/data/testimonials.json";

const NAV_LINKS = [
  { href: "/#intro", label: { pt: "Sobre", en: "About" } },
  { href: "/#projects", label: { pt: "Projetos", en: "Projects" } },
  { href: "/#about", label: { pt: "Contato", en: "Contact" } },
  { href: "/blog", label: { pt: "Blog", en: "Blog" } },
];

const SEARCH_SECTIONS = [
  { href: "/", label: { pt: "Início", en: "Home" } },
  { href: "/#intro", label: { pt: "Sobre", en: "About" } },
  { href: "/#skills-tools", label: { pt: "Skills & Tools", en: "Skills & Tools" } },
  { href: "/#projects", label: { pt: "Projetos", en: "Projects" } },
  { href: "/#experience", label: { pt: "Trajetória", en: "Journey" } },
  { href: "/#about", label: { pt: "Contato", en: "Contact" } },
];

const IMPACT_STATS: Array<{ value: string; label: Bilingual }> = [
  { value: "30+", label: { pt: "Plataformas entregues", en: "Platforms delivered" } },
  { value: "99.7%", label: { pt: "Uptime\nmédio", en: "Average\nuptime" } },
  { value: "6+", label: { pt: "Anos de\nexperiência", en: "Years of\nexperience" } },
];

const SERVICES: Bilingual[] = [
  { pt: "Aplicativos mobile", en: "Mobile apps" },
  { pt: "ERP", en: "ERP" },
  { pt: "SaaS", en: "SaaS" },
  { pt: "CRM", en: "CRM" },
  { pt: "Soluções digitais", en: "Digital solutions" },
  { pt: "Websites", en: "Websites" },
  { pt: "Landing pages", en: "Landing pages" },
  { pt: "Integrações", en: "Integrations" },
  { pt: "Monitoramento", en: "Monitoring" },
  { pt: "Engenharia de infra", en: "Infra engineering" },
  { pt: "E muito mais", en: "And much more" },
];

const SKILL_GROUPS: Array<{ label: Bilingual; items: string[] }> = [
  { label: { pt: "Frontend", en: "Frontend" }, items: ["React", "Next.js", "Angular", "TypeScript", "UX/UI"] },
  { label: { pt: "Mobile", en: "Mobile" }, items: ["React Native", "Expo"] },
  {
    label: { pt: "Backend", en: "Backend" },
    items: ["Node.js", "NestJS", "Java (Spring Boot)", "C# (.NET)", "PHP (Laravel)", "PostgreSQL"],
  },
  { label: { pt: "DevOps & Infra", en: "DevOps & Infra" }, items: ["Docker", "Kubernetes", "Grafana", "Prometheus"] },
];

const FACTS: Array<{ icon: typeof Briefcase; label: Bilingual; value: Bilingual }> = [
  {
    icon: Clock,
    label: { pt: "Disponibilidade", en: "Availability" },
    value: { pt: "Aberto a novas oportunidades", en: "Open to new opportunities" },
  },
  {
    icon: MapPin,
    label: { pt: "Modelo de trabalho", en: "Work model" },
    value: { pt: "Remoto ou híbrido (Fortaleza, CE, Brasil)", en: "Remote or hybrid (Fortaleza, CE, Brazil)" },
  },
  {
    icon: Briefcase,
    label: { pt: "Senioridade", en: "Seniority" },
    value: { pt: "Sênior · 6+ anos de experiência", en: "Senior · 6+ years of experience" },
  },
  {
    icon: Languages,
    label: { pt: "Idiomas", en: "Languages" },
    value: { pt: "Português (nativo) · Inglês (profissional)", en: "Portuguese (native) · English (professional)" },
  },
  {
    icon: GraduationCap,
    label: { pt: "Formação", en: "Education" },
    value: {
      pt: "Análise e Desenv. de Sistemas · Pós em Eng. de Software (DevOps)",
      en: "Systems Analysis & Development · Postgrad in Software Eng. (DevOps)",
    },
  },
  {
    icon: Code2,
    label: { pt: "Stack principal", en: "Core stack" },
    value: { pt: "React, Next.js, Node.js, TypeScript, DevOps", en: "React, Next.js, Node.js, TypeScript, DevOps" },
  },
];

const FLAGSHIP_PROJECTS: Array<{
  title: string;
  caseStudy: string;
  blurb: Bilingual;
  tags: string[];
}> = [
  {
    title: "SDA Ceará",
    caseStudy: "/case/sda-ceara",
    blurb: {
      pt: "App mobile para o Governo do Ceará, publicado nas lojas iOS e Android, com 1.000+ usuários ativos.",
      en: "Mobile app for the Government of Ceará, published on iOS and Android, with 1,000+ active users.",
    },
    tags: ["React Native", ".NET", "PostgreSQL", "Kubernetes"],
  },
  {
    title: "Ucopiloto",
    caseStudy: "/case/ucopiloto",
    blurb: {
      pt: "Plataforma que conecta motoristas e oficinas, entregue solo (DevOps incluído) com 99,9% de uptime.",
      en: "Platform connecting drivers and repair shops, delivered solo (DevOps included) with 99.9% uptime.",
    },
    tags: ["React Native", "Next.js", "NestJS", "Docker"],
  },
  {
    title: "Sistema Escolar",
    caseStudy: "/case/sistema-escolar-policia",
    blurb: {
      pt: "Sistema de gestão escolar para o 2º Colégio da Polícia Militar do Ceará, com 2.350+ usuários ativos.",
      en: "School management system for the 2nd Military Police School of Ceará, with 2,350+ active users.",
    },
    tags: ["PHP", "Laravel", ".NET", "Angular"],
  },
];

const FEATURED_TESTIMONIAL = testimonials.find((item) => item.name === "Everton Araújo") ?? testimonials[0];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

function IconLinkButton({
  href,
  external,
  label,
  onClick,
  children,
}: {
  href: string;
  external?: boolean;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
    >
      {children}
    </a>
  );
}

export default function RecrutadoresPage() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const [emailCopied, setEmailCopied] = useState(false);

  const searchIndex: SearchEntry[] = [
    ...SEARCH_SECTIONS.map((link) => ({
      label: t(link.label),
      href: link.href,
      group: { pt: "Seção", en: "Section" },
    })),
    ...SKILL_NAMES.map((name) => ({
      label: name,
      href: "/#skills-tools",
      group: { pt: "Skill", en: "Skill" },
    })),
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText("contato@fcopts.com.br").then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  return (
    <>
      <SiteHeader
        navLinks={NAV_LINKS}
        searchIndex={searchIndex}
        cta={{ label: { pt: "Peça um orçamento", en: "Get a quote" }, href: "/trabalhe-comigo" }}
        ctaBadge={{ pt: "Novo", en: "New" }}
      />
      <main className="min-h-screen bg-[#0a0a0d] text-zinc-200">
        <motion.div
          className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-14"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {t({ pt: "Painel para recrutadores", en: "Recruiter panel" })}
          </motion.span>

          <motion.div variants={fadeUp} className="mt-5 flex items-center gap-4">
            <div className="relative h-16 w-16 flex-none rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-600 to-violet-800 p-[3px] shadow-[0_0_24px_rgba(147,51,234,0.25)]">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image src="/pontes-institucional.png" alt="Francisco Pontes" fill sizes="64px" className="object-cover" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Francisco Pontes</h1>
              <p className="text-sm text-violet-300 font-mono">
                {t({ pt: "Engenheiro de Software Senior", en: "Senior Software Engineer" })}
              </p>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACTS.map((fact) => (
              <motion.div
                key={fact.label.pt}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-violet-400/30"
              >
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
                  <fact.icon className="h-3.5 w-3.5" />
                  {t(fact.label)}
                </div>
                <p className="text-sm text-zinc-100 font-medium">{t(fact.value)}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              {t({ pt: "O que eu construo", en: "What I build" })}
            </div>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((service) => (
                <span
                  key={service.pt}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300"
                >
                  {t(service)}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
              <Code2 className="h-3.5 w-3.5" />
              {t({ pt: "Skills técnicas", en: "Technical skills" })}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label.pt}>
                  <div className="text-[11px] uppercase tracking-wide text-zinc-500 mb-1">{t(group.label)}</div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
              <Briefcase className="h-3.5 w-3.5" />
              {t({ pt: "Projetos em destaque", en: "Flagship projects" })}
            </div>
            <motion.div variants={staggerContainer} className="grid sm:grid-cols-3 gap-3">
              {FLAGSHIP_PROJECTS.map((project) => (
                <motion.div key={project.title} variants={fadeUp} whileHover={{ y: -3 }}>
                  <Link
                    href={project.caseStudy}
                    className="group block h-full rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.06]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{project.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-violet-300" />
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">{t(project.blurb)}</p>
                    <p className="mt-2 text-[11px] text-zinc-500">{project.tags.join(" · ")}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {FEATURED_TESTIMONIAL && (
            <motion.div
              variants={fadeUp}
              className="relative mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <Quote className="absolute top-4 right-4 h-5 w-5 text-fuchsia-400/30" />
              <p className="text-sm text-zinc-200 leading-relaxed max-w-2xl">
                &ldquo;{t(FEATURED_TESTIMONIAL.text)}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10">
                  {FEATURED_TESTIMONIAL.photo && (
                    <Image
                      src={FEATURED_TESTIMONIAL.photo}
                      alt={FEATURED_TESTIMONIAL.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-zinc-100 truncate">{FEATURED_TESTIMONIAL.name}</span>
                    <Linkedin className="h-3 w-3 text-[#0A66C2] shrink-0" />
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate">{FEATURED_TESTIMONIAL.role}</p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={CV_URL_PT}
              download
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-fuchsia-700/20"
            >
              <Download className="h-4 w-4" />
              {t({ pt: "Baixar CV (português)", en: "Download résumé (Portuguese)" })}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={CV_URL_EN}
              download
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-fuchsia-700/20"
            >
              <Download className="h-4 w-4" />
              {t({ pt: "Baixar CV (inglês)", en: "Download résumé (English)" })}
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-3 flex flex-wrap justify-center gap-3">
            <IconLinkButton href="/#about" label={t({ pt: "Formulário de contato", en: "Contact form" })}>
              <MessageSquare className="h-4 w-4" />
            </IconLinkButton>
            <IconLinkButton
              href="https://github.com/pontesneto2"
              external
              label={t({ pt: "GitHub", en: "GitHub" })}
            >
              <Github className="h-4 w-4" />
            </IconLinkButton>
            <IconLinkButton
              href="https://www.linkedin.com/in/fcopts"
              external
              label={t({ pt: "LinkedIn", en: "LinkedIn" })}
            >
              <Linkedin className="h-4 w-4" />
            </IconLinkButton>
            <IconLinkButton
              href="https://wa.me/5585981888896"
              external
              label={t({ pt: "WhatsApp", en: "WhatsApp" })}
            >
              <FaWhatsapp className="h-4 w-4" />
            </IconLinkButton>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={t({ pt: "Copiar e-mail", en: "Copy email" })}
              title={
                emailCopied
                  ? t({ pt: "E-mail copiado!", en: "Email copied!" })
                  : t({ pt: "Copiar e-mail", en: "Copy email" })
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
            >
              {emailCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Mail className="h-4 w-4" />}
            </button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 text-xs text-zinc-500 text-center">
            {t({ pt: "Prefere ver o currículo completo? ", en: "Prefer the full résumé? " })}
            <Link href="/cv" className="text-violet-300 hover:text-violet-200 underline underline-offset-2">
              {t({ pt: "Acessar /cv", en: "Go to /cv" })}
            </Link>
          </motion.p>
        </motion.div>
      </main>
      <SiteFooter impactStats={IMPACT_STATS} />
    </>
  );
}
