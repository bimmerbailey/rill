import { create } from "zustand";

interface AuthState {
  userId: string | null;
  userRole: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (userId: string, userRole?: string) => void;
  clearUser: () => void;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  userRole: null,
  isAuthenticated: false,
  isInitialized: false,
  setUser: (userId, userRole) => {
    set({ userId, userRole: userRole || null, isAuthenticated: true });
  },
  clearUser: () => {
    set({ userId: null, userRole: null, isAuthenticated: false });
  },
  setInitialized: (initialized) => {
    set({ isInitialized: initialized });
  },
}));
