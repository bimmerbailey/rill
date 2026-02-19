import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { ProjectFinder } from "./ProjectFinder";

/**
 * Top Navbar with "Soft Canvas — Evening" dark theme
 */
export function TopNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated, userRole } = useAuthStore();
  const isAdmin = userRole === "admin";

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
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";
  const fontHeading = "var(--font-heading)";

  const navLinkStyle = {
    color: textPrimary,
    fontFamily: fontBody,
    fontSize: "0.9rem",
    fontWeight: 500,
    textDecoration: "none",
    transition: "color 0.2s ease",
  };

  return (
    <nav
      className="flex items-center justify-between px-6 py-3 relative z-20"
      style={{
        background: surface1,
        borderBottom: `1px solid ${border}`,
        fontFamily: fontHeading,
      }}
    >
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

      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          style={navLinkStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, { color: terracotta })
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, { color: textPrimary })
          }
        >
          Dashboard
        </Link>

        {/* Project Finder trigger */}
        {isAuthenticated && (
          <div style={{ position: "relative" }}>
            <button
              ref={triggerRef}
              onClick={handleFinderToggle}
              title="Find a project"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: finderOpen ? terracotta : textPrimary,
                fontFamily: fontBody,
                fontSize: "0.9rem",
                fontWeight: 500,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!finderOpen) e.currentTarget.style.color = terracotta;
              }}
              onMouseLeave={(e) => {
                if (!finderOpen) e.currentTarget.style.color = textPrimary;
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
                  // arrow
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
          <Link
            to="/projects"
            style={navLinkStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, { color: terracotta })
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { color: textPrimary })
            }
          >
            Projects
          </Link>
        )}

        <Link
          to="/my-tasks"
          style={navLinkStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, { color: terracotta })
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, { color: textPrimary })
          }
        >
          My Tasks
        </Link>
        <Link
          to="/teams"
          style={navLinkStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, { color: terracotta })
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, { color: textPrimary })
          }
        >
          Teams
        </Link>
        {isAuthenticated && isAdmin && (
          <Link
            to="/admin"
            style={navLinkStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, { color: terracotta })
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { color: textPrimary })
            }
          >
            Admin
          </Link>
        )}
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              style={navLinkStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, { color: terracotta })
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, { color: textPrimary })
              }
            >
              Login
            </Link>
            <Link
              to="/register"
              style={navLinkStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, { color: terracotta })
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, { color: textPrimary })
              }
            >
              Register
            </Link>
          </>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            style={{
              ...navLinkStyle,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, { color: terracotta })
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { color: textPrimary })
            }
          >
            Logout
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated && <NotificationBell />}
        <Link
          to="/profile"
          style={{
            color: textSecondary,
            textDecoration: "none",
            fontFamily: fontBody,
            fontSize: "0.9rem",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, { color: textPrimary })
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, { color: textSecondary })
          }
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
