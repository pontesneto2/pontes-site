"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** Glow sutil de accent que acompanha o cursor, só em telas com mouse (hover: hover). */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    const handleMove = (event: globalThis.MouseEvent) => {
      el.style.transform = `translate3d(${event.clientX - 220}px, ${event.clientY - 220}px, 0)`;
      el.style.opacity = "1";
    };
    const handleLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[440px] w-[440px] rounded-full opacity-0 transition-opacity duration-300 md:block"
      style={{
        background: "radial-gradient(closest-side, rgba(208,64,232,0.06), transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
