"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage, tr } from "@/lib/language-context";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const { lang } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      if (!res.ok) throw new Error("failed");

      setStatus("success");
      form.reset();
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
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-violet-500/50 transition-colors"
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
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-violet-500/50 transition-colors"
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
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
        />
      </div>

      <button
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
      </button>

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
