"use client";

import { Mail, MessageCircle, Linkedin } from "lucide-react";
import { track } from "@vercel/analytics";
import ContactForm from "@/components/ContactForm";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

export default function ContatoSection() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <section id="contato" className="scroll-mt-20 border-t border-white/10 py-20" style={{ backgroundColor: "#101018" }}>
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-violet-400/35 bg-gradient-to-b from-violet-500/10 to-transparent p-9 sm:p-11">
          <h2
            className="max-w-md text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t({ pt: "Bora tirar seu projeto do papel?", en: "Ready to get your project off the ground?" })}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
            {t({
              pt: "Me conta o que você precisa. Respondo rápido, sem robô e sem compromisso. Se já gerou uma proposta acima, é só mandar junto.",
              en: "Tell me what you need. I reply fast, no bots, no strings attached. If you already generated a proposal above, just send it along.",
            })}
          </p>

          <div className="mt-7">
            <ContactForm
              origem="trabalhe-comigo"
              onSuccess={() => track("trabalhe_comigo_contato_enviado")}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              href="https://wa.me/5585981888896"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-violet-400/40 hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {t({ pt: "WhatsApp direto", en: "Direct WhatsApp" })}
            </a>
            <a
              href="mailto:contato@fcopts.com.br"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-violet-400/40 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              contato@fcopts.com.br
            </a>
            <a
              href="https://www.linkedin.com/in/fcopts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-violet-400/40 hover:text-white"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          </div>

          <p className="mt-5 font-mono text-[11px] text-zinc-500">
            {t({
              pt: "O que acontece depois: eu respondo em até 1 dia útil, marcamos uma conversa rápida e eu monto sua proposta. Seus dados são usados só para isso, sem spam.",
              en: "What happens next: I reply within 1 business day, we schedule a quick chat and I put together your proposal. Your data is only used for this, no spam.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
