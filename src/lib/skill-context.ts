// Cada `tags` abaixo espelha os tags reais dos projetos em src/app/page.tsx
// (featuredProjects), servindo só pra derivar em quais projetos publicados
// cada skill foi de fato usada — sem inventar anos/datas por tecnologia.
const PROJECTS: Array<{ name: string; tags: string[] }> = [
  { name: "SDA Ceará", tags: ["React Native", "PostgreSQL", ".NET", "C#", "PHP", "Docker", "Kubernetes", "Grafana", "Prometheus"] },
  { name: "Ucopiloto", tags: ["React Native", "TypeScript", "NextJS", "NodeJS", "ExpressJS", "NestJS", "PostgreSQL", "Prisma", "Docker"] },
  { name: "Sistema Escolar CPM", tags: ["PHP", "Laravel", "C#", ".NET", "Angular", "PostgreSQL", "Docker", "Git", "Jira", "Grafana"] },
  { name: "Fitvo", tags: ["React Native", "PostgreSQL", "NodeJS", "Docker"] },
  { name: "FEDAF", tags: ["Git", "Docker", "PHP", "Laravel", "Angular", "Scriptcase"] },
  { name: "iMidooh", tags: ["React Native", "TypeScript", "NextJS", "NodeJS", "ExpressJS", "NestJS", "PostgreSQL", "Prisma", "Docker"] },
  { name: "SECAF", tags: ["Git", "Docker", ".NET", "C#", "PHP"] },
  { name: "SIG Agropolos", tags: [".NET", "C#", "Angular", "MongoDB", "Docker", "Git", "TypeScript"] },
  { name: "IDACE", tags: ["Scriptcase", "PHP", "JS", "Java Spring Boot", "PostgreSQL", "Docker", "Git"] },
  { name: "SDA CE - Indicadores", tags: ["PHP", "Laravel", "PostgreSQL", "Docker", "Git"] },
  { name: "Projeto São José IV", tags: ["Git", "Docker", ".NET", "C#", "Angular", "Prometheus", "Grafana"] },
  { name: "ALPHA", tags: ["NodeJS", "ExpressJS", "Prisma", "PostgreSQL", "Docker", "Git", "TailwindCSS", "TypeScript"] },
  { name: "Instituto Anjos Digitais", tags: ["WordPress", "PHP", "JS", "Bootstrap", "Docker", "Git"] },
  { name: "Instituto Agropolos", tags: ["WordPress", "PHP", "Symfony", "Figma"] },
  { name: "UJVP CE", tags: ["WordPress", "PHP", "Docker", "Git"] },
  { name: "SDA CE - Site", tags: ["WordPress", "PHP"] },
  { name: "Silva & Duarte", tags: ["GitHub", "Git", "TypeScript", "JS", "TailwindCSS"] },
];

// Normaliza o rótulo do tag do projeto para o nome exibido em SkillsTools.
const TAG_TO_SKILL: Record<string, string[]> = {
  "React Native": ["React Native"],
  TypeScript: ["TypeScript"],
  NextJS: ["Next.js"],
  NodeJS: ["Node.js"],
  ExpressJS: ["Express"],
  NestJS: ["NestJS"],
  PostgreSQL: ["PostgreSQL"],
  Prisma: ["Prisma"],
  Docker: ["Docker"],
  ".NET": [".NET"],
  "C#": ["C#"],
  PHP: ["PHP"],
  Kubernetes: ["Kubernetes"],
  Grafana: ["Grafana"],
  Prometheus: ["Prometheus"],
  Laravel: ["Laravel"],
  Angular: ["Angular"],
  Git: ["Git"],
  Jira: ["Jira"],
  Scriptcase: ["Scriptcase"],
  MongoDB: ["MongoDB"],
  JS: ["JavaScript"],
  "Java Spring Boot": ["Spring", "Java"],
  TailwindCSS: ["Tailwind CSS"],
  WordPress: ["WordPress"],
  Bootstrap: ["Bootstrap"],
  Symfony: ["Symfony"],
  Figma: ["Figma"],
  GitHub: ["GitHub"],
};

function buildSkillUsage(): Record<string, string[]> {
  const usage: Record<string, string[]> = {};
  for (const project of PROJECTS) {
    for (const tag of project.tags) {
      const skillNames = TAG_TO_SKILL[tag];
      if (!skillNames) continue;
      for (const skillName of skillNames) {
        if (!usage[skillName]) usage[skillName] = [];
        if (usage[skillName].length < 3 && !usage[skillName].includes(project.name)) {
          usage[skillName].push(project.name);
        }
      }
    }
  }
  return usage;
}

/** Skill name -> até 3 projetos publicados onde ela foi usada de fato. */
export const SKILL_USAGE: Record<string, string[]> = buildSkillUsage();
