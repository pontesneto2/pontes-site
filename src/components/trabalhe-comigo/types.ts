export type Porte = "pequeno" | "medio" | "grande";

export type Investimento = {
  modelo: "faixa" | "a_partir";
  min: number;
  max: number | null;
  horaBRL: number | null;
  moeda: "BRL";
};

export type Proposal = {
  tipo: string;
  resumo: string;
  stack: string[];
  entregaveis: string[];
  prazoEstimado: string;
  porte: Porte;
  pagamentoSugerido: string;
  investimento: Investimento;
};

export type PropostaFallbackReason = "rate_limited" | "timeout" | "ai_error" | "invalid_response";

export type PropostaResponse =
  | { ok: true; proposal: Proposal }
  | { ok: false; fallback: { reason: PropostaFallbackReason; whatsappUrl: string } };
