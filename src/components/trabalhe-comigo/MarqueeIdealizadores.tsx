"use client";

import { useLanguage, tr } from "@/lib/language-context";

const IDEALIZADORES = [
  "Governo do Ceará",
  "Star Capital",
  "Fedex PT",
  "Sarrubbo Advogados",
  "Ematerce",
  "FlixBus Tickets UK",
  "Idace",
  "Instituto Agropolos",
  "Projeto São José IV",
  "Click Software House",
  "Com3 Brasil",
  "Meoocarro",
  "Movimenta Filmes",
  "Silva & Duarte Advogados",
  "Instituto Anjos Digitais",
  "Alfa Construções",
  "Hey Canada Imigration",
];

export default function MarqueeIdealizadores() {
  const { lang } = useLanguage();
  const items = [...IDEALIZADORES, ...IDEALIZADORES];

  return (
    <section className="border-t border-white/10 py-6">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {tr(lang, { pt: "Já entreguei projetos para", en: "I've already delivered projects for" })}
        </span>
      </div>
      <div
        className="tc-marquee overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div className="tc-marquee-track flex w-max items-center">
          {items.map((name, index) => (
            <span key={`${name}-${index}`} className="whitespace-nowrap px-2 font-display text-base font-semibold text-zinc-500 transition-colors hover:text-zinc-200" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {name}
              <span className="pl-4 text-violet-400/30" aria-hidden="true">
                •
              </span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .tc-marquee-track {
          animation: tc-marquee 34s linear infinite;
        }
        .tc-marquee:hover .tc-marquee-track {
          animation-play-state: paused;
        }
        @keyframes tc-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tc-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
