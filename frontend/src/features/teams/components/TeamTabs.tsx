import { Link } from "react-router-dom";

interface TeamTabsProps {
  teamId: string;
  activeTab: "projects" | "members" | "settings";
}

export function TeamTabs({ teamId, activeTab }: TeamTabsProps) {
  const textSecondary = "var(--color-text-secondary)";
  const textPrimary = "var(--color-text-primary)";
  const terracotta = "var(--color-terracotta)";
  const border = "var(--color-border)";
  const fontBody = "var(--font-body)";

  const tabs = [
    { id: "projects", label: "Projects", path: `/teams/${teamId}/projects` },
    { id: "members", label: "Members", path: `/teams/${teamId}/members` },
    { id: "settings", label: "Settings", path: `/teams/${teamId}/settings` },
  ];

  return (
    <nav
      style={{
        borderBottom: `1px solid ${border}`,
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
              fontFamily: fontBody,
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
