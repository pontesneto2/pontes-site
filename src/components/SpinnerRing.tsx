const SIZE_PX: Record<"sm" | "lg", number> = { sm: 40, lg: 56 };

/**
 * Anel de loading com gradiente rotativo (roxo -> fúcsia), estilo único
 * usado em todo o site: preloader de página cheia e fallback de rota.
 */
export default function SpinnerRing({ size = "lg" }: { size?: "sm" | "lg" }) {
  const px = SIZE_PX[size];
  return (
    <div
      role="status"
      aria-label="Carregando"
      className="relative motion-reduce:animate-none animate-spin"
      style={{
        width: px,
        height: px,
        borderRadius: "9999px",
        background: "conic-gradient(from 0deg, transparent 0deg, #8b5cf6 90deg, #d946ef 260deg, transparent 360deg)",
        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
        mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
        filter: "drop-shadow(0 0 10px rgba(139,92,246,0.45))",
        animationDuration: "0.9s",
      }}
    />
  );
}
