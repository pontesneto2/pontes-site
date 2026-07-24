import type { CSSProperties } from "react";
import { SKILL_ICON_PATHS, SKILL_ICON_VIEWBOX } from "@/components/skills/icons.generated";

export default function BrandIcon({
  slug,
  className,
  style,
}: {
  slug: string;
  className?: string;
  style?: CSSProperties;
}) {
  const path = SKILL_ICON_PATHS[slug];
  if (!path) return null;

  return (
    <svg
      viewBox={SKILL_ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}
