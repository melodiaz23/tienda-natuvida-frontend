import React from 'react';
import SpecialOfferCard from './SpecialOfferCard';
import { productService } from '@/services/productService';
import { unstable_cache } from 'next/cache';


const getOffers = unstable_cache(
  async () => {
    const response = await productService.getAllProducts();
    if (response.success && response.data) {
      return response.data.filter(product =>
        product.tags?.includes('imperdible')
      );
    } else {
      console.error(response.message || 'Error al cargar ofertas imperdibles');
      return [];
    }
  },
  ['special-offers'],
  {
    tags: ['products'] // Tag para revalidación manual
  }
);

export default async function SpecialOffers() {

  const products = await getOffers();

  return (
    <section className="py-16 bg-nv-green-soft border-t-20 border-nv-green-light">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-dark mb-12">
          Ofertas imperdibles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="">
              <SpecialOfferCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
