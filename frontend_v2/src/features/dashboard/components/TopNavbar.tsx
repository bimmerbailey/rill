import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

export function TopNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      <div className="text-xl font-bold">
        <Link to="/" className="text-blue-500 no-underline">
          Taskcafe
        </Link>
      </div>
      <div className="flex gap-6">
        <Link
          to="/dashboard"
          className="text-gray-900 font-medium hover:text-blue-500 no-underline"
        >
          Dashboard
        </Link>
        <Link
          to="/projects"
          className="text-gray-900 font-medium hover:text-blue-500 no-underline"
        >
          Projects
        </Link>
        <Link
          to="/my-tasks"
          className="text-gray-900 font-medium hover:text-blue-500 no-underline"
        >
          My Tasks
        </Link>
        <Link
          to="/teams"
          className="text-gray-900 font-medium hover:text-blue-500 no-underline"
        >
          Teams
        </Link>
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="text-gray-900 font-medium hover:text-blue-500 no-underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-900 font-medium hover:text-blue-500 no-underline"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="text-gray-900 font-medium hover:text-blue-500"
          >
            Logout
          </button>
        )}
      </div>
      <div>
        <Link to="/profile" className="text-gray-900 no-underline">
          Profile
        </Link>
      </div>
    </nav>
  );
}
