import api from "../utils/api";
import ApiPaths from "../utils/apiPaths";
import { ApiResponse } from "@/types/api.types";
import { Product, ProductRequest } from "@/types/product.types";

export const productService = {
  getAllProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get(ApiPaths.PRODUCTS);
    return response.data;
  },

  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`${ApiPaths.PRODUCTS}/${id}`);
    return response.data;
  },

  getProductBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`${ApiPaths.PRODUCTS}/slug/${slug}`);
    return response.data;
  },

  createProduct: async (productData: ProductRequest): Promise<ApiResponse<Product>> => {
    const response = await api.post(ApiPaths.PRODUCTS, productData);
    return response.data;
  },

  updateProduct: async (id: string, productData: ProductRequest): Promise<ApiResponse<Product>> => {
    const response = await api.put(`${ApiPaths.PRODUCTS}/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`${ApiPaths.PRODUCTS}/${id}`);
    return response.data;
  }
}