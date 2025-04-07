export interface User {
  id: string; // UUID en formato string
  email: string;
  name: string;
  lastName: string;
  phone: string;
  createdAt: string; // LocalDateTime en formato string
  updatedAt: string;
  role: Role;
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


// src/types/customer.types.ts
export interface Customer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  nationalId?: string;
  address: string;
  city: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
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