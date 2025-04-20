'use client';
import { useState } from 'react';
import { ProductImage } from '@/types/product.types';
import Image from 'next/image';

interface ProductImagesManagerProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  productName?: string;
}

export default function ProductImagesManager({ images, onChange, productName = '' }: ProductImagesManagerProps) {

  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentImageAlt, setCurrentImageAlt] = useState('');

  const addImage = () => {
    if (currentImageUrl && currentImageUrl.trim()) {
      const newImage: ProductImage = {
        id: crypto.randomUUID ? crypto.randomUUID() : `temp-${Date.now()}`,
        imageUrl: currentImageUrl.trim(),
        altText: currentImageAlt.trim() || `Imagen para ${productName}`,
        displayOrder: images.length,
        isPrimary: images.length === 0,
      };

      onChange([...images, newImage]);
      setCurrentImageUrl('');
      setCurrentImageAlt('');
    }
  };

  const removeImage = (id: string) => {
    onChange(images.filter(img => img.id !== id));
  };

  const setPrimaryImage = (id: string) => {
    onChange(images.map(img => ({
      ...img,
      isPrimary: img.id === id
    })));
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Imágenes del producto</h3>

      <div className="space-y-2 mb-4">
        <input
          type="url"
          value={currentImageUrl}
          onChange={(e) => setCurrentImageUrl(e.target.value)}
          placeholder="URL de la imagen"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
        />
        <input
          type="text"
          value={currentImageAlt}
          onChange={(e) => setCurrentImageAlt(e.target.value)}
          placeholder="Texto alternativo (accesibilidad)"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
        />
        <button
          type="button"
          onClick={addImage}
          className="bg-green-dark/80 text-white px-4 py-2 rounded-md hover:bg-green-dark"
        >
          Añadir imagen
        </button>
      </div>

      {images.length > 0 ? (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700 mb-2">Imágenes añadidas ({images.length}):</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((image) => (
              <div key={image.id + "-temp-" + images.length} className="relative border rounded-md p-2">
                <div className={`${image.isPrimary ? 'ring-1 ring-green-dark/60' : ''}`}>
                  <div className="relative h-32 w-full">
                    <Image
                      src={image.imageUrl || "/placeholder.png"}
                      alt={image.altText || "Product image"}
                      fill
                      className="object-cover rounded-md"
                      onError={(e) => {
                        const imgElement = e.currentTarget as HTMLImageElement;
                        imgElement.src = "/placeholder.png";
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {image.isPrimary && (
                    <span className="absolute top-1 left-1 bg-green-dark text-white text-xs px-2 py-1 rounded-md">
                      Principal
                    </span>
                  )}
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => image.id && setPrimaryImage(image.id)}
                    disabled={image.isPrimary}
                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded disabled:opacity-50"
                  >
                    Principal
                  </button>
                  <button
                    type="button"
                    onClick={() => image.id && removeImage(image.id)}
                    className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No hay imágenes añadidas</p>
      )}
    </div>
  );
}