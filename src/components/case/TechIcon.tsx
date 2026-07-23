"use client";

import { Code } from "lucide-react";
import { SKILL_ICON_PATHS, SKILL_ICON_VIEWBOX } from "@/components/skills/icons.generated";
import { getTechIconSlug } from "@/lib/tech-icon-slug";

export default function TechIcon({ tag }: { tag: string }) {
  const slug = getTechIconSlug(tag);
  const path = slug ? SKILL_ICON_PATHS[slug] : undefined;

  return (
    <div className="group relative">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-white hover:bg-white/[0.06]">
        {path ? (
          <svg
            viewBox={SKILL_ICON_VIEWBOX}
            aria-hidden="true"
            focusable="false"
            className="h-5 w-5"
            style={{ color: "currentColor" }}
            dangerouslySetInnerHTML={{ __html: path }}
          />
        ) : (
          <Code className="h-5 w-5" aria-hidden="true" />
        )}
      </div>
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-1 text-[13px] text-zinc-200 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
      >
        {tag}
      </span>
      <span className="sr-only">{tag}</span>
    </div>
  );
}
