import { useParams, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTeamDetail } from "../hooks";
import { TeamTabs } from "../components";

export function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { team, loading, error } = useTeamDetail(teamId || "");

  // Dark palette
  const base = "#141211";
  const surface0 = "#1c1917";
  const surface1 = "#231f1c";
  const border = "rgba(255,235,210,0.06)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const textTertiary = "rgba(255,235,210,0.32)";
  const terracotta = "#c9805e";

  // Determine active tab from current URL
  const getActiveTab = (): "projects" | "members" | "settings" => {
    if (location.pathname.includes("/members")) return "members";
    if (location.pathname.includes("/settings")) return "settings";
    return "projects";
  };

  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{
          background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
          color: textPrimary,
        }}
      >
        <div className="max-w-6xl mx-auto px-8 py-10">
          <div className="space-y-6 animate-pulse">
            <div
              style={{
                background: surface1,
                height: "32px",
                width: "220px",
                borderRadius: "10px",
              }}
            />
            <div
              style={{
                background: surface1,
                height: "48px",
                width: "100%",
                borderRadius: "10px",
              }}
            />
            <div
              style={{
                background: surface1,
                height: "400px",
                width: "100%",
                borderRadius: "20px",
                border: `1px solid ${border}`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div
        className="min-h-screen"
        style={{
          background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
          color: textPrimary,
        }}
      >
        <div className="max-w-6xl mx-auto px-8 py-10">
          <div
            style={{
              background: surface1,
              borderRadius: "20px",
              border: `1px solid ${border}`,
              padding: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                color: terracotta,
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
              }}
            >
              Unable to load team
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: textSecondary,
                fontSize: "0.9rem",
              }}
            >
              {error?.message || "Team not found"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
        color: textPrimary,
      }}
    >
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Breadcrumb */}
        <nav
          className="mb-6"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            color: textSecondary,
          }}
        >
          <button
            onClick={() => navigate("/teams")}
            style={{
              background: "none",
              border: "none",
              color: terracotta,
              cursor: "pointer",
              padding: 0,
              textDecoration: "none",
            }}
            className="hover:underline transition-all"
          >
            Teams
          </button>
          <span style={{ margin: "0 0.5rem", color: textTertiary }}>›</span>
          <span style={{ color: textPrimary }}>{team.name}</span>
        </nav>

        {/* Team Header */}
        <header className="mb-8">
          <h1
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: textPrimary,
              marginBottom: "0.5rem",
            }}
          >
            {team.name}
          </h1>
        </header>

        {/* Tabs */}
        <TeamTabs teamId={teamId || ""} activeTab={getActiveTab()} />

        {/* Tab Content */}
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
