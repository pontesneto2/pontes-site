"use client";

import { useState } from "react";
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
  type LucideIcon,
} from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import type { Existente, TipoProjeto } from "./types";
import TcSectionHeader from "./TcSectionHeader";

type Category = "CRIAR" | "EVOLUIR" | "MANTER";

const CATEGORY: Record<Category, { label: Bilingual; color: string }> = {
  CRIAR: { label: { pt: "Criar", en: "Create" }, color: "#a855f7" },
  EVOLUIR: { label: { pt: "Evoluir", en: "Evolve" }, color: "#38bdf8" },
  MANTER: { label: { pt: "Manter", en: "Maintain" }, color: "#34d399" },
};

type Service = {
  id: string;
  icon: LucideIcon;
  category: Category;
  name: Bilingual;
  tag: Bilingual;
  description: Bilingual;
  bullets: [Bilingual, Bilingual, Bilingual];
  ideal: Bilingual;
  tipo: TipoProjeto;
  existente: Existente;
};

const SERVICES: Service[] = [
  {
    id: "sistemas",
    icon: LayoutGrid,
    category: "CRIAR",
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
    ideal: { pt: "Ideal pra quem ainda controla tudo no Excel.", en: "Ideal for those still running everything on spreadsheets." },
    tipo: "sistema_saas",
    existente: "do_zero",
  },
  {
    id: "apps",
    icon: Smartphone,
    category: "CRIAR",
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
    ideal: { pt: "Ideal pra quem quer estar na tela inicial do cliente.", en: "Ideal for those who want to be on the customer's home screen." },
    tipo: "app_mobile",
    existente: "do_zero",
  },
  {
    id: "sites",
    icon: Globe,
    category: "CRIAR",
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
    ideal: { pt: "Ideal pra quem investe em tráfego e perde venda no site.", en: "Ideal for those investing in traffic but losing sales on the site." },
    tipo: "site_landing",
    existente: "do_zero",
  },
  {
    id: "integracoes",
    icon: Waypoints,
    category: "EVOLUIR",
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
    ideal: { pt: "Ideal pra quem copia e cola dado entre sistemas o dia todo.", en: "Ideal for those copy-pasting data between systems all day." },
    tipo: "api_integracao",
    existente: "continuar",
  },
  {
    id: "modernizacao",
    icon: RefreshCw,
    category: "EVOLUIR",
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
    ideal: { pt: "Ideal pra quem depende de um sistema que ninguém mais mexe.", en: "Ideal for those relying on a system nobody dares to touch." },
    tipo: "migracao",
    existente: "migracao_existente",
  },
  {
    id: "sustentacao",
    icon: ShieldCheck,
    category: "MANTER",
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
    ideal: { pt: "Ideal pra quem ficou na mão do desenvolvedor anterior.", en: "Ideal for those left stranded by the previous developer." },
    tipo: "manutencao",
    existente: "continuar",
  },
  {
    id: "infra",
    icon: Server,
    category: "MANTER",
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
    ideal: { pt: "Ideal pra quem já caiu no pior momento possível.", en: "Ideal for those who've already gone down at the worst possible moment." },
    tipo: "manutencao",
    existente: "continuar",
  },
];

const ORANGE_GRADIENT = "linear-gradient(135deg,#f97316,#fbbf24)";

export default function OQueEuConstruo() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const toggleOpen = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section
      id="servicos"
      className="scroll-mt-20 border-t border-white/10 py-20"
      style={{
        backgroundColor: "#08080b",
        backgroundImage:
          "radial-gradient(50% 40% at 85% 0%, rgba(249,115,22,0.05), transparent 72%), radial-gradient(48% 38% at 15% 0%, rgba(147,51,234,0.05), transparent 72%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <TcSectionHeader
          label={{ pt: "Serviços", en: "Services" }}
          title={{ pt: "Do esboço ao no ar, sob medida pro seu negócio", en: "From sketch to live, tailored to your business" }}
          subtitle={{
            pt: "Passe o mouse ou toque na seta de cada serviço para ver os detalhes.",
            en: "Hover or tap the arrow on each service to see the details.",
          }}
        />

        {/* Grid de serviços */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SERVICES.map((service) => {
            const isOpen = openIds.has(service.id);
            const Icon = service.icon;
            const cat = CATEGORY[service.category];
            return (
              <div
                key={service.id}
                className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-[11px] text-[#c9a6ff] transition-all group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white"
                    style={isOpen ? { background: ORANGE_GRADIENT, color: "#ffffff" } : { backgroundColor: "rgba(168,85,247,0.10)" }}
                  >
                    <Icon className="h-[21px] w-[21px]" />
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleOpen(service.id)}
                    aria-expanded={isOpen}
                    aria-label={t({ pt: "Ver detalhes", en: "See details" })}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#8c8c9a] transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 group-hover:rotate-180 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <h3 className="text-[16px] font-medium leading-tight text-[#f0f0f5]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {t(service.name)}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] font-mono text-[10px] font-semibold uppercase tracking-wide"
                    style={{ color: cat.color, border: `1px solid ${cat.color}55`, backgroundColor: `${cat.color}1a` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
                    {t({ pt: service.category, en: t(cat.label).toUpperCase() })}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-snug text-[#8c8c9a]">{t(service.tag)}</p>

                {/* Detalhes: abrem no hover ou ao clicar na seta */}
                <div className={`mt-4 border-t border-white/[0.06] pt-4 group-hover:block ${isOpen ? "block" : "hidden"}`}>
                  <p className="text-[14px] leading-relaxed text-[#c2c2ce]">{t(service.description)}</p>
                  <ul className="mt-3.5 space-y-2">
                    {service.bullets.map((bullet) => (
                      <li key={t(bullet)} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[5px]" style={{ backgroundColor: "rgba(168,85,247,0.14)", color: "#c9a6ff" }}>
                          <Check className="h-3 w-3" strokeWidth={2.5} />
                        </span>
                        <span className="text-[13.5px] leading-snug text-[#d5d5df]">{t(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3.5 text-[13px] italic text-[#83839a]">{t(service.ideal)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
