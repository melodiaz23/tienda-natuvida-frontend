import { validateEnvironmentVariables } from '@/lib/utils';
import { MetadataRoute } from 'next';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  // Base URL from environment variables with fallback
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000');


  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const productsResponse = await productService.getAllProducts();

    if (productsResponse.success && productsResponse.data) {
      productRoutes = productsResponse.data.map(product => ({
        url: `${baseUrl}/productos/${product.slug || product.id}`,
        lastModified: product.updatedAt || new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8
      }));
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    if (typeof categoryService !== 'undefined') {
      const categoriesResponse = await categoryService.getAllCategories();

      if (categoriesResponse.success && categoriesResponse.data) {
        categoryRoutes = categoriesResponse.data.map(category => ({
          url: `${baseUrl}/categorias/${category.name || category.id}`,
          lastModified: category.updatedAt || new Date().toISOString(),
          changeFrequency: 'weekly' as const,
          priority: 0.8
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
