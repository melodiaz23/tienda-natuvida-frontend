'use client';
import Link from 'next/link';
import Image from 'next/image';
import OrderDetails from '@/components/user/order/OrderDetails';
import { Order } from '@/types/order.types';
import { useEffect, useState } from 'react';

import { FaWhatsapp } from 'react-icons/fa';

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const getOrderWithExpiry = () => {
      const orderStorage = sessionStorage.getItem('lastOrder');
      if (!orderStorage) return null;

      try {
        const item = JSON.parse(orderStorage);
        const now = new Date().getTime();

        if (now > item.expiry) {
          sessionStorage.removeItem('lastOrder');
          return null;
        }
        return item.data;
      } catch (error) {
        sessionStorage.removeItem('lastOrder');
        console.error('Error al parsear la orden:', error);
        return null;
      }
    };

    const orderData = getOrderWithExpiry();
    if (orderData) {
      setOrder(orderData);
    }
  }, []);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <Image
            src="/compra-exitosa.png"
            alt="Información de pedido"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />

          <h2 className="text-xl font-bold text-green-dark mb-3">No se encontraron detalles del pedido</h2>

          <p className="text-gray-700 mb-6">
            Si tienes dudas acerca de tu pedido o necesitas ayuda, contáctanos por WhatsApp
            y te ayudaremos lo más pronto posible.
          </p>

          <div className="bg-green-50 p-4 rounded-md mb-4 text-left">
            <h3 className="text-green-800 text-sm font-medium mb-2">Otros motivos por los que podrías ver este mensaje:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>El enlace del pedido ha expirado</li>
              <li>La información del pedido aún está procesándose</li>
              <li>El pedido fue cancelado o eliminado</li>
            </ul>
          </div>

          <Link
            href="https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20tengo%20dudas%20sobre%20mi%20pedido"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-nv-green-light text-white font-medium rounded-md hover:bg-green-dark transition-colors"
          >
            <FaWhatsapp size={20} />
            Contactar soporte
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white md:p-8 rounded-lg shadow-md">
        <div className="flex gap-4 justify-center items-center mb-8">
          <Image src="/compra-exitosa.png" alt="carrito" width={120} height={120} className="object-contain" priority />
          <div>
            <h1 className="text-3xl font-bold text-green-dark">¡Pedido Confirmado!</h1>
            <p className="text-gray-600 mt-2">
              Gracias por tu compra. Tu orden fue creada exitosamente.
            </p>
          </div>
        </div>

        <OrderDetails order={order} />

        <div className="bg-green-50 p-6 rounded-md mb-8 mt-8">
          <h2 className="text-xl font-bold text-green-dark mb-4">¿Qué sigue?</h2>

          <ol className="list-decimal pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-medium">Confirmación:</span> Recibirás un mensaje de WhatsApp con la confirmación de tu pedido.
            </li>
            <li>
              <span className="font-medium">Preparación:</span> Prepararemos tu pedido para el envío en las próximas 24 horas.
            </li>
            <li>
              <span className="font-medium">Envío:</span> Una vez tu pedido esté en camino, te enviaremos los datos de seguimiento.
            </li>
            <li>
              <span className="font-medium">Entrega:</span> Recibirás tu pedido en la dirección indicada. ¡Tu salud y bienestar es nuestra prioridad!
            </li>
          </ol>
        </div>

        <p className="text-center text-green-dark mb-8">
          Te notificaremos cuando tu pedido sea despachado &#x1F389;
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20mi%20pedido%20es%20el%20%23${order?.orderNumber || 0},%20y%20quiero%20confirmarlo.%20Mi%20nombre%20es%20${order?.customer.firstName || ''}`}
            target="_blank"
            className="inline-block px-6 py-3 bg-nv-green-light text-white font-medium rounded-md hover:bg-green-dark transition-colors text-center"
          >
            Confirma tu pedido para despachar más rápido
          </Link>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-white text-green-dark border border-green-dark font-medium rounded-md hover:bg-nv-green-light hover:text-whiteygreen hover:border-nv-green-light transition-colors text-center"
          >
            Volver a la Tienda
          </Link>
        </div>
      </div>
    </div>
  );
}