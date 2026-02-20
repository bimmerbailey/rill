import { useState, useRef, useEffect } from "react";
import { Calendar, Clock, Bell, Plus, Trash2 } from "lucide-react";
import { cn } from "@/utils";
import {
  DueDateNotificationDuration,
  type FindTaskQuery,
} from "@/graphql/generated/graphql";

const theme = {
  surface1: "var(--color-surface-1)",
  surface2: "var(--color-surface-2)",
  surface3: "var(--color-surface-3)",
  border: "var(--color-border)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  terracotta: "var(--color-terracotta)",
  success: "var(--color-success)",
  warning: "#d4a574",
  error: "#d4574a",
};

interface TaskDueDateProps {
  dueDate: NonNullable<FindTaskQuery["findTask"]>["dueDate"];
  hasTime: boolean;
  onUpdateDueDate: (dueDate: string | null, hasTime: boolean) => Promise<void>;
  onCreateNotification: (
    period: number,
    duration: DueDateNotificationDuration,
  ) => Promise<void>;
  onDeleteNotification: (notificationId: string) => Promise<void>;
  loading?: boolean;
}

const DURATION_OPTIONS: {
  value: DueDateNotificationDuration;
  label: string;
}[] = [
  { value: DueDateNotificationDuration.Minute, label: "minutes" },
  { value: DueDateNotificationDuration.Hour, label: "hours" },
  { value: DueDateNotificationDuration.Day, label: "days" },
  { value: DueDateNotificationDuration.Week, label: "weeks" },
];

const getDurationLabel = (duration: DueDateNotificationDuration): string => {
  const option = DURATION_OPTIONS.find((o) => o.value === duration);
  return option?.label || duration.toLowerCase();
};

