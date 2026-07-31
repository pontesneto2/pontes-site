import { coreStack } from "@/data/skills";
import type { Bilingual } from "@/lib/language-context";
import BrandIcon from "@/components/skills/BrandIcon";

export default function CoreStackRow({ t }: { t: (v: Bilingual) => string }) {
  return (
    <div
      className="mb-12 md:mb-14 mx-auto max-w-[900px] pr-4 md:pr-6 pb-5 md:pb-6"
      style={{
        borderRight: "1px solid rgba(255,255,255,.08)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className="whitespace-nowrap font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-normal uppercase tracking-[0.16em]"
          style={{ color: "#7d7d89" }}
        >
          {t({ pt: "NÚCLEO — DOMÍNIO DIÁRIO", en: "CORE — DAILY DOMAIN" })}
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: "rgba(255,255,255,.08)" }} />
      </div>

      <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-6 md:gap-y-4 xl:grid-cols-4 xl:gap-x-5">
        {coreStack.map((item) => (
          <div
            key={item.label}
            className={[
              "border-t border-[rgba(255,255,255,.08)] pt-2.5 first:border-t-0 first:pt-0",
              "transition-colors duration-150 motion-reduce:transition-none",
              "hover:border-purple-500",
              "text-center md:text-left",
              "md:border-t-0 md:border-l md:pl-4 md:pt-0",
              "md:[&:nth-child(odd)]:border-l-0 md:[&:nth-child(odd)]:pl-0",
              "xl:[&:nth-child(odd)]:border-l xl:[&:nth-child(odd)]:pl-4",
              "xl:first:border-l-0 xl:first:pl-0",
            ].join(" ")}
          >
            <div className="flex items-center justify-center gap-1.5 md:justify-start">
              <span className="flex items-center gap-1 shrink-0">
                {item.slugs.map((slug) => (
                  <BrandIcon
                    key={slug}
                    slug={slug}
                    className="h-3 w-3 shrink-0"
                    style={{ color: "#8d8d99", opacity: 0.85 }}
                  />
                ))}
              </span>
              <span
                className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] md:text-[13px] font-medium"
                style={{ color: "#f0f0f4" }}
              >
                {item.label}
              </span>
            </div>
            <div
              className="mt-1 font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[11px] font-light"
              style={{ color: "#7d7d89" }}
            >
              {t(item.metric)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
