"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket, MonitorSmartphone, Globe, Code,
  Mail, Github, Linkedin, ExternalLink, Lock,
  Layers, Server, Cloud, Palette
} from 'lucide-react';

const FloatingIcons3D = dynamic(() => import("@/components/FloatingIcons3D"), {
  ssr: false,
});

export default function Page() {
  const [navOpen, setNavOpen] = useState(false);

  const getProjectThumb = (link?: string) => {
    if (!link) return "";
    const safe = link.trim();
    if (!safe) return "";
    return `https://image.thum.io/get/width/1200/crop/900/${safe}`;
  };

  const featuredProjects = [
    {
      title: "Silva e Duarte Advogados",
      tags: ["React", "Next.js", "Node.js", "UX/UI", "Responsivo"],
      link: "https://silvaeduarteadvogados.com/",
      blurb: "Website institucional moderno para escritório de advocacia com foco em credibilidade, profissionalismo e experiência do usuário. Design clean, navegação intuitiva e otimização para conversão de clientes.",
      category: "Website Institucional",
      thumb: getProjectThumb("https://silvaeduarteadvogados.com/")
    },
    {
      title: "Aplicativo de Mídia OOH — Plataforma DOOH",
      tags: ["React Native", "Expo", "Node.js", "Express", "PostgreSQL", "Docker", "Grafana"],
      link: "",
      blurb: "Plataforma completa conectando painéis digitais, campanhas publicitárias e métricas em tempo real. Arquitetura escalável com atuação end-to-end em DevOps e UX-Ops. (Projeto privado em desenvolvimento)",
      category: "Desenvolvimento Full JS",
      thumb: ""
    },
    {
      title: "Valor Certo Financeira",
      tags: ["WordPress", "Elementor", "Custom CSS", "SEO", "Analytics"],
      link: "https://valorcertofinanceira.com.br/",
      blurb: "Website institucional de alta conversão com simuladores financeiros integrados. Foco em performance, SEO técnico e governança de conteúdo.",
      category: "Website & Conversão",
      thumb: getProjectThumb("https://valorcertofinanceira.com.br/")
    },
    {
      title: "i3Brasil MIO — Experience Design",
      tags: ["UX/UI", "Design System", "Prototipação", "Figma", "High-Fidelity"],
      link: "",
      blurb: "Jornada digital completa para plataforma de investimento imobiliário fracionado de alto padrão, com foco em confiança, exclusividade e usabilidade. (Projeto privado entregue)",
      category: "UX Ops",
      thumb: ""
    },
    {
      title: "Meoocarro — App (em desenvolvimento)",
      tags: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL"],
      link: "",
      blurb: "Aplicativo mobile em desenvolvimento com foco em jornada simples e rápida: catálogo, busca, captação de leads e fluxo de atendimento. Arquitetura preparada para escalar com métricas e evolução contínua.",
      category: "Aplicativo Mobile",
      thumb: ""
    },
  ];

  const additionalProjects = [
    {
      name: "Sistema Especial Fazenda Chapéu",
      tech: ["PHP", "JavaScript", "Scriptcase", "PostgreSQL", "Git", "Testes Automatizados"],
      desc: "Secretaria de Desenvolvimento Agrário do Ceará - Regularização fundiária"
    },
    {
      name: "Sistema Financeiro ERP Estrela",
      tech: ["Node.js", "React", "PostgreSQL", "Docker", "APIs", "Observabilidade"],
      desc: "ERP financeiro para rotinas de contas a pagar/receber, conciliação, relatórios e governança de dados. Foco em confiabilidade, performance e rastreabilidade."
    },
    {
      name: "Sistema SIGMA",
      tech: ["Node.js", "React", "PostgreSQL", "Express"],
      desc: "Instituto Agropolos do Ceará - Sistema de Gestão"
    },
    {
      name: "Sistema de Inscrições - Letramento Digital",
      tech: ["JavaScript", "WordPress", "PHP"],
      desc: "Inclusão digital pelo Brasil"
    },
  ];

  const websites = [
    {
      url: "https://starcapital.stargrupo.com.br/",
      name: "Star Capital",
      desc: "Website institucional com foco em credibilidade, performance e clareza de proposta."
    },
    {
      url: "https://www.stargrupo.com.br/",
      name: "Star Grupo",
      desc: "Presença digital corporativa com estrutura de navegação e conteúdo orientados a conversão."
    },
    {
      url: "https://starpesquisas.stargrupo.com.br/",
      name: "Star Pesquisas",
      desc: "Landing institucional para serviços de pesquisa, com copy objetiva e escaneável."
    },
    {
      url: "https://starreciclagem.stargrupo.com.br/",
      name: "Star Reciclagem",
      desc: "Website com posicionamento sustentável e foco em serviços e captação de contatos."
    },
    {
      url: "https://silvaeduarteadvogados.com/",
      name: "Silva e Duarte Advogados",
      desc: "Institucional moderno com foco em credibilidade e geração de leads."
    },
    {
      url: "https://2.0.movimentafilmes.com/",
      name: "Movimenta Filmes",
      desc: "Portfólio com destaque para identidade visual e experiência de navegação."
    },
    {
      url: "https://anjosdigitais.org",
      name: "Anjos Digitais",
      desc: "Website de impacto social com estrutura clara de conteúdo e chamadas para ação."
    },
    {
      url: "https://institutoagropolos.org.br",
      name: "Instituto Agropolos",
      desc: "Institucional com organização de conteúdo, performance e manutenção simplificada."
    },
    {
      url: "https://fastcall.com.br/2.0",
      name: "FastCall 2.0",
      desc: "Site com foco em conversão e comunicação objetiva do serviço."
    },
    {
      url: "https://com3brasil.com.br/wp",
      name: "COM3 Brasil",
      desc: "Website corporativo com gestão de conteúdo e melhorias contínuas de UX."
    },
    {
      url: "https://www.sda.ce.gov.br",
      name: "SDA Ceará",
      desc: "Portal institucional com governança de conteúdo e acesso rápido a serviços."
    },
    {
      url: "https://sistemas2.sda.ce.gov.br",
      name: "Sistemas SDA",
      desc: "Hub de sistemas com navegação padronizada e foco em usabilidade."
    },
    {
      url: "https://www.clicksoftwarehouse.com/",
      name: "Click Software House",
      desc: "Website institucional com foco em posicionamento, clareza de serviços e conversão."
    },
  ];

  const experience = [
    {
      company: "Grupo Star Capital",
      role: "Engenheiro de Software Sênior | Gerente de Projetos",
      period: "2025"
    },
    {
      company: "Instituto Anjos Digitais",
      role: "Desenvolvedor Sênior de Produtos Digitais | Gerente de Projetos",
      period: "2023–2025"
    },
    {
      company: "Secretaria do Desenvolvimento Agrário (CE)",
      role: "Desenvolvedor Fullstack | Product Designer",
      period: "2021–2023"
    },
    {
      company: "Instituto Agropolos do Ceará",
      role: "Desenvolvedor Fullstack | Product Designer",
      period: "2021–2023"
    },
    {
      company: "Com3 Brasil",
      role: "Desenvolvedor Fullstack | UX/UI Designer",
      period: "2020–2021"
    },
    {
      company: "Grupo Laredo Atacado e Varejo",
      role: "Gerente Operacional de Mercado",
      period: "2018–2020"
    }
  ];

  return (
    <div className="min-h-screen font-sans relative isolate">
      <FloatingIcons3D />

      <div className="relative z-10">

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo com P */}
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500 shadow-[0_0_40px_rgba(168,85,247,0.35)] flex items-center justify-center">
                <span className="text-white font-black text-xl">P</span>
              </div>
              {/* Marca FCOPTS */}
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-[0.15em] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  FCOPTS
                </span>
                <span className="text-[10px] text-zinc-500 tracking-wide -mt-0.5">
                  Senior Software Engineer · UX Ops
                </span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#services" className="hover:text-white/90 text-zinc-300">Serviços</a>
              <a href="#projects" className="hover:text-white/90 text-zinc-300">Portfólio</a>
              <a href="#stack" className="hover:text-white/90 text-zinc-300">Stack</a>
              <a href="#about" className="hover:text-white/90 text-zinc-300">Sobre</a>
              <a href="#contact" className="hover:text-white/90 text-zinc-300">Contato</a>
              <a
                href="https://drive.google.com/file/d/1NGGBTy9kzAPm5Os6we_jaeevsU-_zavX/view?usp=sharing"
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-700/20"
              >
                Baixar CV
              </a>
            </nav>
            <button className="md:hidden rounded-xl border border-white/10 p-2" onClick={() => setNavOpen(!navOpen)}>
              <span className="sr-only">Abrir menu</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-white/5 bg-black/50">
            <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3">
              {[
                { href: "#services", label: "Serviços" },
                { href: "#projects", label: "Portfólio" },
                { href: "#stack", label: "Stack" },
                { href: "#about", label: "Sobre" },
                { href: "#contact", label: "Contato" },
              ].map(i => <a key={i.href} href={i.href} className="text-zinc-300">{i.label}</a>)}
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
            transition={{ duration: 0.8 }}
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 drop-shadow-[0_0_50px_rgba(168,85,247,0.5)]">
                Francisco
              </span>
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mt-2">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-violet-300 to-fuchsia-300 drop-shadow-[0_0_50px_rgba(217,70,239,0.5)]">
                Pontes
              </span>
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 max-w-4xl mx-auto mb-12"
          >
            Do esboço ao deploy:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300 font-semibold">
              design, engenharia e impacto real.
            </span>
          </motion.p>

          {/* Highlights rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
          >
            {[
              "Arquitetura & Produto",
              "CI/CD & Observabilidade",
              "Performance & UX",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm bg-white/5 border border-white/10 text-zinc-300 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-2xl px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-lg font-semibold shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105"
            >
              <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              Ver portfólio
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 border-2 border-white/20 backdrop-blur-sm text-lg font-semibold hover:bg-white/5 hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              <Mail className="h-6 w-6" />
              Fale comigo
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
                      href="https://www.linkedin.com/in/fcopts"
        {/* Scroll Indicator - CENTRALIZADO (relativo à seção inteira) */}
        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.8 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
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
      <section id="services" className="relative py-16 md:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Card com múltiplas camadas de destaque */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow effect externo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 rounded-3xl blur-2xl opacity-20 animate-pulse" />

            {/* Card principal */}
            <div className="relative rounded-3xl border-2 border-violet-500/50 p-8 md:p-12 bg-gradient-to-br from-black/90 via-violet-950/30 to-black/90 backdrop-blur-xl shadow-2xl">
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
                  Do <span className="text-violet-300 font-semibold">discovery</span> ao <span className="text-fuchsia-300 font-semibold">deploy</span>: requisitos, protótipos, desenvolvimento, integrações, CI/CD e observabilidade.
                  <br />
                  <span className="text-white font-medium">Tecnologia + Padrão + Rentabilidade</span> para entregar valor real.
                </p>

                {/* Grid de serviços com ícones */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: MonitorSmartphone, label: "Aplicativos Mobile", desc: "" },
                    { icon: Globe, label: "Sistemas Web", desc: "" },
                    { icon: Rocket, label: "Websites de Alta Conversão", desc: "" },
                    { icon: Code, label: "Integrações & APIs", desc: "" }
                  ].map(item => (
                    <div key={item.label} className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300">
                      <item.icon className="h-8 w-8 text-violet-400 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-white text-sm leading-tight">{item.label}</h3>
                      <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Proposta de Valor */}
                <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
                  <p className="text-lg text-center text-zinc-200 leading-relaxed">
                    <span className="text-white font-semibold">Me diga o que você quer</span> e eu te entrego a{" "}
                    <span className="text-violet-300 font-semibold">solução pronta para uso</span>,{" "}
                    <span className="text-fuchsia-300 font-semibold">rápido</span> e nos{" "}
                    <span className="text-white font-semibold">padrões tecnológicos mais atuais</span>.
                  </p>
                </div>

                {/* CTA forte */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-lg font-bold shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105"
                  >
                    <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Iniciar Projeto
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 border-2 border-white/20 backdrop-blur-sm text-lg font-semibold hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Ver Casos de Sucesso
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJETOS EM DESTAQUE - REDESENHADO */}
      <section id="projects" className="relative py-24 border-t border-white/5 bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                Projetos em Destaque
              </span>
            </h2>
            <p className="text-sm text-zinc-500">Seleção de entregas técnicas e resultados mensuráveis</p>
          </div>

          {/* Cards de projetos principais - Mais elegantes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {featuredProjects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="group relative rounded-3xl border border-white/10 bg-black/75 backdrop-blur-xl p-8 hover:bg-black/80 hover:border-violet-500/40 transition-all duration-500 shadow-xl"
              >
                {/* Badge de categoria */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {project.category}
                  </span>
                </div>

                {/* Miniatura do projeto */}
                <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
                  {project.thumb ? (
                    <img
                      src={project.thumb}
                      alt={`Capa do projeto: ${project.title}`}
                      loading="lazy"
                      className="h-36 w-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="h-36 w-full bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-violet-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {project.blurb}
                </p>

                {/* Tags estilizadas */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-lg bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:border-violet-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

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
              </motion.article>
            ))}
          </div>

          {/* Outros projetos e websites - Grid compacto */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sistemas desenvolvidos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl border border-white/10 bg-black/55 backdrop-blur-xl p-6"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Code className="h-5 w-5 text-violet-400" />
                Sistemas & Plataformas
              </h3>
              <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                <span className="text-violet-400 font-medium">Desenvolvo sistemas 100% personalizados</span> para a sua necessidade: gestão financeira, fluxo de caixa, diário de obra, controle de estoque, CRM, ERP e muito mais. Do zero ao deploy.
              </p>
              <div className="space-y-3">
                {additionalProjects.map(proj => (
                  <div key={proj.name} className="group relative p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-all">
                    {/* Badge de projeto privado - canto superior direito */}
                    <div className="absolute top-3 right-3">
                      <Lock className="h-3 w-3 text-zinc-600" />
                    </div>
                    <h4 className="font-medium text-sm mb-1 group-hover:text-violet-300 transition-colors pr-6">{proj.name}</h4>
                    <p className="text-xs text-zinc-500 mb-2">{proj.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/70 text-zinc-400 border border-zinc-700/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Websites desenvolvidos */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl border border-white/10 bg-black/55 backdrop-blur-xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-fuchsia-400" />
                Websites Publicados
              </h3>
              <div className="space-y-2">
                {websites.map(site => (
                  <a
                    key={site.url}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-fuchsia-500/30 hover:bg-zinc-900/70 transition-all"
                  >
                    <div className="min-w-0">
                      <div className="text-sm text-zinc-300 group-hover:text-fuchsia-300 transition-colors truncate">
                        {site.name}
                      </div>
                      <div className="text-[11px] text-zinc-500 leading-snug mt-0.5 line-clamp-2">
                        {site.desc}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-fuchsia-400 transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experience.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-violet-500/20 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-semibold text-sm text-white flex-1">{exp.company}</h4>
                  <span className="text-[9px] text-violet-400 bg-violet-500/10 px-2 py-1 rounded border border-violet-500/20 whitespace-nowrap font-semibold">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-violet-300">{exp.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK PREFERIDA - PREMIUM & MINIMALISTA */}
      <section id="stack" className="relative py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Título */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                Stack Preferida
              </span>
            </h2>
            <p className="text-sm text-zinc-500">Ferramentas e práticas para entregar valor técnico com excelência</p>
          </div>

          {/* Grid de Stack */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Front-end",
                icon: Layers,
                intro: "Construção de interfaces modernas, performáticas e orientadas à experiência do usuário.",
                techs: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS", "Framer Motion", "Vue.js", "WordPress"]
              },
              {
                title: "Back-end",
                icon: Server,
                intro: "Arquiteturas escaláveis e seguras, com foco em alta disponibilidade e integridade dos dados.",
                techs: ["Node.js", "Express.js", "PHP", "PostgreSQL", "MySQL", "MongoDB", "REST APIs", "GraphQL", "Prisma ORM", "Firebase"]
              },
              {
                title: "DevOps & Infraestrutura",
                icon: Cloud,
                intro: "Cultura de automação, observabilidade e entrega contínua para garantir confiabilidade em escala.",
                techs: ["Docker", "CI/CD", "GitHub Actions", "Prometheus", "Grafana", "AWS", "Azure", "Vercel", "Nginx", "Sentry"]
              },
              {
                title: "UX/UI & Produto",
                icon: Palette,
                intro: "Design centrado no usuário aliado à estratégia de produto para criar experiências digitais consistentes.",
                techs: ["Figma", "Design Systems", "Prototipação", "Wireframes", "User Research", "Testes de Usabilidade", "Acessibilidade", "Design Tokens"]
              }
            ].map((stack, idx) => (
              <motion.article
                key={stack.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-xl p-8 hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 shadow-xl"
              >
                {/* Glow sutil no hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/0 via-violet-500/10 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Orbe de fundo animado */}
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10">
                  {/* Cabeçalho */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500">
                      <stack.icon className="h-6 w-6 text-violet-400 group-hover:text-violet-300 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-100 transition-colors duration-300">{stack.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{stack.intro}</p>
                    </div>
                  </div>

                  {/* Tecnologias */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {stack.techs.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + i * 0.03, duration: 0.3 }}
                        className="inline-block px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-xs text-zinc-300 hover:border-violet-500/40 hover:text-white hover:bg-zinc-800/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
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
                    <img src="/pontes.jpg" alt="Francisco Pontes" className="w-full h-full object-cover" />
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

                <div className="space-y-4 text-zinc-300 leading-relaxed">
                  <p>
                    <span className="text-white font-semibold">Senior Software Engineer</span> com atuação em <span className="text-violet-300 font-semibold">Web/Mobile</span>, <span className="text-fuchsia-300 font-semibold">DevOps</span> e <span className="text-white font-semibold">UX/UI</span>.
                    Meu foco é transformar objetivos de negócio em produto funcionando: arquitetura bem definida, entrega previsível e experiência consistente.
                  </p>
                  <p>
                    Experiência em <span className="text-violet-300">setor público</span> com sistemas críticos e modernização orientada à usabilidade.
                    No <span className="text-fuchsia-300">setor privado</span>, desenho soluções escaláveis, automatizo CI/CD, fortaleço observabilidade e garanto ambientes confiáveis para evolução contínua.
                  </p>
                  <p className="text-sm text-zinc-400">
                    Formação em ADS, especializações em Full-Stack e UX/UI @EBAC. Cursando pós em Engenharia de Software + DevOps @UNIFOR e segunda graduação em Ciência da Computação.
                  </p>
                </div>

                {/* Tags redesenhadas e alinhadas */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    { icon: "🎯", label: "Visão de produto" },
                    { icon: "⚡", label: "Performance" },
                    { icon: "🔧", label: "Boas práticas" },
                    { icon: "🚀", label: "Impacto real" }
                  ].map(item => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 text-sm font-medium hover:border-violet-500/40 transition-all"
                    >
                      <span className="text-base">{item.icon}</span>
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
      <section id="contact" className="relative py-24 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Card de Contato */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative bg-black/70 backdrop-blur-xl border border-white/10 group-hover:border-violet-500/30 rounded-2xl p-8 shadow-2xl group-hover:shadow-violet-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-violet-500/50 transition-shadow duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300 group-hover:from-violet-300 group-hover:to-fuchsia-300 transition-all duration-300">
                      Vamos conversar?
                    </h2>
                    <p className="text-zinc-400 text-sm">Estou sempre aberto a novos desafios</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-zinc-300">
                    Se você tem um projeto em mente ou quer discutir oportunidades,
                    ficarei feliz em bater um papo.
                  </p>

                  <motion.a
                    href="mailto:pontesneto2@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group/link"
                  >
                    <Mail className="w-5 h-5 text-violet-400 group-hover/link:text-violet-300 transition-colors" />
                    <div className="flex-1">
                      <div className="text-xs text-zinc-400 uppercase tracking-wide">E-mail</div>
                      <div className="text-white font-medium">pontesneto2@gmail.com</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-400 group-hover/link:text-violet-400 transition-colors" />
                  </motion.a>

                  <div className="flex gap-3 pt-4">
                    <motion.a
                      href="https://github.com/pontesneto2"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                    >
                      <Github className="w-5 h-5 text-zinc-400" />
                      <span className="text-sm text-zinc-300">GitHub</span>
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/fcopts"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                    >
                      <Linkedin className="w-5 h-5 text-zinc-400" />
                      <span className="text-sm text-zinc-300">LinkedIn</span>
                    </motion.a>
                  </div>

                  <div className="pt-4 text-center">
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
            </motion.div>

            {/* Robô Animado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              {/* Círculo de fundo pulsante */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-96 h-96 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl"
              />

              {/* Robô SVG animado */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <svg width="280" height="280" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Antena */}
                  <motion.line
                    x1="100" y1="30" x2="100" y2="50"
                    stroke="url(#gradient1b)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={{ strokeWidth: [3, 4, 3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="100" cy="25" r="5"
                    fill="url(#gradient1b)"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Cabeça */}
                  <rect x="70" y="50" width="60" height="50" rx="8" fill="url(#gradient2b)" stroke="white" strokeWidth="2" opacity="0.9"/>

                  {/* Olhos */}
                  <motion.circle
                    cx="85" cy="70" r="6"
                    fill="#a855f7"
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  />
                  <motion.circle
                    cx="115" cy="70" r="6"
                    fill="#a855f7"
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  />

                  {/* Boca sorridente */}
                  <motion.path
                    d="M 85 85 Q 100 92 115 85"
                    stroke="#d946ef"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    animate={{ d: ["M 85 85 Q 100 92 115 85", "M 85 85 Q 100 95 115 85", "M 85 85 Q 100 92 115 85"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  {/* Corpo */}
                  <rect x="60" y="105" width="80" height="70" rx="10" fill="url(#gradient3b)" stroke="white" strokeWidth="2" opacity="0.9"/>

                  {/* Detalhes do corpo */}
                  <motion.circle
                    cx="100" cy="130" r="8"
                    fill="none"
                    stroke="#d946ef"
                    strokeWidth="2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <line x1="75" y1="150" x2="125" y2="150" stroke="white" strokeWidth="2" opacity="0.3"/>
                  <line x1="75" y1="160" x2="125" y2="160" stroke="white" strokeWidth="2" opacity="0.3"/>

                  {/* Braços */}
                  <motion.rect
                    x="40" y="110" width="15" height="40" rx="7"
                    fill="url(#gradient4b)"
                    stroke="white"
                    strokeWidth="1.5"
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ transformOrigin: "47.5px 115px" }}
                  />
                  <motion.rect
                    x="145" y="110" width="15" height="40" rx="7"
                    fill="url(#gradient4b)"
                    stroke="white"
                    strokeWidth="1.5"
                    animate={{ rotate: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ transformOrigin: "152.5px 115px" }}
                  />

                  {/* Pernas */}
                  <rect x="75" y="180" width="18" height="35" rx="5" fill="url(#gradient5b)" stroke="white" strokeWidth="1.5"/>
                  <rect x="107" y="180" width="18" height="35" rx="5" fill="url(#gradient5b)" stroke="white" strokeWidth="1.5"/>

                  {/* Gradientes */}
                  <defs>
                    <linearGradient id="gradient1b" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7"/>
                      <stop offset="100%" stopColor="#d946ef"/>
                    </linearGradient>
                    <linearGradient id="gradient2b" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1a1a2e"/>
                      <stop offset="100%" stopColor="#16213e"/>
                    </linearGradient>
                    <linearGradient id="gradient3b" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0f0f23"/>
                      <stop offset="100%" stopColor="#1a1a2e"/>
                    </linearGradient>
                    <linearGradient id="gradient4b" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1a1a2e"/>
                      <stop offset="100%" stopColor="#0f0f23"/>
                    </linearGradient>
                    <linearGradient id="gradient5b" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#16213e"/>
                      <stop offset="100%" stopColor="#0f0f23"/>
                    </linearGradient>
                  </defs>
                </svg>

                {/* Partículas flutuantes */}
                <motion.div
                  className="absolute top-10 left-10 w-2 h-2 bg-violet-400 rounded-full"
                  animate={{
                    y: [-20, -60],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <motion.div
                  className="absolute top-20 right-10 w-2 h-2 bg-fuchsia-400 rounded-full"
                  animate={{
                    y: [-20, -60],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: 0.5,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

        <footer className="py-10 border-t border-white/5 text-center text-sm text-zinc-400">
          © {new Date().getFullYear()} Francisco Pontes de Lima Neto. Todos os Direitos Reservados.
        </footer>
      </div>
    </div>
  );
}
