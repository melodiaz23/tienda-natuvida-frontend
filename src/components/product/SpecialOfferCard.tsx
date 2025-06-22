import Image from 'next/image';
import Link from 'next/link';
import Price from '../utils/Price';
import { Product } from '@/types/product.types';

export default function SpecialOfferCard({ product }: { product: Product }) {
  return (
    <div className="max-w-xl mx-auto bg-nv-green-light rounded-2xl shadow-2xl overflow-hidden text-white p-8 md:p-10">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">{product.name}</h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center bg-white/10 rounded-lg overflow-hidden">
          <Image
            src={product.primaryImageUrl || product.images[0].imageUrl || '/placeholder.png'}
            alt={product.name}
            width={192}
            height={192}
            className="object-contain w-full h-full"
            sizes="(max-width: 768px) 160px, 192px"
            priority
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-6 items-center md:items-start">
          <div>
            <p className="text-white/80 mb-1 text-center md:text-left">Precio especial de</p>
            <Price value={product.price.unit || 0} className="text-2xl font-bold text-center md:text-left" />
          </div>
          <Link
            href={`/tienda/${product.slug}`}
            className="mt-2 bg-white text-nv-green-light font-semibold py-2 px-6 rounded-lg text-center shadow hover:bg-green-100 hover:scale-105 transition-transform duration-200"
          >
            Comprar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}