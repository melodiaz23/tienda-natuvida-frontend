'use client'

import { useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RiShoppingCart2Line } from 'react-icons/ri';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import Price from '../utils/Price';
import { DeleteItemButton } from './DeletItemButton';
import Image from 'next/image';
import EditQuantityButton from './EditQuantityButton';

export default function CartModal() {
  const modalRef = useRef<HTMLDivElement>(null);

  const { items, getTotalItems, getTotalPrice, isCartModalOpen, setIsCartModalOpen } = useCart();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && isCartModalOpen) {
        setIsCartModalOpen(false);
      }
    };
    if (isCartModalOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isCartModalOpen, setIsCartModalOpen]);

  const openCart = () => {
    setIsCartModalOpen(true);
  };

  const closeCart = () => {
    setIsCartModalOpen(false);
  };

  return (
    <div ref={modalRef} className="relative">
      <button
        aria-label="Open cart"
        onClick={openCart}
        className="flex items-center"
      >
        <RiShoppingCart2Line size={24} className='text-green-dark' />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-dark text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>

      {isCartModalOpen && (
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
                <RiShoppingCart2Line className="h-16 w-16 text-gray-400" />
                <p className="mt-2 text-gray-500">Tu carrito está vacío</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="py-4 flex gap-3">
                    <div className="w-16 h-16 rounded-md flex-shrink-0">
                      <div className="absolute z-40 -ml-1 -mt-1">
                        <DeleteItemButton item={item} />
                      </div>
                      <div className="flex-shrink-0 h-20 w-20 overflow-hidden rounded-md border border-neutral-200 bg-neutral-200/40">
                        <Image
                          src={item.productImageUrl || "/placeholder.png"}
                          alt={item.productName}
                          className="h-full w-auto object-cover "
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          width={64}
                          height={64}
                        />
                      </div>
                    </div>
                    <div className="ml-4 flex-1 gap-1">
                      <h3 className="text-sm font-medium">{item.productName}</h3>
                      <div className="flex items-center mt-1 justify-between">
                        <EditQuantityButton
                          itemId={item.id}
                          initialQuantity={item.quantity}
                        />
                        <p className="text-sm font-medium">
                          <Price value={parseFloat((item.unitPrice * item.quantity).toFixed(2))} />
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        <Price value={parseFloat((item.unitPrice * item.quantity).toFixed(2))} />
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
              <p className="font-medium"><Price value={getTotalPrice()} /></p>
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