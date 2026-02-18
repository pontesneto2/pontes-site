"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopTagsMiniChart from "@/components/TopTagsMiniChart";
import RobotBuddy from "@/components/RobotBuddy";
import GithubMetricsCounters from "@/components/GithubMetricsCounters";
import {
  Rocket,
  MonitorSmartphone,
  Globe,
  Code,
  Mail,
  Github,
  Linkedin,
  Menu,
  ExternalLink,
  Lock,
  X,
  Layers,
  Server,
  Cloud,
  Palette,
} from "lucide-react";

const FloatingIcons3D = dynamic(() => import("@/components/FloatingIcons3D"), {
  ssr: false,
});

export default function Page() {
  const [navOpen, setNavOpen] = useState(false);
  const [activePortfolioTab, setActivePortfolioTab] = useState<
    "sistemas" | "websites"
  >("sistemas");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const viewportSettings = {
    once: true,
    amount: isMobile ? 0.28 : 0.2,
    margin: isMobile ? "0px 0px -22% 0px" : "0px 0px -14% 0px",
  } as const;

  const easeOut = [0.16, 1, 0.3, 1] as const;

  const staggerList = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isMobile ? 0.14 : 0.12,
        delayChildren: isMobile ? 0.08 : 0.06,
      },
    },
  };

  const staggerTight = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isMobile ? 0.07 : 0.06,
        delayChildren: isMobile ? 0.06 : 0.05,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: easeOut,
        delay: i * (isMobile ? 0.08 : 0.06),
      },
    }),
  };

  const fadeLeftItem = {
    hidden: { opacity: 0, x: -10, y: 10 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const tagItem = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easeOut },
    },
  };

  const featuredProjects = [
    {
      title: "Meoocarro — App",
      subtitle: "Em desenvolvimento",
      tags: [
        "React Native",
        "Typescript",
        "NextJS",
        "NodeJS",
        "ExpressJS",
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "Docker",
      ],
      link: "",
      blurb:
        "Aplicativo para conectar motoristas e oficinas de maneira inteligente, simplificando agendamentos, orçamentos e o acompanhamento de serviços automotivos.",
      category: "Aplicativo Mobile + Painel Admin",
      thumb: "/img-card-meoocarro.png",
    },
    {
      title: "iMidooh — Gerenciamento de Mídia DOOH",
      subtitle: "",
      tags: [
        "React Native",
        "Typescript",
        "NextJS",
        "NodeJS",
        "ExpressJS",
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "Docker",
      ],
      link: "",
      blurb:
        "Plataforma mobile para operar mídia DOOH em painéis de LED dos mais diversos tipos, com gestão de campanhas, monitoramento em tempo real e relatórios de performance.",
      category: "Aplicativo Mobile + Painel Admin",
      thumb: "/logo-dooh.png",
    },
    {
      title: "Sistema Financeiro ERP Estrela",
      subtitle: "",
      tags: [
        "NodeJS",
        "ExpressJS",
        "Prisma",
        "PostgreSQL",
        "Docker",
        "TailwindCSS",
        "NextJS",
        "Typescript",
      ],
      link: "",
      blurb:
        "Sistema web para rotinas financeiras do dia a dia, com padronização de processos, relatórios e visibilidade para decisões mais rápidas e seguras.",
      category: "Sistema Web",
      thumb: "/logo-estrela.png",
    },
  ];

  const additionalProjects = [
    {
      name: "Sistema Especial Fazenda Chapéu",
      tech: ["Scriptcase", "PHP", "JS", "PostgreSQL"],
      desc: "Secretaria de Desenvolvimento Agrário do Ceará",
    },
    {
      name: "Sistema Financeiro ERP Estrela",
      tech: [
        "NodeJS",
        "ExpressJS",
        "Prisma",
        "PostgreSQL",
        "Docker",
        "TailwindCSS",
        "NextJS",
        "TypeScript",
      ],
      desc: "Grupo Star",
    },
    {
      name: "Sistema SIGMA",
      tech: [".NET", "C#", "Angular", "MongoDB", "Docker"],
      desc: "Instituto Agropolos do Ceará",
    },
    {
      name: "Inscrições - Letramento Digital",
      tech: ["WordPress", "PHP", "JS", "Bootstrap"],
      desc: "Anjos Digitais",
    },
  ];

  const websites = [
    {
      url: "https://www.clicksoftwarehouse.com/",
      name: "Click Software House",
      desc: "Site institucional com serviços, posicionamento e contato.",
    },
    {
      url: "https://starcapital.stargrupo.com.br/",
      name: "Star Capital",
      desc: "Institucional da Star Capital com proposta e canais de contato.",
    },
    {
      url: "https://www.stargrupo.com.br/",
      name: "Star Grupo",
      desc: "Site corporativo do grupo com visão geral e empresas.",
    },
    {
      url: "https://starpesquisas.stargrupo.com.br/",
      name: "Star Pesquisas",
      desc: "Landing de serviços com mensagem direta e CTA claro.",
    },
    {
      url: "https://starreciclagem.stargrupo.com.br/",
      name: "Star Reciclagem",
      desc: "Institucional com serviços, áreas de atuação e contato.",
    },
    {
      url: "https://silvaeduarteadvogados.com/",
      name: "Silva e Duarte Advogados",
      desc: "Institucional jurídico com áreas de atuação e captação.",
    },
    {
      url: "https://2.0.movimentafilmes.com/",
      name: "Movimenta Filmes",
      desc: "Portfólio de trabalhos com navegação rápida e objetiva.",
    },
    {
      url: "https://anjosdigitais.org",
      name: "Anjos Digitais",
      desc: "Institucional de impacto social com campanhas e chamadas.",
    },
    {
      url: "https://institutoagropolos.org.br",
      name: "Instituto Agropolos",
      desc: "Institucional com conteúdo organizado e acesso rápido.",
    },
    {
      url: "https://fastcall.com.br/2.0",
      name: "FastCall 2.0",
      desc: "Página do serviço com proposta clara e conversão.",
    },
    {
      url: "https://com3brasil.com.br/wp",
      name: "COM3 Brasil",
      desc: "Institucional da agência com serviços e portfólio.",
    },
    {
      url: "https://www.sda.ce.gov.br",
      name: "SDA Ceará",
      desc: "Portal institucional com notícias, programas e serviços.",
    },
    {
      url: "https://sistemas2.sda.ce.gov.br",
      name: "Sistemas SDA",
      desc: "Hub de acesso aos sistemas e serviços digitais.",
    },
  ];

  const experience = [
    {
      company: "Grupo Star Capital",
      role: "Engenheiro de Software Sênior | Gerente de Projetos",
      period: "2025",
    },
    {
      company: "FlixBus Bilhetes Europa",
      role: "Desenvolvedor Fullstack",
      period: "2024–2025",
    },
    {
      company: "FedEX Portugal",
      role: "Desenvolvedor Fullstack",
      period: "2024–2025",
    },
    {
      company: "Instituto Anjos Digitais",
      role: "Desenvolvedor Sênior de Produtos Digitais | Gerente de Projetos",
      period: "2023–2025",
    },
    {
      company: "Secretaria do Desenvolvimento Agrário (CE)",
      role: "Desenvolvedor Fullstack | Product Designer",
      period: "2021–2023",
    },
    {
      company: "Instituto Agropolos do Ceará",
      role: "Desenvolvedor Fullstack | Product Designer",
      period: "2021–2023",
    },
    {
      company: "Com3 Brasil",
      role: "Desenvolvedor Fullstack | UX/UI Designer",
      period: "2020–2021",
    },
    {
      company: "Grupo Laredo Atacado e Varejo",
      role: "Gerente Operacional de Mercado",
      period: "2018–2020",
    },
    {
      company: "White Martins Gases Industriais e Medicinais",
      startRole: "Estagiário",
      role: "Gerente de Unidade Capital — URC Fortaleza",
      period: "2015–2017",
    },
  ];

  const techTagsFrequency = [...featuredProjects, ...additionalProjects]
    .flatMap((item) => ("tags" in item ? item.tags : item.tech))
    .reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
      return acc;
    }, {});

  const techTagsSorted = Object.entries(techTagsFrequency)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));

  const topTechTags = techTagsSorted.slice(0, 18);
  const top5TechTags = techTagsSorted.slice(0, 5);

  return (
    <div className="min-h-screen font-sans relative isolate">
      <FloatingIcons3D />

      <div className="relative z-10">
        {/* NAV */}
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 md:py-0 md:h-16">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Logo com P */}
                <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500 shadow-[0_0_40px_rgba(168,85,247,0.35)] flex items-center justify-center">
                  <span className="text-white font-black text-lg sm:text-xl">
                    FP
                  </span>
                </div>
                {/* Marca FCOPTS */}
                <div className="flex flex-col">
                  <span
                    className="text-lg sm:text-xl font-black tracking-[0.15em] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent"
                    style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                  >
                    FCOPTS
                  </span>
                  <span className="text-[10px] text-zinc-500 tracking-wide -mt-0.5">
                    Senior Software Engineer · UX Ops
                  </span>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8 text-sm">
                <a
                  href="#services"
                  className="hover:text-white/90 text-zinc-300"
                >
                  Serviços
                </a>
                <a
                  href="#projects"
                  className="hover:text-white/90 text-zinc-300"
                >
                  Portfólio
                </a>
                <a href="#stack" className="hover:text-white/90 text-zinc-300">
                  Stack
                </a>
                <a href="#about" className="hover:text-white/90 text-zinc-300">
                  Sobre
                </a>
                <a
                  href="#contact"
                  className="hover:text-white/90 text-zinc-300"
                >
                  Contato
                </a>
                <a
                  href="https://drive.google.com/file/d/1NGGBTy9kzAPm5Os6we_jaeevsU-_zavX/view?usp=sharing"
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-700/20"
                >
                  Baixar CV
                </a>
              </nav>
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/25 hover:bg-black/35 p-2.5 transition-colors"
                onClick={() => setNavOpen(!navOpen)}
                aria-expanded={navOpen}
                aria-controls="mobile-nav"
              >
                <span className="sr-only">Abrir menu</span>
                {navOpen ? (
                  <X className="h-5 w-5 text-zinc-200" />
                ) : (
                  <Menu className="h-5 w-5 text-zinc-200" />
                )}
              </button>
            </div>
          </div>
          {navOpen && (
            <div
              id="mobile-nav"
              className="md:hidden border-t border-white/5 bg-black/50"
            >
              <div className="mx-auto max-w-7xl px-3 py-4 flex flex-col gap-2">
                {[
                  { href: "#services", label: "Serviços" },
                  { href: "#projects", label: "Portfólio" },
                  { href: "#stack", label: "Stack" },
                  { href: "#about", label: "Sobre" },
                  { href: "#contact", label: "Contato" },
                ].map((i) => (
                  <a
                    key={i.href}
                    href={i.href}
                    className="text-zinc-200 rounded-xl px-3 py-3 hover:bg-white/5 transition-colors"
                    onClick={() => setNavOpen(false)}
                  >
                    {i.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* HERO - BANNER TRIUNFAL */}
        <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
          {/* Gradiente de fundo animado */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-black/50" />

          {/* Orbs grandes de fundo */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-fuchsia-500/20 rounded-full blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Subtítulo animado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium backdrop-blur-sm">
                Senior Software Engineer · UX Ops
              </span>
            </motion.div>

            {/* Nome - DESTAQUE MÁXIMO */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="mb-8"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 drop-shadow-[0_0_50px_rgba(168,85,247,0.5)]">
                  Francisco
                </span>
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mt-2">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-violet-300 to-fuchsia-300 drop-shadow-[0_0_50px_rgba(217,70,239,0.5)]">
                  Pontes
                </span>
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl font-light text-zinc-300 max-w-4xl mx-auto mb-10"
            >
              Do esboço ao deploy:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300 font-semibold">
                design, engenharia e impacto real.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 rounded-2xl px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-lg font-semibold shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105"
              >
                <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                Ver portfólio
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-3 border-2 border-white/20 backdrop-blur-sm text-lg font-semibold hover:bg-white/5 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-6 w-6" />
                Fale comigo
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 flex items-center justify-center gap-4"
            >
              <a
                aria-label="GitHub"
                href="https://github.com/pontesneto2"
                className="p-3 rounded-xl border border-white/10 hover:bg-white/5 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/fcopts"
                className="p-3 rounded-xl border border-white/10 hover:bg-white/5 hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </motion.div>
          </div>
          {/* Scroll Indicator - CENTRALIZADO (relativo à seção inteira) */}
          <motion.a
            href="#services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1.5, duration: 1 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-8 left-0 right-0 mx-auto w-fit flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Role para explorar"
          >
            <span className="text-sm">Role para explorar</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M19 12l-7 7-7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </section>

        {/* CARD COMERCIAL - DESTAQUE MÁXIMO */}
        <section
          id="services"
          className="relative py-16 md:py-20 border-t border-white/5"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Card com múltiplas camadas de destaque */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative"
            >
              {/* Glow effect externo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 rounded-3xl blur-2xl opacity-20 animate-pulse" />

              {/* Card principal */}
              <div className="relative rounded-3xl border-2 border-violet-500/50 p-8 md:px-12 md:py-10 bg-gradient-to-br from-black/90 via-violet-950/30 to-black/90 backdrop-blur-xl shadow-2xl">
                {/* Padrão de grid no fundo */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />

                {/* Badge de destaque */}
                <div className="relative z-10 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 text-violet-300 text-sm font-semibold backdrop-blur-sm">
                    <Rocket className="h-4 w-4" />
                    Projetos Sob Medida
                  </span>
                </div>

                <div className="relative z-10">
                  {/* Título com gradiente forte */}
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-fuchsia-200">
                      Desenvolvo Aplicativos, Sistemas e Websites
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                      — projetos 100% personalizados
                    </span>
                  </h2>

                  {/* Descrição com destaque */}
                  <p className="mt-6 text-lg text-zinc-200 max-w-4xl leading-relaxed">
                    Do{" "}
                    <span className="text-violet-300 font-semibold">
                      discovery
                    </span>{" "}
                    ao{" "}
                    <span className="text-fuchsia-300 font-semibold">
                      deploy
                    </span>
                    : requisitos, protótipos, desenvolvimento, integrações,
                    CI/CD e observabilidade.
                    <br />
                    <span className="text-white font-medium">
                      Tecnologia + Padrão + Rentabilidade
                    </span>{" "}
                    para entregar valor real.
                  </p>

                  {/* Grid de serviços com ícones */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        icon: MonitorSmartphone,
                        label: "Aplicativos Mobile",
                        desc: "",
                      },
                      { icon: Globe, label: "Sistemas Web", desc: "" },
                      {
                        icon: Rocket,
                        label: "Websites de Alta Conversão",
                        desc: "",
                      },
                      { icon: Code, label: "Integrações & APIs", desc: "" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300"
                      >
                        <item.icon className="h-7 w-7 text-violet-400 mb-2.5 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold text-white text-sm leading-tight">
                          {item.label}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Proposta de Valor */}
                  <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
                    <p className="text-lg text-center text-zinc-200 leading-relaxed">
                      <span className="text-white font-semibold">
                        Me diga o que você quer
                      </span>{" "}
                      e eu te entrego a{" "}
                      <span className="text-violet-300 font-semibold">
                        solução pronta para uso
                      </span>
                      ,{" "}
                      <span className="text-fuchsia-300 font-semibold">
                        rápido
                      </span>{" "}
                      e nos{" "}
                      <span className="text-white font-semibold">
                        padrões tecnológicos mais atuais
                      </span>
                      .
                    </p>
                  </div>

                  {/* CTA forte */}
                  <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="#contact"
                      className="group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm sm:text-base font-bold shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105"
                    >
                      <Mail className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                      Iniciar Projeto
                    </a>
                    <a
                      href="#projects"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-2.5 border-2 border-white/20 backdrop-blur-sm text-sm sm:text-base font-semibold hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver Casos de Sucesso
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJETOS EM DESTAQUE - REDESENHADO */}
        <section
          id="projects"
          className="relative py-24 border-t border-white/5 bg-zinc-900/40"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                  Projetos em Destaque
                </span>
              </h2>
            </div>

            {/* Cards de projetos principais - Mais elegantes */}
            <motion.div
              variants={staggerList}
              initial="hidden"
              whileInView="show"
              viewport={viewportSettings}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 auto-rows-fr"
            >
              {featuredProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  custom={index}
                  variants={fadeUpItem}
                  className="group relative h-full flex flex-col rounded-3xl border border-white/10 bg-black/75 backdrop-blur-xl p-8 hover:bg-black/80 hover:border-violet-500/40 transition-all duration-500 shadow-xl"
                >
                  {/* Badge de categoria */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Miniatura do projeto */}
                  <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
                    {project.thumb ? (
                      <Image
                        src={project.thumb}
                        alt={`Capa do projeto: ${project.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="h-44 w-full bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <span className="inline-block text-xs text-amber-400/80 font-medium mt-1 mb-2">
                      {project.subtitle}
                    </span>
                  )}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 mt-2">
                    {project.blurb}
                  </p>

                  {/* Tags estilizadas */}
                  <div className="flex flex-wrap gap-2 mb-6 max-h-16 overflow-hidden">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-lg bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:border-violet-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors group-hover:gap-3"
                      >
                        Ver projeto
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500">
                          <Lock className="h-4 w-4" />
                          Projeto Privado
                        </div>
                        <a
                          href="mailto:pontesneto2@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20acesso%20ao%20projeto"
                          className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          <Mail className="h-3 w-3" />
                          Solicite acesso via email
                        </a>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                  Conheça mais projetos
                </span>
              </h2>
            </div>

            {/* Portfólio com Tabs — Sistemas & Websites */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`relative rounded-2xl border border-white/10 backdrop-blur-xl p-8 shadow-2xl overflow-hidden ${
                activePortfolioTab === "sistemas"
                  ? "bg-violet-950/20"
                  : "bg-fuchsia-950/20"
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-100 ${
                  activePortfolioTab === "sistemas"
                    ? "bg-gradient-to-br from-violet-500/8 via-transparent to-transparent"
                    : "bg-gradient-to-br from-fuchsia-500/8 via-transparent to-transparent"
                }`}
              />
              <div className="relative">
              {/* Tab headers + Social */}
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900/60 border border-zinc-800/60 w-fit shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                  <button
                    onClick={() => setActivePortfolioTab("sistemas")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activePortfolioTab === "sistemas"
                        ? "bg-violet-500/20 text-violet-200 border border-violet-500/30 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                        : "text-zinc-400 hover:text-zinc-200 border border-transparent hover:bg-white/5"
                    }`}
                  >
                    <Code className="h-4 w-4" />
                    Sistemas Web
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        activePortfolioTab === "sistemas"
                          ? "bg-violet-500/20 text-violet-300"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {additionalProjects.length}
                    </span>
                  </button>
                  <button
                    onClick={() => setActivePortfolioTab("websites")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activePortfolioTab === "websites"
                        ? "bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/30 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                        : "text-zinc-400 hover:text-zinc-200 border border-transparent hover:bg-white/5"
                    }`}
                  >
                    <Globe className="h-4 w-4" />
                    Websites
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        activePortfolioTab === "websites"
                          ? "bg-fuchsia-500/20 text-fuchsia-300"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {websites.length}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    aria-label="GitHub"
                    href="https://github.com/pontesneto2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-violet-500/30 transition-all"
                  >
                    <Github className="h-4 w-4 text-zinc-300" />
                  </a>
                  <a
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/in/fcopts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-fuchsia-500/30 transition-all"
                  >
                    <Linkedin className="h-4 w-4 text-zinc-300" />
                  </a>
                  <a
                    aria-label="E-mail"
                    href="mailto:pontesneto2@gmail.com"
                    className="inline-flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-amber-500/30 transition-all"
                  >
                    <Mail className="h-4 w-4 text-zinc-300" />
                  </a>
                </div>
              </div>

              {/* Tab content — Sistemas */}
              {activePortfolioTab === "sistemas" && (
                <motion.div
                  key="sistemas"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <div className="flex items-start justify-between gap-4 mb-7 mt-2">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Code className="h-5 w-5 text-violet-400" />
                        Sistemas Web
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                        <span className="text-violet-400 font-medium">
                          Desenvolvo sistemas 100% personalizados
                        </span>{" "}
                        para a sua necessidade: gestão financeira, fluxo de
                        caixa, diário de obra, estoque, CRM, ERP e muito mais.
                      </p>
                    </div>
                  </div>
                  <motion.div
                    variants={staggerList}
                    initial="hidden"
                    animate="show"
                    className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6"
                  >
                    {additionalProjects.map((proj) => (
                      <motion.div
                        key={proj.name}
                        variants={fadeUpItem}
                        className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent border border-white/10 hover:border-violet-500/30 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                      >
                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
                        <div className="absolute top-3 right-3">
                          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                            <Lock className="h-3.5 w-3.5 text-zinc-500" />
                          </div>
                        </div>
                        <h4 className="relative font-semibold text-sm mb-2 group-hover:text-violet-200 transition-colors pr-6 leading-snug flex items-start gap-2">
                          <Code className="h-4 w-4 text-violet-400 mt-[1px] shrink-0" />
                          <span className="min-w-0">{proj.name}</span>
                        </h4>
                        <p className="relative text-xs text-zinc-500 mb-3">
                          {proj.desc}
                        </p>
                        <div className="relative flex flex-wrap gap-1.5 mt-4 pt-2 border-t border-white/5">
                          {proj.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10 hover:border-violet-500/25 hover:text-white transition-all"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Tab content — Websites */}
              {activePortfolioTab === "websites" && (
                <motion.div
                  key="websites"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <div className="flex items-start justify-between gap-4 mb-7 mt-2">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Globe className="h-5 w-5 text-fuchsia-400" />
                        Websites
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                        <span className="text-fuchsia-400 font-medium">
                          Websites desenhados e desenvolvidos
                        </span>{" "}
                        com foco em clareza, performance e conversão — do
                        conteúdo à experiência.
                      </p>
                    </div>
                  </div>

                  <motion.div
                    variants={staggerList}
                    initial="hidden"
                    animate="show"
                    className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6"
                  >
                    {websites.map((site) => (
                      <motion.a
                        key={site.url}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeUpItem}
                        className="group relative flex items-center justify-between p-5 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent border border-white/10 hover:border-fuchsia-500/30 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                      >
                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-violet-500/10" />
                        <div className="min-w-0">
                          <div className="relative text-sm font-semibold text-zinc-200 group-hover:text-fuchsia-200 transition-colors truncate">
                            {site.name}
                          </div>
                          <div className="relative text-[11px] text-zinc-500 leading-snug mt-1 line-clamp-2">
                            {site.desc}
                          </div>
                        </div>
                        <div className="relative flex items-center gap-3 shrink-0 ml-3">
                          <span className="hidden sm:inline-flex text-[10px] px-2 py-1 rounded-lg bg-zinc-900/60 border border-white/10 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                            Ver
                          </span>
                          <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-fuchsia-400 transition-colors" />
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* TRAJETÓRIA PROFISSIONAL - Discreto e Elegante */}
        <section className="relative py-24 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                Trajetória Profissional
              </span>
            </h2>
            <motion.div
              variants={staggerList}
              initial="hidden"
              whileInView="show"
              viewport={viewportSettings}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {experience.map((exp) => (
                <motion.div
                  key={exp.company}
                  variants={fadeUpItem}
                  className="p-5 rounded-xl bg-black/55 border border-white/10 hover:border-violet-500/25 hover:bg-black/60 transition-all backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-semibold text-sm text-white flex-1 min-w-0 break-words">
                      {exp.company}
                    </h4>
                    <span className="text-[9px] text-violet-400 bg-violet-500/10 px-2 py-1 rounded-lg border border-violet-500/20 whitespace-nowrap font-semibold">
                      {exp.period}
                    </span>
                  </div>
                  {"startRole" in exp && exp.startRole ? (
                    <div className="text-[10px] text-zinc-500 mb-1 flex items-center gap-2">
                      <span className="truncate">
                        Cargo Inicial: {exp.startRole}
                      </span>
                    </div>
                  ) : null}
                  <p className="text-xs text-violet-300">{exp.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* STACK - CRITÉRIOS DE ESCOLHA + NUVEM DE TECNOLOGIAS */}
        <section id="stack" className="relative py-24 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                Stack Preferida
              </span>
            </h2>
            <p className="text-sm text-zinc-500 text-center mt-3 max-w-3xl mx-auto leading-relaxed">
              Não fico preso a uma linguagem — tecnologia é ferramenta. Eu
              entendo o contexto do produto, levanto requisitos, defino escopo,
              desenho a arquitetura e escolho a stack mais adequada para o
              cenário do cliente e do projeto.
            </p>

            <div className="mt-10 grid lg:grid-cols-5 gap-6 items-stretch">
              {/* Processo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="lg:col-span-2 order-2 lg:order-none relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                      <Layers className="h-5 w-5 text-violet-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Processo de escolha da{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-fuchsia-200">
                        linguagem, tecnologia e arquitetura
                      </span>
                    </h3>
                  </div>

                  <motion.div
                    variants={staggerList}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportSettings}
                    className="mt-5 grid gap-3"
                  >
                    {[
                      {
                        icon: Palette,
                        title: "Discovery + Requisitos",
                        desc: "Entendo o problema, contexto e restrições.",
                      },
                      {
                        icon: Code,
                        title: "Escopo + Prioridades",
                        desc: "Defino entregáveis, roadmap e riscos.",
                      },
                      {
                        icon: Server,
                        title: "Arquitetura",
                        desc: "Desenho integrações, dados e padrões de qualidade.",
                      },
                      {
                        icon: Rocket,
                        title: "Tecnologia",
                        desc: "Seleciono ferramentas pelo fit do projeto e pela manutenção no longo prazo.",
                      },
                    ].map((step) => (
                      <motion.div
                        key={step.title}
                        variants={fadeLeftItem}
                        className="group relative rounded-2xl border border-white/10 bg-zinc-900/30 p-4 hover:border-violet-500/30 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                            <step.icon className="h-4 w-4 text-violet-300" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors">
                              {step.title}
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">
                              {step.desc}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 shadow-[0_14px_50px_rgba(0,0,0,0.35)]">
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-fuchsia-200">
                        Resultado:
                      </span>{" "}
                      decisões claras, entrega previsível e stack alinhada a
                      custo, time-to-market e sustentabilidade de manutenção.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Nuvem de tecnologias */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="lg:col-span-3 order-1 lg:order-none relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Cloud className="h-5 w-5 text-fuchsia-300" />
                        Linguagens de Programação mais usadas
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1">
                        Baseado nos últimos trabalhos realizados.
                      </p>
                    </div>
                  </div>

                  <TopTagsMiniChart items={top5TechTags} isMobile={isMobile} />

                  <motion.div
                    variants={staggerTight}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportSettings}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {topTechTags.map((item) => {
                      const sizeClass =
                        item.count >= 4
                          ? "text-[12px]"
                          : item.count === 3
                            ? "text-[11px]"
                            : "text-[10px]";
                      const accentClass =
                        item.count >= 3
                          ? "border-violet-500/25 text-zinc-200 hover:text-white hover:border-fuchsia-500/25"
                          : "border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20";

                      const dotClass =
                        item.count >= 3 ? "bg-violet-400/70" : "bg-zinc-500/40";

                      return (
                        <motion.span
                          key={item.tag}
                          variants={tagItem}
                          whileHover={
                            isMobile ? undefined : { y: -2, scale: 1.02 }
                          }
                          className={`group inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-900/35 border ${accentClass} transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.22)] ${sizeClass}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${dotClass}`}
                          />
                          <span className="font-semibold">{item.tag}</span>
                        </motion.span>
                      );
                    })}
                  </motion.div>

                  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-black/70 via-zinc-900/35 to-black/70 border border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.45)]">
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      E quando o projeto pede algo diferente, eu me adapto à
                      stack do time e do cliente. O foco é entregar valor com
                      qualidade e manutenção saudável.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SOBRE MIM - Card Unificado Criativo */}
        <section id="about" className="relative py-24 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <div className="relative rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Gradiente de fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />

              <div className="relative z-10 grid md:grid-cols-5 gap-8 p-8 md:p-12">
                {/* Coluna da imagem - 2 colunas */}
                <div className="md:col-span-2 flex items-center">
                  <div className="relative w-full">
                    <div className="aspect-square rounded-2xl overflow-hidden border border-violet-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                      <div className="relative w-full h-full">
                        <Image
                          src="/pontes.jpg"
                          alt="Francisco Pontes"
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                    {/* Badge flutuante */}
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-2xl shadow-xl font-semibold text-sm">
                      5+ anos de impacto
                    </div>
                  </div>
                </div>

                {/* Coluna do conteúdo - 3 colunas */}
                <div className="md:col-span-3 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                      Sobre mim
                    </span>
                  </h2>

                  <GithubMetricsCounters username="pontesneto2" />

                  <div className="space-y-4 text-[15px] sm:text-base text-zinc-300 leading-relaxed">
                    <p>
                      <span className="text-white font-semibold">
                        Senior Software Engineer
                      </span>{" "}
                      com atuação em{" "}
                      <span className="text-violet-300 font-semibold">
                        Web/Mobile
                      </span>
                      ,{" "}
                      <span className="text-fuchsia-300 font-semibold">
                        DevOps
                      </span>{" "}
                      e <span className="text-white font-semibold">UX/UI</span>.
                      Meu foco é transformar objetivos de negócio em produto
                      funcionando: arquitetura bem definida, entrega previsível
                      e experiência consistente.
                    </p>
                    <p>
                      Experiência em{" "}
                      <span className="text-violet-300">setor público</span> com
                      sistemas críticos e modernização orientada à usabilidade.
                      No <span className="text-fuchsia-300">setor privado</span>
                      , desenho soluções escaláveis, automatizo CI/CD, fortaleço
                      observabilidade e garanto ambientes confiáveis para
                      evolução contínua.
                    </p>
                    <p className="text-sm text-zinc-400">
                      Formação em ADS, especializações em Full-Stack e UX/UI
                      @EBAC. Cursando pós em Engenharia de Software + DevOps
                      @UNIFOR e segunda graduação em Ciência da Computação.
                    </p>
                  </div>

                  {/* Tags redesenhadas e alinhadas */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {[
                      { icon: "🎯", label: "Visão de produto" },
                      { icon: "⚡", label: "Performance" },
                      { icon: "🔧", label: "Boas práticas" },
                      { icon: "🚀", label: "Impacto real" },
                      { icon: "🧑‍💼", label: "Liderança" },
                      { icon: "📦", label: "Gerência de Produtos" },
                    ].map((item) => (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-500/12 to-fuchsia-500/12 border border-violet-500/20 text-xs font-semibold text-zinc-200 hover:border-violet-500/35 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                      >
                        <span className="text-sm">{item.icon}</span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO - COM ROBÔ */}
        <section
          id="contact"
          className="relative py-24 border-t border-white/5"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/6 via-transparent to-fuchsia-500/6" />
                <div className="relative grid md:grid-cols-12">
                  <div className="md:col-span-7 p-7 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-11 h-11 bg-gradient-to-br from-violet-500/90 to-fuchsia-500/90 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200">
                          Vamos conversar?
                        </h2>
                        <p className="text-zinc-400 text-sm">
                          Estou aberto a novos desafios
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-zinc-300">
                        Se você tem um projeto em mente ou quer discutir
                        oportunidades, ficarei feliz em bater um papo.
                      </p>

                      <motion.a
                        href="mailto:pontesneto2@gmail.com"
                        whileHover={isMobile ? undefined : { scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group/link"
                      >
                        <Mail className="w-5 h-5 text-violet-400 group-hover/link:text-violet-300 transition-colors" />
                        <div className="flex-1">
                          <div className="text-xs text-zinc-400 uppercase tracking-wide">
                            E-mail
                          </div>
                          <div className="text-white font-medium">
                            pontesneto2@gmail.com
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-zinc-400 group-hover/link:text-violet-400 transition-colors" />
                      </motion.a>

                      <div className="flex gap-3 pt-4">
                        <motion.a
                          href="https://github.com/pontesneto2"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={
                            isMobile ? undefined : { scale: 1.06, rotate: 2 }
                          }
                          whileTap={{ scale: 0.94 }}
                          className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                        >
                          <Github className="w-5 h-5 text-zinc-400" />
                          <span className="text-sm text-zinc-300">GitHub</span>
                        </motion.a>

                        <motion.a
                          href="https://www.linkedin.com/in/fcopts"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={
                            isMobile ? undefined : { scale: 1.06, rotate: -2 }
                          }
                          whileTap={{ scale: 0.94 }}
                          className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                        >
                          <Linkedin className="w-5 h-5 text-zinc-400" />
                          <span className="text-sm text-zinc-300">
                            LinkedIn
                          </span>
                        </motion.a>
                      </div>

                      <div className="pt-4">
                        <a
                          href="https://drive.google.com/file/d/1NGGBTy9kzAPm5Os6we_jaeevsU-_zavX/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-violet-300 hover:text-violet-200 transition-colors inline-flex items-center gap-2"
                        >
                          Ver currículo completo
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-white/10 p-7 sm:p-8 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-violet-500/6 via-transparent to-fuchsia-500/6" />
                    <div className="relative">
                      <RobotBuddy
                        size={220}
                        showBackdrop={false}
                        showParticles={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="py-10 border-t border-white/5 text-center text-sm text-zinc-400">
          <div>© {new Date().getFullYear()} Francisco Pontes de Lima Neto</div>
          <div>Todos os Direitos Reservados</div>
        </footer>
      </div>
    </div>
  );
}
