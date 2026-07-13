"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

export default function SectionHeading({ title, kicker }: { title: Bilingual; kicker: Bilingual }) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const full = tr(lang, title);
  const [count, setCount] = useState(0);
  const done = count >= full.length;

  useEffect(() => {
    setCount(0);
  }, [lang]);

  useEffect(() => {
    if (!inView || done) return;
    const timer = setTimeout(() => setCount((c) => c + 1), 85);
    return () => clearTimeout(timer);
  }, [inView, count, done]);

  return (
    <div className="mb-12 text-center">
      <h2
        ref={ref}
        className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {full.slice(0, count)}
        <span className={done ? "typewriter-cursor" : ""} style={{ color: "#fb923c" }}>
          _
        </span>
      </h2>
      <p className="mt-2.5 font-mono text-[10px] font-light uppercase tracking-[0.2em] text-zinc-500">
        {tr(lang, kicker)}
      </p>
    </div>
  );
}
