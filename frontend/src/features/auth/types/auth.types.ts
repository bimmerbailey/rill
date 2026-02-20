export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  userID: string;
}

export interface ValidateResponse {
  valid: boolean;
  userID: string;
  role?: string;
}

export interface SettingsResponse {
  isConfigured: boolean;
  allowPublicRegistration: boolean;
}
