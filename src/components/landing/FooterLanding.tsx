import Image from 'next/image';
import box from '../../../public/icons/box-check-svgrepo-com.svg';
import card from '../../../public/icons/card-swipe-svgrepo-com.svg';
import truck from '../../../public/icons/truck-speed-svgrepo-com.svg';
import talk from '../../../public/icons/talk-bubbles-outline-badged-svgrepo-com.svg';
import MovilCarrousel from './MovilCarrousel';

export default function FooterLanding() {
  return (
    <>
      <div className="block md:hidden bg-slate-100/50 py-10">
        <MovilCarrousel />
      </div>
      <div className="justify-center bg-slate-100/50 py-10 hidden md:flex">
        <div className="grid lg:grid-cols-2 2xl:flex gap-12 w-3/5 lg:w-4/5 2xl:w-full 2xl:px-5 items-center">
          <div className="grid grid-cols-[auto,1fr] gap-4">
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
          <div className="grid grid-cols-[auto,1fr] gap-4">
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
              Para tú seguridad y tranquilidad siempre podrás pagar contra
              entrega o por el medio de pago que prefieras 100% seguros
            </div>
          </div>
          <div className="grid grid-cols-[auto,1fr] gap-4">
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
          <div className="grid grid-cols-[auto,1fr] gap-4">
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
        </div>
      </div>
    </>
  );
}
