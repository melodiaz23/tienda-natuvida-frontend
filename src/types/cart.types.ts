import { ApiResponse } from "./api.types";
import { Price } from "./product.types";

export enum CartStatus {
  ACTIVE = 'ACTIVE',
  CHECKOUT = 'CHECKOUT',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED'
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImageUrl?: string;
  quantity: number;
  unitPrice: number;
  price: Price;
  subtotal: number;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  totalPrice: number;
  status: CartStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItemRequest {
  productId: string;
  quantity: number;
}

export type CartResponse = ApiResponse<Cart>;
export type CartItemResponse = ApiResponse<CartItem>;

