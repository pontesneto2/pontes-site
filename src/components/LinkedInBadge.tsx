"use client";

import Script from "next/script";
import { useLanguage } from "@/lib/language-context";

export default function LinkedInBadge() {
  const { lang } = useLanguage();

  return (
    <>
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
      />
      <div
        className="badge-base LI-profile-badge"
        data-locale={lang === "pt" ? "pt_BR" : "en_US"}
        data-size="medium"
        data-theme="dark"
        data-type="HORIZONTAL"
        data-vanity="fcopts"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://br.linkedin.com/in/fcopts?trk=profile-badge"
        >
          Francisco Pontes
        </a>
      </div>
    </>
  );
}
