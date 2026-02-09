import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Button, Input } from "@/components/common";
import {
  CREATE_TASK,
  CREATE_TASK_GROUP,
  GET_PROJECT_BOARD,
} from "@/features/projects/graphql/queries";
import { useProjectBoard } from "@/features/projects/hooks/useProjectBoard";
import dayjs from "dayjs";

// Additional mutations for full board functionality
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

const UPDATE_TASK_DUE_DATE = gql`
  mutation UpdateTaskDueDate(
    $taskID: UUID!
    $dueDate: Time
    $hasTime: Boolean!
    $createNotifications: [CreateTaskDueDateNotification!]!
    $updateNotifications: [UpdateTaskDueDateNotification!]!
    $deleteNotifications: [DeleteTaskDueDateNotification!]!
  ) {
    updateTaskDueDate(input: { taskID: $taskID, dueDate: $dueDate, hasTime: $hasTime }) {
      id
      dueDate {
        at
      }
      hasTime
    }
    createTaskDueDateNotifications(input: $createNotifications) {
      notifications {
        id
        period
        duration
      }
    }
    updateTaskDueDateNotifications(input: $updateNotifications) {
      notifications {
        id
        period
        duration
      }
    }
    deleteTaskDueDateNotifications(input: $deleteNotifications) {
      notifications
    }
  }
`;

const ASSIGN_TASK = gql`
  mutation AssignTask($taskID: UUID!, $userID: UUID!) {
    assignTask(input: { taskID: $taskID, userID: $userID }) {
      id
      assigned {
        id
        fullName
        profileIcon {
          initials
          bgColor
          url
        }
      }
    }
  }
`;

const UNASSIGN_TASK = gql`
  mutation UnassignTask($taskID: UUID!, $userID: UUID!) {
    unassignTask(input: { taskID: $taskID, userID: $userID }) {
      id
      assigned {
        id
        fullName
      }
    }
  }
`;

const TOGGLE_TASK_LABEL = gql`
  mutation ToggleTaskLabel($taskID: UUID!, $projectLabelID: UUID!) {
    toggleTaskLabel(input: { taskID: $taskID, projectLabelID: $projectLabelID }) {
      active
      task {
        id
        labels {
          id
          assignedDate
          projectLabel {
            id
            name
            labelColor {
              id
              colorHex
              name
            }
          }
        }
      }
    }
  }
`;

// Task detail query
const FIND_TASK = gql`
  query FindTask($taskID: String!) {
    findTask(input: { taskShortID: $taskID }) {
      id
      shortId
      name
      description
      dueDate {
        at
        notifications {
          id
          period
          duration
        }
      }
      hasTime
      complete
      watched
      completedAt
      position
      badges {
        checklist {
          complete
          total
        }
        comments {
          unread
          total
        }
      }
      taskGroup {
        id
        name
      }
      labels {
        id
        assignedDate
        projectLabel {
          id
          name
          createdDate
          labelColor {
            id
            colorHex
            position
            name
          }
        }
      }
      assigned {
        id
        fullName
        profileIcon {
          url
          initials
          bgColor
        }
      }
    }
  }
`;

/**
 * Project Board Page with "Soft Canvas — Evening" dark theme
 * Full v1 parity with task details, labels, members, due dates
 */
