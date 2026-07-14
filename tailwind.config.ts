import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Corpo permanece na stack do sistema (globals.css). Aqui só ligamos as
        // fontes carregadas em src/lib/fonts.ts onde elas são explicitamente pedidas:
        // `font-mono` passa a renderizar em JetBrains Mono e `font-display` fica
        // disponível para títulos em Space Grotesk.
        mono: ["var(--font-jetbrains-mono)", ...defaultTheme.fontFamily.mono],
        display: ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
