import { useState, useEffect, useCallback, useRef } from "react";
import { X, Check, AlignLeft, Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils";
import type {
  FindTaskQuery,
  FindProjectQuery,
  DueDateNotificationDuration,
} from "@/graphql/generated/graphql";
import { Button } from "@/components/common/Button";
import {
  TaskComments,
  TaskActivityFeed,
  TaskChecklists,
  TaskLabels,
  TaskAssignees,
  TaskDueDate,
} from "@/features/tasks";

const theme = {
  surface1: "#231f1c",
  surface2: "#2c2724",
  surface3: "#3a3430",
  border: "rgba(255,235,210,0.06)",
  textPrimary: "rgba(245,238,230,0.87)",
  textSecondary: "rgba(245,238,230,0.5)",
  terracotta: "#c9805e",
  success: "#7fb069",
};

type TabType = "details" | "comments" | "activity";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: FindTaskQuery["findTask"] | null;
  project?: FindProjectQuery["findProject"] | null;
  currentUserId?: string;
  loading?: boolean;
  onUpdateName: (name: string) => Promise<void>;
  onUpdateDescription: (description: string) => Promise<void>;
  onToggleComplete: (complete: boolean) => Promise<void>;
  onToggleWatch?: () => Promise<void>;
  onCreateComment?: (message: string) => Promise<void>;
  onUpdateComment?: (commentID: string, message: string) => Promise<void>;
  onDeleteComment?: (commentID: string) => Promise<void>;
  onCreateChecklist?: (name: string, position: number) => Promise<void>;
  onDeleteChecklist?: (checklistID: string) => Promise<void>;
  onRenameChecklist?: (checklistID: string, name: string) => Promise<void>;
  onCreateChecklistItem?: (
    checklistID: string,
    name: string,
    position: number,
  ) => Promise<void>;
  onDeleteChecklistItem?: (itemID: string) => Promise<void>;
  onToggleChecklistItemComplete?: (
    itemID: string,
    complete: boolean,
  ) => Promise<void>;
  onRenameChecklistItem?: (itemID: string, name: string) => Promise<void>;
  onToggleLabel?: (projectLabelID: string) => Promise<void>;
  onAssign?: (userID: string) => Promise<void>;
  onUnassign?: (userID: string) => Promise<void>;
  onUpdateDueDate?: (dueDate: string | null, hasTime: boolean) => Promise<void>;
  onCreateDueDateNotification?: (
    period: number,
    duration: DueDateNotificationDuration,
  ) => Promise<void>;
  onDeleteDueDateNotification?: (notificationId: string) => Promise<void>;
  isUpdating?: boolean;
}

