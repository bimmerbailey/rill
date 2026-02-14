import { useState, useRef, useEffect } from "react";
import { Bell, MoreVertical, CheckCircle } from "lucide-react";
import { NotificationList } from "./NotificationList";
import { NotificationTabs } from "./NotificationTabs";
import { useNotifications } from "@/features/notifications";

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

export function NotificationPopup({
  isOpen,
  onClose,
  anchorEl,
}: NotificationPopupProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    loading,
    hasNextPage,
    filter,
    fetchMore,
    changeFilter,
    toggleRead,
    markAllRead,
  } = useNotifications();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleMenuClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleMenuClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleMenuClickOutside);
    };
  }, [showMenu]);

  if (!isOpen || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();
  const popupWidth = 400;
  const popupLeft = Math.min(rect.left, window.innerWidth - popupWidth - 20);

  const surface1 = "var(--color-surface-0)";
  const surface2 = "var(--color-surface-1)";
  const border = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const accent = "var(--color-terracotta)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  return (
    <div
      ref={popupRef}
      className="fixed rounded-xl shadow-2xl overflow-hidden"
      style={{
        position: "fixed",
        top: rect.bottom + 8,
        left: popupLeft,
        width: popupWidth,
        background: surface1,
        border: `1px solid ${border}`,
        zIndex: 1000,
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: surface2,
          borderBottom: `1px solid ${border}`,
        }}
      >
        <div className="flex items-center gap-2">
          <Bell size={16} style={{ color: accent }} />
          <span
            style={{
              fontFamily: fontHeading,
              fontSize: "1rem",
              color: textPrimary,
            }}
          >
            Notifications
          </span>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded hover:opacity-70 transition-opacity"
          >
            <MoreVertical size={16} style={{ color: textSecondary }} />
          </button>
          {showMenu && (
            <div
              className="absolute right-0 top-full mt-1 rounded-lg py-1 shadow-lg"
              style={{
                background: surface2,
                border: `1px solid ${border}`,
                minWidth: "140px",
              }}
            >
              <button
                onClick={() => {
                  markAllRead();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:opacity-80 transition-opacity"
                style={{
                  color: textPrimary,
                  fontFamily: fontBody,
                }}
              >
                <CheckCircle size={14} style={{ color: accent }} />
                Mark all as read
              </button>
            </div>
          )}
        </div>
      </div>

      <NotificationTabs activeFilter={filter} onChangeFilter={changeFilter} />

      <NotificationList
        notifications={notifications}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={fetchMore}
        onToggleRead={toggleRead}
        onClose={onClose}
      />
    </div>
  );
}
