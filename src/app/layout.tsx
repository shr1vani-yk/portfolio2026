import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";
import { cn } from "@/lib/utils";
import CursorLoader from "@/components/ui/cursor-loader";
import { siteConfig } from "@/config/site";
import { PersonAndWebSiteJsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";

const stackSans = localFont({
  src: [
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-stack-sans",
  display: "swap",
});

const geistPixel = localFont({
  src: "../../public/fonts/GeistPixel/GeistPixel-Square.otf",
  variable: "--font-geist-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.bio,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.bio,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.bio,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", stackSans.variable, geistPixel.variable, "font-sans")}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(s==='dark'||s==='light')?s:(m?'dark':'light');document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <PersonAndWebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <CursorLoader />

        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
