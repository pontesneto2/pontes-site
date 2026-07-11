import type { Porte } from "@/components/trabalhe-comigo/types";

/**
 * [[VERIFICAR: confirmar com o usuário]] Valores placeholder vindos do protótipo
 * (trabalhe-comigo.html / prompt-agente-trabalhe-comigo.md). Usados só para calibrar
 * o raciocínio da IA no system prompt — nunca renderizados na UI nem retornados
 * ao client como número de hora.
 */
export const HOURLY_RATES = {
  dedicacaoAlta: 60, // R$/h para +10h/semana
  padrao: 70, // R$/h padrão, mínimo 4h/semana
  avulso: 120, // R$/h avulso, sem recorrência
} as const;

/**
 * [[VERIFICAR]] Faixas de horas estimadas por porte (heurística própria, não
 * confirmada pelo usuário) usadas apenas para calcular a faixa de investimento
 * a partir da taxa "padrão". Ajustar assim que os valores reais forem definidos.
 */
const ESTIMATED_HOURS_BY_PORTE: Record<Porte, { min: number; max: number }> = {
  pequeno: { min: 40, max: 80 },
  medio: { min: 120, max: 280 },
  grande: { min: 350, max: 700 },
};

export function getFaixaInvestimento(porte: Porte): { min: number; max: number; moeda: "BRL" } {
  const hours = ESTIMATED_HOURS_BY_PORTE[porte];
  return {
    min: Math.round(hours.min * HOURLY_RATES.padrao),
    max: Math.round(hours.max * HOURLY_RATES.padrao),
    moeda: "BRL",
  };
}
