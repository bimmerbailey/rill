import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useLegacyCreateProjectMutation } from "@/graphql/generated/graphql";
import { useTeamDetail } from "../hooks";
import { ProjectCard } from "./ProjectCard";
import type { SortOption } from "../types";
import { toast } from "react-toastify";

export function TeamProjectsTab() {
  const { teamId } = useParams<{ teamId: string }>();
  const { projects, loading } = useTeamDetail(teamId || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectError, setProjectError] = useState<string | null>(null);

  const [createProject, { loading: creatingProject }] =
    useLegacyCreateProjectMutation({
      refetchQueries: ["getTeam"],
    });

  // Dark palette
  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "alphabetical":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "recent":
      case "members":
      case "stars":
        // For now, keep default order (recent is server-side sorted)
        break;
    }

    return filtered;
  }, [projects, searchQuery, sortOption]);

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      setProjectError("Project name is required.");
      return;
    }

    setProjectError(null);
    try {
      await createProject({
        variables: {
          name: projectName.trim(),
          teamID: teamId || null,
        },
      });
      toast.success("Project created successfully");
      setShowCreateModal(false);
      setProjectName("");
    } catch {
      setProjectError("Unable to create project. Please try again.");
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setProjectName("");
    setProjectError(null);
  };

  const sortOptions: Array<{ id: SortOption; label: string }> = [
    { id: "recent", label: "Most Recently Active" },
    { id: "members", label: "Number of Members" },
    { id: "stars", label: "Number of Stars" },
    { id: "alphabetical", label: "Alphabetical" },
  ];

  if (loading) {
    return (
      <div className="flex gap-8">
        <div style={{ width: "240px" }}>
          <div
            className="animate-pulse"
            style={{
              background: surface2,
              height: "40px",
              borderRadius: "8px",
            }}
          />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  background: surface2,
                  height: "96px",
                  borderRadius: "20px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <div style={{ width: "240px", flexShrink: 0 }}>
          <Input
            placeholder="Search for projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: surface2,
              borderColor: border,
              color: textPrimary,
              marginBottom: "1.5rem",
            }}
          />

          <div>
            <h3
              style={{
                fontFamily: fontBody,
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: textTertiary,
                marginBottom: "0.75rem",
              }}
            >
              Sort
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {sortOptions.map((option) => (
                <li key={option.id}>
                  <button
                    onClick={() => setSortOption(option.id)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "6px",
                      fontFamily: fontBody,
                      fontSize: "0.85rem",
                      fontWeight: sortOption === option.id ? 700 : 400,
                      color:
                        sortOption === option.id ? textPrimary : textSecondary,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (sortOption !== option.id) {
                        e.currentTarget.style.background = surface2;
                        e.currentTarget.style.color = textPrimary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (sortOption !== option.id) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = textSecondary;
                      }
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="flex-1">
          {filteredProjects.length === 0 && searchQuery.trim() === "" ? (
            <div
              style={{
                background: surface1,
                borderRadius: "20px",
                border: `1px solid ${border}`,
                padding: "3rem 2rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.95rem",
                  color: textSecondary,
                  marginBottom: "1.5rem",
                }}
              >
                No projects yet. Create your first project!
              </p>
              <Button
                onClick={() => setShowCreateModal(true)}
                style={{
                  background: terracotta,
                  border: "none",
                  color: "#fff",
                }}
              >
                Create Project
              </Button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div
              style={{
                background: surface1,
                borderRadius: "20px",
                border: `1px solid ${border}`,
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.95rem",
                  color: textSecondary,
                }}
              >
                No projects match your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  colorIndex={index}
                />
              ))}
              <button
                type="button"
                className="min-h-[96px] flex items-center justify-center transition-all duration-300"
                style={{
                  background: "transparent",
                  border: `2px dashed ${border}`,
                  borderRadius: "20px",
                  fontFamily: fontBody,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: textTertiary,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = terracotta;
                  e.currentTarget.style.color = terracotta;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.color = textTertiary;
                }}
                onClick={() => setShowCreateModal(true)}
              >
                Create new project
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="w-full max-w-md"
            style={{
              background: surface1,
              border: `1px solid ${border}`,
              borderRadius: "24px",
              padding: "2rem",
              animation: "d2dFadeUp 0.5s ease-out both",
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <h3
                style={{
                  fontFamily: fontHeading,
                  fontSize: "1.5rem",
                  color: textPrimary,
                }}
              >
                Create a project
              </h3>
              <button
                type="button"
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  color: textTertiary,
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  padding: "0",
                  lineHeight: 1,
                }}
                className="hover:opacity-80 transition-opacity"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <Input
                label="Project name"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                error={projectError || undefined}
                placeholder="Q1 Marketing Campaign"
                style={{
                  background: surface3,
                  borderColor: border,
                  color: textPrimary,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateProject();
                  }
                }}
              />
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    background: "none",
                    border: "none",
                    color: textSecondary,
                    fontFamily: fontBody,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    padding: "0.75rem 1.5rem",
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  Cancel
                </button>
                <Button
                  onClick={handleCreateProject}
                  disabled={creatingProject}
                  style={{
                    background: terracotta,
                    border: "none",
                    color: "#fff",
                    padding: "0.75rem 1.5rem",
                  }}
                >
                  {creatingProject ? "Creating..." : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
