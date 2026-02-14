import { useMemo, useState } from "react";
import {
  MyTasksSort,
  MyTasksStatus,
  useGetMyTasksQuery,
  type GetMyTasksQuery,
} from "@/graphql/generated/graphql";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboard";
import { TaskDetailModal } from "@/components/common";
import { useTaskModal } from "@/hooks";

const statusOptions = [
  { value: MyTasksStatus.Incomplete, label: "Incomplete" },
  { value: MyTasksStatus.All, label: "All tasks" },
  { value: MyTasksStatus.CompleteAll, label: "Completed" },
  { value: MyTasksStatus.CompleteToday, label: "Completed today" },
  { value: MyTasksStatus.CompleteYesterday, label: "Completed yesterday" },
  { value: MyTasksStatus.CompleteOneWeek, label: "Completed: 1 week" },
  { value: MyTasksStatus.CompleteTwoWeek, label: "Completed: 2 weeks" },
  { value: MyTasksStatus.CompleteThreeWeek, label: "Completed: 3 weeks" },
];

const sortOptions = [
  { value: MyTasksSort.None, label: "None" },
  { value: MyTasksSort.Project, label: "Project" },
  { value: MyTasksSort.DueDate, label: "Due date" },
];

type TaskItem = GetMyTasksQuery["myTasks"]["tasks"][number];

type GroupedTasks = {
  name: string;
  tasks: TaskItem[];
  projectId?: string;
};

