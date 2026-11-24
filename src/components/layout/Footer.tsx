"use client";

import Image from "next/image";

interface FooterProps {
  backToTopHref?: string;
  className?: string;
}

export function Footer({
  backToTopHref = "#",
  className = "",
}: FooterProps) {
  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (backToTopHref === "#" || !backToTopHref) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (backToTopHref.startsWith("#")) {
      const target = document.querySelector(backToTopHref);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      className={`relative w-full pt-6 sm:pt-8 pb-4 sm:pb-6 border-t border-border-subtle flex flex-col gap-4 sm:gap-5 md:gap-6 ${className}`}
    >
      {/* 1. Top Sub-Navigation Bar: Just A Hello Away & Back To Top */}
      <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-mono tracking-widest uppercase text-muted-foreground select-none">
        <span>JUST A HELLO AWAY.</span>
        <a
          href={backToTopHref}
          onClick={handleBackToTop}
          className="hover:text-foreground transition-colors cursor-pointer"
          aria-label="Back to top of page"
        >
          BACK TO TOP
        </a>
      </div>

      {/* 2. Main Central "Let's Talk" Card Container */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-[310px] sm:max-w-[340px] md:max-w-[360px] rounded-2xl sm:rounded-[24px] bg-white dark:bg-[#232323] border border-neutral-900/85 dark:border-white/10 shadow-xs dark:shadow-xl dark:shadow-black/40 p-3.5 sm:p-4 md:p-4.5 flex flex-col gap-2.5 sm:gap-3 select-none transition-colors duration-200">
          {/* Card Header: Title on left, say hello badge on right */}
          <div className="w-full flex items-center justify-between px-0.5">
            <h2 className="font-sans font-regular text-base sm:text-lg text-neutral-950 dark:text-white leading-none">
              Fancy a chat?
            </h2>
            <a
              href="mailto:shravanisutarwork@gmail.com"
              className="inline-flex items-center justify-center px-2.5 sm:px-3 py-1.5 rounded-full bg-black text-white text-[10px] sm:text-[11px] font-sans font-light hover:bg-neutral-800 transition-colors shadow-2xs leading-normal"
              aria-label="Send email to say hello"
            >
              say hello
            </a>
          </div>

          {/* 3 Interactive Contact Cards: Equal dimensions, straight sides, 3.5° rotated Email layered on top */}
          <div className="w-full flex items-center justify-center -space-x-1.5 sm:-space-x-2 md:-space-x-2.5 pt-1 pb-1">
            {/* LinkedIn Card (Straight, Bottom Layer) */}
            <a
              href="https://www.linkedin.com/in/shravanisutar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Shravani Sutar on LinkedIn"
              className="relative z-10 hover:z-30 w-[78px] h-[78px] sm:w-[90px] sm:h-[90px] md:w-[98px] md:h-[98px] aspect-square shrink-0 transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Image
                src="/images/footer/tab1.png"
                alt="LinkedIn"
                fill
                sizes="(max-width: 640px) 78px, 98px"
                className="object-contain pointer-events-none"
                priority
              />
            </a>

            {/* Email Card (Rotated 3.5°, Layered Above Others) */}
            <a
              href="mailto:shravanisutarwork@gmail.com"
              aria-label="Send email to Shravani Sutar"
              className="relative z-20 hover:z-30 w-[78px] h-[78px] sm:w-[90px] sm:h-[90px] md:w-[98px] md:h-[98px] aspect-square shrink-0 rotate-[3.5deg] drop-shadow-[-2.93px_2.35px_3px_rgba(0,0,0,0.50)transition-transform duration-200 hover:rotate-0 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Image
                src="/images/footer/tab2.png"
                alt="Email"
                fill
                sizes="(max-width: 640px) 78px, 98px"
                className="object-contain pointer-events-none"
                priority
              />
            </a>

            {/* Instagram Card (Straight, Bottom Layer) */}
            <a
              href="https://www.instagram.com/designft.shrav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Shravani Sutar on Instagram"
              className="relative z-20 hover:z-30 w-[78px] h-[78px] sm:w-[90px] sm:h-[90px] md:w-[98px] md:h-[98px] aspect-square shrink-0 transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-[-1.76px_2.35px_5px_rgba(0,0,0,0.25)"
            >
              <Image
                src="/images/footer/tab3.png"
                alt="Instagram"
                fill
                sizes="(max-width: 640px) 78px, 98px"
                className="object-contain pointer-events-none"
                priority
              />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Heroic Statement: A space where [idea's] meet [action] */}
      <div className="w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 text-center select-none pt-0.5 sm:pt-1">
        <span className="font-sans text-base sm:text-lg md:text-xl font-light text-foreground leading-relaxed">
          A space where
        </span>
        <span className="inline-flex items-center justify-center px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-[#4662dc] text-white font-sans text-base sm:text-lg md:text-xl font-light leading-none shadow-xs">
          idea&apos;s
        </span>
        <span className="font-sans text-base sm:text-lg md:text-xl font-light text-foreground leading-relaxed">
          meet
        </span>
        <span className="inline-flex items-center justify-center px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-[#4662dc] text-white font-sans text-base sm:text-lg md:text-xl font-light leading-none shadow-xs">
          action
        </span>
      </div>

      {/* 4. Subtle Bottom Copyright Colophon */}
      <div className="w-full text-center select-none pt-0 pb-0.5">
        <p className="font-sans text-[11px] sm:text-xs text-muted-foreground/65 font-light leading-none">
          &copy; copyright shravani sutar, 2026
        </p>
      </div>
    </footer>
  );
}

export default Footer;
