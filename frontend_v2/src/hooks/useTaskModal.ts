import { useEffect, useState, useCallback } from "react";
import type { FindTaskQuery } from "@/graphql/generated/graphql";
import { useFindTaskQuery, useUpdateTaskNameMutation, useUpdateTaskDescriptionMutation, useSetTaskCompleteMutation } from "@/graphql/generated/graphql";

interface UseTaskModalReturn {
  isOpen: boolean;
  taskId: string | null;
  taskData: FindTaskQuery["findTask"] | null;
  loading: boolean;
  error: Error | null;
  openModal: (taskId: string) => void;
  closeModal: () => void;
  updateTaskName: (name: string) => Promise<void>;
  updateTaskDescription: (description: string) => Promise<void>;
  toggleTaskComplete: (complete: boolean) => Promise<void>;
  isUpdating: boolean;
}

export function useTaskModal(): UseTaskModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);

  const { data, loading, error, refetch } = useFindTaskQuery({
    variables: { taskID: taskId || "" },
    skip: !taskId || !isOpen,
  });

  const [updateNameMutation, { loading: updatingName }] = useUpdateTaskNameMutation();
  const [updateDescriptionMutation, { loading: updatingDescription }] = useUpdateTaskDescriptionMutation();
  const [setCompleteMutation, { loading: updatingComplete }] = useSetTaskCompleteMutation();

  const openModal = useCallback((id: string) => {
    setTaskId(id);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTaskId(null);
  }, []);

  const updateTaskName = useCallback(async (name: string) => {
    if (!taskId) return;
    await updateNameMutation({
      variables: { taskID: taskId, name },
      optimisticResponse: {
        updateTaskName: {
          __typename: "Task",
          id: taskId,
          name,
          position: data?.findTask.position || 0,
        },
      },
    });
  }, [taskId, updateNameMutation, data?.findTask.position]);

  const updateTaskDescription = useCallback(async (description: string) => {
    if (!taskId) return;
    await updateDescriptionMutation({
      variables: { taskID: taskId, description },
      optimisticResponse: {
        updateTaskDescription: {
          __typename: "Task",
          id: taskId,
          description,
        },
      },
    });
    // Defer refetch to next tick to avoid synchronous setState warning
    setTimeout(() => {
      refetch();
    }, 0);
  }, [taskId, updateDescriptionMutation, refetch]);

  const toggleTaskComplete = useCallback(async (complete: boolean) => {
    if (!taskId) return;
    await setCompleteMutation({
      variables: { taskID: taskId, complete },
      optimisticResponse: {
        setTaskComplete: {
          __typename: "Task",
          id: taskId,
          name: data?.findTask.name || "",
          complete,
          completedAt: complete ? new Date().toISOString() : null,
          position: data?.findTask.position || 0,
        },
      },
    });
  }, [taskId, setCompleteMutation, data?.findTask.name, data?.findTask.position]);

  return {
    isOpen,
    taskId,
    taskData: data?.findTask || null,
    loading,
    error: error || null,
    openModal,
    closeModal,
    updateTaskName,
    updateTaskDescription,
    toggleTaskComplete,
    isUpdating: updatingName || updatingDescription || updatingComplete,
  };
}
