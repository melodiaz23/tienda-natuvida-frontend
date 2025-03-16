import React, { Suspense } from 'react';
import ComingSoon from '@/components/ComingSoon';
import Search from '@/components/layouts/navbar/Search';

export const metadata = {
  description: 'Tienda natuvida, tienda de salud y bienestar',
  openGraph: {
    type: 'website'
  }
};

export default function Homepage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">
        <Search />
        <ComingSoon />
      </div>
    </Suspense>
  );
}