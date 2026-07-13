"use client";

import Image from "next/image";
import { Github, Linkedin, MessageCircle, Mail, FileDown } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { CV_URL } from "@/lib/constants";

const stats: Array<{ value: string; label: Bilingual }> = [
  { value: "6+", label: { pt: "anos de experiência", en: "years of experience" } },
  { value: "15+", label: { pt: "projetos em produção", en: "projects in production" } },
  { value: "PT/EN", label: { pt: "atendimento remoto", en: "remote support" } },
  { value: "Gov · Startups", label: { pt: "clientes atendidos", en: "clients served" } },
];

export default function SobreMim() {
  const { lang } = useLanguage();

  return (
    <section className="border-t border-white/10 py-20" style={{ backgroundColor: "#08080b" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[300px_1fr] sm:gap-12">
          <div className="relative mx-auto w-full max-w-[300px]">
            <div className="relative aspect-square w-full rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-600 to-violet-800 p-[14px] shadow-[0_0_40px_rgba(147,51,234,0.3)]">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/pontes-institucional.png"
                  alt="Francisco Pontes"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>
            <span className="absolute bottom-1 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-violet-400/35 bg-black/70 px-3 py-1.5 font-mono text-[11px] text-violet-200 backdrop-blur">
              <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {tr(lang, { pt: "Disponível · Remoto", en: "Available · Remote" })}
            </span>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Francisco Pontes
            </h3>
            <div className="mb-4 mt-1 font-mono text-xs text-violet-300">
              {tr(lang, {
                pt: "Engenheiro de Software Full Stack Sênior · Fortaleza, BR",
                en: "Senior Full Stack Software Engineer · Fortaleza, BR",
              })}
            </div>
            <p className="text-[15px] leading-relaxed text-zinc-400">
              {tr(lang, {
                pt: "Sou o Francisco. Engenheiro de software full stack com mais de 6 anos construindo produtos digitais de ponta a ponta. Já entreguei sistemas para órgãos públicos do Ceará, para empresas privadas e em projetos internacionais, passando por web, mobile, DevOps e infraestrutura.",
                en: "I'm Francisco. Full stack software engineer with over 6 years building digital products end to end. I've shipped systems for public agencies in Ceará, private companies and international projects, spanning web, mobile, DevOps and infrastructure.",
              })}
            </p>
            <p className="mt-3.5 text-[15px] leading-relaxed text-zinc-400">
              {tr(lang, {
                pt: "Sou graduado em Análise e Desenvolvimento de Sistemas e pós-graduado em Engenharia de Software com ênfase em DevOps. Uso Inteligência Artificial no dia a dia, mas sou da geração que aprendeu a programar na mão. Trabalho 100% remoto, em português e inglês, e meu foco é resolver o problema real do cliente, não só entregar código.",
                en: "I hold a degree in Systems Analysis and Development and a postgraduate degree in Software Engineering with a focus on DevOps. I use Artificial Intelligence daily, but I'm from the generation that learned to code by hand. I work 100% remote, in Portuguese and English, and my focus is solving the client's real problem, not just shipping code.",
              })}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:justify-start">
              <a
                href="https://github.com/pontesneto2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/fcopts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5585981888896"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-200"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@fcopts.com.br"
                aria-label="E-mail"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-200"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-200"
              >
                <FileDown className="h-4 w-4" />
                {tr(lang, { pt: "Baixar CV", en: "Download CV" })}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-8 sm:justify-start">
          {stats.map((stat) => (
            <div key={stat.value}>
              <div className="text-base font-semibold text-zinc-200" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {stat.value}
              </div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-zinc-500">
                {tr(lang, stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
