import { Inter, Open_Sans } from 'next/font/google';
// import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import './globals.css';
import Footer from '@/components/layouts/Footer';
import ToastProvider from '@/components/providers/toast.provider';
import dynamic from 'next/dynamic';


const Navbar = dynamic(() => import('@/components/layouts/navbar/Navbar'), {
  ssr: true, // Enable server-side rendering for SEO if needed
});

const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';


const inter = Inter({ subsets: ['latin'], display: 'swap' });
const openSans = Open_Sans({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    description: 'Tienda Natuvida',
    template: `%s | ${SITE_NAME}`,
    icons: {
      icon: '/icon.svg'
    }
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
        <ToastProvider>
          {/* <CartProvider cartPromise={cart}> */}
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          {/* </CartProvider> */}
        </ToastProvider>
      </body>
    </html>
  );
}
