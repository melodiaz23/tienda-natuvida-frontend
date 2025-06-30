import { ProfileSchema } from "@/app/(user)/(auth)/login/_schemas/registerSchema";
import { ApiResponse } from "./api.types";
import { AuthResponse, LoginRequest, RegisterRequest, User } from "./user.types";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<ApiResponse<AuthResponse | null>>;
  register: (userData: RegisterRequest) => Promise<ApiResponse<User | null>>;
  logout: () => Promise<void>;
  updateUserData: () => Promise<boolean>;
  updateProfile: (profileData: ProfileSchema) => Promise<ApiResponse<User> | ApiResponse<null>>;
}
