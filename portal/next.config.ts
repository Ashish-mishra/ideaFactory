import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_VOTES_API: process.env.NEXT_PUBLIC_VOTES_API ?? "",
  },
};

export default config;
