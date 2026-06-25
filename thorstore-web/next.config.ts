import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dhyuqxzax/**'
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },

    ],
  },
};

export default nextConfig;
