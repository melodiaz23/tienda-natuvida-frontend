import { Inter, Open_Sans } from 'next/font/google';
// import { cookies } from 'next/headers';
import { ReactNode, Suspense } from 'react';
import './globals.css';
import ToastProvider from '@/components/providers/toast.provider';

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
        <Suspense fallback={<div>Loading...</div>}>
          <ToastProvider>
            {/* <CartProvider cartPromise={cart}> */}
            <main>
              {children}
            </main>
            {/* </CartProvider> */}
          </ToastProvider>
        </Suspense>
      </body>
    </html>
  );
}
