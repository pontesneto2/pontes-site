"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import { useLanguage, tr, LANG_FLAG } from "@/lib/language-context";
import { getCvUrl } from "@/lib/constants";
import Reveal from "./Reveal";

const iconClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all hover:scale-[1.02] hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200";

export default function SobreMim() {
  const { lang } = useLanguage();

  return (
    <div>
      {/* Cabeçalho: foto + nome */}
      <Reveal delay={0} className="flex items-center gap-5">
        <div className="relative h-[92px] w-[92px] flex-none rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-600 to-violet-800 p-[3px] shadow-[0_0_30px_rgba(147,51,234,0.3)]">
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image src="/pontes-institucional.png" alt="Francisco Pontes" fill sizes="92px" className="object-cover" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Francisco Pontes
          </h3>
          <div className="mt-1 font-mono text-xs text-violet-300">
            {tr(lang, {
              pt: "Engenheiro de Software Full Stack Sênior · Fortaleza, BR",
              en: "Senior Full Stack Software Engineer · Fortaleza, BR",
            })}
          </div>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-violet-400/35 bg-black/40 px-2.5 py-1 font-mono text-[13px] text-violet-200">
            <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {tr(lang, { pt: "Disponível · Remoto", en: "Available · Remote" })}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-6">
      <p className="text-[15px] leading-relaxed text-zinc-400">
        {tr(lang, {
          pt: "Sou o Francisco. Engenheiro de software full stack com mais de 6 anos construindo produtos digitais de ponta a ponta. Já entreguei sistemas para órgãos públicos do Ceará, para empresas privadas e em projetos internacionais, passando por web, mobile, DevOps e infraestrutura.",
          en: "I'm Francisco. Full stack software engineer with over 6 years building digital products end to end. I've shipped systems for public agencies in Ceará, private companies and international projects, spanning web, mobile, DevOps and infrastructure.",
        })}
      </p>
      </Reveal>
      <Reveal delay={0.2} className="mt-3.5">
      <p className="text-[15px] leading-relaxed text-zinc-400">
        {tr(lang, {
          pt: "Sou graduado em Análise e Desenvolvimento de Sistemas e pós-graduado em Engenharia de Software com ênfase em DevOps. Uso Inteligência Artificial no dia a dia, mas sou da geração que aprendeu a programar na mão. Trabalho 100% remoto, em português e inglês, e meu foco é resolver o problema real do cliente, não só entregar código.",
          en: "I hold a degree in Systems Analysis and Development and a postgraduate degree in Software Engineering with a focus on DevOps. I use Artificial Intelligence daily, but I'm from the generation that learned to code by hand. I work 100% remote, in Portuguese and English, and my focus is solving the client's real problem, not just shipping code.",
        })}
      </p>
      </Reveal>

      <Reveal delay={0.3} className="mt-7 flex flex-wrap gap-2.5">
        <a href="https://github.com/pontesneto2" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconClass}>
          <Github className="h-5 w-5" />
        </a>
        <a href="https://www.linkedin.com/in/fcopts" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconClass}>
          <Linkedin className="h-5 w-5" />
        </a>
        <a href="mailto:contato@fcopts.com.br" aria-label="E-mail" className={iconClass}>
          <Mail className="h-5 w-5" />
        </a>
        <a
          href={getCvUrl(lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:scale-[1.02] hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200"
        >
          <FileDown className="h-4 w-4" />
          {tr(lang, { pt: "Baixar CV", en: "Download CV" })}
          <span aria-hidden="true" className="text-[0.9em] leading-none">
            {LANG_FLAG[lang]}
          </span>
        </a>
      </Reveal>
    </div>
  );
}
