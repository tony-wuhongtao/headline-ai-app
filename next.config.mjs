/** @type {import('next').NextConfig} */
const nextConfig = {
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
