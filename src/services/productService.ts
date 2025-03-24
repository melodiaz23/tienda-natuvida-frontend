import api from "./api";
import { ApiResponse } from "@/types/api.types";
import { ProductRequest } from "@/types/product.types";
import { Product } from "@/types/product.types";

export const productService = {
  getAllProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get('/products');
    return response.data;
  },

  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData: ProductRequest): Promise<ApiResponse<Product>> => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id: string, productData: ProductRequest): Promise<ApiResponse<Product>> => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }

}