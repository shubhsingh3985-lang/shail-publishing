/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Firebase Storage — book cover images uploaded via admin panel
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      // Firebase Storage alternate domain
      {
        protocol: 'https',
        hostname: '*.appspot.com',
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
