'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartBtn from '../cart/AddToCartButton';
import { Product } from '@/types/product.types';
import Price from '../utils/Price';

// TEMPORARY DATA
// This should be replaced with a call to the productService to fetch the best sellers 
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Colágeno Hidrolizado con Citrato de Magnesio',
    slug: 'colageno-hidrolizado-citrato-magnesio',
    description: 'Colágeno Hidrolizado con Citrato de Magnesio',
    ingredients: [],
    benefits: [],
    tags: ['Best Seller'],
    price: {
      unit: 77000,
      twoUnits: 115500,
      threeUnits: 179900,
    },
    images: [
      {
        imageUrl: 'https://res.cloudinary.com/djsmvhemj/image/upload/v1744044771/Colageno_Magnesio-Natuvida_ckaics.png',
        altText: 'Colágeno Hidrolizado con Citrato de Magnesio',
        isPrimary: true
      }
    ],
    categories: [
      'Suplementos'
    ],
    enabled: true,
    presentation: '',
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '2',
    name: 'Fibra Natural Sin Azucar Coli Plus - Bebida',
    slug: 'fibra-natural-sin-azucar-coli-plus',
    description: 'Fibra Natural Sin Azucar para una digestión saludable',
    ingredients: [],
    benefits: [],
    tags: ['Digestión', 'Natural'],
    price: {
      unit: 67900,
      twoUnits: 101850,
      threeUnits: 135800,
    },
    images: [
      {
        imageUrl: 'https://res.cloudinary.com/djsmvhemj/image/upload/v1744044659/Coliplus-NatuVida_fl3yn2.png',
        altText: 'Fibra Natural Sin Azucar Coli Plus',
        isPrimary: true
      }
    ],
    categories: [
      'Suplementos',
      'Digestión'
    ],
    enabled: true,
    presentation: '',
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '3',
    name: 'Liofhim, Concentrado de Ingredientes Naturales para Dormir Tranquilamente',
    slug: 'liofhim-concentrado-para-dormir-tranquilamente',
    description: 'Concentrado de ingredientes naturales que ayudan a conciliar el sueño',
    ingredients: [],
    benefits: [],
    tags: ['Sueño', 'Relajante'],
    price: {
      unit: 69900,
      twoUnits: 104850,
      threeUnits: 139800,
    },
    images: [
      {
        imageUrl: 'https://res.cloudinary.com/djsmvhemj/image/upload/v1744308544/liofhim-natuvida_tmc7cx.png',
        altText: 'Liofhim, Concentrado para dormir tranquilamente',
        isPrimary: true
      }
    ],
    categories: [
      'Suplementos',
      'Bienestar'
    ],
    enabled: true,
    presentation: '',
    createdAt: '',
    updatedAt: ''
  }
];

export default function BestSellers() {

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