export function TaskDetailModal({
  isOpen,
  onClose,
  task,
  project,
  currentUserId,
  loading = false,
  onUpdateName,
  onUpdateDescription,
  onToggleComplete,
  onToggleWatch,
  onCreateComment,
  onUpdateComment,
  onDeleteComment,
  onCreateChecklist,
  onDeleteChecklist,
  onRenameChecklist,
  onCreateChecklistItem,
  onDeleteChecklistItem,
  onToggleChecklistItemComplete,
  onRenameChecklistItem,
  onToggleLabel,
  onAssign,
  onUnassign,
  onUpdateDueDate,
  onCreateDueDateNotification,
  onDeleteDueDateNotification,
  isUpdating = false,
}: TaskDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("details");
  const [editState, setEditState] = useState({
    isEditingName: false,
    isEditingDescription: false,
    editedName: "",
    editedDescription: "",
  });
  const hasInitializedRef = useRef(false);

  const startEditingName = useCallback(() => {
    if (task) {
      setEditState((prev) => ({
        ...prev,
        isEditingName: true,
        editedName: task.name,
      }));
    } else {
      setEditState((prev) => ({ ...prev, isEditingName: true }));
    }
  }, [task]);

  const startEditingDescription = useCallback(() => {
    if (task) {
      setEditState((prev) => ({
        ...prev,
        isEditingDescription: true,
        editedDescription: task.description || "",
      }));
    } else {
      setEditState((prev) => ({ ...prev, isEditingDescription: true }));
    }
  }, [task]);

  const cancelEditingName = useCallback(() => {
    setEditState((prev) => ({ ...prev, isEditingName: false, editedName: "" }));
  }, []);

  const cancelEditingDescription = useCallback(() => {
    setEditState((prev) => ({
      ...prev,
      isEditingDescription: false,
      editedDescription: "",
    }));
  }, []);

  // Reset editing state when modal closes
  useEffect(() => {
    if (!isOpen) {
      hasInitializedRef.current = false;
      // Use queueMicrotask to avoid synchronous setState during render
      queueMicrotask(() => {
        setEditState({
          isEditingName: false,
          isEditingDescription: false,
          editedName: "",
          editedDescription: "",
        });
        setActiveTab("details");
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleNameSubmit = useCallback(async () => {
    if (editState.editedName.trim() && editState.editedName !== task?.name) {
      await onUpdateName(editState.editedName.trim());
    }
    setEditState((prev) => ({ ...prev, isEditingName: false, editedName: "" }));
  }, [editState.editedName, task?.name, onUpdateName]);

  const handleDescriptionSubmit = useCallback(async () => {
    if (editState.editedDescription !== task?.description) {
      await onUpdateDescription(editState.editedDescription);
    }
    setEditState((prev) => ({
      ...prev,
      isEditingDescription: false,
      editedDescription: "",
    }));
  }, [editState.editedDescription, task?.description, onUpdateDescription]);

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: "details", label: "Details" },
    { id: "comments", label: "Comments", count: task?.comments?.length },
    { id: "activity", label: "Activity" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl flex flex-col"
        style={{
          backgroundColor: theme.surface1,
          border: `1px solid ${theme.border}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleComplete(!task?.complete)}
              disabled={isUpdating || loading}
              className={cn(
                "w-6 h-6 rounded border-2 flex items-center justify-center transition-all",
                task?.complete
                  ? "bg-[#7fb069] border-[#7fb069]"
                  : "border-[rgba(245,238,230,0.3)] hover:border-[#c9805e]",
              )}
            >
              {task?.complete && <Check size={14} className="text-white" />}
            </button>
            <span
              className="text-sm font-mono"
              style={{ color: theme.textSecondary }}
            >
              {task?.shortId}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-[rgba(255,235,210,0.1)]"
            style={{ color: theme.textSecondary }}
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="flex gap-1 px-6 pt-4 border-b"
          style={{ borderColor: theme.border }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-[#c9805e]"
                  : "text-[rgba(245,238,230,0.5)] hover:text-[rgba(245,238,230,0.87)]",
              )}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className="ml-1 px-1.5 py-0.5 text-xs rounded"
                  style={{
                    backgroundColor:
                      activeTab === tab.id
                        ? "rgba(201,128,94,0.2)"
                        : theme.surface3,
                  }}
                >
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: theme.terracotta }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 flex items-center justify-center">
              <div
                className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: `${theme.terracotta} transparent transparent transparent`,
                }}
              />
            </div>
          ) : task ? (
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-6">
                {activeTab === "details" && (
                  <>
                    <div className="mb-6">
                      {editState.isEditingName ? (
                        <input
                          type="text"
                          value={editState.editedName}
                          onChange={(e) =>
                            setEditState((prev) => ({
                              ...prev,
                              editedName: e.target.value,
                            }))
                          }
                          onBlur={handleNameSubmit}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleNameSubmit();
                            if (e.key === "Escape") cancelEditingName();
                          }}
                          autoFocus
                          className="w-full text-2xl font-bold bg-transparent border-b-2 outline-none px-0 py-1"
                          style={{
                            color: theme.textPrimary,
                            borderColor: theme.terracotta,
                            fontFamily: "'Libre Baskerville', Georgia, serif",
                          }}
                        />
                      ) : (
                        <h1
                          onClick={startEditingName}
                          className={cn(
                            "text-2xl font-bold cursor-pointer transition-colors",
                            task.complete && "line-through",
                          )}
                          style={{
                            color: task.complete
                              ? theme.textSecondary
                              : theme.textPrimary,
                            fontFamily: "'Libre Baskerville', Georgia, serif",
                          }}
                        >
                          {task.name}
                        </h1>
                      )}
                    </div>

                    <div
                      className="mb-6 text-sm"
                      style={{ color: theme.textSecondary }}
                    >
                      in list{" "}
                      <span
                        className="font-medium"
                        style={{ color: theme.terracotta }}
                      >
                        {task.taskGroup.name}
                      </span>
                    </div>

                    <div className="mb-8">
                      <div
                        className="flex items-center gap-2 mb-3"
                        style={{ color: theme.textSecondary }}
                      >
                        <AlignLeft size={18} />
                        <span className="font-medium">Description</span>
                      </div>
                      {editState.isEditingDescription ? (
                        <div className="space-y-3">
                          <textarea
                            value={editState.editedDescription}
                            onChange={(e) =>
                              setEditState((prev) => ({
                                ...prev,
                                editedDescription: e.target.value,
                              }))
                            }
                            placeholder="Add a more detailed description..."
                            autoFocus
                            rows={5}
                            className="w-full p-3 rounded-lg bg-transparent border outline-none resize-none"
                            style={{
                              color: theme.textPrimary,
                              borderColor: theme.terracotta,
                              backgroundColor: theme.surface2,
                            }}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={handleDescriptionSubmit}
                              disabled={isUpdating}
                              className="px-4 py-2 text-sm"
                            >
                              Save
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={cancelEditingDescription}
                              className="px-4 py-2 text-sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={startEditingDescription}
                          className="p-3 rounded-lg cursor-pointer min-h-[80px] transition-colors hover:bg-[rgba(255,235,210,0.05)]"
                          style={{
                            color: task.description
                              ? theme.textPrimary
                              : theme.textSecondary,
                            backgroundColor: theme.surface2,
                          }}
                        >
                          {task.description ||
                            "Add a more detailed description..."}
                        </div>
                      )}
                    </div>

                    {onCreateChecklist && (
                      <TaskChecklists
                        taskId={task.id}
                        checklists={task.checklists}
                        onCreateChecklist={onCreateChecklist}
                        onDeleteChecklist={
                          onDeleteChecklist || (() => Promise.resolve())
                        }
                        onRenameChecklist={
                          onRenameChecklist || (() => Promise.resolve())
                        }
                        onCreateItem={
                          onCreateChecklistItem || (() => Promise.resolve())
                        }
                        onDeleteItem={
                          onDeleteChecklistItem || (() => Promise.resolve())
                        }
                        onToggleItemComplete={
                          onToggleChecklistItemComplete ||
                          (() => Promise.resolve())
                        }
                        onRenameItem={
                          onRenameChecklistItem || (() => Promise.resolve())
                        }
                        loading={isUpdating}
                      />
                    )}
                  </>
                )}

                {activeTab === "comments" && onCreateComment && (
                  <TaskComments
                    comments={task.comments}
                    currentUserId={currentUserId}
                    onCreateComment={onCreateComment}
                    onUpdateComment={
                      onUpdateComment || (() => Promise.resolve())
                    }
                    onDeleteComment={
                      onDeleteComment || (() => Promise.resolve())
                    }
                    loading={isUpdating}
                  />
                )}

                {activeTab === "activity" && (
                  <TaskActivityFeed activity={task.activity} />
                )}
              </div>

              <div
                className="w-full lg:w-72 p-6 border-t lg:border-t-0 lg:border-l space-y-6"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.surface2,
                }}
              >
                {onUpdateDueDate && (
                  <TaskDueDate
                    dueDate={task.dueDate}
                    hasTime={task.hasTime}
                    onUpdateDueDate={onUpdateDueDate}
                    onCreateNotification={
                      onCreateDueDateNotification || (() => Promise.resolve())
                    }
                    onDeleteNotification={
                      onDeleteDueDateNotification || (() => Promise.resolve())
                    }
                    loading={isUpdating}
                  />
                )}

                {onToggleLabel && project && (
                  <TaskLabels
                    taskLabels={task.labels}
                    projectLabels={project.labels}
                    onToggleLabel={onToggleLabel}
                    loading={isUpdating}
                  />
                )}

                {onAssign && project && (
                  <TaskAssignees
                    assignees={task.assigned}
                    projectMembers={project.members}
                    onAssign={onAssign}
                    onUnassign={onUnassign || (() => Promise.resolve())}
                    loading={isUpdating}
                  />
                )}

                {onToggleWatch && (
                  <button
                    onClick={onToggleWatch}
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                    style={{
                      color: task.watched
                        ? theme.terracotta
                        : theme.textSecondary,
                    }}
                  >
                    {task.watched ? <Eye size={16} /> : <EyeOff size={16} />}
                    {task.watched ? "Watching this task" : "Watch this task"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div
              className="p-8 text-center"
              style={{ color: theme.textSecondary }}
            >
              Task not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
