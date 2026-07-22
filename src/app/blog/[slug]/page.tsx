import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient, { type BlogPostPayload } from "@/components/blog/BlogPostClient";
import { getAllSlugs, getAdjacentPosts, getRecentPosts, getPostContent, type BlogPostContent } from "@/lib/blog";
import { renderMarkdownToHtml } from "@/lib/mdx";
import type { Lang } from "@/lib/language-context";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fcopts.com.br";
const DEFAULT_OG_IMAGE = "/images/capa-img-link-public.png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

async function buildPayload(post: BlogPostContent | null, lang: Lang): Promise<BlogPostPayload | null> {
  if (!post) return null;
  const { previous, next } = getAdjacentPosts(post.slug, lang);
  return {
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    cover: post.cover,
    linkedin: post.linkedin,
    readingMinutes: post.readingMinutes,
    html: await renderMarkdownToHtml(post.content),
    previous: previous ? { slug: previous.slug, title: previous.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostContent(slug, "pt") ?? getPostContent(slug, "en");
  if (!post) return {};

  const ogImage = post.cover ?? DEFAULT_OG_IMAGE;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

function BlogPostingJsonLd({ post, slug }: { post: BlogPostContent; slug: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${siteUrl}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
    image: post.cover ? `${siteUrl}${post.cover}` : `${siteUrl}${DEFAULT_OG_IMAGE}`,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: "Francisco Pontes",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Francisco Pontes",
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({ post, slug }: { post: BlogPostContent; slug: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${slug}` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ptPost = getPostContent(slug, "pt");
  const enPost = getPostContent(slug, "en");

  if (!ptPost && !enPost) notFound();

  const [pt, en] = await Promise.all([buildPayload(ptPost, "pt"), buildPayload(enPost, "en")]);
  const recentPosts = {
    pt: getRecentPosts("pt", slug, 3),
    en: getRecentPosts("en", slug, 3),
  };
  const jsonLdPost = ptPost ?? enPost!;

  return (
    <>
      <BlogPostingJsonLd post={jsonLdPost} slug={slug} />
      <BreadcrumbJsonLd post={jsonLdPost} slug={slug} />
      <BlogPostClient pt={pt} en={en} recentPosts={recentPosts} />
    </>
  );
}
