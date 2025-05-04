import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  /* config options here */
  assetPrefix: "/x-static-middleware-filter",
  // rewrites: async () => [
  //   {
  //     source: "/x-static-middleware-filter/:path*",
  //     destination: "/_next/static/:path*",
  //   },
  // ],
};

export default nextConfig;
