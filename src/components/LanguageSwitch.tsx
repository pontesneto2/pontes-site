"use client";

export default function LanguageSwitch({
  lang,
  setLang,
  compact = false,
  size = "md",
}: {
  lang: "pt" | "en";
  setLang: (lang: "pt" | "en") => void;
  compact?: boolean;
  size?: "sm" | "md";
}) {
  const base =
    size === "sm" ? "px-1.5 py-0.5 text-[10px]" : compact ? "px-2.5 py-1.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-lg border p-0.5 ${
        size === "sm" ? "border-white/5 bg-black/15" : "border-white/10 bg-black/25"
      }`}
    >
      {(["pt", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={`${base} rounded-md font-bold uppercase tracking-wide transition-colors ${
            lang === option
              ? size === "sm"
                ? "bg-white/70 text-zinc-950"
                : "bg-white/90 text-zinc-950"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
