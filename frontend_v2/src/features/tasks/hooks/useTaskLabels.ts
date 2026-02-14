import { useCallback } from "react";
import { useToggleTaskLabelMutation } from "@/graphql/generated/graphql";

interface UseTaskLabelsReturn {
  toggleLabel: (taskID: string, projectLabelID: string) => Promise<boolean>;
  loading: boolean;
}

export function useTaskLabels(): UseTaskLabelsReturn {
  const [toggleMutation, { loading }] = useToggleTaskLabelMutation();

  const toggleLabel = useCallback(
    async (taskID: string, projectLabelID: string): Promise<boolean> => {
      const result = await toggleMutation({
        variables: { taskID, projectLabelID },
      });
      return result.data?.toggleTaskLabel?.active ?? false;
    },
    [toggleMutation],
  );

  return {
    toggleLabel,
    loading,
  };
}
