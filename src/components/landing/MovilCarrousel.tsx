'use client';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import box from '../../../public/icons/box-check-svgrepo-com.svg';
import card from '../../../public/icons/card-swipe-svgrepo-com.svg';
import truck from '../../../public/icons/truck-speed-svgrepo-com.svg';
import talk from '../../../public/icons/talk-bubbles-outline-badged-svgrepo-com.svg';

const MovilCarrousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const slides = [
    {
      id: 1,
      content: (
        <div className="grid grid-cols-1 gap-4">
          <Image
            src={box}
            alt="box"
            width={100}
            height={100}
            className="h-16 w-16 m-auto row-span-2"
          />
          <div className="text-green-dark font-semibold">
            ¡ENVÍO GRATIS A TODA COLOMBIA!
          </div>
          <div>
            Aprovecha el envío gratis y recibe tu pedido en la comodidad de tú
            hogar con entrega garantizada y asegurada
          </div>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="grid grid-cols-1 gap-4">
          <Image
            src={card}
            alt="card"
            width={100}
            height={100}
            className="h-16 w-16 m-auto row-span-2"
          />
          <div className="text-green-dark font-semibold">
            ¡PAGOS SEGUROS Y CONTRA ENTREGA!
          </div>
          <div>
            Para tú seguridad y tranquilidad siempre podrás pagar contra entrega
            o por el medio de pago que prefieras 100% seguros
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="grid grid-cols-1 gap-4">
          <Image
            src={truck}
            alt="truck"
            width={100}
            height={100}
            className="h-16 w-16 m-auto row-span-2"
          />
          <div className="text-green-dark font-semibold">ENVÍO RÁPIDO</div>
          <div>
            Contamos con{' '}
            <span className="font-bold">
              envío rápido a las principales ciudades
            </span>
            . Podrás recibir tú pedido entre 1 y 2 días hábiles{' '}
          </div>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="grid grid-cols-1 gap-4">
          <Image
            src={talk}
            alt="truck"
            width={100}
            height={100}
            className="h-16 w-16 m-auto row-span-2"
          />
          <div className="text-green-dark font-semibold">
            ¡LA MEJOR ASESORÍA!
          </div>
          <div>
            Siempre puedes escribirnos via WhatsApp y te contestaremos en el
            menor tiempo posible. Recibirás la asesoría personalizada que
            necesitas.
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="keen-slider">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="keen-slider__slide flex items-center justify-center min-h-[200px] p-4 text-center">
            {slide.content}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: slides.length }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-2.5 h-2.5 rounded-full mx-1 ${currentSlide === idx ? 'bg-green-light' : 'bg-whiteygreen'
              }`}
            aria-label="navigate slider"></button>
        ))}
      </div>
    </div>
  );
};

export default MovilCarrousel;
