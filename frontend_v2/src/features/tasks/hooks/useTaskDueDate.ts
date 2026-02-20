import { useCallback } from "react";
import { useMutation } from "@apollo/client/react";
import {
  UpdateTaskDueDateDocument,
  CreateDueDateNotificationsDocument,
  DeleteDueDateNotificationsDocument,
  DueDateNotificationDuration,
} from "@/graphql/generated/graphql";

interface DueDateNotification {
  period: number;
  duration: DueDateNotificationDuration;
}

interface UseTaskDueDateReturn {
  updateDueDate: (
    taskID: string,
    dueDate: string | null,
    hasTime: boolean,
  ) => Promise<void>;
  createNotifications: (
    taskID: string,
    notifications: DueDateNotification[],
  ) => Promise<void>;
  deleteNotifications: (notificationIDs: string[]) => Promise<void>;
  loading: boolean;
}

export function useTaskDueDate(): UseTaskDueDateReturn {
  const [updateMutation, { loading: updating }] =
    useMutation(UpdateTaskDueDateDocument);
  const [createNotificationsMutation, { loading: creating }] =
    useMutation(CreateDueDateNotificationsDocument);
  const [deleteNotificationsMutation, { loading: deleting }] =
    useMutation(DeleteDueDateNotificationsDocument);

  const updateDueDate = useCallback(
    async (taskID: string, dueDate: string | null, hasTime: boolean) => {
      await updateMutation({
        variables: {
          taskID,
          dueDate,
          hasTime,
          createNotifications: [],
          updateNotifications: [],
          deleteNotifications: [],
        },
      });
    },
    [updateMutation],
  );

  const createNotifications = useCallback(
    async (taskID: string, notifications: DueDateNotification[]) => {
      await createNotificationsMutation({
        variables: {
          input: notifications.map((n) => ({
            taskID,
            period: n.period,
            duration: n.duration,
          })),
        },
      });
    },
    [createNotificationsMutation],
  );

  const deleteNotifications = useCallback(
    async (notificationIDs: string[]) => {
      await deleteNotificationsMutation({
        variables: {
          input: notificationIDs.map((id) => ({ id })),
        },
      });
    },
    [deleteNotificationsMutation],
  );

  return {
    updateDueDate,
    createNotifications,
    deleteNotifications,
    loading: updating || creating || deleting,
  };
}
