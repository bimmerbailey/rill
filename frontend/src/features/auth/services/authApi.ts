import axios from "@/lib/axios";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  ValidateResponse,
  SettingsResponse,
} from "@/features/auth/types/auth.types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post("/auth/login", credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<unknown> => {
    const initials = credentials.username
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 2)
      .toUpperCase();

    const response = await axios.post("/auth/register", {
      user: {
        username: credentials.username,
        roleCode: "admin",
        email: credentials.email,
        password: credentials.password,
        initials: initials || "US",
        fullname: credentials.username,
      },
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axios.post("/auth/logout");
  },

  validate: async (): Promise<ValidateResponse> => {
    const response = await axios.post("/auth/validate");
    return response.data;
  },

  settings: async (): Promise<SettingsResponse> => {
    const response = await axios.get("/settings");
    return response.data;
  },
};
