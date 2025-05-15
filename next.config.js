/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add specific cache directory configuration
  distDir: '.next',
  cacheDirectory: '.next/.cache',
};

module.exports = nextConfig;