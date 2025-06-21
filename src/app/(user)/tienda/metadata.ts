import { productService } from '@/services/productService';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const response = await productService.getAllProducts();
  const products = response.data || [];

  const productNames = products.slice(0, 10).map(product => product.name);
  const productsList = productNames.join(',');
  const description = `Explora nuestra selección de productos naturales, incluyendo: ${productsList}`;

  return {
    title: 'Productos Naturales | Natuvida',
    description,
    openGraph: {
      title: 'Productos Naturales | Natuvida',
      description,
      type: 'website',
      // TODO: Find image for productlist
      // images: [
      //   {
      //     url: '/ruta-a-imagen-og.jpg',
      //     width: 1200,
      //     height: 630,
      //     alt: 'Productos Naturales Natuvida',
      //   },
      // ],
    },

  }

}
