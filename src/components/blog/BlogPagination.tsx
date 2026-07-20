"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";

type AdjacentPost = { slug: string; title: string } | null;

export default function BlogPagination({
  previous,
  next,
}: {
  previous: AdjacentPost;
  next: AdjacentPost;
}) {
  const { lang } = useLanguage();

  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previous ? (
          <Link href={`/blog/${previous.slug}`} className="group flex flex-col">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <ArrowLeft className="h-3.5 w-3.5" />
              {tr(lang, { pt: "Matéria anterior", en: "Previous post" })}
            </span>
            <span className="mt-2 text-sm font-semibold text-white line-clamp-2 group-hover:text-violet-200 transition-colors">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={`/blog/${next.slug}`} className="group flex flex-col items-end text-right">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              {tr(lang, { pt: "Próxima matéria", en: "Next post" })}
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="mt-2 text-sm font-semibold text-white line-clamp-2 group-hover:text-violet-200 transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
