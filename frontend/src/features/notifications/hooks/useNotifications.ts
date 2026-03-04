import { useState, useCallback, useEffect, useMemo, useReducer } from "react";
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

/**
 * Overlay state tracks local modifications on top of Apollo query data.
 * This avoids syncing query data into state via useEffect (which triggers
 * the react-hooks/set-state-in-effect rule). Instead, useMemo merges the
 * query base with these deltas.
 */
interface OverlayState {
  /** Entries prepended by subscriptions (newest first). */
  prepended: NotificationEntry[];
  /** Entries appended by fetchMore. */
  appended: NotificationEntry[];
  /** Per-entry read-state overrides from toggle mutations. */
  readOverrides: Map<string, { read: boolean; readAt: string | null }>;
  /** When true, all entries are marked read locally. */
  allRead: boolean;
}

type OverlayAction =
  | { type: "prepend"; entry: NotificationEntry }
  | { type: "append"; entries: NotificationEntry[] }
  | { type: "update_read"; id: string; read: boolean; readAt: string | null }
  | { type: "mark_all_read" }
  | { type: "reset" };

const initialOverlay: OverlayState = {
  prepended: [],
  appended: [],
  readOverrides: new Map(),
  allRead: false,
};

function overlayReducer(
  state: OverlayState,
  action: OverlayAction,
): OverlayState {
  switch (action.type) {
    case "prepend":
      return { ...state, prepended: [action.entry, ...state.prepended] };
    case "append":
      return { ...state, appended: [...state.appended, ...action.entries] };
    case "update_read": {
      const next = new Map(state.readOverrides);
      next.set(action.id, { read: action.read, readAt: action.readAt });
      return { ...state, readOverrides: next };
    }
    case "mark_all_read":
      return { ...state, allRead: true };
    case "reset":
      return initialOverlay;
  }
}

export function useNotifications(
  initialFilter: NotificationFilter = NotificationFilter.Unread,
) {
  const [filter, setFilter] = useState<NotificationFilter>(initialFilter);
  const [paginationState, setPaginationState] = useState<{
    hasNextPage: boolean;
    cursor: string | null;
  }>({ hasNextPage: false, cursor: null });
  const [overlay, dispatch] = useReducer(overlayReducer, initialOverlay);

  const {
    loading,
    data: notificationsData,
    refetch: refetchList,
  } = useQuery(NotificationsDocument, {
    variables: { limit: PAGE_SIZE, filter },
    fetchPolicy: "network-only",
  });

  // Derive the final notifications list by merging query data with local overlay.
  // No useEffect needed — this recomputes whenever query data or overlay changes.
  const notifications = useMemo(() => {
    const base = (notificationsData?.notified.notified ??
      []) as NotificationEntry[];

    // Apply read overrides and allRead to a single entry.
    const applyReadState = (entry: NotificationEntry): NotificationEntry => {
      const override = overlay.readOverrides.get(entry.id);
      if (override) {
        return { ...entry, read: override.read, readAt: override.readAt };
      }
      if (overlay.allRead) {
        return { ...entry, read: true };
      }
      return entry;
    };

    return [
      ...overlay.prepended.map(applyReadState),
      ...base.map(applyReadState),
      ...overlay.appended.map(applyReadState),
    ];
  }, [notificationsData, overlay]);

  // Derive pagination from query data, overridden by fetchMore updates.
  const hasNextPage =
    paginationState.cursor !== null
      ? paginationState.hasNextPage
      : (notificationsData?.notified.pageInfo.hasNextPage ?? false);
  const cursor =
    paginationState.cursor ??
    notificationsData?.notified.pageInfo.endCursor ??
    null;

  const { data: unreadData, refetch: refetchUnread } = useQuery(
    HasUnreadNotificationsDocument,
  );

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
        dispatch({
          type: "prepend",
          entry: newNotification as NotificationEntry,
        });
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
      dispatch({
        type: "append",
        entries: data.notified.notified as NotificationEntry[],
      });
      setPaginationState({
        hasNextPage: data.notified.pageInfo.hasNextPage,
        cursor: data.notified.pageInfo.endCursor ?? null,
      });
    }
  }, [hasNextPage, cursor, filter, refetchList]);

  const changeFilter = useCallback((newFilter: NotificationFilter) => {
    setFilter(newFilter);
    dispatch({ type: "reset" });
    setPaginationState({ hasNextPage: false, cursor: null });
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
        dispatch({
          type: "update_read",
          id: result.data.notificationToggleRead.id,
          read: result.data.notificationToggleRead.read,
          readAt: result.data.notificationToggleRead.readAt ?? null,
        });
        refetchUnread();
      }
    },
    [toggleReadMutation, refetchUnread],
  );

  const markAllRead = useCallback(async () => {
    await markAllReadMutation();
    dispatch({ type: "mark_all_read" });
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
