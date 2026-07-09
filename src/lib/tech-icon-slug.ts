// Mapa de nomes exibidos nos estudos de caso para os slugs reais em
// src/components/skills/icons.generated.ts (mesmo sistema usado no Skills & Tools).
const TECH_ICON_SLUGS: Record<string, string> = {
  "React Native": "react",
  React: "react",
  TypeScript: "typescript",
  JavaScript: "javascript",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  Express: "express",
  NestJS: "nestjs",
  PostgreSQL: "postgresql",
  Prisma: "prisma",
  Docker: "docker",
  "Tailwind CSS": "tailwindcss",
  Redis: "redis",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Figma: "figma",
};

export function getTechIconSlug(tag: string): string | undefined {
  return TECH_ICON_SLUGS[tag];
}
