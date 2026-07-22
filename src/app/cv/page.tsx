"use client";

import { Download, Mail, MapPin, Phone } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { CV_URL_PT, CV_URL_EN } from "@/lib/constants";
import { EXPERIENCE, EDUCATION, CV_SUMMARY, CV_SKILLS } from "@/lib/experience-data";

export default function CvPage() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <>
      <div className="print:hidden">
        <SiteHeader />
      </div>

      <main className="min-h-screen bg-[#0a0a0d] text-zinc-200 print:bg-white print:text-black">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 print:py-0 print:max-w-none">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 print:hidden">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {t({ pt: "Currículo", en: "Résumé" })}
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                {t({
                  pt: "Versão web, imprimível e compatível com ATS. Ou baixe o PDF.",
                  en: "Web version, printable and ATS-friendly. Or download the PDF.",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={CV_URL_PT}
                download
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border transition-colors ${
                  lang === "pt"
                    ? "border-violet-500/40 bg-violet-500/10 text-white"
                    : "border-white/15 text-zinc-300 hover:bg-white/5"
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                PDF PT
              </a>
              <a
                href={CV_URL_EN}
                download
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border transition-colors ${
                  lang === "en"
                    ? "border-violet-500/40 bg-violet-500/10 text-white"
                    : "border-white/15 text-zinc-300 hover:bg-white/5"
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                PDF EN
              </a>
            </div>
          </div>

          <article className="rounded-2xl border border-white/10 bg-black/40 p-8 sm:p-10 print:border-0 print:bg-transparent print:p-0">
            <header className="mb-8 print:mb-6">
              <h1 className="text-2xl font-bold text-white print:text-black">
                Francisco Pontes
              </h1>
              <p className="text-sm text-violet-300 print:text-zinc-700 mt-1">
                {t({ pt: "Engenheiro de Software Full Stack", en: "Full Stack Software Engineer" })}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-zinc-400 print:text-zinc-600">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> contato@fcopts.com.br
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Fortaleza, CE, Brasil
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {t({ pt: "Disponível sob solicitação", en: "Available on request" })}
                </span>
              </div>
            </header>

            <section className="mb-8 print:mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-400 print:text-zinc-800 mb-2">
                {t({ pt: "Resumo", en: "Summary" })}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-300 print:text-black">
                {t(CV_SUMMARY)}
              </p>
            </section>

            <section className="mb-8 print:mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-400 print:text-zinc-800 mb-3">
                {t({ pt: "Experiência", en: "Experience" })}
              </h2>
              <div className="space-y-5">
                {EXPERIENCE.map((exp) => (
                  <div key={exp.company}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <h3 className="text-sm font-semibold text-white print:text-black">
                        {exp.company}
                      </h3>
                      <span className="text-xs text-zinc-400 print:text-zinc-600">{exp.period}</span>
                    </div>
                    <p className="text-sm text-violet-300 print:text-zinc-700">{t(exp.role)}</p>
                    <p className="text-xs text-zinc-500 print:text-zinc-600">
                      {exp.location}
                      {exp.remote ? ` · ${t({ pt: "Remoto", en: "Remote" })}` : ""}
                      {exp.contractType ? ` · ${t(exp.contractType)}` : ""}
                    </p>
                    {exp.startRole ? (
                      <p className="text-xs text-zinc-500 print:text-zinc-600 mt-0.5">
                        {t({ pt: "Cargo inicial", en: "Starting role" })}: {t(exp.startRole)}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8 print:mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-400 print:text-zinc-800 mb-3">
                {t({ pt: "Formação", en: "Education" })}
              </h2>
              <ul className="space-y-2">
                {EDUCATION.map((item) => (
                  <li key={item.pt} className="text-sm text-zinc-300 print:text-black leading-relaxed">
                    {t(item)}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-400 print:text-zinc-800 mb-3">
                {t({ pt: "Habilidades", en: "Skills" })}
              </h2>
              <p className="text-sm text-zinc-300 print:text-black leading-relaxed">
                {CV_SKILLS.join(" · ")}
              </p>
            </section>
          </article>
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </>
  );
}
