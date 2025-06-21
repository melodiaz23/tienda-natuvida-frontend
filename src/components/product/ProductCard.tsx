'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product.types';
import AddToCartBtn from '../cart/AddToCartButton';
import Price from '../utils/Price';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {


  return (
    <div className="flex flex-col w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg">
      <Link href={`/producto/${product.slug || product.id}`} className="block overflow-hidden relative pt-[100%]">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {product.primaryImageUrl ? (
            <Image
              src={product.primaryImageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-400">Imagen no disponible</p>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/producto/${product.slug || product.id}`} className="block">
          <h3 className="text-nv-green-dark font-semibold mb-2 line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto">
          <Price value={product.price.unit} className="text-xl font-bold text-nv-green-dark" />
        </div>

        <div className='mt-4 flex justify-center'>
          <AddToCartBtn product={product} className='w-fit py-2 px-4  border border-nv-green-light hover:bg-green-dark hover:text-white hover:border-transparent rounded-4xl' />
        </div>
      </div>
    </div>
  );
}