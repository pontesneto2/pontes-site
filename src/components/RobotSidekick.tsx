"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import RobotBuddy from "@/components/RobotBuddy";

export default function RobotSidekick() {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.28, 0.72, 0.82, 1],
    [0, 0, 1, 1, 0, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [18, 0, -6, 0, 18],
  );

  return (
    <motion.div
      aria-hidden
      style={{ opacity, y }}
      className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
    >
      <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-[0_16px_60px_rgba(0,0,0,0.35)] p-3">
        <RobotBuddy size={140} showBackdrop={false} showParticles={false} />
      </div>
    </motion.div>
  );
}
