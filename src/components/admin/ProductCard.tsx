import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product.types';

function ProductCard(product: Product) {
  return (
    <Link href={`/dashboard/productos/${product.id}`}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-1">${product.pricing && product.pricing.unitPrice}</p>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
            <div className="mt-3">
            </div>
          </div>

          <div className="h-24 w-24 relative">
            {product.primaryImageUrl ? (
              <Image
                src={product.primaryImageUrl}
                alt={product.name}
                fill
                className="object-contain rounded-md"
              />
            ) : (
              <div className="h-full w-full bg-gray-100 flex items-center justify-center rounded-md">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;