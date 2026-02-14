import { useCallback } from "react";
import {
  useCreateTaskChecklistMutation,
  useDeleteTaskChecklistMutation,
  useUpdateTaskChecklistNameMutation,
  useCreateTaskChecklistItemMutation,
  useSetTaskChecklistItemCompleteMutation,
  useDeleteTaskChecklistItemMutation,
  useUpdateTaskChecklistItemNameMutation,
  FindTaskDocument,
  type TaskChecklist,
  type TaskChecklistItem,
} from "@/graphql/generated/graphql";

interface UseTaskChecklistsReturn {
  createChecklist: (
    taskID: string,
    name: string,
    position: number,
  ) => Promise<void>;
  deleteChecklist: (checklistID: string) => Promise<void>;
  renameChecklist: (checklistID: string, name: string) => Promise<void>;
  createItem: (
    checklistID: string,
    name: string,
    position: number,
  ) => Promise<void>;
  deleteItem: (itemID: string) => Promise<void>;
  toggleItemComplete: (itemID: string, complete: boolean) => Promise<void>;
  renameItem: (itemID: string, name: string) => Promise<void>;
  loading: boolean;
}

export function useTaskChecklists(): UseTaskChecklistsReturn {
  const [createChecklistMutation, { loading: creatingChecklist }] =
    useCreateTaskChecklistMutation();
  const [deleteChecklistMutation, { loading: deletingChecklist }] =
    useDeleteTaskChecklistMutation();
  const [renameChecklistMutation, { loading: renamingChecklist }] =
    useUpdateTaskChecklistNameMutation();
  const [createItemMutation, { loading: creatingItem }] =
    useCreateTaskChecklistItemMutation();
  const [toggleItemMutation, { loading: togglingItem }] =
    useSetTaskChecklistItemCompleteMutation();
  const [deleteItemMutation, { loading: deletingItem }] =
    useDeleteTaskChecklistItemMutation();
  const [renameItemMutation, { loading: renamingItem }] =
    useUpdateTaskChecklistItemNameMutation();

  const createChecklist = useCallback(
    async (taskID: string, name: string, position: number) => {
      await createChecklistMutation({
        variables: { taskID, name, position },
        update: (cache, { data }) => {
          if (!data?.createTaskChecklist) return;

          const newChecklist = data.createTaskChecklist;

          cache.updateQuery(
            { query: FindTaskDocument, variables: { taskID } },
            (prev) => {
              if (!prev?.findTask) return prev;
              return {
                ...prev,
                findTask: {
                  ...prev.findTask,
                  checklists: [
                    ...(prev.findTask.checklists || []),
                    newChecklist,
                  ],
                },
              };
            },
          );
        },
      });
    },
    [createChecklistMutation],
  );

  const deleteChecklist = useCallback(
    async (checklistID: string) => {
      await deleteChecklistMutation({
        variables: { taskChecklistID: checklistID },
        update: (cache, { data }) => {
          if (!data?.deleteTaskChecklist || !data.deleteTaskChecklist.ok)
            return;

          const deletedId = data.deleteTaskChecklist.taskChecklist.id;

          cache.updateQuery({ query: FindTaskDocument }, (prev) => {
            if (!prev?.findTask) return prev;
            return {
              ...prev,
              findTask: {
                ...prev.findTask,
                checklists: prev.findTask.checklists?.filter(
                  (c: TaskChecklist) => c.id !== deletedId,
                ),
              },
            };
          });
        },
      });
    },
    [deleteChecklistMutation],
  );

  const renameChecklist = useCallback(
    async (checklistID: string, name: string) => {
      await renameChecklistMutation({
        variables: { taskChecklistID: checklistID, name },
      });
    },
    [renameChecklistMutation],
  );

  const createItem = useCallback(
    async (checklistID: string, name: string, position: number) => {
      await createItemMutation({
        variables: { taskChecklistID: checklistID, name, position },
        update: (cache, { data }) => {
          if (!data?.createTaskChecklistItem) return;

          const newItem = data.createTaskChecklistItem;

          cache.updateQuery({ query: FindTaskDocument }, (prev) => {
            if (!prev?.findTask) return prev;
            return {
              ...prev,
              findTask: {
                ...prev.findTask,
                checklists: prev.findTask.checklists?.map(
                  (checklist: TaskChecklist) => {
                    if (checklist.id === checklistID) {
                      return {
                        ...checklist,
                        items: [...checklist.items, newItem],
                      };
                    }
                    return checklist;
                  },
                ),
              },
            };
          });
        },
      });
    },
    [createItemMutation],
  );

  const deleteItem = useCallback(
    async (itemID: string) => {
      await deleteItemMutation({
        variables: { taskChecklistItemID: itemID },
        update: (cache, { data }) => {
          if (
            !data?.deleteTaskChecklistItem ||
            !data.deleteTaskChecklistItem.ok
          )
            return;

          const { taskChecklistID } =
            data.deleteTaskChecklistItem.taskChecklistItem;

          cache.updateQuery({ query: FindTaskDocument }, (prev) => {
            if (!prev?.findTask) return prev;
            return {
              ...prev,
              findTask: {
                ...prev.findTask,
                checklists: prev.findTask.checklists?.map(
                  (checklist: TaskChecklist) => {
                    if (checklist.id === taskChecklistID) {
                      return {
                        ...checklist,
                        items: checklist.items.filter(
                          (item: TaskChecklistItem) => item.id !== itemID,
                        ),
                      };
                    }
                    return checklist;
                  },
                ),
              },
            };
          });
        },
      });
    },
    [deleteItemMutation],
  );

  const toggleItemComplete = useCallback(
    async (itemID: string, complete: boolean) => {
      await toggleItemMutation({
        variables: { taskChecklistItemID: itemID, complete },
      });
    },
    [toggleItemMutation],
  );

  const renameItem = useCallback(
    async (itemID: string, name: string) => {
      await renameItemMutation({
        variables: { taskChecklistItemID: itemID, name },
      });
    },
    [renameItemMutation],
  );

  return {
    createChecklist,
    deleteChecklist,
    renameChecklist,
    createItem,
    deleteItem,
    toggleItemComplete,
    renameItem,
    loading:
      creatingChecklist ||
      deletingChecklist ||
      renamingChecklist ||
      creatingItem ||
      togglingItem ||
      deletingItem ||
      renamingItem,
  };
}
