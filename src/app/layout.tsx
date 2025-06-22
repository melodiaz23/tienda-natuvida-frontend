import { Inter, Open_Sans } from 'next/font/google';
// import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import Providers from './providers/Providers';
import './globals.css';


const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000');


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700']
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700']
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
    icons: {
      icon: '/icon.svg'
    }
  },
  description: 'Tienda de productos naturales y suplementos alimenticios',
  kewords: ['suplementos', 'productos naturales', 'salud', 'bienestar', 'nutrición'],
  alternates: {
    canonical: '/',
    languages: {
      'es-CO': '/',
    },
  },
  other: {
    'link': [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://res.cloudinary.com',
        crossOrigin: 'anonymous',
      },
    ],
  },
  openGraph: {
    title: SITE_NAME,
    description: 'Tienda de productos naturales y suplementos alimenticios',
    url: baseUrl,
    siteName: SITE_NAME,
    images: [
      {
        url: `${baseUrl}/healthy-hair.png`,
        width: 1200,
        height: 630,
        alt: 'Tienda de productos naturales y suplementos alimenticios',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',

  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${openSans.className} w-full`}>
        <Providers>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
