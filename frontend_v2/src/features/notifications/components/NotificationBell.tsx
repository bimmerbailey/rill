import { useState, useRef, useCallback } from "react";
import { Bell } from "lucide-react";
import { useHasUnreadNotificationsQuery } from "@/graphql/generated/graphql";
import { NotificationPopup } from "./NotificationPopup";

interface NotificationBellProps {
  pollInterval?: number;
}

export function NotificationBell({
  pollInterval = 30000,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const bellRef = useRef<HTMLButtonElement>(null);

  const { data } = useHasUnreadNotificationsQuery({
    pollInterval,
  });

  const hasUnread = data?.hasUnreadNotifications.unread ?? false;

  const handleClick = useCallback(() => {
    if (!isOpen && bellRef.current) {
      setAnchorEl(bellRef.current);
    }
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const textSecondary = "var(--color-text-secondary)";
  const accent = "var(--color-terracotta)";
  const danger = "var(--color-danger)";

  return (
    <>
      <button
        ref={bellRef}
        onClick={handleClick}
        className="relative p-2 rounded-lg transition-colors"
        style={{ color: textSecondary }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = accent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textSecondary;
        }}
        title="Notifications"
      >
        <Bell size={20} />
        {hasUnread && (
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: danger }}
          />
        )}
      </button>

      <NotificationPopup
        isOpen={isOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
      />
    </>
  );
}
