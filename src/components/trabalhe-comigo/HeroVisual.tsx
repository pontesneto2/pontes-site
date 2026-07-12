"use client";

import { Code2, LayoutGrid, Cpu, Boxes, Smartphone } from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]" aria-hidden="true">
      {/* brilho de fundo */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
        style={{
          background:
            "radial-gradient(45% 45% at 35% 40%, rgba(139,92,246,0.28), transparent 70%), radial-gradient(45% 45% at 70% 65%, rgba(217,70,239,0.20), transparent 70%)",
        }}
      />

      {/* ícones flutuando atrás */}
      <Code2 className="tc-hv-f1 absolute left-[4%] top-[8%] h-12 w-12 text-violet-400/10" />
      <LayoutGrid className="tc-hv-f2 absolute right-[6%] top-[4%] h-9 w-9 text-fuchsia-400/10" />
      <Smartphone className="tc-hv-f2 absolute left-[8%] bottom-[8%] h-10 w-10 text-violet-400/10" />
      <Cpu className="tc-hv-f1 absolute right-[3%] bottom-[18%] h-14 w-14 text-fuchsia-400/10" />
      <Boxes className="tc-hv-f2 absolute right-[30%] top-[2%] h-8 w-8 text-violet-400/10" />

      {/* dispositivos */}
      <svg
        viewBox="0 0 480 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block h-auto w-full overflow-visible"
        role="img"
        aria-label="Ilustração de sistema em laptop e aplicativo em celular"
      >
        <defs>
          <linearGradient id="tc-hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#d946ef" />
          </linearGradient>
          <radialGradient id="tc-hglow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.28" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="240" cy="215" rx="215" ry="165" fill="url(#tc-hglow)" />

        {/* laptop */}
        <g className="tc-fl1">
          <rect x="66" y="66" width="300" height="196" rx="14" fill="#14141b" stroke="rgba(255,255,255,0.10)" />
          <rect x="80" y="80" width="272" height="168" rx="8" fill="#0e0e14" />
          <circle cx="92" cy="92" r="3" fill="#3f3f46" />
          <circle cx="102" cy="92" r="3" fill="#3f3f46" />
          <circle cx="112" cy="92" r="3" fill="#3f3f46" />
          <rect x="80" y="104" width="56" height="144" fill="rgba(255,255,255,0.03)" />
          <rect x="90" y="118" width="36" height="6" rx="3" fill="rgba(255,255,255,0.14)" />
          <rect x="90" y="132" width="30" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
          <rect x="90" y="146" width="34" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
          <rect x="90" y="160" width="26" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
          <rect x="150" y="116" width="120" height="9" rx="4" fill="rgba(255,255,255,0.16)" />
          <rect x="150" y="132" width="80" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="150" y="150" width="90" height="42" rx="8" fill="url(#tc-hg)" opacity="0.92" />
          <rect x="248" y="150" width="94" height="42" rx="8" fill="rgba(255,255,255,0.05)" />
          <rect x="150" y="222" width="12" height="18" rx="3" fill="rgba(255,255,255,0.15)" />
          <rect x="168" y="212" width="12" height="28" rx="3" fill="rgba(255,255,255,0.15)" />
          <rect x="186" y="204" width="12" height="36" rx="3" fill="url(#tc-hg)" />
          <rect x="204" y="216" width="12" height="24" rx="3" fill="rgba(255,255,255,0.15)" />
          <rect x="222" y="198" width="12" height="42" rx="3" fill="url(#tc-hg)" />
          <rect x="240" y="208" width="12" height="32" rx="3" fill="rgba(255,255,255,0.15)" />
          <rect x="44" y="262" width="344" height="12" rx="4" fill="#1c1c24" />
        </g>

        {/* celular */}
        <g className="tc-fl2">
          <rect x="300" y="120" width="122" height="232" rx="24" fill="#14141b" stroke="url(#tc-hg)" strokeWidth="1.5" />
          <rect x="308" y="132" width="106" height="208" rx="16" fill="#0e0e14" />
          <rect x="346" y="126" width="30" height="6" rx="3" fill="#000000" />
          <rect x="320" y="146" width="82" height="10" rx="5" fill="url(#tc-hg)" />
          <circle cx="332" cy="180" r="11" fill="rgba(255,255,255,0.14)" />
          <rect x="350" y="172" width="52" height="6" rx="3" fill="rgba(255,255,255,0.16)" />
          <rect x="350" y="184" width="38" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="320" y="204" width="82" height="24" rx="7" fill="rgba(255,255,255,0.04)" />
          <rect x="320" y="234" width="82" height="24" rx="7" fill="rgba(255,255,255,0.04)" />
          <rect x="320" y="264" width="82" height="24" rx="7" fill="rgba(255,255,255,0.04)" />
          <rect x="320" y="304" width="82" height="26" rx="13" fill="url(#tc-hg)" />
          <rect x="348" y="314" width="26" height="6" rx="3" fill="rgba(255,255,255,0.85)" />
        </g>

        {/* chip: deploy ok */}
        <g className="tc-chip1">
          <rect x="20" y="88" width="106" height="34" rx="17" fill="#14141b" stroke="rgba(255,255,255,0.12)" />
          <circle cx="40" cy="105" r="7" fill="rgba(74,222,128,0.15)" />
          <path d="M36 105 l3 3 l6 -6" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="54" y="101" width="58" height="7" rx="3.5" fill="rgba(255,255,255,0.7)" />
        </g>

        {/* chip: código */}
        <g className="tc-chip2">
          <rect x="28" y="298" width="126" height="34" rx="17" fill="#14141b" stroke="rgba(255,255,255,0.12)" />
          <text x="44" y="320" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="13" fill="#c4b5fd">
            {"</>"}
          </text>
          <rect x="76" y="311" width="62" height="7" rx="3.5" fill="rgba(255,255,255,0.55)" />
        </g>
      </svg>

      <style>{`
        .tc-fl1 { animation: tc-hfa 6s ease-in-out infinite; }
        .tc-fl2 { animation: tc-hfb 7s ease-in-out infinite; }
        .tc-chip1 { animation: tc-hfc 5s ease-in-out infinite; }
        .tc-chip2 { animation: tc-hfd 5.6s ease-in-out infinite; }
        .tc-hv-f1 { animation: tc-hfc 8s ease-in-out infinite; }
        .tc-hv-f2 { animation: tc-hfd 9s ease-in-out infinite; }
        @keyframes tc-hfa { 50% { transform: translateY(-10px); } }
        @keyframes tc-hfb { 50% { transform: translateY(9px); } }
        @keyframes tc-hfc { 50% { transform: translateY(-8px); } }
        @keyframes tc-hfd { 50% { transform: translateY(8px); } }
        @media (prefers-reduced-motion: reduce) {
          .tc-fl1, .tc-fl2, .tc-chip1, .tc-chip2, .tc-hv-f1, .tc-hv-f2 { animation: none; }
        }
      `}</style>
    </div>
  );
}
