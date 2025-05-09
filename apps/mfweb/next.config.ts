import { withMicrofrontends } from "@vercel/microfrontends/next/config";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
};

export default withMicrofrontends(nextConfig);
