'use client';

import { useState } from 'react';



import { OrderSchema } from '@/lib/schemas/orderSchema';
import { useRouter } from 'next/navigation';
import OrderForm from '../forms/OrderForm';
import { useCart } from '@/hooks/useCart';
import OrderSummary from './OrderSummary';

export default function CheckoutContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  const handleOrderSubmit = async (data: OrderSchema) => {
    try {
      setIsSubmitting(true);

      // Aquí se implementaría la lógica para enviar la orden al servidor
      console.log('Enviando orden:', data);
      console.log('Items del carrito:', items);

      // Simular un retraso para mostrar el estado de carga
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Después de completar la orden, limpiamos el carrito
      clearCart();

      // Redirigir a una página de confirmación
      router.push('/checkout/success');
    } catch (error) {
      console.error('Error al procesar la orden:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-2/3 flex flex-col md:flex-row gap-8 mx-auto mb-20">
      <div className="w-full md:w-3/5">
        <OrderForm onOrderSubmit={handleOrderSubmit} isSubmitting={isSubmitting} />
      </div>
      <div className="w-full lg:w-2/5">
        <OrderSummary items={items} totalPrice={getTotalPrice()} />
      </div>
    </div>
  );
}