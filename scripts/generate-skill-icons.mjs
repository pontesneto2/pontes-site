import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as simpleIcons from "simple-icons";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manualDir = path.join(__dirname, "icons-manual");
const outFile = path.join(__dirname, "..", "src", "components", "skills", "icons.generated.ts");

const UNIFORM_VIEWBOX = "0 0 24 24";

// slug -> simple-icons export key, e.g. "nextdotjs" -> "siNextdotjs"
function toExportKey(slug) {
  return "si" + slug.charAt(0).toUpperCase() + slug.slice(1);
}

const SIMPLE_ICON_SLUGS = [
  "typescript", "react", "nextdotjs", "tailwindcss", "javascript", "expo", "vuedotjs",
  "nodedotjs", "nestjs", "express", "python", "graphql", "dotnet", "php", "laravel", "spring",
  "postgresql", "prisma", "redis", "sequelize", "mysql", "mongodb",
  "docker", "githubactions", "vercel", "railway", "linux", "kubernetes", "prometheus",
  "grafana", "gitlab", "googlecloud", "digitalocean", "nginx",
  "jest", "cypress", "curl",
  "figma",
  "jira", "trello",
  "angular", "git", "github", "bootstrap", "symfony",
  "wordpress",
];

// Ausentes no simple-icons (verificado manualmente): csharp, powerbi, playwright, java, adobexd.
// aws e azure foram removidos do pacote por marca. Resolvidos como SVG manual,
// achatados para currentColor em scripts/icons-manual/.
const MANUAL_SLUGS = ["aws", "azure", "csharp", "playwright", "powerbi", "java", "adobexd"];

const paths = {};
const failed = [];
const colorViolations = [];

for (const slug of SIMPLE_ICON_SLUGS) {
  const icon = simpleIcons[toExportKey(slug)];
  if (!icon || !icon.path) {
    failed.push(slug);
    continue;
  }
  paths[slug] = `<path fill="currentColor" d="${icon.path}" />`;
}

const FORBIDDEN_COLOR_PATTERNS = [
  /fill="(?!currentColor")[^"]*"/i,
  /stroke="(?!none")(?!currentColor")[^"]*"/i,
  /stop-color/i,
  /<defs/i,
  /<style/i,
  /class="/i,
  /url\(#/i,
];

for (const slug of MANUAL_SLUGS) {
  const file = path.join(manualDir, `${slug}.svg`);
  let raw;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    failed.push(slug);
    continue;
  }

  const violation = FORBIDDEN_COLOR_PATTERNS.find((re) => re.test(raw));
  if (violation) {
    colorViolations.push({ slug, pattern: violation.toString() });
    continue;
  }

  const openTagEnd = raw.indexOf(">");
  const closeTagStart = raw.lastIndexOf("</svg>");
  if (openTagEnd === -1 || closeTagStart === -1) {
    failed.push(slug);
    continue;
  }
  paths[slug] = raw.slice(openTagEnd + 1, closeTagStart).trim();
}

if (colorViolations.length > 0) {
  console.error(
    "SVGs manuais com cor hardcoded (abortando, nada foi escrito):",
    colorViolations.map((v) => `${v.slug} (${v.pattern})`).join(", ")
  );
  process.exit(1);
}

if (failed.length > 0) {
  console.error("Slugs ausentes (abortando, nada foi escrito):", failed.join(", "));
  process.exit(1);
}

const usedSlugs = [...SIMPLE_ICON_SLUGS, ...MANUAL_SLUGS].sort((a, b) => a.localeCompare(b));

const banner =
  `// GERADO por scripts/generate-skill-icons.mjs — não edite à mão.\n` +
  `// Rode \`node scripts/generate-skill-icons.mjs\` (ou \`npm run icons:generate\`) para regenerar.\n`;

const body =
  banner +
  `\nexport const SKILL_ICON_VIEWBOX = "${UNIFORM_VIEWBOX}";\n\n` +
  `export const SKILL_ICON_PATHS: Record<string, string> = {\n` +
  usedSlugs.map((slug) => `  "${slug}": \`${paths[slug]}\`,`).join("\n") +
  `\n};\n`;

writeFileSync(outFile, body, "utf8");

console.log(
  `OK: ${usedSlugs.length} ícones gerados (${SIMPLE_ICON_SLUGS.length} simple-icons + ${MANUAL_SLUGS.length} manuais, todos monocromáticos, viewBox único ${UNIFORM_VIEWBOX}) -> ${path.relative(process.cwd(), outFile)}`
);
