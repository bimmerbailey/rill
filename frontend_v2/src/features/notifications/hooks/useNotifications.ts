import { useState, useCallback } from "react";
import {
  useNotificationsQuery,
  useHasUnreadNotificationsQuery,
  useNotificationAddedSubscription,
  useNotificationToggleReadMutation,
  useNotificationMarkAllReadMutation,
  NotificationFilter,
} from "@/graphql/generated/graphql";

const POLL_INTERVAL = 30000;
const PAGE_SIZE = 8;

export interface NotificationEntry {
  id: string;
  read: boolean;
  readAt?: string | null;
  notification: {
    id: string;
    actionType: string;
    createdAt: string;
    data: Array<{ key: string; value: string }>;
    causedBy?: {
      id: string;
      username: string;
      fullname: string;
    } | null;
  };
}

export function useNotifications(
  initialFilter: NotificationFilter = NotificationFilter.Unread,
) {
  const [filter, setFilter] = useState<NotificationFilter>(initialFilter);
  const [notifications, setNotifications] = useState<NotificationEntry[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);

  const { loading, refetch: refetchList } = useNotificationsQuery({
    variables: { limit: PAGE_SIZE, filter },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setNotifications(data.notified.notified as NotificationEntry[]);
      setHasNextPage(data.notified.pageInfo.hasNextPage);
      setCursor(data.notified.pageInfo.endCursor ?? null);
    },
  });

  const { data: unreadData, refetch: refetchUnread } =
    useHasUnreadNotificationsQuery({
      pollInterval: POLL_INTERVAL,
    });

  useNotificationAddedSubscription({
    onSubscriptionData: (result) => {
      const newNotification = result.subscriptionData.data?.notificationAdded;
      if (newNotification) {
        setNotifications((prev) => [
          newNotification as NotificationEntry,
          ...prev,
        ]);
        refetchUnread();
      }
    },
  });

  const [toggleReadMutation] = useNotificationToggleReadMutation({
    onCompleted: (data) => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === data.notificationToggleRead.id
            ? {
                ...n,
                read: data.notificationToggleRead.read,
                readAt: data.notificationToggleRead.readAt,
              }
            : n,
        ),
      );
      refetchUnread();
    },
  });

  const [markAllReadMutation] = useNotificationMarkAllReadMutation({
    onCompleted: () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      refetchUnread();
    },
  });

  const fetchMore = useCallback(async () => {
    if (!hasNextPage || !cursor) return;

    const { data } = await refetchList({
      limit: PAGE_SIZE,
      filter,
      cursor,
    });

    if (data) {
      setNotifications((prev) => [
        ...prev,
        ...(data.notified.notified as NotificationEntry[]),
      ]);
      setHasNextPage(data.notified.pageInfo.hasNextPage);
      setCursor(data.notified.pageInfo.endCursor ?? null);
    }
  }, [hasNextPage, cursor, filter, refetchList]);

  const changeFilter = useCallback((newFilter: NotificationFilter) => {
    setFilter(newFilter);
    setNotifications([]);
    setCursor(null);
    setHasNextPage(false);
  }, []);

  const toggleRead = useCallback(
    (notifiedId: string, currentRead: boolean) => {
      toggleReadMutation({
        variables: { notifiedID: notifiedId },
        optimisticResponse: {
          notificationToggleRead: {
            id: notifiedId,
            read: !currentRead,
            readAt: !currentRead ? new Date().toISOString() : null,
          },
        },
      });
    },
    [toggleReadMutation],
  );

  const markAllRead = useCallback(() => {
    markAllReadMutation();
  }, [markAllReadMutation]);

  const hasUnread = unreadData?.hasUnreadNotifications.unread ?? false;

  return {
    notifications,
    loading,
    hasUnread,
    hasNextPage,
    filter,
    fetchMore,
    changeFilter,
    toggleRead,
    markAllRead,
    refetchUnread,
  };
}
