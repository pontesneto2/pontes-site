"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogHero from "@/components/blog/BlogHero";
import MdxContent from "@/components/blog/MdxContent";
import BlogLinkedInCTA from "@/components/blog/BlogLinkedInCTA";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogRecentPosts from "@/components/blog/BlogRecentPosts";
import { useLanguage, tr } from "@/lib/language-context";
import type { BlogPostMeta } from "@/lib/blog";

type AdjacentPost = { slug: string; title: string } | null;

export type BlogPostPayload = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  linkedin?: string;
  readingMinutes: number;
  html: string;
  previous: AdjacentPost;
  next: AdjacentPost;
};

export default function BlogPostClient({
  pt,
  en,
  recentPosts,
}: {
  pt: BlogPostPayload | null;
  en: BlogPostPayload | null;
  recentPosts: { pt: BlogPostMeta[]; en: BlogPostMeta[] };
}) {
  const { lang } = useLanguage();
  const post = (lang === "pt" ? pt : en) ?? pt ?? en;

  if (!post) return null;

  return (
    <div className="min-h-screen font-sans relative isolate">
      <div className="relative z-10">
        <SiteHeader />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {tr(lang, { pt: "Voltar para o blog", en: "Back to the blog" })}
          </Link>
        </div>

        <BlogHero
          title={post.title}
          description={post.description}
          date={post.date}
          tags={post.tags}
          readingMinutes={post.readingMinutes}
        />

        {post.cover && (
          <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        <article className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 pb-6">
          <MdxContent html={post.html} />

          {post.linkedin && <BlogLinkedInCTA href={post.linkedin} />}

          <BlogPagination previous={post.previous} next={post.next} />
        </article>

        <BlogRecentPosts posts={lang === "pt" ? recentPosts.pt : recentPosts.en} />

        <SiteFooter />
      </div>
    </div>
  );
}
