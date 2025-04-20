'use client';
import { Category, ProductImage } from '@/types/product.types';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import ProductImagesManager from './ProductImagesManager';
import { productService } from '@/services/productService';
import { useRouter } from 'next/navigation';
import { categoryService } from '@/services/categoryService';
import { ProductSchema } from '@/lib/schemas/productSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import TagManager from './TagManager';
import PriceManager from './PriceManager';
import IngredientManager from './IngredientManager';
import BenefitManager from './BenefitManager';
import { useProduct } from '@/hooks/useProduct';
import ContraindicationsManager from './ContraindicationsManager';
import BonusesManager from './BonusesManager';


interface ProductFormProps {
  mode: 'create' | 'edit';
  id: string;
}

export const initialProductState: z.infer<typeof ProductSchema> = {
  id: undefined,
  name: '',
  customName: '', // Added customName to the initial state
  description: '',
  presentation: '',
  ingredients: [],
  benefits: [],
  tags: [],
  bonuses: [],
  contraindications: [],
  usageMode: '',
  price: {
    id: undefined,
    unit: 0,
    twoUnits: 0,
    threeUnits: 0
  },
  categories: [],
  images: [],
  enabled: true
};

export default function ProductForm({ mode, id }: ProductFormProps) {
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string[]>([]);

  const router = useRouter();

  const { getProductById } = useProduct();


  const schema = ProductSchema;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialProductState as z.infer<typeof ProductSchema>
  });

  // Observar valores para la UI
  const tags = watch('tags') || [];
  const ingredients = watch('ingredients') || [];
  const benefits = watch('benefits') || [];
  const prices = watch('price') || {};
  const bonuses = watch('bonuses') || [];
  const contraindications = watch('contraindications') || [];
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

  useEffect(() => {
    const loadProduct = async () => {
      if (mode === 'edit' && id) {
        try {
          const productData = getProductById(id);
          console.log(productData)
          if (productData) {
            const formattedData = {
              ...productData,
              categories: productData.categories.map(cat =>
                typeof cat === 'string' ? cat : cat.id
              )
            };
            setSelectedCategoryId(formattedData.categories);
            reset(formattedData);
          }
        } catch (error) {
          console.error("Error loading product:", error);
          toast.error("Error al cargar el producto");
        }
      } else {
        // Si estamos en modo creación, resetear al estado inicial
        reset(initialProductState);
      }
    };
    loadProduct();
  }, [mode, id, getProductById, reset]);


  // Manejar categorías
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const categoryIds = selectedOptions.map(option => option.value);

    // Actualizar el estado y el valor del formulario
    setSelectedCategoryId(categoryIds);
    setValue('categories', categoryIds, { shouldValidate: true });
  };

  // Manejar imágenes
  const handleImagesChange = (newImages: ProductImage[]) => {
    setValue('images', newImages, { shouldValidate: true });
  };

  const submitHandler = async (data: z.infer<typeof schema>) => {
    const toastId = toast.loading('Guardando producto...');


    const processedData = {
      ...data,
      customName: data.customName || '',
      ingredients: data.ingredients || [],
      benefits: data.benefits || [],
      tags: data.tags || [],
      bonuses: data.bonuses || [],
      contraindications: data.contraindications || [],
      categories: data.categories || [],
      images: data.images || [],
      enabled: data.enabled ?? true
    };


    try {
      if (mode === 'edit' && id) {
        await productService.updateProduct(id, processedData);

      } else {
        await productService.createProduct(processedData);
      }

      toast.update(toastId, {
        render: 'Producto guardado',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      router.push('/admin/dashboard/productos');
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
    router.push('/admin/dashboard/productos');
  };

  const handleDelete = async () => {
    if (!id) {
      toast.error('Error al encontrar el producto');
      return;
    }
    try {
      if (confirm('¿Está seguro que desea eliminar este producto?')) {
        await productService.deleteProduct(id);
        toast.success('Producto eliminado con éxito');
        router.push('/admin/dashboard/productos');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('No se pudo eliminar el producto');
    }
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <form
          onSubmit={(e) => {
            console.log("Form onSubmit raw event fired");
            if (Object.keys(errors).length > 0) {
              console.log("Form has validation errors:", errors);
            }
            handleSubmit(submitHandler)(e);
          }}
          method="post"
        >
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
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre para URL:
            </label>
            <input
              type="text"
              id="customName"
              placeholder="Nombre para URL"
              {...register('customName')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            />
            {errors.customName && <p className="text-red-500 text-sm">{errors.customName.message}</p>}
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
            {errors.presentation &&

              <p className="text-red-500 text-sm">{errors.presentation.message}</p>}
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
              multiple
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-dark focus:border-green-dark"
            >
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end">
              <p className="text-xs text-gray-500 mt-1 mr-2">
                Para seleccionar múltiples categorías: Ctrl+clic (o Cmd+clic en Mac).
                Para deseleccionar una categoría, haz Ctrl+clic (o Cmd+clic) en una opción ya seleccionada.
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryId([]);
                    setValue('categories', [], { shouldValidate: true });
                  }}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Limpiar selección
                </button>
              </div>

            </div>
            {errors.categories &&
              Array.isArray(errors.categories) &&
              errors.categories.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error.message}</p>
              ))}

          </div>
          <ContraindicationsManager
            contraindications={contraindications}
            onContraindicationsChange={(newContraindications) =>
              setValue('contraindications', newContraindications, { shouldValidate: true })
            }
            error={errors.contraindications?.message?.toString()}
          />

          <BonusesManager
            bonuses={bonuses}
            onBonusesChange={(newBonuses) =>
              setValue('bonuses', newBonuses, { shouldValidate: true })
            }
            error={errors.bonuses?.message?.toString()}
          />


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
            {id && <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-300 text-gray-900 rounded-md hover:bg-red-400"
            >
              Eliminar
            </button>}
            <button
              type="submit"
              className="px-4 py-2 bg-nv-green-light text-white rounded-md hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-whiteygreen focus:ring-offset-2"
            >
              {mode === 'create' ? 'Crear' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}