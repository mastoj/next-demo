import withVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  /* config options here */
  assetPrefix: "/x-static-flags",
  // rewrites: async () => [
  //   {
  //     source: "/x-static-middleware-filter/:path*",
  //     destination: "/_next/static/:path*",
  //   },
  // ],
  experimental: {
    useCache: true,
    ppr: true,
  },
};

export default withVercelToolbar()(nextConfig);
