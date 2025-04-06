import Image from 'next/image';
import Link from 'next/link';
import colagenoFront from '../../../../../public/colageno-front_o.webp';
import helthyHair from '../../../../../public/healthy-hair.png';
import preparation from '../../../../../public/prep.gif';
import woman from '../../../../../public/close-up-woman.webp';
import star from '../../../../../public/icons/star.svg';
import whatsapp from '../../../../../public/icons/logo-whatsapp.svg';
import checkmark from '../../../../../public/icons/checkmark-circle-outline.svg';
import heart from '../../../../../public/icons/heart-outline.svg';
import FAQ from '@/components/landing/FAQ';
import FooterLanding from '@/components/landing/FooterLanding';
import { Suspense } from 'react';
import Skeleton from '@/components/Skeleton';
import Perks from '@/components/landing/Perks';
import Difference from '@/components/landing/Difference';
import TestimonialCarrousel from '@/components/landing/TestimonialCarrousel';
import CountdownTimer from '@/components/landing/CountdownTimer';
import HorizontalSlide from '@/components/user/HorizontalSlide';


export default function Page() {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <ColagenoHidrolizadoPage />
      </Suspense>
    </>
  );
}

async function ColagenoHidrolizadoPage() {

  return (
    <>
      {/* <ProductProvider> */}
      <div className="bg-green-500/70 py-1 w-full text-center font-extrabold italic font-inter">
        <HorizontalSlide />
      </div>
      <section className="flex flex-col md:flex-row pb-8 py-2 md:max-w-screen-xl mx-auto items-center">
        <div className="w-full flex flex-col md:flex-row justify-center items-center justify-items-center">
          <div className="w-auto md:w-2/5 xl:w-1/2 flex-shrink align-middle justify-center items-center">
            <Image
              src={colagenoFront}
              alt="colageno hidrolizado y citrato de magnesio"
              priority
              content="width=device-width"
              className="h-auto w-96 lg:w-full"
              width={350}
              height={350}
            />
          </div>
          <div className="md:w-1/2 flex md:grow flex-col justify-center px-8 md:px-0 md:py-8 lg:py-0">
            <h1 className="text-3xl">
              <span className="block font-bold">Colágeno Hidrolizado</span>con
              Citrato de Magnesio
            </h1>
            <div>
              <div className="flex gap-2 py-4 w-6 lg:w-9">
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    src={star}
                    alt="star"
                    width={30}
                    height={30}
                  />
                ))}
              </div>
            </div>
            <div className="lg:w-3/4">
              <div className="font-bold pb-4">
                ¡Mantén tu vitalidad todos los días!
              </div>
              Nuestro colágeno hidrolizado, de origen bovino, mejora la firmeza
              de la piel, las articulaciones, las uñas y el cabello. Además,
              podrás recibir todos los beneficios del magnesio.
            </div>
            <div className="font-semibold text-xl pt-4">
              ¡Más de 5.750 clientes satisfechos!
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-8 w-80 xl:w-full xl:flex py-8 items-center">
              <div className="col-start-1">
                <div className="text-xl">Antes</div>
                <div className="text-2xl strikethrough max-w-max">$90.000</div>
              </div>
              <div className=" text-red-500">
                <div className="text-xl">Ahora</div>
                <div className="text-4xl lg:text-4xl xl:text-5xl">$77.000 </div>
              </div>
              <div className="col-span-2 pt-4 text-2xl lg:text-2xl font-bold">
                + ENVÍO GRATIS
              </div>
            </div>
            <Link
              href={'https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20quiero%20hacer%20un%20pedido'}
              className="inline-block w-1/2 bg-gray-950 text-white font-bold text-l p-2 m-4 rounded text-center">
              COMPRAR
            </Link>
            {/* <AddToCart product={product[0]} prodQuantity={1} text="COMPRAR" /> */}
          </div>
        </div>
      </section>
      <section className="bg-green-dark text-whiteygreen  p-8 lg:py-12">
        <div
          className={`font-bold text-2xl lg:text-3xl text-center relative`}>
          ¡Es hora de recuperar tu vitalidad y empezar a cuidarte!
        </div>
        <div
          className={`font-bold text-2xl lg:text-3xl text-center relative `}>
          Tú eres tu mejor inversión: Prioriza tu bienestar
        </div>
      </section>

      <section className="w-[90vw] grid grid-cols-1 lg:grid-cols-2 justify-center mx-auto ">
        <div className="flex flex-col justify-around gap-4 text-lg lg:text-xl font-bold italic text-center px-12 py-10 lg:pb-32 lg:pt-20">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src={star}
                  alt="star"
                  className="w-6 h-6"
                />
              ))}
            </div>
            <p>
              &quot;Desde que empecé a tomar este colágeno, mi piel, cabello y
              uñas lucen increíbles&quot;
              <span className="block font-bold text-right text-lg">
                - Magda
              </span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src={star}
                  alt="star"
                  className="w-6 h-6"
                />
              ))}
            </div>
            <p>
              &quot;Desde que tomo este colágeno con citrato de magnesio, estoy
              de mejor ánimo y me despierto cada mañana con mucha más
              energía.&quot;
              <span className="block font-bold text-right text-lg">
                - Vanesa
              </span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src={star}
                  alt="star"
                  className="w-6 h-6"
                />
              ))}
            </div>
            <p>
              &quot;La caída del cabello era un problema constante para mí.
              Desde que incluyo colágeno en mi dieta, he notado una gran
              mejoría. Mi cabello está más fuerte y saludable, y la caída ha
              disminuido drásticamente.&quot;
              <span className="block font-bold text-right text-lg">
                - Paola
              </span>
            </p>
          </div>
        </div>
        <Image
          src={helthyHair}
          alt="pelo saludable colágeno"
          content="width=device-width"
          className="h-auto w-[350px] lg:w-[500px] self-end align-bottom justify-self-center max-w-[500px]"
        />
      </section>
      <section className="w-screen bg-green-dark grid grid-cols-1 lg:grid-cols-[auto_1fr] mb-5 lg:px-12 2xl:px-40">
        <div className="grid-cols-[1fr_30%] ml-7 xl:ml-36 justify-items-end items-end justify-self-end md:justify-self-center hidden lg:grid">
          <Image
            src={woman}
            alt="mujer con colageno hidrolizado"
            className="h-auto w-52 m-auto scale-125 lg:scale-150 rounded-md shadow-xl"
          />
          <Image
            src={colagenoFront}
            alt="colageno hidrolizado y citrato de magnesio"
            width={220}
            height={220}
            placeholder="blur"
            className="self-end h-auto m-auto -translate-x-10 translate-y-24 lg:-translate-x-16 lg:translate-y-28 md:scale-150 scale-150"
          />
        </div>
        <div className="grid lg:w-full xl:w-full gap-4 lg:gap-y-7 text-whiteygreen py-12 px-5 lg:py-6 lg:px-0">
          <h2 className="flex-1 text-center lg:text-left self-center font-bold text-2xl lg:text-4xl mt-5 lg:mt-0">
            Una combinación imperdible
          </h2>
          <div className="grid lg:grid-cols-2 pt-4 lg:pt-0">
            <div className="flex flex-col gap-3 items-center lg:items-start">
              <Image
                src={checkmark}
                alt="checkmark"
                width={80}
                className=""
              />
              <h4 className="font-bold text-xl">Colágeno 100% puro </h4>
              <p className="w-3/4 text-center lg:text-start">
                El colágeno es una proteina de origen animal que te ayuda a
                fortalecer las articulaciones, el cabello, entre otros.
              </p>
            </div>
            <div className="flex flex-col gap-3 items-center lg:items-start">
              <Image
                src={heart}
                alt="heart"
                width={80}
                className=""
              />
              <h4 className="font-bold text-xl">Citrato de magnesio</h4>
              <p className="w-3/4 text-center lg:text-start">
                Es un componente eficaz que permite mayor absorción del
                colágeno.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-16 lg:pt-24">
        <div className="px-4 md:px-8 flex flex-col items-center">
          <h3 className="text-center text-xl md:text-3xl font-bold md:mb-4 text-green-dark">
            Grandes beneficios que ayudan
          </h3>
          <p className="text-center text-lg md:text-2xl font-bold mb-4 text-green-dark">
            a mejorar tu Calidad de Vida
          </p>
          <Perks interest={'default'} />
          <div className="p-16 w-full flex justify-center">
            <Link
              href={'https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20quiero%20hacer%20un%20pedido'}
              className="w-1/2 md:w-1/3 xl:w-1/4 bg-gray-950 text-white font-bold text-xl py-2 px-4 rounded text-center">
              ¡Lo quiero!
            </Link>
            {/* <AddToCart product={product[0]} prodQuantity={1} text="LO QUIERO!" /> */}
          </div>
        </div>
      </section>
      <section className="py-8 bg-green-dark flex flex-col">
        <h4 className="w-4/5 lg:w-1/2 text-center text-xl lg:text-2xl font-bold mb-4 text-whiteygreen self-center">
          Mira como el Colágeno con Citrato de Magnesio ha mejorado la calidad
          de vida de quienes lo consumen.
        </h4>
        <div className="w-full md:w-1/2 self-center px-2 md:px-0">
          <TestimonialCarrousel />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="px-8 flex flex-col items-center">
          <h3 className="text-center text-2xl font-bold mb-8 text-green-dark">
            ¿Cómo se diferencia este colágeno con Citrato de Magnesio de otros
            productos similares en el mercado?
          </h3>
          <Difference />
        </div>
      </section>
      <section className="py-8 bg-green-dark flex flex-col align-middle">
        <div className="flex lg:w-1/2 self-center p-4 lg:gap-10 gap-4">
          <Image
            src={preparation}
            alt="preparación colageno"
            priority
            unoptimized
            className="h-auto m-auto hidden md:block w-1/2 xl:w-1/2 md:w-1/3"
          />
          <div className="flex flex-col text-whiteygreen justify-center">
            <h3 className="text-2xl font-bold mb-6 justify-center">
              Prepáralo en menos de un minuto
            </h3>
            <ol className="list-decimal pl-4 flex flex-col gap-4 justify-center">
              <li>
                Disuelve 1 cucharadita dosificadora en agua o en la bebida de tú
                preferencia.
              </li>
              <li>Mezcla bien hasta que se disuelva.</li>
              <li>Tómala dos veces por día: en la mañana y en la noche.</li>
              <li>¡Listo!</li>
            </ol>
            <Image
              src={preparation}
              alt="preparación colageno"
              height={100}
              priority
              unoptimized
              className="w-3/4 m-auto block md:hidden pt-8"
            />
          </div>
        </div>
      </section>
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-green-dark">
          Ofertas Especiales
        </h2>
        <p className="text-center text-green-dark">Por tiempo limitado</p>
        <div className="py-8 lg:pb-0">
          <CountdownTimer />
        </div>
        <div className="grid lg:flex justify-center justify-self-center gap-8 lg:gap-7 xl:gap-9 p-4 lg:p-12">
          <div className="flex flex-col items-center space-around w-72 2xl:w-1/5 lg:w-1/4 border-t-gray-100 border-t shadow-xl text-center z-0 rounded-lg">
            <div className="p-4">
              <div>
                Lleva 1<div className="font-bold">15% OFF</div>
              </div>
            </div>
            <Image
              src={colagenoFront}
              alt="colageno hidrolizado y citrato de magnesio"
              width={150}
              height={150}
              placeholder="blur"
              className="h-auto m-auto"
            />
            <div className="font-bold text-sm">+ ENVÍO GRATIS</div>
            <div>Total</div>
            <div className="text-2xl font-bold">$ 77.000</div>
            <div className='p-4'>
              <Link
                href={'https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20quiero%20hacer%20un%20pedido'}
                className="inline-block w-1/2 bg-gray-950 text-white font-bold text-l p-2 m-4 rounded text-center">
                COMPRAR
              </Link>
              {/* <AddToCart product={product[0]} prodQuantity={1} text="COMPRAR" /> */}
            </div>
          </div>
          <div className="w-72 2xl:w-1/5 lg:w-1/4 border-t-gray-100 border-t shadow-xl text-center z-0 rounded-lg">
            <div className="p-4">
              <div>
                Pide 2 unidades<div className="font-bold">Ahorra $38.500</div>
              </div>
            </div>
            <div className="relative pt-5 pb-14 flex justify-end 2xl:translate-x-[-7%] lg:translate-x-[8%]">
              <Image
                src={colagenoFront}
                alt="colageno hidrolizado y citrato de magnesio"
                width={100}
                height={100}
                placeholder="blur"
                className="-translate-x-4 xl:-translate-x-8"
              />
              <Image
                src={colagenoFront}
                alt="colageno hidrolizado y citrato de magnesio"
                width={100}
                height={100}
                placeholder="blur"
                className="-translate-x-20 translate-y-[30%] xl:-translate-x-20"
              />
            </div>
            <div className="font-bold text-sm">+ ENVÍO GRATIS</div>
            <div>Total</div>
            <div className="text-2xl font-bold">$ 115.500</div>
            <div className='p-4'>
              <Link
                href={'https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20quiero%20hacer%20un%20pedido'}
                className="inline-block w-1/2 bg-gray-950 text-white font-bold text-l p-2 m-4 rounded text-center">
                COMPRAR
              </Link>
              {/* <AddToCart product={product[0]} prodQuantity={2} text="COMPRAR" /> */}
            </div>
          </div>
          <div className="w-72 2xl:w-1/5 lg:w-1/4 border-t-gray-100 border-t shadow-xl text-center z-10 rounded-lg">
            <div className="p-4">
              ¡Paga 2<div className="font-bold">LLEVA 3!</div>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto] justify-center items-center relative pt-4 pb-16">
              <Image
                src={colagenoFront}
                alt="colageno hidrolizado y citrato de magnesio"
                width={100}
                height={100}
                placeholder="blur"
                className="h-auto m-auto row-span-2"
              />
              <Image
                src={colagenoFront}
                alt="colageno hidrolizado y citrato de magnesio"
                width={100}
                height={100}
                placeholder="blur"
                className="h-auto absolute top-12 translate-y-[10%] 2xl:translate-x-[85%] xl:translate-x-[55%] lg:translate-x-[40%] translate-x-[35%]"
              />
              <div className="self-center auto-cols-auto">+</div>
              <Image
                src={colagenoFront}
                alt="colageno hidrolizado y citrato de magnesio"
                width={100}
                height={100}
                placeholder="blur"
                className=" h-auto m-auto translate-y-[10%]"
              />
            </div>

            <div className="text-sm font-bold">+ ENVÍO GRATIS</div>
            <div>Total</div>
            <div className="text-2xl font-bold">$ 154.000</div>
            <div className='p-4'>
              <Link
                href={'https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20quiero%20hacer%20un%20pedido'}
                className="inline-block w-1/2 bg-gray-950 text-white font-bold text-l p-2 m-4 rounded text-center">
                COMPRAR
              </Link>
              {/* <AddToCart product={product[0]} prodQuantity={3} text="COMPRAR" /> */}
            </div>
          </div>
        </div>
      </section>
      <section className="px-4">
        <FAQ />
      </section>
      <section className="py-16 px-4 text-center flex flex-col align-middle">
        <h3 className="text-center text-2xl font-bold mb-8 text-green-dark">
          ¿Aún tienes dudas?
        </h3>
        <Link
          href="https://wa.link/t9lwva"
          target="_blank"
          className="flex w-56 gap-4 px-4 py-2 bg-[rgb(32,176,85)] rounded-lg shadow-xl self-center items-center justify-around hover:bg-[rgb(34,192,92)]/90">
          <Image
            src={whatsapp}
            alt="logo whatsapp"
            width={40}
            height={40}
          />
          <p className="text-center content-center text-2xl text-white">
            ¡Escríbenos!
          </p>
        </Link>
      </section>
      <section>
        <FooterLanding />
      </section>
      {/* </ProductProvider> */}
    </>
  );
}