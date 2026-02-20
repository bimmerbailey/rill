import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import type { GetProjectsQuery } from "@/graphql/generated/graphql";
import { GetProjectsDocument } from "@/graphql/generated/graphql";

const sortByName = <T extends { name: string }>(items: T[]) =>
  [...items].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );

// UI-specific view model derived from generated GraphQL types
type Project = GetProjectsQuery["projects"][number];
type Team = GetProjectsQuery["teams"][number];

interface TeamWithProjects extends Team {
  projects: Project[];
}

export function useProjectsData() {
  const { data, loading, error } = useQuery(GetProjectsDocument);

  const organizations = useMemo(
    () => data?.organizations || [],
    [data?.organizations],
  );
  const teams = useMemo(() => data?.teams || [], [data?.teams]);
  const projects = useMemo(() => data?.projects || [], [data?.projects]);

  const personalProjects = useMemo(() => {
    return sortByName(projects.filter((project) => !project.team));
  }, [projects]);

  const projectTeams = useMemo<TeamWithProjects[]>(() => {
    return sortByName(teams).map((team) => ({
      ...team,
      projects: sortByName(
        projects.filter((project) => project.team?.id === team.id),
      ),
    }));
  }, [projects, teams]);

  return {
    organizations,
    teams,
    projects,
    personalProjects,
    projectTeams,
    loading,
    error,
  };
}