export function TaskDueDate({
  dueDate,
  hasTime,
  onUpdateDueDate,
  onCreateNotification,
  onDeleteNotification,
  loading = false,
}: TaskDueDateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [hasTimeValue, setHasTimeValue] = useState(hasTime);
  const [isAddingNotification, setIsAddingNotification] = useState(false);
  const [newNotificationPeriod, setNewNotificationPeriod] = useState("30");
  const [newNotificationDuration, setNewNotificationDuration] =
    useState<DueDateNotificationDuration>(DueDateNotificationDuration.Minute);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dueDate?.at) {
      const date = new Date(dueDate.at);
      setDateValue(date.toISOString().split("T")[0]);
      setTimeValue(date.toTimeString().slice(0, 5));
    } else {
      setDateValue("");
      setTimeValue("");
    }
    setHasTimeValue(hasTime);
  }, [dueDate, hasTime]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setIsAddingNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = async () => {
    if (loading || isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (dateValue) {
        // Format as RFC3339Nano compatible string (ISO 8601 with timezone)
        let dateTime: string;
        if (hasTimeValue && timeValue) {
          // Parse the date and time, then convert to ISO string
          const [year, month, day] = dateValue.split("-").map(Number);
          const [hours, minutes] = timeValue.split(":").map(Number);
          const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
          dateTime = date.toISOString();
        } else {
          // Date only - set to start of day in UTC
          const [year, month, day] = dateValue.split("-").map(Number);
          const date = new Date(year, month - 1, day, 0, 0, 0, 0);
          dateTime = date.toISOString();
        }
        await onUpdateDueDate(dateTime, hasTimeValue);
      } else {
        await onUpdateDueDate(null, false);
      }
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = async () => {
    if (loading || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onUpdateDueDate(null, false);
      setDateValue("");
      setTimeValue("");
      setHasTimeValue(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNotification = async () => {
    if (loading || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onCreateNotification(
        parseInt(newNotificationPeriod, 10),
        newNotificationDuration,
      );
      setNewNotificationPeriod("30");
      setNewNotificationDuration(DueDateNotificationDuration.Minute);
      setIsAddingNotification(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    if (loading || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onDeleteNotification(notificationId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDueDateStatus = () => {
    if (!dueDate?.at) return null;
    const now = new Date();
    const due = new Date(dueDate.at);
    const diff = due.getTime() - now.getTime();

    if (diff < 0) return "overdue";
    if (diff < 24 * 60 * 60 * 1000) return "soon";
    return "normal";
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateStr: string | null | undefined) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const status = getDueDateStatus();

  return (
    <div>
      <div
        className="flex items-center gap-2 mb-2 text-sm font-medium"
        style={{ color: theme.textSecondary }}
      >
        <Calendar size={16} />
        Due Date
      </div>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full p-2 rounded text-sm text-left flex items-center gap-2 transition-colors",
            "hover:bg-[rgba(255,235,210,0.05)]",
          )}
          style={{
            backgroundColor: theme.surface2,
          }}
        >
          {dueDate?.at ? (
            <div className="flex items-center gap-2">
              <Clock
                size={14}
                style={{
                  color:
                    status === "overdue"
                      ? theme.error
                      : status === "soon"
                        ? theme.warning
                        : theme.textSecondary,
                }}
              />
              <span
                style={{
                  color:
                    status === "overdue"
                      ? theme.error
                      : status === "soon"
                        ? theme.warning
                        : theme.textPrimary,
                }}
              >
                {formatDate(dueDate.at)}
                {hasTime && ` ${formatTime(dueDate.at)}`}
              </span>
              {status === "overdue" && (
                <span
                  className="text-xs px-1 rounded"
                  style={{
                    backgroundColor: theme.error,
                    color: "#fff",
                  }}
                >
                  Overdue
                </span>
              )}
            </div>
          ) : (
            <span style={{ color: theme.textSecondary }}>Set due date...</span>
          )}
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 mt-1 p-3 rounded shadow-lg z-20 w-72"
            style={{
              backgroundColor: theme.surface2,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                  className="flex-1 p-2 rounded text-sm"
                  style={{
                    backgroundColor: theme.surface1,
                    color: theme.textPrimary,
                    border: `1px solid ${theme.border}`,
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasTime"
                  checked={hasTimeValue}
                  onChange={(e) => setHasTimeValue(e.target.checked)}
                  className="w-4 h-4"
                />
                <label
                  htmlFor="hasTime"
                  className="text-sm"
                  style={{ color: theme.textSecondary }}
                >
                  Include time
                </label>
              </div>

              {hasTimeValue && (
                <input
                  type="time"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  className="w-full p-2 rounded text-sm"
                  style={{
                    backgroundColor: theme.surface1,
                    color: theme.textPrimary,
                    border: `1px solid ${theme.border}`,
                  }}
                />
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="flex-1 py-2 text-sm rounded disabled:opacity-50"
                  style={{
                    backgroundColor: theme.terracotta,
                    color: theme.textPrimary,
                  }}
                >
                  Save
                </button>
                {dueDate?.at && (
                  <button
                    onClick={handleClear}
                    disabled={isSubmitting}
                    className="px-3 py-2 text-sm rounded"
                    style={{
                      backgroundColor: theme.surface3,
                      color: theme.textSecondary,
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>

              {dueDate?.at && (
                <div
                  className="pt-3 border-t"
                  style={{ borderColor: theme.border }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="flex items-center gap-1 text-sm"
                      style={{ color: theme.textSecondary }}
                    >
                      <Bell size={14} />
                      Notifications
                    </div>
                  </div>

                  {dueDate.notifications &&
                    dueDate.notifications.length > 0 && (
                      <div className="space-y-1 mb-2">
                        {dueDate.notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-center justify-between p-2 rounded"
                            style={{ backgroundColor: theme.surface3 }}
                          >
                            <span
                              className="text-sm"
                              style={{ color: theme.textPrimary }}
                            >
                              {notification.period}{" "}
                              {getDurationLabel(notification.duration)} before
                            </span>
                            <button
                              onClick={() =>
                                handleDeleteNotification(notification.id)
                              }
                              disabled={isSubmitting}
                              className="p-1 rounded hover:bg-[color-mix(in srgb, var(--color-text-primary) 10%, transparent)]"
                              style={{ color: theme.textSecondary }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                  {isAddingNotification ? (
                    <div
                      className="space-y-2 p-2 rounded"
                      style={{ backgroundColor: theme.surface3 }}
                    >
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={newNotificationPeriod}
                          onChange={(e) =>
                            setNewNotificationPeriod(e.target.value)
                          }
                          min="1"
                          className="w-16 p-1 rounded text-sm"
                          style={{
                            backgroundColor: theme.surface1,
                            color: theme.textPrimary,
                            border: `1px solid ${theme.border}`,
                          }}
                        />
                        <select
                          value={newNotificationDuration}
                          onChange={(e) =>
                            setNewNotificationDuration(
                              e.target.value as DueDateNotificationDuration,
                            )
                          }
                          className="flex-1 p-1 rounded text-sm"
                          style={{
                            backgroundColor: theme.surface1,
                            color: theme.textPrimary,
                            border: `1px solid ${theme.border}`,
                          }}
                        >
                          {DURATION_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddNotification}
                          disabled={isSubmitting}
                          className="flex-1 py-1 text-xs rounded"
                          style={{
                            backgroundColor: theme.terracotta,
                            color: theme.textPrimary,
                          }}
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setIsAddingNotification(false)}
                          className="flex-1 py-1 text-xs rounded"
                          style={{
                            backgroundColor: theme.surface2,
                            color: theme.textSecondary,
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingNotification(true)}
                      className="flex items-center gap-1 text-sm transition-colors hover:opacity-80"
                      style={{ color: theme.terracotta }}
                    >
                      <Plus size={14} />
                      Add notification
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
