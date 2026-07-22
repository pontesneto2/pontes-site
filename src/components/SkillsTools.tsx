"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { SKILL_ICON_PATHS, SKILL_ICON_VIEWBOX } from "./skills/icons.generated";
import GithubStats from "@/components/GithubStats";
import { SKILL_USAGE } from "@/lib/skill-context";

type SkillTier = "core" | "solid";
type SkillIcon = { kind: "svg"; slug: string } | { kind: "none" };

interface Skill {
  name: string;
  tier: SkillTier;
  icon: SkillIcon;
}

interface SkillCategory {
  index: string;
  title: Bilingual;
  skills: Skill[];
}

const svg = (slug: string): SkillIcon => ({ kind: "svg", slug });
const none: SkillIcon = { kind: "none" };

const CATEGORIES: SkillCategory[] = [
  {
    index: "01",
    title: { pt: "Frontend", en: "Frontend" },
    skills: [
      { name: "TypeScript", tier: "core", icon: svg("typescript") },
      { name: "React", tier: "core", icon: svg("react") },
      { name: "Next.js", tier: "core", icon: svg("nextdotjs") },
      { name: "Tailwind CSS", tier: "core", icon: svg("tailwindcss") },
      { name: "React Native", tier: "core", icon: svg("react") },
      { name: "Vue.js", tier: "core", icon: svg("vuedotjs") },
      { name: "JavaScript", tier: "solid", icon: svg("javascript") },
      { name: "Expo", tier: "solid", icon: svg("expo") },
      { name: "Bootstrap", tier: "solid", icon: svg("bootstrap") },
    ],
  },
  {
    index: "02",
    title: { pt: "Backend", en: "Backend" },
    skills: [
      { name: "Node.js", tier: "core", icon: svg("nodedotjs") },
      { name: "NestJS", tier: "core", icon: svg("nestjs") },
      { name: "Express", tier: "core", icon: svg("express") },
      { name: "Python", tier: "solid", icon: svg("python") },
      { name: "GraphQL", tier: "solid", icon: svg("graphql") },
      { name: "C#", tier: "solid", icon: svg("csharp") },
      { name: ".NET", tier: "solid", icon: svg("dotnet") },
      { name: "PHP", tier: "solid", icon: svg("php") },
      { name: "Laravel", tier: "solid", icon: svg("laravel") },
      { name: "Spring", tier: "solid", icon: svg("spring") },
      { name: "Java", tier: "solid", icon: svg("java") },
      { name: "Angular", tier: "solid", icon: svg("angular") },
      { name: "Symfony", tier: "solid", icon: svg("symfony") },
      { name: "Scriptcase", tier: "solid", icon: none },
      { name: "WordPress", tier: "solid", icon: svg("wordpress") },
    ],
  },
  {
    index: "03",
    title: { pt: "DevOps & Cloud", en: "DevOps & Cloud" },
    skills: [
      { name: "Docker", tier: "core", icon: svg("docker") },
      { name: "Git", tier: "core", icon: svg("git") },
      { name: "GitHub Actions", tier: "core", icon: svg("githubactions") },
      { name: "Docker Compose", tier: "core", icon: none },
      { name: "Kubernetes", tier: "core", icon: svg("kubernetes") },
      { name: "Prometheus", tier: "core", icon: svg("prometheus") },
      { name: "Grafana", tier: "core", icon: svg("grafana") },
      { name: "GitLab CI/CD", tier: "core", icon: svg("gitlab") },
      { name: "Vercel", tier: "solid", icon: svg("vercel") },
      { name: "GitHub", tier: "solid", icon: svg("github") },
      { name: "AWS", tier: "solid", icon: svg("aws") },
      { name: "Railway", tier: "solid", icon: svg("railway") },
      { name: "Linux", tier: "solid", icon: svg("linux") },
      { name: "Azure", tier: "solid", icon: svg("azure") },
      { name: "Google Cloud", tier: "solid", icon: svg("googlecloud") },
      { name: "DigitalOcean", tier: "solid", icon: svg("digitalocean") },
      { name: "Nginx", tier: "solid", icon: svg("nginx") },
    ],
  },
  {
    index: "04",
    title: { pt: "Dados", en: "Data" },
    skills: [
      { name: "PostgreSQL", tier: "core", icon: svg("postgresql") },
      { name: "Prisma", tier: "solid", icon: svg("prisma") },
      { name: "Redis", tier: "solid", icon: svg("redis") },
      { name: "Sequelize", tier: "solid", icon: svg("sequelize") },
      { name: "MySQL", tier: "solid", icon: svg("mysql") },
      { name: "MongoDB", tier: "solid", icon: svg("mongodb") },
      { name: "Power BI", tier: "solid", icon: svg("powerbi") },
    ],
  },
  {
    index: "05",
    title: { pt: "Testes & Qualidade", en: "Testing & Quality" },
    skills: [
      { name: "Jest", tier: "core", icon: svg("jest") },
      { name: "Playwright", tier: "core", icon: svg("playwright") },
      { name: "Cypress", tier: "core", icon: svg("cypress") },
      { name: "Testes E2E", tier: "core", icon: none },
      { name: "cURL", tier: "solid", icon: svg("curl") },
      { name: "Smoke Tests", tier: "solid", icon: none },
    ],
  },
  {
    index: "06",
    title: { pt: "Produto & Design", en: "Product & Design" },
    skills: [
      { name: "Design Systems", tier: "core", icon: none },
      { name: "Figma", tier: "solid", icon: svg("figma") },
      { name: "Adobe XD", tier: "solid", icon: svg("adobexd") },
      { name: "Prototipagem", tier: "solid", icon: none },
      { name: "Usabilidade", tier: "solid", icon: none },
      { name: "Acessibilidade (WCAG)", tier: "solid", icon: none },
    ],
  },
];

