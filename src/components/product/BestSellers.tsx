import Image from 'next/image';
import { productService } from '@/services/productService';
import { unstable_cache } from 'next/cache';
import ShopProductCard from './BestSellersProductCard';

// Obtiene los productos destacados y los almacena en caché
const getFeaturedProducts = unstable_cache(
  async () => {
    const response = await productService.getAllProducts();
    if (response.success && response.data) {
      return response.data.filter(product =>
        product.tags?.includes('destacado')
      );
    } else {
      console.error(response.message || 'Error al cargar productos destacados');
      return [];
    }
  },
  ['featured-products'],
  {
    revalidate: 3600, // Revalida cada hora
    tags: ['products'] // Tag para revalidación manual
  }
);

export default async function BestSellers() {
  const featuredProducts = await getFeaturedProducts();

  if (!featuredProducts || featuredProducts.length === 0) {
    return <div>No hay productos destacados.</div>;
  }

  const productsToShow = featuredProducts.slice(0, 3);

  return (
    <section className="pt-8 pb-16 px-4 overflow-hidden relative">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-nv-green-light text-center">Los más vendidos</h2>
        </div>
        <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {productsToShow.map((product) => (
            <ShopProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <Image
          src="https://res.cloudinary.com/djsmvhemj/image/upload/v1744163842/roseclay_zfsvpz.webp"
          alt="roseclay"
          width={300}
          height={300}
          className="object-contain w-auto h-auto"
        />
      </div>
    </section>
  );
}