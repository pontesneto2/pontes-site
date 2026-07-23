/**
 * Cliente da REST API da Vercel — alimenta o "Engineering Dashboard" da home
 * com dados reais de deploy (não fake, ao contrário do antigo /api/deploy-stats).
 *
 * PRINCÍPIO: igual ao resto do backend deste site — nunca derruba a página.
 * Sem token/projeto configurado, `isVercelConfigured()` volta false e quem
 * consome (as rotas em src/app/api/vercel/*) devolve `{ configured: false }`
 * em vez de propagar erro.
 */

const VERCEL_API_BASE = "https://api.vercel.com";
const CACHE_TTL_MS = 60_000; // TTL pedido: 60s
const MAX_RETRIES = 3;
const BASE_BACKOFF_MS = 500;

export class VercelApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "VercelApiError";
    this.status = status;
  }
}

export type ProjectKey = "portfolio" | "site";

const PROJECT_LABELS: Record<ProjectKey, string> = {
  portfolio: "pontes-portfolio",
  site: "pontes-site",
};

function getConfig() {
  return {
    token: process.env.VERCEL_API_TOKEN,
    teamId: process.env.VERCEL_TEAM_ID,
    projects: {
      portfolio: process.env.VERCEL_PROJECT_PORTFOLIO,
      site: process.env.VERCEL_PROJECT_SITE,
    } as Record<ProjectKey, string | undefined>,
  };
}

function configuredProjectEntries(): Array<{ key: ProjectKey; id: string }> {
  const { projects } = getConfig();
  return (Object.entries(projects) as Array<[ProjectKey, string | undefined]>)
    .filter((entry): entry is [ProjectKey, string] => Boolean(entry[1]))
    .map(([key, id]) => ({ key, id }));
}

export function isVercelConfigured(): boolean {
  const { token, teamId } = getConfig();
  return Boolean(token && teamId && configuredProjectEntries().length > 0);
}

// --- Cache em memória (TTL 60s) + fetch com retry/backoff -------------------

