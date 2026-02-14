import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";

/**
 * Top Navbar with "Soft Canvas — Evening" dark theme
 */
export function TopNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated, userRole } = useAuthStore();
  const isAdmin = userRole === "admin";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  // Dark palette
  const surface1 = "var(--color-surface-1)";
  const border = "var(--color-border)";
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

  const navLinkHoverStyle = {
    color: terracotta,
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
      <div className="flex gap-6">
        <Link
          to="/dashboard"
          style={navLinkStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, navLinkHoverStyle)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, { color: textPrimary })
          }
        >
          Dashboard
        </Link>
        <Link
          to="/projects"
          style={navLinkStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, navLinkHoverStyle)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, { color: textPrimary })
          }
        >
          Projects
        </Link>
        <Link
          to="/my-tasks"
          style={navLinkStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, navLinkHoverStyle)
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
            Object.assign(e.currentTarget.style, navLinkHoverStyle)
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
              Object.assign(e.currentTarget.style, navLinkHoverStyle)
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
                Object.assign(e.currentTarget.style, navLinkHoverStyle)
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
                Object.assign(e.currentTarget.style, navLinkHoverStyle)
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
              Object.assign(e.currentTarget.style, navLinkHoverStyle)
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
