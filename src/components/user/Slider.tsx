'use client';

import { useState } from 'react';
import Image from 'next/image';


const slides = [
  {
    id: 1,
    title: 'Colágeno con Citrato de Magnesio',
    description: '20% de descuento',
    img: '/slides/natuvida-colageno-banner.webp',
    url: '/product/colageno-hidrolizado-con-citrato-de-magnesio',
    bg: 'bg-gradient-to-r from-green-light/50 to-green-dark/50',
  },
  {
    id: 2,
    title: 'Coliplus',
    description: 'Slide 2 description',
    img: '/slides/natuvida-coliplus-banner.webp',
    url: '/',
    bg: 'bg-gradient-to-r from-green-dark/50 to-yellow-50',
  },
  {
    id: 3,
    title: 'Slide 3',
    description: 'Slide 3 description',
    img: '/slides/natuvida-liofhim-banner.webp',
    url: '/',
    bg: 'bg-gradient-to-r from-yellow-50 to-green-light/50',
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // });

  return (
    <>
      <div className="h-[50vh] overflow-hidden">
        <div
          className="w-max h-full flex transition-all ease-in-out duration-1000"
          style={{ transform: `translateX(-${current * 100}vw)` }}>
          {slides.map((slide) => (
            <div
              className={`w-screen h-full gap-16`}
              key={slide.id}>
              <div className="w-full h-11/12 relative">
                <Image
                  src={slide.img}
                  alt="slide"
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex m-auto left-1/2 bottom-8 gap-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? 'scale-150' : ''
                }`}
              onClick={() => setCurrent(index)}>
              {current === index && (
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
