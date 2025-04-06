'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { CartContextType, CartItem } from '@/types/cart.types';
import { Product } from '@/types/product.types';
import { createContext } from 'react';

const initialCartContext: CartContextType = {
  items: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateQuantity: () => { },
  clearCart: () => { },
  getTotalItems: () => 0,
  getTotalPrice: () => 0
};


export const CartContext = createContext<CartContextType>(initialCartContext);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === product.id);
      if (existingItem) {
        // If item exists, update quantity
        return prevItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        // If item doesn't exist, create a new CartItem
        const newItem: CartItem = {
          id: product.id,
          product: product,
          quantity: quantity,
          unitPrice: product.price.unit,
          subtotal: product.price.unit * quantity
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Eliminar un item del carrito
  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Actualizar la cantidad de un item
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Vaciar el carrito
  const clearCart = () => {
    setItems([]);
  };

  // Obtener el número total de items en el carrito
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener el precio total del carrito
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}


