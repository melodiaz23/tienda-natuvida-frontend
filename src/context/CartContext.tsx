'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { CartItem } from '@/types/cart.types';
import { Product } from '@/types/product.types';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '@/services/cartService';
import { calculateCartItemPrices } from '@/components/utils/PriceCalculator';

export interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  syncCartWithServer: () => Promise<void>;
  isCartModalOpen: boolean;
  setIsCartModalOpen: (isOpen: boolean) => void;
}

const initialCartContext: CartContextType = {
  items: [],
  isLoading: false,
  addToCart: () => { },
  removeFromCart: () => { },
  updateQuantity: () => { },
  clearCart: () => { },
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  syncCartWithServer: async () => { },
  isCartModalOpen: false,
  setIsCartModalOpen: () => { }

};

export const CartContext = createContext<CartContextType>(initialCartContext);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);
  const [isLoading, setIsLoading] = useState(false);
  const [serverCartId, setServerCartId] = useState<string | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();


  // Sincronizar carrito con el servidor
  const syncCartWithServer = useCallback(async () => {
    if (!isAuthenticated || items.length === 0) return;
    setIsLoading(true);
    try {
      // Convertir los items a CartItemRequest
      const itemRequests = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));
      const response = await cartService.syncCartFromLocalStorage(itemRequests);
      if (response.success && response.data) {
        setItems(response.data.items);

        if (JSON.stringify(items) !== JSON.stringify(response.data.items)) {
          console.log('Carrito sincronizado con el servidor:', response.data);
        }
      }
    } catch (error) {
      console.error('Error al sincronizar carrito con el servidor:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, items, setItems]);

  // Cargar carrito del servidor
  const loadServerCart = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const response = await cartService.getCurrentCart();
      if (response.success && response.data) {
        setServerCartId(response.data.id);
        if (response.data.items.length > 0) {
          // Si el servidor tiene items, los usamos como base
          if (items.length > 0) {
            // Si también hay items locales, sincronizamos inmediatamente
            await syncCartWithServer();
          } else {
            // Si no hay items locales, simplemente usamos los del servidor
            setItems(response.data.items);
          }
        } else if (items.length > 0) {
          // Si el servidor no tiene items pero el local sí, sincronizamos
          await syncCartWithServer();
        }
      }
    } catch (error) {
      console.error('Error al cargar carrito del servidor:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, items.length, setItems, syncCartWithServer]);


  // Cargar carrito del servidor cuando el usuario inicia sesión
  useEffect(() => {
    if (isAuthenticated) {
      loadServerCart();
    }
  }, [isAuthenticated, loadServerCart]);


  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === product.id);
      if (existingItem) {
        const { subtotal, unitPrice } = calculateCartItemPrices(product.price, existingItem.quantity + quantity);
        return prevItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity, unitPrice, subtotal } : i
        );
      } else {
        const { subtotal, unitPrice } = calculateCartItemPrices(product.price, quantity);
        const newItem: CartItem = {
          id: product.id,
          productId: product.id,
          productName: product.name,
          quantity: quantity,
          unitPrice: unitPrice,
          productPrice: {
            unit: product.price.unit,
            twoUnits: product.price.twoUnits,
            threeUnits: product.price.threeUnits,
          },
          subtotal: subtotal,
        };
        return [...prevItems, newItem];
      }
    });
    setTimeout(() => {
      setIsCartModalOpen(true);
    }, 250);
  };

  // Eliminar un item del carrito
  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Actualizar la cantidad de un item
  const updateQuantity = (itemId: string, quantity: number) => {
    const item = items.find((item) => item.id === itemId);
    if (!item || !item.productPrice) {
      console.error('Item price is undefined');
      return;
    }
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const { subtotal, unitPrice } = calculateCartItemPrices(item.productPrice, quantity);

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity, unitPrice, subtotal } : item
      )
    );
  };

  // Vaciar el carrito
  const clearCart = () => {
    setItems([]);
    // Si el usuario está autenticado, también limpiar en el servidor
    if (isAuthenticated && serverCartId) {
      cartService.clearCart().catch(error =>
        console.error('Error al limpiar carrito en el servidor:', error)
      );
    }
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
  };


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

