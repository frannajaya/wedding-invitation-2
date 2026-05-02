/** @type {import('next').NextConfig} */
const nextConfig = {
  // Backend API base URL – override via NEXT_PUBLIC_API_URL in .env.local
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  },
};

module.exports = nextConfig;
