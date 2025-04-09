import React from 'react';
import Slider from '@/components/user/Slider';
import BestSellers from '@/components/product/BestSellers';
import SpecialOffers from '@/components/product/SpecialOffers';

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
      <section>
        <SpecialOffers />
      </section>
    </>

  );
}