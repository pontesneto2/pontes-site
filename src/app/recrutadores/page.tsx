"use client";

import Link from "next/link";
import { Download, Mail, MapPin, Briefcase, Clock, Code2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { CV_URL_EN } from "@/lib/constants";

const CORE_SKILLS = [
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "TypeScript",
  "DevOps",
  "Kubernetes",
  "Docker",
  "PostgreSQL",
  "UX/UI",
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
    icon: Code2,
    label: { pt: "Stack principal", en: "Core stack" },
    value: { pt: "React, Next.js, Node.js, TypeScript, DevOps", en: "React, Next.js, Node.js, TypeScript, DevOps" },
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

          <h1 className="mt-4 text-3xl font-bold text-white">Francisco Pontes</h1>
          <p className="mt-2 text-zinc-400">
            {t({
              pt: "Engenheiro de Software Full Stack, sênior, remoto (PT/EN). Resumo direto do que costuma importar numa triagem inicial.",
              en: "Full Stack Software Engineer, senior, remote (PT/EN). A direct summary of what usually matters in an initial screen.",
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
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
              <Code2 className="h-3.5 w-3.5" />
              {t({ pt: "Skills técnicas", en: "Technical skills" })}
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">{CORE_SKILLS.join(" · ")}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CV_URL_EN}
              download
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-fuchsia-700/20"
            >
              <Download className="h-4 w-4" />
              {t({ pt: "Baixar CV (inglês)", en: "Download résumé (English)" })}
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
