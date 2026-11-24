import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { PlaygroundGallery } from "@/components/playground/PlaygroundGallery";
import { siteConfig } from "@/config/site";
import { CollectionPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Experiments, 3D models, visual explorations, interactive interfaces, and motion design studies.",
  alternates: {
    canonical: "/playground",
  },
  openGraph: {
    title: `Playground · ${siteConfig.name}`,
    description:
      "Experiments, 3D models, visual explorations, interactive interfaces, and motion design studies.",
    url: "/playground",
  },
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[#e8590c]/15">
      <CollectionPageJsonLd
        title={`Playground · ${siteConfig.name}`}
        description="Experiments, 3D models, visual explorations, interactive interfaces, and motion design studies."
        url="/playground"
      />

      {/* Mobile & Tablet Collapsed Navigation (< 1024px) */}
      <MobileNav currentSection="Playground" />

      {/* Desktop Fixed Vertical Sidebar (>= 1024px) */}
      <Sidebar />

      {/* Independent Main Content Canvas (Offset for Desktop) */}
      <div className="flex-1 flex flex-col w-full lg:pl-[var(--sidebar-width)] transition-all duration-300">
        {/* Top Navigation Bar Across Main Content */}
        <TopNav currentSection="Playground" />

        {/* Scrollable Content Area */}
        <main className="flex-1 w-full max-w-[var(--content-max-width)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 pb-24 flex flex-col gap-12 sm:gap-16">
          <PlaygroundGallery />

          {/* Footer Colophon */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