export function MyTasksPage() {
  const [status, setStatus] = useState(MyTasksStatus.Incomplete);
  const [sort, setSort] = useState(MyTasksSort.DueDate);
  const { projects } = useDashboardData();
  const { data, loading, error } = useGetMyTasksQuery({
    variables: { status, sort },
  });

  // Task modal for viewing and editing task details
  const {
    isOpen: isTaskModalOpen,
    taskData: selectedTask,
    loading: taskLoading,
    openModal: openTaskModal,
    closeModal: closeTaskModal,
    updateTaskName,
    updateTaskDescription,
    toggleTaskComplete,
    isUpdating: isTaskUpdating,
  } = useTaskModal();

  // Dark palette — warm charcoal tones
  const base = "var(--color-surface-base)";
  const surface0 = "var(--color-surface-0)";
  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const sage = "var(--color-sage)";
  const slate = "var(--color-slate)";
  const ochre = "var(--color-ochre)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const accentColors = [terracotta, sage, slate, ochre];

  const projectNameMap = useMemo(() => {
    return new Map(projects.map((project) => [project.id, project.name]));
  }, [projects]);

  const taskProjectMap = useMemo(() => {
    return new Map(
      data?.myTasks.projects.map((mapping) => [
        mapping.taskID,
        mapping.projectID,
      ]) || [],
    );
  }, [data?.myTasks.projects]);

  const tasks = useMemo(() => data?.myTasks.tasks || [], [data?.myTasks.tasks]);
  const completedCount = useMemo(
    () => tasks.filter((task) => task.complete).length,
    [tasks],
  );

  const groupedTasks = useMemo(() => {
    const buckets = new Map<string, GroupedTasks>();
    tasks.forEach((task) => {
      const projectId = taskProjectMap.get(task.id);
      const projectName = projectId
        ? projectNameMap.get(projectId) || "Unknown project"
        : "Unassigned";

      if (!buckets.has(projectName)) {
        buckets.set(projectName, { name: projectName, tasks: [], projectId });
      }
      buckets.get(projectName)?.tasks.push(task);
    });

    return Array.from(buckets.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [projectNameMap, taskProjectMap, tasks]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
        color: textPrimary,
      }}
    >
      <div className="relative max-w-6xl mx-auto px-8 py-10">
        {/* Header */}
        <header
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10"
          style={{ animation: "d2dFadeUp 0.7s ease-out" }}
        >
          <div>
            <p
              style={{
                fontFamily: fontBody,
                fontSize: "0.8rem",
                color: textTertiary,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Focus and follow-through
            </p>
            <h1
              style={{
                fontFamily: fontHeading,
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: textPrimary,
              }}
            >
              My Tasks
            </h1>
            <p
              style={{
                fontFamily: fontBody,
                fontSize: "0.9rem",
                color: textSecondary,
                marginTop: "0.5rem",
              }}
            >
              {tasks.length} total · {completedCount} completed
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: fontBody }}
          >
            <div className="flex flex-col">
              <label
                htmlFor="task-status"
                style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: textTertiary,
                  marginBottom: "0.4rem",
                }}
              >
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as MyTasksStatus)
                }
                style={{
                  background: surface1,
                  border: `1px solid ${border}`,
                  color: textPrimary,
                  borderRadius: "10px",
                  padding: "0.55rem 0.9rem",
                  fontSize: "0.9rem",
                }}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="task-sort"
                style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: textTertiary,
                  marginBottom: "0.4rem",
                }}
              >
                Sort
              </label>
              <select
                id="task-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as MyTasksSort)}
                style={{
                  background: surface1,
                  border: `1px solid ${border}`,
                  color: textPrimary,
                  borderRadius: "10px",
                  padding: "0.55rem 0.9rem",
                  fontSize: "0.9rem",
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {loading && (
          <div
            className="space-y-4"
            style={{ animation: "d2dFadeUp 0.5s ease-out" }}
          >
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                style={{
                  background: surface1,
                  borderRadius: "20px",
                  border: `1px solid ${border}`,
                  height: "120px",
                }}
              />
            ))}
          </div>
        )}

        {error && (
          <div
            style={{
              background: surface1,
              borderRadius: "20px",
              border: `1px solid ${border}`,
              padding: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: fontHeading,
                color: terracotta,
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
              }}
            >
              Unable to load tasks
            </h2>
            <p
              style={{
                fontFamily: fontBody,
                color: textSecondary,
                fontSize: "0.9rem",
              }}
            >
              {error.message}
            </p>
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div
            style={{
              background: surface1,
              borderRadius: "20px",
              border: `1px solid ${border}`,
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: fontBody,
                color: textSecondary,
                fontSize: "0.95rem",
              }}
            >
              No tasks match this view yet.
            </p>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div className="space-y-6">
            {groupedTasks.map((group, groupIndex) => (
              <section
                key={group.name}
                style={{
                  background: surface1,
                  borderRadius: "20px",
                  border: `1px solid ${border}`,
                  padding: "1.5rem",
                  animation: `d2dFadeUp 0.6s ease-out ${
                    groupIndex * 0.1
                  }s both`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background:
                          accentColors[groupIndex % accentColors.length],
                        boxShadow: `0 0 8px ${
                          accentColors[groupIndex % accentColors.length]
                        }40`,
                      }}
                    />
                    <h2
                      style={{
                        fontFamily: fontBody,
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: textSecondary,
                      }}
                    >
                      {group.name}
                    </h2>
                  </div>
                  <span
                    style={{
                      fontFamily: fontBody,
                      fontSize: "0.75rem",
                      color: textTertiary,
                    }}
                  >
                    {group.tasks.length} tasks
                  </span>
                </div>

                <div className="space-y-3">
                  {group.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => openTaskModal(task.shortId)}
                      style={{
                        background: surface2,
                        borderRadius: "14px",
                        border: `1px solid ${border}`,
                        padding: "0.85rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.9rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = surface3;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = surface2;
                      }}
                    >
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: task.complete ? sage : terracotta,
                          boxShadow: `0 0 6px ${task.complete ? sage : terracotta}55`,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontFamily: fontBody,
                            fontSize: "0.95rem",
                            color: task.complete ? textTertiary : textPrimary,
                            textDecoration: task.complete
                              ? "line-through"
                              : "none",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {task.name}
                        </p>
                        <p
                          style={{
                            fontFamily: fontBody,
                            fontSize: "0.8rem",
                            color: textTertiary,
                          }}
                        >
                          {task.taskGroup?.name || "Ungrouped"}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: fontBody,
                          fontSize: "0.75rem",
                          color: textTertiary,
                        }}
                      >
                        {task.complete ? "Done" : "Open"}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        task={selectedTask}
        loading={taskLoading}
        onUpdateName={updateTaskName}
        onUpdateDescription={updateTaskDescription}
        onToggleComplete={toggleTaskComplete}
        isUpdating={isTaskUpdating}
      />
    </div>
  );
}
