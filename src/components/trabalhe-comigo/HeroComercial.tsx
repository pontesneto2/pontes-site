"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { track } from "@vercel/analytics";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { scrollToId } from "./scroll";

const stats: Array<{ value: string; label: Bilingual }> = [
  { value: "6+", label: { pt: "anos de experiência", en: "years of experience" } },
  { value: "15+", label: { pt: "projetos em produção", en: "projects in production" } },
  { value: "PT/EN", label: { pt: "atendimento remoto", en: "remote support" } },
  { value: "Gov · Startups", label: { pt: "clientes atendidos", en: "clients served" } },
];

export default function HeroComercial() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <header className="pt-20 sm:pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 font-mono text-xs text-emerald-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {t({ pt: "Disponível para novos projetos · Remoto", en: "Available for new projects · Remote" })}
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {t({ pt: "Software sob medida, ", en: "Custom software, " })}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {t({ pt: "do esboço ao deploy.", en: "from sketch to deploy." })}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            {t({
              pt: "Sistemas, sites, aplicativos bem como prestação de serviços construídos por um ",
              en: "Systems, websites, apps as well as professional services built by a ",
            })}
            <b className="text-zinc-200">{t({ pt: "Engenheiro de Softwares", en: "Software Engineer" })}</b>
            {t({
              pt: ". Trabalho com a governança de quem já colocou dezenas de produtos em produção pra governo, empresas e startups. Sem terceirização e sem enrolação. Conheça mais!",
              en: ". I work with the governance of someone who has already shipped dozens of products to production for government, companies and startups. No outsourcing, no runaround. Learn more!",
            })}
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <a
              href="#proposta"
              onClick={(event) => {
                track("trabalhe_comigo_cta_proposta", { source: "hero" });
                scrollToId("proposta")(event);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-all hover:scale-[1.03] hover:bg-zinc-100 hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)]"
            >
              {t({ pt: "Montar minha proposta agora", en: "Build my proposal now" })}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="https://wa.me/5585981888896"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("trabalhe_comigo_whatsapp_click", { source: "hero" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5"
            >
              <MessageCircle className="h-4 w-4" />
              {t({ pt: "Falar no WhatsApp", en: "Chat on WhatsApp" })}
            </a>
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-2xl font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {stat.value}
              </div>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-zinc-400">
                {t(stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
