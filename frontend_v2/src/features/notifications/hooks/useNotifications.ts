import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client/react";
import {
  NotificationsDocument,
  HasUnreadNotificationsDocument,
  NotificationAddedDocument,
  NotificationToggleReadDocument,
  NotificationMarkAllReadDocument,
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

  const { loading, data: notificationsData, refetch: refetchList } = useQuery(NotificationsDocument, {
    variables: { limit: PAGE_SIZE, filter },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData.notified.notified as NotificationEntry[]);
      setHasNextPage(notificationsData.notified.pageInfo.hasNextPage);
      setCursor(notificationsData.notified.pageInfo.endCursor ?? null);
    }
  }, [notificationsData]);

  const { data: unreadData, refetch: refetchUnread } =
    useQuery(HasUnreadNotificationsDocument);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchUnread();
    }, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [refetchUnread]);

  useSubscription(NotificationAddedDocument, {
    onData: ({ data }) => {
      const newNotification = data.data?.notificationAdded;
      if (newNotification) {
        setNotifications((prev) => [
          newNotification as NotificationEntry,
          ...prev,
        ]);
        refetchUnread();
      }
    },
  });

  const [toggleReadMutation] = useMutation(NotificationToggleReadDocument);
  const [markAllReadMutation] = useMutation(NotificationMarkAllReadDocument);

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
    async (notifiedId: string, currentRead: boolean) => {
      const result = await toggleReadMutation({
        variables: { notifiedID: notifiedId },
        optimisticResponse: {
          notificationToggleRead: {
            id: notifiedId,
            read: !currentRead,
            readAt: !currentRead ? new Date().toISOString() : null,
          },
        },
      });
      if (result.data) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === result.data!.notificationToggleRead.id
              ? {
                  ...n,
                  read: result.data!.notificationToggleRead.read,
                  readAt: result.data!.notificationToggleRead.readAt,
                }
              : n,
          ),
        );
        refetchUnread();
      }
    },
    [toggleReadMutation, refetchUnread],
  );

  const markAllRead = useCallback(async () => {
    await markAllReadMutation();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    refetchUnread();
  }, [markAllReadMutation, refetchUnread]);

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
