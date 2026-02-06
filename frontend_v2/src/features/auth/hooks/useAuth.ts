import { useCallback } from "react";
import { authApi } from "@/features/auth/services/authApi";
import { useAuthStore } from "@/stores/authStore";

export function useAuth() {
  const { userId, isAuthenticated, setUser, clearUser } = useAuthStore();

  const login = useCallback(
    async (username: string, password: string) => {
      const response = await authApi.login({ username, password });
      setUser(response.userID);
      return response;
    },
    [setUser],
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    clearUser();
  }, [clearUser]);

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      return authApi.register({ username, email, password });
    },
    [],
  );

  return {
    userId,
    isAuthenticated,
    login,
    logout,
    register,
  };
}
