import type { Porte, Investimento, Existente, Urgencia } from "@/components/trabalhe-comigo/types";

/**
 * Taxa horária de referência exibida no documento (confirmada pelo Francisco em 2026-07-13).
 * Vale para projetos médio/grande cobrados por hora e serve de âncora para o motor de estimativa.
 * Os R$70/h ficam como promoção oferecida na conversa, fora do documento.
 */
export const HOURLY_RATE = 120;

/**
 * Prazo estimado padronizado por porte (confirmado pelo Francisco). É a fonte da
 * verdade do prazo: a IA NÃO gera mais prazo livre (evita "X semanas" que assusta o
 * cliente). Sempre "a partir de", pois cada projeto fecha o prazo após conversa.
 */
export const PRAZO_POR_PORTE: Record<Porte, { pt: string; en: string }> = {
  pequeno: { pt: "A partir de 2 dias úteis", en: "From 2 business days" },
  medio: { pt: "A partir de 20 dias úteis", en: "From 20 business days" },
  grande: { pt: "A partir de 30 dias úteis", en: "From 30 business days" },
};

export function getPrazoEstimado(porte: Porte, lang: "pt" | "en"): string {
  return PRAZO_POR_PORTE[porte][lang];
}

/**
 * Faixas de referência por porte (confirmadas pelo Francisco em 2026-07-13). NÃO são
 * cotações fechadas: cada projeto vira uma proposta personalizada depois de entender o
 * contexto. Pequeno e médio são faixas fechadas (mostram teto, evitam a conta prazo×hora);
 * grande é "a partir de". Médio e grande também podem ser cobrados por hora a HOURLY_RATE.
 */
const INVESTIMENTO_POR_PORTE: Record<Porte, Investimento> = {
  pequeno: { modelo: "faixa", min: 800, max: 3500, horaBRL: null, moeda: "BRL" },
  medio: { modelo: "faixa", min: 3000, max: 20000, horaBRL: HOURLY_RATE, moeda: "BRL" },
  grande: { modelo: "a_partir", min: 5000, max: null, horaBRL: HOURLY_RATE, moeda: "BRL" },
};

/**
 * Ajustes de preço confirmados pelo Francisco (2026-07-13): partir do zero é o preço
 * padrão; continuar um sistema existente encarece 10%; migrar é o mais caro (+25%, pelo
 * trabalho com legado, dados e paridade). Urgência aplica +50% sobre valores e hora.
 */
const FATOR_EXISTENTE: Record<Existente, number> = {
  do_zero: 1,
  continuar: 1.1,
  migracao_existente: 1.25,
};

const FATOR_URGENCIA: Record<Urgencia, number> = {
  tranquilo: 1,
  normal: 1,
  urgente: 1.5,
};

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function getInvestimento(
  porte: Porte,
  opts: { existente: Existente; urgencia: Urgencia }
): Investimento {
  const base = INVESTIMENTO_POR_PORTE[porte];
  const fator = FATOR_EXISTENTE[opts.existente] * FATOR_URGENCIA[opts.urgencia];
  return {
    modelo: base.modelo,
    min: roundTo(base.min * fator, 10),
    max: base.max === null ? null : roundTo(base.max * fator, 10),
    horaBRL: base.horaBRL === null ? null : roundTo(base.horaBRL * fator, 5),
    moeda: base.moeda,
  };
}
