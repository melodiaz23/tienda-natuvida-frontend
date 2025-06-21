'use client';
import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const animation = { duration: 45000, easing: (t: number) => t };

export default function HorizontalSlide() {
  // const [windowWidth, setWindowWidth] = useState(400);

  // const handleResize = useCallback(() => {
  //   setWindowWidth(window.innerWidth);
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setWindowWidth(window.innerWidth);
  //     window.addEventListener('resize', handleResize);
  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }
  // }, [handleResize]);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  return (
    <>
      <div
        ref={sliderRef}
        className="keen-slider whitespace-nowrap w-fit hidden md:block">
        <div className="keen-slider__slide number-slide1 hidden md:block">
          APROVECHA: PAGO CONTRAENTREGA + ENVÍO GRATIS
        </div>
        <div className="keen-slider__slide number-slide1 hidden md:block">
          APROVECHA: PAGO CONTRAENTREGA + ENVÍO GRATIS
        </div>
      </div>
      <div
        ref={sliderRef}
        className="keen-slider whitespace-nowrap w-fit block md:hidden">
        <div className="keen-slider__slide number-slide1 block md:hidden">
          APROVECHA: PAGO CONTRAENTREGA + ENVÍO GRATIS
        </div>

      </div>
    </>
  );
}
