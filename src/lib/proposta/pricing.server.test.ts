import { describe, it, expect } from "vitest";
import { HOURLY_RATE, getInvestimento, getPrazoEstimado } from "./pricing.server";

describe("getPrazoEstimado", () => {
  it("returns the standardized deadline per porte and language", () => {
    expect(getPrazoEstimado("pequeno", "pt")).toBe("A partir de 2 dias úteis");
    expect(getPrazoEstimado("pequeno", "en")).toBe("From 2 business days");
    expect(getPrazoEstimado("medio", "pt")).toBe("A partir de 20 dias úteis");
    expect(getPrazoEstimado("grande", "en")).toBe("From 30 business days");
  });
});

describe("getInvestimento — base ranges (do_zero + normal, factor 1)", () => {
  it("pequeno is a closed range with no hourly rate", () => {
    expect(getInvestimento("pequeno", { existente: "do_zero", urgencia: "normal" })).toEqual({
      modelo: "faixa",
      min: 800,
      max: 3500,
      horaBRL: null,
      moeda: "BRL",
    });
  });

  it("medio is a closed range with the hourly rate", () => {
    expect(getInvestimento("medio", { existente: "do_zero", urgencia: "normal" })).toEqual({
      modelo: "faixa",
      min: 3000,
      max: 20000,
      horaBRL: HOURLY_RATE,
      moeda: "BRL",
    });
  });

  it("grande is open-ended (a_partir, max null) with the hourly rate", () => {
    expect(getInvestimento("grande", { existente: "do_zero", urgencia: "normal" })).toEqual({
      modelo: "a_partir",
      min: 5000,
      max: null,
      horaBRL: HOURLY_RATE,
      moeda: "BRL",
    });
  });
});

describe("getInvestimento — multipliers", () => {
  it("'continuar' adds 10% (rounded: values to 10, hour to 5)", () => {
    // 3000*1.1=3300, 20000*1.1=22000, 120*1.1=132 -> round5 -> 130
    expect(getInvestimento("medio", { existente: "continuar", urgencia: "normal" })).toMatchObject({
      min: 3300,
      max: 22000,
      horaBRL: 130,
    });
  });

  it("'migracao_existente' adds 25%", () => {
    // 800*1.25=1000, 3500*1.25=4375 -> round10 -> 4380
    expect(getInvestimento("pequeno", { existente: "migracao_existente", urgencia: "normal" })).toMatchObject({
      min: 1000,
      max: 4380,
      horaBRL: null,
    });
  });

  it("'urgente' adds 50% over both values and the hourly rate", () => {
    // 5000*1.5=7500, 120*1.5=180 -> round5 -> 180
    expect(getInvestimento("grande", { existente: "do_zero", urgencia: "urgente" })).toMatchObject({
      modelo: "a_partir",
      min: 7500,
      max: null,
      horaBRL: 180,
    });
  });

  it("stacks existente and urgencia factors multiplicatively", () => {
    // factor 1.1*1.5=1.65 -> 3000*1.65=4950, 20000*1.65=33000, 120*1.65=198 -> round5 -> 200
    expect(getInvestimento("medio", { existente: "continuar", urgencia: "urgente" })).toMatchObject({
      min: 4950,
      max: 33000,
      horaBRL: 200,
    });
  });

  it("keeps max null for grande regardless of factors", () => {
    const inv = getInvestimento("grande", { existente: "migracao_existente", urgencia: "urgente" });
    expect(inv.max).toBeNull();
    expect(inv.modelo).toBe("a_partir");
  });
});
