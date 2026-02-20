import { useEffect, useRef, useState } from "react";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";
import type { TaskDragData } from "../utils/dnd-types";
import { QuickCardEditor } from "./task/QuickCardEditor";
import dayjs from "dayjs";

interface TaskLabel {
  id: string;
  projectLabel?: {
    id?: string;
    name?: string | null;
    labelColor?: { colorHex: string } | null;
  } | null;
}

interface TaskAssigned {
  id: string;
  fullName: string;
  profileIcon?: {
    initials?: string | null;
    bgColor?: string | null;
  } | null;
}

interface TaskBadges {
  checklist?: { complete: number; total: number } | null;
  comments?: { total: number } | null;
}

interface TaskType {
  id: string;
  shortId: string;
  name: string;
  position: number;
  complete: boolean;
  dueDate?: { at?: string | null } | null;
  hasTime: boolean;
  labels?: readonly (TaskLabel | null)[] | null;
  assigned?: readonly (TaskAssigned | null)[] | null;
  badges?: TaskBadges | null;
}

interface ProjectLabel {
  id: string;
  name?: string | null;
  labelColor?: { colorHex: string } | null;
}

interface ProjectMember {
  id: string;
  fullName: string;
  profileIcon?: { initials?: string | null; bgColor?: string | null } | null;
}

interface DraggableTaskProps {
  task: TaskType;
  columnId: string;
  isDragDisabled: boolean;
  onClick: () => void;
  onToggleComplete: () => void;
  onDelete: () => void;
  onEditName: () => void;
  editingTaskId: string | null;
  editingTaskName: string;
  setEditingTaskName: (name: string) => void;
  onUpdateTaskName: () => void;
  // Quick editor actions (optional — omit if not using QuickCardEditor)
  projectLabels?: ProjectLabel[];
  projectMembers?: ProjectMember[];
  onSaveName?: (taskId: string, name: string) => Promise<void>;
  onQuickToggleComplete?: (taskId: string, complete: boolean) => Promise<void>;
  onToggleLabel?: (taskId: string, projectLabelId: string) => Promise<void>;
  onAssign?: (taskId: string, userId: string) => Promise<void>;
  onUnassign?: (taskId: string, userId: string) => Promise<void>;
  onUpdateDueDate?: (
    taskId: string,
    dueDate: string | null,
    hasTime: boolean,
  ) => Promise<void>;
  onQuickDelete?: (taskId: string) => Promise<void>;
  onOpenModal?: (taskShortId: string) => void;
  surface0: string;
  surface2: string;
  surface3: string;
  border: string;
  textPrimary: string;
  textTertiary: string;
  terracotta: string;
  sage: string;
}

