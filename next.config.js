// Updated next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'primary-production-49cbba.up.railway.app',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_WORDPRESS_API_URL: 'https://primary-production-49cbba.up.railway.app',
  },
  basePath: '',
  assetPrefix: '',
  staticPageGenerationTimeout: 180,
}

module.exports = nextConfig;
