'use client';

import Image from 'next/image';
import { CartItem } from '@/types/cart.types';
import Price from '@/components/utils/Price';

import { useState, useEffect } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { Product } from '@/types/product.types';
import CountdownOrderTimer from './CoutdownOrderTimer';

type OrderSummaryProps = {
  items: CartItem[];
  totalPrice: number;
};

function CartItemRow({ item }: { item: CartItem }) {
  const { getProductById } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = getProductById(item.productId);
        setProduct(productData || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [item.productId, getProductById]);

  if (isLoading) {
    return (
      <div className="py-3 flex items-center animate-pulse">
        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded"></div>
        <div className="ml-4 flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="w-16 h-6 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const name = item.productName || (product?.name || 'Producto no disponible');
  const imageUrl = item.productImageUrl || (product?.images?.[0]?.imageUrl || null);

  return (
    <div className="py-3 flex items-center">
      <div className="flex-shrink-0 w-16 h-16 relative">
        {
          <Image
            src={imageUrl ? imageUrl : '/placeholder.png'}
            alt={name}
            width={64}
            height={64}
            className="object-contain w-full h-full"
          />
        }
      </div>
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
      </div>
      <div className="font-medium text-green-dark">
        <Price value={parseFloat((item.unitPrice * item.quantity).toFixed(2))} />
      </div>
    </div>
  );
}

export default function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  if (items.length === 0) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-dark mb-6">Resumen de la Orden</h2>
        <p className="text-gray-600 text-center py-6">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-dark mb-6 text-center">Resumen de la Orden</h2>
      <div className="mb-4">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">Termina tu compra antes de:</p>
          <div className="mt-2">
            <CountdownOrderTimer />
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>

      <div className="border-t border-gray-200 mt-6 pt-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Subtotal</span>
          <Price value={totalPrice} />
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Envío</span>
          <span className="text-sm font-medium text-green-600">GRATIS</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-4">
          <span>Total</span>
          <span className="text-green-dark">
            <Price value={totalPrice} />
          </span>
        </div>
      </div>

      <div className="mt-6 bg-green-50 p-4 rounded-md">
        <h3 className="text-green-800 text-sm font-medium mb-2">Beneficios de tu compra:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Envío gratis a toda Colombia</li>
          <li>Entrega en 1-2 días hábiles (ciudades principales)</li>
          <li>Pago Contraentrega</li>
          <li>Atención personalizada por WhatsApp</li>
        </ul>
      </div>
    </div>
  );
}