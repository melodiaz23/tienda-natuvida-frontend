"use client";

import { useState } from "react";
import { categoryService } from "@/services/categoryService";
import { useRouter } from "next/navigation";
import { Category } from "@/types/category.types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const router = useRouter();

  const handleSave = async () => {
    try {
      await categoryService.updateCategory(category.id, { name, description });
      setIsEditing(false);
      router.refresh(); // Refresh the page to get updated data
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("¿Está seguro que desea eliminar esta categoría?")) {
      try {
        await categoryService.deleteCategory(category.id);
        router.refresh(); // Refresh the page to get updated data
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-1 flex-col gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={handleSave}
              className="text-green-dark hover:text-green-800 px-2 py-1"
            >
              Guardar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-600 hover:text-gray-800 px-2 py-1"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-medium">{category.name}</span>
          <span className="text-sm">{category.description}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="text-green-dark hover:text-green-dark/85 px-2 py-1"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 px-2 py-1"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}