import * as PhosphorIcons from "@phosphor-icons/react";

export interface NavItem {
  id: string;
  label: string;
  count: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  external: boolean;
  icon: PhosphorIcons.Icon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "work", label: "Selected Work", count: "", href: "/#work" },
  { id: "about", label: "About Me", count: "", href: "/about" },
  { id: "playground", label: "Playground", count: "", href: "/playground" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shravanisutar",
    external: true,
    icon: PhosphorIcons.LinkedinLogoIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/designft.shrav?mdxt=ZDNlZDc0MzIxNw==",
    external: true,
    icon: PhosphorIcons.InstagramLogoIcon,
  },
  {
    label: "Email",
    href: "mailto:shravanisutarwork@gmail.com",
    external: true,
    icon: PhosphorIcons.EnvelopeIcon,
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1mq3fXZDiRvRBmmTVDeYnpfaU6atgvqDK/view?usp=drive_link",
    external: true,
    icon: PhosphorIcons.FileCIcon,
  },
];
