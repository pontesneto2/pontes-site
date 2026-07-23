"use client";

import { track } from "@vercel/analytics";
import ContactForm from "@/components/ContactForm";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import Reveal from "./Reveal";

export default function ContatoSection() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <div className="rounded-3xl border border-violet-400/35 bg-gradient-to-b from-violet-500/10 to-transparent p-7 sm:p-9">
          <Reveal delay={0}>
            <h2
              className="max-w-md text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t({ pt: "Bora tirar seu projeto do papel?", en: "Ready to get your project off the ground?" })}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-3 max-w-xl">
            <p className="text-sm text-zinc-400 sm:text-base">
              {t({
                pt: "Me conta o que você precisa. Respondo rápido, sem robô e sem compromisso. Se já gerou uma proposta acima, é só aguardar que em breve te respondo.",
                en: "Tell me what you need. I reply fast, no bots, no strings attached. If you already generated a proposal above, just wait and I'll reply soon.",
              })}
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-7">
            <ContactForm
              origem="trabalhe-comigo"
              onSuccess={() => track("trabalhe_comigo_contato_enviado")}
            />
          </Reveal>

          <Reveal delay={0.24} className="mt-5">
            <p className="font-mono text-[13px] text-zinc-500">
              {t({
                pt: "Respondo rapidinho, geralmente no mesmo dia. Seus dados ficam só comigo, sem spam.",
                en: "I reply fast, usually the same day. Your data stays with me only, no spam.",
              })}
            </p>
          </Reveal>
    </div>
  );
}
