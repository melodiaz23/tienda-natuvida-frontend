import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Skeleton from '@/components/common/Skeleton';
import { Gallery } from '@/components/product/Gallery';
import { ProductImage } from '@/types/product.types';
import { productService } from '@/services/productService';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await productService.getProductById(params.id);

  if (!product) return notFound();

  const productImages = product.data?.images.slice(0, 5).map((image: ProductImage) => ({
    src: image.imageUrl,
    altText: typeof image.altText === 'string' ? image.altText : ''
  }));

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <Suspense
            fallback={
              <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
                <Skeleton />
              </div>
            }
          >
            <Gallery images={productImages || []} />
          </Suspense>
        </div>
        <div className="basis-full lg:basis-2/6">
          <Suspense fallback={<Skeleton />}>
            <div className="space-y-4 pt-4 lg:pt-0">
              <h1 className="text-3xl font-bold">{product.data?.name}</h1>
              <div className="mt-2">
                <p className="text-xl font-medium text-green-dark">
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP'
                  }).format(Number(product.data?.price.unit || 0))}
                </p>
              </div>
              <div className="mt-4">
                <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: product.data?.description || '' }} />
              </div>
              <div className="mt-6">
                <button className="w-full bg-green-dark text-white font-bold py-3 px-4 rounded">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}