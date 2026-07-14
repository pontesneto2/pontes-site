import { describe, it, expect } from "vitest";
import {
  VALIDADE_DIAS,
  addDias,
  clausulasLegais,
  docLabels,
  formasPagamento,
  formatBRL,
  formatData,
  gerarNumeroProposta,
  investimentoTexto,
  lembreteWhatsappUrl,
  porteLabel,
} from "./proposta-doc";
import type { Investimento } from "@/components/trabalhe-comigo/types";

describe("formatBRL", () => {
  it("groups thousands and drops decimals (locale-agnostic assertions)", () => {
    const out = formatBRL(3500);
    expect(out).toContain("R$");
    expect(out).toContain("3.500");
    expect(out).not.toContain(",00");
  });
});

describe("investimentoTexto", () => {
  const faixa: Investimento = { modelo: "faixa", min: 800, max: 3500, horaBRL: null, moeda: "BRL" };
  const aPartir: Investimento = { modelo: "a_partir", min: 5000, max: null, horaBRL: 120, moeda: "BRL" };

  it("renders a closed range with ' a ' when max is present", () => {
    const out = investimentoTexto(faixa, "pt");
    expect(out).toContain("800");
    expect(out).toContain("3.500");
    expect(out).toContain(" a ");
  });

  it("renders 'A partir de' / 'From' when open-ended", () => {
    expect(investimentoTexto(aPartir, "pt")).toContain("A partir de");
    expect(investimentoTexto(aPartir, "en")).toContain("From");
  });

  it("falls back to 'a partir de' when modelo is faixa but max is null", () => {
    const weird: Investimento = { modelo: "faixa", min: 900, max: null, horaBRL: null, moeda: "BRL" };
    expect(investimentoTexto(weird, "pt")).toContain("A partir de");
  });
});

describe("porteLabel", () => {
  it("localizes the porte label", () => {
    expect(porteLabel("pequeno", "pt")).toBe("Pequeno");
    expect(porteLabel("pequeno", "en")).toBe("Small");
    expect(porteLabel("medio", "pt")).toBe("Médio");
    expect(porteLabel("grande", "en")).toBe("Large");
  });
});

describe("addDias / VALIDADE_DIAS", () => {
  it("adds days without mutating the input", () => {
    const base = new Date(2026, 6, 13); // 13 Jul 2026, local
    const out = addDias(base, VALIDADE_DIAS);
    expect(out.getFullYear()).toBe(2026);
    expect(out.getMonth()).toBe(6);
    expect(out.getDate()).toBe(20);
    expect(base.getDate()).toBe(13); // original untouched
  });

  it("rolls over month boundaries", () => {
    const out = addDias(new Date(2026, 6, 28), 7); // 28 Jul + 7 = 4 Aug
    expect(out.getMonth()).toBe(7);
    expect(out.getDate()).toBe(4);
  });

  it("VALIDADE_DIAS is 7", () => {
    expect(VALIDADE_DIAS).toBe(7);
  });
});

describe("formatData", () => {
  it("formats dd/mm/yyyy in pt and mm/dd/yyyy in en", () => {
    const d = new Date(2026, 6, 13); // 13 Jul 2026, local
    expect(formatData(d, "pt")).toBe("13/07/2026");
    expect(formatData(d, "en")).toBe("07/13/2026");
  });
});

describe("gerarNumeroProposta", () => {
  it("uses the FCOPTS-YYYYMMDD-XXXX shape for a given date", () => {
    const numero = gerarNumeroProposta(new Date(2026, 6, 13));
    expect(numero).toMatch(/^FCOPTS-20260713-[A-Z0-9]+$/);
  });

  it("varies the random suffix across calls", () => {
    const a = gerarNumeroProposta(new Date(2026, 6, 13));
    const b = gerarNumeroProposta(new Date(2026, 6, 13));
    // Same date prefix, different suffix (astronomically unlikely to collide).
    expect(a.slice(0, 16)).toBe(b.slice(0, 16));
  });
});

describe("lembreteWhatsappUrl", () => {
  it("builds a wa.me link carrying the encoded proposal number and name", () => {
    const url = lembreteWhatsappUrl({
      numero: "FCOPTS-20260713-AB12",
      tipo: "Sistema web",
      porte: "medio",
      nome: "Maria",
      contato: "maria@x.com",
      lang: "pt",
    });
    expect(url.startsWith("https://wa.me/5585981888896?text=")).toBe(true);
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("FCOPTS-20260713-AB12");
    expect(decoded).toContain("Maria");
  });
});

describe("copy blocks", () => {
  it("formasPagamento returns two localized lines", () => {
    expect(formasPagamento("pt")).toHaveLength(2);
    expect(formasPagamento("en")[0]).toContain("Pix");
  });

  it("clausulasLegais mentions the validity window", () => {
    expect(clausulasLegais("pt").some((c) => c.includes(String(VALIDADE_DIAS)))).toBe(true);
    expect(clausulasLegais("en").length).toBeGreaterThan(0);
  });

  it("docLabels switches language", () => {
    expect(docLabels("pt").documento).toBe("Proposta Comercial");
    expect(docLabels("en").documento).toBe("Commercial Proposal");
  });
});
