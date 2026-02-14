import { useRef } from "react";
import { NotificationItem } from "./NotificationItem";
import type { NotificationEntry } from "@/features/notifications";

interface NotificationListProps {
  notifications: NotificationEntry[];
  loading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  onToggleRead: (id: string, currentRead: boolean) => void;
  onClose: () => void;
}

export function NotificationList({
  notifications,
  loading,
  hasNextPage,
  onLoadMore,
  onToggleRead,
  onClose,
}: NotificationListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!listRef.current || !hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      onLoadMore();
    }
  };

  const textSecondary = "var(--color-text-secondary)";
  const fontBody = "var(--font-body)";

  if (notifications.length === 0 && !loading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          height: "280px",
          color: textSecondary,
          fontFamily: fontBody,
        }}
      >
        No notifications
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="overflow-y-auto"
      style={{ maxHeight: "350px" }}
    >
      {notifications.map((notif) => (
        <div key={notif.id} className="group">
          <NotificationItem
            notification={notif}
            onToggleRead={onToggleRead}
            onClose={onClose}
          />
        </div>
      ))}
      {loading && (
        <div
          className="flex justify-center py-3"
          style={{ color: textSecondary, fontFamily: fontBody }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}
