const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8080',
          pathname: '/api/images/**',
        },
      ],
    },
    
  }
  
  module.exports = nextConfig