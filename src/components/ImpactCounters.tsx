"use client";

import { motion } from "framer-motion";

type CounterItem = {
  label: string;
  value: string;
};

export default function ImpactCounters({
  className = "",
}: {
  className?: string;
}) {
  const items: CounterItem[] = [
    { value: "12.000+", label: "Horas de desenvolvimento" },
    { value: "5+", label: "Anos entregando produto" },
    { value: "50+", label: "Projetos no portfólio" },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.04,
            }}
            className="rounded-2xl bg-black/35 backdrop-blur-xl px-4 py-4 shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="text-[10px] uppercase tracking-wide text-zinc-500">
              {item.label}
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-violet-200 to-fuchsia-200">
                {item.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
