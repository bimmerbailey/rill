import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@/components/common";
import { useProjectsData } from "@/features/projects/hooks/useProjects";
import {
  GetProjectsDocument,
  useCreateProjectMutation,
  useCreateTeamMutation,
} from "@/graphql/generated/graphql";

const tileColors = ["#d4754e", "#1a1a1a", "#4a5d4a", "#2f4f6f", "#8b5a3c"];

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
      <div className="max-w-6xl mx-auto p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-28 bg-gray-200 rounded"></div>
            <div className="h-28 bg-gray-200 rounded"></div>
            <div className="h-28 bg-gray-200 rounded"></div>
            <div className="h-28 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 font-semibold mb-2">
            Error loading projects
          </h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display text-[#1a1a1a]">Projects</h1>
          <p className="font-mono text-sm text-[#1a1a1a]/60 mt-2">
            Organize personal work and team initiatives.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setShowTeamModal(true);
          }}
        >
          Add Team
        </Button>
      </div>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
            Personal Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="relative overflow-hidden rounded-md border-2 border-[#1a1a1a] p-4 min-h-[96px] shadow-[4px_4px_0_0_#1a1a1a] transition-transform hover:-translate-y-1"
              style={{ backgroundColor: tileColors[index % tileColors.length] }}
            >
              <div className="absolute inset-0 bg-black/15"></div>
              <div className="relative z-10 text-[#f7f3ef] font-semibold">
                {project.name}
              </div>
            </Link>
          ))}
          <button
            type="button"
            className="rounded-md border-2 border-dashed border-[#1a1a1a] min-h-[96px] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/70 hover:bg-[#1a1a1a] hover:text-[#f7f3ef] transition-colors"
            onClick={() => openProjectModal(null)}
          >
            Create new project
          </button>
        </div>
      </section>

      {projectTeams.map((team) => (
        <section key={team.id} className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
              {team.name}
            </h2>
            <Link
              to="/teams"
              className="font-mono text-xs uppercase tracking-widest text-[#d4754e] hover:underline"
            >
              Manage Team →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.projects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="relative overflow-hidden rounded-md border-2 border-[#1a1a1a] p-4 min-h-[96px] shadow-[4px_4px_0_0_#1a1a1a] transition-transform hover:-translate-y-1"
                style={{
                  backgroundColor: tileColors[index % tileColors.length],
                }}
              >
                <div className="absolute inset-0 bg-black/15"></div>
                <div className="relative z-10 text-[#f7f3ef] font-semibold">
                  {project.name}
                </div>
              </Link>
            ))}
            <button
              type="button"
              className="rounded-md border-2 border-dashed border-[#1a1a1a] min-h-[96px] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/70 hover:bg-[#1a1a1a] hover:text-[#f7f3ef] transition-colors"
              onClick={() => openProjectModal(team.id)}
            >
              Create new project
            </button>
          </div>
        </section>
      ))}

      {showTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-[#f7f3ef] border-2 border-[#1a1a1a] shadow-[8px_8px_0_0_#1a1a1a] p-8 w-full max-w-md">
            <div className="flex items-start justify-between mb-6">
              <h3 className="font-display text-xl text-[#1a1a1a]">
                Create a team
              </h3>
              <button
                type="button"
                onClick={closeTeamModal}
                className="text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
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
              />
              <div className="flex items-center justify-end gap-3">
                <Button variant="text" onClick={closeTeamModal}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTeam} disabled={creatingTeam}>
                  {creatingTeam ? "Creating..." : "Create Team"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-[#f7f3ef] border-2 border-[#1a1a1a] shadow-[8px_8px_0_0_#1a1a1a] p-8 w-full max-w-lg">
            <div className="flex items-start justify-between mb-6">
              <h3 className="font-display text-xl text-[#1a1a1a]">
                Create a project
              </h3>
              <button
                type="button"
                onClick={closeProjectModal}
                className="text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
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
              />
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/70">
                  Team
                </label>
                <select
                  className="w-full px-4 py-3 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] font-mono text-sm"
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
              <div className="flex items-center justify-end gap-3">
                <Button variant="text" onClick={closeProjectModal}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateProject}
                  disabled={creatingProject}
                >
                  {creatingProject ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
