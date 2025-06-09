'use client'; // ← Agregar esta línea

import { useEffect, useState } from 'react';
import AdminProductCard from "@/components/admin/products/AdminProductCard";
import { productService } from "@/services/productService";
import { Product } from "@/types/product.types";

export default function AdminClientPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cargando productos...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">{error}</h1>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Página de Productos</h1>
        </div>
        <div className="text-center text-gray-600">
          No hay productos disponibles
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Página de Productos</h1>
        <p className="text-gray-600">Total: {products.length} productos</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <AdminProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}