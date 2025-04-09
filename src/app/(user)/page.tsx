import React from 'react';
import Slider from '@/components/user/Slider';
import BestSellers from '@/components/product/BestSellers';

export const metadata = {
  description: 'Tienda natuvida, tienda de salud y bienestar',
  openGraph: {
    type: 'website'
  }
};

export default function Homepage() {
  return (
    <>
      <section>
        <Slider />
      </section>
      <section>
        <BestSellers />
      </section>
    </>

  );
}