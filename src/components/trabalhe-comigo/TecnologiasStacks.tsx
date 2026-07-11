"use client";

import { Layers } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

const GROUPS: Array<{ label: Bilingual; techs: string[] }> = [
  {
    label: { pt: "Frontend & Mobile", en: "Frontend & Mobile" },
    techs: ["TypeScript", "React", "Next.js", "React Native", "Expo", "Vue.js", "Tailwind CSS", "JavaScript"],
  },
  {
    label: { pt: "Backend & APIs", en: "Backend & APIs" },
    techs: ["Node.js", "NestJS", "Express", "Python", "C# / .NET", "PHP / Laravel", "Java / Spring", "GraphQL"],
  },
  {
    label: { pt: "Banco & Dados", en: "Database & Data" },
    techs: ["PostgreSQL", "Prisma", "Sequelize", "MySQL", "MongoDB", "Redis"],
  },
  {
    label: { pt: "DevOps & Cloud", en: "DevOps & Cloud" },
    techs: ["Docker", "CI/CD", "GitHub Actions", "Vercel", "Railway", "AWS", "Azure", "Kubernetes", "Nginx", "Linux"],
  },
  {
    label: { pt: "Qualidade & Testes", en: "Quality & Testing" },
    techs: ["Jest", "Playwright", "Cypress", "Testes E2E"],
  },
  {
    label: { pt: "Produto & Design", en: "Product & Design" },
    techs: ["Figma", "Design Systems", "Prototipagem", "UX/UI", "Acessibilidade"],
  },
];

export default function TecnologiasStacks() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <section id="stacks" className="scroll-mt-20 border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "Tecnologias & stacks", en: "Technologies & stacks" }}
          kicker={{ pt: "Me adapto à sua stack, ou escolho a melhor", en: "I adapt to your stack, or choose the best one" }}
        />

        <div className="mb-6 flex items-start gap-5 rounded-2xl border border-violet-400/35 bg-gradient-to-b from-violet-500/10 to-transparent p-6">
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/10 text-violet-300">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              {t({
                pt: "Você escolhe a stack, ou eu escolho a melhor pra você.",
                en: "You choose the stack, or I choose the best one for you.",
              })}
            </h3>
            <p className="max-w-3xl text-sm text-zinc-400">
              {t({
                pt: "Se o seu projeto já exige uma tecnologia específica, eu me adapto a ela sem problema. Se não exige, eu escolho a melhor engenharia para o caso, pensando em performance, manutenção, prazo e custo. A tecnologia trabalha a favor do seu produto, nunca o contrário.",
                en: "If your project already requires a specific technology, I adapt to it without issue. If it doesn't, I pick the best engineering for the case, considering performance, maintenance, timeline and cost. Technology works in favor of your product, never the other way around.",
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((group) => (
            <div key={t(group.label)} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-3.5 font-mono text-[11px] uppercase tracking-wide text-violet-300">
                {t(group.label)}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11.5px] text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-xs text-zinc-500">
          {t({
            pt: "Não viu a tecnologia do seu projeto? É bem provável que eu já trabalhe com ela. ",
            en: "Didn't see your project's technology here? I've likely already worked with it. ",
          })}
          <a
            href="https://wa.me/5585981888896"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-300 underline underline-offset-2 hover:text-violet-200"
          >
            {t({ pt: "Me pergunte no WhatsApp.", en: "Ask me on WhatsApp." })}
          </a>
        </p>
      </div>
    </section>
  );
}
