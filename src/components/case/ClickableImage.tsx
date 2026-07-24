"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

export default function ClickableImage({
  src,
  alt,
  sizes = "(max-width: 1024px) 100vw, 1024px",
  className = "object-cover object-top",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={alt}
        className="group relative block w-full cursor-zoom-in"
      >
        <div className="relative aspect-[16/9] bg-white/[0.03]">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
          <span className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 inline-flex items-center justify-center h-11 w-11 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-sm">
            <ZoomIn className="h-5 w-5" />
          </span>
        </div>
      </button>

      {open && mounted
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div
                className="relative w-full h-full max-w-[92vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={src} alt={alt} fill sizes="92vw" className="object-contain" />
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
