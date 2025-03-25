import Link from 'next/link';
import Image from 'next/image';
import { FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : '');
  // const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  // const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm  py-12">
      <div className="flex flex-col md:flex-row justify-between gap-24">
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <Image
              src="/natuvida-logo.png"
              alt="logo"
              width={200}
              height={200}
              className="cursor-pointer h-12 w-auto"
            />
          </Link>
          <div className="flex flex-col gap-2">
            <p>Envigado, Colombia</p>
            <span className="font-semibold">ventas@natuvida.co</span>
            <Link href="https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20tengo%20dudas%20acerca%20de%20c%C3%B3mo%20hacer%20mi%20pedido%20por%20la%20p%C3%A1gina%20web." target="_blank">
              <span className="font-semibold">(+57) 320 868 0091</span>
            </Link>
          </div>
          <div className="flex gap-6">
            <Link href="https://www.instagram.com/natuvidatiendaonline_/" target="_blank">
              <FaInstagram size={20} />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61558785675468" target="_blank">
              <FaFacebook size={20} />
            </Link>
            <FaYoutube size={20} />
            <FaPinterest size={20} />
          </div>
        </div>
        <div className="w-1/2 hidden lg:flex justify-between gap-4">
          <div className="flex flex-col gap-8">
            <h2 className="font-medium text-lg">COMPAÑÍA</h2>
            <div className="flex flex-col gap-6">
              <Link href="/">Acerca de nosotros</Link>
              <Link href="/">Políticas de Privacidad</Link>
              <Link href="/">Contáctanos</Link>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-medium text-lg">TIENDA</h2>
            <div className="flex flex-col gap-6">
              <Link href="/">Nuevos productos</Link>
              <Link href="/">Ofertas</Link>
              <Link href="/">Todos los productos</Link>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-medium text-lg">AYUDA</h2>
            <div className="flex flex-col gap-6">
              <Link href="https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20quiero%20hablar%20con%20servicio%20al%20cliente">Servicio al cliente</Link>
              <Link href="/login">Mi cuenta</Link>
              <Link href="/">Legal y privacidad</Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h2 className="font-medium text-lg">SUSCRÍBETE</h2>
          <p>
            Se el primero en recibir las últimas novedades y promociones de
            Natuvida.
          </p>
          <div className='flex flex-col'>
            <input
              type="text"
              id='email'
              className="p-4 w-auto focus:ring-0 focus:outline-green-dark/50 rounded"
              placeholder="Ingresa tú correo"
              autoComplete='email'
            />
            <button className="w-auto bg-green-dark text-whiteygreen p-4 rounded">
              UNIRSE
            </button>
          </div>

          <span className="font-semibold">Pagos seguros.</span>
          <div className="flex gap-4 w-max h-auto">
            <FaCcVisa size={40} />
            <FaCcMastercard size={40} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-16">

        <p>
          &copy; {copyrightDate} {copyrightName}
          {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <span className="text-gray-500 mr-4">Lenguaje</span>
            <span className="font-medium">Colombia | Español </span>
          </div>
          <div>
            <span className="text-gray-500 mr-4">Moneda</span>
            <span className="font-medium"> $ COP </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
