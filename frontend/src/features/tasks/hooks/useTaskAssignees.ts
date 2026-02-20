import { useCallback } from "react";
import { useMutation } from "@apollo/client/react";
import {
  AssignTaskDocument,
  UnassignTaskDocument,
} from "@/graphql/generated/graphql";

interface UseTaskAssigneesReturn {
  assign: (taskID: string, userID: string) => Promise<void>;
  unassign: (taskID: string, userID: string) => Promise<void>;
  loading: boolean;
}

export function useTaskAssignees(): UseTaskAssigneesReturn {
  const [assignMutation, { loading: assigning }] = useMutation(AssignTaskDocument);
  const [unassignMutation, { loading: unassigning }] =
    useMutation(UnassignTaskDocument);

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
