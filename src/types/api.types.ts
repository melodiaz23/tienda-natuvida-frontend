// General API response (matches ApiResponse.java)
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: string[] | null;
}

// Specific error response (matches ErrorResponseDTO.java)
export interface ErrorResponse {
  code: string;
  message: string;
  timestamp: string;
}

// Combined type for Axios error handling
export type ApiErrorData =
  | ApiResponse<null>   // When API returns standard error response
  | ErrorResponse;   // When API returns specific error response