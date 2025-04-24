import { ApiResponse } from "@/types/api.types";
import { Order, OrderRequest, OrderStatus, PaymentMethod } from "@/types/order.types";
import api from "@/utils/api";
import ApiPaths from "@/utils/apiPaths";

// Implementamos el servicio
export const orderService = {
  // Obtener todas las órdenes
  getAllOrders: async (): Promise<ApiResponse<Order[]>> => {
    const response = await api.get(ApiPaths.ORDERS);
    return response.data;
  },

  // Obtener una orden por ID
  getOrderById: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.get(`${ApiPaths.ORDERS}/${id}`);
    return response.data;
  },

  // Obtener órdenes del cliente actual
  getMyOrders: async (): Promise<ApiResponse<Order[]>> => {
    const response = await api.get(`${ApiPaths.ORDERS}/my-orders`);
    return response.data;
  },

  // Obtener órdenes por ID de cliente
  getOrdersByCustomer: async (customerId: string): Promise<ApiResponse<Order[]>> => {
    const response = await api.get(`${ApiPaths.ORDERS}/customer/${customerId}`);
    return response.data;
  },

  // Crear una nueva orden
  createOrder: async (orderRequest: OrderRequest): Promise<ApiResponse<Order>> => {
    console.log("orderRequest", orderRequest);
    const response = await api.post(ApiPaths.ORDERS, orderRequest);
    console.log("response", response);
    return response.data;
  },

  // Actualizar el estado de una orden
  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<ApiResponse<Order>> => {
    const response = await api.patch(`${ApiPaths.ORDERS}/${orderId}/status?status=${status}`);
    return response.data;
  },

  // Eliminar una orden (soft delete)
  deleteOrder: async (orderId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`${ApiPaths.ORDERS}/${orderId}`);
    return response.data;
  },

  // Checkout (para convertir un carrito en una orden)
  checkout: async (shippingAddress: string, paymentMethod: PaymentMethod, notes?: string): Promise<ApiResponse<Order>> => {
    const response = await api.post(`${ApiPaths.CART}/checkout`, {
      shippingAddress,
      paymentMethod,
      notes
    });
    return response.data;
  }
};