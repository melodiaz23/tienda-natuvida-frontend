'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';


export default function NavIcons() {
  // TODO: Add auth
  const session = false;
  const modalRef = useRef<HTMLDivElement>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsProfileOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <>
      <div className="relative flex items-center gap-4 xl:gap-4" ref={modalRef} >
        <Image
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        />
        {
          !session && isProfileOpen && (
            <div className="absolute w-36 flex flex-col rounded-md top-12 left-0 text-sm bg-white shadow-[0_3px_10px_0_rgba(0,0,0,0.2)] z-20">
              <div className='w-full cursor-pointer hover:underline px-4 py-2 rounded-md'>
                <Link href="/login">Iniciar sesion</Link>
              </div>
            </div>
          )
        }
        {session && isProfileOpen && (

          <div className="absolute w-36 flex flex-col rounded-md top-12 left-0 text-sm bg-white shadow-[0_3px_10px_0_rgba(0,0,0,0.2)] z-20">
            <div className='w-full cursor-pointer hover:bg-green-dark/80 hover:text-whiteygreen px-4 py-2 rounded-md'>
              <Link href="/mi-cuenta">Mi cuenta</Link>
            </div>
            {
              <div className='w-full cursor-pointer hover:underline px-4 py-2 rounded-md'
                onClick={() => {
                  // signOutUser() // TODO: Add auth
                  setIsProfileOpen(!isProfileOpen)
                }}>Salir</div>}
          </div>
        )}
      </div>
    </>
  );
}
