'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

interface MobileGalleryProps {
  images: { src: string; altText: string }[];
}

export function MobileGallery({ images }: MobileGalleryProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const selectImage = (index: number) => {
    setImageIndex(index);
  };

  // Configuración para gestos de deslizamiento (swipe)
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    trackMouse: false,
    swipeDuration: 500,
    touchEventOptions: { passive: false }
  });

  return (
    <div className="md:hidden" {...swipeHandlers}>
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        {images[imageIndex] && (
          <Image
            className="object-contain"
            fill
            sizes="100vw"
            alt={images[imageIndex].altText}
            src={images[imageIndex].src}
            priority={true}
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => selectImage(idx)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 ${idx === imageIndex ? 'border-green-500' : 'border-gray-200'
                }`}
            >
              <Image
                src={image.src}
                alt={`Miniatura ${idx + 1}`}
                fill
                sizes="64px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}