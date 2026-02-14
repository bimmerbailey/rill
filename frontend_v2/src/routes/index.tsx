import type { ReactNode } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { authApi } from "@/features/auth/services/authApi";
import { useAuthStore } from "@/stores/authStore";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { ProjectsPage } from "@/features/projects/pages/ProjectsPage";
import { ProjectBoardPage } from "@/features/projects/pages/ProjectBoardPage";
import { MyTasksPage } from "@/features/mytasks/pages/MyTasksPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { TeamsPage } from "@/features/teams/pages/TeamsPage";
import { TeamDetailPage } from "@/features/teams/pages/TeamDetailPage";
import {
  TeamProjectsTab,
  TeamMembersTab,
  TeamSettingsTab,
} from "@/features/teams/components";
import { AdminPage } from "@/features/admin/pages/AdminPage";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  }

  return (
    <Navigate to="/login" state={{ redirect: location.pathname }} replace />
  );
}

export function AppRoutes() {
  const { isInitialized, setUser, setInitialized, clearUser } = useAuthStore();

  useEffect(() => {
    let isMounted = true;
    authApi
      .validate()
      .then((response) => {
        if (!isMounted) return;
        if (response.valid) {
          setUser(response.userID, response.role);
        } else {
          clearUser();
        }
        setInitialized(true);
      })
      .catch(() => {
        if (!isMounted) return;
        clearUser();
        setInitialized(true);
      });

    return () => {
      isMounted = false;
    };
  }, [clearUser, setInitialized, setUser]);

  if (!isInitialized) {
    return null;
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectBoardPage />} />
        <Route path="/my-tasks" element={<MyTasksPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:teamId" element={<TeamDetailPage />}>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<TeamProjectsTab />} />
          <Route path="members" element={<TeamMembersTab />} />
          <Route path="settings" element={<TeamSettingsTab />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
