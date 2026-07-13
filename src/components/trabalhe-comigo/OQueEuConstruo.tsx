"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  LayoutGrid,
  Smartphone,
  Globe,
  Waypoints,
  RefreshCw,
  ShieldCheck,
  Server,
  Check,
  ChevronDown,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { usePropostaPrefill } from "@/lib/proposta/prefill-context";
import type { Existente, TipoProjeto } from "./types";

type Service = {
  id: string;
  icon: LucideIcon;
  name: Bilingual;
  tag: Bilingual;
  description: Bilingual;
  bullets: [Bilingual, Bilingual, Bilingual];
  ideal: Bilingual;
  tipo: TipoProjeto;
  existente: Existente;
};

type Group = {
  label: Bilingual;
  services: Service[];
};

const GROUPS: Group[] = [
  {
    label: { pt: "CRIAR DO ZERO", en: "BUILD FROM SCRATCH" },
    services: [
      {
        id: "sistemas",
        icon: LayoutGrid,
        name: { pt: "Sistemas sob medida", en: "Custom systems" },
        tag: { pt: "SaaS, ERP, CRM e Dashboards", en: "SaaS, ERP, CRM and dashboards" },
        description: {
          pt: "Plataformas completas que organizam sua operação e crescem junto com o seu negócio.",
          en: "Complete platforms that organize your operation and grow with your business.",
        },
        bullets: [
          { pt: "Feito sob medida pro seu processo — sem gambiarra", en: "Built to fit your process — no workarounds" },
          { pt: "Painéis com o que importa, em tempo real", en: "Dashboards with what matters, in real time" },
          { pt: "Escala sem quebrar quando a empresa cresce", en: "Scales without breaking as the company grows" },
        ],
        ideal: {
          pt: "Ideal pra quem ainda controla tudo no Excel.",
          en: "Ideal for those still running everything on spreadsheets.",
        },
        tipo: "sistema_saas",
        existente: "do_zero",
      },
      {
        id: "apps",
        icon: Smartphone,
        name: { pt: "Aplicativos iOS e Android", en: "iOS and Android apps" },
        tag: { pt: "Apps nativos, publicados nas lojas", en: "Native apps, published on the stores" },
        description: {
          pt: "Apps rápidos e nativos, publicados nas lojas, pra sua marca ir no bolso do cliente.",
          en: "Fast native apps, published on the stores, to put your brand in your customer's pocket.",
        },
        bullets: [
          { pt: "Performance nativa no iPhone e no Android", en: "Native performance on iPhone and Android" },
          { pt: "Publicação e aprovação nas lojas por minha conta", en: "Store publishing and approval on me" },
          { pt: "Notificações que trazem o cliente de volta", en: "Notifications that bring the customer back" },
        ],
        ideal: {
          pt: "Ideal pra quem quer estar na tela inicial do cliente.",
          en: "Ideal for those who want to be on the customer's home screen.",
        },
        tipo: "app_mobile",
        existente: "do_zero",
      },
      {
        id: "sites",
        icon: Globe,
        name: { pt: "Sites e landing pages", en: "Websites and landing pages" },
        tag: { pt: "Páginas que convertem visitante em cliente", en: "Pages that turn visitors into customers" },
        description: {
          pt: "Páginas rápidas, otimizadas pro Google e feitas pra transformar visitante em cliente.",
          en: "Fast pages, optimized for Google and built to turn visitors into customers.",
        },
        bullets: [
          { pt: "Carrega rápido — ninguém desiste esperando", en: "Loads fast — nobody gives up waiting" },
          { pt: "Otimizado pro Google desde o primeiro dia", en: "Optimized for Google from day one" },
          { pt: "Feito pra gerar contato, não só pra ser bonito", en: "Built to generate contact, not just to look good" },
        ],
        ideal: {
          pt: "Ideal pra quem investe em tráfego e perde venda no site.",
          en: "Ideal for those investing in traffic but losing sales on the site.",
        },
        tipo: "site_landing",
        existente: "do_zero",
      },
    ],
  },
  {
    label: { pt: "EVOLUIR O QUE JÁ EXISTE", en: "EVOLVE WHAT ALREADY EXISTS" },
    services: [
      {
        id: "integracoes",
        icon: Waypoints,
        name: { pt: "Integrações e automações", en: "Integrations and automations" },
        tag: { pt: "Conecte tudo e economize tempo", en: "Connect everything and save time" },
        description: {
          pt: "Conecto seus sistemas, meios de pagamento e ferramentas pra automatizar o trabalho.",
          en: "I connect your systems, payment methods and tools to automate the work.",
        },
        bullets: [
          { pt: "Seus sistemas conversando, sem digitar duas vezes", en: "Your systems talking, without typing twice" },
          { pt: "Pagamentos, notas e entregas no automático", en: "Payments, invoices and deliveries on autopilot" },
          { pt: "Menos trabalho manual, menos erro humano", en: "Less manual work, less human error" },
        ],
        ideal: {
          pt: "Ideal pra quem copia e cola dado entre sistemas o dia todo.",
          en: "Ideal for those copy-pasting data between systems all day.",
        },
        tipo: "api_integracao",
        existente: "continuar",
      },
      {
        id: "modernizacao",
        icon: RefreshCw,
        name: { pt: "Modernização de sistemas", en: "System modernization" },
        tag: { pt: "Do legado pra uma versão rápida e segura", en: "From legacy to a fast, secure version" },
        description: {
          pt: "Levo seu sistema antigo pra uma versão moderna, rápida e segura, sem perder nenhum dado.",
          en: "I take your old system to a modern, fast and secure version, without losing any data.",
        },
        bullets: [
          { pt: "Migração sem perder um único dado", en: "Migration without losing a single record" },
          { pt: "Mais rápido e seguro que a versão antiga", en: "Faster and safer than the old version" },
          { pt: "Feito por etapas, sem parar sua operação", en: "Done in stages, without stopping your operation" },
        ],
        ideal: {
          pt: "Ideal pra quem depende de um sistema que ninguém mais mexe.",
          en: "Ideal for those relying on a system nobody dares to touch.",
        },
        tipo: "migracao",
        existente: "migracao_existente",
      },
    ],
  },
  {
    label: { pt: "MANTER NO AR", en: "KEEP IT RUNNING" },
    services: [
      {
        id: "sustentacao",
        icon: ShieldCheck,
        name: { pt: "Assumo e mantenho seu sistema", en: "I take over and maintain your system" },
        tag: { pt: "Sustentação com tudo documentado", en: "Support with everything documented" },
        description: {
          pt: "Já tem algo rodando? Assumo a operação, documento tudo e mantenho funcionando.",
          en: "Already have something running? I take over the operation, document everything and keep it working.",
        },
        bullets: [
          { pt: "Assumo mesmo sem o dev anterior por perto", en: "I take over even without the previous dev around" },
          { pt: "Tudo documentado — você deixa de ser refém", en: "Everything documented — you stop being held hostage" },
          { pt: "Correções e melhorias contínuas, sem dor de cabeça", en: "Continuous fixes and improvements, hassle-free" },
        ],
        ideal: {
          pt: "Ideal pra quem ficou na mão do desenvolvedor anterior.",
          en: "Ideal for those left stranded by the previous developer.",
        },
        tipo: "manutencao",
        existente: "continuar",
      },
      {
        id: "infra",
        icon: Server,
        name: { pt: "Seu produto sempre no ar", en: "Your product always online" },
        tag: { pt: "Hospedagem e infraestrutura monitorada", en: "Hosting and monitored infrastructure" },
        description: {
          pt: "Hospedagem e infraestrutura estável, 100% monitorada, pagando só o que consome.",
          en: "Stable, fully monitored infrastructure, paying only for what you use.",
        },
        bullets: [
          { pt: "Monitorado 24/7 — resolvo antes de você notar", en: "Monitored 24/7 — I fix it before you notice" },
          { pt: "Backups automáticos e recuperação garantida", en: "Automatic backups and guaranteed recovery" },
          { pt: "Paga só o que usar, escala quando precisar", en: "Pay only for what you use, scale when needed" },
        ],
        ideal: {
          pt: "Ideal pra quem já caiu no pior momento possível.",
          en: "Ideal for those who've already gone down at the worst possible moment.",
        },
        tipo: "manutencao",
        existente: "continuar",
      },
    ],
  },
];

