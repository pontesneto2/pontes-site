import type { Investimento, Proposal } from "@/components/trabalhe-comigo/types";
import type { Lang } from "@/lib/language-context";

export const BRAND = {
  nome: "Francisco Pontes",
  cargo: { pt: "Engenheiro de Software", en: "Software Engineer" },
  site: "fcopts.com.br",
  siteUrl: "https://fcopts.com.br",
  email: "contato@fcopts.com.br",
  whatsapp: "+55 85 98188-8896",
  whatsappUrl: "https://wa.me/5585981888896",
  github: "github.com/pontesneto2",
  githubUrl: "https://github.com/pontesneto2",
  linkedin: "linkedin.com/in/fcopts",
  linkedinUrl: "https://www.linkedin.com/in/fcopts",
  logoUrl: "/images/FCO.png",
} as const;

export const VALIDADE_DIAS = 7;

const PORTE_LABEL: Record<Proposal["porte"], { pt: string; en: string }> = {
  pequeno: { pt: "Pequeno", en: "Small" },
  medio: { pt: "Médio", en: "Medium" },
  grande: { pt: "Grande", en: "Large" },
};

export function porteLabel(porte: Proposal["porte"], lang: Lang) {
  return PORTE_LABEL[porte][lang];
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export function investimentoTexto(inv: Investimento, lang: Lang) {
  if (inv.modelo === "faixa" && inv.max !== null) {
    return `${formatBRL(inv.min)} a ${formatBRL(inv.max)}`;
  }
  return lang === "pt" ? `A partir de ${formatBRL(inv.min)}` : `From ${formatBRL(inv.min)}`;
}

/** Número da proposta no formato FCOPTS-AAAAMMDD-XXXX. */
export function gerarNumeroProposta(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FCOPTS-${y}${m}${d}-${rand}`;
}

export function addDias(date: Date, dias: number) {
  const out = new Date(date);
  out.setDate(out.getDate() + dias);
  return out;
}

export function formatData(date: Date, lang: Lang) {
  return date.toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Cláusulas jurídicas (texto próprio, sem travessão). */
export function clausulasLegais(lang: Lang): string[] {
  if (lang === "en") {
    return [
      "This document was generated automatically by the visitor through an AI tool. It has no signature, contractual value or legal validity, and does not represent any commitment by the provider.",
      "No figure or timeline stated here is binding until formally confirmed in writing by Francisco Pontes.",
      `This proposal is valid for ${VALIDADE_DIAS} calendar days from the issue date.`,
      "Preliminary AI-generated estimate. Scope, timeline and figures are approximate and may vary after a conversation and a detailed analysis.",
      "Suggested payment terms: 50% at the start and 50% on delivery, to be confirmed in the service agreement.",
      "The scope was inferred from the information provided by the client and is subject to refinement.",
    ];
  }
  return [
    "Documento gerado automaticamente pelo próprio visitante através de uma ferramenta de inteligência artificial. Não possui assinatura, valor contratual ou validade jurídica, e não representa qualquer compromisso do prestador.",
    "Nenhum valor ou prazo aqui indicado é vinculante até confirmação formal por escrito de Francisco Pontes.",
    `Esta proposta é válida por ${VALIDADE_DIAS} dias corridos a partir da data de emissão.`,
    "Estimativa preliminar gerada com apoio de inteligência artificial. Escopo, prazo e valores são aproximados e podem variar após uma conversa e uma análise detalhada.",
    "Condições de pagamento sugeridas: 50% no início e 50% na entrega, a confirmar em contrato de prestação de serviços.",
    "O escopo foi inferido a partir das informações fornecidas pelo cliente e está sujeito a refinamento.",
  ];
}

/** Rótulos das seções do documento, compartilhados entre o modal e o PDF. */
export function docLabels(lang: Lang) {
  const pt = lang === "pt";
  return {
    documento: pt ? "Proposta Comercial" : "Commercial Proposal",
    numero: pt ? "Nº da proposta" : "Proposal No.",
    emissao: pt ? "Emissão" : "Issued",
    validade: pt ? "Válida até" : "Valid until",
    resumo: pt ? "Resumo do projeto" : "Project summary",
    escopo: pt ? "Entregáveis" : "Deliverables",
    fases: pt ? "Etapas do projeto" : "Project timeline",
    stack: pt ? "Tecnologias sugeridas" : "Suggested technologies",
    prazo: pt ? "Prazo estimado" : "Estimated timeline",
    porte: pt ? "Porte" : "Size",
    investimento: pt ? "Investimento (faixa de referência)" : "Investment (reference range)",
    pagamento: pt ? "Condições de pagamento" : "Payment terms",
    proponente: pt ? "Proponente" : "Provider",
    juridico: pt ? "Termos e condições" : "Terms and conditions",
    aceite: pt ? "Aceite" : "Acceptance",
    deAcordo: pt ? "De acordo" : "Agreed",
    cliente: pt ? "Cliente" : "Client",
    prestador: pt ? "Prestador" : "Provider",
    data: pt ? "Data" : "Date",
    preliminar: pt ? "PRELIMINAR" : "PRELIMINARY",
    semValidade: pt ? "SEM VALIDADE JURÍDICA" : "NOT LEGALLY BINDING",
  };
}

/** Mensagem curta de LEMBRETE para o WhatsApp (sem conteúdo da proposta). */
export function lembreteWhatsappUrl(args: {
  numero: string;
  tipo: string;
  porte: Proposal["porte"];
  nome: string;
  contato: string;
  lang: Lang;
}) {
  const { numero, tipo, porte, nome, contato, lang } = args;
  const msg =
    lang === "en"
      ? `Hi Francisco! I just generated proposal ${numero} (${tipo}, ${porteLabel(porte, lang)} size) and already sent it to your email (${BRAND.email}). I'm ${nome}, my contact: ${contato}.`
      : `Oi Francisco! Acabei de gerar a proposta ${numero} (${tipo}, porte ${porteLabel(porte, lang)}) e já enviei pro seu e-mail (${BRAND.email}). Sou ${nome}, meu contato: ${contato}.`;
  return `${BRAND.whatsappUrl}?text=${encodeURIComponent(msg)}`;
}
