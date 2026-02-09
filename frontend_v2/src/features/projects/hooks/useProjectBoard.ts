import { useMemo } from "react";
import type { FindProjectQuery } from "@/graphql/generated/graphql";
import { useFindProjectQuery } from "@/graphql/generated/graphql";

const sortByPosition = <T extends { position: number }>(items: T[]) =>
  [...items].sort((a, b) => a.position - b.position);

// UI-specific view model derived from generated GraphQL types
type TaskGroup = FindProjectQuery["findProject"]["taskGroups"][number];

export function useProjectBoard(projectID: string) {
  const { data, loading, error } = useFindProjectQuery({
    variables: { projectID },
    skip: !projectID,
  });

  const taskGroups = useMemo<TaskGroup[]>(() => {
    const groups = data?.findProject?.taskGroups || [];
    return sortByPosition(groups).map((group) => ({
      ...group,
      tasks: sortByPosition(group.tasks || []),
    }));
  }, [data]);

  return {
    project: data?.findProject,
    taskGroups,
    labelColors: data?.labelColors || [],
    users: data?.users || [],
    loading,
    error,
  };
}
