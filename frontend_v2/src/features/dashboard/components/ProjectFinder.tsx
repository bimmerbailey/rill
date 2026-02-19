import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Search, Loader2 } from "lucide-react";
import { useGetProjectsQuery } from "@/graphql/generated/graphql";

// Persistent collapsed-teams state (survives re-mounts, not page refreshes)
const collapsedTeamsCache = new Set<string>();

const ACCENT_COLORS = [
  "#c9805e", // terracotta
  "#7d9e8c", // sage
  "#6b8fa3", // slate
  "#b5975a", // ochre
  "#9b7fb6", // muted purple
];

interface ProjectFinderProps {
  onClose: () => void;
}

export function ProjectFinder({ onClose }: ProjectFinderProps) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(
    () => new Set(collapsedTeamsCache),
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, loading } = useGetProjectsQuery({
    fetchPolicy: "cache-and-network",
  });

  // Auto-focus search input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const toggleCollapsed = useCallback((teamId: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(teamId)) {
        next.delete(teamId);
        collapsedTeamsCache.delete(teamId);
      } else {
        next.add(teamId);
        collapsedTeamsCache.add(teamId);
      }
      return next;
    });
  }, []);

  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const fontBody = "var(--font-body)";

  if (loading && !data) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          color: textSecondary,
        }}
      >
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const searchTrimmed = search.trim().toLowerCase();
  const filteredProjects = data.projects.filter((p) =>
    searchTrimmed === "" ? true : p.name.toLowerCase().includes(searchTrimmed),
  );

  const personalProjects = filteredProjects
    .filter((p) => p.team === null)
    .sort((a, b) => a.name.localeCompare(b.name));

  const teamGroups = data.teams.map((team, teamIdx) => ({
    id: team.id,
    name: team.name,
    colorIdx: teamIdx,
    projects: filteredProjects
      .filter((p) => p.team?.id === team.id)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));

  const allGroups = [
    ...(personalProjects.length > 0
      ? [
          {
            id: "personal",
            name: "Personal",
            colorIdx: 4,
            projects: personalProjects,
          },
        ]
      : []),
    ...teamGroups.filter((g) => g.projects.length > 0),
  ];

  const hasResults = allGroups.length > 0;

  return (
    <div
      style={{
        width: 280,
        maxHeight: 480,
        display: "flex",
        flexDirection: "column",
        fontFamily: fontBody,
        background: surface2,
        borderRadius: 8,
        border: `1px solid ${border}`,
        overflow: "hidden",
      }}
    >
      {/* Search input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          borderBottom: `1px solid ${border}`,
        }}
      >
        <Search size={14} style={{ color: textSecondary, flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find projects by name…"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: textPrimary,
            fontFamily: fontBody,
            fontSize: "0.875rem",
          }}
        />
      </div>

      {/* Project list */}
      <div style={{ overflowY: "auto", padding: "8px 0" }}>
        {!hasResults && (
          <div
            style={{
              padding: "20px 16px",
              textAlign: "center",
              color: textSecondary,
              fontSize: "0.8rem",
            }}
          >
            {searchTrimmed
              ? "No projects match your search."
              : "No projects yet."}
          </div>
        )}

        {allGroups.map((group) => {
          const isCollapsed = collapsed.has(group.id);
          const accentColor =
            ACCENT_COLORS[group.colorIdx % ACCENT_COLORS.length];

          return (
            <div key={group.id} style={{ marginBottom: 4 }}>
              {/* Team header */}
              <button
                onClick={() => toggleCollapsed(group.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "4px 12px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: textSecondary,
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: textSecondary,
                  }}
                >
                  {group.name}
                </span>
                {isCollapsed ? (
                  <ChevronRight size={14} style={{ color: textSecondary }} />
                ) : (
                  <ChevronDown size={14} style={{ color: textSecondary }} />
                )}
              </button>

              {/* Projects */}
              {!isCollapsed && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    padding: "2px 8px 4px",
                  }}
                >
                  {group.projects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.id}`}
                      onClick={onClose}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "6px 8px",
                        borderRadius: 6,
                        textDecoration: "none",
                        color: textPrimary,
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = surface3;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {/* Color swatch */}
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 4,
                          background: accentColor,
                          flexShrink: 0,
                          opacity: 0.8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          color: "#fff",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.name.charAt(0)}
                      </span>
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {project.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
