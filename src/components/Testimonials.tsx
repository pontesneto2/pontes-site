"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Linkedin, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import testimonials from "@/data/testimonials.json";
import SpotlightCard from "@/components/SpotlightCard";

type Testimonial = {
  name: string;
  role: string;
  photo?: string;
  text: Bilingual;
};

const RECOMMENDATIONS_URL = "https://www.linkedin.com/in/fcopts/details/recommendations/?detailScreenTabIndex=0";

function TestimonialContent({ item }: { item: Testimonial }) {
  const { lang } = useLanguage();
  const text = tr(lang, item.text);

  return (
    <div className="flex h-full flex-col justify-center">
      <p className="text-sm text-zinc-300 leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>

      <div className="mt-6 flex items-start gap-3">
        <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-white/10 flex items-center justify-center text-sm font-bold text-white shrink-0 overflow-hidden">
          {item.photo ? (
            <Image src={item.photo} alt={item.name} fill sizes="40px" className="object-cover" />
          ) : (
            item.name
              .split(" ")
              .slice(0, 2)
              .map((n) => n[0])
              .join("")
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-zinc-100 truncate">
              {item.name}
            </span>
            <Linkedin className="h-3.5 w-3.5 text-[#0A66C2] shrink-0" />
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

const LOOP_TRIGGER_PX = 60;
const LOOP_LOCK_MS = 600;

export default function Testimonials() {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(50);
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = testimonials as Testimonial[];
  const wheelAccumRef = useRef(0);
  const wheelResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const isLoopingRef = useRef(false);

  const updateScrollProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    setThumbWidth(Math.min(100, (el.clientWidth / el.scrollWidth) * 100));

    const firstCard = el.children[0] as HTMLElement | undefined;
    if (firstCard) {
      const gap = 24;
      const cardStep = firstCard.offsetWidth + gap;
      const index = Math.round(el.scrollLeft / cardStep);
      setCurrentIndex(Math.max(0, Math.min(items.length - 1, index)));
    }
  };

  const isAtEnd = () => {
    const el = scrollRef.current;
    if (!el) return false;
    const maxScroll = el.scrollWidth - el.clientWidth;
    return maxScroll > 0 && el.scrollLeft >= maxScroll - 2;
  };

  const loopToStart = () => {
    const el = scrollRef.current;
    if (!el || isLoopingRef.current) return;
    isLoopingRef.current = true;
    const prevOverflow = el.style.overflowX;
    el.style.overflowX = "hidden";
    el.scrollTo({ left: 0, behavior: "smooth" });
    window.setTimeout(() => {
      el.style.overflowX = prevOverflow;
      isLoopingRef.current = false;
    }, LOOP_LOCK_MS);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || e.deltaX <= 0 || !isAtEnd()) {
      wheelAccumRef.current = 0;
      return;
    }
    wheelAccumRef.current += e.deltaX;
    if (wheelResetTimerRef.current) clearTimeout(wheelResetTimerRef.current);
    wheelResetTimerRef.current = setTimeout(() => {
      wheelAccumRef.current = 0;
    }, 400);
    if (wheelAccumRef.current > LOOP_TRIGGER_PX) {
      wheelAccumRef.current = 0;
      loopToStart();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const delta = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (delta > 40 && isAtEnd()) {
      loopToStart();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="h-full min-w-0"
    >
      <SpotlightCard className="card-surface-2 relative flex h-full flex-col rounded-3xl backdrop-blur-xl p-6 md:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
        <Quote className="absolute top-6 right-6 h-8 w-8 text-fuchsia-400" />

        <div
          ref={scrollRef}
          onScroll={updateScrollProgress}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative flex flex-1 gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div key={item.name} className="snap-start shrink-0 w-full">
              <TestimonialContent item={item} />
            </div>
          ))}
        </div>

        <div className="relative mt-6">
          <div className="mx-auto h-1.5 w-full max-w-xs rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-[margin-left] duration-150"
              style={{
                width: `${thumbWidth}%`,
                marginLeft: `${scrollProgress * (100 - thumbWidth)}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <p
              className="text-lg font-semibold leading-none tabular-nums"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "#e879f9" }}
            >
              {currentIndex + 1}/{items.length}
            </p>
            <a
              href={RECOMMENDATIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={tr(lang, { pt: "Ver recomendação completa no LinkedIn", en: "View full recommendation on LinkedIn" })}
              aria-label={tr(lang, { pt: "Ver recomendação completa no LinkedIn", en: "View full recommendation on LinkedIn" })}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:text-[#4a9eea] transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
