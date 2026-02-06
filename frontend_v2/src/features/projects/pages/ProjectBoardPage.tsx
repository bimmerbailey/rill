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

export function ProjectBoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, taskGroups, loading, error } = useProjectBoard(
    projectId || "",
  );
  const [newGroupName, setNewGroupName] = useState("");
  const [newTaskNames, setNewTaskNames] = useState<Record<string, string>>({});
  const [groupError, setGroupError] = useState<string | null>(null);
  const [taskError, setTaskError] = useState<Record<string, string>>({});

  const [createTaskGroup, { loading: creatingGroup }] = useMutation(
    CREATE_TASK_GROUP,
    {
      refetchQueries: projectId
        ? [{ query: GET_PROJECT_BOARD, variables: { projectID: projectId } }]
        : [],
    },
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
      <div className="max-w-6xl mx-auto p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 font-semibold mb-2">
            Error loading project
          </h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] p-6">
          <h2 className="font-display text-xl text-[#1a1a1a] mb-2">
            Project not found
          </h2>
          <p className="font-mono text-sm text-[#1a1a1a]/60">
            We couldn’t load this project. Check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display text-[#1a1a1a]">{project.name}</h1>
        <p className="font-mono text-sm text-[#1a1a1a]/60 mt-2">
          Project board
        </p>
      </div>

      <div className="bg-white border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <Input
              label="New task group"
              value={newGroupName}
              onChange={(event) => setNewGroupName(event.target.value)}
              error={groupError || undefined}
              placeholder="Backlog"
            />
          </div>
          <Button
            onClick={handleCreateGroup}
            disabled={creatingGroup}
            className="md:self-end"
          >
            {creatingGroup ? "Creating..." : "Add Group"}
          </Button>
        </div>
      </div>

      {taskGroups.length === 0 ? (
        <div className="bg-white border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] p-6">
          <p className="font-mono text-sm text-[#1a1a1a]/60">
            No task groups yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {taskGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] p-4 flex flex-col"
            >
              <h2 className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60 mb-4">
                {group.name}
              </h2>
              <div className="space-y-3">
                {group.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="border-2 border-[#1a1a1a] bg-[#f7f3ef] p-3 shadow-[2px_2px_0_0_#1a1a1a]"
                  >
                    <p className="font-medium text-sm text-[#1a1a1a]">
                      {task.name}
                    </p>
                  </div>
                ))}
                {group.tasks.length === 0 && (
                  <p className="font-mono text-xs text-[#1a1a1a]/50">
                    No tasks yet.
                  </p>
                )}
              </div>
              <div className="mt-4 border-t-2 border-[#1a1a1a] pt-4 space-y-3">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/70">
                    New task
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] font-mono text-sm"
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
                    <span className="font-mono text-xs text-red-600">
                      {taskError[group.id]}
                    </span>
                  )}
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleCreateTask(group.id)}
                  disabled={creatingTask}
                  className="w-full"
                >
                  {creatingTask ? "Adding..." : "Add Task"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
