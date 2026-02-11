import { useState, useEffect, useCallback, useRef } from "react";
import { X, Check, Calendar, Clock, Tag, User, AlignLeft, MessageSquare, Activity, CheckSquare } from "lucide-react";
import { cn } from "@/utils";
import type { FindTaskQuery } from "@/graphql/generated/graphql";
import { Button } from "./Button";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: FindTaskQuery["findTask"] | null;
  loading?: boolean;
  onUpdateName: (name: string) => Promise<void>;
  onUpdateDescription: (description: string) => Promise<void>;
  onToggleComplete: (complete: boolean) => Promise<void>;
  isUpdating?: boolean;
}

// Dark theme palette matching TopNavbar
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

export function TaskDetailModal({
  isOpen,
  onClose,
  task,
  loading = false,
  onUpdateName,
  onUpdateDescription,
  onToggleComplete,
  isUpdating = false,
}: TaskDetailModalProps) {
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const hasInitializedRef = useRef(false);

  // Initialize edited values when starting to edit
  const startEditingName = useCallback(() => {
    if (task) {
      setEditedName(task.name);
    }
    setIsEditingName(true);
  }, [task]);

  const startEditingDescription = useCallback(() => {
    if (task) {
      setEditedDescription(task.description || "");
    }
    setIsEditingDescription(true);
  }, [task]);

  const cancelEditingName = useCallback(() => {
    setIsEditingName(false);
    setEditedName("");
  }, []);

  const cancelEditingDescription = useCallback(() => {
    setIsEditingDescription(false);
    setEditedDescription("");
  }, []);

  // Reset editing state when modal closes
  useEffect(() => {
    if (!isOpen) {
      hasInitializedRef.current = false;
      setIsEditingName(false);
      setIsEditingDescription(false);
      setEditedName("");
      setEditedDescription("");
    }
  }, [isOpen]);

  // Handle escape key and body scroll
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
    if (editedName.trim() && editedName !== task?.name) {
      await onUpdateName(editedName.trim());
    }
    setIsEditingName(false);
    setEditedName("");
  }, [editedName, task?.name, onUpdateName]);

  const handleDescriptionSubmit = useCallback(async () => {
    if (editedDescription !== task?.description) {
      await onUpdateDescription(editedDescription);
    }
    setIsEditingDescription(false);
    setEditedDescription("");
  }, [editedDescription, task?.description, onUpdateDescription]);

  const formatDate = (date: string | null | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
        {/* Header */}
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
                  : "border-[rgba(245,238,230,0.3)] hover:border-[#c9805e]"
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 flex items-center justify-center">
              <div
                className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: `${theme.terracotta} transparent transparent transparent` }}
              />
            </div>
          ) : task ? (
            <div className="flex flex-col lg:flex-row">
              {/* Main Content */}
              <div className="flex-1 p-6">
                {/* Task Name */}
                <div className="mb-6">
                  {isEditingName ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
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
                        task.complete && "line-through"
                      )}
                      style={{
                        color: task.complete ? theme.textSecondary : theme.textPrimary,
                        fontFamily: "'Libre Baskerville', Georgia, serif",
                      }}
                    >
                      {task.name}
                    </h1>
                  )}
                </div>

                {/* In group */}
                <div
                  className="mb-6 text-sm"
                  style={{ color: theme.textSecondary }}
                >
                  in list <span className="font-medium" style={{ color: theme.terracotta }}>{task.taskGroup.name}</span>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <div
                    className="flex items-center gap-2 mb-3"
                    style={{ color: theme.textSecondary }}
                  >
                    <AlignLeft size={18} />
                    <span className="font-medium">Description</span>
                  </div>
                  {isEditingDescription ? (
                    <div className="space-y-3">
                      <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
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
                        color: task.description ? theme.textPrimary : theme.textSecondary,
                        backgroundColor: theme.surface2,
                      }}
                    >
                      {task.description || "Add a more detailed description..."}
                    </div>
                  )}
                </div>

                {/* Checklists */}
                {task.checklists && task.checklists.length > 0 && (
                  <div className="mb-8">
                    <div
                      className="flex items-center gap-2 mb-4"
                      style={{ color: theme.textSecondary }}
                    >
                      <CheckSquare size={18} />
                      <span className="font-medium">Checklist</span>
                      <span className="text-sm ml-2">
                        {task.badges?.checklist?.complete || 0}/{task.badges?.checklist?.total || 0}
                      </span>
                    </div>
                    {task.checklists.map((checklist) => (
                      <div key={checklist.id} className="mb-4">
                        <h4
                          className="font-medium mb-2"
                          style={{ color: theme.textPrimary }}
                        >
                          {checklist.name}
                        </h4>
                        <div className="space-y-2">
                          {checklist.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-2 rounded hover:bg-[rgba(255,235,210,0.05)]"
                            >
                              <div
                                className={cn(
                                  "w-5 h-5 rounded border flex items-center justify-center",
                                  item.complete
                                    ? "bg-[#7fb069] border-[#7fb069]"
                                    : "border-[rgba(245,238,230,0.3)]"
                                )}
                              >
                                {item.complete && <Check size={12} className="text-white" />}
                              </div>
                              <span
                                className={cn(
                                  "text-sm",
                                  item.complete && "line-through"
                                )}
                                style={{
                                  color: item.complete ? theme.textSecondary : theme.textPrimary,
                                }}
                              >
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comments */}
                {task.comments && task.comments.length > 0 && (
                  <div className="mb-8">
                    <div
                      className="flex items-center gap-2 mb-4"
                      style={{ color: theme.textSecondary }}
                    >
                      <MessageSquare size={18} />
                      <span className="font-medium">Comments</span>
                      <span className="text-sm ml-2">{task.comments.length}</span>
                    </div>
                    <div className="space-y-4">
                      {task.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                            style={{
                              backgroundColor: comment.createdBy.profileIcon?.bgColor || theme.surface3,
                              color: theme.textPrimary,
                            }}
                          >
                            {comment.createdBy.profileIcon?.initials || comment.createdBy.fullName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="font-medium text-sm"
                                style={{ color: theme.textPrimary }}
                              >
                                {comment.createdBy.fullName}
                              </span>
                              <span
                                className="text-xs"
                                style={{ color: theme.textSecondary }}
                              >
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p
                              className="text-sm"
                              style={{ color: theme.textPrimary }}
                            >
                              {comment.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity */}
                {task.activity && task.activity.length > 0 && (
                  <div>
                    <div
                      className="flex items-center gap-2 mb-4"
                      style={{ color: theme.textSecondary }}
                    >
                      <Activity size={18} />
                      <span className="font-medium">Activity</span>
                    </div>
                    <div className="space-y-3">
                      {task.activity.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="flex gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                            style={{
                              backgroundColor: activity.causedBy.profileIcon?.bgColor || theme.surface3,
                              color: theme.textPrimary,
                            }}
                          >
                            {activity.causedBy.profileIcon?.initials || activity.causedBy.fullName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p
                              className="text-sm"
                              style={{ color: theme.textPrimary }}
                            >
                              <span className="font-medium">{activity.causedBy.fullName}</span>{" "}
                              {activity.type.toLowerCase().replace(/_/g, " ")}
                            </p>
                            <span
                              className="text-xs"
                              style={{ color: theme.textSecondary }}
                            >
                              {formatDate(activity.createdAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div
                className="w-full lg:w-72 p-6 border-t lg:border-t-0 lg:border-l"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.surface2,
                }}
              >
                {/* Due Date */}
                {task.dueDate?.at && (
                  <div className="mb-6">
                    <div
                      className="flex items-center gap-2 mb-2 text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      <Calendar size={16} />
                      Due Date
                    </div>
                    <div
                      className="flex items-center gap-2 p-2 rounded"
                      style={{
                        color: theme.textPrimary,
                        backgroundColor: theme.surface1,
                      }}
                    >
                      <Clock size={14} />
                      <span className="text-sm">{formatDate(task.dueDate.at)}</span>
                    </div>
                  </div>
                )}

                {/* Labels */}
                {task.labels && task.labels.length > 0 && (
                  <div className="mb-6">
                    <div
                      className="flex items-center gap-2 mb-2 text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      <Tag size={16} />
                      Labels
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {task.labels.map((label) => (
                        <span
                          key={label.id}
                          className="px-3 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: label.projectLabel.labelColor.colorHex,
                            color: "#fff",
                          }}
                        >
                          {label.projectLabel.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assignees */}
                {task.assigned && task.assigned.length > 0 && (
                  <div className="mb-6">
                    <div
                      className="flex items-center gap-2 mb-2 text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      <User size={16} />
                      Assignees
                    </div>
                    <div className="space-y-2">
                      {task.assigned.map((user) => (
                        <div key={user.id} className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                            style={{
                              backgroundColor: user.profileIcon?.bgColor || theme.surface3,
                              color: theme.textPrimary,
                            }}
                          >
                            {user.profileIcon?.initials || user.fullName.charAt(0)}
                          </div>
                          <span
                            className="text-sm"
                            style={{ color: theme.textPrimary }}
                          >
                            {user.fullName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Watched */}
                {task.watched && (
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: theme.textSecondary }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#c9805e]" />
                    You are watching this task
                  </div>
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
