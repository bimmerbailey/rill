import { create } from "zustand";

interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (userId: string) => void;
  clearUser: () => void;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  isAuthenticated: false,
  isInitialized: false,
  setUser: (userId) => {
    set({ userId, isAuthenticated: true });
  },
  clearUser: () => {
    set({ userId: null, isAuthenticated: false });
  },
  setInitialized: (initialized) => {
    set({ isInitialized: initialized });
  },
}));
