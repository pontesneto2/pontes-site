import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Substitui (não estende) o mapa de breakpoints padrão do Tailwind para inserir
    // `xs` ANTES de `sm`. Usar `extend.screens` apenas acrescentaria `xs` no fim do
    // objeto, quebrando a ordem de cascata mobile-first (o CSS de `xs` sairia depois
    // do de `sm` no bundle, podendo sobrepor `sm:`/`md:` indevidamente em telas largas).
    // Valores de sm/md/lg/xl/2xl são os defaults do Tailwind, só com `xs: 430px` novo.
    screens: {
      xs: "430px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        // Corpo em Space Grotesk (sans humanista), com a stack do sistema como
        // fallback — troca deliberada de JetBrains Mono para melhorar a
        // legibilidade de parágrafos longos. `font-mono` fica restrito a hero,
        // rótulos, métricas, números e trechos de código.
        sans: ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...defaultTheme.fontFamily.mono],
        display: ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        // Passo extra de largura de container para monitores muito grandes (Bloco 6),
        // usado como `2xl:max-w-8xl` — evita travar a coluna de conteúdo em max-w-7xl
        // (1280px) para sempre em telas acima de 1920px.
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};

export default config;
