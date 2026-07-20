"use client";

import { tr, useLanguage } from "@/lib/language-context";
import BlogCardCompact from "@/components/blog/BlogCardCompact";
import type { BlogPostMeta } from "@/lib/blog";

export default function BlogRecentPosts({ posts }: { posts: BlogPostMeta[] }) {
  const { lang } = useLanguage();

  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 pb-24">
      <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300">
        {tr(lang, { pt: "Mais matérias recentes", en: "More recent posts" })}
      </h2>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCardCompact key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
