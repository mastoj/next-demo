import { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  turbopack: {},
};

export default nextConfig;
