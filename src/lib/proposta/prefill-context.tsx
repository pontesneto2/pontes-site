"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Payload que a seção de Serviços injeta no gerador de proposta com IA.
 * A seleção de serviços faz o trabalho inicial — o usuário só refina e gera,
 * sem preencher a mesma coisa duas vezes.
 */
export type PropostaPrefill = {
  description: string;
  tipo: string;
  existente: string;
};

type PrefillRequest = { payload: PropostaPrefill; nonce: number };

type PropostaPrefillContextValue = {
  request: PrefillRequest | null;
  requestPrefill: (payload: PropostaPrefill) => void;
};

const PropostaPrefillContext = createContext<PropostaPrefillContextValue | null>(null);

export function PropostaPrefillProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<PrefillRequest | null>(null);

  const requestPrefill = useCallback((payload: PropostaPrefill) => {
    // nonce garante que o gerador reaplique o prefill mesmo se o conteúdo repetir.
    setRequest((prev) => ({ payload, nonce: (prev?.nonce ?? 0) + 1 }));
  }, []);

  const value = useMemo<PropostaPrefillContextValue>(
    () => ({ request, requestPrefill }),
    [request, requestPrefill]
  );

  return (
    <PropostaPrefillContext.Provider value={value}>{children}</PropostaPrefillContext.Provider>
  );
}

export function usePropostaPrefill() {
  const ctx = useContext(PropostaPrefillContext);
  if (!ctx) throw new Error("usePropostaPrefill must be used within PropostaPrefillProvider");
  return ctx;
}
