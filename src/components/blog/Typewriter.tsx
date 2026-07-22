"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 28,
  className,
  cursorAfterDone = true,
}: {
  text: string;
  speed?: number;
  className?: string;
  cursorAfterDone?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [text]);

  const done = count >= text.length;

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [count, done, speed]);

  return (
    <span className={`relative inline-block align-top ${className ?? ""}`}>
      <span className="sr-only">{text}</span>
      {/* Reserva o espaço final desde o início, para a animação não "crescer" o container */}
      <span aria-hidden="true" className="invisible">
        {text}
        {cursorAfterDone && "_"}
      </span>
      {/* Animação de máquina de escrever, sobreposta ao espaço já reservado acima */}
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        {(!done || cursorAfterDone) && (
          <span className={done ? "typewriter-cursor" : ""} style={{ color: "#e879f9" }}>
            _
          </span>
        )}
      </span>
    </span>
  );
}
