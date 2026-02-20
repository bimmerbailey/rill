import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { Search } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { ProjectFinder } from "./ProjectFinder";
import { ProjectNavPopup } from "./ProjectNavPopup";

/**
 * Top Navbar with "Soft Canvas — Evening" dark theme
 */
export function TopNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated, userRole } = useAuthStore();
  const isAdmin = userRole === "admin";

  // Detect project board route to show project name + popup
  const projectMatch = useMatch("/projects/:projectId");
  const activeProjectId = projectMatch?.params.projectId ?? null;

  const [finderOpen, setFinderOpen] = useState(false);
  const finderRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleFinderClose = useCallback(() => setFinderOpen(false), []);
  const handleFinderToggle = useCallback(
    () => setFinderOpen((prev) => !prev),
    [],
  );

  // Close on outside click
  useEffect(() => {
    if (!finderOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        finderRef.current &&
        !finderRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setFinderOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [finderOpen]);

  // Close on Escape
  useEffect(() => {
    if (!finderOpen) return;
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setFinderOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [finderOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  // Dark palette
  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const border = "var(--color-border)";
  const borderStrong = "var(--color-border-strong)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const fontHeading = "var(--font-heading)";

  return (
    <nav
      className="flex items-center justify-between px-6 py-3 relative z-20"
      style={{
        background: surface1,
        borderBottom: `1px solid ${border}`,
        fontFamily: fontHeading,
      }}
    >
      {/* Left: Logo + project name (when on a project board) */}
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold">
          <Link
            to="/"
            style={{
              color: terracotta,
              textDecoration: "none",
              fontFamily: fontHeading,
            }}
          >
            Taskcafe
          </Link>
        </div>

        {/* Separator + project name popup when viewing a project */}
        {isAuthenticated && activeProjectId && (
          <>
            <span
              style={{
                color: "var(--color-text-tertiary)",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                userSelect: "none",
              }}
            >
              /
            </span>
            <ProjectNavPopup projectId={activeProjectId} />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>

        {/* Project Finder trigger */}
        {isAuthenticated && (
          <div style={{ position: "relative" }}>
            <button
              ref={triggerRef}
              onClick={handleFinderToggle}
              title="Find a project"
              className="nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: finderOpen ? terracotta : "var(--color-text-primary)",
              }}
            >
              Projects
              <Search size={13} style={{ opacity: 0.7 }} />
            </button>

            {/* ProjectFinder dropdown */}
            {finderOpen && (
              <div
                ref={finderRef}
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 50,
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
                  borderRadius: 8,
                  border: `1px solid ${borderStrong}`,
                  background: surface2,
                }}
              >
                {/* Diamond / caret arrow */}
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: 10,
                    height: 10,
                    background: surface2,
                    border: `1px solid ${borderStrong}`,
                    borderBottom: "none",
                    borderRight: "none",
                  }}
                />
                <ProjectFinder onClose={handleFinderClose} />
              </div>
            )}
          </div>
        )}

        {/* Projects link (when not authenticated) */}
        {!isAuthenticated && (
          <Link to="/projects" className="nav-link">
            Projects
          </Link>
        )}

        <Link to="/my-tasks" className="nav-link">
          My Tasks
        </Link>
        <Link to="/teams" className="nav-link">
          Teams
        </Link>
        {isAuthenticated && isAdmin && (
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        )}
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        ) : (
          <button type="button" onClick={handleLogout} className="nav-link">
            Logout
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated && <NotificationBell />}
        <Link
          to="/profile"
          className="nav-link"
          style={{ color: textSecondary }}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
