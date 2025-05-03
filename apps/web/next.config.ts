import { NextConfig } from "next";

const MIDDLEWARE_FILTER_DOMAN = process.env.NEXT_DEMO_MIDDLEWARE_FILTER_DOMAIN!;

console.log(
  "[next.config.ts] MIDDLEWARE_FILTER_DOMAN",
  MIDDLEWARE_FILTER_DOMAN
);
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
