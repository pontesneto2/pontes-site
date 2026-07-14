"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";
import { SKILL_ICON_PATHS, SKILL_ICON_VIEWBOX } from "./skills/icons.generated";
import GithubStats from "@/components/GithubStats";

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
  {
    index: "07",
    title: { pt: "Processo & Colaboração", en: "Process & Collaboration" },
    skills: [
      { name: "Scrum / Kanban", tier: "solid", icon: none },
      { name: "Code Review", tier: "solid", icon: none },
      { name: "LGPD", tier: "solid", icon: none },
      { name: "Jira", tier: "solid", icon: svg("jira") },
      { name: "Trello", tier: "solid", icon: svg("trello") },
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

function SkillChip({ skill }: { skill: Skill }) {
  const [hover, setHover] = useState(false);
  const s = TIER_STYLE[skill.tier];
  const hasIcon = skill.icon.kind === "svg";

  return (
    <div
      className="inline-flex items-center gap-[9px] rounded-[9px] border outline-none transition-all duration-[220ms] ease-out"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
    </div>
  );
}

function TierLegend({ t }: { t: (v: Bilingual) => string }) {
  const tiers: SkillTier[] = ["core", "solid"];
  return (
    <div className="mb-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
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

export default function SkillsTools() {
  const { lang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);

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

        <style>{`
          .skills-grid-cell { position: relative; }
          .skills-grid-cell::before {
            content: "";
            position: absolute;
            top: 14%;
            bottom: 14%;
            left: 0;
            width: 1px;
            background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.09), transparent);
            display: none;
          }
          @media (min-width: 768px) {
            .skills-grid-cell:not(:nth-child(2n+1))::before { display: block; }
          }
          @media (min-width: 1024px) {
            .skills-grid-cell:not(:nth-child(2n+1))::before { display: none; }
            .skills-grid-cell:not(:nth-child(3n+1))::before { display: block; }
          }
        `}</style>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.index}
              className={`skills-grid-cell flex flex-col items-center gap-3 px-0 py-6 text-center md:px-8 ${
                i === CATEGORIES.length - 1 ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div>
                <span
                  className="font-[family-name:var(--font-jetbrains-mono)]"
                  style={{ fontWeight: 700, fontSize: "11px", color: "#a855f7" }}
                >
                  {cat.index}
                </span>
                <span
                  className="ml-2 font-[family-name:var(--font-space-grotesk)]"
                  style={{ fontWeight: 600, fontSize: "16px", color: "#fafafa" }}
                >
                  {t(cat.title)}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-[6px]">
                {cat.skills.map((skill, index) => (
                  <SkillChip key={`${skill.name}-${index}`} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <GithubStats />
        </div>
      </div>
    </section>
  );
}
