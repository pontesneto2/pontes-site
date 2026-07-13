"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

const CASES: Array<{
  tag: Bilingual;
  title: string;
  link: string;
  who: Bilingual;
  description: Bilingual;
  metrics: Array<{ value: string; label: Bilingual }>;
}> = [
  {
    tag: { pt: "App mobile + web + admin", en: "Mobile app + web + admin" },
    title: "Ucopiloto",
    link: "https://www.ucopiloto.com.br/",
    who: { pt: "Idealizadora: Click Software House · DevOps solo", en: "Idealized by: Click Software House · Solo DevOps" },
    description: {
      pt: "Plataforma que conecta motoristas e oficinas: agendamentos, orçamentos e acompanhamento de serviços. iOS, Android, web e painel, tudo entregue por uma pessoa.",
      en: "Platform connecting drivers and repair shops: bookings, quotes and service tracking. iOS, Android, web and admin panel, all delivered by one person.",
    },
    metrics: [
      { value: "200+", label: { pt: "usuários ativos", en: "active users" } },
      { value: "-35%", label: { pt: "tempo de agendamento", en: "scheduling time" } },
      { value: "iOS+Android", label: { pt: "+ web + admin", en: "+ web + admin" } },
    ],
  },
  {
    tag: { pt: "Sistema web / PWA", en: "Web system / PWA" },
    title: "Sistema Escolar do Colégio da PM/CE",
    link: "https://www.com3brasil.com.br/v9/app/cpmce/login/",
    who: { pt: "Idealizadora: Com3 Brasil · time de 3 a 4 devs", en: "Idealized by: Com3 Brasil · team of 3 to 4 devs" },
    description: {
      pt: "Gestão escolar com acesso por perfil para acompanhamento acadêmico e administrativo, entregue antes do prazo.",
      en: "School management with role-based access for academic and administrative tracking, delivered ahead of schedule.",
    },
    metrics: [
      { value: "2.350+", label: { pt: "usuários ativos", en: "active users" } },
      { value: "-40%", label: { pt: "manutenção semanal", en: "weekly maintenance" } },
      { value: "-2 meses", label: { pt: "MVP antes do prazo", en: "MVP ahead of schedule" } },
    ],
  },
  {
    tag: { pt: "Sistema de gestão gov", en: "Government management system" },
    title: "FEDAF, Governo do Ceará",
    link: "https://sistemas2.sda.ce.gov.br/scriptcase/app/fedaf/login/",
    who: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    description: {
      pt: "Sistema de gestão do Fundo Estadual de Desenvolvimento da Agricultura Familiar, em escala estadual.",
      en: "Management system for the State Family Agriculture Development Fund, at state scale.",
    },
    metrics: [
      { value: "15.000+", label: { pt: "produtores cadastrados", en: "registered producers" } },
      { value: "-35%", label: { pt: "tempo de análise", en: "analysis time" } },
    ],
  },
  {
    tag: { pt: "Site institucional", en: "Corporate website" },
    title: "Silva & Duarte Advogados",
    link: "https://www.silvaeduarteadvogados.com/",
    who: { pt: "Full Stack solo · 1 mês", en: "Solo Full Stack · 1 month" },
    description: {
      pt: "Site institucional do escritório, com áreas de atuação e canais de contato. Do briefing ao ar em poucas semanas.",
      en: "Corporate website for the firm, with practice areas and contact channels. From briefing to live in a few weeks.",
    },
    metrics: [
      { value: "99,9%", label: { pt: "uptime", en: "uptime" } },
      { value: "1 mês", label: { pt: "do zero ao ar", en: "from scratch to live" } },
    ],
  },
];

export default function CasosReais() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  return (
    <section id="casos" className="scroll-mt-20 border-t border-white/10 py-20" style={{ backgroundColor: "#101018" }}>
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "Casos reais, resultados reais", en: "Real cases, real results" }}
          kicker={{ pt: "Projetos em produção, números medidos", en: "Projects in production, measured numbers" }}
        />
        <div
          className="tc-cases overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)",
          }}
        >
          <div className="tc-cases-track flex w-max gap-4">
            {[...CASES, ...CASES].map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="flex w-[330px] shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.07] sm:w-[360px]"
              >
                <span className="inline-block w-fit rounded-md bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wide text-zinc-950">
                  {t(item.tag)}
                </span>
                <h3 className="mb-1.5 mt-3.5 text-xl font-semibold text-white">{item.title}</h3>
                <div className="font-mono text-xs text-zinc-500">{t(item.who)}</div>
                <p className="mt-2.5 text-sm text-zinc-400">{t(item.description)}</p>
                <div className="mt-auto flex flex-wrap gap-5 pt-4">
                  {item.metrics.map((metric) => (
                    <div key={metric.value}>
                      <div className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-lg font-semibold text-transparent">
                        {metric.value}
                      </div>
                      <div className="font-mono text-[11px] text-zinc-400">{t(metric.label)}</div>
                    </div>
                  ))}
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:scale-[1.02] hover:brightness-110"
                >
                  {t({ pt: "Visitar projeto", en: "Visit project" })}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-rose-400/40 hover:text-white"
          >
            {t({ pt: "Veja mais projetos", en: "See more projects" })}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <style>{`
        .tc-cases-track { animation: tc-cases-scroll 45s linear infinite; }
        .tc-cases:hover .tc-cases-track { animation-play-state: paused; }
        @keyframes tc-cases-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 0.5rem)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tc-cases-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
