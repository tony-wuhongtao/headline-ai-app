/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'aiapi.cetv-headline.com',
          pathname: '/sdmodels/**',
        }
      ]
    },
    async headers() {
        return [
          {
            source: '/api/(.*)',
            headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
          },
        ];
      },
};

export default nextConfig;
