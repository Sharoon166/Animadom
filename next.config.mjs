/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'media.kitsu.io',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  