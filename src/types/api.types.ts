// Base API response interface
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[]; // Array of error messages for validation errors
}

// Error response helper type
export type ApiErrorResponse = ApiResponse<null>;
