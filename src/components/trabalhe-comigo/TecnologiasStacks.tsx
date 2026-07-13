"use client";

import { Layers } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

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
      </div>
    </section>
  );
}
