'use client';
import { useState } from 'react';
import Image from 'next/image';

interface DesktopGalleryProps {
  images: { src: string; altText: string }[];
}

export function DesktopGallery({ images }: DesktopGalleryProps) {

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <>
      <div className="gap-2 mr-4 w-24">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`relative aspect-square bg-white rounded cursor-pointer border ${selectedImageIndex === index ? 'border-green-500' : 'border-gray-200'
              } hover:border-green-500`}
          >
            <Image
              src={image.src}
              alt={image.altText}
              fill
              sizes="100px"
              className="object-contain p-1"
            />
          </div>
        ))}

      </div>
      {/* Imagen principal grande */}
      <div className="flex-1 bg-white rounded-lg overflow-hidden">
        <div className="relative aspect-square border border-gray-200 shadow-sm">
          <Image
            src={images[selectedImageIndex].src}
            alt={images[selectedImageIndex].altText}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </>


  );
}