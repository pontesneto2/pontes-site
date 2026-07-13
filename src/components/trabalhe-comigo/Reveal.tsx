"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Atraso em segundos — use para escalonar (stagger) itens de uma lista/grid. */
  delay?: number;
  /** Deslocamento vertical inicial em px (padrão 24). */
  y?: number;
  /** Duração da transição em segundos (padrão 0.6). */
  duration?: number;
  /** Quanto do elemento precisa estar visível para disparar (0–1, padrão 0.2). */
  amount?: number;
  className?: string;
};

/**
 * Wrapper de entrada on-scroll: fade-in + slide-up suave, dispara uma única vez
 * quando entra na viewport. Respeita prefers-reduced-motion (aparece direto).
 * Use `delay` incremental para escalonar cards/itens e dar coerência à página.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  amount = 0.2,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
