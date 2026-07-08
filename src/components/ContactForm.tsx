"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Mail, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";

type Status = "idle" | "loading" | "success" | "error";

const MIN_MESSAGE_LENGTH = 20;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[\p{L}][\p{L}\s'’-]{1,}$/u;

function isValidName(value: string) {
  return NAME_REGEX.test(value.trim());
}

function isValidEmail(value: string) {
  return EMAIL_REGEX.test(value.trim());
}

function isValidPhone(value: string, countryCode: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return true; // phone is optional
  return countryCode === "+55" ? digits.length === 10 || digits.length === 11 : digits.length >= 8;
}

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+55");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });
  const formLoadedAt = useRef(Date.now());

  const nameValid = isValidName(name);
  const emailValid = isValidEmail(email);
  const phoneValid = isValidPhone(phone, countryCode);
  const markTouched = (field: keyof typeof touched) =>
    setTouched((current) => ({ ...current, [field]: true }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, phone: true });

    if (!nameValid || !emailValid || !phoneValid) return;

    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);
    const rawPhone = phone.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
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
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCountryCode("+55");
      setConsent(false);
      setTouched({ name: false, email: false, phone: false });
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
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => markTouched("name")}
          aria-invalid={touched.name && !nameValid}
          placeholder={t("Seu nome", "Your name")}
          className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${
            touched.name && !nameValid
              ? "border-red-500/60 focus:border-red-500/60"
              : "border-white/10 focus:border-violet-500/50"
          }`}
        />
        {touched.name && !nameValid && (
          <p className="mt-1 text-xs text-red-400">
            {t("Digite um nome válido", "Enter a valid name")}
          </p>
        )}
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => markTouched("email")}
          aria-invalid={touched.email && !emailValid}
          placeholder={t("Seu e-mail", "Your email")}
          className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${
            touched.email && !emailValid
              ? "border-red-500/60 focus:border-red-500/60"
              : "border-white/10 focus:border-violet-500/50"
          }`}
        />
        {touched.email && !emailValid && (
          <p className="mt-1 text-xs text-red-400">
            {t("Digite um e-mail válido", "Enter a valid email")}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <label htmlFor="contact-country-code" className="sr-only">
          {t("Código do país", "Country code")}
        </label>
        <div className="relative w-[128px] shrink-0">
          <select
            id="contact-country-code"
            name="countryCode"
            value={countryCode}
            onChange={(event) => {
              setCountryCode(event.target.value);
              setPhone((current) => formatPhone(current, event.target.value));
            }}
            className="w-full appearance-none rounded-xl bg-white/5 border border-white/10 pl-4 pr-9 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors"
          >
            {COUNTRY_CODES.map(({ code, flag }) => (
              <option key={code} value={code} className="bg-zinc-900">
                {flag}&nbsp;&nbsp;{code}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
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
          onBlur={() => markTouched("phone")}
          aria-invalid={touched.phone && !phoneValid}
          placeholder={
            countryCode === "+55" ? t("(85) 91234-5678", "(85) 91234-5678") : t("Telefone", "Phone")
          }
          className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${
            touched.phone && !phoneValid
              ? "border-red-500/60 focus:border-red-500/60"
              : "border-white/10 focus:border-violet-500/50"
          }`}
        />
      </div>
      {touched.phone && !phoneValid && (
        <p className="-mt-2 text-xs text-red-400">
          {t("Telefone incompleto — confira o DDD e o número", "Incomplete phone — check the area code and number")}
        </p>
      )}

      <div>
        <label htmlFor="contact-message" className="sr-only">
          {t("Mensagem", "Message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={MIN_MESSAGE_LENGTH}
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t("Conte um pouco sobre o projeto ou oportunidade", "Tell me a bit about the project or opportunity")}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
        />
        <p
          className={`mt-1 text-right text-xs ${
            message.trim().length >= MIN_MESSAGE_LENGTH ? "text-zinc-500" : "text-amber-400"
          }`}
        >
          {message.trim().length}/{MIN_MESSAGE_LENGTH}{" "}
          {t("caracteres mínimos", "minimum characters")}
        </p>
      </div>

      <label
        htmlFor="contact-consent"
        className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed cursor-pointer"
      >
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        />
        <span>
          {t("Li e concordo com a ", "I've read and agree to the ")}
          <Link
            href="/privacidade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-300 underline underline-offset-2 hover:text-violet-200"
          >
            {t("Política de Privacidade", "Privacy Policy")}
          </Link>
          {t(
            ". Seus dados serão usados só para eu te responder — nada de spam, prometo 🙂",
            ". Your data will only be used so I can reply to you — no spam, promise 🙂"
          )}
        </span>
      </label>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        type="submit"
        disabled={
          status === "loading" ||
          !consent ||
          !nameValid ||
          !emailValid ||
          !phoneValid ||
          message.trim().length < MIN_MESSAGE_LENGTH
        }
        title={
          !consent
            ? t("Marque a caixinha acima para enviar", "Check the box above to send")
            : !nameValid
              ? t("Digite um nome válido", "Enter a valid name")
              : !emailValid
                ? t("Digite um e-mail válido", "Enter a valid email")
                : !phoneValid
                  ? t("Telefone incompleto", "Incomplete phone")
                  : message.trim().length < MIN_MESSAGE_LENGTH
                    ? t("Escreva uma mensagem mais detalhada", "Write a more detailed message")
                    : undefined
        }
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-bold shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
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
