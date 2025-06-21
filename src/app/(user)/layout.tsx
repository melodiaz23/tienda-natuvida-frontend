import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Footer from '@/components/user/layouts/Footer';


const Navbar = dynamic(() => import('@/components/user/layouts/navbar/Navbar'), {
  ssr: true, // Enable server-side rendering for SEO if needed
});

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />
      <main className="flex-grow min-h-screen">
        {children}
      </main>
      <Footer />

    </div>
  );
}