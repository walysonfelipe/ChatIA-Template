/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
