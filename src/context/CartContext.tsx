'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { CartItem } from '@/types/cart.types';
import { Product } from '@/types/product.types';
import { createContext, useCallback, useEffect, useState, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '@/services/cartService';
import { calculateCartItemPrices } from '@/components/utils/PriceCalculator'; // Asegúrate que la ruta es correcta

// Define la interfaz para las props del proveedor si es necesario
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
      console.log('Sincronización omitida: Usuario no autenticado o carrito local vacío.');
      return true; // Se considera éxito si no hay nada que sincronizar o no aplica
    }
    console.log('Iniciando sincronización con el servidor...');
    setIsLoading(true);
    try {
      const itemRequests = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const response = await cartService.syncCartFromLocalStorage(itemRequests);

      if (response.success && response.data) {
        console.log('Carrito sincronizado con éxito. Respuesta:', response.data);
        // Actualiza el estado local y el localStorage con la respuesta del servidor
        setItems(response.data.items);
        return true;
      } else {
        console.error('Error en la respuesta del servidor al sincronizar:', response.message);
        // TODO: Implementar TOAST para enviar mensaje
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
      }
    } catch (error) {
      console.error('Error al cargar carrito del servidor:', error);
      // Mantener items locales si falla la carga
    } finally {
      if (isLoading) setIsLoading(false);
      console.log('Carga/Sincronización inicial finalizada.');
    }
  }, [isAuthenticated, items.length, setItems, syncCartWithServer, isLoading]); // Dependencias

  useEffect(() => {
    if (isAuthenticated) {
      loadCartOnLogin();
    } else {
      setIsCartModalOpen(false);
    }
    // No incluir loadCartOnLogin en las dependencias si solo debe correr al cambiar isAuthenticated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.productId === product.id); // Usa productId para buscar
      const newItems = [...prevItems];

      if (existingItemIndex > -1) {
        // Actualiza item existente
        const existingItem = newItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        const { subtotal, unitPrice } = calculateCartItemPrices(product.price, newQuantity);
        newItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          unitPrice,
          subtotal,
        };
      } else {
        // Agrega nuevo item
        const { subtotal, unitPrice } = calculateCartItemPrices(product.price, quantity);
        const newItem: CartItem = {
          id: product.id, // ¿Debería ser un ID único de línea de carrito o el ID del producto? Revisa tu modelo CartItem
          productId: product.id,
          productName: product.name,
          quantity: quantity,
          unitPrice: unitPrice,
          productPrice: product.price, // Guarda la estructura de precios completa
          subtotal: subtotal,
          // Añade otros detalles del producto si son necesarios (imagen, etc.)
        };
        newItems.push(newItem);
      }
      return newItems;
    });
    // No sincronizar aquí, solo abre el modal
    setTimeout(() => {
      setIsCartModalOpen(true);
    }, 250);
  }, [setItems]); // Dependencia: setItems

  const removeFromCart = useCallback((itemId: string) => { // Asume que itemId es el ID único del CartItem, o productId si así está modelado
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    // No sincronizar aquí
  }, [setItems]); // Dependencia: setItems

  const updateQuantity = useCallback((itemId: string, quantity: number) => { // Asume itemId es el ID único del CartItem
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          if (!item.productPrice) {
            console.error('Item price is undefined for item ID:', itemId);
            return item; // Devuelve el item sin cambios si falta el precio
          }
          const { subtotal, unitPrice } = calculateCartItemPrices(item.productPrice, quantity);
          return { ...item, quantity, unitPrice, subtotal };
        }
        return item;
      })
    );
    // No sincronizar aquí
  }, [setItems, removeFromCart]); // Dependencias: setItems, removeFromCart

  const clearCart = useCallback(async () => {
    setItems([]); // Limpia estado local inmediato
    setIsCartModalOpen(false); // Cierra modal si está abierto

    // Intenta limpiar en el servidor SI está autenticado
    if (isAuthenticated) {
      console.log('Intentando limpiar carrito en el servidor...');
      setIsLoading(true); // Muestra feedback de carga
      try {
        // Asumiendo que clearCart no necesita ID o lo obtiene del token/sesión
        await cartService.clearCart();
        console.log('Carrito limpiado en el servidor.');
      } catch (error) {
        console.error('Error al limpiar carrito en el servidor:', error);
        // Podrías intentar sincronizar un carrito vacío si clear falla,
        // o mostrar un error al usuario.
        // await syncCartWithServer(); // Podría ser una opción de fallback
      } finally {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, setItems, setIsLoading]); // Dependencias


  // --- CÁLCULOS DERIVADOS (MEMORIZADOS) ---

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]); // Depende solo de 'items'

  const getTotalPrice = useCallback(() => {
    // Asegúrate que el cálculo aquí sea consistente con `calculateCartItemPrices`
    // Usar item.subtotal podría ser más directo si siempre está actualizado
    return items.reduce((total, item) => total + item.subtotal, 0);
    // Alternativa si subtotal no está disponible o se recalcula:
    // return items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }, [items]); // Depende solo de 'items'


  // --- VALOR DEL CONTEXTO (MEMORIZADO) ---

  // Usamos useMemo para evitar re-crear el objeto 'value' en cada render
  // si las funciones o valores no han cambiado realmente.
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
    loadCartOnLogin, // Exponer si es necesario llamarla manualmente en algún otro lugar
  }), [
    items, isLoading, addToCart, removeFromCart, updateQuantity, clearCart,
    getTotalItems, getTotalPrice, syncCartWithServer, isCartModalOpen, setIsCartModalOpen, loadCartOnLogin
  ]); // Todas las dependencias del objeto value


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}