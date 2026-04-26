import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH || undefined;

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_VOTES_API: process.env.NEXT_PUBLIC_VOTES_API ?? "",
  },
};

export default config;
