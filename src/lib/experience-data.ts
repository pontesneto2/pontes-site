import type { Bilingual } from "@/lib/language-context";

export type ExperienceItem = {
  company: string;
  startRole?: Bilingual;
  role: Bilingual;
  description?: Bilingual;
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
    description: {
      pt: "Atuação dupla como engenheiro de software e gerente de projeto, unindo desenvolvimento técnico e gestão de entregas em soluções digitais.",
      en: "Dual role as software engineer and project manager, combining technical development with delivery management for digital solutions.",
    },
    period: "06/2025–07/2026",
    location: "Fortaleza - CE",
  },
  {
    company: "FedEx Services",
    role: { pt: "Sênior Desenvolvedor Full Stack", en: "Senior Full Stack Developer" },
    description: {
      pt: "Projeto internacional em regime de contrato remoto, atuando no desenvolvimento full stack de sistemas corporativos internos da operação da FedEx.",
      en: "International remote contract project, working on full stack development of internal corporate systems for FedEx's operation.",
    },
    period: "07/2024–02/2025",
    remote: true,
    languages: "PT/EN",
    contractType: { pt: "Contrato", en: "Contract" },
    location: "Dublin - Irlanda",
  },
  {
    company: "FlixBus Tickets",
    role: { pt: "Sênior Desenvolvedor Full Stack", en: "Senior Full Stack Developer" },
    description: {
      pt: "Contrato remoto internacional, atuando no desenvolvimento full stack da plataforma de venda de passagens online da FlixBus.",
      en: "International remote contract, working on full stack development of FlixBus's online ticket sales platform.",
    },
    period: "01/2024–06/2024",
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
    description: {
      pt: "Liderança técnica e gerenciamento de produtos digitais do instituto, incluindo o site institucional (WordPress/PHP) que elevou em +15% a captação de apoiadores.",
      en: "Technical leadership and digital product management for the institute, including the institutional website (WordPress/PHP) that grew supporter sign-ups by +15%.",
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
    description: {
      pt: "Evolução de Programador Jr a Analista de Sistemas Pleno, atuando como product designer e full stack (React Native, .NET, PHP) em sistemas como o app SDA Ceará (1.000+ usuários) e o FEDAF (15.000+ produtores cadastrados).",
      en: "Grew from Jr Programmer to Mid-level Systems Analyst, working as product designer and full stack developer (React Native, .NET, PHP) on systems like the SDA Ceará app (1,000+ users) and FEDAF (15,000+ registered producers).",
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
    description: {
      pt: "Evolução de Programador Jr a Analista de Sistemas Pleno, com atuação em UX/UI Design remota no Sistema Integrado de Gestão (.NET/Angular, 10.000+ usuários) e no site institucional do instituto.",
      en: "Grew from Jr Programmer to Mid-level Systems Analyst, working remotely on UX/UI design for the Integrated Management System (.NET/Angular, 10,000+ users) and the institute's website.",
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
    description: {
      pt: "Primeiras experiências como analista de sistemas, atuando no sistema de gestão escolar do 2º CPM-CHMJ (PHP/Laravel/Angular, 2.350+ usuários) — os primeiros passos na carreira de tecnologia.",
      en: "Early experience as a systems analyst, working on the 2nd CPM-CHMJ school management system (PHP/Laravel/Angular, 2,350+ users) — the first steps into a technology career.",
    },
    period: "2020–2021",
    location: "Fortaleza - CE",
  },
  {
    company: "Grupo Laredo Atacadista",
    startRole: { pt: "Auxiliar de gerência", en: "Assistant Manager" },
    role: { pt: "Gerente Operacional de Mercado", en: "Store Operations Manager" },
    description: {
      pt: "Evolução de auxiliar de gerência a gerente operacional de mercado, antes da transição para tecnologia.",
      en: "Grew from assistant manager to store operations manager, before transitioning into technology.",
    },
    period: "2017–2020",
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
