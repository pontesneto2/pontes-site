"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion, type PanInfo } from "framer-motion";
import { spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import GithubStats from "@/components/GithubStats";
import SegmentedProgress from "@/components/SegmentedProgress";
import { SKILL_USAGE } from "@/lib/skill-context";

interface Skill {
  name: string;
  highlight?: boolean;
  // Arquivo em public/skills/<logo>.svg (gerado por scripts/generate-skill-logos.mjs).
  // Sem logo (conceitos como "REST APIs" ou "SEO"), a skill aparece como texto.
  logo?: string;
}

interface SkillCategory {
  index: string;
  title: Bilingual;
  skills: Skill[];
}

// core() = principal (destaque visual em cor); base() = padrão.
const core = (name: string, logo?: string): Skill => ({ name, highlight: true, logo });
const base = (name: string, logo?: string): Skill => ({ name, logo });

const CATEGORIES: SkillCategory[] = [
  {
    index: "01",
    title: { pt: "Frontend", en: "Frontend" },
    skills: [
      core("TypeScript", "typescript"),
      core("React Web", "react"),
      core("Next.js", "nextjs"),
      base("Vue.js", "vuejs"),
      core("React Native", "react"),
      base("Angular", "angular"),
      core("Tailwind CSS", "tailwindcss"),
    ],
  },
  {
    index: "02",
    title: { pt: "Backend", en: "Backend" },
    skills: [
      core("Node.js", "nodejs"),
      core("NestJS", "nestjs"),
      core("Express", "express"),
      core("Java (Spring Boot)", "spring"),
      core(".NET", "dotnet"),
      base("Python", "python"),
      base("PHP", "php"),
      base("GraphQL", "graphql"),
      core("REST APIs"),
      core("OpenAPI (Swagger)", "swagger"),
      core("JWT", "jwt"),
      base("OAuth 2.0", "oauth"),
      base("WordPress (spec)", "wordpress"),
    ],
  },
  {
    index: "03",
    title: { pt: "DevOps & Cloud", en: "DevOps & Cloud" },
    skills: [
      core("Docker", "docker"),
      core("Kubernetes", "kubernetes"),
      core("CI/CD"),
      core("GitHub Actions", "githubactions"),
      base("GitLab CI/CD", "gitlab"),
      base("AWS", "aws"),
      base("Azure", "azure"),
      base("Google Cloud", "googlecloud"),
      base("Nginx", "nginx"),
      core("Prometheus", "prometheus"),
      base("Grafana", "grafana"),
      base("Linux", "linux"),
      base("Terraform", "terraform"),
    ],
  },
  {
    index: "04",
    title: { pt: "Banco de Dados & ORMs", en: "Databases & ORMs" },
    skills: [
      core("PostgreSQL", "postgresql"),
      base("MySQL", "mysql"),
      base("MongoDB", "mongodb"),
      core("Redis", "redis"),
      base("SQL"),
      base("Prisma", "prisma"),
      base("TypeORM", "typeorm"),
      core("Sequelize", "sequelize"),
      base("MikroORM"),
      base("Entity Framework Core"),
    ],
  },
  {
    index: "05",
    title: { pt: "Testes & Qualidade", en: "Testing & Quality" },
    skills: [
      core("Selenium", "selenium"),
      core("Playwright", "playwright"),
      core("Cypress", "cypress"),
      base("Jest", "jest"),
      base("Testes E2E"),
      base("Testes de Integração"),
      base("Smoke Testing"),
      base("cURL", "curl"),
    ],
  },
  {
    index: "06",
    title: { pt: "Produto & UX", en: "Product & UX" },
    skills: [
      base("UX/UI"),
      base("Figma", "figma"),
      base("Design Systems"),
      base("Prototipagem"),
      base("Responsive Design"),
      base("Acessibilidade (WCAG)"),
      base("SEO"),
      base("VTEX", "vtex"),
    ],
  },
  {
    index: "07",
    title: { pt: "Ferramentas", en: "Tools" },
    skills: [
      base("Git", "git"),
      base("GitHub", "github"),
      base("Jira", "jira"),
      base("Trello", "trello"),
      base("Postman", "postman"),
      base("VS Code", "vscode"),
      base("IntelliJ IDEA", "intellij"),
      base("Eclipse", "eclipse"),
      base("Power BI", "powerbi"),
      base("DAX"),
    ],
  },
];

export const SKILL_NAMES = CATEGORIES.flatMap((cat) => cat.skills.map((s) => s.name));

function SkillLogo({ skill, t }: { skill: Skill & { logo: string }; t: (v: Bilingual) => string }) {
  const [hover, setHover] = useState(false);
  const usedIn = SKILL_USAGE[skill.name];

  return (
    <span
      tabIndex={0}
      className="relative inline-flex h-11 w-11 cursor-default items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:ring-1 focus-visible:ring-white/20"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Image
        src={`/skills/${skill.logo}.svg`}
        alt={skill.name}
        width={28}
        height={28}
        unoptimized
        // Só o slide ativo fica montado: com lazy, cada troca de slide piscava vazio.
        loading="eager"
        draggable={false}
        className={`h-7 w-7 object-contain transition-opacity duration-200 ${
          skill.highlight || hover ? "opacity-100" : "opacity-75"
        }`}
      />
      {hover && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[220px] -translate-x-1/2 whitespace-normal rounded-lg border border-white/10 bg-[#141418] px-2.5 py-1.5 text-center text-[13px] leading-snug text-zinc-300 shadow-xl shadow-black/40 font-[family-name:var(--font-space-grotesk)]"
        >
          <span className="block font-semibold text-zinc-100">{skill.name}</span>
          {usedIn && (
            <span className="block">
              <span className="text-fuchsia-300 font-semibold">
                {t({ pt: "Usado em: ", en: "Used in: " })}
              </span>
              {usedIn.join(", ")}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

function SkillName({ skill, t }: { skill: Skill; t: (v: Bilingual) => string }) {
  const [hover, setHover] = useState(false);
  const usedIn = SKILL_USAGE[skill.name];

  return (
    <span
      tabIndex={usedIn ? 0 : undefined}
      className={`relative inline-block cursor-default whitespace-nowrap outline-none transition-colors duration-200 ${
        skill.highlight
          ? "font-medium text-white hover:text-zinc-100 focus-visible:text-zinc-100"
          : "text-zinc-500 hover:text-zinc-300 focus-visible:text-zinc-300"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {skill.name}
      {usedIn && hover && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[220px] -translate-x-1/2 whitespace-normal rounded-lg border border-white/10 bg-[#141418] px-2.5 py-1.5 text-[13px] leading-snug text-zinc-300 shadow-xl shadow-black/40 font-[family-name:var(--font-space-grotesk)]"
        >
          <span className="text-fuchsia-300 font-semibold">
            {t({ pt: "Usado em: ", en: "Used in: " })}
          </span>
          {usedIn.join(", ")}
        </span>
      )}
    </span>
  );
}

function CategoryCard({ category, t }: { category: SkillCategory; t: (v: Bilingual) => string }) {
  const withLogo = category.skills.filter(hasLogo);
  const withoutLogo = category.skills.filter((skill) => !hasLogo(skill));

  return (
    <div className="flex h-full flex-col px-2 py-2">
      <div className="flex items-baseline gap-2 border-b border-white/10 pb-3">
        <span
          className="font-[family-name:var(--font-jetbrains-mono)]"
          style={{ fontWeight: 700, fontSize: "13px", color: "#a855f7" }}
        >
          {category.index}
        </span>
        <span
          className="font-[family-name:var(--font-space-grotesk)]"
          style={{ fontWeight: 600, fontSize: "18px", color: "#fafafa" }}
        >
          {t(category.title)}
        </span>
      </div>
      {withLogo.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
          {withLogo.map((skill) => (
            <SkillLogo key={skill.name} skill={skill} t={t} />
          ))}
        </div>
      )}
      {withoutLogo.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-6 md:gap-y-5 pt-5 text-center font-[family-name:var(--font-jetbrains-mono)] text-[15px] leading-none">
          {withoutLogo.map((skill, index) => (
            <span key={skill.name} className="inline-flex items-center gap-1.5">
              <SkillName skill={skill} t={t} />
              {index < withoutLogo.length - 1 && (
                <span className="select-none text-zinc-600">·</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const hasLogo = (skill: Skill): skill is Skill & { logo: string } => Boolean(skill.logo);

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

      {slides.length > 1 && (
        <div className="mt-10 sm:mt-6 mx-auto max-w-[180px] sm:max-w-none">
          <SegmentedProgress total={slides.length} current={page} />
        </div>
      )}

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
      <div className="mx-auto max-w-[1180px] px-6 xs:px-7 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="mb-12 md:mb-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
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

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="font-[family-name:var(--font-space-grotesk)] text-[12px] leading-relaxed md:max-w-[420px] md:text-right"
            style={{ color: "#8d8d99" }}
          >
            {t({
              pt: "O que eu uso todos os dias, o que já levei para produção e o que fica na caixa de ferramentas.",
              en: "What I use every day, what I've already shipped to production, and what stays in the toolbox.",
            })}
          </motion.p>
        </div>

        <SkillsCarousel slides={slides} cardsPerSlide={cardsPerSlide} t={t} />

        <div className="mt-12 md:mt-16">
          <GithubStats />
        </div>
      </div>
    </section>
  );
}
