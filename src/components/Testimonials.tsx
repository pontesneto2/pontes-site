"use client";

import { Linkedin, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage, tr } from "@/lib/language-context";
import testimonials from "@/data/testimonials.json";

export default function Testimonials() {
  const { lang } = useLanguage();

  return (
    <section id="testimonials" className="relative py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
              {tr(lang, { pt: "Recomendações", en: "Recommendations" })}
            </span>
          </h2>
          <p className="text-sm text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            {tr(lang, {
              pt: "O que colegas e parceiros de trabalho dizem, direto do LinkedIn.",
              en: "What colleagues and work partners say, straight from LinkedIn.",
            })}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
              className="relative rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-6 md:p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
              <Quote className="absolute top-6 right-6 h-8 w-8 text-violet-500/15" />

              <div className="relative">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  &ldquo;{tr(lang, item.text)}&rdquo;
                </p>

                <div className="mt-6 flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-white/10 flex items-center justify-center text-sm font-bold text-white shrink-0">
                    {item.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-zinc-100 truncate">
                        {item.name}
                      </span>
                      <Linkedin className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                      {item.role}
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      {tr(lang, item.context)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
