import { Order, OrderStatus } from '@/types/order.types';
import Price from '@/components/utils/Price';

interface OrderDetailsProps {
  order: Order | null;
}

export default function OrderDetails({ order }: OrderDetailsProps) {

  console.log('Order details:', order);

  if (!order) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">No se encontraron detalles del pedido.</p>
      </div>
    );
  }

  return (
    <div className="bg-white px-6 pt-4 border-b border-gray-200">
      <div className="rounded-md mb-4">
        <h2 className="text-xl font-bold text-green-dark mb-4">Datos de tu compra:</h2>
        <div className="grid grid-cols-1 gap-4 text-gray-700">
          <div>
            <p className="flex flex-col md:flex-row md:gap-2">
              <span className="font-bold">Número de pedido:</span>
              {order.orderNumber}
            </p>
            <p className="flex flex-col md:flex-row md:gap-2">
              <span className="font-bold">Fecha:</span>{' '}
              {new Date(order.orderDate).toLocaleDateString('es-CO')}
            </p>
            <p className="flex flex-col md:flex-row md:gap-2">
              <span className="font-bold">Nombre:</span>
              {order.customer.firstName} {order.customer.lastName}
            </p>
            <p className="flex flex-col md:flex-row md:gap-2">
              <span className="font-bold">Dirección:</span>
              {order.shippingAddress}
            </p>
            <p className="flex flex-col md:flex-row md:gap-2">
              <span className="font-bold">Estado:</span>
              <span className={`${order.status === OrderStatus.PENDING
                ? 'text-yellow-600'
                : order.status === OrderStatus.PROCESSING
                  ? 'text-blue-600'
                  : order.status === OrderStatus.SHIPPED
                    ? 'text-green-600'
                    : order.status === OrderStatus.DELIVERED
                      ? 'text-green-800'
                      : 'text-red-600'
                }`}>
                {order.status === OrderStatus.PENDING
                  ? 'Pendiente'
                  : order.status === OrderStatus.PROCESSING
                    ? 'En proceso'
                    : order.status === OrderStatus.SHIPPED
                      ? 'Enviado'
                      : order.status === OrderStatus.DELIVERED
                        ? 'Entregado'
                        : 'Cancelado'}
              </span>
            </p>
            <p className="flex flex-col md:flex-row md:gap-2">
              <span className="font-bold">Forma de pago:</span>
              {order.paymentMethod === 'CASH_ON_DELIVERY' ? 'Contraentrega' : 'Transferencia'}
            </p>
          </div>
        </div>
      </div>

      {/* Resumen de productos */}
      {order.items && order.items.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-green-dark mb-4">Resumen del pedido:</h2>

          <div className="flex gap-4 justify-between bg-nv-green-soft rounded-md p-3 font-bold text-green-dark mb-2">
            <div className="flex gap-4">
              <div>Cant.</div>
              <div>Producto</div>
            </div>
            <div>Precio</div>
          </div>

          {order.items.map((item) => (
            <div className="flex gap-4 justify-between border-b py-3 border-nv-green-soft text-green-dark" key={item.id}>
              <div className="flex gap-4">
                <div className="w-10 text-center">{item.quantity}</div>
                <div>{item.productName}</div>
              </div>
              <div>
                <Price value={item.subtotal} className='text-base' />
              </div>
            </div>
          ))}

          <div className="flex gap-4 justify-between bg-nv-green-soft rounded-md p-3 mt-4 font-bold text-green-dark">
            <span>Total a pagar:</span>
            <Price value={order.totalAmount} className='text-base font-bold' />
          </div>
        </div>
      )}
    </div>
  );
}