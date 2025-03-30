'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginRequest, RegisterRequest, User } from '@/types/user.types';
import authService from '@/services/authService';
import { useRouter } from 'next/navigation';
import { AuthContextType } from '@/types/auth.types';
import { ApiErrorData, ApiResponse } from '@/types/api.types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { handleApiError } from '@/utils/useHttpInterceptor';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is logged in
        const isLoggedIn = authService.isAuthenticated();
        if (isLoggedIn) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success('Login exitoso!');
      } else {
        const errorMessage = response.message || 'Login falló';
        setError(errorMessage);
        toast.error(errorMessage);
      }
      return response;
    } catch (err) {
      const error = err as AxiosError<ApiErrorData>;
      const errorMsg = handleApiError(error, "Error inesperado")
      setError(errorMsg);
      toast.error(errorMsg);
      const errorResponse: ApiResponse<null> = {
        success: false,
        message: errorMsg,
        data: null
      };
      return errorResponse;
    } finally {
      setLoading(false);
    }
  };

  // Register function - adapted to your authService
  const register = async (userData: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      if (response.success) {
        toast.success(response.message || 'Registro exitoso!');
      } else {
        const errorMessage = response.message || 'Registro falló';
        setError(errorMessage);
        toast.error(errorMessage);
      }
      return response;
    } catch (err) {
      const error = err as AxiosError<ApiErrorData>;
      const errorMsg = handleApiError(error, "Error en el registro");
      setError(errorMsg);
      toast.error(errorMsg);
      const errorResponse: ApiResponse<null> = {
        success: false,
        message: errorMsg,
        data: null
      };
      return errorResponse;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login');
      toast.success('Sesión cerrada exitosamente');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Error al cerrar sesión');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};