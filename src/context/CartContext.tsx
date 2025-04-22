'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { CartItem } from '@/types/cart.types';
import { Product } from '@/types/product.types';
import { createContext, useCallback, useEffect, useState, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '@/services/cartService';
import { calculateCartItemPrices } from '@/components/utils/PriceCalculator';

interface CartProviderProps {
  children: React.ReactNode;
}

export interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  syncCartWithServer: () => Promise<boolean>;
  isCartModalOpen: boolean;
  setIsCartModalOpen: (isOpen: boolean) => void;
  loadCartOnLogin: () => Promise<void>;
}

const initialCartContext: CartContextType = {
  items: [],
  isLoading: false,
  addToCart: () => console.warn('CartContext not initialized'),
  removeFromCart: () => console.warn('CartContext not initialized'),
  updateQuantity: () => console.warn('CartContext not initialized'),
  clearCart: () => console.warn('CartContext not initialized'),
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  syncCartWithServer: async () => { console.warn('CartContext not initialized'); return false; },
  isCartModalOpen: false,
  setIsCartModalOpen: () => console.warn('CartContext not initialized'),
  loadCartOnLogin: async () => console.warn('CartContext not initialized'),
};

export const CartContext = createContext<CartContextType>(initialCartContext);

export default function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const syncCartWithServer = useCallback(async (): Promise<boolean> => {
    if (!isAuthenticated || items.length === 0) {
      return true;
    }
    setIsLoading(true);
    try {
      const itemRequests = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const response = await cartService.syncCartFromLocalStorage(itemRequests);

      if (response.success && response.data) {
        setItems(response.data.items);
        return true;
      } else {
        console.error('Error en la respuesta del servidor al sincronizar:', response.message);
        return false;
      }
    } catch (error) {
      console.error('Error de red o excepción al sincronizar carrito:', error);
      return false;
    } finally {
      setIsLoading(false);
      console.log('Sincronización finalizada.');
    }
  }, [isAuthenticated, items, setItems]);

  const loadCartOnLogin = useCallback(async () => {
    if (!isAuthenticated) return;

    console.log('Cargando carrito del servidor...');
    setIsLoading(true);
    try {
      const response = await cartService.getCurrentCart();
      if (response.success && response.data) {
        console.log('Carrito del servidor obtenido:', response.data);
        const serverItems = response.data.items || [];

        if (serverItems.length > 0) {
          console.log('Usando carrito del servidor.');
          setItems(serverItems);
        } else if (items.length > 0) {
          console.log('Carrito del servidor vacío, sincronizando items locales...');
          await syncCartWithServer();
        } else {
          console.log('Carrito del servidor y local vacíos.');
          setItems([]);
        }
      } else {
        console.error('Error en la respuesta del servidor:', response.message);
        if (items.length > 0) {
          await syncCartWithServer();
        }
      }
    } catch (error) {
      console.error('Error al cargar carrito del servidor:', error);
      if (items.length > 0) {
        await syncCartWithServer();
      }
    } finally {
      setIsLoading(false);
      console.log('Carga/Sincronización inicial finalizada.');
    }
  }, [isAuthenticated, items, setItems, syncCartWithServer]);

  useEffect(() => {
    if (isAuthenticated) {
      loadCartOnLogin();
    } else {
      setIsCartModalOpen(false);
      setItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.productId === product.id);
      const newItems = [...prevItems];

      if (existingItemIndex > -1) {
        // Actualiza item existente
        const existingItem = newItems[existingItemIndex];
        const newQuantity = Math.min(existingItem.quantity + quantity, 5);
        const { subtotal, unitPrice } = calculateCartItemPrices(product.price, newQuantity);
        newItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          unitPrice: unitPrice,
          subtotal,
        };
        console.log('Item actualizado:', newItems[existingItemIndex]);
      } else {
        const limitedQuantity = Math.min(quantity, 5);
        const { subtotal, unitPrice } = calculateCartItemPrices(product.price, limitedQuantity);
        const newItem: CartItem = {
          id: product.id,
          productId: product.id,
          productName: product.name,
          quantity: limitedQuantity,
          unitPrice: unitPrice,
          price: product.price,
          subtotal: subtotal,
          productImageUrl: product.primaryImageUrl,
        };
        newItems.push(newItem);
      }
      return newItems;
    });

    setTimeout(() => {
      setIsCartModalOpen(true);
    }, 250);

    if (isAuthenticated) {
      try {
        const itemRequest = {
          productId: product.id,
          quantity: quantity,
        };
        await cartService.addItemToCart(itemRequest);
      } catch (error) {
        console.error('Error al sincronizar producto con el servidor:', error);
      }
    }
  }, [setItems, isAuthenticated]);

  const removeFromCart = useCallback(async (itemId: string) => {

    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

    if (isAuthenticated) {
      try {
        await cartService.removeCartItem(itemId);
      } catch (error) {
        console.error('Error al eliminar producto del servidor:', error);
      }
    }
  }, [setItems, isAuthenticated]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const limitedQuantity = Math.min(quantity, 5);

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          if (!item.price) {
            console.error('Item price is undefined for item ID:', itemId);
            return item;
          }
          const { subtotal, unitPrice } = calculateCartItemPrices(item.price, limitedQuantity);
          return { ...item, quantity: limitedQuantity, unitPrice, subtotal };
        }
        return item;
      })
    );

    if (isAuthenticated) {
      try {
        await cartService.updateCartItemQuantity(itemId, limitedQuantity);
      } catch (error) {
        console.error('Error al actualizar cantidad en el servidor:', error);
      }
    }
  }, [setItems, removeFromCart, isAuthenticated]);

  const clearCart = useCallback(async () => {
    setItems([]);
    setIsCartModalOpen(false);

    if (isAuthenticated) {
      console.log('Intentando limpiar carrito en el servidor...');
      setIsLoading(true);
      try {
        await cartService.clearCart();
        console.log('Carrito limpiado en el servidor.');
      } catch (error) {
        console.error('Error al limpiar carrito en el servidor:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, setItems, setIsLoading]);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.subtotal, 0);
  }, [items]);

  const value = useMemo(() => ({
    items,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    syncCartWithServer,
    isCartModalOpen,
    setIsCartModalOpen,
    loadCartOnLogin,
  }), [
    items, isLoading, addToCart, removeFromCart, updateQuantity, clearCart,
    getTotalItems, getTotalPrice, syncCartWithServer, isCartModalOpen, setIsCartModalOpen, loadCartOnLogin
  ]);


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}