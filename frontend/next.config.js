const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: process.env.IP_SERVER,
          port: '8080',
          pathname: '/api/images/**',
        },
      ],
    },
    
  }
  
  module.exports = nextConfig