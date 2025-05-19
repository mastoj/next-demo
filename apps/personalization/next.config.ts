import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  /* config options here */
  assetPrefix: "/x-static-personalization",
};

export default nextConfig;
