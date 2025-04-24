'use client';

import { useState } from 'react';
import { OrderSchema } from '@/lib/schemas/orderSchema';
import { useRouter } from 'next/navigation';
import OrderForm from '../forms/OrderForm';
import { useCart } from '@/hooks/useCart';
import OrderSummary from './OrderSummary';
import { toast } from 'react-toastify';
import { Order, OrderItemRequest, OrderRequest, PaymentMethod } from '@/types/order.types';
import { orderService } from '@/services/orderService';

export default function CheckoutContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  const saveOrderWithExpiration = (orderData: Order) => {
    const item = {
      data: orderData,
      expiry: new Date().getTime() + (60 * 60 * 1000), // 1 hora de expiración
    };
    sessionStorage.setItem('lastOrder', JSON.stringify(item));
  };


  const handleOrderSubmit = async (data: OrderSchema) => {
    if (items.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    try {
      setIsSubmitting(true);

      // Crear los items de la orden a partir del carrito
      const orderItems: OrderItemRequest[] = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }));

      // Crear la solicitud de orden
      const orderRequest: OrderRequest = {
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          nationalId: data.nationalId || '',
          address: data.address,
          city: data.city,
          phoneNumber: data.phone,
        },
        shippingAddress: `${data.address}, ${data.city}`,
        paymentMethod: data.paymentMethod as PaymentMethod,
        items: orderItems,
        notes: data.notes || '',
      };

      // Enviar la orden al servidor
      const response = await orderService.createOrder(orderRequest);

      if (response.success && response.data) {
        toast.success('¡Orden creada exitosamente!');
        saveOrderWithExpiration(response.data);
        clearCart();
        router.push(`/checkout/success`);
      } else {
        toast.error(response.message || 'Error al crear la orden');
      }
    } catch (error) {
      console.error('Error al procesar la orden:', error);

      toast.error('Ocurrió un error al procesar tu orden');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:w-2/3 flex flex-col md:flex-row gap-8 mx-auto mb-20">
      <div className="w-full md:w-3/5">
        <OrderForm onOrderSubmit={handleOrderSubmit} isSubmitting={isSubmitting} />
      </div>
      <div className="w-full lg:w-2/5">
        <OrderSummary items={items} totalPrice={getTotalPrice()} />
      </div>
    </div>
  );
}