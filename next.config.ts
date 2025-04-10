import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones de compilación
  swcMinify: true, // Asegura que SWC minifique el código
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Elimina console.log en producción
  },
  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Experimental
  experimental: {
    optimizeCss: true, // Minifica CSS
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
