const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: process.env.NEXT_PUBLIC_IP_SERVER,
          port: '8080',
          pathname: '/api/images/**',
        },
      ],
    },
    
  }
  
  module.exports = nextConfig