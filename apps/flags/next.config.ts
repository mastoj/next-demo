import withVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  cacheComponents: true,
  /* config options here */
  assetPrefix: "/x-static-flags",
  turbopack: {},
  // rewrites: async () => [
  //   {
  //     source: "/x-static-middleware-filter/:path*",
  //     destination: "/_next/static/:path*",
  //   },
  // ],
};

export default withVercelToolbar()(nextConfig);
