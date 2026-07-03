"use client";

import { motion } from "framer-motion";
import { spaceGrotesk, jetbrainsMono } from "@/lib/fonts";

type SkillItem = {
  name: string;
  slug: string;
  years: number;
  principal?: boolean;
  mono?: boolean;
};

type SkillCategory = {
  number: string;
  name: string;
  items: SkillItem[];
};

// Anos são estimativas — ajuste para os valores reais quando quiser.
const CATEGORIES: SkillCategory[] = [
  {
    number: "01",
    name: "Frontend",
    items: [
      { name: "TypeScript", slug: "typescript/typescript-original", years: 5, principal: true },
      { name: "JavaScript", slug: "javascript/javascript-original", years: 6 },
      { name: "React", slug: "react/react-original", years: 5, principal: true },
      { name: "Next.js", slug: "nextjs/nextjs-original", years: 4, mono: true },
      { name: "React Native", slug: "react/react-original", years: 3 },
      { name: "Vue.js", slug: "vuejs/vuejs-original", years: 3 },
    ],
  },
  {
    number: "02",
    name: "Backend",
    items: [
      { name: "Node.js", slug: "nodejs/nodejs-original", years: 5, principal: true },
      { name: "C#", slug: "csharp/csharp-original", years: 5, principal: true },
      { name: ".NET", slug: "dot-net/dot-net-original", years: 5 },
      { name: "NestJS", slug: "nestjs/nestjs-original", years: 4 },
      { name: "Express", slug: "express/express-original", years: 4, mono: true },
      { name: "PHP", slug: "php/php-original", years: 4 },
      { name: "Laravel", slug: "laravel/laravel-original", years: 3 },
      { name: "Python", slug: "python/python-original", years: 4 },
      { name: "Spring Boot", slug: "spring/spring-original", years: 2 },
      { name: "GraphQL", slug: "graphql/graphql-plain", years: 3 },
      { name: "WordPress", slug: "wordpress/wordpress-plain", years: 4, mono: true },
    ],
  },
  {
    number: "03",
    name: "Bancos de Dados",
    items: [
      { name: "PostgreSQL", slug: "postgresql/postgresql-original", years: 5, principal: true },
      { name: "MySQL", slug: "mysql/mysql-original", years: 5 },
      { name: "MongoDB", slug: "mongodb/mongodb-original", years: 4 },
      { name: "Prisma", slug: "prisma/prisma-original", years: 3, mono: true },
    ],
  },
  {
    number: "04",
    name: "Cloud, DevOps & Observabilidade",
    items: [
      { name: "Docker", slug: "docker/docker-original", years: 5 },
      { name: "Kubernetes", slug: "kubernetes/kubernetes-plain", years: 3 },
      { name: "AWS", slug: "amazonwebservices/amazonwebservices-original-wordmark", years: 4, mono: true },
      { name: "Azure", slug: "azure/azure-original", years: 3 },
      { name: "GCP", slug: "googlecloud/googlecloud-original", years: 3 },
      { name: "DigitalOcean", slug: "digitalocean/digitalocean-original", years: 3 },
      { name: "GitHub Actions", slug: "githubactions/githubactions-original", years: 4 },
      { name: "GitLab CI", slug: "gitlab/gitlab-original", years: 4 },
      { name: "Nginx", slug: "nginx/nginx-original", years: 4 },
      { name: "Prometheus", slug: "prometheus/prometheus-original", years: 3 },
      { name: "Grafana", slug: "grafana/grafana-original", years: 3, principal: true },
    ],
  },
];

export const SKILL_NAMES = CATEGORIES.flatMap((cat) => cat.items.map((item) => item.name));

const PRACTICES = [
  "Docker Compose",
  "Scriptcase",
  "Figma",
  "Adobe XD",
  "Design Systems",
  "Prototipagem",
  "Usabilidade",
  "Acessibilidade",
  "LGPD",
  "Power BI",
  "Scrum/Kanban Ágil",
];

function SkillIcon({ item }: { item: SkillItem }) {
  return (
    <div className="group relative flex flex-col items-center focus-within:z-20">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.slug}.svg`}
          alt={item.name}
          width={40}
          height={40}
          tabIndex={0}
          className={`h-8 w-8 object-contain outline-none transition-transform duration-200 group-hover:-translate-y-[3px] group-hover:scale-[1.22] group-focus-within:-translate-y-[3px] group-focus-within:scale-[1.22] ${
            item.mono ? "invert" : ""
          }`}
        />
        {item.principal && (
          <span
            aria-hidden
            className="absolute -top-1 -right-1 h-[7px] w-[7px] rounded-full"
            style={{
              backgroundColor: "var(--ac)",
              boxShadow: "0 0 6px 1px var(--ac)",
            }}
          />
        )}
      </div>

      <div
        role="tooltip"
        className="pointer-events-none absolute top-[52px] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-[9px] border px-3 py-1.5 text-[11px] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ backgroundColor: "#141418", borderColor: "rgba(255,255,255,.11)" }}
      >
        <span style={{ color: "var(--ac)" }}>{item.name}</span>
        <span style={{ color: "#63636c" }}> · </span>
        <span
          className="font-[family-name:var(--font-jetbrains-mono)]"
          style={{ color: "var(--ac)" }}
        >
          {item.years} {item.years === 1 ? "ano" : "anos"}
        </span>
      </div>
    </div>
  );
}

export default function SkillsTools() {
  return (
    <section
      id="skills-tools"
      className={`relative py-24 overflow-x-hidden ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      style={{ ["--ac" as string]: "#a855f7" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[3.30rem] font-black text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Skills &amp; Tools
          </motion.h2>
        </div>

        {CATEGORIES.map((cat, catIndex) => (
          <div
            key={cat.number}
            className={`grid grid-cols-1 items-center gap-9 py-4 md:grid-cols-[230px_1fr] ${
              catIndex === 0 ? "" : "border-t"
            }`}
            style={{ borderColor: "rgba(255,255,255,.08)" }}
          >
            <div>
              <div
                className="font-[family-name:var(--font-jetbrains-mono)] text-sm"
                style={{ color: "var(--ac)" }}
              >
                {cat.number}
              </div>
              <div
                className="mt-1 text-base font-normal"
                style={{ color: "#a1a1aa", fontFamily: "var(--font-space-grotesk)" }}
              >
                {cat.name}
              </div>
            </div>
            <div className="flex flex-wrap gap-x-[30px] gap-y-[26px]">
              {cat.items.map((item, index) => (
                <SkillIcon key={`${item.name}-${index}`} item={item} />
              ))}
            </div>
          </div>
        ))}

        <div
          className="grid grid-cols-1 items-center gap-9 border-t py-4 md:grid-cols-[230px_1fr]"
          style={{ borderColor: "rgba(255,255,255,.08)" }}
        >
          <div>
            <div
              className="font-[family-name:var(--font-jetbrains-mono)] text-sm"
              style={{ color: "var(--ac)" }}
            >
              05
            </div>
            <div
              className="mt-1 text-base font-normal"
              style={{ color: "#a1a1aa", fontFamily: "var(--font-space-grotesk)" }}
            >
              Práticas &amp; metodologias
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRACTICES.map((p) => (
              <span
                key={p}
                className="flex items-center justify-center text-center rounded-full border font-[family-name:var(--font-jetbrains-mono)] text-[11px] px-3 py-1.5"
                style={{ borderColor: "rgba(255,255,255,.14)", color: "#c7c7cf" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
