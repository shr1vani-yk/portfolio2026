import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    maximumResponseBody: 60000000,
    minimumCacheTTL: 31536000, // 1 year: ensures Vercel Edge CDN caches optimized images long-term
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/images/projects/plix.",
        destination: "/images/projects/plix.png",
      },
      {
        source: "/aboutMe",
        destination: "/about",
      },
    ];
  },
};

export default nextConfig;
