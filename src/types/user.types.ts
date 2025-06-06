export interface User {
  id: string; // UUID en formato string
  email: string;
  name: string;
  lastName: string;
  phone?: string;
  createdAt: string; // LocalDateTime en formato string
  updatedAt: string;
  role: 'USER' | 'ADMIN';
  enabled: boolean;
  customer: boolean;
  address?: string;
  city?: string;
}

export interface ProfileRequest {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
}


export interface Customer {
  id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  nationalId?: string;
  address: string;
  city: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
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