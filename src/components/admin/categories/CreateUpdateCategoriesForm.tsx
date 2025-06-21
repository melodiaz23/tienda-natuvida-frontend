'use client';
import { useState } from "react";
import { categoryService } from "@/services/categoryService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CategoryRequest } from "@/types/product.types";

interface CreateUpdateCategoriesFormProps {
  initialData?: CategoryRequest;
  onSuccess?: () => void;
}

export default function CreateUpdateCategoriesForm({
  initialData,
  onSuccess
}: CreateUpdateCategoriesFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CategoryRequest>(
    initialData || { name: "", description: "" }
  );

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: {
      name?: string;
      description?: string;
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === .0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("El nombre de la categoría es obligatorio");
      return;
    }

    try {
      if (initialData?.id) {
        // Update existing category
        await categoryService.updateCategory(initialData.id, formData);
        toast.success("Categoría actualizada exitosamente");
      } else {
        // Create new category
        await categoryService.createCategory(formData);
        toast.success("Categoría creada exitosamente");
      }

      // Reset form after successful submission
      setFormData({ name: "", description: "" });

      // Refresh data or call success callback
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Error al guardar la categoría. Por favor intente nuevamente.");
    }
  };

  return (
    <>
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">
          {initialData?.id ? "Editar" : "Adicionar"} Categoría
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 mt-4">
            <div className="flex-1 mr-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la categoría
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"
                  } rounded px-3 py-2`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}

              <div className="mt-3">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full p-2 border ${errors.description ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-green-dark focus:border-green-dark`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-dark/85 text-white my-4 px-4 py-2 rounded hover:bg-green-dark"
            >
              {initialData?.id ? "Actualizar" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}