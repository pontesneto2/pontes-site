"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Monitor, Terminal, Cpu, Braces, Database, GitBranch } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

const easeOut = [0.16, 1, 0.3, 1] as const;

const TYPED_NAME = "francisco\npontes";

function TypedName({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const done = count >= TYPED_NAME.length;

  useEffect(() => {
    if (done) {
      onDone();
      return;
    }
    const timer = setTimeout(() => setCount((c) => c + 1), 65);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, done]);

  const [line1, line2 = ""] = TYPED_NAME.slice(0, count).split("\n");
  const [fullLine1, fullLine2] = TYPED_NAME.split("\n");

  return (
    <span className="relative block">
      {/* Nome real no DOM para SEO/leitores de tela (renderizado no servidor) */}
      <span className="sr-only">{TYPED_NAME.replace("\n", " ")}</span>
      {/* Reserva a altura final (duas linhas) desde o início, para a animação não "crescer" o container */}
      <span aria-hidden="true" className="invisible block">
        {fullLine1}
        <br />
        {fullLine2}
      </span>
      {/* Animação de máquina de escrever, sobreposta ao espaço já reservado acima */}
      <span aria-hidden="true" className="absolute inset-0 block">
        {line1}
        <br />
        {line2}
        <span className={done ? "typewriter-cursor" : ""} style={{ color: "#e879f9" }}>
          _
        </span>
      </span>
    </span>
  );
}

type TypedSegment = { text: string; bold?: boolean; color?: string };

function TypedParagraph({ segments, start }: { segments: TypedSegment[]; start: boolean }) {
  const full = segments.map((s) => s.text).join("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || count >= full.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), 14);
    return () => clearTimeout(timer);
  }, [start, count, full.length]);

  let remaining = count;
  const nodes: React.ReactNode[] = [];

  segments.forEach((seg, i) => {
    if (remaining <= 0) return;
    if (seg.text === "\n") {
      nodes.push(<br key={i} />);
      remaining -= 1;
      return;
    }
    const take = Math.min(remaining, seg.text.length);
    const chunk = seg.text.slice(0, take);
    nodes.push(
      seg.bold ? (
        <b key={i} className="font-semibold" style={{ color: seg.color ?? "#ffffff" }}>
          {chunk}
        </b>
      ) : (
        <span key={i}>{chunk}</span>
      )
    );
    remaining -= take;
  });

  return (
    <span className="relative block">
      {/* Texto real no DOM para SEO/leitores de tela (renderizado no servidor) */}
      <span className="sr-only">{full}</span>
      {/* Reserva a altura final do texto desde o início, para a animação não "crescer" o container */}
      <span aria-hidden="true" className="invisible block">
        {segments.map((seg, i) =>
          seg.text === "\n" ? (
            <br key={i} />
          ) : seg.bold ? (
            <b key={i} className="font-semibold">
              {seg.text}
            </b>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </span>
      {/* Animação de máquina de escrever, sobreposta ao espaço já reservado acima */}
      <span aria-hidden="true" className="absolute inset-0 block">
        {nodes}
      </span>
    </span>
  );
}

const floatingIcons = [
  { Icon: Code2, top: "10%", left: "5%", duration: 5.5, delay: 0 },
  { Icon: Terminal, top: "76%", left: "9%", duration: 6.5, delay: 0.6 },
  { Icon: Monitor, top: "8%", left: "60%", duration: 6, delay: 0.3 },
  { Icon: Cpu, top: "86%", left: "62%", duration: 5, delay: 0.9 },
  { Icon: Braces, top: "34%", left: "3%", duration: 5.8, delay: 1.2 },
  { Icon: Database, top: "50%", left: "58%", duration: 6.2, delay: 0.4 },
  { Icon: GitBranch, top: "18%", left: "38%", duration: 5.2, delay: 0.8 },
];

function FloatingTechIcons() {
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY ?? 0;
      const viewportHeight = window.innerHeight || 1;
      const ratio = Math.min(Math.max(scrollTop / viewportHeight, 0), 1);
      const start = 0.05;
      const end = 0.45;
      const tRaw = (ratio - start) / Math.max(0.0001, end - start);
      const t = Math.min(Math.max(tRaw, 0), 1);
      setFadeOpacity(1 - (1 - Math.pow(1 - t, 2)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
      style={{ opacity: fadeOpacity, transition: "opacity 0.2s linear" }}
    >
      {floatingIcons.map(({ Icon, top, left, duration, delay }, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        return (
        <motion.div
          key={i}
          className="absolute flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            top,
            left,
            background: "rgba(168,85,247,.03)",
            border: "1px solid rgba(168,85,247,.07)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 0 20px rgba(168,85,247,.04)",
          }}
          animate={{
            y: [0, -22, 0, 16, 0],
            x: [0, 10 * dir, 0, -8 * dir, 0],
            rotate: [0, 8 * dir, 0, -6 * dir, 0],
            scale: [1, 1.08, 1, 0.96, 1],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className="h-5 w-5" style={{ color: "rgba(210,200,240,.28)" }} />
        </motion.div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const [nameDone, setNameDone] = useState(false);

  const descriptionSegments: TypedSegment[] =
    lang === "pt"
      ? [
          { text: "Engenheiro de software em " },
          { text: "Fortaleza, Brasil", bold: true },
          { text: "." },
          { text: "\n" },
          { text: "Uso código e engenharia para dar vida a " },
          { text: "novas ideias", bold: true, color: "#c4a6f7" },
          { text: "." },
        ]
      : [
          { text: "Software engineer based in " },
          { text: "Fortaleza, Brazil", bold: true },
          { text: "." },
          { text: "\n" },
          { text: "I use code and engineering to bring " },
          { text: "new ideas", bold: true, color: "#c4a6f7" },
          { text: " to life." },
        ];

  return (
    <section
      className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row lg:items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(135% 130% at 50% 0%, #141019 0%, #0c0b0f 52%, #08070a 100%)",
      }}
    >
      {/* Glow — celular/tablet: centralizado embaixo */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 lg:hidden"
        style={{
          width: "min(120vw, 1100px)",
          height: "min(85vh, 800px)",
          background:
            "radial-gradient(58% 60% at 50% 100%, rgba(102,60,132,.28), rgba(80,44,116,.17) 45%, rgba(52,26,90,.07) 66%, transparent 78%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 lg:hidden"
        style={{
          width: "min(95vw, 850px)",
          height: "min(70vh, 650px)",
          background:
            "radial-gradient(70% 75% at 50% 100%, rgba(255,255,255,.03), transparent 70%)",
        }}
      />

      {/* Glow — tablet largo/desktop: atrás do retrato à direita */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block"
        style={{
          width: "min(55vw, 820px)",
          background:
            "radial-gradient(58% 60% at 62% 44%, rgba(50,26,72,.30), rgba(38,19,58,.20) 45%, rgba(22,10,38,.09) 66%, transparent 78%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block"
        style={{
          width: "min(44vw, 680px)",
          background:
            "radial-gradient(70% 75% at 60% 50%, rgba(255,255,255,.03), transparent 70%)",
        }}
      />

      <FloatingTechIcons />

      <div className="magenta-glow relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Conteúdo de texto — alinhado à esquerda em todas as larguras; desktop centraliza na vertical */}
        <div className="w-full pt-24 sm:pt-28 lg:pt-0 lg:max-w-[560px] text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs"
            style={{
              border: "1px solid rgba(158,232,200,.3)",
              background: "rgba(158,232,200,.06)",
              color: "#9fe8c8",
              fontFamily: "var(--font-jetbrains-mono)",
              fontWeight: 400,
            }}
          >
            <span className="relative flex h-[7px] w-[7px] shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-green-400" />
            </span>
            Open to Work
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: easeOut }}
            className="mt-5 text-base sm:text-lg"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              letterSpacing: "0.04em",
              color: "#a78bfa",
              fontWeight: 300,
            }}
          >
            {t({ pt: "Olá, meu nome é", en: "Hi, my name is" })}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: easeOut }}
            className="mt-3 whitespace-normal lowercase"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontWeight: 800,
              fontSize: "clamp(4rem, 7vw + 1rem, 6.5rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.045em",
              color: "#ffffff",
            }}
          >
            <TypedName onDone={() => setNameDone(true)} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: easeOut }}
            className="mt-6 max-w-[490px] text-lg leading-relaxed"
            style={{ color: "#a9a6b4", fontFamily: "var(--font-space-grotesk)" }}
          >
            <TypedParagraph segments={descriptionSegments} start={nameDone} />
          </motion.p>
        </div>
      </div>

      {/* Retrato — celular/tablet: abaixo do texto, rente à borda inferior, dentro do fluxo; desktop (lg+): grande, à direita, ocupando a altura inteira da seção */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
        className="relative z-10 mt-6 lg:mt-0 flex-1 lg:flex-none min-h-[260px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[min(46vw,640px)]"
      >
        <div className="absolute inset-0 mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:mx-0 lg:max-w-none">
          <Image
            src="/images/background-banner-site.png"
            alt="Francisco Pontes"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 640px"
            style={{
              objectFit: "contain",
              objectPosition: "bottom",
              filter:
                "contrast(1.04) brightness(1.08) saturate(1.02) drop-shadow(0 24px 50px rgba(120,60,190,.35))",
            }}
          />
        </div>
      </motion.div>

      {/* Indicador de scroll — fixo no centro inferior do banner */}
      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 hidden sm:inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
        aria-label={t({ pt: "Role para explorar", en: "Scroll to explore" })}
      >
        {t({ pt: "Role para explorar", en: "Scroll to explore" })}
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M12 5v14M19 12l-7 7-7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.a>
    </section>
  );
}