export function DraggableTask({
  task,
  columnId,
  isDragDisabled,
  onClick,
  onToggleComplete,
  onDelete,
  onEditName,
  editingTaskId,
  editingTaskName,
  setEditingTaskName,
  onUpdateTaskName,
  projectLabels = [],
  projectMembers = [],
  onSaveName,
  onQuickToggleComplete,
  onToggleLabel,
  onAssign,
  onUnassign,
  onUpdateDueDate,
  onQuickDelete,
  onOpenModal,
  surface0,
  surface2,
  surface3,
  border,
  textPrimary,
  textTertiary,
  terracotta,
  sage,
}: DraggableTaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [quickEditorOpen, setQuickEditorOpen] = useState(false);
  const [quickEditorRect, setQuickEditorRect] = useState<DOMRect | null>(null);

  const canUseQuickEditor =
    !!onSaveName &&
    !!onQuickToggleComplete &&
    !!onToggleLabel &&
    !!onAssign &&
    !!onUnassign &&
    !!onUpdateDueDate &&
    !!onQuickDelete &&
    !!onOpenModal;

  useEffect(() => {
    const el = ref.current;
    if (!el || isDragDisabled) return;

    return combine(
      draggable({
        element: el,
        getInitialData: (): TaskDragData => ({
          type: "task",
          id: task.id,
          shortId: task.shortId,
          name: task.name,
          columnId,
          position: task.position,
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input, element }) => {
          const data = {
            type: "task-drop" as const,
            id: task.id,
            columnId,
          };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
        canDrop: ({ source }) => {
          if (source.data.type !== "task") return false;
          return source.data.id !== task.id;
        },
        onDragEnter: ({ self }) => {
          const edge = extractClosestEdge(self.data);
          setClosestEdge(edge);
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
      }),
    );
  }, [
    task.id,
    task.name,
    task.shortId,
    columnId,
    task.position,
    isDragDisabled,
  ]);

  const handleEditButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ref.current || !canUseQuickEditor) return;
    setQuickEditorRect(ref.current.getBoundingClientRect());
    setQuickEditorOpen(true);
  };

  return (
    <>
      <div
        ref={ref}
        className="p-3 cursor-pointer relative group"
        style={{
          background: isDragging ? surface3 : surface2,
          border: `1px solid ${border}`,
          borderRadius: "12px",
          opacity: task.complete ? 0.7 : 1,
          transition: isDragging ? "none" : "background 0.2s",
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete();
            }}
            className="mt-0.5 flex-shrink-0"
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: `2px solid ${task.complete ? sage : terracotta}`,
              background: task.complete ? sage : "transparent",
            }}
          >
            {task.complete && (
              <span style={{ color: surface0, fontSize: "10px" }}>✓</span>
            )}
          </button>
          <div className="flex-1 min-w-0">
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editingTaskName}
                onChange={(e) => setEditingTaskName(e.target.value)}
                onBlur={onUpdateTaskName}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onUpdateTaskName();
                  if (e.key === "Escape") {
                    setEditingTaskName("");
                    onEditName();
                  }
                }}
                autoFocus
                className="w-full px-2 py-1 rounded text-sm"
                style={{
                  background: surface3,
                  border: `1px solid ${border}`,
                  color: textPrimary,
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <p
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  onEditName();
                }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: textPrimary,
                  textDecoration: task.complete ? "line-through" : "none",
                }}
              >
                {task.name}
              </p>
            )}

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {task.dueDate?.at && (
                <span
                  style={{
                    fontSize: "0.7rem",
                    color:
                      new Date(task.dueDate.at) < new Date() && !task.complete
                        ? terracotta
                        : textTertiary,
                  }}
                >
                  {dayjs(task.dueDate.at).format(
                    task.hasTime ? "MMM D h:mm A" : "MMM D",
                  )}
                </span>
              )}
              {task.labels && task.labels.length > 0 && (
                <div className="flex gap-1">
                  {task.labels.slice(0, 3).map(
                    (label) =>
                      label && (
                        <span
                          key={label.id}
                          title={label.projectLabel?.name ?? ""}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background:
                              label.projectLabel?.labelColor?.colorHex ||
                              terracotta,
                          }}
                        />
                      ),
                  )}
                </div>
              )}
              {task.assigned && task.assigned.length > 0 && (
                <div className="flex -space-x-1">
                  {task.assigned.slice(0, 3).map(
                    (user) =>
                      user && (
                        <div
                          key={user.id}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                          style={{
                            background:
                              user.profileIcon?.bgColor || "var(--color-slate)",
                            color: "#fff",
                            border: `1px solid ${surface2}`,
                          }}
                          title={user.fullName}
                        >
                          {user.profileIcon?.initials ||
                            user.fullName?.charAt(0) ||
                            "?"}
                        </div>
                      ),
                  )}
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

          {/* Action buttons (visible on hover) */}
          <div
            className="flex flex-col gap-1 flex-shrink-0"
            style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.15s" }}
          >
            {canUseQuickEditor && (
              <button
                onClick={handleEditButtonClick}
                className="p-1 rounded"
                style={{ color: textTertiary }}
                title="Quick edit"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 rounded"
              style={{ color: textTertiary }}
              title="Delete task"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {closestEdge && <DropIndicator edge={closestEdge} />}
      </div>

      {/* Quick Card Editor (portal-style fixed overlay) */}
      {quickEditorOpen && quickEditorRect && canUseQuickEditor && (
        <QuickCardEditor
          task={task}
          targetRect={quickEditorRect}
          projectLabels={projectLabels}
          projectMembers={projectMembers}
          taskShortId={task.shortId}
          onClose={() => setQuickEditorOpen(false)}
          onSaveName={onSaveName!}
          onToggleComplete={onQuickToggleComplete!}
          onToggleLabel={onToggleLabel!}
          onAssign={onAssign!}
          onUnassign={onUnassign!}
          onUpdateDueDate={onUpdateDueDate!}
          onDelete={onQuickDelete!}
          onOpenModal={onOpenModal!}
        />
      )}
    </>
  );
}
