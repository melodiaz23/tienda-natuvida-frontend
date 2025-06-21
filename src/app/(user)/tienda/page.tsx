export { generateMetadata } from './metadata';

import { productService } from "@/services/productService";
import ProductGrid from "@/components/product/ProductGrid";
import { unstable_cache } from 'next/cache';

const getAllProducts = unstable_cache(
  async () => {
    const response = await productService.getAllProducts();
    if (response.success && response.data) {
      return response.data;
    } else {
      console.error(response.message || 'Error al cargar productos');
      return [];
    }
  },
  ['all-products'],
  {
    revalidate: 3600, // Revalida cada hora
    tags: ['products'] // Tag para revalidación manual
  }
);

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-nv-green-light text-center text-xl md:text-3xl font-bold mb-8 justify-center">
        Mejora tu día a día y dale a tu cuerpo lo que merece con productos naturales
      </h1>
      <div className='flex p-12 justify-center'>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}