"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogCard from "@/components/blog/BlogCard";
import FloatingBlogIcons from "@/components/blog/FloatingBlogIcons";
import Typewriter from "@/components/blog/Typewriter";
import { useLanguage, tr } from "@/lib/language-context";
import type { BlogPostMeta } from "@/lib/blog";

export default function BlogListClient({ posts }: { posts: { pt: BlogPostMeta[]; en: BlogPostMeta[] } }) {
  const { lang } = useLanguage();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const list = lang === "pt" ? posts.pt : posts.en;

  const tags = useMemo(() => {
    const seen = new Set<string>();
    list.forEach((post) => post.tags.forEach((tag) => seen.add(tag)));
    return Array.from(seen);
  }, [list]);

  const filtered = activeTag ? list.filter((post) => post.tags.includes(activeTag)) : list;

  return (
    <div className="min-h-screen font-sans relative isolate">
      <div className="relative z-10">
        <SiteHeader />

        <section className="relative overflow-hidden pt-20 pb-10 md:pt-24 md:pb-12">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-indigo-950/15 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,rgba(124,58,237,0.15),transparent_70%)]" />
          <FloatingBlogIcons />

          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-mono text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]"
            >
              <Typewriter
                className="text-white"
                text={tr(lang, { pt: "Fique por dentro do meu Blog", en: "Stay up to date with my blog" })}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed"
            >
              {lang === "pt" ? (
                <>
                  Decisões de arquitetura, aprendizados, bastidores dos projetos em que trabalho e curiosidades sobre o mundo Dev/Tech
                  <br />
                  — publicados também no LinkedIn.
                </>
              ) : (
                <>
                  Architecture decisions, lessons learned, behind-the-scenes notes from the projects I work on, and curiosities from the Dev/Tech world
                  <br />
                  — also published on LinkedIn.
                </>
              )}
            </motion.p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pb-24">
          {tags.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeTag === null
                    ? "border-violet-500/40 bg-violet-500/15 text-violet-200"
                    : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                {tr(lang, { pt: "Todos", en: "All" })}
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    activeTag === tag
                      ? "border-violet-500/40 bg-violet-500/15 text-violet-200"
                      : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-16">
              {tr(lang, { pt: "Nenhuma matéria por aqui ainda.", en: "No posts here yet." })}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filtered.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.6) }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