type CacheEntry = { data: unknown; expiresAt: number };
const cache = new Map<string, CacheEntry>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchVercel<T>(path: string, searchParams: Record<string, string> = {}): Promise<T> {
  const { token, teamId } = getConfig();
  if (!token) throw new VercelApiError("VERCEL_API_TOKEN não configurado", 401);

  const cacheKey = `${path}?${new URLSearchParams(searchParams).toString()}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.data as T;

  const url = new URL(`${VERCEL_API_BASE}${path}`);
  if (teamId) url.searchParams.set("teamId", teamId);
  for (const [key, value] of Object.entries(searchParams)) url.searchParams.set(key, value);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401 || res.status === 403) {
      throw new VercelApiError(
        "Token da Vercel inválido ou sem permissão para este time/projeto",
        res.status
      );
    }

    if (res.status === 429) {
      if (attempt < MAX_RETRIES) {
        await sleep(BASE_BACKOFF_MS * 2 ** attempt);
        continue;
      }
      throw new VercelApiError("Rate limit da Vercel API excedido", 429);
    }

    if (!res.ok) {
      throw new VercelApiError(`Vercel API respondeu ${res.status}`, res.status);
    }

    const data = (await res.json()) as T;
    cache.set(cacheKey, { data, expiresAt: Date.now() + CACHE_TTL_MS });
    return data;
  }

  throw new VercelApiError("Falha desconhecida na Vercel API", 500);
}

// --- Endpoints ---------------------------------------------------------------

export type VercelDeployment = {
  uid: string;
  url?: string;
  state?: string;
  readyState?: string;
  target?: string | null;
  createdAt?: number;
  buildingAt?: number;
  ready?: number;
  meta?: {
    githubCommitMessage?: string;
    githubCommitRef?: string;
    githubCommitAuthorName?: string;
  };
};

export async function getDeployments(projectId: string, limit = 100): Promise<VercelDeployment[]> {
  const data = await fetchVercel<{ deployments?: VercelDeployment[] }>("/v6/deployments", {
    projectId,
    limit: String(limit),
  });
  return data.deployments ?? [];
}

export type VercelProjectInfo = {
  id: string;
  name: string;
  framework?: string | null;
  nodeVersion?: string | null;
};

export async function getProjectInfo(projectId: string): Promise<VercelProjectInfo> {
  return fetchVercel<VercelProjectInfo>(`/v9/projects/${projectId}`);
}

export type VercelDomain = { name: string; verified: boolean };

export async function getDomains(projectId: string): Promise<VercelDomain[]> {
  const data = await fetchVercel<{ domains?: VercelDomain[] }>(`/v9/projects/${projectId}/domains`);
  return data.domains ?? [];
}

// --- Métricas derivadas -------------------------------------------------------

export type EngineeringMetrics = {
  successRatePct: number;
  totalDeployments: number;
  avgBuildTimeSec: number | null;
  fastestBuildSec: number | null;
  deploysPerWeek: number;
  lastProductionDeployAt: number | null;
  stableSinceDays: number | null;
};

function isReady(d: VercelDeployment): boolean {
  return (d.readyState ?? d.state) === "READY";
}

export function computeMetrics(deployments: VercelDeployment[]): EngineeringMetrics {
  const total = deployments.length;
  const readyCount = deployments.filter(isReady).length;
  const successRatePct = total > 0 ? Math.round((readyCount / total) * 1000) / 10 : 0;

  const buildTimes = deployments
    .filter((d) => d.ready != null && d.buildingAt != null && d.ready > d.buildingAt)
    .map((d) => (d.ready! - d.buildingAt!) / 1000);
  const avgBuildTimeSec = buildTimes.length
    ? Math.round(buildTimes.reduce((sum, t) => sum + t, 0) / buildTimes.length)
    : null;
  const fastestBuildSec = buildTimes.length ? Math.round(Math.min(...buildTimes)) : null;

  const timestamps = deployments.map((d) => d.createdAt).filter((t): t is number => Boolean(t));
  const oldest = timestamps.length ? Math.min(...timestamps) : null;
  const newest = timestamps.length ? Math.max(...timestamps) : null;
  const spanWeeks = oldest != null && newest != null && newest > oldest ? (newest - oldest) / 604_800_000 : null;
  const deploysPerWeek = spanWeeks && spanWeeks > 0 ? Math.round((total / spanWeeks) * 10) / 10 : total;

  const productionReady = deployments.filter((d) => d.target === "production" && isReady(d));
  const lastProductionDeployAt = productionReady.length
    ? Math.max(...productionReady.map((d) => d.createdAt ?? 0))
    : null;
  const stableSinceDays = lastProductionDeployAt
    ? Math.floor((Date.now() - lastProductionDeployAt) / 86_400_000)
    : null;

  return {
    successRatePct,
    totalDeployments: total,
    avgBuildTimeSec,
    fastestBuildSec,
    deploysPerWeek,
    lastProductionDeployAt,
    stableSinceDays,
  };
}

// --- Agregação entre os projetos configurados --------------------------------

export type AggregatedDeployment = VercelDeployment & { projectKey: ProjectKey; projectLabel: string };

export async function getAllDeployments(limit = 100): Promise<AggregatedDeployment[]> {
  const entries = configuredProjectEntries();
  const results = await Promise.all(
    entries.map(async ({ key, id }) => {
      const deployments = await getDeployments(id, limit);
      return deployments.map((d) => ({ ...d, projectKey: key, projectLabel: PROJECT_LABELS[key] }));
    })
  );
  return results.flat().sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
}

export async function getAggregatedMetrics(): Promise<{ configured: boolean } & EngineeringMetrics> {
  if (!isVercelConfigured()) {
    return {
      configured: false,
      successRatePct: 0,
      totalDeployments: 0,
      avgBuildTimeSec: null,
      fastestBuildSec: null,
      deploysPerWeek: 0,
      lastProductionDeployAt: null,
      stableSinceDays: null,
    };
  }
  const deployments = await getAllDeployments(100);
  return { configured: true, ...computeMetrics(deployments) };
}

export type AggregatedProjectInfo = {
  projectKey: ProjectKey;
  label: string;
  framework: string | null;
  nodeVersion: string | null;
  domains: string[];
};

export async function getAllProjectsInfo(): Promise<AggregatedProjectInfo[]> {
  const entries = configuredProjectEntries();
  return Promise.all(
    entries.map(async ({ key, id }) => {
      const [info, domains] = await Promise.all([getProjectInfo(id), getDomains(id)]);
      return {
        projectKey: key,
        label: PROJECT_LABELS[key],
        framework: info.framework ?? null,
        nodeVersion: info.nodeVersion ?? null,
        domains: domains.filter((d) => d.verified).map((d) => d.name),
      };
    })
  );
}
