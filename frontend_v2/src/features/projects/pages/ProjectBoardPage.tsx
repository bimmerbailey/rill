import { useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
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
  useUpdateTaskLocationMutation,
  useUpdateTaskGroupLocationMutation,
  type FindProjectQuery,
} from "@/graphql/generated/graphql";
import { DraggableTask } from "@/features/projects/components/DraggableTask";
import { DraggableColumn } from "@/features/projects/components/DraggableColumn";
import { useBoardDropHandler } from "@/features/projects/hooks/useBoardDropHandler";
import { ProjectSettingsMenu } from "@/features/projects/components/ProjectSettingsMenu";
import { LabelManagerModal } from "@/features/projects/components/labels";
import { MemberManagementModal } from "@/features/projects/components/members";
import { ProjectSettingsModal } from "@/features/projects/components/settings";

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

  const {
    inviteProjectMembers,
    removeProjectMember,
    cancelProjectInvite,
    changeProjectMemberRole,
  } = useProjectMembers({
    projectId: projectId || "",
    onMembersChanged: () => refetch(),
  });

  const [showLabelsModal, setShowLabelsModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [newGroupName, setNewGroupName] = useState("");
  const [newTaskNames, setNewTaskNames] = useState<Record<string, string>>({});
  const [groupError, setGroupError] = useState<string | null>(null);
  const [taskError, setTaskError] = useState<Record<string, string>>({});

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
    assign,
    unassign,
    updateDueDate,
    createDueDateNotification,
    deleteDueDateNotification,
    isUpdating: isTaskUpdating,
  } = useTaskModal();

  const currentUserId = useAuthStore((state) => state.userId);

  const [filterText, setFilterText] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState<"position" | "dueDate" | "name">(
    "position",
  );

  const surface0 = "#1c1917";
  const surface1 = "#231f1c";
  const surface2 = "#2c2724";
  const surface3 = "#36302c";
  const border = "rgba(255,235,210,0.06)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const textTertiary = "rgba(245,238,230,0.32)";
  const terracotta = "#c9805e";
  const sage = "#7fa67f";
  const slate = "#7992b0";
  const ochre = "#bfa26e";

  const groupColors = [terracotta, sage, slate, ochre];

  const [createTaskGroup, { loading: creatingGroup }] = useMutation(
    CREATE_TASK_GROUP,
    {
      refetchQueries: projectId
        ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }]
        : [],
    },
  );

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: projectId
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }]
      : [],
  });

  const [setTaskComplete] = useMutation(SET_TASK_COMPLETE, {
    refetchQueries: projectId
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }]
      : [],
  });

  const [updateTaskNameMutation] = useMutation(UPDATE_TASK_NAME, {
    refetchQueries: projectId
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }]
      : [],
  });

  const [updateTaskGroupName] = useMutation(UPDATE_TASK_GROUP_NAME, {
    refetchQueries: projectId
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }]
      : [],
  });

  const [deleteTaskGroup] = useMutation(DELETE_TASK_GROUP, {
    refetchQueries: projectId
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }]
      : [],
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: projectId
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }]
      : [],
  });

  const [updateTaskLocation] = useUpdateTaskLocationMutation({
    update: (client, result) => {
      if (!result.data) return;
      const { previousTaskGroupID, task } = result.data.updateTaskLocation;
      if (previousTaskGroupID !== task.taskGroup.id) {
        const cacheData = client.readQuery<FindProjectQuery>({
          query: GET_PROJECT_BOARD,
          variables: { projectID: projectId },
        });
        if (cacheData?.findProject) {
          const groups = cacheData.findProject.taskGroups;
          const oldGroupIdx = groups.findIndex(
            (g) => g.id === previousTaskGroupID,
          );
          const newGroupIdx = groups.findIndex(
            (g) => g.id === task.taskGroup.id,
          );
          if (oldGroupIdx !== -1 && newGroupIdx !== -1) {
            const oldTask = groups[oldGroupIdx].tasks.find(
              (t) => t.id === task.id,
            );
            const newGroups = [...groups];
            newGroups[oldGroupIdx] = {
              ...groups[oldGroupIdx],
              tasks: groups[oldGroupIdx].tasks.filter((t) => t.id !== task.id),
            };
            if (oldTask) {
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
            }
            client.writeQuery<FindProjectQuery>({
              query: GET_PROJECT_BOARD,
              variables: { projectID: projectId },
              data: {
                ...cacheData,
                findProject: {
                  ...cacheData.findProject,
                  taskGroups: newGroups,
                },
              },
            });
          }
        }
      }
    },
  });

  const [updateTaskGroupLocation] = useUpdateTaskGroupLocationMutation({});

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
    [taskGroups, updateTaskLocation],
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
    if (!projectId) return;
    if (!newGroupName.trim()) {
      setGroupError("Group name is required.");
      return;
    }
    setGroupError(null);
    try {
      await createTaskGroup({
        variables: {
          projectID: projectId,
          name: newGroupName.trim(),
          position: nextGroupPosition,
        },
      });
      setNewGroupName("");
    } catch {
      setGroupError("Unable to create group. Please try again.");
    }
  };

  const handleCreateTask = async (groupId: string) => {
    const taskName = newTaskNames[groupId] || "";
    if (!projectId || !taskName.trim()) {
      setTaskError((prev) => ({
        ...prev,
        [groupId]: "Task name is required.",
      }));
      return;
    }
    const group = taskGroups.find((item) => item.id === groupId);
    const nextTaskPosition = group?.tasks.length
      ? Math.max(...group.tasks.map((task) => task.position)) + 1
      : 1;
    setTaskError((prev) => ({ ...prev, [groupId]: "" }));
    try {
      await createTask({
        variables: {
          taskGroupID: groupId,
          name: taskName.trim(),
          position: nextTaskPosition,
          assigned: [],
        },
      });
      setNewTaskNames((prev) => ({ ...prev, [groupId]: "" }));
    } catch {
      setTaskError((prev) => ({
        ...prev,
        [groupId]: "Unable to create task. Please try again.",
      }));
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
      let filtered = tasks;

      if (filterText.trim()) {
        const search = filterText.toLowerCase();
        filtered = filtered.filter((t) =>
          t.name.toLowerCase().includes(search),
        );
      }

      if (!showCompleted) {
        filtered = filtered.filter((t) => !t.complete);
      }

      const sorted = [...filtered];
      if (sortBy === "dueDate") {
        sorted.sort((a, b) => {
          if (!a.dueDate?.at) return 1;
          if (!b.dueDate?.at) return -1;
          return (
            new Date(a.dueDate.at).getTime() - new Date(b.dueDate.at).getTime()
          );
        });
      } else if (sortBy === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        sorted.sort((a, b) => a.position - b.position);
      }

      return sorted;
    },
    [filterText, showCompleted, sortBy],
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
              fontFamily: "'Libre Baskerville', serif",
            }}
          >
            Error loading project
          </h2>
          <p
            style={{
              color: textSecondary,
              fontFamily: "'DM Sans', sans-serif",
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
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: "1.5rem",
              color: textPrimary,
            }}
          >
            Project not found
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
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
        className="mb-6"
        style={{ animation: "d2dFadeUp 0.7s ease-out both" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: "2rem",
                fontWeight: 400,
                color: textPrimary,
              }}
            >
              {project.name}
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
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
            <input
              type="text"
              placeholder="Filter tasks..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-sm"
              style={{
                background: surface2,
                border: `1px solid ${border}`,
                color: textPrimary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "position" | "dueDate" | "name")
              }
              className="px-3 py-1.5 rounded-lg text-sm"
              style={{
                background: surface2,
                border: `1px solid ${border}`,
                color: textPrimary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <option value="position">Sort by Position</option>
              <option value="dueDate">Sort by Due Date</option>
              <option value="name">Sort by Name</option>
            </select>
            <label
              className="flex items-center gap-2 cursor-pointer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: textSecondary,
              }}
            >
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                style={{ accentColor: terracotta }}
              />
              Show completed
            </label>
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
                  fontFamily: "'DM Sans', sans-serif",
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
                const isTaskDragDisabled = sortBy !== "position";
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
                                fontFamily: "'DM Sans', sans-serif",
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
                                fontFamily: "'DM Sans', sans-serif",
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
                              fontFamily: "'DM Sans', sans-serif",
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
                            fontFamily: "'DM Sans', sans-serif",
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
                      <input
                        type="text"
                        placeholder="Add a task..."
                        value={newTaskNames[group.id] || ""}
                        onChange={(e) =>
                          setNewTaskNames((prev) => ({
                            ...prev,
                            [group.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleCreateTask(group.id);
                        }}
                        className="w-full px-3 py-2 rounded-lg text-sm"
                        style={{
                          background: surface3,
                          border: `1px solid ${border}`,
                          color: textPrimary,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      />
                      {taskError[group.id] && (
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.75rem",
                            color: terracotta,
                          }}
                        >
                          {taskError[group.id]}
                        </span>
                      )}
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
                fontFamily: "'DM Sans', sans-serif",
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
                  fontFamily: "'DM Sans', sans-serif",
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
                fontFamily: "'DM Sans', sans-serif",
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
        projectId={projectId || ""}
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
        projectId={projectId || ""}
        projectName={project?.name || ""}
        publicOn={project?.publicOn}
        onSettingsChanged={() => refetch()}
      />
    </div>
  );
}
