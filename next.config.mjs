/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-only packages
  serverExternalPackages: [
    'mongoose',
    'bcryptjs',
    'jsonwebtoken',
    'dotenv',
  ],

  // CKEditor 5 support
  transpilePackages: [
    'ckeditor5',
    '@ckeditor/ckeditor5-react',
  ],

  // ✅ Image Optimization — tuned for Core Web Vitals
  images: {
    formats: ['image/avif', 'image/webp'],
    // Serve different sizes for mobile vs desktop
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // For fixed-size images (icons, thumbnails)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 year
    minimumCacheTTL: 60 * 60 * 24 * 365,

    // ✅ Cloudinary + remote image support
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },

  // ✅ Enable gzip/brotli compression
  compress: true,

  // ✅ Remove X-Powered-By header (minor security + performance)
  poweredByHeader: false,

  // ✅ Enable View Transitions API for smooth cross-fade navigations.
  // The CSS in globals.css anchors the header so it stays fixed.
  // Gracefully degrades to instant navigation in unsupported browsers.
  experimental: {
    viewTransition: true,
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['gsap', 'swiper', 'react-icons', 'framer-motion'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // ✅ Long-term cache for static assets (images, fonts, js, css)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // ✅ Cache public images for 7 days
        source: '/:path(images|assets)/:rest*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // CORS: allow the Vite frontend to call all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};


export default nextConfig;