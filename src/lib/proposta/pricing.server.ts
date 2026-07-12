import type { Porte, Investimento } from "@/components/trabalhe-comigo/types";

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

export function getInvestimento(porte: Porte): Investimento {
  return INVESTIMENTO_POR_PORTE[porte];
}
