"use client";

import { motion } from "framer-motion";
import { Cpu, Cloud, Smartphone, Database, Braces } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingIcons3D() {
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY ?? 0;
      const viewportHeight = window.innerHeight || 1;
      const ratio = Math.min(Math.max(scrollTop / viewportHeight, 0), 1);

      // Fade mais suave: começa após ~10% e termina por volta de ~70% do scroll da viewport
      const start = 0.1;
      const end = 0.7;
      const tRaw = (ratio - start) / Math.max(0.0001, end - start);
      const t = Math.min(Math.max(tRaw, 0), 1);
      const easeOut = 1 - Math.pow(1 - t, 2);
      setFadeOpacity(1 - easeOut);
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
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden opacity-60 transition-opacity duration-300 md:block"
      style={{ opacity: fadeOpacity }}
    >
      {/* CPU Icon - Top Left - MENOR */}
      <motion.div
        className="absolute left-[8%] top-[12%] w-[68px] h-[68px]"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/15 to-violet-500/15 rounded-2xl backdrop-blur-sm border border-purple-400/20 shadow-[0_0_30px_rgba(168,85,247,0.2)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="w-9 h-9 text-purple-300" strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>

      {/* Cloud Icon - Top Right - MENOR */}
      <motion.div
        className="absolute right-[10%] top-[18%] w-[84px] h-[84px]"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -8, 8, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-400/15 to-purple-500/15 rounded-3xl backdrop-blur-sm border border-violet-300/20 shadow-[0_0_40px_rgba(139,92,246,0.2)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cloud className="w-12 h-12 text-violet-300" strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>

      {/* Smartphone Icon - Bottom Left - MENOR */}
      <motion.div
        className="absolute left-[12%] bottom-[15%] w-[60px] h-[60px]"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, -10, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/15 to-purple-500/15 rounded-xl backdrop-blur-sm border border-fuchsia-300/20 shadow-[0_0_25px_rgba(217,70,239,0.2)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Smartphone
              className="w-8 h-8 text-fuchsia-300"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </motion.div>

      {/* Orbs decorativos - MAIS CLAROS */}
      <motion.div
        className="absolute right-[15%] bottom-[25%] w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/8 to-violet-400/8 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-[20%] top-[40%] w-40 h-40 rounded-full bg-gradient-to-br from-fuchsia-400/8 to-purple-400/8 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Database Icon - Meio Direita - DISCRETO */}
      <motion.div
        className="absolute right-[22%] top-[48%] w-[56px] h-[56px] opacity-90"
        animate={{ y: [0, -14, 0], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-400/10 to-fuchsia-500/10 rounded-2xl backdrop-blur-sm border border-white/10 shadow-[0_0_22px_rgba(168,85,247,0.12)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Database className="w-7 h-7 text-zinc-200/70" strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>

      {/* Braces Icon - Base Direita - DISCRETO */}
      <motion.div
        className="absolute right-[8%] bottom-[12%] w-[52px] h-[52px] opacity-90"
        animate={{ y: [0, 10, 0], rotate: [0, 8, -8, 0], x: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-white/6 to-transparent rounded-2xl backdrop-blur-sm border border-white/10 shadow-[0_0_18px_rgba(217,70,239,0.10)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Braces className="w-7 h-7 text-zinc-200/65" strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
