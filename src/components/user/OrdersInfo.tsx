import { useEffect, useState } from 'react';

// import { deleteOrder } from '@/app/actions';

interface Order {
  orderid: string;
  date: string;
  name: string;
  // identification: string;
  phone: string;
  city: string;
  address: string;
  // email: string;
  notes: string;
  productquantity: string;
  paymentmethod: string;
}

export default function OrdersInfo() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.orders.rows);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="w-full min-h-lvh justify-center">
        <table className="w-full flex flex-col overflow-x-auto  ">
          <thead>
            <tr className="w-fit bg-origin-content flex gap-24 p-4 font-bold py-8 text-center bg-slate-100 ">
              <th className="w-6">#</th>
              <th className="w-14">Fecha</th>
              <th className="w-14">Pedido</th>
              <th className="w-32">Nombre</th>
              {/* <th className="w-32">Identificación</th> */}
              <th className="w-32">Teléfono</th>
              <th className="w-64">Dirección</th>
              <th className="w-32">Ciudad</th>
              {/* <th className="w-64">Email</th> */}
              <th className="w-32">Notas del pedido</th>
              <th className="w-32">Cantidad</th>
              <th className="w-32">Método de pago</th>
              <th className="w-32">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.orderid}
                className={`w-fit bg-origin-content flex gap-24 p-4 lg:py-6 text-center items-center ${index % 2 === 0 ? 'bg-green-light/20' : ''
                  }`}>
                <td className="w-6 align-middle">{index + 1}</td>
                <td className="w-14">{order.date}</td>
                <td className="w-14">{order.orderid}</td>
                <td className="w-32">{order.name}</td>
                {/* <td className="w-32">{order.identification}</td> */}
                <td className="w-32">{order.phone}</td>
                <td className="w-64">{order.address}</td>
                <td className="w-32">{order.city}</td>
                {/* <td className="w-64">{order.email}</td> */}
                <td className="w-32">{order.notes}</td>
                <td className="w-32">{order.productquantity}</td>
                <td className="w-32">{order.paymentmethod}</td>
                <td className="w-32">
                  {/* <button
                    onClick={async () => {
                      const res = await deleteOrder(order.orderid);
                      if (!res.message) return;
                      return alert('Order deleted');
                    }}
                    className="bg-red-500 text-white font-bold w-full rounded-lg px-1 py-3 text-sm">
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
