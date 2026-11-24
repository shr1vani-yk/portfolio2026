function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.trim();
    const formatted =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    return formatted.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Shravani Sutar",
  title: "Shravani Sutar — Product Designer",
  role: "Product Designer",
  specialisations: [
    "Visual Designer",
    "Interaction Designer",
    "UI/UX Designer",
  ],
  bio: "Engineer turned designer, exploring the intersection of design and logic.",
  tagline: "I'm a 0–1 Product Designer who designs for impact at startups.",
  location: "Mumbai, India",
  url: getBaseUrl(),
  ogImage: "/opengraph-image.png",
  locale: "en_US",
  links: {
    email: "shravanisutarwork@gmail.com",
    linkedin: "https://www.linkedin.com/in/shravanisutar/",
    instagram: "https://www.instagram.com/designft.shrav",
    substack: "https://substack.com/@shr1vani",
    github: "https://github.com/shr1vani-yk",
    resume:
      "https://drive.google.com/file/d/1gA5pRWKDiUs8rAZqsdrNQwDKzN4wTCsC/view?usp=sharing",
  },
  keywords: [
    "Shravani Sutar",
    "Product Designer",
    "Visual Designer",
    "Interaction Designer",
    "UI/UX Designer",
    "Design Engineer",
    "Mumbai Designer",
    "Nepali Tales Case Study",
    "Plix Design Case Study",
    "0-1 Product Design",
    "Design Systems",
    "Portfolio",
  ],
};
