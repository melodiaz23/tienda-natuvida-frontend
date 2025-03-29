import { ApiResponse } from "./api.types";
import { AuthResponse, LoginRequest, RegisterRequest, User } from "./user.types";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<ApiResponse<AuthResponse>>;
  register: (userData: RegisterRequest) => Promise<ApiResponse<User>>;
  logout: () => Promise<void>;
}
