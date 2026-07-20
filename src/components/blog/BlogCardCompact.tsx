"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { BlogPostMeta } from "@/lib/blog";

export default function BlogCardCompact({ post }: { post: BlogPostMeta }) {
  const { lang } = useLanguage();
  const formattedDate = new Date(post.date).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] hover:border-violet-500/25 hover:bg-violet-500/[0.06] transition-all duration-300"
    >
      <div className="relative w-full aspect-[16/9] shrink-0 overflow-hidden border-b border-white/10 bg-white/[0.04]">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-zinc-500">
            <span className="text-xs font-medium">
              {lang === "pt" ? "Sem imagem a exibir" : "No image to display"}
            </span>
          </div>
        )}
      </div>

      <div className="flex h-full flex-col p-4">
        <span className="text-sm font-bold text-white tracking-tight line-clamp-2 group-hover:text-violet-200 transition-colors">
          {post.title}
        </span>
        <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </span>
      </div>
    </Link>
  );
}
