/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.kitsu.app',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
