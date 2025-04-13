'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product.types';
import AddToCartBtn from '../cart/AddToCartButton';


export default function ProductCard({ product }: { product: Product }) {

  const primaryImage = product.primaryImageUrl ||
    (product.images.length > 0 ? product.images[0].imageUrl : "/placeholder.png");

  return (
    <div className="w-full sm:w-[45%] lg:w-[22%] border border-green-dark/50 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/producto/${product.id}`}>
        <div className="relative w-full h-64">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <p className="text-gray-600 mt-1 text-sm line-clamp-2">{product.description}</p>
          <div className="mt-2 font-bold text-xl">${product.price.unit.toLocaleString()}</div>
          <AddToCartBtn product={product} prodQuantity={1} />
        </div>
      </Link>
    </div>
  );
}