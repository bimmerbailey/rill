import { useMemo } from "react";
import type { FindProjectQuery } from "@/graphql/generated/graphql";
import { useFindProjectQuery } from "@/graphql/generated/graphql";

const sortByPosition = <T extends { position: number }>(items: T[]) =>
  [...items].sort((a, b) => a.position - b.position);

type TaskGroup = FindProjectQuery["findProject"]["taskGroups"][number];
type ProjectMember = FindProjectQuery["findProject"]["members"][number];
type InvitedMember = FindProjectQuery["findProject"]["invitedMembers"][number];
type ProjectLabel = FindProjectQuery["findProject"]["labels"][number];
type LabelColor = FindProjectQuery["labelColors"][number];
type User = FindProjectQuery["users"][number];

export function useProjectBoard(projectID: string) {
  const { data, loading, error, refetch } = useFindProjectQuery({
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

  const members = useMemo<ProjectMember[]>(() => {
    return data?.findProject?.members || [];
  }, [data]);

  const invitedMembers = useMemo<InvitedMember[]>(() => {
    return data?.findProject?.invitedMembers || [];
  }, [data]);

  const labels = useMemo<ProjectLabel[]>(() => {
    return data?.findProject?.labels || [];
  }, [data]);

  const labelColors = useMemo<LabelColor[]>(() => {
    return data?.labelColors || [];
  }, [data]);

  const users = useMemo<User[]>(() => {
    return data?.users || [];
  }, [data]);

  return {
    project: data?.findProject,
    taskGroups,
    members,
    invitedMembers,
    labels,
    labelColors,
    users,
    loading,
    error,
    refetch,
  };
}
