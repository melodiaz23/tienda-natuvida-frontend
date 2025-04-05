'use client'

import { useState, useRef, useEffect, useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { GrCart } from "react-icons/gr";
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';

export default function CartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const { items, getTotalItems } = useContext(CartContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={modalRef} className="relative">
      <button
        aria-label="Open cart"
        onClick={openCart}
        className="flex items-center"
      >
        <GrCart className="h-6 w-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-dark text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-96 bg-white shadow-lg border-l border-gray-200">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">Carrito de Compras</h2>
            <button onClick={closeCart}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 h-[calc(100vh-180px)] overflow-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <GrCart className="h-16 w-16 text-gray-400" />
                <p className="mt-2 text-gray-500">Tu carrito está vacío</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ${(item.product.price.unit * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex justify-between mb-2">
              <p>Total:</p>
              {/* <p className="font-medium">${getTotalPrice().toFixed(2)}</p> */}
            </div>
            <Link
              href="/checkout"
              className="block w-full rounded-md bg-green-dark p-3 text-center text-sm text-white"
              onClick={closeCart}
            >
              Proceder al pago
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}