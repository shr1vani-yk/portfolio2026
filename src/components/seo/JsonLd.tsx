import { siteConfig } from "@/config/site";
import type { ProjectItem } from "@/data/projects";

export function PersonAndWebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.bio,
        publisher: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        alternateName: "Shrav",
        url: siteConfig.url,
        jobTitle: siteConfig.role,
        description: siteConfig.bio,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressCountry: "IN",
        },
        sameAs: [
          siteConfig.links.linkedin,
          siteConfig.links.instagram,
          siteConfig.links.substack,
          siteConfig.links.github,
        ],
        knowsAbout: [
          "Product Design",
          "Visual Design",
          "Interaction Design",
          "UI/UX Design",
          "Design Systems",
          "Design Engineering",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProfilePageJsonLd({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: title,
    description,
    url: `${siteConfig.url}${url}`,
    mainEntity: {
      "@id": `${siteConfig.url}/#person`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AboutPageJsonLd({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url: `${siteConfig.url}${url}`,
    mainEntity: {
      "@id": `${siteConfig.url}/#person`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CollectionPageJsonLd({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${siteConfig.url}${url}`,
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CreativeWorkJsonLd({ project }: { project: ProjectItem }) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.displayTitle || project.title,
    description: project.description,
    url: `${siteConfig.url}/work/${project.slug}`,
    image: `${siteConfig.url}${project.image}`,
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
    creator: {
      "@id": `${siteConfig.url}/#person`,
    },
    dateCreated: project.year,
    genre: project.categoryLabel,
    keywords: project.tags.join(", "),
  };

  if (project.slug === "nepali-tales") {
    schema.interactionStatistic = [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/ViewAction",
        userInteractionCount: 34500,
        name: "Page Views",
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/InteractAction",
        userInteractionCount: 14300,
        name: "Unique Visitors",
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/BuyAction",
        userInteractionCount: 770,
        name: "Payment Transactions",
      },
    ];
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
