import api from "../utils/api";
import ApiPaths from "../utils/apiPaths";
import { ApiResponse } from "@/types/api.types";
import { Cart, CartItemRequest } from "@/types/cart.types";

export const cartService = {
  getCurrentCart: async (): Promise<ApiResponse<Cart>> => {
    const response = await api.get(ApiPaths.CART);
    return response.data;
  },

  syncCartFromLocalStorage: async (localCartItems: CartItemRequest[]): Promise<ApiResponse<Cart>> => {
    const response = await api.post(`${ApiPaths.CART}/sync`, localCartItems);
    return response.data;
  },

  addItemToCart: async (itemRequest: CartItemRequest): Promise<ApiResponse<Cart>> => {
    const response = await api.post(`${ApiPaths.CART}/items`, itemRequest);
    return response.data;
  },

  updateCartItemQuantity: async (itemId: string, quantity: number): Promise<ApiResponse<Cart>> => {
    const response = await api.put(`${ApiPaths.CART}/items/${itemId}?quantity=${quantity}`);
    return response.data;
  },

  removeCartItem: async (itemId: string): Promise<ApiResponse<Cart>> => {
    const response = await api.delete(`${ApiPaths.CART}/items/${itemId}`);
    return response.data;
  },

  clearCart: async (): Promise<ApiResponse<Cart>> => {
    const response = await api.delete(`${ApiPaths.CART}/clear`);
    return response.data;
  }
};