import { defineConfig } from "vitest/config";

// Testes unitários da lógica de negócio (src/lib/proposta/*). Ambiente node: são
// funções puras / server-side, sem DOM. resolve.tsconfigPaths resolve o alias "@/...".
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.ts"],
  },
});
