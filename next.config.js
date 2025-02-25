/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  basePath: isProd ? "/webpage" : "",
  assetPrefix: isProd ? "/webpage/" : "",
};

module.exports = nextConfig;
