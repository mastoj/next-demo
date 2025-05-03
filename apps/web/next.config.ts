import { NextConfig } from "next";

const MIDDLEWARE_FILTER_DOMAN = process.env.NEXT_DEMO_MIDDLEWARE_FILTER_DOMAIN!;

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: "/middleware-filter/:path*",
      destination: `${MIDDLEWARE_FILTER_DOMAN}/middleware-filter/:path*`,
    },
    {
      source: "/middleware-filter-static/:path*",
      destination: `${MIDDLEWARE_FILTER_DOMAN}/middleware-filter-static/:path*`,
    },
  ],
};

export default nextConfig;