export function ProjectBoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, taskGroups, labelColors, users, loading, error, refetch } = useProjectBoard(projectId || "");
  
  // Task creation state
  const [newGroupName, setNewGroupName] = useState("");
  const [newTaskNames, setNewTaskNames] = useState<Record<string, string>>({});
  const [groupError, setGroupError] = useState<string | null>(null);
  const [taskError, setTaskError] = useState<Record<string, string>>({});
  
  // Editing state
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskName, setEditingTaskName] = useState("");
  
  // Selected task for details panel
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  // Filters and sorting
  const [filterText, setFilterText] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState<"position" | "dueDate" | "name">("position");

  // Dark palette
  const base = "#141211";
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

  // Mutations
  const [createTaskGroup, { loading: creatingGroup }] = useMutation(CREATE_TASK_GROUP, {
    refetchQueries: projectId ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }] : [],
  });
  
  const [createTask, { loading: creatingTask }] = useMutation(CREATE_TASK, {
    refetchQueries: projectId ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }] : [],
  });
  
  const [setTaskComplete] = useMutation(SET_TASK_COMPLETE, {
    refetchQueries: projectId ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }] : [],
  });
  
  const [updateTaskName] = useMutation(UPDATE_TASK_NAME, {
    refetchQueries: projectId ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }] : [],
  });
  
  const [updateTaskGroupName] = useMutation(UPDATE_TASK_GROUP_NAME, {
    refetchQueries: projectId ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }] : [],
  });
  
  const [deleteTaskGroup] = useMutation(DELETE_TASK_GROUP, {
    refetchQueries: projectId ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }] : [],
  });
  
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: projectId ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }] : [],
  });

  // Task detail query
  const { data: taskDetailData } = useQuery(FIND_TASK, {
    variables: { taskID: selectedTaskId },
    skip: !selectedTaskId,
  });
  const selectedTask = taskDetailData?.findTask;

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
        variables: { projectID: projectId, name: newGroupName.trim(), position: nextGroupPosition },
      });
      setNewGroupName("");
    } catch {
      setGroupError("Unable to create group. Please try again.");
    }
  };

  const handleCreateTask = async (groupId: string) => {
    const taskName = newTaskNames[groupId] || "";
    if (!projectId || !taskName.trim()) {
      setTaskError((prev) => ({ ...prev, [groupId]: "Task name is required." }));
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
      setTaskError((prev) => ({ ...prev, [groupId]: "Unable to create task. Please try again." }));
    }
  };

  const handleToggleComplete = async (taskId: string, complete: boolean) => {
    try {
      await setTaskComplete({ variables: { taskID: taskId, complete: !complete } });
    } catch (err) {
      console.error("Failed to toggle task completion", err);
    }
  };

  const handleUpdateTaskName = async (taskId: string) => {
    if (!editingTaskName.trim()) return;
    try {
      await updateTaskName({ variables: { taskID: taskId, name: editingTaskName.trim() } });
      setEditingTaskId(null);
      setEditingTaskName("");
    } catch (err) {
      console.error("Failed to update task name", err);
    }
  };

  const handleUpdateGroupName = async (groupId: string) => {
    if (!editingGroupName.trim()) return;
    try {
      await updateTaskGroupName({ variables: { taskGroupID: groupId, name: editingGroupName.trim() } });
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
      if (selectedTaskId === taskId) setSelectedTaskId(null);
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  // Filter and sort tasks
  const getFilteredAndSortedTasks = useCallback((tasks: typeof taskGroups[0]['tasks']) => {
    let filtered = tasks;
    
    // Filter by text
    if (filterText.trim()) {
      const search = filterText.toLowerCase();
      filtered = filtered.filter(t => t.name.toLowerCase().includes(search));
    }
    
    // Filter by completion
    if (!showCompleted) {
      filtered = filtered.filter(t => !t.complete);
    }
    
    // Sort
    const sorted = [...filtered];
    if (sortBy === "dueDate") {
      sorted.sort((a, b) => {
        if (!a.dueDate?.at) return 1;
        if (!b.dueDate?.at) return -1;
        return new Date(a.dueDate.at).getTime() - new Date(b.dueDate.at).getTime();
      });
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => a.position - b.position);
    }
    
    return sorted;
  }, [filterText, showCompleted, sortBy]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 rounded w-1/3" style={{ background: surface2 }}></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 rounded" style={{ background: surface1 }}></div>
            <div className="h-64 rounded" style={{ background: surface1 }}></div>
            <div className="h-64 rounded" style={{ background: surface1 }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div className="rounded-lg p-6" style={{ background: surface1, border: `1px solid ${border}` }}>
          <h2 className="font-semibold mb-2" style={{ color: terracotta, fontFamily: "'Libre Baskerville', serif" }}>
            Error loading project
          </h2>
          <p style={{ color: textSecondary, fontFamily: "'DM Sans', sans-serif" }}>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div className="p-6" style={{ background: surface1, border: `1px solid ${border}`, borderRadius: "20px" }}>
          <h2 className="mb-2" style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: "1.5rem", color: textPrimary }}>
            Project not found
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: textSecondary }}>
            We couldn't load this project. Check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 relative z-10">
      {/* Header */}
      <div className="mb-6" style={{ animation: "d2dFadeUp 0.7s ease-out both" }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: "2rem", fontWeight: 400, color: textPrimary }}>
              {project.name}
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: textSecondary, marginTop: "0.25rem" }}>
              {taskGroups.reduce((acc, g) => acc + g.tasks.length, 0)} tasks · {taskGroups.length} groups
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Filter tasks..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-sm"
              style={{ background: surface2, border: `1px solid ${border}`, color: textPrimary, fontFamily: "'DM Sans', sans-serif" }}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg text-sm"
              style={{ background: surface2, border: `1px solid ${border}`, color: textPrimary, fontFamily: "'DM Sans', sans-serif" }}
            >
              <option value="position">Sort by Position</option>
              <option value="dueDate">Sort by Due Date</option>
              <option value="name">Sort by Name</option>
            </select>
            <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: textSecondary }}>
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

      <div className="flex gap-6">
        {/* Task Groups */}
        <div className="flex-1">
          {taskGroups.length === 0 ? (
            <div className="p-6" style={{ background: surface1, border: `1px solid ${border}`, borderRadius: "20px", animation: "d2dFadeUp 0.7s ease-out 0.2s both" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: textSecondary }}>No task groups yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {taskGroups.map((group, groupIndex) => {
                const displayTasks = getFilteredAndSortedTasks(group.tasks);
                return (
                  <div
                    key={group.id}
                    className="p-4 flex flex-col"
                    style={{ background: surface1, border: `1px solid ${border}`, borderRadius: "20px", animation: `d2dFadeUp 0.7s ease-out ${0.2 + groupIndex * 0.1}s both` }}
                  >
                    {/* Group Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: groupColors[groupIndex % groupColors.length], boxShadow: `0 0 8px ${groupColors[groupIndex % groupColors.length]}40` }} />
                        {editingGroupId === group.id ? (
                          <input
                            type="text"
                            value={editingGroupName}
                            onChange={(e) => setEditingGroupName(e.target.value)}
                            onBlur={() => handleUpdateGroupName(group.id)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleUpdateGroupName(group.id); if (e.key === 'Escape') { setEditingGroupId(null); setEditingGroupName(""); }}}
                            autoFocus
                            className="flex-1 px-2 py-1 rounded text-sm"
                            style={{ background: surface3, border: `1px solid ${border}`, color: textPrimary, fontFamily: "'DM Sans', sans-serif" }}
                          />
                        ) : (
                          <h2
                            onClick={() => { setEditingGroupId(group.id); setEditingGroupName(group.name); }}
                            className="cursor-pointer hover:opacity-80"
                            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: textSecondary }}
                          >
                            {group.name}
                          </h2>
                        )}
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: textTertiary }}>({displayTasks.length})</span>
                      </div>
                      <button
                        onClick={() => handleDeleteGroup(group.id)}
                        className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                        style={{ color: terracotta }}
                        title="Delete group"
                      >
                        ×
                      </button>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-2 flex-1 min-h-[100px]">
                      {displayTasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-3 cursor-pointer transition-all duration-200"
                          style={{ background: surface2, border: `1px solid ${border}`, borderRadius: "12px", opacity: task.complete ? 0.7 : 1 }}
                          onClick={() => setSelectedTaskId(task.shortId || task.id)}
                          onMouseEnter={(e) => { e.currentTarget.style.background = surface3; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = surface2; }}
                        >
                          <div className="flex items-start gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleToggleComplete(task.id, task.complete); }}
                              className="mt-0.5 flex-shrink-0"
                              style={{ width: "16px", height: "16px", borderRadius: "50%", border: `2px solid ${task.complete ? sage : terracotta}`, background: task.complete ? sage : "transparent" }}
                            >
                              {task.complete && <span style={{ color: surface0, fontSize: "10px" }}>✓</span>}
                            </button>
                            <div className="flex-1 min-w-0">
                              {editingTaskId === task.id ? (
                                <input
                                  type="text"
                                  value={editingTaskName}
                                  onChange={(e) => setEditingTaskName(e.target.value)}
                                  onBlur={() => handleUpdateTaskName(task.id)}
                                  onKeyDown={(e) => { if (e.key === 'Enter') handleUpdateTaskName(task.id); if (e.key === 'Escape') { setEditingTaskId(null); setEditingTaskName(""); }}}
                                  autoFocus
                                  className="w-full px-2 py-1 rounded text-sm"
                                  style={{ background: surface3, border: `1px solid ${border}`, color: textPrimary, fontFamily: "'DM Sans', sans-serif" }}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              ) : (
                                <p
                                  onDoubleClick={(e) => { e.stopPropagation(); setEditingTaskId(task.id); setEditingTaskName(task.name); }}
                                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: textPrimary, textDecoration: task.complete ? "line-through" : "none" }}
                                >
                                  {task.name}
                                </p>
                              )}
                              
                              {/* Task meta */}
                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                {task.dueDate?.at && (
                                  <span style={{ fontSize: "0.7rem", color: new Date(task.dueDate.at) < new Date() && !task.complete ? terracotta : textTertiary }}>
                                    {dayjs(task.dueDate.at).format(task.hasTime ? "MMM D h:mm A" : "MMM D")}
                                  </span>
                                )}
                                {task.labels && task.labels.length > 0 && (
                                  <div className="flex gap-1">
                                    {task.labels.slice(0, 3).map((label) => (
                                      <span
                                        key={label.id}
                                        style={{ width: "8px", height: "8px", borderRadius: "50%", background: label.projectLabel?.labelColor?.colorHex || terracotta }}
                                      />
                                    ))}
                                  </div>
                                )}
                                {task.assigned && task.assigned.length > 0 && (
                                  <div className="flex -space-x-1">
                                    {task.assigned.slice(0, 3).map((user) => (
                                      <div
                                        key={user.id}
                                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                                        style={{ background: user.profileIcon?.bgColor || slate, color: "#fff", border: `1px solid ${surface2}` }}
                                        title={user.fullName}
                                      >
                                        {user.profileIcon?.initials || user.fullName?.charAt(0) || "?"}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {task.badges?.checklist && task.badges.checklist.total > 0 && (
                                  <span style={{ fontSize: "0.7rem", color: textTertiary }}>
                                    {task.badges.checklist.complete}/{task.badges.checklist.total}
                                  </span>
                                )}
                                {task.badges?.comments && task.badges.comments.total > 0 && (
                                  <span style={{ fontSize: "0.7rem", color: textTertiary }}>
                                    {task.badges.comments.total} 💬
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
                              className="opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity text-xs"
                              style={{ color: textTertiary }}
                              title="Delete task"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                      {displayTasks.length === 0 && (
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: textTertiary, fontStyle: "italic", padding: "1rem 0" }}>
                          No tasks match filters.
                        </p>
                      )}
                    </div>

                    {/* Add Task */}
                    <div className="mt-3 pt-3 space-y-2" style={{ borderTop: `1px solid ${border}` }}>
                      <input
                        type="text"
                        placeholder="Add a task..."
                        value={newTaskNames[group.id] || ""}
                        onChange={(e) => setNewTaskNames((prev) => ({ ...prev, [group.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleCreateTask(group.id); }}
                        className="w-full px-3 py-2 rounded-lg text-sm"
                        style={{ background: surface3, border: `1px solid ${border}`, color: textPrimary, fontFamily: "'DM Sans', sans-serif" }}
                      />
                      {taskError[group.id] && (
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: terracotta }}>{taskError[group.id]}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add Group */}
          <div className="mt-6 p-4" style={{ background: surface1, border: `1px solid ${border}`, borderRadius: "20px" }}>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="New group name..."
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCreateGroup(); }}
                className="flex-1 px-4 py-2 rounded-lg"
                style={{ background: surface3, border: `1px solid ${border}`, color: textPrimary, fontFamily: "'DM Sans', sans-serif" }}
              />
              <Button onClick={handleCreateGroup} disabled={creatingGroup} style={{ background: terracotta, color: surface0, borderRadius: "8px" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{creatingGroup ? "Adding..." : "Add Group"}</span>
              </Button>
            </div>
            {groupError && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: terracotta, marginTop: "0.5rem", display: "block" }}>{groupError}</span>}
          </div>
        </div>

        {/* Task Details Panel */}
        {selectedTaskId && selectedTask && (
          <div className="w-80 flex-shrink-0" style={{ animation: "d2dFadeUp 0.3s ease-out" }}>
            <div className="sticky top-6 p-5" style={{ background: surface1, border: `1px solid ${border}`, borderRadius: "20px" }}>
              <div className="flex items-start justify-between mb-4">
                <h3 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: "1.1rem", color: textPrimary }}>Task Details</h3>
                <button onClick={() => setSelectedTaskId(null)} style={{ color: textTertiary, fontSize: "1.2rem" }}>×</button>
              </div>
              
              <div className="space-y-4">
                {/* Task Name */}
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: textTertiary, textTransform: "uppercase", letterSpacing: "0.1em" }}>Name</label>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: textPrimary, marginTop: "0.25rem" }}>{selectedTask.name}</p>
                </div>
                
                {/* Description */}
                {selectedTask.description && (
                  <div>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: textTertiary, textTransform: "uppercase", letterSpacing: "0.1em" }}>Description</label>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: textSecondary, marginTop: "0.25rem", whiteSpace: "pre-wrap" }}>{selectedTask.description}</p>
                  </div>
                )}
                
                {/* Due Date */}
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: textTertiary, textTransform: "uppercase", letterSpacing: "0.1em" }}>Due Date</label>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: selectedTask.dueDate?.at ? textPrimary : textTertiary, marginTop: "0.25rem" }}>
                    {selectedTask.dueDate?.at
                      ? dayjs(selectedTask.dueDate.at).format(selectedTask.hasTime ? "MMM D, YYYY h:mm A" : "MMM D, YYYY")
                      : "No due date"}
                  </p>
                </div>
                
                {/* Status */}
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: textTertiary, textTransform: "uppercase", letterSpacing: "0.1em" }}>Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: selectedTask.complete ? sage : terracotta,
                      }}
                    />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: textSecondary }}>
                      {selectedTask.complete ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </div>
                
                {/* Labels */}
                {selectedTask.labels && selectedTask.labels.length > 0 && (
                  <div>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: textTertiary, textTransform: "uppercase", letterSpacing: "0.1em" }}>Labels</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTask.labels.map((label) => (
                        <span
                          key={label.id}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            background: label.projectLabel?.labelColor?.colorHex || terracotta,
                            color: "#fff",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {label.projectLabel?.name || "Label"}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Assigned */}
                {selectedTask.assigned && selectedTask.assigned.length > 0 && (
                  <div>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: textTertiary, textTransform: "uppercase", letterSpacing: "0.1em" }}>Assigned</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedTask.assigned.map((user) => (
                        <div key={user.id} className="flex items-center gap-1">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                            style={{ background: user.profileIcon?.bgColor || slate, color: "#fff" }}
                          >
                            {user.profileIcon?.initials || user.fullName?.charAt(0) || "?"}
                          </div>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: textSecondary }}>{user.fullName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Badges */}
                {(selectedTask.badges?.checklist?.total || 0) > 0 || (selectedTask.badges?.comments?.total || 0) > 0 ? (
                  <div>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: textTertiary, textTransform: "uppercase", letterSpacing: "0.1em" }}>Activity</label>
                    <div className="flex gap-3 mt-1">
                      {(selectedTask.badges?.checklist?.total || 0) > 0 && (
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: textSecondary }}>
                          Checklist: {selectedTask.badges?.checklist?.complete}/{selectedTask.badges?.checklist?.total}
                        </span>
                      )}
                      {(selectedTask.badges?.comments?.total || 0) > 0 && (
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: textSecondary }}>
                          Comments: {selectedTask.badges?.comments?.total}
                        </span>
                      )}
                    </div>
                  </div>
                ) : null}
                
                {/* Actions */}
                <div className="pt-3" style={{ borderTop: `1px solid ${border}` }}>
                  <button
                    onClick={() => handleToggleComplete(selectedTask.id, selectedTask.complete)}
                    className="w-full py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
                    style={{
                      background: selectedTask.complete ? surface2 : sage,
                      color: selectedTask.complete ? textSecondary : "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {selectedTask.complete ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
