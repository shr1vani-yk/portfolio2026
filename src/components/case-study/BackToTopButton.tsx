"use client";

import { useState, useEffect } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show button once user has scrolled past hero / top section (350px)
          setIsVisible(window.scrollY > 350);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 group inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider border border-border-subtle bg-surface/90 dark:bg-surface-elevated/90 backdrop-blur-md text-foreground hover:bg-surface-hover hover:border-border-strong/60 shadow-md shadow-black/5 dark:shadow-black/40 transition-all duration-300 ease-out cursor-pointer active:scale-95 select-none ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <PhosphorIcons.ArrowUpIcon
        size={13}
        weight="bold"
        className="transition-transform duration-200 group-hover:-translate-y-0.5"
      />
      <span>Back To Top</span>
    </button>
  );
}

export default BackToTopButton;
