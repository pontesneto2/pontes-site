export type Porte = "pequeno" | "medio" | "grande";

export type Proposal = {
  tipo: string;
  resumo: string;
  stack: string[];
  entregaveis: string[];
  prazoEstimado: string;
  porte: Porte;
  pagamentoSugerido: string;
  faixaInvestimento: { min: number; max: number; moeda: "BRL" };
};

export type PropostaFallbackReason = "rate_limited" | "timeout" | "ai_error" | "invalid_response";

export type PropostaResponse =
  | { ok: true; proposal: Proposal }
  | { ok: false; fallback: { reason: PropostaFallbackReason; whatsappUrl: string } };
