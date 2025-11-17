export interface RegisterInput {
  fullName: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  fullName: string
  email: string
  role: string
  isActive: boolean
  lastLoginAt?: string
  lastLoginIP?: string
  createdAt: string
  updatedAt: string
}

export interface RegisterResponse {
  id: string
  fullName: string
  email: string
}

export interface LoginResponse {
  user: UserResponse
  accessToken: string
}

export interface AuthError {
  message: string
  field?: string
  code?: string
}
