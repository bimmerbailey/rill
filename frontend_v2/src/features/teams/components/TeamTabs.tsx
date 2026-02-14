import { Link } from "react-router-dom";

interface TeamTabsProps {
  teamId: string;
  activeTab: "projects" | "members" | "settings";
}

export function TeamTabs({ teamId, activeTab }: TeamTabsProps) {
  const textSecondary = "rgba(245,238,230,0.5)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const terracotta = "#c9805e";

  const tabs = [
    { id: "projects", label: "Projects", path: `/teams/${teamId}/projects` },
    { id: "members", label: "Members", path: `/teams/${teamId}/members` },
    { id: "settings", label: "Settings", path: `/teams/${teamId}/settings` },
  ];

  return (
    <nav
      style={{
        borderBottom: `1px solid rgba(255,235,210,0.06)`,
        display: "flex",
        gap: "2rem",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Link
            key={tab.id}
            to={tab.path}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: isActive ? textPrimary : textSecondary,
              textDecoration: "none",
              paddingBottom: "1rem",
              borderBottom: isActive
                ? `3px solid ${terracotta}`
                : "3px solid transparent",
              transition: "all 0.3s ease",
            }}
            className="hover:opacity-80"
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
