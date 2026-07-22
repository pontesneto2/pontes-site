import type { Bilingual } from "@/lib/language-context";

export type ExperienceItem = {
  company: string;
  startRole?: Bilingual;
  role: Bilingual;
  period: string;
  remote?: boolean;
  languages?: string;
  contractType?: Bilingual;
  location: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Star Capital",
    role: {
      pt: "Engenheiro de Software | Gerenciamento de Projeto",
      en: "Software Engineer | Project Management",
    },
    period: "06/2025–07/2026",
    location: "Fortaleza - CE",
  },
  {
    company: "FlixBus Tickets",
    role: { pt: "Sênior Desenvolvedor Full Stack", en: "Senior Full Stack Developer" },
    period: "01/2024–06/2024",
    remote: true,
    languages: "PT/EN",
    contractType: { pt: "Contrato", en: "Contract" },
    location: "Dublin - Irlanda",
  },
  {
    company: "FedEx Services",
    role: { pt: "Sênior Desenvolvedor Full Stack", en: "Senior Full Stack Developer" },
    period: "07/2024–02/2025",
    remote: true,
    languages: "PT/EN",
    contractType: { pt: "Contrato", en: "Contract" },
    location: "Dublin - Irlanda",
  },
  {
    company: "Instituto Anjos Digitais",
    role: {
      pt: "Sênior Desenvolvedor Full Stack | Gerenciamento de projetos de Produtos Digitais",
      en: "Senior Full Stack Developer | Digital Product Project Management",
    },
    period: "2023–2024",
    remote: true,
    location: "Fortaleza - CE",
  },
  {
    company: "Secretaria do Desenvolvimento Agrário (CE)",
    startRole: { pt: "Programador Jr", en: "Jr Programmer" },
    role: {
      pt: "Analista de Sistemas Pleno | Product Designer",
      en: "Mid-level Systems Analyst | Product Designer",
    },
    period: "2021–2023",
    location: "Fortaleza - CE",
  },
  {
    company: "Instituto Agropolos do Ceará",
    startRole: { pt: "Programador Jr", en: "Jr Programmer" },
    role: {
      pt: "Analista de Sistemas Pleno | UX/UI Designer",
      en: "Mid-level Systems Analyst | UX/UI Designer",
    },
    period: "2021–2023",
    remote: true,
    location: "Fortaleza - CE",
  },
  {
    company: "Com3 Brasil",
    role: {
      pt: "Analista de Sistemas Jr",
      en: "Jr Systems Analyst",
    },
    period: "2020–2021",
    location: "Fortaleza - CE",
  },
];

export type PriorExperienceItem = {
  company: string;
  startRole?: Bilingual;
  role: Bilingual;
  period: string;
  location: string;
};

export const PRIOR_EXPERIENCE: PriorExperienceItem[] = [
  {
    company: "Grupo Laredo Atacadista",
    startRole: { pt: "Auxiliar de gerência", en: "Assistant Manager" },
    role: { pt: "Gerente Operacional de Mercado", en: "Store Operations Manager" },
    period: "2017–2020",
    location: "Fortaleza - CE",
  },
  {
    company: "White Martins Gases Industriais e Medicinais",
    startRole: { pt: "Encarregado de Operações", en: "Operations Supervisor" },
    role: {
      pt: "Gerente de Unidade Capital — URC Fortaleza",
      en: "Unit Manager — URC Fortaleza",
    },
    period: "2015–2017",
    location: "Fortaleza - CE",
  },
];

export const EDUCATION: Bilingual[] = [
  {
    pt: "Graduado em Análise e Desenvolvimento de Sistemas pela Universidade Farias Brito, em Fortaleza.",
    en: "Bachelor's degree in Systems Analysis and Development from Universidade Farias Brito, in Fortaleza.",
  },
  {
    pt: "Pós Graduado em Engenharia de Software com ênfase em DevOps.",
    en: "Postgraduate in Software Engineering with an emphasis on DevOps.",
  },
  {
    pt: "Especializado em Desenvolvimento Full Stack pela Digital College.",
    en: "Specialized in Full Stack Development from Digital College.",
  },
  {
    pt: "Especializado em UX/UI e design de Produtos Digitais pela EBAC.",
    en: "Specialized in UX/UI and Digital Product Design from EBAC.",
  },
];

export const CV_SUMMARY: Bilingual = {
  pt: "Engenheiro de Software Full Stack com mais de 6 anos de experiência em desenvolvimento Web/Mobile, DevOps e entusiasta de operações UX/UI. Perfil multidisciplinar, atuando na construção de soluções digitais de ponta a ponta.",
  en: "Full Stack Software Engineer with over 6 years of experience in Web/Mobile development, DevOps, and an enthusiast of UX/UI operations. Multidisciplinary profile, working on building end-to-end digital solutions.",
};

export const CV_SKILLS: string[] = [
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "DevOps",
  "Kubernetes",
  "Docker",
  "UX/UI Design",
  "PostgreSQL",
  "C#",
  "PHP",
];
