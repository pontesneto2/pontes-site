"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { track } from "@vercel/analytics";
import { useLanguage, tr } from "@/lib/language-context";
import { scrollToId } from "./scroll";

export default function FloatingMobileCTA() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("contato") ?? document.querySelector("footer");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-white/10 bg-black/90 p-3 backdrop-blur-md md:hidden">
      <a
        href="https://wa.me/5585981888896"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        onClick={() => track("trabalhe_comigo_whatsapp_click", { source: "mobile_cta" })}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white"
      >
        <MessageCircle className="h-[22px] w-[22px]" />
      </a>
      <a
        href="#proposta"
        onClick={(event) => {
          track("trabalhe_comigo_cta_proposta", { source: "mobile_cta" });
          scrollToId("proposta")(event);
        }}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white"
      >
        {tr(lang, { pt: "Monte sua proposta", en: "Build your proposal" })}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
