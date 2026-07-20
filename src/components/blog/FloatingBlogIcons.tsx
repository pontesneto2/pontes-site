"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Rss, PenLine } from "lucide-react";

const floatingIcons = [
  { Icon: Newspaper, top: "12%", left: "6%", duration: 5.5, delay: 0 },
  { Icon: Rss, top: "16%", left: "90%", duration: 6.2, delay: 0.4 },
  { Icon: PenLine, top: "78%", left: "10%", duration: 5.8, delay: 0.8 },
];

export default function FloatingBlogIcons() {
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY ?? 0;
      const viewportHeight = window.innerHeight || 1;
      const ratio = Math.min(Math.max(scrollTop / viewportHeight, 0), 1);
      const start = 0.03;
      const end = 0.35;
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
              background: "rgba(168,85,247,.04)",
              border: "1px solid rgba(168,85,247,.08)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 0 20px rgba(168,85,247,.05)",
            }}
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{
              opacity: 1,
              y: [0, -22, 0, 16, 0],
              x: [0, 10 * dir, 0, -8 * dir, 0],
              rotate: [0, 8 * dir, 0, -6 * dir, 0],
              scale: [1, 1.08, 1, 0.96, 1],
            }}
            transition={{
              opacity: { duration: 0.6, delay: delay * 0.5 },
              default: { duration, delay, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Icon className="h-5 w-5" style={{ color: "rgba(210,200,240,.32)" }} />
          </motion.div>
        );
      })}
    </div>
  );
}
