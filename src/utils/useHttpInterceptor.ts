import { ApiErrorData } from '@/types/api.types';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useHttpInterceptor = () => {
  const router = useRouter();

  const handleSuccess = <T = unknown>(
    response: AxiosResponse<T>,
    successMessage?: string
  ): void => {
    // Display success message if provided
    if (successMessage) {
      toast.success(successMessage);
    }
  };

  const handleError = (
    error: unknown,
    defaultMessage = 'Algo salió mal'
  ): void => {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ApiErrorData;

      // Handle authentication errors by status
      if (error.response?.status === 401) {
        if (window.location.pathname !== '/login') {
          toast.error('Tu sesión ha expirado, por favor ingresa de nuevo');
          router.push('/login');
        }
        return;
      }

      // Handle other status-based errors
      if (error.response?.status === 403) {
        toast.error('No tienes permiso para ejecutar esta acción');
        return;
      }

      if (error.response?.status === 404) {
        toast.error('El recurso solicitado no fue encontrado');
        return;
      }

      if (error.response?.status && error.response.status >= 500) {
        toast.error('Error en el servidor, por favor intenta más tarde.');
        return;
      }

      // Handle ApiResponse error type
      if ('success' in errorData && !errorData.success) {
        if (errorData.message) {
          toast.error(errorData.message);
          return;
        }
        if (errorData.errors && errorData.errors.length > 0) {
          toast.error(errorData.errors.join(', '));
          return;
        }
      }

      // Handle ErrorResponse type
      if ('code' in errorData && errorData.message) {
        toast.error(errorData.message);
        return;
      }

      // Default network error message
      if (error.message) {
        if (error.message === 'Network Error') {
          toast.error('No fue posible conectarse al servidor, revisa tu conexión a internet.');
          return;
        }
        toast.error(error.message);
        return;
      }
    }

    toast.error(defaultMessage);
  };

  const handleFormErrors = (error: unknown): Record<string, string> => {
    const formErrors: Record<string, string> = {};

    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ApiErrorData;

      // Handle ApiResponse with fieldErrors
      if ('success' in errorData && !errorData.success) {
        // If fieldErrors exists directly on the response
        if ('fieldErrors' in errorData && errorData.fieldErrors) {
          return errorData.fieldErrors as Record<string, string>;
        }
        // Parse from errors array
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorData.errors.forEach(err => {
            const parts = err.split(':');
            if (parts.length === 2) {
              formErrors[parts[0].trim()] = parts[1].trim();
            }
          });
        }
      }
    }

    return formErrors;
  };

  return {
    handleSuccess,
    handleError,
    handleFormErrors
  };
};


export const handleApiError = (
  error: unknown,
  defaultMessage = 'Algo salió mal'
): string => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiErrorData;

    // Status-based messages
    if (error.response?.status === 401) {
      return 'Credenciales no válidas, por favor verifica.';
    }
    if (error.response?.status === 403) {
      return 'No tienes permiso para ejecutar esta acción';
    }
    if (error.response?.status === 404) {
      return 'El recurso solicitado no fue encontrado';
    }
    if (error.response?.status && error.response.status >= 500) {
      return 'Error de servidor. Por favor, intenta más tarde.';
    }

    // Check if errorData exists before using 'in' operator
    if (errorData) {
      // Handle ApiResponse error type
      if ('success' in errorData && !errorData.success) {
        if (errorData.message) {
          return errorData.message;
        }
        if (errorData.errors && errorData.errors.length > 0) {
          return errorData.errors.join(', ');
        }
      }

      // Handle ErrorResponse type
      if ('code' in errorData && errorData.message) {
        return errorData.message;
      }
    }

    // Network error
    if (error.message === 'Network Error') {
      return 'No fue posible conectarse al servidor, revisa tu conexión a internet.';
    }
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};

export default useHttpInterceptor;