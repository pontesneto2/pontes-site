"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { spaceGrotesk, jetbrainsMono } from "@/lib/fonts";

type SkillItem = {
  name: string;
  slug?: string; // Simple Icons slug — omitted renders a text-only chip
};

type SkillCategory = {
  number: string;
  name: string;
  items: SkillItem[];
};

const CATEGORIES: SkillCategory[] = [
  {
    number: "01",
    name: "Frontend",
    items: [
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React Native", slug: "react" },
      { name: "Vue.js", slug: "vuedotjs" },
    ],
  },
  {
    number: "02",
    name: "Backend",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "C#", slug: "dotnet" },
      { name: ".NET", slug: "dotnet" },
      { name: "NestJS", slug: "nestjs" },
      { name: "Express", slug: "express" },
      { name: "PHP", slug: "php" },
      { name: "Laravel", slug: "laravel" },
      { name: "Python", slug: "python" },
      { name: "Spring", slug: "spring" },
      { name: "GraphQL", slug: "graphql" },
      { name: "WordPress", slug: "wordpress" },
    ],
  },
  {
    number: "03",
    name: "Bancos de Dados",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MySQL", slug: "mysql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Prisma", slug: "prisma" },
    ],
  },
  {
    number: "04",
    name: "Cloud, DevOps & Observabilidade",
    items: [
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      // amazonwebservices/microsoftazure slugs were removed from Simple Icons for brand reasons — text-only chips
      { name: "AWS" },
      { name: "Azure" },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "DigitalOcean", slug: "digitalocean" },
      { name: "GitLab CI/CD", slug: "gitlab" },
      { name: "Nginx", slug: "nginx" },
      { name: "Prometheus", slug: "prometheus" },
      { name: "Grafana", slug: "grafana" },
    ],
  },
];

export const SKILL_NAMES = CATEGORIES.flatMap((cat) => cat.items.map((item) => item.name));

const PRACTICES: SkillCategory = {
  number: "05",
  name: "Práticas & metodologias",
  items: [
    { name: "Docker Compose" },
    { name: "Scriptcase" },
    { name: "Figma" },
    { name: "Adobe XD" },
    { name: "Design Systems" },
    { name: "Prototipagem" },
    { name: "Usabilidade" },
    { name: "Acessibilidade" },
    { name: "LGPD" },
    { name: "Power BI" },
    { name: "Scrum/Kanban Ágil" },
    { name: "Trello" },
    { name: "Jira" },
  ],
};

const ALL_CATEGORIES = [...CATEGORIES, PRACTICES];

function SkillChip({ item, compact }: { item: SkillItem; compact?: boolean }) {
  const [active, setActive] = useState(false);

  return (
    <div
      role="img"
      aria-label={item.name}
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="inline-flex items-center gap-[9px] rounded-[9px] border outline-none transition-all duration-[220ms] ease-out"
      style={{
        padding: compact ? "6px 11px" : item.slug ? "9px 13px" : "9px 14px",
        borderColor: active
          ? "rgba(168,85,247,0.45)"
          : compact
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.08)",
        background: active ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.018)",
        color: active ? "#fafafa" : compact ? "#75758a" : "#9ca3af",
        transform: active ? "translateY(-2px)" : "translateY(0)",
        boxShadow: active ? "0 8px 20px -10px rgba(168,85,247,0.45)" : "none",
      }}
    >
      {item.slug && (
        <Image
          src={`https://cdn.simpleicons.org/${item.slug}`}
          alt=""
          width={20}
          height={20}
          unoptimized
          className="h-5 w-5 shrink-0 object-contain"
          style={{ filter: "brightness(0) invert(0.68)" }}
        />
      )}
      <span
        className="whitespace-nowrap font-[family-name:var(--font-jetbrains-mono)]"
        style={{
          fontWeight: 500,
          fontSize: compact ? "12px" : "13.5px",
          letterSpacing: "-0.01em",
          color: "inherit",
        }}
      >
        {item.name}
      </span>
    </div>
  );
}

export default function SkillsTools() {
  return (
    <section
      id="skills-tools"
      className={`relative overflow-x-hidden ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <div className="mx-auto max-w-[1180px] px-10 py-16 md:py-24">
        <div className="mb-16 text-center">
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

        {ALL_CATEGORIES.map((cat) => (
          <div
            key={cat.number}
            className="flex flex-col gap-4 py-[30px] md:flex-row md:items-start md:gap-12"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="md:w-[210px] md:flex-none">
              <div
                className="font-[family-name:var(--font-jetbrains-mono)]"
                style={{ fontWeight: 700, fontSize: "13px", color: "#a855f7" }}
              >
                {cat.number}
              </div>
              <div
                className="mt-1.5 font-[family-name:var(--font-space-grotesk)]"
                style={{ fontWeight: 600, fontSize: "19px", color: "#fafafa" }}
              >
                {cat.name}
              </div>
            </div>
            <div className="flex flex-1 flex-wrap gap-[10px]">
              {cat.items.map((item, index) => (
                <SkillChip
                  key={`${item.name}-${index}`}
                  item={item}
                  compact={cat.number === "05"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
