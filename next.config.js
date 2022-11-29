/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'custom',
    path: '',
  },
  assetPrefix: '/',
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
};

module.exports = nextConfig;
