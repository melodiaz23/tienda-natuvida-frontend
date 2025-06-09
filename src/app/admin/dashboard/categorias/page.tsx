'use client'; // ← Agregar esta línea

import { useEffect, useState } from 'react';
import { categoryService } from "@/services/categoryService";
import CreateUpdateCategoriesForm from "@/components/admin/categories/CreateUpdateCategoriesForm";
import CategoryCard from "@/components/admin/categories/CategoryCard";
import { Category } from '@/types/product.types';


export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error al cargar las categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="p-4">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Página de Categorías</h1>
      </div>

      <CreateUpdateCategoriesForm />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {categories.length > 0 ?
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          )) :
          <div className="text-gray-600 italic">No existen categorías por mostrar</div>
        }
      </div>
    </div>
  );
}