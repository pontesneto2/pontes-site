import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as simpleIcons from "simple-icons";

// Logos coloridos (oficiais) do Skills & Tools, servidos como arquivos estáticos
// em public/skills/ e renderizados via <img>: os SVGs do devicon usam gradientes
// com ids internos que colidiriam se fossem inlinados na mesma página.

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const deviconDir = path.join(path.dirname(require.resolve("devicon/package.json")), "icons");
const manualDir = path.join(__dirname, "icons-manual");
const outDir = path.join(__dirname, "..", "public", "skills");

// Fundo do site é quase preto: partes pretas/grafite dos logos viram zinc-100.
const LIGHT = "#f4f4f5";

// slug de saída -> fonte. `recolor` troca cores escuras que somem no fundo escuro.
const LOGOS = {
  typescript: { devicon: "typescript/typescript-original" },
  react: { devicon: "react/react-original" },
  nextjs: { devicon: "nextjs/nextjs-original" },
  vuejs: { devicon: "vuejs/vuejs-original" },
  angular: { devicon: "angular/angular-original" },
  tailwindcss: { devicon: "tailwindcss/tailwindcss-original" },
  nodejs: { devicon: "nodejs/nodejs-original" },
  nestjs: { devicon: "nestjs/nestjs-original" },
  express: { devicon: "express/express-original", rootFill: LIGHT },
  spring: { devicon: "spring/spring-original" },
  dotnet: { devicon: "dotnetcore/dotnetcore-original" },
  python: { devicon: "python/python-original" },
  php: { devicon: "php/php-original" },
  graphql: { devicon: "graphql/graphql-plain" },
  swagger: { devicon: "swagger/swagger-original" },
  // Círculo sem fill (preto) com a chave em branco: o cinza mantém a chave legível.
  oauth: { devicon: "oauth/oauth-original", rootFill: "#a1a1aa" },
  docker: { devicon: "docker/docker-original" },
  kubernetes: { devicon: "kubernetes/kubernetes-original" },
  githubactions: { devicon: "githubactions/githubactions-original" },
  gitlab: { devicon: "gitlab/gitlab-original" },
  aws: { devicon: "amazonwebservices/amazonwebservices-original-wordmark", recolor: { "#252f3e": LIGHT } },
  azure: { devicon: "azure/azure-original" },
  googlecloud: { devicon: "googlecloud/googlecloud-original" },
  prometheus: { devicon: "prometheus/prometheus-original" },
  grafana: { devicon: "grafana/grafana-original" },
  // linux-original do devicon tem 194 KB (Tux rasterizado em paths); a versão do simple-icons tem ~2 KB.
  linux: { simpleIcon: "siLinux" },
  terraform: { devicon: "terraform/terraform-original" },
  postgresql: { devicon: "postgresql/postgresql-original" },
  mongodb: { devicon: "mongodb/mongodb-original" },
  redis: { devicon: "redis/redis-original" },
  prisma: { devicon: "prisma/prisma-original", recolor: { "#2d3748": LIGHT } },
  sequelize: { devicon: "sequelize/sequelize-original" },
  selenium: { devicon: "selenium/selenium-original" },
  playwright: { devicon: "playwright/playwright-original" },
  cypress: { devicon: "cypressio/cypressio-original" },
  figma: { devicon: "figma/figma-original" },
  git: { devicon: "git/git-original" },
  github: { devicon: "github/github-original", recolor: { "#181616": LIGHT } },
  jira: { devicon: "jira/jira-original" },
  trello: { devicon: "trello/trello-original" },
  postman: { devicon: "postman/postman-original" },
  vscode: { devicon: "vscode/vscode-original" },
  intellij: { devicon: "intellij/intellij-original" },
  eclipse: { devicon: "eclipse/eclipse-original" },
  // Ausentes no devicon: simple-icons (monocromático) com a cor oficial da marca.
  typeorm: { simpleIcon: "siTypeorm" },
  curl: { simpleIcon: "siCurl", color: LIGHT },
  vtex: { simpleIcon: "siVtex" },
  jwt: { simpleIcon: "siJsonwebtokens", color: LIGHT },
  // WordPress e NGINX do devicon trazem o wordmark, ilegível a 28px.
  wordpress: { simpleIcon: "siWordpress" },
  nginx: { simpleIcon: "siNginx" },
  // Golfinho #00618a e jest-plain #99425b ficam escuros demais no fundo do site.
  mysql: { devicon: "mysql/mysql-original", recolor: { "#00618a": "#4479a1" } },
  jest: { simpleIcon: "siJest" },
  powerbi: { manual: "powerbi", color: "#F2C811" },
};

function fromDevicon({ devicon, recolor = {}, rootFill }) {
  let svg = readFileSync(path.join(deviconDir, `${devicon}.svg`), "utf8").trim();
  for (const [from, to] of Object.entries(recolor)) {
    const re = new RegExp(from, "gi");
    if (!re.test(svg)) throw new Error(`${devicon}: cor ${from} não encontrada`);
    svg = svg.replace(re, to);
  }
  if (rootFill) svg = svg.replace("<svg ", `<svg fill="${rootFill}" `);
  return svg;
}

function fromSimpleIcon({ simpleIcon, color }) {
  const icon = simpleIcons[simpleIcon];
  if (!icon) throw new Error(`${simpleIcon}: ausente no simple-icons`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${color ?? `#${icon.hex}`}" d="${icon.path}"/></svg>`;
}

function fromManual({ manual, color }) {
  const raw = readFileSync(path.join(manualDir, `${manual}.svg`), "utf8").trim();
  return raw.replaceAll('fill="currentColor"', `fill="${color}"`);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const [slug, source] of Object.entries(LOGOS)) {
  const svg = source.devicon ? fromDevicon(source) : source.simpleIcon ? fromSimpleIcon(source) : fromManual(source);
  const withNs = svg.includes("xmlns=") ? svg : svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
  writeFileSync(path.join(outDir, `${slug}.svg`), withNs + "\n", "utf8");
}

console.log(`OK: ${Object.keys(LOGOS).length} logos -> ${path.relative(process.cwd(), outDir)}`);
