import type { Metadata } from "next";
import BlogListClient from "@/components/blog/BlogListClient";
import { getAllPosts } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fcopts.com.br";

const title = "Blog";
const description =
  "Decisões de arquitetura, aprendizados, bastidores dos projetos em que trabalho e curiosidades sobre o mundo Dev/Tech, publicados também no LinkedIn.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BlogPage() {
  const posts = {
    pt: getAllPosts("pt"),
    en: getAllPosts("en"),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Francisco Pontes — Blog",
    url: `${siteUrl}/blog`,
    blogPost: posts.pt.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.date,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogListClient posts={posts} />
    </>
  );
}
