import { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: "/middleware-filter/:path*",
      destination: "http://localhost:3001/middleware-filter/:path*",
    },
    {
      source: "/middleware-filter-static/:path*",
      destination: "http://localhost:3001/middleware-filter-static/:path*",
    },
  ],
};

export default nextConfig;