export const SKILL_NAMES = CATEGORIES.flatMap((cat) => cat.skills.map((s) => s.name));

const TIER_LABEL: Record<SkillTier, Bilingual> = {
  core: { pt: "Stack principal", en: "Core stack" },
  solid: { pt: "Experiência sólida", en: "Solid experience" },
};

const TIER_STYLE: Record<
  SkillTier,
  {
    fontSize: string;
    fontWeight: number;
    padding: string;
    paddingNoIcon: string;
    borderColor: string;
    borderColorActive: string;
    background: string;
    backgroundActive: string;
    color: string;
    iconSize: string;
    iconOpacity: number;
  }
> = {
  core: {
    fontSize: "11.5px",
    fontWeight: 600,
    padding: "6px 10px",
    paddingNoIcon: "6px 11px",
    borderColor: "rgba(168,85,247,0.32)",
    borderColorActive: "rgba(168,85,247,0.55)",
    background: "rgba(168,85,247,0.06)",
    backgroundActive: "rgba(168,85,247,0.11)",
    color: "#f1ecff",
    iconSize: "13px",
    iconOpacity: 1,
  },
  solid: {
    fontSize: "11px",
    fontWeight: 500,
    padding: "5px 9px",
    paddingNoIcon: "5px 10px",
    borderColor: "rgba(255,255,255,0.08)",
    borderColorActive: "rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.018)",
    backgroundActive: "rgba(255,255,255,0.04)",
    color: "#9ca3af",
    iconSize: "13px",
    iconOpacity: 0.75,
  },
};

