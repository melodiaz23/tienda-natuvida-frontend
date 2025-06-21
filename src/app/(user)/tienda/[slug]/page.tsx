import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productService } from '@/services/productService';
import ProductDetail from '@/components/product/ProductDetail';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await productService.getProductBySlug(slug);

    if (!response.success || !response.data) {
      return {
        title: 'Producto no encontrado - Natuvida',
      };
    }

    const product = response.data;

    return {
      title: `${product.name} - Natuvida`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.primaryImageUrl ? [product.primaryImageUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error al cargar metadatos del producto:', error);
    return {
      title: 'Producto - Natuvida',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    const response = await productService.getProductBySlug(slug);

    if (!response.success || !response.data) {
      notFound();
    }

    const product = response.data;

    return <ProductDetail product={product} />;
  } catch (error) {
    console.error('Error al cargar el producto:', error);
    notFound();
  }
}