/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'source.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'doodleipsum.com',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'picsum.photos',
          },
        ],
      },
}

module.exports = nextConfig
