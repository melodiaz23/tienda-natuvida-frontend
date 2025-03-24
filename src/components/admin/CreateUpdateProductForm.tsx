'use client';
import { ProductRequest } from '@/types/product.types';
import { useState } from 'react';
import { toast } from "react-toastify";
import ProductImagesManager from './ProductImagesManager';

interface CreateUpdateProductFormProps {
  onSubmit: (data: ProductRequest) => Promise<unknown>;
  initialData?: ProductRequest;
}


export default function CreateUpdateProductForm({ onSubmit, initialData }: CreateUpdateProductFormProps) {

  const [formData, setFormData] = useState<ProductRequest>(initialData || {
    name: '',
    description: '',
    preparation: '',
    ingredients: '',
    pricing: {
      id: undefined,
      unitPrice: 0,
      priceTwoUnits: 0,
      priceThreeUnits: 0,
      previousPrice: 0,
    },
    categoryId: '',
    images: [],
  });


  const validateForm = (): boolean => {
    let isValid = true;
    if (!formData.name || formData.name.trim() === '') {
      toast.error('El nombre del producto es obligatorio');
      isValid = false;
    } else if (formData.pricing.unitPrice <= 0) {
      toast.error('El precio unitario debe ser mayor que cero');
      isValid = false;
    } else if (formData.pricing.priceTwoUnits != null && formData.pricing.priceTwoUnits < 0) {
      toast.error('El precio para dos unidades no puede ser negativo');
      isValid = false;
    } else if (formData.pricing.priceThreeUnits != null && formData.pricing.priceThreeUnits < 0) {
      toast.error('El precio para tres unidades no puede ser negativo');
      isValid = false;
    } else if (formData.pricing.previousPrice != null && formData.pricing.previousPrice < 0) {
      toast.error('El precio anterior no puede ser negativo');
      isValid = false;
    }
    return isValid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'pricing') {
        setFormData({
          ...formData,
          pricing: {
            ...formData.pricing,
            [child]: parseFloat(value) || 0
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      const toastId = toast.loading('Guardando producto...');
      try {
        const processedData = {
          ...formData,
          images: formData.images?.map(img => ({
            ...img,
            isNew: img.id.startsWith('temp-') // Flag temporary IDs
          }))
        };
        await onSubmit(processedData);
        toast.update(toastId, {
          render: 'Producto guardado',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        setFormData({
          name: '',
          description: '',
          preparation: '',
          ingredients: '',
          pricing: {
            id: undefined,
            unitPrice: 0,
            priceTwoUnits: 0,
            priceThreeUnits: 0,
            previousPrice: 0,
          },
          categoryId: '',
          images: [],
        });
      } catch {
        toast.update(toastId, {
          render: 'Error al guardar el producto',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };


  return (
    <div className="container mx-auto max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="preparation" className="block text-sm font-medium text-gray-700 mb-1">
              Modo de Preparación
            </label>
            <textarea
              id="preparation"
              name="preparation"
              value={formData.preparation}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
              Ingredientes
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={1}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Precio Unitario
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="unitPrice"
                name="pricing.unitPrice"
                value={formData.pricing.unitPrice}
                onChange={handleChange}
                step="0.01"
                className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="priceTwoUnits" className="block text-sm font-medium text-gray-700 mb-1">
              Precio 2 Unidades
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="pricing.priceTwoUnits"
                name="pricing.priceTwoUnits"
                value={formData.pricing.priceTwoUnits}
                onChange={handleChange}
                step="0.01"
                className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="priceThreeUnits" className="block text-sm font-medium text-gray-700 mb-1">
              Precio 3 Unidades
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="priceThreeUnits"
                name="pricing.priceThreeUnits"
                value={formData.pricing.priceThreeUnits}
                onChange={handleChange}
                step="0.01"
                className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="previousPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Precio Anterior
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="previousPrice"
                name="previousPrice"
                value={formData.pricing.previousPrice}
                onChange={handleChange}
                step="0.01"
                className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
              />
            </div>
          </div>
          <ProductImagesManager
            images={formData.images || []}
            onChange={(newImages) => setFormData({ ...formData, images: newImages })}
            productName={formData.name}
          />

          <div className="mb-6">
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            >
              {/* TODO: SHOW CATEGORY LIST */}
              {
                initialData?.categoryId && (
                  <option value={initialData.categoryId}>Categoría</option>
                )
              }
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-dark/90 text-white rounded-md hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-whiteygreen focus:ring-offset-2"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}