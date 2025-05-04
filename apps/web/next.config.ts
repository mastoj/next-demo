import { NextConfig } from "next";

const MIDDLEWARE_FILTER_DOMAN = process.env.NEXT_DEMO_MIDDLEWARE_FILTER_DOMAIN!;
const AUTH_DOMAN = process.env.NEXT_DEMO_AUTH_DOMAIN!;

const appRewrites = [
  { app: "middleware-filter", domain: MIDDLEWARE_FILTER_DOMAN },
  { app: "auth", domain: AUTH_DOMAN },
].flatMap(({ app, domain }) => [
  {
    source: `/${app}`,
    destination: `${domain}/${app}`,
  },
  {
    source: `/${app}/:path*`,
    destination: `${domain}/${app}/:path*`,
  },
  {
    source: `/x-static-${app}/:path*`,
    destination: `${domain}/x-static-${app}/:path*`,
  },
]);

console.log("[next.config.ts] appRewrites", appRewrites);

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],

  rewrites: async () => appRewrites,
};

export default nextConfig;
