'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const specialOffers = [
  {
    id: '1',
    name: 'Cólageno Hidrolizado',
    imageUrl: '/colageno-front_o.webp',
    slug: 'colageno-hidrolizado',
    bundle1: {
      description: '2 unidades a precio especial de',
      price: 115500
    },
    bundle2: {
      description: 'Paga 2 y lleva 3 por',
      price: 154000
    }
  },
  {
    id: '2',
    name: 'Fibra Natural Coli Plus',
    imageUrl: 'https://res.cloudinary.com/djsmvhemj/image/upload/v1744044659/Coliplus-NatuVida_fl3yn2.png',
    slug: 'fibra-natural',
    bundle1: {
      description: '2 unidades a precio especial de',
      price: 101850
    },
    bundle2: {
      description: 'Paga 2 y lleva 3 por',
      price: 135800
    }
  }
];

export default function SpecialOffers() {
  return (
    <section className="py-16 bg-nv-green-soft border-t-20 border-nv-green-light">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-dark mb-12">
          Ofertas imperdibles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-nv-green-light rounded-lg shadow-lg overflow-hidden text-white p-6"
            >
              <h3 className="text-2xl font-bold text-center mb-6">{offer.name}</h3>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="w-48">
                  <Image
                    src={offer.imageUrl}
                    alt={offer.name}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-white/90 mb-1">{offer.bundle1.description}</p>
                    <p className="text-2xl font-bold">${offer.bundle1.price.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-white/90 mb-1">{offer.bundle2.description}</p>
                    <p className="text-2xl font-bold">${offer.bundle2.price.toLocaleString()}</p>
                  </div>

                  <Link
                    href={`/producto/${offer.slug}`}
                    className="mt-4 bg-white text-green-700 py-2 px-4 rounded text-center hover:bg-white/90 transition-colors font-medium"
                  >
                    Seleccionar opciones
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}