import type { Metadata } from "next";
import BlogPage from "../../blog/page";

const title = "Blog";
const description =
  "Architecture decisions, lessons learned, behind-the-scenes of the projects I work on, and Dev/Tech curiosities — also published on LinkedIn.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/blog",
    languages: {
      "pt-BR": "/blog",
      en: "/en/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    type: "website",
    url: "/en/blog",
    title,
    description,
    locale: "en_US",
    alternateLocale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  // Posts don't have real English translations yet (lib/blog.ts falls back
  // to the Portuguese file when no en.mdx exists) — keep this route
  // reachable but out of the index until genuine EN content lands, so
  // Google doesn't see Portuguese text under an /en URL.
  robots: {
    index: false,
    follow: true,
  },
};

export default function EnBlogPage() {
  return <BlogPage />;
}
