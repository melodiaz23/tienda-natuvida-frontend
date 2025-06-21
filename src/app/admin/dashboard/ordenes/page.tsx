'use client';

import { useEffect, useState } from 'react';
import OrdersInfo from "@/components/user/OrdersInfo";
import { orderService } from "@/services/orderService";
import { Order } from "@/types/order.types";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllOrders();
        setOrders(response.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error al cargar las órdenes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="w-full justify-center p-3">
        <h1 className="text-3xl font-bold p-4 text-center">Cargando órdenes...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full justify-center p-3">
        <h1 className="text-3xl font-bold p-4 text-center text-red-500">{error}</h1>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="w-full justify-center p-3">
        <h1 className="text-3xl font-bold p-4 text-center">No hay órdenes</h1>
      </div>
    );
  }

  return (
    <>
      <div className="w-full justify-center p-3">
        <h1 className="text-3xl font-bold p-4 text-center">Orders</h1>
        <div className="p-3 lg:p-12">
          <OrdersInfo orders={orders} />
        </div>
      </div>
    </>
  );
}