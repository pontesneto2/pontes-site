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
  const base = compact ? "px-2 py-1 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5"
    >
      {(["pt", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={`${base} rounded-md font-bold uppercase tracking-wide transition-colors ${
            lang === option
              ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
