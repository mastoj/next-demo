import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  /* config options here */
  assetPrefix: "/x-static-auth",
  turbopack: {},
};

export default nextConfig;
