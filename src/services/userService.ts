// src/services/userService.ts
import api from '@/utils/api';
import ApiPaths from '@/utils/apiPaths';
import { ApiResponse } from '@/types/api.types';
import { User } from '@/types/user.types';
import { ProfileSchema } from '@/lib/schemas/registerSchema';

const userService = {
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get(ApiPaths.USERS);
    return response.data;
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`${ApiPaths.USERS}/${id}`);
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get(`${ApiPaths.USERS}/me`);
    return response.data;
  },

  updateProfile: async (profileData: ProfileSchema): Promise<ApiResponse<User>> => {
    const response = await api.put(`${ApiPaths.USERS}/me`, profileData);
    return response.data;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put(`${ApiPaths.USERS}/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`${ApiPaths.USERS}/${id}`);
    return response.data;
  }
};

export default userService;