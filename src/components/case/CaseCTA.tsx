"use client";

import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function CaseCTA() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto max-w-3xl px-6 pt-8 pb-24"
    >
      <div className="relative rounded-3xl overflow-hidden">
        {/* Fundo com glow sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.08] via-fuchsia-500/[0.05] to-transparent" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative border border-white/[0.07] rounded-3xl px-8 py-12 sm:px-12 sm:py-14 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Gostou? Fale comigo!
          </h3>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
            Se você busca desenvolver um produto digital estruturado, escalável
            e preparado para crescimento real, vamos conversar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:pontesneto2@gmail.com?subject=Contato%20via%20Portfolio"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35 hover:scale-[1.03] transition-all duration-300"
            >
              <Mail className="h-4 w-4" />
              Falar comigo
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-300 text-sm font-medium hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver outros projetos
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
