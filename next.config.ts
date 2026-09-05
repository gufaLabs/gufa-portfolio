import type { NextConfig } from "next";

// Static export: this site is fully client-rendered (no API routes, no
// server actions), so it can be hosted directly on GitHub Pages instead of
// requiring a Node/Vercel server.
// GitHub Pages *project* site (github.com/org/repo) is served under /repo/,
// not /, so the workflow sets NEXT_PUBLIC_BASE_PATH at build time. This same
// var is read by app/lib/paths.ts to prefix plain <img> asset paths.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
