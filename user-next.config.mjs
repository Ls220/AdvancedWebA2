/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Optimizes for serverless environments like Netlify
  images: {
    domains: ['placeholder.com', 'via.placeholder.com'], // Add your image domains here
    unoptimized: true, // Required for Netlify deployment
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure environment variables are properly exposed
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  // Optimize for Netlify's serverless functions
  experimental: {
    serverActions: true,
  },
  // Enable transpilePackages for packages that need to be transpiled
  transpilePackages: ["lucide-react"],
  
  // Configure rewrites to proxy API requests to your Express backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5000/api/:path*' // Development API URL
          : '/api/:path*', // Production API URL (handled by Vercel serverless functions)
      },
    ];
  },

  // Add this to help with React component resolution
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;

