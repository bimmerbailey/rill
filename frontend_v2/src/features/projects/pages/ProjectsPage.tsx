import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@/components/common";
import { useProjectsData } from "@/features/projects/hooks/useProjects";
import {
  GetProjectsDocument,
  useCreateProjectMutation,
  useCreateTeamMutation,
} from "@/graphql/generated/graphql";

/**
 * Projects Page with "Soft Canvas — Evening" dark theme
 */
export function ProjectsPage() {
  const {
    organizations,
    teams,
    personalProjects,
    projectTeams,
    loading,
    error,
  } = useProjectsData();
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("no-team");
  const [teamError, setTeamError] = useState<string | null>(null);
  const [projectError, setProjectError] = useState<string | null>(null);

  // Dark palette
  const surface0 = "#1c1917";
  const surface1 = "#231f1c";
  const surface2 = "#2c2724";
  const surface3 = "#36302c";
  const border = "rgba(255,235,210,0.06)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const textTertiary = "rgba(245,238,230,0.32)";
  const terracotta = "#c9805e";
  const sage = "#7fa67f";
  const slate = "#7992b0";
  const ochre = "#bfa26e";

  const tileColors = [terracotta, sage, slate, ochre];

  const [createTeam, { loading: creatingTeam }] = useCreateTeamMutation({
    refetchQueries: [{ query: GetProjectsDocument }],
  });
  const [createProject, { loading: creatingProject }] =
    useCreateProjectMutation({
      refetchQueries: [{ query: GetProjectsDocument }],
    });

  const teamOptions = useMemo(
    () => [{ id: "no-team", name: "No team" }, ...teams],
    [teams],
  );

  const openProjectModal = (teamId: string | null) => {
    setProjectName("");
    setProjectError(null);
    setSelectedTeamId(teamId ?? "no-team");
    setShowProjectModal(true);
  };

  const closeProjectModal = () => {
    setShowProjectModal(false);
    setProjectName("");
    setProjectError(null);
    setSelectedTeamId("no-team");
  };

  const closeTeamModal = () => {
    setShowTeamModal(false);
    setTeamName("");
    setTeamError(null);
  };

  const handleCreateTeam = async () => {
    const organizationId = organizations[0]?.id;
    if (!organizationId) {
      setTeamError("No organization available to create a team.");
      return;
    }
    if (!teamName.trim()) {
      setTeamError("Team name is required.");
      return;
    }

    setTeamError(null);
    try {
      await createTeam({
        variables: { name: teamName.trim(), organizationID: organizationId },
      });
      closeTeamModal();
    } catch {
      setTeamError("Unable to create team. Please try again.");
    }
  };

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
          teamID: selectedTeamId === "no-team" ? null : selectedTeamId,
        },
      });
      closeProjectModal();
    } catch {
      setProjectError("Unable to create project. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div className="animate-pulse space-y-6">
          <div
            className="h-8 rounded w-1/4"
            style={{ background: surface2 }}
          ></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className="h-28 rounded"
              style={{ background: surface1 }}
            ></div>
            <div
              className="h-28 rounded"
              style={{ background: surface1 }}
            ></div>
            <div
              className="h-28 rounded"
              style={{ background: surface1 }}
            ></div>
            <div
              className="h-28 rounded"
              style={{ background: surface1 }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div
          className="rounded-lg p-6"
          style={{
            background: surface1,
            border: `1px solid ${border}`,
          }}
        >
          <h2
            className="font-semibold mb-2"
            style={{
              color: terracotta,
              fontFamily: "'Libre Baskerville', serif",
            }}
          >
            Error loading projects
          </h2>
          <p
            style={{
              color: textSecondary,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 relative z-10">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        style={{ animation: "d2dFadeUp 0.7s ease-out both" }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: "2.5rem",
              fontWeight: 400,
              color: textPrimary,
            }}
          >
            Projects
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: textSecondary,
              marginTop: "0.5rem",
            }}
          >
            Organize personal work and team initiatives.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setShowTeamModal(true);
          }}
          style={{
            background: surface1,
            border: `1px solid ${border}`,
            color: textPrimary,
            borderRadius: "8px",
          }}
        >
          <span
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
          >
            Add Team
          </span>
        </Button>
      </div>

      {/* Personal Projects Section */}
      <section
        className="mb-10"
        style={{ animation: "d2dFadeUp 0.7s ease-out 0.1s both" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: textTertiary,
            }}
          >
            Personal Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="relative overflow-hidden p-4 min-h-[96px] transition-all duration-300"
              style={{
                background: surface1,
                border: `1px solid ${border}`,
                borderRadius: "20px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = surface2;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = surface1;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="inline-block mb-3"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: tileColors[index % tileColors.length],
                  boxShadow: `0 0 8px ${tileColors[index % tileColors.length]}40`,
                }}
              />
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: textPrimary,
                }}
              >
                {project.name}
              </div>
            </Link>
          ))}
          <button
            type="button"
            className="min-h-[96px] flex items-center justify-center transition-all duration-300"
            style={{
              background: "transparent",
              border: `2px dashed ${border}`,
              borderRadius: "20px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: textTertiary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = terracotta;
              e.currentTarget.style.color = terracotta;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = border;
              e.currentTarget.style.color = textTertiary;
            }}
            onClick={() => openProjectModal(null)}
          >
            Create new project
          </button>
        </div>
      </section>

      {/* Team Projects Sections */}
      {projectTeams.map((team, teamIndex) => (
        <section
          key={team.id}
          className="mb-10"
          style={{
            animation: `d2dFadeUp 0.7s ease-out ${0.2 + teamIndex * 0.1}s both`,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: textTertiary,
              }}
            >
              {team.name}
            </h2>
            <Link
              to="/teams"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: terracotta,
                textDecoration: "none",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              Manage Team →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.projects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="relative overflow-hidden p-4 min-h-[96px] transition-all duration-300"
                style={{
                  background: surface1,
                  border: `1px solid ${border}`,
                  borderRadius: "20px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = surface2;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = surface1;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="inline-block mb-3"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: tileColors[index % tileColors.length],
                    boxShadow: `0 0 8px ${tileColors[index % tileColors.length]}40`,
                  }}
                />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: textPrimary,
                  }}
                >
                  {project.name}
                </div>
              </Link>
            ))}
            <button
              type="button"
              className="min-h-[96px] flex items-center justify-center transition-all duration-300"
              style={{
                background: "transparent",
                border: `2px dashed ${border}`,
                borderRadius: "20px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: textTertiary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = terracotta;
                e.currentTarget.style.color = terracotta;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.color = textTertiary;
              }}
              onClick={() => openProjectModal(team.id)}
            >
              Create new project
            </button>
          </div>
        </section>
      ))}

      {/* Create Team Modal */}
      {showTeamModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="w-full max-w-md animate-[d2dFadeUp_0.5s_ease-out_both]"
            style={{
              background: surface1,
              border: `1px solid ${border}`,
              borderRadius: "24px",
              padding: "2rem",
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <h3
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: "1.5rem",
                  color: textPrimary,
                }}
              >
                Create a team
              </h3>
              <button
                type="button"
                onClick={closeTeamModal}
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
                label="Team name"
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
                error={teamError || undefined}
                placeholder="Design guild"
                style={{
                  background: surface3,
                  borderColor: border,
                  color: textPrimary,
                }}
              />
              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  variant="text"
                  onClick={closeTeamModal}
                  style={{
                    color: textSecondary,
                    background: "none",
                    border: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Cancel
                  </span>
                </Button>
                <Button
                  onClick={handleCreateTeam}
                  disabled={creatingTeam}
                  style={{
                    background: terracotta,
                    color: surface0,
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {creatingTeam ? "Creating..." : "Create Team"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="w-full max-w-lg animate-[d2dFadeUp_0.5s_ease-out_both]"
            style={{
              background: surface1,
              border: `1px solid ${border}`,
              borderRadius: "24px",
              padding: "2rem",
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <h3
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: "1.5rem",
                  color: textPrimary,
                }}
              >
                Create a project
              </h3>
              <button
                type="button"
                onClick={closeProjectModal}
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
            <div className="space-y-5">
              <Input
                label="Project name"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                error={projectError || undefined}
                placeholder="Q1 roadmap"
                style={{
                  background: surface3,
                  borderColor: border,
                  color: textPrimary,
                }}
              />
              <div className="flex flex-col gap-2">
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: textSecondary,
                  }}
                >
                  Team
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: surface3,
                    border: `1px solid ${border}`,
                    color: textPrimary,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                  }}
                  value={selectedTeamId}
                  onChange={(event) => setSelectedTeamId(event.target.value)}
                >
                  {teamOptions.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  variant="text"
                  onClick={closeProjectModal}
                  style={{
                    color: textSecondary,
                    background: "none",
                    border: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Cancel
                  </span>
                </Button>
                <Button
                  onClick={handleCreateProject}
                  disabled={creatingProject}
                  style={{
                    background: terracotta,
                    color: surface0,
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {creatingProject ? "Creating..." : "Create Project"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
