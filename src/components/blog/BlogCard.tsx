"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Typewriter from "@/components/blog/Typewriter";
import { useLanguage } from "@/lib/language-context";
import type { BlogPostMeta } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  const { lang } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const formattedDate = new Date(post.date).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.05] overflow-hidden hover:border-violet-500/25 hover:bg-violet-500/[0.06] transition-all duration-300"
    >
      <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden border-b border-white/10 bg-white/[0.04]">
        {post.cover ? (
          <>
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover saturate-[0.75] brightness-[0.85] group-hover:saturate-100 group-hover:brightness-100 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors duration-500" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-zinc-500">
            <span className="text-sm font-medium">
              {lang === "pt" ? "Sem imagem a exibir" : "No image to display"}
            </span>
            <span className="text-xs tracking-wide text-zinc-600">fcopts.com.br</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {post.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-2.5 py-0.5 text-[13px] font-medium uppercase tracking-wide text-violet-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Typewriter
          className="font-mono text-lg font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors"
          text={post.title}
          speed={14}
          cursorAfterDone={false}
        />

        <p className={`mt-2 text-sm text-zinc-400 leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
          {post.description}
        </p>

        {post.description.length > 110 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded((value) => !value);
            }}
            className="mt-1 mb-3 self-start text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
          >
            {expanded ? (lang === "pt" ? "Mostrar menos" : "Show less") : (lang === "pt" ? "Mostrar mais" : "Show more")}
          </button>
        )}

        <div className="mt-auto pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingMinutes} min {lang === "pt" ? "de leitura" : "read"}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-600 px-3 py-1 font-medium text-white group-hover:bg-violet-500 hover:bg-violet-400 hover:scale-105 transition-all">
            {lang === "pt" ? "Ler mais" : "Read more"}
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
