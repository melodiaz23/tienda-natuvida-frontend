import React from 'react';
import Slider from '@/components/user/Slider';

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

      </section>
    </>

  );
}