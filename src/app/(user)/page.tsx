import React from 'react';
import Slider from '@/app/(user)/tienda/_components/Slider';
import BestSellers from '@/components/product/BestSellers';
import SpecialOffers from '@/components/product/SpecialOffers';
import FooterLanding from '@/components/landing/FooterLanding';
import Testimonials from './tienda/_components/Testimonials';


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
      <section>
        <Testimonials />
      </section>
      <section>
        <FooterLanding />
      </section>
    </>

  );
}