/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'custom',
    path: '',
  },
   assetPrefix: '/',
};

module.exports = nextConfig;
