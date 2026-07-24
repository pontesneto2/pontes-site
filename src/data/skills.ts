import type { Bilingual } from "@/lib/language-context";

export type CoreStackItem = {
  slugs: string[];
  label: string;
  metric: Bilingual;
};

// Núcleo — o que uso todos os dias, com anos e escala reais (não estimados).
export const coreStack: CoreStackItem[] = [
  {
    slugs: ["typescript"],
    label: "TypeScript / React",
    metric: { pt: "6 anos · 14+ sistemas em produção", en: "6 years · 14+ systems in production" },
  },
  {
    slugs: ["nodedotjs"],
    label: "Node.js / Nest.js",
    metric: { pt: "5 anos · APIs de 25 mil+ usuários", en: "5 years · APIs serving 25k+ users" },
  },
  {
    slugs: ["react"],
    label: "React Native",
    metric: { pt: "5 anos · 5 apps nas lojas", en: "5 years · 5 apps in the stores" },
  },
  {
    slugs: ["dotnet", "csharp"],
    label: ".NET / C#",
    metric: { pt: "3 anos · sistemas críticos do setor público", en: "3 years · mission-critical public-sector systems" },
  },
];
