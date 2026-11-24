"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";

type FlowTab = "architecture" | "sitemap" | "user-flow";

interface FlowStep {
  id: FlowTab;
  label: string;
  imageSrc: string;
  alt: string;
  bgColor: string;
  width: number;
  height: number;
}

const FLOW_STEPS: Record<FlowTab, FlowStep> = {
  architecture: {
    id: "architecture",
    label: "Information Architecture",
    imageSrc: "/images/case-studies/NepaliTales/Flowcharts/IA.png",
    alt: "Nepali Tales Information Architecture Diagram",
    bgColor: "bg-white",
    width: 3676,
    height: 1796,
  },
  sitemap: {
    id: "sitemap",
    label: "Sitemap",
    imageSrc: "/images/case-studies/NepaliTales/Flowcharts/sitemap.png",
    alt: "Nepali Tales Sitemap and Content Hierarchy",
    bgColor: "bg-[#F5F5F5]",
    width: 919,
    height: 449,
  },
  "user-flow": {
    id: "user-flow",
    label: "User Flow",
    imageSrc: "/images/case-studies/NepaliTales/Flowcharts/userflow.png",
    alt: "Nepali Tales User Flow Diagram",
    bgColor: "bg-white",
    width: 3676,
    height: 1796,
  },
};

const TAB_LIST: { id: FlowTab; label: string }[] = [
  { id: "architecture", label: "Information Architecture" },
  { id: "sitemap", label: "Sitemap" },
  { id: "user-flow", label: "User Flow" },
];

export function UserFlow() {
  // Information Architecture (IA) is the default active tab
  const [activeTab, setActiveTab] = useState<FlowTab>("architecture");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentStep = FLOW_STEPS[activeTab];

  // Lock body scroll and listen for Escape key when expanded
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isExpanded]);

  const handleTabChange = (tabId: FlowTab) => {
    setActiveTab(tabId);
    setIsZoomed(false);
  };

  return (
    <section
      id="user-flow"
      aria-labelledby="heading-user-flow"
      className="flex flex-col gap-6 pt-10 border-t border-border-subtle/70"
    >
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          SITEMAP, USER FLOW
        </span>
        <h2
          id="heading-user-flow"
          className="text-lg sm:text-xl font-light text-foreground leading-snug"
        >
          What research revealed : The ordering experience needed to work for both sides
        </h2>
      </div>

      {/* Interactive Frame with Top Navigation Bar matching design */}
      <div className="rounded-lg sm:rounded-xl bg-surface border border-border-subtle overflow-hidden shadow-xs my-2 flex flex-col">
        {/* Frame Top Bar */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-border-subtle/70 bg-surface-hover/30 flex items-center justify-between gap-3 select-none">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            {TAB_LIST.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`font-sans text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${isActive
                    ? "bg-foreground text-background font-medium shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/50"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>



        </div>

        {/* Diagram Image Container (Clickable to Expand) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsExpanded(true);
            }
          }}
          aria-label={`Click to expand ${currentStep.label} diagram`}
          className={`group relative w-full aspect-[919/449] transition-colors duration-200 overflow-hidden cursor-zoom-in ${currentStep.bgColor} p-3 sm:p-5`}
        >
          <Image
            key={currentStep.id}
            src={currentStep.imageSrc}
            alt={currentStep.alt}
            fill
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 768px) calc(100vw - 64px), (max-width: 960px) calc(100vw - 96px), 864px"
            className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.01]"
            priority
          />

          {/* Hover Hint Badge */}
          <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-xs text-[11px] font-mono text-white/95 shadow-md border border-white/10">
              <PhosphorIcons.ArrowsOutIcon size={12} weight="bold" />
              <span>Click to expand</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacious Expanded View Lightbox */}
      {isExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${currentStep.label} expanded view`}
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1560px] h-full max-h-[94vh] flex flex-col bg-background border border-border-subtle rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Modal Header Bar with Full Tab Switching & Obvious Controls */}
            <div className="px-3 sm:px-5 py-2.5 sm:py-3 border-b border-border-subtle bg-surface flex items-center justify-between gap-3 select-none shrink-0">
              {/* Preserved Tab Switching within Expanded View */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
                {TAB_LIST.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabChange(tab.id)}
                      className={`font-sans text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${isActive
                        ? "bg-foreground text-background font-medium shadow-2xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/50"
                        }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Action Controls: Zoom Toggle & Obvious Close Button */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsZoomed((prev) => !prev)}
                  aria-label={isZoomed ? "Fit diagram to window" : "View diagram at 100% scale"}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer border border-border-subtle"
                >
                  {isZoomed ? (
                    <>
                      <PhosphorIcons.MagnifyingGlassMinusIcon size={14} />
                      <span className="hidden sm:inline">Fit view</span>
                    </>
                  ) : (
                    <>
                      <PhosphorIcons.MagnifyingGlassPlusIcon size={14} />
                      <span className="hidden sm:inline">100% Size</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close expanded view (Esc)"
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-xs font-mono text-foreground bg-surface-hover/70 hover:bg-surface-hover border border-border-subtle hover:border-border-strong/60 transition-colors cursor-pointer"
                >
                  <span className="hidden xs:inline">Close</span>
                  <PhosphorIcons.XIcon size={14} weight="bold" />
                </button>
              </div>
            </div>

            {/* Modal Canvas: Sharp, Uncompressed Diagram Rendering */}
            <div
              className={`relative flex-1 w-full overflow-auto transition-colors duration-200 ${currentStep.bgColor} ${isZoomed
                ? "p-4 sm:p-8 cursor-zoom-out block"
                : "p-3 sm:p-6 md:p-8 flex items-center justify-center cursor-zoom-in"
                }`}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              {isZoomed ? (
                /* 100% Native High-Res Scale with natural panning for detailed reading */
                <div className="min-w-[1200px] sm:min-w-[1800px] max-w-none flex justify-center py-4">
                  <Image
                    key={`zoomed-${currentStep.id}`}
                    src={currentStep.imageSrc}
                    alt={currentStep.alt}
                    width={currentStep.width}
                    height={currentStep.height}
                    unoptimized
                    className="w-full max-w-[2800px] h-auto object-contain select-none shadow-md rounded"
                    priority
                  />
                </div>
              ) : (
                /* Fit to Window with strict aspect-ratio containment (no cropping, stretching, or pixelation) */
                <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                  <Image
                    key={`fit-${currentStep.id}`}
                    src={currentStep.imageSrc}
                    alt={currentStep.alt}
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-contain w-full h-full select-none"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Modal Bottom Bar with Accessibility Hint */}
            <div className="px-4 py-2 border-t border-border-subtle bg-surface text-[11px] font-mono text-muted-foreground flex items-center justify-between select-none shrink-0">
              <span className="truncate pr-2">{currentStep.alt}</span>
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <span>Esc to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UserFlow;
