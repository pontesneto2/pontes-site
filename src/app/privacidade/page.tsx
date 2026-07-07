"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage, tr, type Bilingual } from "@/lib/language-context";

const easeOut = [0.16, 1, 0.3, 1] as const;

const sections: Array<{ title: Bilingual; paragraphs: Bilingual[] }> = [
  {
    title: { pt: "Sobre este site", en: "About this site" },
    paragraphs: [
      {
        pt: "Este é o website pessoal de Francisco Pontes, Engenheiro de Software Full Stack. O endereço deste site é https://fcopts.com.br. As informações contidas nesta página visam o cumprimento da Lei Geral de Proteção de Dados — LGPD (Lei nº 13.709, de 14 de agosto de 2018).",
        en: "This is the personal website of Francisco Pontes, Full Stack Software Engineer. This site's address is https://fcopts.com.br. The information on this page aims to comply with Brazil's General Data Protection Law — LGPD (Law No. 13,709, of August 14, 2018).",
      },
    ],
  },
  {
    title: { pt: "Quais dados pessoais são coletados", en: "What personal data is collected" },
    paragraphs: [
      {
        pt: "Formulário de contato: quando você envia o formulário de contato deste site, você fornece nome, e-mail, telefone (opcional) e mensagem. Esses dados são usados exclusivamente para responder ao seu contato e são entregues por e-mail através do serviço Resend, que atua como processador de dados nesse envio. Não compartilhamos, vendemos ou reutilizamos essas informações para outros fins.",
        en: "Contact form: when you submit this site's contact form, you provide your name, email, phone (optional) and message. This data is used exclusively to respond to your contact and is delivered by email through the Resend service, which acts as a data processor for that delivery. We don't share, sell, or reuse this information for any other purpose.",
      },
      {
        pt: "Preferência de idioma: sua escolha entre Português e Inglês é salva no armazenamento local do navegador (localStorage), para lembrar sua preferência em futuras visitas. Esse dado permanece apenas no seu navegador e não é enviado para nossos servidores.",
        en: "Language preference: your choice between Portuguese and English is saved in your browser's local storage (localStorage), to remember your preference on future visits. This data stays only in your browser and is not sent to our servers.",
      },
    ],
  },
  {
    title: { pt: "Conteúdo incorporado de outros sites", en: "Embedded content from other websites" },
    paragraphs: [
      {
        pt: "Esta página inclui uma publicação incorporada do LinkedIn. Esse conteúdo se comporta exatamente como se você estivesse visitando o LinkedIn diretamente: a plataforma pode coletar dados sobre sua visita, usar cookies próprios e monitorar sua interação com o conteúdo incorporado, especialmente se você tiver uma conta e estiver conectado ao LinkedIn. Recomendamos consultar a política de privacidade do LinkedIn para mais detalhes.",
        en: "This page includes an embedded LinkedIn post. That content behaves exactly as if you were visiting LinkedIn directly: the platform may collect data about your visit, use its own cookies, and monitor your interaction with the embedded content, especially if you have an account and are logged into LinkedIn. We recommend checking LinkedIn's own privacy policy for more details.",
      },
    ],
  },
  {
    title: { pt: "Estatísticas de acesso (Vercel Analytics)", en: "Access statistics (Vercel Analytics)" },
    paragraphs: [
      {
        pt: "Este site utiliza o Vercel Analytics para entender, de forma agregada e anônima, quantas pessoas visitam o site e quais páginas são mais acessadas. Essa ferramenta não usa cookies e não coleta informações pessoais identificáveis. Mais detalhes estão disponíveis na política de privacidade da Vercel.",
        en: "This site uses Vercel Analytics to understand, in an aggregated and anonymous way, how many people visit the site and which pages are most accessed. This tool does not use cookies and does not collect personally identifiable information. More details are available in Vercel's privacy policy.",
      },
    ],
  },
  {
    title: { pt: "Hospedagem", en: "Hosting" },
    paragraphs: [
      {
        pt: "Este site é hospedado na Vercel. Como em qualquer serviço de hospedagem web, dados técnicos padrão (como endereço IP e logs de acesso) podem ser processados pela Vercel como parte da operação normal da infraestrutura, para fins de segurança e desempenho.",
        en: "This site is hosted on Vercel. As with any web hosting service, standard technical data (such as IP address and access logs) may be processed by Vercel as part of normal infrastructure operation, for security and performance purposes.",
      },
    ],
  },
  {
    title: { pt: "Por quanto tempo seus dados são mantidos", en: "How long your data is retained" },
    paragraphs: [
      {
        pt: "As mensagens enviadas pelo formulário de contato chegam por e-mail e são mantidas apenas pelo tempo necessário para o atendimento da sua solicitação. Não mantemos um banco de dados de contatos além da própria caixa de e-mail.",
        en: "Messages sent through the contact form arrive by email and are kept only for as long as necessary to handle your request. We don't maintain a separate contacts database beyond the email inbox itself.",
      },
    ],
  },
  {
    title: { pt: "Quais são os seus direitos sobre os seus dados", en: "What are your rights over your data" },
    paragraphs: [
      {
        pt: "De acordo com a LGPD, você pode solicitar a qualquer momento a confirmação de que tratamos seus dados, o acesso a eles, a correção de dados incompletos ou desatualizados, a eliminação dos dados que nos forneceu, ou informações sobre com quem eventualmente os compartilhamos. Para exercer qualquer um desses direitos, entre em contato pelo e-mail pontesneto2@gmail.com.",
        en: "Under LGPD, you may at any time request confirmation that we process your data, access to it, correction of incomplete or outdated data, deletion of the data you provided us, or information about anyone we may have shared it with. To exercise any of these rights, please contact pontesneto2@gmail.com.",
      },
    ],
  },
];

export default function PrivacidadePage() {
  const { lang, setLang } = useLanguage();
  const t = (v: Bilingual) => tr(lang, v);
  const lastUpdated = { pt: "7 de julho de 2026", en: "July 7, 2026" };

  return (
    <div className="min-h-screen font-sans relative isolate">
      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#141418]">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {t({ pt: "Voltar ao portfólio", en: "Back to portfolio" })}
              </Link>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLang("pt")}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    lang === "pt" ? "bg-violet-500 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  PT
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    lang === "en" ? "bg-violet-500 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="mb-10"
          >
            <h1
              className="text-3xl md:text-4xl font-black text-white"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t({ pt: "Política de Privacidade", en: "Privacy Policy" })}
            </h1>
            <p className="mt-3 text-sm text-zinc-400">
              {t({ pt: "Última atualização em", en: "Last updated on" })} {t(lastUpdated)}
            </p>
          </motion.div>

          <div className="relative rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl overflow-hidden p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
            <div className="relative space-y-10">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: easeOut, delay: index * 0.05 }}
                >
                  <h2
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t(section.title)}
                  </h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-sm text-zinc-300 leading-relaxed">
                        {t(p)}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        <footer className="py-10 border-t border-white/5 text-center text-[11px] text-zinc-400">
          <div>
            {t({ pt: "Feito à mão", en: "Handmade" })} | © 2026 Francisco Pontes
          </div>
        </footer>
      </div>
    </div>
  );
}
