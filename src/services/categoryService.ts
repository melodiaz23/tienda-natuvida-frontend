import api from "../utils/api";
import { ApiResponse } from "@/types/api.types";
import { Category, CategoryRequest } from "@/types/category.types";

export const categoryService = {
  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategoryById: async (id: string): Promise<ApiResponse<Category>> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (categoryData: CategoryRequest): Promise<ApiResponse<Category>> => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  updateCategory: async (id: string, categoryData: CategoryRequest): Promise<ApiResponse<Category>> => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }

}