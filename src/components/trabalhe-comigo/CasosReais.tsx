"use client";

import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";

const CASES: Array<{
  tag: Bilingual;
  title: string;
  who: Bilingual;
  description: Bilingual;
  metrics: Array<{ value: string; label: Bilingual }>;
}> = [
  {
    tag: { pt: "App mobile + web + admin", en: "Mobile app + web + admin" },
    title: "Ucopiloto",
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
    <section id="casos" className="scroll-mt-20 border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={{ pt: "Casos reais, resultados reais", en: "Real cases, real results" }}
          kicker={{ pt: "Projetos em produção, números medidos", en: "Projects in production, measured numbers" }}
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {CASES.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
            >
              <span className="inline-block rounded-md border border-white/20 bg-white/[0.07] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide text-violet-200">
                {t(item.tag)}
              </span>
              <h3 className="mb-1.5 mt-3.5 text-xl font-semibold text-white">{item.title}</h3>
              <div className="font-mono text-xs text-zinc-500">{t(item.who)}</div>
              <p className="mt-2.5 text-sm text-zinc-400">{t(item.description)}</p>
              <div className="mt-4 flex flex-wrap gap-5">
                {item.metrics.map((metric) => (
                  <div key={metric.value}>
                    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent">
                      {metric.value}
                    </div>
                    <div className="font-mono text-[11px] text-zinc-400">{t(metric.label)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
