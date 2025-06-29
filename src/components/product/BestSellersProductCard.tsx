import Image from 'next/image';
import Link from 'next/link';
import AddToCartBtn from '../cart/AddToCartButton';
import Price from '../utils/Price';
import { Product } from '@/types/product.types';

interface BestSellersProductCardProps {
  product: Product;
  initialQuantity?: number;
  showAddToCart?: boolean;
}

export default function BestSellersProductCard({
  product,
  initialQuantity = 1,
  showAddToCart = true
}: BestSellersProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/tienda/${product.slug}`}>
        <div className="flex justify-center">
          <Image
            src={product.primaryImageUrl || product.images[0].imageUrl}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain h-auto w-auto"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-3 h-16 leading-tight">{product.name}</h3>
          <p className="text-xl font-bold text-gray-800 mt-8">
            <Price value={product.price.unit} />
          </p>
        </div>
      </Link>
      {showAddToCart && (
        <div className="p-4 border-t border-gray-100 flex justify-center items-center">
          <AddToCartBtn product={product} prodQuantity={initialQuantity} className='' />
        </div>
      )}
    </div>
  );
}