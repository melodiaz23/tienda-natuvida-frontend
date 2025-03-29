import { ApiErrorData } from '@/types/api.types';
import { AxiosError } from 'axios';

export const handleApiError = (
  error: unknown,
  defaultMessage = 'Something went wrong'
): string => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiErrorData;

    // Check if it's a standard ApiResponse error
    if ('success' in errorData && !errorData.success) {
      if (errorData.message) {
        return errorData.message;
      }
      if (errorData.errors?.length) {
        return errorData.errors.join(', ');
      }
    }

    // Check if it's an ErrorResponseDTO
    if ('code' in errorData && errorData.message) {
      return errorData.message;
    }

    // Handle network errors
    if (error.message === 'Network Error') {
      return 'Unable to connect to the server. Please check your internet connection.';
    }

    return error.message;
  }

  return error instanceof Error ? error.message : defaultMessage;
};