"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";

type Status = "idle" | "loading" | "success" | "error";

const COUNTRY_CODES = [
  { code: "+55", flag: "🇧🇷" },
  { code: "+351", flag: "🇵🇹" },
  { code: "+353", flag: "🇮🇪" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+34", flag: "🇪🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+49", flag: "🇩🇪" },
  { code: "+33", flag: "🇫🇷" },
  { code: "+39", flag: "🇮🇹" },
  { code: "+31", flag: "🇳🇱" },
  { code: "+91", flag: "🇮🇳" },
];

function formatPhone(value: string, countryCode: string) {
  const digits = value.replace(/\D/g, "").slice(0, countryCode === "+55" ? 11 : 15);

  if (countryCode === "+55") {
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

export default function ContactForm() {
  const { lang } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [countryCode, setCountryCode] = useState("+55");
  const [phone, setPhone] = useState("");
  const formLoadedAt = useRef(Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);
    const rawPhone = (data.get("phone") as string)?.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          phone: rawPhone ? `${countryCode} ${rawPhone}` : "",
          company: data.get("company"),
          lang,
          formLoadedAt: formLoadedAt.current,
        }),
      });

      if (!res.ok) throw new Error("failed");

      setStatus("success");
      form.reset();
      setPhone("");
      setCountryCode("+55");
    } catch {
      setStatus("error");
    }
  }

  const t = (pt: string, en: string) => tr(lang, { pt, en });

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Honeypot — hidden from real users, bots tend to fill every field */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="contact-name" className="sr-only">
          {t("Nome", "Name")}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder={t("Seu nome", "Your name")}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder={t("Seu e-mail", "Your email")}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      <div className="flex gap-2">
        <label htmlFor="contact-country-code" className="sr-only">
          {t("Código do país", "Country code")}
        </label>
        <div className="relative w-[104px] shrink-0">
          <select
            id="contact-country-code"
            name="countryCode"
            value={countryCode}
            onChange={(event) => {
              setCountryCode(event.target.value);
              setPhone((current) => formatPhone(current, event.target.value));
            }}
            className="w-full appearance-none rounded-xl bg-white/5 border border-white/10 pl-3 pr-7 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors"
          >
            {COUNTRY_CODES.map(({ code, flag }) => (
              <option key={code} value={code} className="bg-zinc-900">
                {flag} {code}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        </div>

        <label htmlFor="contact-phone" className="sr-only">
          {t("Telefone com DDD", "Phone number")}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(formatPhone(event.target.value, countryCode))}
          placeholder={
            countryCode === "+55" ? t("(85) 91234-5678", "(85) 91234-5678") : t("Telefone", "Phone")
          }
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          {t("Mensagem", "Message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder={t("Conte um pouco sobre o projeto ou oportunidade", "Tell me a bit about the project or opportunity")}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
        />
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-bold shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Mail className="h-4 w-4" />
        )}
        {status === "loading"
          ? t("Enviando...", "Sending...")
          : t("Enviar mensagem", "Send message")}
      </motion.button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          {t("Mensagem enviada! Responderei em breve.", "Message sent! I'll get back to you soon.")}
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          {t(
            "Não consegui enviar agora. Tente pelo e-mail direto abaixo.",
            "Couldn't send it right now. Try the direct email below."
          )}
        </p>
      )}
    </form>
  );
}
