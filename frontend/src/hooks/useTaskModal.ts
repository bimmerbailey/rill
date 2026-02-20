import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import type {
  FindTaskQuery,
  DueDateNotificationDuration,
} from "@/graphql/generated/graphql";
import {
  FindTaskDocument,
  UpdateTaskNameDocument,
  UpdateTaskDescriptionDocument,
  SetTaskCompleteDocument,
  ToggleTaskWatchDocument,
  CreateTaskCommentDocument,
  UpdateTaskCommentDocument,
  DeleteTaskCommentDocument,
  CreateTaskChecklistDocument,
  DeleteTaskChecklistDocument,
  UpdateTaskChecklistNameDocument,
  CreateTaskChecklistItemDocument,
  DeleteTaskChecklistItemDocument,
  SetTaskChecklistItemCompleteDocument,
  UpdateTaskChecklistItemNameDocument,
  ToggleTaskLabelDocument,
  AssignTaskDocument,
  UnassignTaskDocument,
  UpdateTaskDueDateDocument,
  CreateDueDateNotificationsDocument,
  DeleteDueDateNotificationsDocument,
  CreateProjectLabelDocument,
  UpdateProjectLabelDocument,
  DeleteProjectLabelDocument,
} from "@/graphql/generated/graphql";

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
  toggleTaskWatch: () => Promise<void>;
  createComment: (message: string) => Promise<void>;
  updateComment: (commentID: string, message: string) => Promise<void>;
  deleteComment: (commentID: string) => Promise<void>;
  createChecklist: (name: string, position: number) => Promise<void>;
  deleteChecklist: (checklistID: string) => Promise<void>;
  renameChecklist: (checklistID: string, name: string) => Promise<void>;
  createChecklistItem: (
    checklistID: string,
    name: string,
    position: number,
  ) => Promise<void>;
  deleteChecklistItem: (itemID: string) => Promise<void>;
  toggleChecklistItemComplete: (
    itemID: string,
    complete: boolean,
  ) => Promise<void>;
  renameChecklistItem: (itemID: string, name: string) => Promise<void>;
  toggleLabel: (projectLabelID: string) => Promise<void>;
  createLabel: (
    projectId: string,
    name: string,
    labelColorId: string,
  ) => Promise<void>;
  updateLabel: (
    labelId: string,
    name: string,
    labelColorId: string,
  ) => Promise<void>;
  deleteLabel: (labelId: string) => Promise<void>;
  assign: (userID: string) => Promise<void>;
  unassign: (userID: string) => Promise<void>;
  updateDueDate: (dueDate: string | null, hasTime: boolean) => Promise<void>;
  createDueDateNotification: (
    period: number,
    duration: DueDateNotificationDuration,
  ) => Promise<void>;
  deleteDueDateNotification: (notificationId: string) => Promise<void>;
  isUpdating: boolean;
}

