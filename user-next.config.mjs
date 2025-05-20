/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', 
  images: {
    domains: ['placeholder.com', 'via.placeholder.com'], 
    unoptimized: true, 
    remotePatterns: [                                                               // REMOVE IDIOT CONFIG USELESS AS HOSTING FAILED
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  experimental: {
    serverActions: true,
  },
  transpilePackages: ["lucide-react"],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5000/api/:path*' 
          : '/api/:path*', 
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;

