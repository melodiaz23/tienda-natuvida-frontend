'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginRequest, RegisterRequest, User } from '@/types/user.types';
import authService from '@/services/authService';
import { AuthContextType } from '@/types/auth.types';
import { ApiErrorData, ApiResponse } from '@/types/api.types';
import { AxiosError } from 'axios';
import { handleApiError } from '@/utils/useHttpInterceptor';
import userService from '@/services/userService';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ProfileSchema } from '@/app/(user)/(auth)/login/_schemas/registerSchema';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check if user is logged in
        const isLoggedIn = authService.isAuthenticated();
        setIsAuthenticated(isLoggedIn);
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
      } else {
        const errorMessage = response.message || 'Login falló';
        setError(errorMessage);
      }
      return response;
    } catch (err) {
      const error = err as AxiosError<ApiErrorData>;
      const errorMsg = handleApiError(error, "Error inesperado")
      setError(errorMsg);
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

  const register = async (userData: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      if (!response.success) {
        const errorMessage = response.message || 'Registro falló';
        setError(errorMessage);
      }
      return response;
    } catch (err) {
      const error = err as AxiosError<ApiErrorData>;
      const errorMsg = handleApiError(error, "Error en el registro");
      setError(errorMsg);
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

  const updateUserData = async () => {
    try {
      const response = await userService.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
      return false;
    }
  };

  const updateProfile = async (profileData: ProfileSchema) => {
    try {
      const result = await userService.updateProfile(profileData);
      if (result.success && result.data) {
        setUser(result.data);
        return result;
      } else {
        return result;
      }
    } catch (error) {
      let errorMessage = 'Error al actualizar el perfil';
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as ApiErrorData;
        errorMessage =
          errorData?.message ||
          (errorData as ApiResponse<null>)?.errors?.[0] ||
          error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(error);
      return {
        success: false,
        message: errorMessage,
        data: null
      } as ApiResponse<null>;
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
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
    logout,
    updateUserData,
    updateProfile
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