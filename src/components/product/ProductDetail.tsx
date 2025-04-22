'use client';
import { useState } from 'react';
import { Product } from '@/types/product.types';
import AddToCartBtn from '../cart/AddToCartButton';
import EditQuantityButton from '../cart/EditQuantityButton';
import { MobileGallery } from './MobileGallery';
import { DesktopGallery } from './DesktopGallery';
import Price from '../utils/Price';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  // Preparar imágenes para la galería
  const images = product.images && product.images.length > 0
    ? product.images.map(img => ({
      src: img.imageUrl,
      altText: img.altText || product.name
    }))
    : [{
      src: product.primaryImageUrl || '/images/placeholder.png',
      altText: product.name
    }];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <MobileGallery images={images} />
        <DesktopGallery images={images} />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <div className="mt-6">
            <p className="text-4xl font-bold text-gray-800">
              <Price value={product.price.unit} />
            </p>
          </div>

          <div className="mt-4 flex items-center py-4">
            <EditQuantityButton itemId={product.id} initialQuantity={quantity} setNewQuantity={setQuantity} className="mr-2" />
          </div>
          <AddToCartBtn product={product} prodQuantity={quantity} />
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          {/* Presentación */}
          {product.presentation && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Presentación</h2>
              <p className="text-gray-600">{product.presentation}</p>
            </div>
          )}

          <div className="mt-8 space-y-6">
            {/* Modo de uso */}
            {product.usageMode && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Modo de uso</h3>
                <p className="text-gray-600">{product.usageMode}</p>
              </div>
            )}

            {/* Ingredientes */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Ingredientes</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-600">{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Beneficios */}
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Beneficios</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600">{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contraindicaciones */}
            {product.contraindications && product.contraindications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Contraindicaciones</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.contraindications.map((contraindication, index) => (
                    <li key={index} className="text-gray-600">{contraindication}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}