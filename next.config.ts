import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'y0y3ube1hm.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
