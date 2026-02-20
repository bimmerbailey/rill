import { useMemo, useState, useCallback, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { Button, TaskDetailModal } from "@/components/common";
import {
  CREATE_TASK,
  CREATE_TASK_GROUP,
  GET_PROJECT_BOARD,
} from "@/features/projects/graphql/queries";
import { useProjectBoard, useProjectMembers } from "@/features/projects/hooks";
import { useTaskModal } from "@/hooks";
import { useAuthStore } from "@/stores";
import {
  UpdateTaskLocationDocument,
  UpdateTaskGroupLocationDocument,
  type FindProjectQuery,
} from "@/graphql/generated/graphql";
import { DraggableTask } from "@/features/projects/components/DraggableTask";
import { DraggableColumn } from "@/features/projects/components/DraggableColumn";
import { useBoardDropHandler } from "@/features/projects/hooks/useBoardDropHandler";
import { ProjectSettingsMenu } from "@/features/projects/components/ProjectSettingsMenu";
import { LabelManagerModal } from "@/features/projects/components/labels";
import { MemberManagementModal } from "@/features/projects/components/members";
import { ProjectSettingsModal } from "@/features/projects/components/settings";
import { BoardControls } from "@/features/projects/components/controls";
import { CardComposer } from "@/features/projects/components/task";
import {
  type TaskFilters,
  type TaskSorting,
  type TaskStatusFilter,
  TaskSortingType,
  TaskSortingDirection,
  TaskStatus,
  TaskSince,
  DueDateFilterType,
  DEFAULT_FILTERS,
  DEFAULT_SORTING,
  DEFAULT_STATUS_FILTER,
} from "@/features/projects/types";
import {
  AssignTaskDocument,
  UnassignTaskDocument,
  UpdateTaskDueDateDocument,
  ToggleTaskLabelDocument,
} from "@/graphql/generated/graphql";
import dayjs from "dayjs";

const SET_TASK_COMPLETE = gql`
  mutation SetTaskComplete($taskID: UUID!, $complete: Boolean!) {
    setTaskComplete(input: { taskID: $taskID, complete: $complete }) {
      id
      complete
      completedAt
    }
  }
`;

const UPDATE_TASK_NAME = gql`
  mutation UpdateTaskName($taskID: UUID!, $name: String!) {
    updateTaskName(input: { taskID: $taskID, name: $name }) {
      id
      name
    }
  }
`;

const UPDATE_TASK_GROUP_NAME = gql`
  mutation UpdateTaskGroupName($taskGroupID: UUID!, $name: String!) {
    updateTaskGroupName(input: { taskGroupID: $taskGroupID, name: $name }) {
      id
      name
    }
  }
`;

const DELETE_TASK_GROUP = gql`
  mutation DeleteTaskGroup($taskGroupID: UUID!) {
    deleteTaskGroup(input: { taskGroupID: $taskGroupID }) {
      ok
      taskGroup {
        id
      }
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($taskID: UUID!) {
    deleteTask(input: { taskID: $taskID }) {
      taskID
    }
  }
`;

export function ProjectBoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    project,
    taskGroups,
    members,
    invitedMembers,
    labels,
    labelColors,
    users,
    loading,
    error,
    refetch,
  } = useProjectBoard(projectId || "");

  const projectUUID = project?.id;

  const {
    inviteProjectMembers,
    removeProjectMember,
    cancelProjectInvite,
    changeProjectMemberRole,
  } = useProjectMembers({
    projectShortId: projectId || "",
    projectUUID: projectUUID || "",
    onMembersChanged: () => refetch(),
  });

  const [showLabelsModal, setShowLabelsModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [newGroupName, setNewGroupName] = useState("");
  const [groupError, setGroupError] = useState<string | null>(null);

  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  const [columnDragOverState, setColumnDragOverState] = useState<
    Record<string, boolean>
  >({});

  const {
    isOpen: isTaskModalOpen,
    taskData: selectedTask,
    loading: taskLoading,
    openModal: openTaskModal,
    closeModal: closeTaskModal,
    updateTaskName,
    updateTaskDescription,
    toggleTaskComplete,
    toggleTaskWatch,
    createComment,
    updateComment,
    deleteComment,
    createChecklist,
    deleteChecklist,
    renameChecklist,
    createChecklistItem,
    deleteChecklistItem,
    toggleChecklistItemComplete,
    renameChecklistItem,
    toggleLabel,
    createLabel,
    updateLabel,
    deleteLabel,
    assign,
    unassign,
    updateDueDate,
    createDueDateNotification,
    deleteDueDateNotification,
    isUpdating: isTaskUpdating,
  } = useTaskModal();

  const [searchParams, setSearchParams] = useSearchParams();
  const taskParam = searchParams.get("task");

  useEffect(() => {
    if (taskParam && openTaskModal) {
      openTaskModal(taskParam);
      setSearchParams({});
    }
  }, [taskParam, openTaskModal, setSearchParams]);

  const currentUserId = useAuthStore((state) => state.userId);

  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const [sorting, setSorting] = useState<TaskSorting>(DEFAULT_SORTING);
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>(
    DEFAULT_STATUS_FILTER,
  );

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

  const groupColors = [terracotta, sage, slate, ochre];

  const [createTaskGroup, { loading: creatingGroup }] = useMutation(
    CREATE_TASK_GROUP,
    {
      refetchQueries: projectUUID
        ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectUUID } }]
        : [],
    },
  );

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: projectUUID
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectUUID } }]
      : [],
  });

  const [setTaskComplete] = useMutation(SET_TASK_COMPLETE, {
    refetchQueries: projectUUID
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectUUID } }]
      : [],
  });

  const [updateTaskNameMutation] = useMutation(UPDATE_TASK_NAME, {
    refetchQueries: projectUUID
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectUUID } }]
      : [],
  });

  const [updateTaskGroupName] = useMutation(UPDATE_TASK_GROUP_NAME, {
    refetchQueries: projectUUID
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectUUID } }]
      : [],
  });

  const [deleteTaskGroup] = useMutation(DELETE_TASK_GROUP, {
    refetchQueries: projectUUID
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectUUID } }]
      : [],
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: projectUUID
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectUUID } }]
      : [],
  });

  // ── Quick card editor mutations ────────────────────────────────────────────
  const refetchBoard = projectUUID
    ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectUUID } }]
    : [];

  const [assignTask] = useMutation(AssignTaskDocument, { refetchQueries: refetchBoard });
  const [unassignTask] = useMutation(UnassignTaskDocument, {
    refetchQueries: refetchBoard,
  });
  const [updateTaskDueDate] = useMutation(UpdateTaskDueDateDocument, {
    refetchQueries: refetchBoard,
  });
  const [toggleTaskLabel] = useMutation(ToggleTaskLabelDocument, {
    refetchQueries: refetchBoard,
  });

  const handleQuickSaveName = useCallback(
    async (taskId: string, name: string) => {
      await updateTaskNameMutation({ variables: { taskID: taskId, name } });
    },
    [updateTaskNameMutation],
  );

  const handleQuickToggleComplete = useCallback(
    async (taskId: string, complete: boolean) => {
      await setTaskComplete({ variables: { taskID: taskId, complete } });
    },
    [setTaskComplete],
  );

  const handleToggleLabel = useCallback(
    async (taskId: string, projectLabelId: string) => {
      await toggleTaskLabel({
        variables: { taskID: taskId, projectLabelID: projectLabelId },
      });
    },
    [toggleTaskLabel],
  );

  const handleAssign = useCallback(
    async (taskId: string, userId: string) => {
      await assignTask({ variables: { taskID: taskId, userID: userId } });
    },
    [assignTask],
  );

  const handleUnassign = useCallback(
    async (taskId: string, userId: string) => {
      await unassignTask({ variables: { taskID: taskId, userID: userId } });
    },
    [unassignTask],
  );

  const handleUpdateDueDate = useCallback(
    async (taskId: string, dueDate: string | null, hasTime: boolean) => {
      await updateTaskDueDate({
        variables: {
          taskID: taskId,
          dueDate,
          hasTime,
          createNotifications: [],
          updateNotifications: [],
          deleteNotifications: [],
        },
      });
    },
    [updateTaskDueDate],
  );

  const handleQuickDelete = useCallback(
    async (taskId: string) => {
      if (!confirm("Are you sure you want to delete this task?")) return;
      await deleteTask({ variables: { taskID: taskId } });
      if (selectedTask?.id === taskId) closeTaskModal();
    },
    [deleteTask, selectedTask, closeTaskModal],
  );

  const [updateTaskLocation] = useMutation(UpdateTaskLocationDocument, {
    update: (client, result) => {
      if (!result.data) return;
      const { previousTaskGroupID, task } = result.data.updateTaskLocation;
      const cacheData = client.readQuery<FindProjectQuery>({
        query: GET_PROJECT_BOARD,
        variables: { projectID: projectUUID },
      });
      if (!cacheData?.findProject) return;

      const groups = cacheData.findProject.taskGroups;
      const oldGroupIdx = groups.findIndex((g) => g.id === previousTaskGroupID);
      if (oldGroupIdx === -1) return;

      const oldTask = groups[oldGroupIdx].tasks.find((t) => t.id === task.id);
      if (!oldTask) return;

      const newGroups = [...groups];

      if (previousTaskGroupID !== task.taskGroup.id) {
        const newGroupIdx = groups.findIndex((g) => g.id === task.taskGroup.id);
        if (newGroupIdx === -1) return;

        newGroups[oldGroupIdx] = {
          ...groups[oldGroupIdx],
          tasks: groups[oldGroupIdx].tasks.filter((t) => t.id !== task.id),
        };
        newGroups[newGroupIdx] = {
          ...groups[newGroupIdx],
          tasks: [
            ...groups[newGroupIdx].tasks,
            {
              ...oldTask,
              position: task.position,
              taskGroup: { ...oldTask.taskGroup, id: task.taskGroup.id },
            },
          ],
        };
      } else {
        const updatedTasks = groups[oldGroupIdx].tasks.map((t) =>
          t.id === task.id ? { ...t, position: task.position } : t,
        );
        newGroups[oldGroupIdx] = {
          ...groups[oldGroupIdx],
          tasks: updatedTasks,
        };
      }

      client.writeQuery<FindProjectQuery>({
        query: GET_PROJECT_BOARD,
        variables: { projectID: projectUUID },
        data: {
          ...cacheData,
          findProject: {
            ...cacheData.findProject,
            taskGroups: newGroups,
          },
        },
      });
    },
  });

  const [updateTaskGroupLocation] = useMutation(UpdateTaskGroupLocationDocument, {});

  const handleTaskMove = useCallback(
    (variables: {
      taskID: string;
      taskGroupID: string;
      position: number;
      previousTaskGroupID: string;
    }) => {
      const sourceGroup = taskGroups.find(
        (g) => g.id === variables.previousTaskGroupID,
      );
      const droppedTask = sourceGroup?.tasks.find(
        (t) => t.id === variables.taskID,
      );

      updateTaskLocation({
        variables: {
          taskID: variables.taskID,
          taskGroupID: variables.taskGroupID,
          position: variables.position,
        },
        refetchQueries: [
          {
            query: GET_PROJECT_BOARD,
            variables: { projectID: projectUUID },
          },
        ],
        optimisticResponse: {
          __typename: "Mutation",
          updateTaskLocation: {
            __typename: "UpdateTaskLocationPayload",
            previousTaskGroupID: variables.previousTaskGroupID,
            task: {
              __typename: "Task",
              id: variables.taskID,
              createdAt: new Date().toISOString(),
              name: droppedTask?.name || "",
              position: variables.position,
              taskGroup: {
                __typename: "TaskGroup",
                id: variables.taskGroupID,
              },
            },
          },
        },
      });
    },
    [taskGroups, updateTaskLocation, projectUUID],
  );

  const handleColumnMove = useCallback(
    (variables: { taskGroupID: string; position: number }) => {
      updateTaskGroupLocation({
        variables,
        optimisticResponse: {
          __typename: "Mutation",
          updateTaskGroupLocation: {
            __typename: "TaskGroup",
            id: variables.taskGroupID,
            position: variables.position,
          },
        },
      });
    },
    [updateTaskGroupLocation],
  );

  useBoardDropHandler({
    taskGroups,
    onTaskMove: handleTaskMove,
    onColumnMove: handleColumnMove,
  });

  const nextGroupPosition = useMemo(() => {
    if (taskGroups.length === 0) return 1;
    return Math.max(...taskGroups.map((group) => group.position)) + 1;
  }, [taskGroups]);

  const handleCreateGroup = async () => {
    if (!projectUUID) return;
    if (!newGroupName.trim()) {
      setGroupError("Group name is required.");
      return;
    }
    setGroupError(null);
    try {
      await createTaskGroup({
        variables: {
          projectID: projectUUID,
          name: newGroupName.trim(),
          position: nextGroupPosition,
        },
      });
      setNewGroupName("");
    } catch {
      setGroupError("Unable to create group. Please try again.");
    }
  };

  const handleCreateTask = async (groupId: string, taskName: string) => {
    if (!projectUUID || !taskName.trim()) return;
    const group = taskGroups.find((item) => item.id === groupId);
    const nextTaskPosition = group?.tasks.length
      ? Math.max(...group.tasks.map((task) => task.position)) + 1
      : 1;
    try {
      await createTask({
        variables: {
          taskGroupID: groupId,
          name: taskName.trim(),
          position: nextTaskPosition,
          assigned: [],
        },
      });
    } catch {
      // silent — CardComposer handles its own state
    }
  };

  const handleToggleComplete = async (taskId: string, complete: boolean) => {
    try {
      await setTaskComplete({
        variables: { taskID: taskId, complete: !complete },
      });
    } catch (err) {
      console.error("Failed to toggle task completion", err);
    }
  };

  const handleUpdateTaskName = async (taskId: string) => {
    if (!editingTaskName.trim()) return;
    try {
      await updateTaskNameMutation({
        variables: { taskID: taskId, name: editingTaskName.trim() },
      });
      setEditingTaskId(null);
      setEditingTaskName("");
    } catch (err) {
      console.error("Failed to update task name", err);
    }
  };

  const handleUpdateGroupName = async (groupId: string) => {
    if (!editingGroupName.trim()) return;
    try {
      await updateTaskGroupName({
        variables: { taskGroupID: groupId, name: editingGroupName.trim() },
      });
      setEditingGroupId(null);
      setEditingGroupName("");
    } catch (err) {
      console.error("Failed to update group name", err);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm("Are you sure you want to delete this group?")) return;
    try {
      await deleteTaskGroup({ variables: { taskGroupID: groupId } });
    } catch (err) {
      console.error("Failed to delete group", err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask({ variables: { taskID: taskId } });
      if (selectedTask?.id === taskId) closeTaskModal();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const getFilteredAndSortedTasks = useCallback(
    (tasks: (typeof taskGroups)[0]["tasks"]) => {
      let filtered = [...tasks];

      // ── Task name filter ────────────────────────────────────────────────
      if (filters.taskName) {
        const search = filters.taskName.toLowerCase();
        filtered = filtered.filter((t) =>
          t.name.toLowerCase().includes(search),
        );
      }

      // ── Member filter ───────────────────────────────────────────────────
      if (filters.members.length > 0) {
        const memberIds = new Set(filters.members.map((m) => m.id));
        filtered = filtered.filter((t) =>
          t.assigned?.some((a) => a && memberIds.has(a.id)),
        );
      }

      // ── Label filter ────────────────────────────────────────────────────
      if (filters.labels.length > 0) {
        const labelIds = new Set(filters.labels.map((l) => l.id));
        filtered = filtered.filter((t) =>
          t.labels?.some((l) => l && labelIds.has(l.projectLabel?.id ?? "")),
        );
      }

      // ── Due date filter ─────────────────────────────────────────────────
      if (filters.dueDate) {
        const now = dayjs();
        filtered = filtered.filter((t) => {
          const dd = t.dueDate?.at ? dayjs(t.dueDate.at) : null;
          switch (filters.dueDate!.type) {
            case DueDateFilterType.TODAY:
              return dd?.isSame(now, "day") ?? false;
            case DueDateFilterType.TOMORROW:
              return dd?.isSame(now.add(1, "day"), "day") ?? false;
            case DueDateFilterType.THIS_WEEK:
              return (
                (dd?.isAfter(now.subtract(1, "day")) &&
                  dd?.isBefore(now.endOf("week").add(1, "day"))) ??
                false
              );
            case DueDateFilterType.NEXT_WEEK:
              return (
                (dd?.isAfter(now.endOf("week")) &&
                  dd?.isBefore(now.add(2, "week").startOf("week"))) ??
                false
              );
            case DueDateFilterType.ONE_WEEK:
              return (
                (dd?.isAfter(now.subtract(1, "day")) &&
                  dd?.isBefore(now.add(1, "week").add(1, "day"))) ??
                false
              );
            case DueDateFilterType.TWO_WEEKS:
              return (
                (dd?.isAfter(now.subtract(1, "day")) &&
                  dd?.isBefore(now.add(2, "week").add(1, "day"))) ??
                false
              );
            case DueDateFilterType.THREE_WEEKS:
              return (
                (dd?.isAfter(now.subtract(1, "day")) &&
                  dd?.isBefore(now.add(3, "week").add(1, "day"))) ??
                false
              );
            case DueDateFilterType.OVERDUE:
              return dd ? dd.isBefore(now) && !t.complete : false;
            case DueDateFilterType.NO_DUE_DATE:
              return !t.dueDate?.at;
            default:
              return true;
          }
        });
      }

      // ── Status filter ───────────────────────────────────────────────────
      if (statusFilter.status === TaskStatus.INCOMPLETE) {
        filtered = filtered.filter((t) => !t.complete);
      } else if (statusFilter.status === TaskStatus.COMPLETE) {
        filtered = filtered.filter((t) => t.complete);
        // Apply "since" sub-filter
        if (statusFilter.since !== TaskSince.ALL) {
          const cutoff = (() => {
            const now = dayjs();
            switch (statusFilter.since) {
              case TaskSince.TODAY:
                return now.startOf("day");
              case TaskSince.YESTERDAY:
                return now.subtract(1, "day").startOf("day");
              case TaskSince.ONE_WEEK:
                return now.subtract(1, "week");
              case TaskSince.TWO_WEEKS:
                return now.subtract(2, "week");
              case TaskSince.THREE_WEEKS:
                return now.subtract(3, "week");
              default:
                return null;
            }
          })();
          if (cutoff) {
            filtered = filtered.filter(
              (t) => t.completedAt && dayjs(t.completedAt).isAfter(cutoff),
            );
          }
        }
      }
      // TaskStatus.ALL — no status filter applied

      // ── Sorting ─────────────────────────────────────────────────────────
      const dir = sorting.direction === TaskSortingDirection.DESC ? -1 : 1;
      switch (sorting.type) {
        case TaskSortingType.DUE_DATE:
          filtered.sort((a, b) => {
            if (!a.dueDate?.at) return 1;
            if (!b.dueDate?.at) return -1;
            return (
              dir *
              (new Date(a.dueDate.at).getTime() -
                new Date(b.dueDate.at).getTime())
            );
          });
          break;
        case TaskSortingType.NAME:
          filtered.sort((a, b) => dir * a.name.localeCompare(b.name));
          break;
        case TaskSortingType.MEMBERS:
          filtered.sort((a, b) => {
            const aCount = a.assigned?.length ?? 0;
            const bCount = b.assigned?.length ?? 0;
            return dir * (bCount - aCount);
          });
          break;
        case TaskSortingType.LABELS:
          filtered.sort((a, b) => {
            const aCount = a.labels?.length ?? 0;
            const bCount = b.labels?.length ?? 0;
            return dir * (bCount - aCount);
          });
          break;
        case TaskSortingType.COMPLETE:
          filtered.sort((a, b) => {
            const aVal = a.complete ? 1 : 0;
            const bVal = b.complete ? 1 : 0;
            return dir * (bVal - aVal);
          });
          break;
        case TaskSortingType.NONE:
        default:
          filtered.sort((a, b) => a.position - b.position);
          break;
      }

      return filtered;
    },
    [filters, sorting, statusFilter],
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div className="animate-pulse space-y-6">
          <div
            className="h-8 rounded w-1/3"
            style={{ background: surface2 }}
          ></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="h-64 rounded"
              style={{ background: surface1 }}
            ></div>
            <div
              className="h-64 rounded"
              style={{ background: surface1 }}
            ></div>
            <div
              className="h-64 rounded"
              style={{ background: surface1 }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div
          className="rounded-lg p-6"
          style={{ background: surface1, border: `1px solid ${border}` }}
        >
          <h2
            className="font-semibold mb-2"
            style={{
              color: terracotta,
              fontFamily: fontHeading,
            }}
          >
            Error loading project
          </h2>
          <p
            style={{
              color: textSecondary,
              fontFamily: fontBody,
            }}
          >
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div
          className="p-6"
          style={{
            background: surface1,
            border: `1px solid ${border}`,
            borderRadius: "20px",
          }}
        >
          <h2
            className="mb-2"
            style={{
              fontFamily: fontHeading,
              fontSize: "1.5rem",
              color: textPrimary,
            }}
          >
            Project not found
          </h2>
          <p
            style={{
              fontFamily: fontBody,
              fontSize: "0.9rem",
              color: textSecondary,
            }}
          >
            We couldn't load this project. Check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="mb-6 relative z-20"
        style={{ animation: "d2dFadeUp 0.7s ease-out both" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              style={{
                fontFamily: fontHeading,
                fontSize: "2rem",
                fontWeight: 400,
                color: textPrimary,
              }}
            >
              {project.name}
            </h1>
            <p
              style={{
                fontFamily: fontBody,
                fontSize: "0.85rem",
                color: textSecondary,
                marginTop: "0.25rem",
              }}
            >
              {taskGroups.reduce((acc, g) => acc + g.tasks.length, 0)} tasks ·{" "}
              {taskGroups.length} groups
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ProjectSettingsMenu
              onOpenLabels={() => setShowLabelsModal(true)}
              onOpenMembers={() => setShowMembersModal(true)}
              onOpenSettings={() => setShowSettingsModal(true)}
            />
            <BoardControls
              filters={filters}
              sorting={sorting}
              statusFilter={statusFilter}
              currentUserId={currentUserId ?? undefined}
              members={members.map((m) => ({
                id: m.id,
                fullName: m.fullName,
                username: m.username,
                profileIcon: m.profileIcon,
              }))}
              labels={labels.map((l) => ({
                id: l.id,
                name: l.name,
                labelColor: l.labelColor,
              }))}
              onFiltersChange={setFilters}
              onSortingChange={setSorting}
              onStatusFilterChange={setStatusFilter}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-col">
        <div className="flex-1 min-w-0 overflow-x-auto">
          {taskGroups.length === 0 ? (
            <div
              className="p-6"
              style={{
                background: surface1,
                border: `1px solid ${border}`,
                borderRadius: "20px",
                animation: "d2dFadeUp 0.7s ease-out 0.2s both",
              }}
            >
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.9rem",
                  color: textSecondary,
                }}
              >
                No task groups yet.
              </p>
            </div>
          ) : (
            <div className="flex gap-4 pb-4">
              {taskGroups.map((group, groupIndex) => {
                const displayTasks = getFilteredAndSortedTasks(group.tasks);
                const isTaskDragDisabled =
                  sorting.type !== TaskSortingType.NONE;
                const isDraggedOver = columnDragOverState[group.id] || false;

                return (
                  <DraggableColumn
                    key={group.id}
                    column={group}
                    surface1={surface1}
                    surface2={surface2}
                    border={border}
                    isDraggedOver={isDraggedOver}
                    onDraggedOverChange={(isOver) =>
                      setColumnDragOverState((prev) => ({
                        ...prev,
                        [group.id]: isOver,
                      }))
                    }
                    headerContent={
                      <div
                        className="flex items-center justify-between mb-3 p-4"
                        style={{
                          borderBottom: `1px solid ${border}`,
                        }}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background:
                                groupColors[groupIndex % groupColors.length],
                              boxShadow: `0 0 8px ${groupColors[groupIndex % groupColors.length]}40`,
                            }}
                          />
                          {editingGroupId === group.id ? (
                            <input
                              type="text"
                              value={editingGroupName}
                              onChange={(e) =>
                                setEditingGroupName(e.target.value)
                              }
                              onBlur={() => handleUpdateGroupName(group.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleUpdateGroupName(group.id);
                                if (e.key === "Escape") {
                                  setEditingGroupId(null);
                                  setEditingGroupName("");
                                }
                              }}
                              autoFocus
                              className="flex-1 px-2 py-1 rounded text-sm"
                              style={{
                                background: surface3,
                                border: `1px solid ${border}`,
                                color: textPrimary,
                                fontFamily: fontBody,
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <h2
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingGroupId(group.id);
                                setEditingGroupName(group.name);
                              }}
                              className="cursor-pointer hover:opacity-80"
                              style={{
                                fontFamily: fontBody,
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: textSecondary,
                              }}
                            >
                              {group.name}
                            </h2>
                          )}
                          <span
                            style={{
                              fontFamily: fontBody,
                              fontSize: "0.75rem",
                              color: textTertiary,
                            }}
                          >
                            ({displayTasks.length})
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteGroup(group.id);
                          }}
                          className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                          style={{ color: terracotta }}
                          title="Delete group"
                        >
                          ×
                        </button>
                      </div>
                    }
                  >
                    <div className="space-y-2 flex-1 min-h-[100px] p-4">
                      {displayTasks.map((task) => (
                        <DraggableTask
                          key={task.id}
                          task={task}
                          columnId={group.id}
                          isDragDisabled={isTaskDragDisabled}
                          onClick={() => openTaskModal(task.shortId)}
                          onToggleComplete={() =>
                            handleToggleComplete(task.id, task.complete)
                          }
                          onDelete={() => handleDeleteTask(task.id)}
                          onEditName={() => {
                            setEditingTaskId(task.id);
                            setEditingTaskName(task.name);
                          }}
                          editingTaskId={editingTaskId}
                          editingTaskName={editingTaskName}
                          setEditingTaskName={setEditingTaskName}
                          onUpdateTaskName={() => handleUpdateTaskName(task.id)}
                          projectLabels={labels}
                          projectMembers={members}
                          onSaveName={handleQuickSaveName}
                          onQuickToggleComplete={handleQuickToggleComplete}
                          onToggleLabel={handleToggleLabel}
                          onAssign={handleAssign}
                          onUnassign={handleUnassign}
                          onUpdateDueDate={handleUpdateDueDate}
                          onQuickDelete={handleQuickDelete}
                          onOpenModal={openTaskModal}
                          surface0={surface0}
                          surface2={surface2}
                          surface3={surface3}
                          border={border}
                          textPrimary={textPrimary}
                          textTertiary={textTertiary}
                          terracotta={terracotta}
                          sage={sage}
                        />
                      ))}
                      {displayTasks.length === 0 && (
                        <p
                          style={{
                            fontFamily: fontBody,
                            fontSize: "0.8rem",
                            color: textTertiary,
                            fontStyle: "italic",
                            padding: "1rem 0",
                          }}
                        >
                          {isTaskDragDisabled
                            ? "No tasks match filters."
                            : "Drop tasks here"}
                        </p>
                      )}
                    </div>

                    <div className="p-4 pt-0">
                      <CardComposer
                        onCreateCard={(name) =>
                          handleCreateTask(group.id, name)
                        }
                      />
                    </div>
                  </DraggableColumn>
                );
              })}
            </div>
          )}
        </div>

        <div
          className="mt-6 p-4"
          style={{
            background: surface1,
            border: `1px solid ${border}`,
            borderRadius: "20px",
          }}
        >
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="New group name..."
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateGroup();
              }}
              className="flex-1 px-4 py-2 rounded-lg"
              style={{
                background: surface3,
                border: `1px solid ${border}`,
                color: textPrimary,
                fontFamily: fontBody,
              }}
            />
            <Button
              onClick={handleCreateGroup}
              disabled={creatingGroup}
              style={{
                background: terracotta,
                color: surface0,
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: fontBody,
                  fontWeight: 500,
                }}
              >
                {creatingGroup ? "Adding..." : "Add Group"}
              </span>
            </Button>
          </div>
          {groupError && (
            <span
              style={{
                fontFamily: fontBody,
                fontSize: "0.8rem",
                color: terracotta,
                marginTop: "0.5rem",
                display: "block",
              }}
            >
              {groupError}
            </span>
          )}
        </div>
      </div>

      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        task={selectedTask}
        project={project}
        labelColors={labelColors}
        currentUserId={currentUserId ?? undefined}
        loading={taskLoading}
        onUpdateName={updateTaskName}
        onUpdateDescription={updateTaskDescription}
        onToggleComplete={toggleTaskComplete}
        onToggleWatch={toggleTaskWatch}
        onCreateComment={createComment}
        onUpdateComment={updateComment}
        onDeleteComment={deleteComment}
        onCreateChecklist={createChecklist}
        onDeleteChecklist={deleteChecklist}
        onRenameChecklist={renameChecklist}
        onCreateChecklistItem={createChecklistItem}
        onDeleteChecklistItem={deleteChecklistItem}
        onToggleChecklistItemComplete={toggleChecklistItemComplete}
        onRenameChecklistItem={renameChecklistItem}
        onToggleLabel={toggleLabel}
        onCreateLabel={
          projectUUID
            ? async (name, labelColorId) => {
                await createLabel(projectUUID, name, labelColorId);
                await refetch();
              }
            : undefined
        }
        onUpdateLabel={async (labelId, name, labelColorId) => {
          await updateLabel(labelId, name, labelColorId);
          await refetch();
        }}
        onDeleteLabel={async (labelId) => {
          await deleteLabel(labelId);
          await refetch();
        }}
        onAssign={assign}
        onUnassign={unassign}
        onUpdateDueDate={updateDueDate}
        onCreateDueDateNotification={createDueDateNotification}
        onDeleteDueDateNotification={deleteDueDateNotification}
        isUpdating={isTaskUpdating}
      />

      <LabelManagerModal
        isOpen={showLabelsModal}
        onClose={() => setShowLabelsModal(false)}
        projectId={project?.id || ""}
        labels={labels}
        labelColors={labelColors}
        onLabelChanged={() => refetch()}
      />

      <MemberManagementModal
        isOpen={showMembersModal}
        onClose={() => setShowMembersModal(false)}
        members={members}
        invitedMembers={invitedMembers}
        users={users}
        currentUserId={currentUserId ?? undefined}
        onInvite={inviteProjectMembers}
        onRemove={removeProjectMember}
        onCancelInvite={cancelProjectInvite}
        onChangeRole={changeProjectMemberRole}
      />

      <ProjectSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        projectId={projectUUID || ""}
        projectName={project?.name || ""}
        publicOn={project?.publicOn}
        onSettingsChanged={() => refetch()}
      />
    </div>
  );
}
