import { useNavigate } from "react-router-dom";
import { Bell, UserCircle, CheckCircle, Circle } from "lucide-react";
import { ProfileAvatar } from "@/features/profile/components/ProfileAvatar";
import { ActionType } from "@/graphql/generated/graphql";
import { type NotificationEntry } from "@/features/notifications";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface NotificationItemProps {
  notification: NotificationEntry;
  onToggleRead: (id: string, currentRead: boolean) => void;
  onClose: () => void;
}

function getDataValue(
  data: Array<{ key: string; value: string }>,
  key: string,
): string {
  const item = data.find((d) => d.key === key);
  return item?.value ?? "";
}

export function NotificationItem({
  notification,
  onToggleRead,
  onClose,
}: NotificationItemProps) {
  const navigate = useNavigate();
  const { read, notification: notif } = notification;
  const { actionType, data, causedBy, createdAt } = notif;

  const handleClick = () => {
    const projectId = getDataValue(data, "ProjectID");
    const taskId = getDataValue(data, "TaskID");

    if (projectId && taskId) {
      navigate(`/projects/${projectId}?task=${taskId}`);
    } else if (projectId) {
      navigate(`/projects/${projectId}`);
    }
    onClose();
  };

  const handleToggleRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleRead(notification.id, read);
  };

  const getNotificationContent = () => {
    const taskName = getDataValue(data, "TaskName");
    const projectName = getDataValue(data, "ProjectName");
    const dueDate = getDataValue(data, "DueDate");
    const dueAt = getDataValue(data, "DueAt");

    switch (actionType) {
      case ActionType.TaskAssigned:
        return {
          icon: <UserCircle size={14} />,
          content: (
            <span>
              <strong>{causedBy?.fullname ?? "Someone"}</strong> assigned you to
              the task <strong>"{taskName}"</strong>
            </span>
          ),
          projectName,
        };
      case ActionType.DueDateReminder: {
        const now = dayjs();
        const due = dayjs(dueAt || dueDate);
        const isPast = due.isBefore(now);
        return {
          icon: <Bell size={14} />,
          content: (
            <span>
              <strong>"{taskName}"</strong>{" "}
              {isPast
                ? `is overdue by ${now.diff(due, "day")} day${now.diff(due, "day") !== 1 ? "s" : ""}`
                : `is due ${due.fromNow()}`}
            </span>
          ),
          projectName,
        };
      }
      case ActionType.CommentMentioned:
        return {
          icon: <UserCircle size={14} />,
          content: (
            <span>
              <strong>{causedBy?.fullname ?? "Someone"}</strong> mentioned you
              in a comment
            </span>
          ),
          projectName,
        };
      case ActionType.TaskMoved:
        return {
          icon: <UserCircle size={14} />,
          content: (
            <span>
              <strong>{causedBy?.fullname ?? "Someone"}</strong> moved task{" "}
              <strong>"{taskName}"</strong>
            </span>
          ),
          projectName,
        };
      case ActionType.ProjectAdded:
        return {
          icon: <UserCircle size={14} />,
          content: (
            <span>
              <strong>{causedBy?.fullname ?? "Someone"}</strong> added you to
              project <strong>"{projectName}"</strong>
            </span>
          ),
          projectName,
        };
      default:
        return {
          icon: <Bell size={14} />,
          content: <span>Notification</span>,
          projectName,
        };
    }
  };

  const { icon, content, projectName } = getNotificationContent();

  const surface2 = "var(--color-surface-1)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const accent = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  return (
    <div
      className="flex items-start gap-3 px-3 py-3 cursor-pointer transition-colors rounded-lg mx-2"
      style={{
        background: read ? "transparent" : `${accent}15`,
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = read ? `${surface2}` : `${accent}25`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = read ? "transparent" : `${accent}15`;
      }}
    >
      <div className="flex-shrink-0">
        {causedBy ? (
          <ProfileAvatar
            profileIcon={{
              url: null,
              initials: causedBy.fullname
                .split(" ")
                .map((n: string) => n[0])
                .join(""),
              bgColor: accent,
            }}
            fullName={causedBy.fullname}
            size="md"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: accent }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="text-sm leading-snug"
          style={{ color: textPrimary, fontFamily: fontBody }}
        >
          {content}
        </div>
        <div
          className="flex items-center gap-2 mt-1.5 text-xs"
          style={{ color: textSecondary }}
        >
          <span>{dayjs(createdAt).fromNow()}</span>
          {projectName && (
            <>
              <span>•</span>
              <span>{projectName}</span>
            </>
          )}
        </div>
      </div>

      <button
        onClick={handleToggleRead}
        className="flex-shrink-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:opacity-100"
        style={{ color: accent }}
        title={read ? "Mark as unread" : "Mark as read"}
      >
        {read ? <Circle size={16} /> : <CheckCircle size={16} />}
      </button>
    </div>
  );
}
