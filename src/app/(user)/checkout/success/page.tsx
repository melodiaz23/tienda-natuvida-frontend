import Link from 'next/link';
import Image from 'next/image';
import { Cart, CartStatus } from '@/types/cart.types';
import Price from '@/components/utils/Price';


export default function OrderSuccessPage() {
  // Temporally using a hardcoded cartInfo and clientInfo
  const cartInfo: Cart = {
    id: '12345',
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Producto 1',
        quantity: 2,
        unitPrice: 10000,
        subtotal: 20000,
        price: {
          unit: 10000,
        }
      },
      {
        id: '2',
        productId: '2',
        productName: 'Producto 2',
        quantity: 1,
        unitPrice: 15000,
        subtotal: 15000,
        price: {
          unit: 15000
        }
      },
    ],
    totalPrice: 35000,
    status: CartStatus.CHECKOUT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const clientInfo = {
    name: 'Juan Pérez',
    phone: '1234567890',
    address: 'Calle Falsa 123',
    city: 'Bogotá',
  };

  const date = new Date();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex gap-4 justify-center items-center mb-8">
          <Image src="/compra-exitosa.png" alt="carrito" width={120} height={120} className="object-contain" priority />
          <div>
            <h1 className="text-3xl font-bold text-green-dark">¡Pedido Confirmado!</h1>
            <p className="text-gray-600 mt-2">
              Gracias por tu compra. Tu orden fue creada exitosamente.
            </p>
          </div>
        </div>
        <div className="rounded-md mb-8">
          <h2 className="text-xl font-bold text-green-dark mb-4">Datos de tu compra:</h2>
          <div className="grid grid-cols-1 gap-4 text-gray-700">
            <div>
              <p className="flex gap-2">
                <span className="font-bold">Fecha:</span>{' '}
                {date.toLocaleDateString('es-CO')}
              </p>
              {clientInfo?.name && (
                <p className="flex gap-2">
                  <span className="font-bold">Nombre:</span>
                  {clientInfo.name}
                </p>
              )}
              {clientInfo?.phone && (
                <p className="flex gap-2">
                  <span className="font-bold">Teléfono:</span>
                  {clientInfo.phone}
                </p>
              )}
              {clientInfo?.address && (
                <p className="flex gap-2">
                  <span className="font-bold">Dirección:</span>
                  {clientInfo.address}
                </p>
              )}
              {clientInfo?.city && (
                <p className="flex gap-2">
                  <span className="font-bold">Ciudad:</span>
                  {clientInfo.city}
                </p>
              )}
              <p className="flex gap-2">
                <span className="font-bold">Forma de pago:</span> Contraentrega
              </p>
            </div>
          </div>
        </div>

        {cartInfo && cartInfo.items.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-green-dark mb-4">Resumen del pedido:</h2>

            <div className="flex gap-4 justify-between bg-green-light/30 rounded-md p-3 font-bold text-green-dark mb-2">
              <div className="flex gap-4">
                <div>Cant.</div>
                <div>Producto</div>
              </div>
              <div>Precio</div>
            </div>

            {cartInfo.items.map((item) => (
              <div className="flex gap-4 justify-between border-b py-3" key={item.id}>
                <div className="flex gap-4">
                  <div className="w-10 text-center">{item.quantity}</div>
                  <div>{item.productName}</div>
                </div>
                <div>
                  <Price value={item.subtotal} />
                </div>
              </div>
            ))}

            <div className="flex gap-4 justify-between bg-green-light/30 rounded-md p-3 mt-4 font-bold">
              <span>Total a pagar:</span>
              <Price value={cartInfo.totalPrice} />
            </div>
          </div>
        )}

        <div className="bg-green-50 p-6 rounded-md mb-8">
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
            href={`https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20mi%20pedido%20es%20el%20%23${cartInfo?.id || '  '},%20y%20quiero%20confirmarlo.%20Mi%20nombre%20es%20${clientInfo?.name || ''}`}
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