function SkillIconSvg({
  slug,
  size,
  opacity,
}: {
  slug: string;
  size: string;
  opacity: number;
}) {
  const inner = SKILL_ICON_PATHS[slug];
  if (!inner) return null;
  return (
    <svg
      viewBox={SKILL_ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      style={{ width: size, height: size, opacity, flexShrink: 0, color: "currentColor" }}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

function SkillChip({ skill, t }: { skill: Skill; t: (v: Bilingual) => string }) {
  const [hover, setHover] = useState(false);
  const s = TIER_STYLE[skill.tier];
  const hasIcon = skill.icon.kind === "svg";
  const usedIn = SKILL_USAGE[skill.name];

  return (
    <div
      tabIndex={usedIn ? 0 : undefined}
      className="relative inline-flex items-center gap-[9px] rounded-[9px] border outline-none transition-all duration-[220ms] ease-out"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        padding: hasIcon ? s.padding : s.paddingNoIcon,
        borderColor: hover ? s.borderColorActive : s.borderColor,
        background: hover ? s.backgroundActive : s.background,
        color: s.color,
        transform: hover ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {skill.icon.kind === "svg" && (
        <SkillIconSvg slug={skill.icon.slug} size={s.iconSize} opacity={s.iconOpacity} />
      )}
      <span
        className="whitespace-nowrap font-[family-name:var(--font-jetbrains-mono)]"
        style={{
          fontWeight: s.fontWeight,
          fontSize: s.fontSize,
          letterSpacing: "-0.01em",
          color: "inherit",
        }}
      >
        {skill.name}
      </span>
      {usedIn && hover && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-white/10 bg-[#141418] px-2.5 py-1.5 text-[10px] leading-snug text-zinc-300 shadow-xl shadow-black/40"
        >
          <span className="text-fuchsia-300 font-semibold">
            {t({ pt: "Usado em: ", en: "Used in: " })}
          </span>
          {usedIn.join(", ")}
        </div>
      )}
    </div>
  );
}

function TierLegend({ t }: { t: (v: Bilingual) => string }) {
  const tiers: SkillTier[] = ["core", "solid"];
  return (
    <div className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
      {tiers.map((tier) => {
        const s = TIER_STYLE[tier];
        return (
          <span
            key={tier}
            className="inline-block rounded-[9px] border font-[family-name:var(--font-jetbrains-mono)]"
            style={{
              padding: s.paddingNoIcon,
              fontSize: s.fontSize,
              fontWeight: s.fontWeight,
              borderColor: s.borderColor,
              background: s.background,
              color: s.color,
              letterSpacing: "-0.01em",
            }}
          >
            {t(TIER_LABEL[tier])}
          </span>
        );
      })}
    </div>
  );
}

function CategoryCard({ category, t }: { category: SkillCategory; t: (v: Bilingual) => string }) {
  return (
    <div className="card-surface-2 flex h-full flex-col items-center gap-3 rounded-2xl px-6 py-6 text-center">
      <div>
        <span
          className="font-[family-name:var(--font-jetbrains-mono)]"
          style={{ fontWeight: 700, fontSize: "11px", color: "#a855f7" }}
        >
          {category.index}
        </span>
        <span
          className="ml-2 font-[family-name:var(--font-space-grotesk)]"
          style={{ fontWeight: 600, fontSize: "16px", color: "#fafafa" }}
        >
          {t(category.title)}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-[6px]">
        {category.skills.map((skill, index) => (
          <SkillChip key={`${skill.name}-${index}`} skill={skill} t={t} />
        ))}
      </div>
    </div>
  );
}

function SkillsSlide({
  categories,
  cardsPerSlide,
  t,
}: {
  categories: SkillCategory[];
  cardsPerSlide: number;
  t: (v: Bilingual) => string;
}) {
  const isPartial = categories.length < cardsPerSlide;

  if (isPartial) {
    return (
      <div className="flex justify-center px-1 py-1">
        {categories.map((cat) => (
          <div key={cat.index} className="w-full max-w-[560px]">
            <CategoryCard category={cat} t={t} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid items-stretch gap-4 px-1 py-1"
      style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0,1fr))` }}
    >
      {categories.map((cat) => (
        <CategoryCard key={cat.index} category={cat} t={t} />
      ))}
    </div>
  );
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-200 transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-white/[0.03]"
    >
      {direction === "prev" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </motion.button>
  );
}

function CarouselDots({
  count,
  current,
  onSelect,
  t,
}: {
  count: number;
  current: number;
  onSelect: (index: number) => void;
  t: (v: Bilingual) => string;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${t({ pt: "Ir para slide", en: "Go to slide" })} ${i + 1}`}
          aria-current={i === current ? "true" : undefined}
          onClick={() => onSelect(i)}
          className="p-1.5"
        >
          <motion.span
            layout
            animate={{ width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="block h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          />
        </button>
      ))}
    </div>
  );
}

function useCardsPerSlide(): 1 | 2 | 3 {
  const [cardsPerSlide, setCardsPerSlide] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqMd = window.matchMedia("(min-width: 768px)");
    const update = () => setCardsPerSlide(mqLg.matches ? 3 : mqMd.matches ? 2 : 1);
    update();
    mqLg.addEventListener("change", update);
    mqMd.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqMd.removeEventListener("change", update);
    };
  }, []);

  return cardsPerSlide;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
};

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

