import Link from 'next/link';
import Image from 'next/image';
import HorizontalSlide from '@/components/common/HorizontalSlide';
import MobileMenu from './MobileMenu';
import NavIcons from './NavIcons';

export default async function Navbar() {
  // const session = await auth(); // TODO: Add auth

  return (
    <>
      <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        {/* MOBILE */}
        <div className="h-full flex items-center justify-between md:hidden">
          <Link href="/">
            <Image
              src="/natuvida-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="cursor-pointer h-12 w-auto"
              priority
            />
          </Link>
          <MobileMenu menu={[{ title: 'Inicio', path: '/' }, { title: 'Tienda', path: '/tienda' }, { title: 'Contacto', path: '/contacto' }, { title: "Mi cuenta", path: "/mi-cuenta" }, { title: 'Mi Carrito', path: '/checkout' }]} />
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full relative">
          <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
            <Link href="/">
              <Image
                src="/natuvida-logo.png"
                alt="logo"
                width={200}
                height={200}
                className="cursor-pointer h-12 w-auto"
                priority
              />
            </Link>
            <div className="hidden xl:flex items-center gap-8 flex-grow">
              <Link href="/" className="text-nv-green-light font-medium hover:text-green-light">Inicio</Link>
              <Link href="/tienda" className="text-nv-green-light font-medium hover:text-green-light">Tienda</Link>
              <Link href="/" className="text-nv-green-light font-medium hover:text-green-light">Ofertas</Link>
              <Link href="/contacto" className="text-nv-green-light font-medium hover:text-green-light">Contacto</Link>
            </div>
          </div>
          <div className="w-2/3 xl:w-1/2 flex items-center gap-8 justify-end">
            <NavIcons />
          </div>
        </div>
      </div>
      <div className="bg-nv-red-promotional text-white text-center font-semibold p-1">
        <HorizontalSlide />
      </div>
    </>
  );
}

