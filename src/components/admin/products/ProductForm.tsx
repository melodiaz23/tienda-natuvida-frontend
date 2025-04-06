'use client';
import { ProductImage, ProductRequest } from '@/types/product.types';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import ProductImagesManager from './ProductImagesManager';
import { productService } from '@/services/productService';
import { useRouter } from 'next/navigation';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types/category.types';
import { ProductSchema } from '@/lib/schemas/productSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import TagManager from './TagManager';
import PriceManager from './PriceManager';
import IngredientManager from './IngredientManager';
import BenefitManager from './BenefitManager';

interface ProductFormProps {
  mode: 'create' | 'edit';
  initialData?: ProductRequest;
}

export const initialProductState = {
  id: undefined,
  name: '',
  description: '',
  presentation: '',
  ingredients: [],
  benefits: [],
  tags: [],
  usageMode: '',
  price: {
    id: undefined,
    unit: 0,
    twoUnits: 0,
    threeUnits: 0,
    threeByTwo: 0,
    fiveByThree: 0
  },
  categories: [],
  images: [],
  enabled: true
};

export default function ProductForm({ mode, initialData }: ProductFormProps) {
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialData?.categories?.[0] || ''
  );

  const router = useRouter();

  const schema = ProductSchema;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || initialProductState
  });

  // Observar valores para la UI
  const tags = watch('tags') || [];
  const ingredients = watch('ingredients') || [];
  const benefits = watch('benefits') || [];
  const prices = watch('price') || {};
  // const categories = watch('categories') || [];
  const images = watch('images') || [];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        setCategoryOptions(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error al cargar las categorías");
      }
    };

    fetchCategories();
  }, []);



  // Manejar categorías
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);

    if (categoryId) {
      setValue('categories', [categoryId], { shouldValidate: true });
    } else {
      setValue('categories', [], { shouldValidate: true });
    }
  };

  // Manejar imágenes
  const handleImagesChange = (newImages: ProductImage[]) => {
    setValue('images', newImages, { shouldValidate: true });
  };

  const submitHandler = async (data: z.infer<typeof schema>) => {
    const toastId = toast.loading('Guardando producto...');
    try {
      if (mode === 'edit' && initialData?.id) {
        await productService.updateProduct(initialData.id, data);
      } else {
        await productService.createProduct(data);
      }

      toast.update(toastId, {
        render: 'Producto guardado',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      router.push('/dashboard/productos');
    } catch (error) {
      console.error("Error saving product:", error);
      toast.update(toastId, {
        render: 'Error al guardar el producto',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/productos');
  };

  const handleDelete = async () => {
    if (!initialData?.id) {
      toast.error('Error al encontrar el producto');
      return;
    }

    try {
      if (confirm('¿Está seguro que desea eliminar este producto?')) {
        await productService.deleteProduct(initialData.id);
        toast.success('Producto eliminado con éxito');
        router.push('/dashboard/productos');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('No se pudo eliminar el producto');
    }
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(submitHandler)} method="post">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="usageMode" className="block text-sm font-medium text-gray-700 mb-1">
              Modo de Preparación
            </label>
            <textarea
              id="usageMode"
              {...register('usageMode')}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            />
            {errors.usageMode && <p className="text-red-500 text-sm">{errors.usageMode.message}</p>}
          </div>

          <IngredientManager
            ingredients={ingredients}
            onIngredientsChange={(newIngredients) => setValue('ingredients', newIngredients, { shouldValidate: true })}
            error={errors.ingredients?.message?.toString()}
          />

          <BenefitManager
            benefits={benefits}
            onBenefitsChange={(newBenefits) => setValue('benefits', newBenefits, { shouldValidate: true })}
            error={errors.benefits?.message?.toString()}
          />

          <div className="mb-4">
            <label htmlFor="presentation" className="block text-sm font-medium text-gray-700 mb-1">
              Presentación
            </label>
            <textarea
              id="presentation"
              {...register('presentation')}
              rows={1}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            />
            {errors.presentation && <p className="text-red-500 text-sm">{errors.presentation.message}</p>}
          </div>

          <PriceManager
            prices={prices}
            onPriceChange={(field, value) => {
              setValue(`price.${field}`, value, { shouldValidate: true });
            }}
            errors={errors.price}
          />

          <ProductImagesManager
            images={images}
            onChange={handleImagesChange}
            productName={watch('name')}
          />

          <div className="mb-6">
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="category-select"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            >
              <option value="">Seleccionar categoría</option>
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categories && <p className="text-red-500 text-sm">{errors.categories.message}</p>}
          </div>

          <TagManager
            tags={tags}
            onTagsChange={(newTags) => setValue('tags', newTags, { shouldValidate: true })}
            error={errors.tags?.message?.toString()}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            {initialData?.id && <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-300 text-gray-900 rounded-md hover:bg-red-400"
            >
              Eliminar
            </button>}
            <button
              type="submit"
              className="px-4 py-2 bg-green-dark/90 text-white rounded-md hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-whiteygreen focus:ring-offset-2"
            >
              {mode === 'create' ? 'Crear' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}