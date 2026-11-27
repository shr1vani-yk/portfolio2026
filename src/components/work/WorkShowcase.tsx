"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, ProjectItem } from "@/data/projects";
import * as Phosporous from '@phosphor-icons/react/ssr'
type CategoryFilter = "all" | "Product" | "Branding";

export function WorkShowcase() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedSummaries, setExpandedSummaries] = useState<Record<string, boolean>>({});
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const handleFilterChange = (newFilter: CategoryFilter) => {
    setFilter(newFilter);
    setActiveIndex(0);
    setExpandedSummaries({});
    itemRefs.current = [];
  };

  const toggleSummary = (id: string) => {
    setExpandedSummaries((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Smooth scroll to #work on cross-page arrival (e.g. from /about or /playground)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#work") {
      const timer = setTimeout(() => {
        const workEl = document.getElementById("work");
        if (workEl) {
          const topbar = document.querySelector("header");
          const topbarHeight =
            topbar ? topbar.offsetHeight : window.innerWidth >= 1024 ? 60 : 56;
          const targetY =
            window.scrollY + workEl.getBoundingClientRect().top - topbarHeight - 16;
          const prefersReducedMotion =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll synchronization for thumbnail trail (Tablet & Desktop >= 768px)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const elements = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
        if (!elements.length) {
          ticking = false;
          return;
        }

        // Reading focal band: ~38% down the viewport
        const triggerY = window.innerHeight * 0.58;

        let bestIndex = 0;
        let minDistance = Infinity;

        elements.forEach((el, index) => {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height * 0.5;
          const dist = Math.abs(elementCenter - triggerY);

          if (rect.top <= triggerY && rect.bottom >= triggerY) {
            bestIndex = index;
            minDistance = -1;
          } else if (minDistance !== -1 && dist < minDistance) {
            minDistance = dist;
            bestIndex = index;
          }
        });

        setActiveIndex((prev) => (prev !== bestIndex ? bestIndex : prev));
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filteredProjects]);

  const safeActiveIndex =
    activeIndex < filteredProjects.length ? activeIndex : 0;
  const currentProject: ProjectItem =
    filteredProjects[safeActiveIndex] || filteredProjects[0] || PROJECTS[0];

  return (
    <div className="flex flex-col gap-8 md:gap-10 w-full">
      {/* Top Monospace Section Marker (Direct match to Image 1) */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">

          <span className="font-mono text-xs uppercase tracking-widest text-subtle-foreground">
            /
          </span>
          <h1 className="text-xs font-mono uppercase tracking-widest text-foreground font-medium">
            Selected Work
          </h1>
        </div>
        <span className="text-xs font-mono text-subtle-foreground">
          [{PROJECTS.length.toString().padStart(2, "0")} Projects]
        </span>
      </div>

      {/* Section Header: Title & Filter Pills (Direct visual match to Image 1) */}
      <div className="flex flex-wrap items-center justify-between gap-4">


        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(
            [
              { label: "All", value: "all" },
              { label: "Product", value: "Product" },
              { label: "Branding", value: "Branding" },
            ] as const
          ).map((item) => {
            const isActive = filter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleFilterChange(item.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-200 cursor-pointer ${isActive
                  ? "bg-foreground text-background font-medium border border-border-strong shadow-xs"
                  : "bg-transparent text-muted-foreground border border-border-subtle hover:text-foreground hover:border-border-strong"
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Scroll-Synchronised Showcase (>= 1024px) */}
      <div
        className="relative w-full hidden lg:grid gap-8 lg:gap-12 xl:gap-16 items-start"
        style={{
          gridTemplateColumns: "minmax(0, 38fr) minmax(0, 62fr)",
        }}
      >
        {/* Left Sticky Column (~38%) */}
        <div className="sticky top-20 lg:top-28 xl:top-32 self-start flex flex-col justify-between min-h-[360px] lg:min-h-[420px] py-2">
          {/* Main Info with calm transition */}
          <div
            key={currentProject.id}
            className="flex flex-col gap-4 lg:gap-5 transition-all duration-300 ease-out motion-reduce:transition-none"
          >
            {/* Read Time & Outbound Arrow */}
            <Link
              href={`/work/${currentProject.slug}`}
              data-cursor="view case study"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-light text-[#e8590c] dark:text-[#f97316] hover:underline transition-colors group/link w-fit"
            >
              <span>{currentProject.readTime}</span>
              <Phosporous.ArrowUpRightIcon size={16} />
            </Link>

            {/* Display Title (Clickable) */}
            <Link href={`/work/${currentProject.slug}`} data-cursor="view case study">
              <h3 className="text-xl md:text-2xl lg:text-[1.85rem] font-medium tracking-tight text-foreground leading-[1.22] font-sans transition-colors">
                {currentProject.displayTitle}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-xs md:text-sm lg:text-[0.9375rem] text-muted-foreground font-sans font-light leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          {/* Bottom Metric & Metadata with Project Logo */}
          <div className="flex items-center gap-3 pt-6 border-t border-border-subtle/70 mt-8">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden shrink-0 bg-white border border-border-subtle shadow-2xs flex items-center justify-center">
              {currentProject.logo ? (
                <Image
                  src={currentProject.logo}
                  alt={`${currentProject.title} logo`}
                  fill
                  sizes="(max-width: 640px) 36px, 40px"
                  className="object-contain"
                />
              ) : currentProject.hasAsset ? (
                <Image
                  src={currentProject.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 36px, 40px"
                  className="object-cover"
                />
              ) : (
                <span className="font-pixel text-[9px] text-muted-foreground">
                  {currentProject.id}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs sm:text-sm font-medium text-foreground font-sans leading-snug">
                {currentProject.metric}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-subtle-foreground">
                {currentProject.metricSub}
              </span>
            </div>
          </div>
        </div>

        {/* Right Vertical Scrolling Thumbnail Trail (~62%) */}
        <div className="flex flex-col gap-16 lg:gap-24 xl:gap-28 pb-16">
          {filteredProjects.map((project, idx) => {
            const isCurrentlyActive = idx === safeActiveIndex;
            return (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                data-index={idx}
                data-cursor="view case study"
                className={`group relative w-full aspect-[16/10] min-h-[280px] lg:min-h-[360px] xl:min-h-[420px] rounded-2xl lg:rounded-3xl overflow-hidden border bg-surface transition-all duration-300 block cursor-pointer ${isCurrentlyActive
                  ? "border-border-strong shadow-lg"
                  : "border-border-subtle shadow-xs hover:border-border-strong/60"
                  }`}
                style={{ aspectRatio: "16 / 10" }}
              >
                {project.hasAsset ? (
                  <Image
                    src={project.image}
                    alt={project.displayTitle}
                    fill
                    sizes="(max-width: 1024px) calc((100vw - 14rem) * 0.62), (max-width: 1536px) calc((100vw - 17.5rem) * 0.62), 850px"
                    priority={idx === 0}
                    className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out motion-reduce:transition-none"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-surface text-center border border-dashed border-border-subtle rounded-2xl lg:rounded-3xl">
                    <span className="font-mono text-xs text-subtle-foreground uppercase tracking-widest">
                      [{project.id}] {project.title}
                    </span>
                    <span className="text-xs text-muted-foreground mt-2 font-sans">
                      Thumbnail asset to be provided
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet Adapted Showcase (< 1024px) */}
      <div className="flex lg:hidden flex-col gap-10 sm:gap-14">
        {filteredProjects.map((project, idx) => (
          <article
            key={project.id}
            className="flex flex-col gap-3.5 sm:gap-4 border-b border-border-subtle/70 pb-10 sm:pb-12 last:border-b-0"
          >
            {/* Read Time / Meta */}
            <div className="flex items-center justify-between">
              <Link
                href={`/work/${project.slug}`}
                data-cursor="view case study"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#e8590c] dark:text-[#f97316] hover:underline transition-colors w-fit"
              >
                <span>{project.readTime}</span>
                <Phosporous.ArrowUpRightIcon size={14} />
              </Link>
            </div>

            {/* 1. Project Headline */}
            <Link href={`/work/${project.slug}`} data-cursor="view case study">
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground font-sans hover:text-muted-foreground transition-colors leading-snug">
                {project.displayTitle}
              </h3>
            </Link>

            {/* 2. Short description / subtext with expand toggle */}
            <div className="flex flex-col gap-1">
              <p
                className={`text-xs sm:text-[13px] text-muted-foreground font-sans font-light leading-relaxed ${
                  project.description.length > 140 && !expandedSummaries[project.id]
                    ? "line-clamp-2"
                    : ""
                }`}
              >
                {project.description}
              </p>
              {project.description.length > 140 && (
                <button
                  type="button"
                  onClick={() => toggleSummary(project.id)}
                  aria-expanded={Boolean(expandedSummaries[project.id])}
                  className="text-xs font-regular text-[#000000] dark:text-[#b1b1b1] hover:underline transition-colors w-fit cursor-pointer select-none self-start"
                >
                  {expandedSummaries[project.id] ? "Read Less" : ".. Read More"}
                </button>
              )}
            </div>

            {/* 3. Full-width Project Thumbnail */}
            <Link
              href={`/work/${project.slug}`}
              data-cursor="view case study"
              className="group relative w-full aspect-[16/10] min-h-[180px] xs:min-h-[220px] sm:min-h-[280px] rounded-xl sm:rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-xs hover:border-border-strong/60 transition-all duration-300 block cursor-pointer"
              style={{ aspectRatio: "16 / 10" }}
            >
              {project.hasAsset ? (
                <Image
                  src={project.image}
                  alt={project.displayTitle}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 850px"
                  priority={idx === 0}
                  className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-500 ease-out motion-reduce:transition-none"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-surface text-center">
                  <span className="font-mono text-xs text-subtle-foreground uppercase tracking-widest">
                    [{project.id}] {project.title}
                  </span>
                  <span className="text-xs text-muted-foreground mt-2 font-sans">
                    Thumbnail asset to be provided
                  </span>
                </div>
              )}
            </Link>

            {/* 4. Metrics as Plain Text (no logo or image) */}
            <div className="flex flex-col pt-0.5">
              <span className="text-xs sm:text-sm font-medium text-foreground font-sans leading-snug">
                {project.metric}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-subtle-foreground">
                {project.metricSub}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

