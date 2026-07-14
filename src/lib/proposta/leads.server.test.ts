import { describe, it, expect, vi, afterEach } from "vitest";
import {
  JANELA_DIAS,
  MAX_POR_JANELA,
  contarPropostasNaJanela,
  normalizeEmail,
  registrarLead,
} from "./leads.server";
import type { Proposal } from "@/components/trabalhe-comigo/types";

afterEach(() => {
  vi.unstubAllEnvs();
});

const proposal: Proposal = {
  tipo: "Sistema web",
  resumo: "resumo",
  stack: ["Next.js"],
  entregaveis: ["a"],
  fases: [{ titulo: "Fase 1", descricao: "x" }],
  prazoEstimado: "A partir de 20 dias úteis",
  porte: "medio",
  investimento: { modelo: "faixa", min: 3000, max: 20000, horaBRL: 120, moeda: "BRL" },
};

describe("constants", () => {
  it("caps at 2 proposals per 30-day window", () => {
    expect(MAX_POR_JANELA).toBe(2);
    expect(JANELA_DIAS).toBe(30);
  });
});

describe("normalizeEmail", () => {
  it("lowercases and trims so casing/whitespace can't dodge the cap", () => {
    expect(normalizeEmail("  Fulano@Example.COM ")).toBe("fulano@example.com");
    expect(normalizeEmail("a@b.com")).toBe("a@b.com");
  });
});

describe("fail-open without a database", () => {
  it("contarPropostasNaJanela returns 0 when no DATABASE_URL is set", async () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("POSTGRES_URL", "");
    await expect(contarPropostasNaJanela("teste@fcopts.com.br")).resolves.toBe(0);
  });

  it("registrarLead resolves without throwing when there is no database", async () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("POSTGRES_URL", "");
    await expect(
      registrarLead({ numero: "FCOPTS-1", email: "a@b.com", nome: "Teste", proposal })
    ).resolves.toBeUndefined();
  });
});
