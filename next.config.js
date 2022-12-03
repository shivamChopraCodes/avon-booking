/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'custom',
    path: '',
  },
  assetPrefix: '/',
  ...(process.env.BASE_URL !== 'http://localhost:3000' && {
    compiler: {
      removeConsole: {
        exclude: ['error'],
      },
    },
  }),
};

module.exports = nextConfig;
