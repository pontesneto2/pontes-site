export type Porte = "pequeno" | "medio" | "grande";

export type TipoProjeto =
  | "sistema_saas"
  | "app_mobile"
  | "site_landing"
  | "api_integracao"
  | "migracao"
  | "manutencao";

export type Existente = "do_zero" | "continuar" | "migracao_existente";

export type Urgencia = "tranquilo" | "normal" | "urgente";

export type Investimento = {
  modelo: "faixa" | "a_partir";
  min: number;
  max: number | null;
  horaBRL: number | null;
  moeda: "BRL";
};

export type Fase = {
  titulo: string;
  descricao: string;
};

export type Proposal = {
  tipo: string;
  resumo: string;
  stack: string[];
  entregaveis: string[];
  fases: Fase[];
  prazoEstimado: string;
  porte: Porte;
  investimento: Investimento;
};

export type PropostaFallbackReason =
  | "rate_limited"
  | "timeout"
  | "ai_error"
  | "invalid_response";

export type PropostaResponse =
  | { ok: true; proposal: Proposal }
  | { ok: false; fallback: { reason: PropostaFallbackReason; whatsappUrl: string } };
