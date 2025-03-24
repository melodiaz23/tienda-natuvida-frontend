'use client';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { Menu } from '@/types/shop.types';
import Search, { SearchSkeleton } from './Search';


export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  // Toggle body scroll when the menu opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md  text-black transition-colors md:hidden"
      >
        <Bars3Icon className="h-8" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <DialogPanel className="fixed  bg-green-dark text-whiteygreen left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10 ">
              <div className="mb-4 w-4/5">
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </div>
              {menu.length ? (
                <ul className="flex w-full flex-col items-center">
                  {menu.map((item: Menu) => (
                    <li
                      className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                      key={item.title}
                    >
                      <Link href={item.path} prefetch={true} onClick={closeMobileMenu}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition >
    </>
  );
}
