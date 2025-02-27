/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
console.log('🚬 ===> process.env.NEXT_PUBLIC_SERVICE_ID:', process.env.NEXT_PUBLIC_SERVICE_ID);
console.log('🚬 ===> process.env.NEXT_PUBLIC_TEMPLATE_ID:', process.env.NEXT_PUBLIC_TEMPLATE_ID);
console.log('🚬 ===> process.env.NEXT_PUBLIC_USER_ID:', process.env.NEXT_PUBLIC_USER_ID);
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
