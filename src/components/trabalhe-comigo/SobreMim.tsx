"use client";

import Image from "next/image";
import { Github, Linkedin, MessageCircle, Mail, FileDown } from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";
import { CV_URL } from "@/lib/constants";

export default function SobreMim() {
  const { lang } = useLanguage();

  return (
    <section className="border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[280px_1fr] sm:gap-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl border border-violet-400/35 shadow-[0_30px_70px_-25px_rgba(139,92,246,0.45)]">
            <Image
              src="/pontes-institucional.png"
              alt="Francisco Pontes"
              fill
              sizes="280px"
              className="object-cover object-top"
            />
            <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-violet-400/35 bg-black/70 px-3 py-1.5 font-mono text-[11px] text-violet-200 backdrop-blur">
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
                pt: "Sou o Francisco. Engenheiro de software full stack com mais de 6 anos construindo produtos digitais de ponta a ponta. Já entreguei sistemas para órgãos públicos do Ceará, para empresas privadas e em projetos internacionais, passando por web, mobile, DevOps e UX/UI.",
                en: "I'm Francisco. Full stack software engineer with over 6 years building digital products end to end. I've shipped systems for public agencies in Ceará, private companies and international projects, spanning web, mobile, DevOps and UX/UI.",
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
      </div>
    </section>
  );
}
