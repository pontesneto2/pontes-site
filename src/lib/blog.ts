import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import getReadingTime from "reading-time";
import type { Lang } from "@/lib/language-context";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  linkedin?: string;
  readingMinutes: number;
};

export type BlogPostContent = BlogPostMeta & { content: string };

function otherLang(lang: Lang): Lang {
  return lang === "pt" ? "en" : "pt";
}

function resolvePostFile(slug: string, lang: Lang): { file: string; lang: Lang } | null {
  const preferred = path.join(BLOG_DIR, slug, `${lang}.mdx`);
  if (fs.existsSync(preferred)) return { file: preferred, lang };
  const fallbackLang = otherLang(lang);
  const fallback = path.join(BLOG_DIR, slug, `${fallbackLang}.mdx`);
  if (fs.existsSync(fallback)) return { file: fallback, lang: fallbackLang };
  return null;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getPostContent(slug: string, lang: Lang): BlogPostContent | null {
  const resolved = resolvePostFile(slug, lang);
  if (!resolved) return null;
  const raw = fs.readFileSync(resolved.file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags ?? [],
    cover: data.cover,
    linkedin: data.linkedin,
    readingMinutes: Math.max(1, Math.round(getReadingTime(content).minutes)),
    content,
  };
}

export function getAllPosts(lang: Lang): BlogPostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostContent(slug, lang))
    .filter((post): post is BlogPostContent => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ slug, title, description, date, tags, cover, linkedin, readingMinutes }) => ({
      slug,
      title,
      description,
      date,
      tags,
      cover,
      linkedin,
      readingMinutes,
    }));
}

export function getAdjacentPosts(
  slug: string,
  lang: Lang
): { previous: BlogPostMeta | null; next: BlogPostMeta | null } {
  const posts = getAllPosts(lang);
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export function getRecentPosts(lang: Lang, excludeSlug: string, limit = 3): BlogPostMeta[] {
  return getAllPosts(lang)
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit);
}
