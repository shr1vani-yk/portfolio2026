"use client";

import Link from "next/link";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { NextProjectCard } from "@/components/case-study/NextProjectCard";
import { BackToTopButton } from "@/components/case-study/BackToTopButton";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { PLIX_CASE_STUDY } from "./data";

import { Hero } from "./components/Hero";
import { Concept } from "./components/Concept";
import { ProductSpotlight } from "./components/ProductSpotlight";
import { ProductNarrative } from "./components/ProductNarrative";
import { B1G1Campaign } from "./components/B1G1Campaign";
import { Learnings } from "./components/Learnings";

interface PlixCaseStudyProps {
  nextProject?: ProjectItem;
}

export function PlixCaseStudy({
  nextProject: customNextProject,
}: PlixCaseStudyProps) {
  const { signoff } = PLIX_CASE_STUDY;

  // Resolve next project dynamically, defaulting to Nepali Tales
  const currentIndex = PROJECTS.findIndex((p) => p.slug === "plixlife");
  const fallbackNext =
    currentIndex !== -1
      ? PROJECTS[(currentIndex + 1) % PROJECTS.length]
      : PROJECTS[0];
  const nextProject = customNextProject || fallbackNext;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[#e8590c]/15">
      {/* CaseStudyHeader with solid reading-progress indicator */}
      <CaseStudyHeader
        projectName="PlixLife"
        maxWidthClassName="max-w-[960px] px-5 sm:px-8 md:px-12"
      />

      {/* Centered Single-Column Case Study Canvas following Nepali Tales layout */}
      <main className="w-full max-w-[960px] mx-auto px-5 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-24 flex flex-col gap-14 sm:gap-20">
        {/* Section 1: Hero & 4-Column Metadata */}
        <Hero />

        {/* Section 2: Concept — The Plix ecosystem */}
        <Concept />

        {/* Section 3: Product Spotlight — From product benefits to visual language */}
        <ProductSpotlight />

        {/* Section 4: Product Narrative — Products, with a little more personality */}
        <ProductNarrative />

        {/* Section 5: Promotional Campaigns / B1G1 — Making a good deal look better */}
        <B1G1Campaign />

        {/* Section 6 & 7: Learnings, Reflection & Kind Words from Team */}
        <Learnings />

        {/* Colophon Section matching Nepali Tales template */}
        <div className="pt-12 border-t border-border-subtle/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-[11px] text-muted-foreground uppercase leading-relaxed">
          <div>
            <p className="font-sans font-medium text-xs text-foreground/90">
              {signoff.copyright}
            </p>
            <p>{signoff.discipline}</p>
          </div>
          <div className="font-sans font-regular max-w-md sm:text-right">
            <p>{signoff.note}</p>
            <p>
              [
              <a
                href={signoff.emailHref}
                className="font-sans text-foreground text-xs hover:text-[#e8590c] dark:hover:text-[#f97316] transition-colors ml-1"
              >
                {signoff.email}
              </a>
              ]
            </p>
          </div>
        </div>

        {/* Next Project Card (Nepali Tales) */}
        {nextProject && <NextProjectCard project={nextProject} />}

        {/* Colophon Footer */}
        <footer className="pt-8 pb-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground select-none">
          <div>
            <span>Shravani Sutar Portfolio &middot; 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/#work"
              className="hover:text-foreground transition-colors"
            >
              &larr; Back to Selected Work
            </Link>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-foreground transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>Back to Top</span>
              <span aria-hidden="true">&uarr;</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Floating Smooth Back-to-Top Button */}
      <BackToTopButton />
    </div>
  );
}

export default PlixCaseStudy;
