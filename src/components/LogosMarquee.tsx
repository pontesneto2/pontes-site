"use client";

import Image from "next/image";

const LOGOS = [
  { src: "/images/logo-governo.webp", alt: "Governo do Ceará", href: "https://www.ceara.gov.br", tone: true },
  { src: "/images/logo-flixbus.png", alt: "FlixBus", scale: 3.4, href: "https://www.flixbus.com" },
  { src: "/images/logo-fedex.png", alt: "FedEx", scale: 2.4, href: "https://www.fedex.com" },
  { src: "/images/logo-idace.png", alt: "Idace", scale: 1.15, href: "https://www.idace.ce.gov.br" },
  { src: "/images/logo-agropolos.webp", alt: "Instituto Agropolos", href: "https://institutoagropolos.org.br" },
  { src: "/images/logo-anjos.png", alt: "Instituto Anjos Digitais", href: "https://anjosdigitais.org" },
  { src: "/images/logo-ceara-sem-fome.png", alt: "Ceará Sem Fome", href: "https://www.ceara.gov.br/tag/ceara-sem-fome/" },
  { src: "/images/logo-com3.png", alt: "Com3 Brasil", scale: 0.85, href: "https://com3brasil.com.br" },
  { src: "/images/logo-movimenta.png", alt: "Movimenta Filmes", href: "https://2.0.movimentafilmes.com" },
  { src: "/images/logo-msff.webp", alt: "Médicos Sem Fronteiras", href: "https://www.msf.org.br" },
  { src: "/images/logo-silva-advs.png", alt: "Silva & Duarte Advogados", scale: 1.15, href: "https://www.silvaeduarteadvogados.com" },
];

export default function LogosMarquee() {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div
      className="lm-marquee overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div className="lm-marquee-track flex w-max items-center gap-12 sm:gap-16">
        {items.map((logo, index) => (
          <a
            key={`${logo.src}-${index}`}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={logo.alt}
            className="relative h-10 w-32 shrink-0 sm:h-12 sm:w-36"
          >
            <div
              className="lm-logo absolute inset-0"
              style={{ transform: `scale(${logo.scale ?? 1})` }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="150px"
                className={
                  logo.tone
                    ? "lm-logo-img lm-logo-img-tone object-contain grayscale contrast-125 brightness-150 opacity-55 transition-all duration-300 hover:opacity-100"
                    : "lm-logo-img object-contain grayscale brightness-0 invert opacity-55 transition-all duration-300 hover:opacity-100"
                }
              />
            </div>
          </a>
        ))}
      </div>
      <style>{`
        .lm-marquee-track {
          animation: lm-marquee 30s linear infinite;
        }
        .lm-marquee:hover .lm-marquee-track {
          animation-play-state: paused;
        }
        @keyframes lm-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lm-marquee-track {
            animation: none;
          }
        }
        .lm-logo-img:hover {
          filter: grayscale(1) brightness(0) invert(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.35));
        }
        .lm-logo-img-tone:hover {
          filter: grayscale(1) contrast(1.25) brightness(1.5) drop-shadow(0 0 8px rgba(255, 255, 255, 0.35));
        }
      `}</style>
    </div>
  );
}
