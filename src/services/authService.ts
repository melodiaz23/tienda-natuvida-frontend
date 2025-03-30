import { AxiosResponse } from 'axios';
import ApiPaths from '../utils/apiPaths';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types/user.types';
import { ApiResponse } from '@/types/api.types';
import api from '@/utils/api';

const { LOGIN, REGISTER, AUTH } = ApiPaths;

const authService = {
  // Registrar un nuevo usuario
  register: async (userData: RegisterRequest): Promise<ApiResponse<User>> => {
    try {
      console.log('Datos enviados al backend:', userData);
      const response: AxiosResponse<ApiResponse<User>> = await api.post(REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Iniciar sesión
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<AuthResponse>> = await api.post(LOGIN, credentials);

      if (response.data.success && response.data.data) {
        // Store access token
        if (response.data.data.token) {
          localStorage.setItem('auth_token', response.data.data.token);
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
        }

        // Store refresh token
        if (response.data.data.refreshToken) {
          localStorage.setItem('refresh_token', response.data.data.refreshToken);
        }

        // Store user data
        if (response.data.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cerrar sesión
  logout: async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await api.post(`${AUTH}/logout`, { refreshToken });
      }
    } catch (error) {
      console.error('Error during server logout:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
    }
  },

  refreshToken: async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        return false;
      }

      const response: AxiosResponse<ApiResponse<AuthResponse>> = await api.post(
        `${AUTH}/refresh-token`,
        { refreshToken }
      );

      if (response.data.success && response.data.data?.token) {
        // Update the tokens in localStorage
        localStorage.setItem('auth_token', response.data.data.token);
        // If your backend returns a new refresh token
        if (response.data.data.refreshToken) {
          localStorage.setItem('refresh_token', response.data.data.refreshToken);
        }
        // Update authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;

        return true;
      }

      return false;
    } catch {
      // If refresh fails, log out the user
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      return false;
    }
  },


  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') {
      return null; // Para evitar errores durante SSR
    }
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') {
      return false; // Para evitar errores durante SSR
    }
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    return !!localStorage.getItem('auth_token');
  },

  // Obtener el token de autenticación
  getToken: (): string | null => {
    if (typeof window === 'undefined') {
      return null; // Para evitar errores durante SSR
    }
    return localStorage.getItem('auth_token');
  }
};

export default authService;