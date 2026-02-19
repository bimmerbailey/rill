import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import {
  ChevronDown,
  ChevronRight,
  Circle,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  MyTasksSort,
  MyTasksStatus,
  useLegacyMyTasksQuery,
  useSetTaskCompleteMutation,
  useUpdateTaskNameMutation,
  useUpdateTaskDueDateMutation,
  type LegacyMyTasksQuery,
} from "@/graphql/generated/graphql";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboard";
import { TaskDetailModal } from "@/components/common";
import { useTaskModal } from "@/hooks";
import { DueDateManager } from "@/features/projects/components/task";

// ─── Types ────────────────────────────────────────────────────────────────────

type TaskItem = LegacyMyTasksQuery["myTasks"]["tasks"][number];

type Group = {
  id: string;
  name: string | null;
  tasks: TaskItem[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "my_tasks_collapsed";

const STATUS_LABELS: Record<MyTasksStatus, string> = {
  [MyTasksStatus.All]: "All Tasks",
  [MyTasksStatus.Incomplete]: "Incomplete Tasks",
  [MyTasksStatus.CompleteAll]: "All Completed",
  [MyTasksStatus.CompleteToday]: "Completed: Today",
  [MyTasksStatus.CompleteYesterday]: "Completed: Yesterday",
  [MyTasksStatus.CompleteOneWeek]: "Completed: 1 Week",
  [MyTasksStatus.CompleteTwoWeek]: "Completed: 2 Weeks",
  [MyTasksStatus.CompleteThreeWeek]: "Completed: 3 Weeks",
};

const SORT_LABELS: Record<MyTasksSort, string> = {
  [MyTasksSort.None]: "Sort: None",
  [MyTasksSort.Project]: "Sort: Project",
  [MyTasksSort.DueDate]: "Sort: Due Date",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadCollapsed(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveCollapsed(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Small dropdown popup used for Status and Sort controls */
function ControlDropdown({
  label,
  children,
}: {
  label: string;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: open ? "rgba(201,128,94,0.15)" : "rgba(255,235,210,0.06)",
          border: "1px solid rgba(255,235,210,0.12)",
          borderRadius: "8px",
          color: open ? "#c9805e" : "var(--color-text-secondary)",
          fontSize: "0.82rem",
          padding: "0.42rem 0.75rem",
          cursor: "pointer",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-body)",
          transition: "all 0.15s",
        }}
      >
        {label}
        <ChevronDown
          size={12}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: "#2c2724",
            border: "1px solid rgba(255,235,210,0.12)",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 1000,
            minWidth: "200px",
            overflow: "hidden",
          }}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        background: active ? "rgba(201,128,94,0.12)" : "transparent",
        border: "none",
        color: active ? "#c9805e" : "var(--color-text-primary)",
        fontSize: "0.875rem",
        padding: "0.55rem 1rem",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-body)",
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => {
        if (!active)
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,235,210,0.06)";
      }}
      onMouseLeave={(e) => {
        if (!active)
          (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {children}
      {active && <span style={{ fontSize: "0.7rem" }}>✓</span>}
    </button>
  );
}

// ─── Task Row ─────────────────────────────────────────────────────────────────

interface TaskRowProps {
  task: TaskItem;
  projectName: string;
  onToggleComplete: (id: string, complete: boolean) => void;
  onEditName: (id: string, name: string) => void;
  onEditDueDate: (
    task: TaskItem,
    ref: React.RefObject<HTMLElement | null>,
  ) => void;
  onRemoveDueDate: (id: string) => void;
  onOpenDetails: (shortId: string) => void;
}

function TaskRow({
  task,
  projectName,
  onToggleComplete,
  onEditName,
  onEditDueDate,
  onRemoveDueDate,
  onOpenDetails,
}: TaskRowProps) {
  const [editName, setEditName] = useState(task.name);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dueDateRef = useRef<HTMLDivElement>(null);

  // Displayed value: when not focused show the canonical task.name;
  // when focused show local edit state.
  const displayedName = focused ? editName : task.name;

  const formattedDueDate = task.dueDate?.at
    ? dayjs(task.dueDate.at).format(
        task.hasTime ? "MMM D [at] h:mm A" : "MMM D",
      )
    : null;

  const isOverdue =
    !task.complete &&
    task.dueDate?.at &&
    dayjs(task.dueDate.at).isBefore(dayjs(), "day");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        height: "38px",
        borderBottom: "1px solid rgba(255,235,210,0.06)",
        background: hovered ? "rgba(255,235,210,0.03)" : "transparent",
        transition: "background 0.1s",
      }}
    >
      {/* Complete toggle */}
      <div
        style={{
          width: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          cursor: "pointer",
          color: task.complete ? "#7aab8a" : "rgba(255,235,210,0.3)",
        }}
        onClick={() => onToggleComplete(task.id, !task.complete)}
      >
        {task.complete ? <CheckCircle2 size={16} /> : <Circle size={16} />}
      </div>

      {/* Task name (flexible, stretches) */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 8px 0 0",
          position: "relative",
          borderRight: "1px solid rgba(255,235,210,0.06)",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
            position: "relative",
            height: "24px",
            borderRadius: "3px",
            border: focused
              ? "1px solid rgba(201,128,94,0.5)"
              : hovered
                ? "1px solid rgba(255,235,210,0.12)"
                : "1px solid transparent",
          }}
        >
          {/* Shadow div to size the container */}
          <div
            aria-hidden
            style={{
              visibility: "hidden",
              whiteSpace: "pre",
              fontSize: "0.875rem",
              lineHeight: "24px",
              padding: "0 4px",
              pointerEvents: "none",
            }}
          >
            {displayedName || " "}
          </div>
          <input
            value={displayedName}
            onChange={(e) => setEditName(e.target.value)}
            onFocus={() => {
              setEditName(task.name);
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
              if (editName.trim() && editName !== task.name) {
                onEditName(task.id, editName.trim());
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              if (e.key === "Escape") {
                setEditName(task.name);
                (e.target as HTMLInputElement).blur();
              }
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: "transparent",
              border: "none",
              outline: "none",
              color: task.complete
                ? "var(--color-text-tertiary)"
                : "var(--color-text-primary)",
              fontSize: "0.875rem",
              lineHeight: "24px",
              padding: "0 4px",
              textDecoration: task.complete ? "line-through" : "none",
              fontFamily: "var(--font-body)",
              width: "100%",
            }}
          />
        </div>

        {/* Details button — shows on hover */}
        {hovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(task.shortId);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "8px",
              background: "rgba(255,235,210,0.06)",
              border: "1px solid rgba(255,235,210,0.1)",
              borderRadius: "6px",
              color: "var(--color-text-tertiary)",
              fontSize: "0.75rem",
              padding: "2px 8px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-body)",
            }}
          >
            Details <ChevronRight size={10} />
          </button>
        )}
      </div>

      {/* Due date cell */}
      <div
        ref={dueDateRef}
        style={{
          width: "140px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          borderRight: "1px solid rgba(255,235,210,0.06)",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => onEditDueDate(task, dueDateRef)}
      >
        <span
          style={{
            fontSize: "0.8rem",
            color: isOverdue
              ? "#e57373"
              : formattedDueDate
                ? "var(--color-text-secondary)"
                : "rgba(255,235,210,0.15)",
            fontFamily: "var(--font-body)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
          }}
        >
          {formattedDueDate ?? "—"}
        </span>
        {formattedDueDate && hovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveDueDate(task.id);
            }}
            style={{
              background: "none",
              border: "none",
              padding: "2px",
              cursor: "pointer",
              color: "var(--color-text-tertiary)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Project cell */}
      <div
        style={{
          width: "160px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,235,210,0.05)",
            border: "1px solid rgba(255,235,210,0.1)",
            borderRadius: "10px",
            padding: "1px 8px",
            fontSize: "0.75rem",
            color: "var(--color-text-secondary)",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-body)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#c9805e",
              flexShrink: 0,
            }}
          />
          {projectName}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function MyTasksPage() {
  const [status, setStatus] = useState(MyTasksStatus.Incomplete);
  const [sort, setSort] = useState(MyTasksSort.None);
  const [collapsed, setCollapsed] = useState<Set<string>>(loadCollapsed);

  // Due-date popup state
  const dueDateAnchorRef = useRef<HTMLElement | null>(null);
  const [dueDateTask, setDueDateTask] = useState<TaskItem | null>(null);

  const { projects: dashboardProjects } = useDashboardData();

  const { data, loading, error } = useLegacyMyTasksQuery({
    variables: { status, sort },
    fetchPolicy: "cache-and-network",
  });

  const [setTaskCompleteMutation] = useSetTaskCompleteMutation();
  const [updateTaskNameMutation] = useUpdateTaskNameMutation();
  const [updateTaskDueDateMutation] = useUpdateTaskDueDateMutation();

  // Task detail modal
  const {
    isOpen: isTaskModalOpen,
    taskData: selectedTask,
    loading: taskLoading,
    openModal: openTaskModal,
    closeModal: closeTaskModal,
    updateTaskName: modalUpdateTaskName,
    updateTaskDescription,
    toggleTaskComplete: modalToggleTaskComplete,
    isUpdating: isTaskUpdating,
  } = useTaskModal();

  // Build a map of projectID → project name
  const projectNameMap = useMemo(() => {
    const map = new Map<string, string>();
    (data?.projects ?? []).forEach((p) => map.set(p.id, p.name));
    // Fall back to dashboard projects if needed
    dashboardProjects.forEach((p) => {
      if (!map.has(p.id)) map.set(p.id, p.name);
    });
    return map;
  }, [data?.projects, dashboardProjects]);

  // Map taskID → projectID
  const taskProjectMap = useMemo(
    () =>
      new Map(
        (data?.myTasks.projects ?? []).map((m) => [m.taskID, m.projectID]),
      ),
    [data?.myTasks.projects],
  );

  // Build groups
  const groups = useMemo<Group[]>(() => {
    if (!data) return [];
    const tasks = data.myTasks.tasks;

    if (sort === MyTasksSort.None) {
      return [
        {
          id: "recently-assigned",
          name: null,
          tasks: [...tasks],
        },
      ];
    }

    if (sort === MyTasksSort.DueDate) {
      const withDate = tasks.filter((t) => t.dueDate?.at);
      const noDate = tasks.filter((t) => !t.dueDate?.at);

      const result: Group[] = [];
      if (withDate.length > 0) {
        result.push({
          id: "due_date",
          name: "With Due Date",
          tasks: [...withDate].sort((a, b) => {
            const da = dayjs(a.dueDate!.at);
            const db = dayjs(b.dueDate!.at);
            return da.isBefore(db) ? -1 : da.isAfter(db) ? 1 : 0;
          }),
        });
      }
      if (noDate.length > 0) {
        result.push({ id: "no_date", name: "No Due Date", tasks: noDate });
      }
      return result;
    }

    // Sort by Project
    const buckets = new Map<string, TaskItem[]>();
    tasks.forEach((task) => {
      const pid = taskProjectMap.get(task.id) ?? "__none__";
      const existing = buckets.get(pid) ?? [];
      buckets.set(pid, [...existing, task]);
    });

    const result: Group[] = [];
    buckets.forEach((groupTasks, pid) => {
      const name =
        pid === "__none__"
          ? "No Project"
          : (projectNameMap.get(pid) ?? "Unknown Project");
      result.push({ id: pid, name, tasks: groupTasks });
    });

    return result.sort((a, b) => {
      if (!a.name) return 1;
      if (!b.name) return -1;
      return a.name.localeCompare(b.name);
    });
  }, [data, sort, taskProjectMap, projectNameMap]);

  const toggleCollapsed = useCallback((groupId: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      saveCollapsed(next);
      return next;
    });
  }, []);

  const handleToggleComplete = useCallback(
    (taskId: string, complete: boolean) => {
      setTaskCompleteMutation({ variables: { taskID: taskId, complete } });
    },
    [setTaskCompleteMutation],
  );

  const handleEditName = useCallback(
    (taskId: string, name: string) => {
      updateTaskNameMutation({ variables: { taskID: taskId, name } });
    },
    [updateTaskNameMutation],
  );

  const handleEditDueDate = useCallback(
    (task: TaskItem, ref: React.RefObject<HTMLElement | null>) => {
      dueDateAnchorRef.current = ref.current;
      setDueDateTask(task);
    },
    [],
  );

  const handleRemoveDueDate = useCallback(
    (taskId: string) => {
      updateTaskDueDateMutation({
        variables: {
          taskID: taskId,
          dueDate: null,
          hasTime: false,
          createNotifications: [],
          updateNotifications: [],
          deleteNotifications: [],
        },
      });
    },
    [updateTaskDueDateMutation],
  );

  const handleDueDateSave = useCallback(
    (dueDate: string | null, hasTime: boolean) => {
      if (!dueDateTask) return;
      updateTaskDueDateMutation({
        variables: {
          taskID: dueDateTask.id,
          dueDate,
          hasTime,
          createNotifications: [],
          updateNotifications: [],
          deleteNotifications: [],
        },
      });
      setDueDateTask(null);
    },
    [dueDateTask, updateTaskDueDateMutation],
  );

  const totalTasks = data?.myTasks.tasks.length ?? 0;
  const completedCount =
    data?.myTasks.tasks.filter((t) => t.complete).length ?? 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, var(--color-surface-base) 0%, var(--color-surface-0) 50%, var(--color-surface-base) 100%)`,
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-body)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Page header */}
      <div
        style={{
          padding: "2rem 2rem 1rem",
          borderBottom: "1px solid rgba(255,235,210,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--color-text-tertiary)",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.35rem",
              }}
            >
              Focus & follow-through
            </p>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              My Tasks
            </h1>
            {data && (
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-text-tertiary)",
                  marginTop: "0.3rem",
                }}
              >
                {totalTasks} total · {completedCount} completed
              </p>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <ControlDropdown label={STATUS_LABELS[status]}>
              {(close) => (
                <>
                  <DropdownItem
                    active={status === MyTasksStatus.Incomplete}
                    onClick={() => {
                      setStatus(MyTasksStatus.Incomplete);
                      close();
                    }}
                  >
                    Incomplete Tasks
                  </DropdownItem>
                  <DropdownItem
                    active={status === MyTasksStatus.All}
                    onClick={() => {
                      setStatus(MyTasksStatus.All);
                      close();
                    }}
                  >
                    All Tasks
                  </DropdownItem>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-text-tertiary)",
                      padding: "6px 16px 2px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Completed since
                  </div>
                  {(
                    [
                      [MyTasksStatus.CompleteAll, "All completed"],
                      [MyTasksStatus.CompleteToday, "Today"],
                      [MyTasksStatus.CompleteYesterday, "Yesterday"],
                      [MyTasksStatus.CompleteOneWeek, "1 week"],
                      [MyTasksStatus.CompleteTwoWeek, "2 weeks"],
                      [MyTasksStatus.CompleteThreeWeek, "3 weeks"],
                    ] as [MyTasksStatus, string][]
                  ).map(([val, label]) => (
                    <DropdownItem
                      key={val}
                      active={status === val}
                      onClick={() => {
                        setStatus(val);
                        close();
                      }}
                    >
                      {label}
                    </DropdownItem>
                  ))}
                </>
              )}
            </ControlDropdown>

            <ControlDropdown label={SORT_LABELS[sort]}>
              {(close) => (
                <>
                  {(
                    [
                      [MyTasksSort.None, "None"],
                      [MyTasksSort.Project, "Project"],
                      [MyTasksSort.DueDate, "Due Date"],
                    ] as [MyTasksSort, string][]
                  ).map(([val, label]) => (
                    <DropdownItem
                      key={val}
                      active={sort === val}
                      onClick={() => {
                        setSort(val);
                        close();
                      }}
                    >
                      {label}
                    </DropdownItem>
                  ))}
                </>
              )}
            </ControlDropdown>
          </div>
        </div>
      </div>

      {/* Table area */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Column header row */}
          <div
            style={{
              display: "flex",
              height: "36px",
              borderBottom: "1px solid rgba(255,235,210,0.1)",
              background: "rgba(255,235,210,0.03)",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            {/* Complete toggle spacer */}
            <div style={{ width: "40px", flexShrink: 0 }} />
            {/* Task name header */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                paddingLeft: "4px",
                borderRight: "1px solid rgba(255,235,210,0.08)",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-text-tertiary)",
                fontWeight: 500,
              }}
            >
              Task name
            </div>
            {/* Due date header */}
            <div
              style={{
                width: "140px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                borderRight: "1px solid rgba(255,235,210,0.08)",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-text-tertiary)",
                fontWeight: 500,
              }}
            >
              Due date
            </div>
            {/* Project header */}
            <div
              style={{
                width: "160px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-text-tertiary)",
                fontWeight: 500,
              }}
            >
              Project
            </div>
          </div>

          {/* Loading */}
          {loading && !data && (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--color-text-tertiary)",
              }}
            >
              Loading tasks…
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{ padding: "3rem", textAlign: "center", color: "#e57373" }}
            >
              {error.message}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && totalTasks === 0 && (
            <div
              style={{
                padding: "4rem 2rem",
                textAlign: "center",
                color: "var(--color-text-tertiary)",
                fontSize: "0.95rem",
              }}
            >
              No tasks match this view.
            </div>
          )}

          {/* Groups */}
          {groups.map((group) => {
            const isCollapsed = collapsed.has(group.id);
            const projectId = taskProjectMap.get(group.tasks[0]?.id ?? "");
            const projectName = projectId
              ? (projectNameMap.get(projectId) ?? "Unknown Project")
              : "No Project";

            return (
              <div key={group.id}>
                {/* Group header — only shown when name is non-null */}
                {group.name !== null && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "44px",
                      padding: "0 12px 0 8px",
                      borderBottom: "1px solid rgba(255,235,210,0.06)",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    onClick={() => toggleCollapsed(group.id)}
                  >
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        padding: "4px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        color: "var(--color-text-tertiary)",
                        display: "flex",
                        alignItems: "center",
                        marginRight: "4px",
                      }}
                    >
                      {isCollapsed ? (
                        <ChevronRight size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "var(--color-text-secondary)",
                        flex: 1,
                      }}
                    >
                      {group.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {group.tasks.length}
                    </span>
                  </div>
                )}

                {/* Task rows */}
                {!isCollapsed &&
                  group.tasks.map((task) => {
                    const pid = taskProjectMap.get(task.id);
                    const pName = pid
                      ? (projectNameMap.get(pid) ?? "Unknown Project")
                      : projectName;

                    return (
                      <TaskRow
                        key={task.id}
                        task={task}
                        projectName={pName}
                        onToggleComplete={handleToggleComplete}
                        onEditName={handleEditName}
                        onEditDueDate={handleEditDueDate}
                        onRemoveDueDate={handleRemoveDueDate}
                        onOpenDetails={openTaskModal}
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Due date manager popup */}
      {dueDateTask && (
        <DueDateManager
          currentDueDate={dueDateTask.dueDate?.at ?? null}
          hasTime={dueDateTask.hasTime ?? false}
          onSave={handleDueDateSave}
          onClose={() => setDueDateTask(null)}
          anchorRef={dueDateAnchorRef}
        />
      )}

      {/* Task detail modal */}
      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        task={selectedTask}
        loading={taskLoading}
        onUpdateName={modalUpdateTaskName}
        onUpdateDescription={updateTaskDescription}
        onToggleComplete={modalToggleTaskComplete}
        isUpdating={isTaskUpdating}
      />
    </div>
  );
}
