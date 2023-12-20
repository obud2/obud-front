/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com', 'image.tmdb.org'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 828, 1080, 1920],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/class',
        permanent: true,
      },
    ];
  },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
