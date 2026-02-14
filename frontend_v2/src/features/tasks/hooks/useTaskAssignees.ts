import { useCallback } from "react";
import {
  useAssignTaskMutation,
  useUnassignTaskMutation,
} from "@/graphql/generated/graphql";

interface UseTaskAssigneesReturn {
  assign: (taskID: string, userID: string) => Promise<void>;
  unassign: (taskID: string, userID: string) => Promise<void>;
  loading: boolean;
}

export function useTaskAssignees(): UseTaskAssigneesReturn {
  const [assignMutation, { loading: assigning }] = useAssignTaskMutation();
  const [unassignMutation, { loading: unassigning }] =
    useUnassignTaskMutation();

  const assign = useCallback(
    async (taskID: string, userID: string) => {
      await assignMutation({
        variables: { taskID, userID },
      });
    },
    [assignMutation],
  );

  const unassign = useCallback(
    async (taskID: string, userID: string) => {
      await unassignMutation({
        variables: { taskID, userID },
      });
    },
    [unassignMutation],
  );

  return {
    assign,
    unassign,
    loading: assigning || unassigning,
  };
}
