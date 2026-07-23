"use client";

export default function LanguageSwitch({
  lang,
  setLang,
  compact = false,
}: {
  lang: "pt" | "en";
  setLang: (lang: "pt" | "en") => void;
  compact?: boolean;
}) {
  const base = compact ? "px-2.5 py-1.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-xl border border-white/10 bg-black/25 p-0.5"
    >
      {(["pt", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={`${base} rounded-md font-bold uppercase tracking-wide transition-colors ${
            lang === option
              ? "bg-white/90 text-zinc-950"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
