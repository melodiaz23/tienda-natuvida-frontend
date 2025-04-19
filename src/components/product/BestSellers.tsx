'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartBtn from '../cart/AddToCartButton';
import Price from '../utils/Price';
import { useProduct } from '@/hooks/useProduct';

export default function BestSellers() {

  const { featuredProducts } = useProduct();

  if (!featuredProducts || featuredProducts.length === 0) {
    return <div>No hay productos destacados.</div>;
  }

  const productsToShow = featuredProducts.slice(0, 3);




  return (
    <section className="py-16 px-4 overflow-hidden relative">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center text-nv-green-light mb-12">Los más vendidos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productsToShow.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <Link href={`/producto/${product.slug}`}>
                <div className="p-6 flex justify-center">
                  <Image
                    src={product.primaryImageUrl || product.images[0].imageUrl}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain h-48"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-3 h-16">{product.name}</h3>
                  <p className="text-xl font-bold text-gray-800 mb-4">
                    <Price value={product.price.unit} />
                  </p>
                </div>
              </Link>
              <div className="p-4 border-t border-gray-100">
                <AddToCartBtn product={product} prodQuantity={1} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <Image
          src="https://res.cloudinary.com/djsmvhemj/image/upload/v1744163842/roseclay_zfsvpz.webp"
          alt="roseclay"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
    </section>
  );
}