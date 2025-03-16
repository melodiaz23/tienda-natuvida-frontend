'use client';
import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';

const TestimonialCarrousel = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 1,
    loop: true,
    mode: 'free',
    slides: {
      origin: 'center',
      perView: windowWidth > 1280 ? 2 : 1,
      spacing: 5,
    },

    created: () => {
      instanceRef.current?.on('animationEnded', () => {
        setCurrentSlide((prev) => prev + 1);
      });
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const testimonialImages = [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({
    id,
    image: '/testimonios/' + id + '.png',
  }));

  return (
    <div className="relative bg-green-light/10 rounded-xl pt-6 pb-3 px-2">
      <div
        ref={sliderRef}
        className="keen-slider">
        {testimonialImages.map((image) => (
          <div
            key={image.id}
            className="keen-slider__slide flex items-center justify-center text-center w-fit">
            <Image
              src={image.image}
              alt="testimonio"
              width={windowWidth < 768 ? 290 : 400}
              height={windowWidth < 768 ? 290 : 400}
              className="h-full m-auto"
            />
          </div>
        ))}
      </div>
      {windowWidth > 768 && (
        <div className="w-10">
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={currentSlide === 0}
          />
          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={currentSlide === testimonialImages.length - 1}
          />
        </div>
      )}

      <div className="flex justify-center mt-4">
        {Array.from({ length: testimonialImages.length }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            aria-label="navigation slider"
            className={`w-2.5 h-2.5 rounded-full mx-1.5 ${currentSlide === idx ? 'bg-green-light' : 'bg-whiteygreen'
              }`}></button>
        ))}
      </div>
    </div>
  );
};

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow absolute top-1/2 -translate-y-1/2 w-5 ${props.left ? 'arrow--left' : 'arrow--right'
        } ${disabled} ${props.left ? '-left-5' : '-right-5'} cursor-pointer`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      {props.left && (
        <path
          fill="#dfece4"
          d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
        />
      )}
      {!props.left && (
        <path
          fill="#dfece4"
          d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
        />
      )}
    </svg>
  );
}

export default TestimonialCarrousel;
