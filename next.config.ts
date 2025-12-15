import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // อนุญาต Unsplash
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // บางที Unsplash ใช้โดเมนนี้
      },
    ],
  },
};

export default nextConfig;
