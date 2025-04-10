'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Colágeno Hidrolizado con Citrato de Magnesio',
    price: 77000,
    imageUrl: 'https://res.cloudinary.com/djsmvhemj/image/upload/v1744044771/Colageno_Magnesio-Natuvida_ckaics.png',
    slug: 'colageno-hidrolizado'
  },
  {
    id: '2',
    name: 'Fibra Natural Sin Azucar Coli Plus - Bebida',
    price: 67900,
    imageUrl: 'https://res.cloudinary.com/djsmvhemj/image/upload/v1744044659/Coliplus-NatuVida_fl3yn2.png',
    slug: 'fibra-natural'
  },
  {
    id: '3',
    name: 'Liofhim, Concentrado de Ingredientes Naturales para Dormir Tranquilamente',
    price: 69900,
    imageUrl: 'https://res.cloudinary.com/djsmvhemj/image/upload/v1744308544/liofhim-natuvida_tmc7cx.png',
    slug: 'liofhim'
  }
];

export default function BestSellers() {
  const addToCart = (productId: string) => {
    console.log(`Producto ${productId} agregado al carrito`);
    // TODO: IMPLMENT LOGIC TO ADD PRODUCT TO CART
  };

  return (
    <section className="py-16 px-4 overflow-hidden relative">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center text-nv-green-light mb-12">Los más vendidos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <Link href={`/producto/${product.slug}`}>
                <div className="p-6 flex justify-center">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain h-48"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-3 h-16">{product.name}</h3>
                  <p className="text-xl font-bold text-gray-800 mb-4">${product.price.toLocaleString()}</p>
                </div>
              </Link>
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full py-2 bg-green-dark text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Agregar al carrito
                </button>
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