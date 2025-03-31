export interface User {
  id: string; // UUID en formato string
  email: string;
  username: string;
  createdAt: string; // LocalDateTime en formato string
  updatedAt: string;
  role: Role;
  enabled: boolean;
  isCustomer: boolean;
}

export interface Role {
  id: number;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  redirectUrl: string
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}