'use client';
import { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product.types';
import { productService } from '@/services/productService';

export interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Promise<Product | undefined>;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | undefined>;
}

const initialProductContext: ProductContextType = {
  products: [],
  featuredProducts: [],
  isLoading: false,
  error: null,
  getProductById: () => undefined,
  getProductBySlug: async () => undefined,
  fetchProducts: async () => { },
  fetchProductById: async () => undefined
};

export const ProductContext = createContext<ProductContextType>(initialProductContext);

export default function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productService.getAllProducts();
      if (response.success && response.data) {
        setProducts(response.data);
        const featured = response.data.filter(product =>
          product.tags?.includes('destacado')
        );
        setFeaturedProducts(featured);
      } else {
        setError(response.message || 'Error al cargar productos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor: ' + err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productService.getProductById(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.message || 'Error al cargar el producto');
        return undefined;
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error('Error fetching product by ID:', err);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProductById = useCallback((id: string) => {
    return products.find(product => product.id === id);
  }, [products]);

  const getProductBySlug = useCallback(async (slug: string) => {
    const productInState = products.find(product => product.slug === slug);
    if (productInState) return productInState;
    setIsLoading(true);
    setError(null);
    try {
      const response = await productService.getAllProducts();
      if (response.success && response.data) {
        const product = response.data.find(p => p.slug === slug);
        return product;
      }
      return undefined;
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error('Error fetching product by slug:', err);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    featuredProducts,
    isLoading,
    error,
    getProductById,
    getProductBySlug,
    fetchProducts,
    fetchProductById
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}