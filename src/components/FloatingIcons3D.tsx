"use client";

import { motion } from "framer-motion";
import { Cpu, Cloud, Smartphone } from "lucide-react";

export default function FloatingIcons3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-40">
      {/* CPU Icon - Top Left - MENOR */}
      <motion.div
        className="absolute left-[8%] top-[12%] w-[80px] h-[80px]"
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
            <Cpu className="w-10 h-10 text-purple-300" strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>

      {/* Cloud Icon - Top Right - MENOR */}
      <motion.div
        className="absolute right-[10%] top-[18%] w-[100px] h-[100px]"
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
            <Cloud className="w-14 h-14 text-violet-300" strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>

      {/* Smartphone Icon - Bottom Left - MENOR */}
      <motion.div
        className="absolute left-[12%] bottom-[15%] w-[70px] h-[70px]"
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
            <Smartphone className="w-9 h-9 text-fuchsia-300" strokeWidth={1.5} />
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
    </div>
  );
}

