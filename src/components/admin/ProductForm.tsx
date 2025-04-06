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
  const [tagInput, setTagInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');
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

  // Manejar ingredientes
  const handleAddIngredient = () => {
    const newIngredient = ingredientInput.trim();
    if (newIngredient && !ingredients.includes(newIngredient)) {
      setValue('ingredients', [...ingredients, newIngredient], {
        shouldValidate: true
      });
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setValue('ingredients', ingredients.filter(ingredient => ingredient !== ingredientToRemove), {
      shouldValidate: true
    });
  };

  const handleIngredientKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  // Manejar beneficios
  const handleAddBenefit = () => {
    const newBenefit = benefitInput.trim();
    if (newBenefit && !benefits.includes(newBenefit)) {
      setValue('benefits', [...benefits, newBenefit], {
        shouldValidate: true
      });
      setBenefitInput('');
    }
  };

  const handleRemoveBenefit = (benefitToRemove: string) => {
    setValue('benefits', benefits.filter(benefit => benefit !== benefitToRemove), {
      shouldValidate: true
    });
  };

  const handleBenefitKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddBenefit();
    }
  };

  // Manejar tags
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      setValue('tags', [...tags, newTag], {
        shouldValidate: true
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue('tags', tags.filter(tag => tag !== tagToRemove), {
      shouldValidate: true
    });
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

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
      // Ya no necesitamos transformar los datos, ya están en el formato correcto
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

          {/* Ingredientes como lista dinámica */}
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
              Ingredientes
            </label>
            <div className="flex">
              <input
                type="text"
                id="ingredient-input"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyDown={handleIngredientKeyPress}
                placeholder="Añadir ingrediente y presionar Enter"
                className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-green-dark focus:border-green-dark"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-green-dark text-white rounded-r-md"
              >
                Añadir
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="bg-green-light/30 px-2 py-1 rounded-md flex items-center">
                  <span>{ingredient}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients.message}</p>}
          </div>

          {/* Beneficios como lista dinámica */}
          <div className="mb-4">
            <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
              Beneficios
            </label>
            <div className="flex">
              <input
                type="text"
                id="benefit-input"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={handleBenefitKeyPress}
                placeholder="Añadir beneficio y presionar Enter"
                className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-green-dark focus:border-green-dark"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-4 py-2 bg-green-dark text-white rounded-r-md"
              >
                Añadir
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-green-light/30 px-2 py-1 rounded-md flex items-center">
                  <span>{benefit}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(benefit)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {errors.benefits && <p className="text-red-500 text-sm">{errors.benefits.message}</p>}
          </div>

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

          {/* Precios con dot notation */}
          <div className="mb-4">
            <label htmlFor="price.unit" className="block text-sm font-medium text-gray-700 mb-1">
              Precio Unitario
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="price.unit"
                {...register('price.unit', {
                  setValueAs: (v) => parseFloat(v) || 0
                })}
                step="0.01"
                className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
              />
            </div>
            {errors.price?.unit && <p className="text-red-500 text-sm">{errors.price.unit.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="price.twoUnits" className="block text-sm font-medium text-gray-700 mb-1">
              Precio 2 Unidades
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="price.twoUnits"
                {...register('price.twoUnits', {
                  setValueAs: (v) => parseFloat(v) || 0
                })}
                step="0.01"
                className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
              />
            </div>
            {errors.price?.twoUnits && <p className="text-red-500 text-sm">{errors.price.twoUnits.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price.threeUnits" className="block text-sm font-medium text-gray-700 mb-1">
              Precio 3 Unidades
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="price.threeUnits"
                {...register('price.threeUnits', {
                  setValueAs: (v) => parseFloat(v) || 0
                })}
                step="0.01"
                className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
              />
            </div>
            {errors.price?.threeUnits && <p className="text-red-500 text-sm">{errors.price.threeUnits.message}</p>}
          </div>

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

          {/* Tags section */}
          <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Etiquetas
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagKeyPress}
                placeholder="Añadir etiqueta y presionar Enter"
                className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-green-dark focus:border-green-dark"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-green-dark text-white rounded-r-md"
              >
                Añadir
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div key={tag} className="bg-green-light/30 px-2 py-1 rounded-md flex items-center">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
            <p className="text-sm text-gray-500 mt-1">
              Las etiquetas ayudan a que los clientes encuentren más fácilmente tu producto
            </p>
          </div>

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