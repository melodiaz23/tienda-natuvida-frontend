import Image from 'next/image';
import Link from 'next/link';
import Price from '../utils/Price';
import { Product } from '@/types/product.types';

export default function SpecialOfferCard({ product }: { product: Product }) {
  return (
    <div className="w-fit mx-auto bg-nv-green-light rounded-lg shadow-lg overflow-hidden text-white p-15">
      <h3 className="text-3xl font-bold text-center mb-6">{product.customName}</h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="w-48">
          <Image
            src={product.primaryImageUrl || product.images[0].imageUrl || '/placeholder.png'}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-auto object-contain rounded-lg transform scale-145 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-white/90 mb-1">2 unidades a precio especial de</p>
            <Price value={product.price.twoUnits || 0} className="text-2xl font-bold"
            />
          </div>

          <div>
            <p className="text-white/90 mb-1">Paga 2 y lleva 3 por</p>
            <Price value={product.price.threeUnits || 0} className="text-2xl font-bold" />
          </div>
          <Link
            href={`/tienda/${product.slug}`}
            className="mt-4 bg-white text-green-700 py-2 px-4 rounded text-center hover:bg-white hover:scale-100  font-medium hover:shadow-xl hover:-translate-y-0.5 transition-transform duration-300 "
          >
            Seleccionar opciones
          </Link>
        </div>
      </div>
    </div>
  );
}