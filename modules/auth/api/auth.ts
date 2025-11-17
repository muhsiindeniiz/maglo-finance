import { apiClient } from '@/core/api/client'
import {
  RegisterInput,
  LoginInput,
  RegisterResponse,
  LoginResponse,
  UserResponse,
  ApiResponse,
} from '@/core/api/types'

export const authApi = {
  register: (data: RegisterInput) =>
    apiClient.post<ApiResponse<RegisterResponse>>('/users/register', data),

  login: (data: LoginInput) => apiClient.post<ApiResponse<LoginResponse>>('/users/login', data),

  logout: () => apiClient.post<ApiResponse<void>>('/users/logout'),

  refreshToken: (refreshToken: string) =>
    apiClient.post<ApiResponse<{ accessToken: string }>>('/users/refresh-token', {
      refreshToken,
    }),

  getProfile: () => apiClient.get<ApiResponse<UserResponse>>('/users/profile'),
}
