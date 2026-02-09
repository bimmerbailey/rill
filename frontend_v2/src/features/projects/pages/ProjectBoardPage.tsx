import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Input } from "@/components/common";
import {
  CREATE_TASK,
  CREATE_TASK_GROUP,
  GET_PROJECT_BOARD,
} from "@/features/projects/graphql/queries";
import { useProjectBoard } from "@/features/projects/hooks/useProjectBoard";

/**
 * Project Board Page with "Soft Canvas — Evening" dark theme
 */
export function ProjectBoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, taskGroups, loading, error } = useProjectBoard(
    projectId || ""
  );
  const [newGroupName, setNewGroupName] = useState("");
  const [newTaskNames, setNewTaskNames] = useState<Record<string, string>>({});
  const [groupError, setGroupError] = useState<string | null>(null);
  const [taskError, setTaskError] = useState<Record<string, string>>({});

  // Dark palette
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
    }
  );
  const [createTask, { loading: creatingTask }] = useMutation(CREATE_TASK, {
    refetchQueries: projectId
      ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }]
      : [],
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
        <div
          className="rounded-lg p-6"
          style={{
            background: surface1,
            border: `1px solid ${border}`,
          }}
        >
          <h2
            className="font-semibold mb-2"
            style={{ color: terracotta, fontFamily: "'Libre Baskerville', serif" }}
          >
            Error loading project
          </h2>
          <p style={{ color: textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
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
    <div className="max-w-6xl mx-auto p-8 relative z-10">
      {/* Header */}
      <div
        className="mb-8"
        style={{ animation: "d2dFadeUp 0.7s ease-out both" }}
      >
        <h1
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontSize: "2.5rem",
            fontWeight: 400,
            color: textPrimary,
          }}
        >
          {project.name}
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            color: textSecondary,
            marginTop: "0.5rem",
          }}
        >
          Project board
        </p>
      </div>

      {/* Add Group Section */}
      <div
        className="p-6 mb-8"
        style={{
          background: surface1,
          border: `1px solid ${border}`,
          borderRadius: "20px",
          animation: "d2dFadeUp 0.7s ease-out 0.1s both",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <Input
              label="New task group"
              value={newGroupName}
              onChange={(event) => setNewGroupName(event.target.value)}
              error={groupError || undefined}
              placeholder="Backlog"
              style={{
                background: surface3,
                borderColor: border,
                color: textPrimary,
              }}
            />
          </div>
          <Button
            onClick={handleCreateGroup}
            disabled={creatingGroup}
            className="md:self-end"
            style={{
              background: terracotta,
              color: surface0,
              borderRadius: "8px",
            }}
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              {creatingGroup ? "Creating..." : "Add Group"}
            </span>
          </Button>
        </div>
      </div>

      {/* Task Groups */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {taskGroups.map((group, groupIndex) => (
            <div
              key={group.id}
              className="p-4 flex flex-col"
              style={{
                background: surface1,
                border: `1px solid ${border}`,
                borderRadius: "20px",
                animation: `d2dFadeUp 0.7s ease-out ${0.2 + groupIndex * 0.1}s both`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: groupColors[groupIndex % groupColors.length],
                    boxShadow: `0 0 8px ${groupColors[groupIndex % groupColors.length]}40`,
                  }}
                />
                <h2
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: textSecondary,
                  }}
                >
                  {group.name}
                </h2>
              </div>

              <div className="space-y-3 flex-1">
                {group.tasks.map((task, taskIndex) => (
                  <div
                    key={task.id}
                    className="p-3 transition-all duration-200"
                    style={{
                      background: surface2,
                      border: `1px solid ${border}`,
                      borderRadius: "12px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = surface3;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = surface2;
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: textPrimary,
                      }}
                    >
                      {task.name}
                    </p>
                  </div>
                ))}
                {group.tasks.length === 0 && (
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: textTertiary,
                      fontStyle: "italic",
                    }}
                  >
                    No tasks yet.
                  </p>
                )}
              </div>

              {/* Add Task Section */}
              <div
                className="mt-4 pt-4 space-y-3"
                style={{ borderTop: `1px solid ${border}` }}
              >
                <div className="flex flex-col gap-2">
                  <label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: textTertiary,
                    }}
                  >
                    New task
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-lg"
                    style={{
                      background: surface3,
                      border: `1px solid ${border}`,
                      color: textPrimary,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                    }}
                    value={newTaskNames[group.id] || ""}
                    onChange={(event) =>
                      setNewTaskNames((prev) => ({
                        ...prev,
                        [group.id]: event.target.value,
                      }))
                    }
                    placeholder="Task name"
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
                <Button
                  variant="secondary"
                  onClick={() => handleCreateTask(group.id)}
                  disabled={creatingTask}
                  className="w-full"
                  style={{
                    background: surface2,
                    border: `1px solid ${border}`,
                    color: textPrimary,
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                    {creatingTask ? "Adding..." : "Add Task"}
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