const ALL_SERVICES: Service[] = GROUPS.flatMap((g) => g.services);

const BRAND_GRADIENT = "linear-gradient(135deg,#a855f7,#d946ef)";
const ORANGE_GRADIENT = "linear-gradient(135deg,#f97316,#fbbf24)";

const HERO_TITLE: Bilingual = { pt: "O que eu construo pra você", en: "What I build for you" };
const HERO_SUBTITLE: Bilingual = {
  pt: "Escolha os serviços que você precisa e monte sua proposta em segundos.",
  en: "Pick the services you need and build your proposal in seconds.",
};

function useTypewriter(text: string, speed: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
  }, [text]);
  useEffect(() => {
    if (!active || count >= text.length) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(text.length);
      return;
    }
    const timer = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [active, count, text, speed]);
  return { typed: text.slice(0, count), done: count >= text.length };
}

export default function OQueEuConstruo() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const { requestPrefill } = usePropostaPrefill();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.6 });
  const title = t(HERO_TITLE);
  const { typed, done } = useTypewriter(title, 55, heroInView);

  const toggleExpanded = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  const toggleSelected = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selectedCount = selected.size;

  const handleMontarProposta = () => {
    // Ordem de clique: Set preserva a ordem de inserção, então o tipo/ponto de
    // partida do form vêm do primeiro serviço que o usuário selecionou.
    const chosen = [...selected]
      .map((id) => ALL_SERVICES.find((s) => s.id === id))
      .filter((s): s is Service => Boolean(s));
    if (chosen.length > 0) {
      const intro =
        lang === "pt"
          ? "Tenho interesse nos seguintes serviços:"
          : "I'm interested in the following services:";
      const lines = chosen.map((s) => `- ${t(s.name)} (${t(s.tag)})`).join("\n");
      const first = chosen[0];
      requestPrefill({
        description: `${intro}\n${lines}`,
        tipo: first.tipo,
        existente: first.existente,
      });
    }
    document.getElementById("proposta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="servicos"
      className="scroll-mt-20 border-t border-white/10 py-20"
      style={{
        backgroundColor: "#08080b",
        backgroundImage:
          "radial-gradient(60% 50% at 85% 0%, rgba(168,85,247,0.16), transparent 70%), radial-gradient(55% 45% at 15% 0%, rgba(217,70,239,0.08), transparent 70%)",
      }}
    >
      <div className="mx-auto max-w-[720px] px-6">
        {/* Hero */}
        <div ref={heroRef} className="mb-12 text-center">
          <h1
            className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#f4f4f7" }}
          >
            {typed}
            <span
              className={done ? "typewriter-cursor-slow" : ""}
              style={{ color: "#a855f7" }}
              aria-hidden="true"
            >
              _
            </span>
          </h1>
          <p
            className="mx-auto mt-4 max-w-[780px] text-[15.5px] leading-relaxed"
            style={{ color: "#9a9aa7" }}
          >
            {t(HERO_SUBTITLE)}
          </p>
        </div>

        {/* Grupos */}
        {GROUPS.map((group) => (
          <div key={t(group.label)} className="mt-9 first:mt-0">
            <div className="mb-1 flex items-center gap-3">
              <span
                className="font-mono text-[11px] font-medium uppercase"
                style={{ letterSpacing: "0.16em", color: "#8c8c9a" }}
              >
                {t(group.label)}
              </span>
              <span className="h-px flex-1" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
            </div>

            <div>
              {group.services.map((service) => {
                const isOpen = expandedId === service.id;
                const isSelected = selected.has(service.id);
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {/* Linha clicável */}
                    <button
                      type="button"
                      onClick={() => toggleExpanded(service.id)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-3.5 rounded-xl px-3.5 py-[17px] text-left transition-colors"
                      style={{ backgroundColor: isOpen ? "rgba(168,85,247,0.06)" : undefined }}
                      onMouseEnter={(e) => {
                        if (!isOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isOpen) e.currentTarget.style.backgroundColor = "";
                      }}
                    >
                      <span
                        className="flex h-[42px] w-[42px] flex-none items-center justify-center transition-all"
                        style={{
                          borderRadius: "11px",
                          background: isOpen ? BRAND_GRADIENT : "rgba(168,85,247,0.10)",
                          color: isOpen ? "#ffffff" : "#c9a6ff",
                        }}
                      >
                        <Icon className="h-[21px] w-[21px]" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span
                            className="text-[17px] font-medium leading-tight"
                            style={{ fontFamily: "var(--font-space-grotesk)", color: "#f0f0f5" }}
                          >
                            {t(service.name)}
                          </span>
                          {isSelected && (
                            <span
                              className="font-mono text-[11px] font-medium"
                              style={{
                                color: "#f7a94a",
                                border: "1px solid rgba(249,115,22,0.4)",
                                backgroundColor: "rgba(249,115,22,0.10)",
                                borderRadius: "999px",
                                padding: "2px 8px",
                              }}
                            >
                              {t({ pt: "Na proposta", en: "In proposal" })}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-snug" style={{ color: "#8c8c9a" }}>
                          {t(service.tag)}
                        </span>
                      </span>

                      <ChevronDown
                        className="h-5 w-5 flex-none transition-transform duration-[250ms]"
                        style={{
                          color: isOpen ? "#c9a6ff" : "#8c8c9a",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>

                    {/* Conteúdo aberto */}
                    {isOpen && (
                      <div className="animate-fade-up pb-6 pl-3.5 pr-3.5 sm:pl-[71px]">
                        <p className="text-[15.5px] leading-relaxed" style={{ color: "#c2c2ce" }}>
                          {t(service.description)}
                        </p>

                        <ul className="mt-4 space-y-2.5">
                          {service.bullets.map((bullet) => (
                            <li key={t(bullet)} className="flex items-start gap-2.5">
                              <span
                                className="mt-0.5 flex h-[18px] w-[18px] flex-none items-center justify-center"
                                style={{
                                  borderRadius: "5px",
                                  backgroundColor: "rgba(168,85,247,0.14)",
                                  color: "#c9a6ff",
                                }}
                              >
                                <Check className="h-3 w-3" strokeWidth={2.5} />
                              </span>
                              <span className="text-[14.5px] leading-snug" style={{ color: "#d5d5df" }}>
                                {t(bullet)}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
                          <button
                            type="button"
                            onClick={() => toggleSelected(service.id)}
                            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
                            style={
                              isSelected
                                ? {
                                    color: "#f7a94a",
                                    border: "1px solid rgba(249,115,22,0.5)",
                                    backgroundColor: "rgba(249,115,22,0.08)",
                                  }
                                : {
                                    color: "#ffffff",
                                    background: ORANGE_GRADIENT,
                                    boxShadow: "0 8px 20px -8px rgba(249,115,22,0.5)",
                                  }
                            }
                          >
                            {isSelected && <Check className="h-4 w-4" strokeWidth={2.5} />}
                            {isSelected
                              ? t({ pt: "Adicionado à proposta", en: "Added to proposal" })
                              : t({ pt: "Adicionar à proposta", en: "Add to proposal" })}
                          </button>
                          <span className="text-[13.5px] italic" style={{ color: "#83839a" }}>
                            {t(service.ideal)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA final */}
        <div
          className="mt-10 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-[14.5px]" style={{ color: "#8c8c9a" }}>
            {selectedCount > 0
              ? t({
                  pt: `${selectedCount} ${selectedCount === 1 ? "serviço" : "serviços"} na sua proposta`,
                  en: `${selectedCount} ${selectedCount === 1 ? "service" : "services"} in your proposal`,
                })
              : t({ pt: "Escolheu o que precisa?", en: "Chose what you need?" })}
          </span>
          <button
            type="button"
            onClick={handleMontarProposta}
            className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110"
            style={{ background: BRAND_GRADIENT, boxShadow: "0 10px 28px -10px rgba(168,85,247,0.6)" }}
          >
            {t({ pt: "Montar proposta", en: "Build proposal" })}
            {selectedCount > 0 && <span>· {selectedCount}</span>}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