function SkillsCarousel({
  slides,
  cardsPerSlide,
  t,
}: {
  slides: SkillCategory[][];
  cardsPerSlide: number;
  t: (v: Bilingual) => string;
}) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [height, setHeight] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const measuredElRef = useRef<HTMLDivElement | null>(null);
  // Lazily created during the first render (not in an effect) so it already
  // exists by the time the first slide's ref attaches during commit — an
  // effect-created observer would miss that first attach, leaving the very
  // first slide's height unobserved until the next remount.
  const [resizeObserver] = useState<ResizeObserver | null>(() =>
    typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver((entries) => {
          const entry = entries[0];
          if (entry) setHeight(entry.contentRect.height);
        })
  );

  useEffect(() => () => resizeObserver?.disconnect(), [resizeObserver]);

  const attachMeasureRef = (node: HTMLDivElement | null) => {
    if (measuredElRef.current && resizeObserver) resizeObserver.unobserve(measuredElRef.current);
    measuredElRef.current = node;
    if (node) {
      setHeight(node.getBoundingClientRect().height);
      resizeObserver?.observe(node);
    }
  };

  useEffect(() => {
    setPage(([p]) => [Math.min(p, slides.length - 1), 0]);
  }, [slides.length]);

  const paginate = (newDirection: number) => {
    if (slides.length <= 1) return;
    setPage(([p]) => {
      const next = (p + newDirection + slides.length) % slides.length;
      return [next, newDirection];
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") paginate(-1);
    else if (e.key === "ArrowRight") paginate(1);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) paginate(1);
    else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) paginate(-1);
  };

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { x: { type: "spring" as const, stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } };
  const heightTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" as const };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t({ pt: "Carrossel de skills e ferramentas", en: "Skills and tools carousel" })}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none"
    >
      <motion.div
        className="relative overflow-hidden"
        animate={{ height }}
        transition={heightTransition}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            ref={attachMeasureRef}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.98, cursor: "grabbing" }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${page + 1}/${slides.length}`}
            className={prefersReducedMotion ? undefined : "cursor-grab"}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", touchAction: "pan-y" }}
          >
            <SkillsSlide categories={slides[page]} cardsPerSlide={cardsPerSlide} t={t} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <CarouselArrow
          direction="prev"
          onClick={() => paginate(-1)}
          disabled={slides.length <= 1}
          label={t({ pt: "Slide anterior", en: "Previous slide" })}
        />
        <CarouselDots
          count={slides.length}
          current={page}
          onSelect={(i) => setPage([i, i > page ? 1 : -1])}
          t={t}
        />
        <CarouselArrow
          direction="next"
          onClick={() => paginate(1)}
          disabled={slides.length <= 1}
          label={t({ pt: "Próximo slide", en: "Next slide" })}
        />
      </div>

      <span className="sr-only" aria-live="polite">
        {page + 1}/{slides.length}
      </span>
    </div>
  );
}

export default function SkillsTools() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const cardsPerSlide = useCardsPerSlide();
  const slides = useMemo(() => chunk(CATEGORIES, cardsPerSlide), [cardsPerSlide]);

  return (
    <section
      id="skills-tools"
      className={`relative overflow-x-hidden ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 py-16 md:py-24">
        <div className="mb-3 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[34px] sm:text-[40px] md:text-[52px] font-bold font-[family-name:var(--font-space-grotesk)]"
            style={{ letterSpacing: "-0.02em", color: "#fafafa" }}
          >
            Skills &amp; Tools
          </motion.h2>
        </div>

        <TierLegend t={t} />

        <SkillsCarousel slides={slides} cardsPerSlide={cardsPerSlide} t={t} />

        <div className="mt-12 md:mt-16">
          <GithubStats />
        </div>
      </div>
    </section>
  );
}
