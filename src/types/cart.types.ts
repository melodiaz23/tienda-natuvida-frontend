import { Product } from "./product.types";

export enum CartStatus {
  ACTIVE = 'ACTIVE',
  CHECKOUT = 'CHECKOUT',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED'
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}


export interface Cart {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  totalPrice: number;
  status: CartStatus;
}


export interface CartContextType {
  items: CartItem[];
  // cart: Cart | null;
  // isLoading: boolean;
  // error: string | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  // updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}