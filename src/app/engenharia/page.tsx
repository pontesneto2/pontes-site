"use client";

import { useEffect, useState } from "react";
import { Gauge, GitBranch, Layers, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

const STACK = [
  { group: "Framework", items: ["Next.js 15 (App Router, Turbopack)", "React 18", "TypeScript"] },
  { group: "UI", items: ["Tailwind CSS", "Framer Motion", "Lucide Icons"] },
  { group: "Conteúdo", items: ["MDX (blog) via unified/remark/rehype", "Shiki (syntax highlight)"] },
  { group: "Dados & Backend", items: ["Neon Postgres (serverless)", "Resend (e-mail transacional)", "@react-pdf/renderer (propostas em PDF)"] },
  { group: "Testes & Qualidade", items: ["Vitest (unit tests)", "ESLint", "tsc --noEmit"] },
  { group: "Deploy", items: ["Vercel", "GitHub Actions (CI)"] },
];

const DECISIONS: Array<{ title: Bilingual; body: Bilingual }> = [
  {
    title: { pt: "Bilíngue com rota SSR dedicada em inglês", en: "Bilingual with a dedicated English SSR route" },
    body: {
      pt: "A home tem uma versão em português (client-side, com toggle) e uma versão em inglês server-rendered em /en, com hreflang recíproco. Evita o problema comum de i18n client-only: conteúdo em inglês que não é indexável.",
      en: "The home page has a Portuguese version (client-side, with a toggle) and a server-rendered English version at /en, with reciprocal hreflang. Avoids the common client-only i18n problem: English content that isn't indexable.",
    },
  },
  {
    title: { pt: "Anti-bot sem captcha", en: "Anti-bot without a captcha" },
    body: {
      pt: "O formulário de contato e o gerador de proposta usam honeypot, time-trap e rate-limit durável (persistido no Neon) em vez de captcha. Menos atrito pra quem é humano, sem depender de terceiros.",
      en: "The contact form and the proposal generator use a honeypot, a time trap, and durable rate-limiting (persisted in Neon) instead of a captcha. Less friction for humans, no third-party dependency.",
    },
  },
  {
    title: { pt: "Gate de CI antes de qualquer deploy", en: "A CI gate before any deploy" },
    body: {
      pt: "Todo PR e todo push pra main roda typecheck, lint, testes unitários e build no GitHub Actions. Nada chega em produção sem passar por essa rede.",
      en: "Every PR and every push to main runs typecheck, lint, unit tests and build on GitHub Actions. Nothing reaches production without going through that gate.",
    },
  },
];

type PsiScore = { performance: number | null; accessibility: number | null; seo: number | null };

export default function EngenhariaPage() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const [score, setScore] = useState<PsiScore | null>(null);
  const [scoreState, setScoreState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      "https://fcopts.com.br"
    )}&category=performance&category=accessibility&category=seo&strategy=mobile`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("PSI request failed");
        return res.json();
      })
      .then((data) => {
        const categories = data?.lighthouseResult?.categories;
        if (!categories) throw new Error("No categories in PSI response");
        setScore({
          performance: categories.performance ? Math.round(categories.performance.score * 100) : null,
          accessibility: categories.accessibility ? Math.round(categories.accessibility.score * 100) : null,
          seo: categories.seo ? Math.round(categories.seo.score * 100) : null,
        });
        setScoreState("ready");
      })
      .catch(() => setScoreState("error"));
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#0a0a0d] text-zinc-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
          <h1 className="text-3xl font-bold text-white">{t({ pt: "Engenharia deste site", en: "Engineering behind this site" })}</h1>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            {t({
              pt: "Este próprio portfólio é um case: stack, decisões e o placar de performance, medido ao vivo, não uma captura antiga.",
              en: "This portfolio is itself a case study: stack, decisions, and a performance scoreboard measured live, not an old screenshot.",
            })}
          </p>

          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-violet-300 uppercase tracking-wider mb-4">
              <Gauge className="h-4 w-4" />
              {t({ pt: "Score ao vivo (PageSpeed Insights, mobile)", en: "Live score (PageSpeed Insights, mobile)" })}
            </h2>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              {scoreState === "loading" && (
                <p className="text-sm text-zinc-500">{t({ pt: "Medindo agora…", en: "Measuring now…" })}</p>
              )}
              {scoreState === "error" && (
                <p className="text-sm text-zinc-500">
                  {t({
                    pt: "Não foi possível medir agora (limite de requisições da API pública do PageSpeed Insights). Tente recarregar em alguns minutos.",
                    en: "Couldn't measure right now (rate limit on the public PageSpeed Insights API). Try reloading in a few minutes.",
                  })}
                </p>
              )}
              {scoreState === "ready" && score && (
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: { pt: "Performance", en: "Performance" }, value: score.performance },
                    { label: { pt: "Acessibilidade", en: "Accessibility" }, value: score.accessibility },
                    { label: { pt: "SEO", en: "SEO" }, value: score.seo },
                  ].map((row) => (
                    <div key={row.label.pt}>
                      <div
                        className="text-3xl font-bold"
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          color: row.value === null ? "#71717a" : row.value >= 90 ? "#4ade80" : row.value >= 50 ? "#facc15" : "#f87171",
                        }}
                      >
                        {row.value ?? "–"}
                      </div>
                      <div className="mt-1 text-[11px] text-zinc-500">{t(row.label)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-violet-300 uppercase tracking-wider mb-4">
              <Layers className="h-4 w-4" />
              {t({ pt: "Stack", en: "Stack" })}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {STACK.map((group) => (
                <div key={group.group} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-xs font-semibold text-zinc-400 mb-2">{group.group}</h3>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-zinc-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-violet-300 uppercase tracking-wider mb-4">
              <GitBranch className="h-4 w-4" />
              {t({ pt: "Decisões técnicas", en: "Technical decisions" })}
            </h2>
            <div className="space-y-4">
              {DECISIONS.map((d) => (
                <div key={d.title.pt} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
                    {d.title.pt.includes("Anti-bot") || d.title.en.includes("Anti-bot") ? (
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    ) : null}
                    {t(d.title)}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{t(d.body)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