export function useTaskModal(): UseTaskModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);

  const { data, loading, error } = useQuery(FindTaskDocument, {
    variables: { taskID: taskId || "" },
    skip: !taskId || !isOpen,
  });

  const [updateNameMutation, { loading: updatingName }] =
    useMutation(UpdateTaskNameDocument);
  const [updateDescriptionMutation, { loading: updatingDescription }] =
    useMutation(UpdateTaskDescriptionDocument);
  const [setCompleteMutation, { loading: updatingComplete }] =
    useMutation(SetTaskCompleteDocument);
  const [toggleWatchMutation, { loading: updatingWatch }] =
    useMutation(ToggleTaskWatchDocument);

  const [createCommentMutation, { loading: creatingComment }] =
    useMutation(CreateTaskCommentDocument);
  const [updateCommentMutation, { loading: updatingComment }] =
    useMutation(UpdateTaskCommentDocument);
  const [deleteCommentMutation, { loading: deletingComment }] =
    useMutation(DeleteTaskCommentDocument);

  const [createChecklistMutation, { loading: creatingChecklist }] =
    useMutation(CreateTaskChecklistDocument);
  const [deleteChecklistMutation, { loading: deletingChecklist }] =
    useMutation(DeleteTaskChecklistDocument);
  const [renameChecklistMutation, { loading: renamingChecklist }] =
    useMutation(UpdateTaskChecklistNameDocument);
  const [createChecklistItemMutation, { loading: creatingChecklistItem }] =
    useMutation(CreateTaskChecklistItemDocument);
  const [deleteChecklistItemMutation, { loading: deletingChecklistItem }] =
    useMutation(DeleteTaskChecklistItemDocument);
  const [toggleChecklistItemMutation, { loading: togglingChecklistItem }] =
    useMutation(SetTaskChecklistItemCompleteDocument);
  const [renameChecklistItemMutation, { loading: renamingChecklistItem }] =
    useMutation(UpdateTaskChecklistItemNameDocument);

  const [toggleLabelMutation, { loading: togglingLabel }] =
    useMutation(ToggleTaskLabelDocument);
  const [assignMutation, { loading: assigning }] = useMutation(AssignTaskDocument);
  const [unassignMutation, { loading: unassigning }] =
    useMutation(UnassignTaskDocument);

  const [updateDueDateMutation, { loading: updatingDueDate }] =
    useMutation(UpdateTaskDueDateDocument);
  const [createNotificationMutation, { loading: creatingNotification }] =
    useMutation(CreateDueDateNotificationsDocument);
  const [deleteNotificationMutation, { loading: deletingNotification }] =
    useMutation(DeleteDueDateNotificationsDocument);

  const [createLabelMutation, { loading: creatingLabel }] =
    useMutation(CreateProjectLabelDocument);
  const [updateLabelMutation, { loading: updatingLabel }] =
    useMutation(UpdateProjectLabelDocument);
  const [deleteLabelMutation, { loading: deletingLabel }] =
    useMutation(DeleteProjectLabelDocument);

  const openModal = useCallback((id: string) => {
    setTaskId(id);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTaskId(null);
  }, []);

  const fullTaskId = data?.findTask?.id;

  const updateTaskName = useCallback(
    async (name: string) => {
      if (!fullTaskId) return;
      await updateNameMutation({
        variables: { taskID: fullTaskId, name },
      });
    },
    [fullTaskId, updateNameMutation],
  );

  const updateTaskDescription = useCallback(
    async (description: string) => {
      if (!fullTaskId) return;
      await updateDescriptionMutation({
        variables: { taskID: fullTaskId, description },
      });
    },
    [fullTaskId, updateDescriptionMutation],
  );

  const toggleTaskComplete = useCallback(
    async (complete: boolean) => {
      if (!fullTaskId) return;
      await setCompleteMutation({
        variables: { taskID: fullTaskId, complete },
      });
    },
    [fullTaskId, setCompleteMutation],
  );

  const toggleTaskWatch = useCallback(async () => {
    if (!fullTaskId) return;
    await toggleWatchMutation({
      variables: { taskID: fullTaskId },
    });
  }, [fullTaskId, toggleWatchMutation]);

  const createComment = useCallback(
    async (message: string) => {
      if (!fullTaskId || !taskId) return;
      await createCommentMutation({
        variables: { taskID: fullTaskId, message },
        update: (cache, { data }) => {
          if (!data?.createTaskComment) return;
          const newComment = data.createTaskComment.comment;
          cache.updateQuery(
            { query: FindTaskDocument, variables: { taskID: taskId! } },
            (prev) => {
              if (!prev?.findTask) return prev;
              return {
                ...prev,
                findTask: {
                  ...prev.findTask,
                  comments: [...(prev.findTask.comments || []), newComment],
                },
              };
            },
          );
        },
      });
    },
    [fullTaskId, taskId, createCommentMutation],
  );

  const updateComment = useCallback(
    async (commentID: string, message: string) => {
      await updateCommentMutation({
        variables: { commentID, message },
      });
    },
    [updateCommentMutation],
  );

  const deleteComment = useCallback(
    async (commentID: string) => {
      await deleteCommentMutation({
        variables: { commentID },
        update: (cache, { data }) => {
          if (!data?.deleteTaskComment) return;
          const { taskID } = data.deleteTaskComment;
          cache.updateQuery(
            { query: FindTaskDocument, variables: { taskID } },
            (prev) => {
              if (!prev?.findTask) return prev;
              return {
                ...prev,
                findTask: {
                  ...prev.findTask,
                  comments: prev.findTask.comments?.filter(
                    (c) => c.id !== commentID,
                  ),
                },
              };
            },
          );
        },
      });
    },
    [deleteCommentMutation],
  );

  const createChecklist = useCallback(
    async (name: string, position: number) => {
      if (!fullTaskId || !taskId) return;
      await createChecklistMutation({
        variables: { taskID: fullTaskId, name, position },
        update: (cache, { data }) => {
          if (!data?.createTaskChecklist) return;
          const newChecklist = data.createTaskChecklist;
          cache.updateQuery(
            { query: FindTaskDocument, variables: { taskID: taskId! } },
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
    [fullTaskId, taskId, createChecklistMutation],
  );

  const deleteChecklist = useCallback(
    async (checklistID: string) => {
      await deleteChecklistMutation({
        variables: { taskChecklistID: checklistID },
        update: (cache, { data }) => {
          if (!data?.deleteTaskChecklist || !data.deleteTaskChecklist.ok)
            return;
          cache.updateQuery(
            { query: FindTaskDocument, variables: { taskID: taskId! } },
            (prev) => {
              if (!prev?.findTask) return prev;
              return {
                ...prev,
                findTask: {
                  ...prev.findTask,
                  checklists: prev.findTask.checklists?.filter(
                    (c) => c.id !== checklistID,
                  ),
                },
              };
            },
          );
        },
      });
    },
    [taskId, deleteChecklistMutation],
  );

  const renameChecklist = useCallback(
    async (checklistID: string, name: string) => {
      await renameChecklistMutation({
        variables: { taskChecklistID: checklistID, name },
      });
    },
    [renameChecklistMutation],
  );

  const createChecklistItem = useCallback(
    async (checklistID: string, name: string, position: number) => {
      await createChecklistItemMutation({
        variables: { taskChecklistID: checklistID, name, position },
        update: (cache, { data }) => {
          if (!data?.createTaskChecklistItem) return;
          const newItem = data.createTaskChecklistItem;
          cache.updateQuery(
            { query: FindTaskDocument, variables: { taskID: taskId! } },
            (prev) => {
              if (!prev?.findTask) return prev;
              return {
                ...prev,
                findTask: {
                  ...prev.findTask,
                  checklists: prev.findTask.checklists?.map(
                    (c) =>
                      c.id === checklistID
                        ? { ...c, items: [...c.items, newItem] }
                        : c,
                  ),
                },
              };
            },
          );
        },
      });
    },
    [taskId, createChecklistItemMutation],
  );

  const deleteChecklistItem = useCallback(
    async (itemID: string) => {
      await deleteChecklistItemMutation({
        variables: { taskChecklistItemID: itemID },
        update: (cache, { data }) => {
          if (
            !data?.deleteTaskChecklistItem ||
            !data.deleteTaskChecklistItem.ok
          )
            return;
          const { taskChecklistID } =
            data.deleteTaskChecklistItem.taskChecklistItem;
          cache.updateQuery(
            { query: FindTaskDocument, variables: { taskID: taskId! } },
            (prev) => {
              if (!prev?.findTask) return prev;
              return {
                ...prev,
                findTask: {
                  ...prev.findTask,
                  checklists: prev.findTask.checklists?.map(
                    (c) =>
                      c.id === taskChecklistID
                        ? {
                            ...c,
                            items: c.items.filter(
                              (i) => i.id !== itemID,
                            ),
                          }
                        : c,
                  ),
                },
              };
            },
          );
        },
      });
    },
    [taskId, deleteChecklistItemMutation],
  );

  const toggleChecklistItemComplete = useCallback(
    async (itemID: string, complete: boolean) => {
      await toggleChecklistItemMutation({
        variables: { taskChecklistItemID: itemID, complete },
      });
    },
    [toggleChecklistItemMutation],
  );

  const renameChecklistItem = useCallback(
    async (itemID: string, name: string) => {
      await renameChecklistItemMutation({
        variables: { taskChecklistItemID: itemID, name },
      });
    },
    [renameChecklistItemMutation],
  );

  const toggleLabel = useCallback(
    async (projectLabelID: string) => {
      if (!fullTaskId) return;
      await toggleLabelMutation({
        variables: { taskID: fullTaskId, projectLabelID },
      });
    },
    [fullTaskId, toggleLabelMutation],
  );

  const createLabel = useCallback(
    async (projectId: string, name: string, labelColorId: string) => {
      await createLabelMutation({
        variables: {
          projectID: projectId,
          name,
          labelColorID: labelColorId,
        },
      });
    },
    [createLabelMutation],
  );

  const updateLabel = useCallback(
    async (labelId: string, name: string, labelColorId: string) => {
      await updateLabelMutation({
        variables: {
          projectLabelID: labelId,
          name,
          labelColorID: labelColorId,
        },
      });
    },
    [updateLabelMutation],
  );

  const deleteLabel = useCallback(
    async (labelId: string) => {
      await deleteLabelMutation({
        variables: {
          projectLabelID: labelId,
        },
      });
    },
    [deleteLabelMutation],
  );

  const assign = useCallback(
    async (userID: string) => {
      if (!fullTaskId) return;
      await assignMutation({
        variables: { taskID: fullTaskId, userID },
      });
    },
    [fullTaskId, assignMutation],
  );

  const unassign = useCallback(
    async (userID: string) => {
      if (!fullTaskId) return;
      await unassignMutation({
        variables: { taskID: fullTaskId, userID },
      });
    },
    [fullTaskId, unassignMutation],
  );

  const updateDueDate = useCallback(
    async (dueDate: string | null, hasTime: boolean) => {
      if (!fullTaskId) return;
      await updateDueDateMutation({
        variables: {
          taskID: fullTaskId,
          dueDate,
          hasTime,
          createNotifications: [],
          updateNotifications: [],
          deleteNotifications: [],
        },
      });
    },
    [fullTaskId, updateDueDateMutation],
  );

  const createDueDateNotification = useCallback(
    async (period: number, duration: DueDateNotificationDuration) => {
      if (!fullTaskId) return;
      await createNotificationMutation({
        variables: {
          input: [{ taskID: fullTaskId, period, duration }],
        },
      });
    },
    [fullTaskId, createNotificationMutation],
  );

  const deleteDueDateNotification = useCallback(
    async (notificationId: string) => {
      await deleteNotificationMutation({
        variables: {
          input: [{ id: notificationId }],
        },
      });
    },
    [deleteNotificationMutation],
  );

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
    toggleTaskWatch,
    createComment,
    updateComment,
    deleteComment,
    createChecklist,
    deleteChecklist,
    renameChecklist,
    createChecklistItem,
    deleteChecklistItem,
    toggleChecklistItemComplete,
    renameChecklistItem,
    toggleLabel,
    createLabel,
    updateLabel,
    deleteLabel,
    assign,
    unassign,
    updateDueDate,
    createDueDateNotification,
    deleteDueDateNotification,
    isUpdating:
      updatingName ||
      updatingDescription ||
      updatingComplete ||
      updatingWatch ||
      creatingComment ||
      updatingComment ||
      deletingComment ||
      creatingChecklist ||
      deletingChecklist ||
      renamingChecklist ||
      creatingChecklistItem ||
      deletingChecklistItem ||
      togglingChecklistItem ||
      renamingChecklistItem ||
      togglingLabel ||
      creatingLabel ||
      updatingLabel ||
      deletingLabel ||
      assigning ||
      unassigning ||
      updatingDueDate ||
      creatingNotification ||
      deletingNotification,
  };
}
