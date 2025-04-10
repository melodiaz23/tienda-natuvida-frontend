import { Inter, Open_Sans } from 'next/font/google';
// import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import Providers from './providers/Providers';
import './globals.css';


const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';


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
    description: 'Tienda de productos naturales y suplementos alimenticios',
    template: `%s | ${SITE_NAME}`,
    icons: {
      icon: '/icon.svg'
    }
  },
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
  robots: {
    follow: true,
    index: true
  },

};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // const cartId = cookies().get('cartId')?.value;
  // Don't await the fetch, pass the Promise to the context provider
  // const cart = getCart(cartId);

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
