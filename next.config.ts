import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [{ hostname: "ik.imagekit.io" }],
  },
};

export default nextConfig;
