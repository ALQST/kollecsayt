// Updated next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_HOSTNAME || 'localhost',
        port: process.env.NEXT_PUBLIC_WORDPRESS_PORT || '8000',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8000',
  },
  basePath: '',
  assetPrefix: '',
  staticPageGenerationTimeout: 180,
}

module.exports = nextConfig;
