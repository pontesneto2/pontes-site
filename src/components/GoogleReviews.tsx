"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import SpotlightCard from "@/components/SpotlightCard";
import googleReviewsData from "@/data/google-reviews.json";

type GoogleReview = {
  name: string;
  photo?: string;
  rating: number;
  reviewerReviewCount?: number;
  text: Bilingual;
};

type GoogleReviewsData = {
  rating: number;
  reviewCount: number;
  profileUrl?: string;
  reviews: GoogleReview[];
};

const data = googleReviewsData as GoogleReviewsData;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function StarRow({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-transparent text-zinc-600"
          }`}
        />
      ))}
    </div>
  );
}

function RatingDistribution({ reviews }: { reviews: GoogleReview[] }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const max = Math.max(...counts.map((c) => c.count), 1);

  return (
    <div className="flex flex-col gap-1 w-full md:w-52">
      {counts.map(({ star, count }) => (
        <div key={star} className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="w-2.5 text-right tabular-nums">{star}</span>
          <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400/80"
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className="w-4 text-right tabular-nums">{count}</span>
        </div>
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const [index, setIndex] = useState(0);

  const total = data.reviews.length;
  if (total === 0) return null;

  const current = data.reviews[index];
  const initials = current.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  const goTo = (next: number) => setIndex(((next % total) + total) % total);

  return (
    <section id="google-reviews" className="relative py-10">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="text-[1.7rem] sm:text-[2rem] md:text-[2.4rem] font-black text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t({ pt: "Avaliações no Google", en: "Google Reviews" })}
          </motion.h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
            {t({
              pt: "Feedback verificado de clientes e parceiros, direto do Google Meu Negócio.",
              en: "Verified feedback from clients and partners, straight from Google Business Profile.",
            })}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <SpotlightCard className="card-surface-2 relative rounded-3xl backdrop-blur-xl p-5 md:p-7 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />

            {/* Resumo + distribuição de notas */}
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white shrink-0">
                  <FcGoogle className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-2xl font-black text-white tabular-nums"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {data.rating.toFixed(1)}
                    </span>
                    <StarRow rating={data.rating} size="h-3.5 w-3.5" />
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    {t({
                      pt: `${data.reviewCount} avaliações no Google`,
                      en: `${data.reviewCount} Google reviews`,
                    })}
                    {data.profileUrl && (
                      <>
                        {" · "}
                        <a
                          href={data.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-violet-300 hover:text-violet-200 transition-colors"
                        >
                          {t({ pt: "ver perfil", en: "view profile" })}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <RatingDistribution reviews={data.reviews} />
            </div>

            {/* Avaliação em destaque */}
            <div className="relative pt-5">
              <Quote className="absolute top-0 right-0 h-7 w-7 text-fuchsia-400/30" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <p className="max-w-2xl text-base sm:text-lg text-zinc-100 leading-snug font-medium">
                    &ldquo;{tr(lang, current.text)}&rdquo;
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 flex items-center justify-center text-xs font-bold text-white">
                      {current.photo ? (
                        <Image src={current.photo} alt={current.name} fill sizes="40px" className="object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-zinc-100 truncate">{current.name}</span>
                        <FcGoogle className="h-3.5 w-3.5 shrink-0" />
                      </div>
                      <div className="mt-0.5 flex items-center gap-2">
                        <StarRow rating={current.rating} size="h-3 w-3" />
                        {current.reviewerReviewCount != null && (
                          <span className="text-[11px] text-zinc-500">
                            {t({
                              pt: `${current.reviewerReviewCount} avaliações no Google`,
                              en: `${current.reviewerReviewCount} Google reviews`,
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navegação */}
            <div className="relative mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label={t({ pt: "Avaliação anterior", en: "Previous review" })}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:border-violet-400/40 hover:text-violet-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {data.reviews.map((review, i) => (
                  <button
                    key={review.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={t({ pt: `Ver avaliação de ${review.name}`, en: `View ${review.name}'s review` })}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-gradient-to-r from-violet-500 to-fuchsia-500" : "w-1.5 bg-white/15"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label={t({ pt: "Próxima avaliação", en: "Next review" })}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:border-violet-400/40 hover:text-violet-300 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
