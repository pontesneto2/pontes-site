import type { Porte, Investimento, Existente, Urgencia } from "@/components/trabalhe-comigo/types";

/**
 * Taxa horária de referência (confirmada pelo Francisco em 2026-07-12). Vale para
 * projetos médio/grande cobrados por hora e serve de âncora para o motor de estimativa.
 */
export const HOURLY_RATE = 70;

/**
 * Faixas de referência por porte (confirmadas pelo Francisco em 2026-07-12). NÃO são
 * cotações fechadas: cada projeto vira uma proposta personalizada depois de entender o
 * contexto. Pequeno é uma faixa fechada; médio e grande são "a partir de" (podem também
 * ser cobrados por hora a HOURLY_RATE).
 */
const INVESTIMENTO_POR_PORTE: Record<Porte, Investimento> = {
  pequeno: { modelo: "faixa", min: 800, max: 1700, horaBRL: null, moeda: "BRL" },
  medio: { modelo: "a_partir", min: 2000, max: null, horaBRL: HOURLY_RATE, moeda: "BRL" },
  grande: { modelo: "a_partir", min: 3000, max: null, horaBRL: HOURLY_RATE, moeda: "BRL" },
};

/**
 * Ajustes de preço confirmados pelo Francisco (2026-07-12): partir do zero é o preço
 * padrão; continuar um sistema existente encarece 10%; migrar reduz 20%. Urgência aplica
 * +50% sobre valores e hora.
 */
const FATOR_EXISTENTE: Record<Existente, number> = {
  do_zero: 1,
  continuar: 1.1,
  migracao_existente: 0.8,
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
