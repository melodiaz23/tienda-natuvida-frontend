'use client';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { RiUser3Line } from "react-icons/ri";
import CartModal from '@/components/cart/CartModal';
import Search, { SearchSkeleton } from './Search';
import { useAuth } from '@/context/AuthContext';


export default function NavIcons() {
  const { isAuthenticated, logout } = useAuth();
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
      <div className="relative flex items-center gap-6 xl:gap-6" ref={modalRef}>
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
        <button className="flex items-center"
        >
          <RiUser3Line size={24} className='text-green-dark' onClick={() => setIsProfileOpen(!isProfileOpen)} />
        </button>
        {
          !isAuthenticated && isProfileOpen && (
            <div className="absolute w-48 flex flex-col rounded-md top-10 right-10 text-base bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.3)] z-20">
              <div className='w-full cursor-pointer hover:underline px-6 py-3 rounded-md'>
                <Link href="/login">Iniciar sesión</Link>
              </div>
            </div>
          )
        }
        {isAuthenticated && isProfileOpen && (
          <div className="absolute w-48 flex flex-col rounded-md top-10 right-10 text-base bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.3)] z-20">
            <div className='w-full cursor-pointer hover:bg-green-dark hover:text-whiteygreen px-3 py-2 rounded-md'>
              <Link href="/mi-cuenta">Mi cuenta</Link>
            </div>
            {
              <div className='w-full cursor-pointer hover:underline px-3 py-2 rounded-md'
                onClick={() => {
                  logout();
                  setIsProfileOpen(!isProfileOpen)
                }}>Salir</div>}
          </div>
        )}
        <CartModal />
      </div>
    </>
  );
}
