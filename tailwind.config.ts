import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
    },
  },
  plugins: [],
};

export default config;
