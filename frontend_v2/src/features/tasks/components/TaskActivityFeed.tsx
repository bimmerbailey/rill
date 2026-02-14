import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FindTaskQuery } from "@/graphql/generated/graphql";

const theme = {
  surface1: "var(--color-surface-1)",
  surface2: "var(--color-surface-2)",
  surface3: "var(--color-surface-3)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
};

type ActivityType = NonNullable<
  FindTaskQuery["findTask"]
>["activity"][0]["type"];

const activityTypeLabels: Record<ActivityType, string> = {
  TASK_ADDED: "added this task",
  TASK_MOVED: "moved this task",
  TASK_MARKED_COMPLETE: "marked this task complete",
  TASK_MARKED_INCOMPLETE: "marked this task incomplete",
  TASK_DUE_DATE_CHANGED: "changed the due date",
  TASK_DUE_DATE_ADDED: "added a due date",
  TASK_DUE_DATE_REMOVED: "removed the due date",
  TASK_CHECKLIST_CHANGED: "changed a checklist",
  TASK_CHECKLIST_ADDED: "added a checklist",
  TASK_CHECKLIST_REMOVED: "removed a checklist",
};

interface TaskActivityFeedProps {
  activity: NonNullable<FindTaskQuery["findTask"]>["activity"];
  initialLimit?: number;
}

export function TaskActivityFeed({
  activity,
  initialLimit = 5,
}: TaskActivityFeedProps) {
  const [showAll, setShowAll] = useState(false);

  if (!activity || activity.length === 0) {
    return null;
  }

  const displayedActivity = showAll
    ? activity
    : activity.slice(0, initialLimit);
  const hasMore = activity.length > initialLimit;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActivityLabel = (type: ActivityType): string => {
    return activityTypeLabels[type] || type.toLowerCase().replace(/_/g, " ");
  };

  return (
    <div className="space-y-4">
      <div
        className="flex items-center gap-2"
        style={{ color: theme.textSecondary }}
      >
        <span className="font-medium">Activity</span>
        <span className="text-sm">({activity.length})</span>
      </div>

      <div className="space-y-3">
        {displayedActivity.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
              style={{
                backgroundColor:
                  item.causedBy.profileIcon?.bgColor || theme.surface3,
                color: theme.textPrimary,
              }}
            >
              {item.causedBy.profileIcon?.initials ||
                item.causedBy.fullName.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm" style={{ color: theme.textPrimary }}>
                <span className="font-medium">{item.causedBy.fullName}</span>{" "}
                {getActivityLabel(item.type)}
              </p>
              <span className="text-xs" style={{ color: theme.textSecondary }}>
                {formatDate(item.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-sm transition-colors hover:opacity-80"
          style={{ color: theme.textSecondary }}
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              Show less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show {activity.length - initialLimit} more
            </>
          )}
        </button>
      )}
    </div>
  );
}
