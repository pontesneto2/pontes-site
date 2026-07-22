"use client";

import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { CV_URL_PT, CV_URL_EN } from "@/lib/constants";

const SKILL_GROUPS: Array<{ label: Bilingual; items: string[] }> = [
  { label: { pt: "Frontend", en: "Frontend" }, items: ["React", "Next.js", "TypeScript", "UX/UI"] },
  { label: { pt: "Mobile", en: "Mobile" }, items: ["React Native", "Expo"] },
  { label: { pt: "Backend", en: "Backend" }, items: ["Node.js", "NestJS", "PostgreSQL", "Prisma"] },
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

const CLIENTS = ["Governo do Ceará", "FlixBus", "FedEx"];

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
    title: "iMidooh",
    caseStudy: "/case/imidooh",
    blurb: {
      pt: "Produto próprio com arquitetura aprofundada de mídia e conteúdo, em produção.",
      en: "In-house product with a deep media and content architecture, in production.",
    },
    tags: ["Next.js", "Node.js", "PostgreSQL"],
  },
];

export default function RecrutadoresPage() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#0a0a0d] text-zinc-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border border-emerald-400/30 bg-emerald-500/10 text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {t({ pt: "Painel para recrutadores", en: "Recruiter panel" })}
          </span>

          <div className="mt-5 flex items-center gap-4">
            <div className="relative h-16 w-16 flex-none rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-600 to-violet-800 p-[3px] shadow-[0_0_24px_rgba(147,51,234,0.25)]">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image src="/pontes-institucional.png" alt="Francisco Pontes" fill sizes="64px" className="object-cover" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Francisco Pontes</h1>
              <p className="text-sm text-violet-300 font-mono">
                {t({ pt: "Engenheiro de Software Full Stack Sênior", en: "Senior Full Stack Software Engineer" })}
              </p>
            </div>
          </div>

          <p className="mt-4 text-zinc-400">
            {t({
              pt: "Resumo direto do que costuma importar numa triagem inicial: disponibilidade, stack, senioridade e como falar comigo.",
              en: "A direct summary of what usually matters in an initial screen: availability, stack, seniority and how to reach me.",
            })}
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {FACTS.map((fact) => (
              <div key={fact.label.pt} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
                  <fact.icon className="h-3.5 w-3.5" />
                  {t(fact.label)}
                </div>
                <p className="text-sm text-zinc-100 font-medium">{t(fact.value)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
              <Code2 className="h-3.5 w-3.5" />
              {t({ pt: "Skills técnicas", en: "Technical skills" })}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label.pt}>
                  <div className="text-[11px] uppercase tracking-wide text-zinc-500 mb-1">{t(group.label)}</div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 text-center">
              {t({ pt: "Sistemas em produção para", en: "Systems in production for" })}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-zinc-400">
              {CLIENTS.map((client) => (
                <span key={client}>{client}</span>
              ))}
              <span>{t({ pt: "Institutos e ONGs", en: "Institutes & NGOs" })}</span>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
              <Briefcase className="h-3.5 w-3.5" />
              {t({ pt: "Projetos em destaque", en: "Flagship projects" })}
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {FLAGSHIP_PROJECTS.map((project) => (
                <Link
                  key={project.title}
                  href={project.caseStudy}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{project.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-violet-300" />
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">{t(project.blurb)}</p>
                  <p className="mt-2 text-[11px] text-zinc-500">{project.tags.join(" · ")}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={CV_URL_PT}
              download
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-fuchsia-700/20"
            >
              <Download className="h-4 w-4" />
              {t({ pt: "Baixar CV (português)", en: "Download résumé (Portuguese)" })}
            </a>
            <a
              href={CV_URL_EN}
              download
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-fuchsia-700/20"
            >
              <Download className="h-4 w-4" />
              {t({ pt: "Baixar CV (inglês)", en: "Download résumé (English)" })}
            </a>
          </div>

          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href="https://github.com/pontesneto2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-white/15 text-zinc-200 hover:bg-white/5 text-sm font-medium transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/fcopts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-white/15 text-zinc-200 hover:bg-white/5 text-sm font-medium transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://wa.me/5585981888896"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-white/15 text-zinc-200 hover:bg-white/5 text-sm font-medium transition-colors"
            >
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="mailto:contato@fcopts.com.br"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-white/15 text-zinc-200 hover:bg-white/5 text-sm font-medium transition-colors"
            >
              <Mail className="h-4 w-4" />
              contato@fcopts.com.br
            </a>
          </div>

          <p className="mt-8 text-xs text-zinc-500">
            {t({ pt: "Prefere ver o currículo completo? ", en: "Prefer the full résumé? " })}
            <Link href="/cv" className="text-violet-300 hover:text-violet-200 underline underline-offset-2">
              {t({ pt: "Acessar /cv", en: "Go to /cv" })}
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
