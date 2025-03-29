import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exitocol.vtexassets.com',
      },
    ],
  },
};

export default nextConfig;
