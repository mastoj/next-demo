import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: "/middleware-filter-static",
  // rewrites: async () => [
  //   {
  //     source: "/middleware-filter/:path*",
  //     destination: "/_next/static/:path*",
  //   },
  // ],
};

export default nextConfig;
